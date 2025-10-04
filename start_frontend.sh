#!/bin/bash

echo "🚀 Starting EV Station Optimization Frontend..."

# Check if node_modules exists
if [ ! -d "frontend/node_modules" ]; then
    echo "📦 Installing Node.js dependencies..."
    cd frontend
    npm install
    cd ..
fi

# Start the development server
echo "🌐 Starting React development server on http://localhost:3000"
echo "Press Ctrl+C to stop the server"
cd frontend
npm start
