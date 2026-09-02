#!/usr/bin/env node
/**
 * PostToolUse hook (Edit|Write|MultiEdit).
 * Formatea con Prettier y aplica `eslint --fix` al archivo recién tocado.
 * Best-effort: nunca bloquea (siempre exit 0).
 */
import { execFileSync } from 'node:child_process'
import { existsSync } from 'node:fs'

let raw = ''
process.stdin.setEncoding('utf8')
process.stdin.on('data', (d) => (raw += d))
process.stdin.on('end', () => {
  let file
  try {
    file = JSON.parse(raw || '{}')?.tool_input?.file_path
  } catch {
    process.exit(0)
  }

  if (!file || !existsSync(file)) process.exit(0)
  if (!/\.(ts|mts|tsx|vue|js|mjs|cjs|json|css|md|ya?ml)$/.test(file))
    process.exit(0)
  if (file.includes('/dist/') || file.includes('/node_modules/'))
    process.exit(0)

  try {
    execFileSync(
      'npx',
      ['prettier', '--write', '--log-level', 'silent', file],
      {
        stdio: 'ignore',
      },
    )
  } catch {
    /* no-op */
  }

  if (/\.(ts|mts|tsx|vue|js|mjs|cjs)$/.test(file)) {
    try {
      execFileSync('npx', ['eslint', '--fix', '--no-warn-ignored', file], {
        stdio: 'ignore',
      })
    } catch {
      /* lint errors surface on commit / CI, not here */
    }
  }

  process.exit(0)
})
