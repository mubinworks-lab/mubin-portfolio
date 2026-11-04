@echo off
cd /d "%~dp0"
powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0sync.ps1"
set "result=%ERRORLEVEL%"
echo.
if not "%result%"=="0" echo Sync failed. See auto-push.log for details.
pause
exit /b %result%
