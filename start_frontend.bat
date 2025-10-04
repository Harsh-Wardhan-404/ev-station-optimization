@echo off
echo 🚀 Starting EV Station Optimization Frontend...

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js is not installed or not in PATH
    echo Please install Node.js from https://nodejs.org/
    echo Choose the LTS version (recommended)
    pause
    exit /b 1
)

REM Check if npm is installed
npm --version >nul 2>&1
if errorlevel 1 (
    echo ❌ npm is not installed
    echo Please reinstall Node.js from https://nodejs.org/
    pause
    exit /b 1
)

REM Check if node_modules exists
if not exist "frontend\node_modules" (
    echo 📦 Installing Node.js dependencies...
    cd frontend
    npm install
    cd ..
)

REM Start the development server
echo 🌐 Starting React development server on http://localhost:3000
echo Press Ctrl+C to stop the server
cd frontend
npm start

pause
