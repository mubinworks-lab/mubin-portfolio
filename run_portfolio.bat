@echo off
title Mubin Shaikh Portfolio 2026 Local Server
cd /d "%~dp0"
echo Starting Mubin Shaikh Portfolio Local Server on http://localhost:8080 ...
start http://localhost:8080
python -m http.server 8080
pause
