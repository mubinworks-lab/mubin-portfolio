$ErrorActionPreference = 'Stop'
Set-Location -LiteralPath $PSScriptRoot
$log = Join-Path $PSScriptRoot 'auto-push.log'
function Log($message) { Add-Content -LiteralPath $log -Value ("{0} {1}" -f (Get-Date -Format 'yyyy-MM-dd HH:mm:ss'), $message) }
function Snapshot {
    $status = (& git status --porcelain) -join "`n"
    if ($LASTEXITCODE -ne 0) { throw 'git status failed.' }
    $stamp = Get-ChildItem -LiteralPath $PSScriptRoot -Recurse -File -Force |
        Where-Object { $_.FullName -notmatch '\\.git\\|\\node_modules\\' -and $_.Name -ne 'auto-push.log' } |
        ForEach-Object { "{0}:{1}:{2}" -f $_.FullName,$_.Length,$_.LastWriteTimeUtc.Ticks }
    return @{ Status = $status; Signature = ($stamp -join "`n") }
}
try {
    & git rev-parse --is-inside-work-tree *> $null
    if ($LASTEXITCODE -ne 0) { throw 'Git repository is not initialized.' }
    & git remote get-url origin *> $null
    if ($LASTEXITCODE -ne 0) { throw 'origin remote is missing. Complete GitHub setup first.' }
    $last = Snapshot
    $changedAt = if ($last.Status) { Get-Date } else { $null }
    Log 'Watcher started.'
    Write-Host 'Watching project. Save changes, then wait 30 seconds. Stop with Ctrl+C or close this window.'
    while ($true) {
        Start-Sleep -Seconds 2
        $current = Snapshot
        if ($current.Signature -ne $last.Signature -or $current.Status -ne $last.Status) {
            $last = $current
            $changedAt = if ($current.Status) { Get-Date } else { $null }
        }
        if ($changedAt -and ((Get-Date) - $changedAt).TotalSeconds -ge 30) {
            & powershell.exe -NoProfile -ExecutionPolicy Bypass -File (Join-Path $PSScriptRoot 'sync.ps1')
            if ($LASTEXITCODE -ne 0) { throw 'Sync failed. Check auto-push.log.' }
            $last = Snapshot
            $changedAt = if ($last.Status) { Get-Date } else { $null }
        }
    }
} catch {
    Log "ERROR: $($_.Exception.Message)"
    Write-Error $_.Exception.Message
    exit 1
}
