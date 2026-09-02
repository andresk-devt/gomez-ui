#!/usr/bin/env node
/**
 * PreToolUse hook (Bash). Reglas de Git del harness. Bloquea (exit 2) cuando:
 *   - `git commit` estando en main/master.
 *   - `git commit` con los tests en rojo.
 *   - `git push --force` / `-f`.
 *
 * Solo mira comandos cuyo *statement* empieza por `git commit` / `git push`
 * (separando por &&, ||, ;, |), así un `echo`/`grep` que mencione "git push" no dispara.
 */
import { execSync } from 'node:child_process'

let raw = ''
process.stdin.setEncoding('utf8')
process.stdin.on('data', (d) => (raw += d))
process.stdin.on('end', () => {
  let cmd = ''
  try {
    cmd = JSON.parse(raw || '{}')?.tool_input?.command ?? ''
  } catch {
    process.exit(0)
  }

  const statements = cmd
    .split(/&&|\|\||;|\|/)
    .map((s) => s.trim().replace(/^\(\s*/, ''))

  const commitStmt = statements.find((s) => /^git\s+commit\b/.test(s))
  const pushStmt = statements.find((s) => /^git\s+push\b/.test(s))
  if (!commitStmt && !pushStmt) process.exit(0)

  if (pushStmt && /(?:^|\s)(?:--force|-f)(?:\s|$|=)/.test(pushStmt)) {
    fail(
      '`git push --force` está prohibido por el harness. Usa `--force-with-lease` y revísalo a mano fuera de Claude.',
    )
  }

  if (commitStmt) {
    let branch = ''
    try {
      branch = execSync('git rev-parse --abbrev-ref HEAD', {
        encoding: 'utf8',
      }).trim()
    } catch {
      process.exit(0) // repo sin commits: dejar pasar el commit inicial
    }

    if (branch === 'main' || branch === 'master') {
      fail(
        `Estás en "${branch}"; no se commitea en la rama por defecto.\n` +
          'Crea una rama: git checkout -b feat/component-<nombre>',
      )
    }

    try {
      execSync('npm run test --silent', { stdio: 'pipe', encoding: 'utf8' })
    } catch (e) {
      fail(
        'Los tests fallan; commit bloqueado. Arréglalos y reintenta.\n\n' +
          tail(e.stdout) +
          tail(e.stderr),
      )
    }
  }

  process.exit(0)
})

function tail(s, n = 40) {
  if (!s) return ''
  return String(s).split('\n').slice(-n).join('\n') + '\n'
}

function fail(msg) {
  process.stderr.write(`[harness] ${msg}\n`)
  process.exit(2)
}
