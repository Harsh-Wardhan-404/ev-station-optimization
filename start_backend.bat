@echo off
echo 🚀 Starting EV Station Optimization Backend...

REM Check if Python is installed
python --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Python is not installed or not in PATH
    echo Please install Python from https://www.python.org/downloads/
    echo Make sure to check "Add Python to PATH" during installation
    pause
    exit /b 1
)

REM Check if virtual environment exists
if not exist "backend\venv" (
    echo 📦 Creating virtual environment...
    cd backend
    python -m venv venv
    cd ..
)

REM Activate virtual environment
echo 🔧 Activating virtual environment...
call backend\venv\Scripts\activate.bat

REM Install dependencies
echo 📥 Installing Python dependencies...
cd backend
pip install -r requirements.txt

REM Start the server
echo 🌐 Starting FastAPI server on http://localhost:8000
echo Press Ctrl+C to stop the server
python main.py

pause
