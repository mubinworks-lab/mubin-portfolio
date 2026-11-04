$ErrorActionPreference = 'Stop'
Set-Location -LiteralPath $PSScriptRoot
$log = Join-Path $PSScriptRoot 'auto-push.log'
function Log($message) { Add-Content -LiteralPath $log -Value ("{0} {1}" -f (Get-Date -Format 'yyyy-MM-dd HH:mm:ss'), $message) }
function Git([string[]]$gitArgs) {
    $result = & git @gitArgs 2>&1
    if ($LASTEXITCODE -ne 0) { throw "git $($gitArgs -join ' ') failed: $($result -join ' ')" }
    return $result
}
try {
    Git -gitArgs @('rev-parse','--is-inside-work-tree') | Out-Null
    $remote = Git -gitArgs @('remote','get-url','origin')
    if (-not $remote) { throw 'origin remote is missing.' }
    $branch = Git -gitArgs @('branch','--show-current')
    if ($branch -ne 'main') { throw "Current branch is '$branch'; expected main." }
    $status = Git -gitArgs @('status','--porcelain')
    if ($status) {
        Git -gitArgs @('add','-A') | Out-Null
        $staged = Git -gitArgs @('diff','--cached','--name-only')
        if ($staged) { Git -gitArgs @('commit','-m',("Portfolio sync {0}" -f (Get-Date -Format 'yyyy-MM-dd HH:mm:ss'))) | Out-Null }
    }
    $pushOutput = & git push origin main 2>&1
    if ($LASTEXITCODE -ne 0) {
        Log "Initial push failed: $($pushOutput -join ' ')"
        Git -gitArgs @('pull','--rebase','origin','main') | Out-Null
        Git -gitArgs @('push','origin','main') | Out-Null
    }
    $sha = Git -gitArgs @('rev-parse','--short','HEAD')
    Log "Push succeeded: $sha"
    Write-Host "Push succeeded: $sha"
    exit 0
} catch {
    Log "ERROR: $($_.Exception.Message)"
    Write-Error $_.Exception.Message
    exit 1
}

