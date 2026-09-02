#!/usr/bin/env node
/**
 * Stop hook. Al terminar el turno corre typecheck + tests y muestra un resumen.
 * Informativo: no bloquea (exit 0). El gate duro es el hook de commit + CI.
 */
import { execSync } from 'node:child_process'

function run(label, cmd) {
  try {
    execSync(cmd, { stdio: 'pipe' })
    return `  ✓ ${label}`
  } catch {
    return `  ✗ ${label}  → corre \`${cmd}\` para ver el detalle`
  }
}

const lines = [
  run('typecheck', 'npm run typecheck --silent'),
  run('tests', 'npm run test --silent'),
]

const ok = lines.every((l) => l.includes('✓'))
process.stdout.write(
  `\n[harness] estado del proyecto:\n${lines.join('\n')}\n` +
    (ok ? '' : '\n  Hay checks en rojo. Revísalos antes de commitear.\n'),
)
process.exit(0)
