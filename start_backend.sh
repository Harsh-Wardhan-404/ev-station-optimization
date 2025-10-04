#!/bin/bash

echo "🚀 Starting EV Station Optimization Backend..."

# Check if virtual environment exists
if [ ! -d "backend/venv" ]; then
    echo "📦 Creating virtual environment..."
    cd backend
    python3 -m venv venv
    cd ..
fi

# Activate virtual environment
echo "🔧 Activating virtual environment..."
source backend/venv/bin/activate

# Install dependencies
echo "📥 Installing Python dependencies..."
cd backend
pip install -r requirements.txt

# Start the server
echo "🌐 Starting FastAPI server on http://localhost:8000"
echo "Press Ctrl+C to stop the server"
python main.py
