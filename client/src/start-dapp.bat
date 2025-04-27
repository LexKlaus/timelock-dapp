@echo off
echo 🔧 Starting TimeLock dApp on http://localhost:8080 ...
cd /d %~dp0\src
start http://localhost:8080
npx http-server . -c-1 -i index.html --no-dir
pause
