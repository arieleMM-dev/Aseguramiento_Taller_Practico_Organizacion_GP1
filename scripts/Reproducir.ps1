$ErrorActionPreference='Stop'
$actividadRoot=Split-Path -Parent $PSScriptRoot
$runDirectory=Join-Path $actividadRoot ('evidencias/04_incremento_pruebas/repeticiones/'+(Get-Date -Format 'yyyyMMdd-HHmmss'))
New-Item -ItemType Directory -Path $runDirectory -Force | Out-Null
Push-Location (Join-Path $actividadRoot 'incremento')
try {
  node --version | Out-File (Join-Path $runDirectory 'node.txt')
  node --test --test-reporter=tap tests/cuadre.test.cjs 2>&1 | Out-File (Join-Path $runDirectory 'final.tap') -Encoding utf8
  $testResult=$LASTEXITCODE
  if($testResult -ne 0){throw 'Las pruebas no aprobaron; revisar final.tap.'}
  Write-Host 'Pruebas aprobadas. Evidencia nueva:' $runDirectory
} finally {Pop-Location}
