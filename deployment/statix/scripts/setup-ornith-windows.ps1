# Ornith-35B inference node setup (Windows + Ollama + Tailscale)
# Run in PowerShell on the Windows machine that will HOST the model.
# Requires: 32 GB RAM recommended, Tailscale installed, ~25 GB free disk.

$ErrorActionPreference = "Stop"

Write-Host "=== Studex Ornith inference node (Windows) ===" -ForegroundColor Cyan

# 1. Tailscale IP
if (Get-Command tailscale -ErrorAction SilentlyContinue) {
    $tsIp = tailscale ip -4 2>$null
    if ($tsIp) {
        Write-Host "Tailscale IPv4: $tsIp" -ForegroundColor Green
        Write-Host "Clients should set: OLLAMA_HOST=http://${tsIp}:11434"
    } else {
        Write-Host "Tailscale installed but no IP — sign in to Tailscale first." -ForegroundColor Yellow
    }
} else {
    Write-Host "Install Tailscale: https://tailscale.com/download/windows" -ForegroundColor Yellow
}

# 2. Ollama remote listen
$current = [System.Environment]::GetEnvironmentVariable("OLLAMA_HOST", "User")
if ($current -ne "0.0.0.0:11434") {
    [System.Environment]::SetEnvironmentVariable("OLLAMA_HOST", "0.0.0.0:11434", "User")
    Write-Host "Set OLLAMA_HOST=0.0.0.0:11434 (restart Ollama app from tray)" -ForegroundColor Yellow
} else {
    Write-Host "OLLAMA_HOST already set for remote access" -ForegroundColor Green
}

# 3. Ollama binary
if (-not (Get-Command ollama -ErrorAction SilentlyContinue)) {
    Write-Host "Install Ollama: https://ollama.com/download" -ForegroundColor Red
    exit 1
}
ollama --version

# 4. Pull Ornith Q4 (quantized ~21 GB)
$model = "hf.co/deepreinforce-ai/Ornith-1.0-35B-GGUF:Q4_K_M"
Write-Host "Pulling $model (large download, may take a while)..." -ForegroundColor Cyan
ollama pull $model

# 5. Smoke test
Write-Host "Smoke test..." -ForegroundColor Cyan
ollama run $model "Reply with exactly: Ornith inference node is live." --verbose 2>&1 | Select-Object -First 20

Write-Host ""
Write-Host "Done. Share your Tailscale IP with StudEx:" -ForegroundColor Green
if ($tsIp) { Write-Host "  OLLAMA_HOST=http://${tsIp}:11434" }
Write-Host "  DEMO_MODEL=$model"
