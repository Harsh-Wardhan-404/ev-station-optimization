# 🚗 EV Charging Station Optimization - Pune City

A multi-objective optimization project for optimal EV charging station placement in Pune city using NSGA-II algorithm. This project demonstrates the trade-off between installation cost and user coverage using interactive maps and Pareto front visualization.

## 🌟 Features

- **Interactive Pune City Map** with Leaflet.js showing EV users and charging stations
- **Multi-objective Optimization** using NSGA-II algorithm (pymoo)
- **Pareto Front Visualization** showing cost vs coverage trade-offs
- **Real-time Parameter Tuning** (population size, generations, coverage radius)
- **Modern React Frontend** with TypeScript
- **FastAPI Backend** with CORS support

## 🏗️ Project Structure

```
ev_station_optimization/
├── frontend/                 # React TypeScript frontend
│   ├── src/
│   │   ├── App.tsx          # Main application component
│   │   ├── App.css          # Styling
│   │   └── ...
│   └── package.json
├── backend/                  # FastAPI backend
│   ├── main.py              # API server with NSGA-II optimization
│   └── requirements.txt     # Python dependencies
├── start_backend.bat        # Windows batch file to start backend
├── start_frontend.bat       # Windows batch file to start frontend
└── README.md
```

## 🚀 Quick Start for Windows

### Prerequisites

**1. Install Node.js (Required for Frontend)**
- Download from: https://nodejs.org/
- Choose the **LTS version** (recommended)
- Run the installer and follow the setup wizard
- Verify installation by opening Command Prompt and running:
```cmd
node --version
npm --version
```

**2. Install Python (Required for Backend)**
- Download from: https://www.python.org/downloads/
- Choose **Python 3.8 or higher**
- ⚠️ **IMPORTANT**: Check "Add Python to PATH" during installation
- Verify installation by opening Command Prompt and running:
```cmd
python --version
pip --version
```

**3. Install Git (Optional but Recommended)**
- Download from: https://git-scm.com/download/win
- Use default settings during installation

### 🎯 Easy Setup (Recommended)

**Option 1: Using Batch Files (Easiest)**

1. **Download/Clone the project** to your computer
2. **Open two Command Prompt windows** (or PowerShell)
3. **In the first window**, run:
```cmd
cd path\to\ev_station_optimization
start_backend.bat
```
4. **In the second window**, run:
```cmd
cd path\to\ev_station_optimization
start_frontend.bat
```
5. **Open your browser** and go to `http://localhost:3000`

### 🔧 Manual Setup (Step-by-Step)

**Backend Setup:**

1. **Open Command Prompt** as Administrator (Right-click → "Run as administrator")

2. **Navigate to the project directory:**
```cmd
cd C:\path\to\ev_station_optimization\backend
```

3. **Create a virtual environment:**
```cmd
python -m venv venv
```

4. **Activate the virtual environment:**
```cmd
venv\Scripts\activate
```
You should see `(venv)` at the beginning of your command prompt.

5. **Install Python dependencies:**
```cmd
pip install -r requirements.txt
```

6. **Start the backend server:**
```cmd
python main.py
```
You should see: `INFO: Uvicorn running on http://0.0.0.0:8000`

**Frontend Setup (In a new Command Prompt window):**

1. **Navigate to the frontend directory:**
```cmd
cd C:\path\to\ev_station_optimization\frontend
```

2. **Install Node.js dependencies:**
```cmd
npm install
```

3. **Start the frontend development server:**
```cmd
npm start
```
Your browser should automatically open to `http://localhost:3000`

### 🚨 Troubleshooting for Windows

**If you get "python is not recognized":**
- Python wasn't added to PATH during installation
- Reinstall Python and check "Add Python to PATH"
- Or manually add Python to PATH in System Environment Variables

**If you get "node is not recognized":**
- Node.js wasn't installed properly
- Reinstall Node.js from the official website
- Restart Command Prompt after installation

**If you get "pip is not recognized":**
- Try using `python -m pip` instead of `pip`
- Or reinstall Python with PATH option checked

**If port 8000 or 3000 is already in use:**
- Close other applications using these ports
- Or restart your computer to free up ports

**If the backend won't start:**
- Make sure you're in the correct directory (`backend` folder)
- Ensure virtual environment is activated (you see `(venv)` in prompt)
- Try running `pip install --upgrade pip` first

**If the frontend won't start:**
- Make sure you're in the correct directory (`frontend` folder)
- Try deleting `node_modules` folder and running `npm install` again
- Check if Node.js version is 14 or higher

## ⚡ Super Quick Start (Windows)

**Just want to run it? Follow these 3 steps:**

1. **Install Python** from https://www.python.org/downloads/ (check "Add Python to PATH")
2. **Install Node.js** from https://nodejs.org/ (choose LTS version)
3. **Double-click** `start_backend.bat` and `start_frontend.bat` in two separate Command Prompt windows
4. **Open** http://localhost:3000 in your browser

That's it! 🎉

## 🎯 How It Works

### Problem Definition

The optimization problem aims to:
- **Minimize** total installation cost of charging stations
- **Maximize** coverage of EV users within a specified radius

### Data Model

- **EV Users**: Simulated based on Pune's major areas with different densities
- **Potential Stations**: 10 locations across Pune with varying installation costs
- **Coverage**: Each station covers users within a configurable radius (default: 5km)

### Algorithm

- **NSGA-II**: Non-dominated Sorting Genetic Algorithm II
- **Population Size**: Configurable (default: 50)
- **Generations**: Configurable (default: 100)
- **Objectives**: 2 (cost minimization, coverage maximization)

### Areas Covered

The project includes these Pune areas:
- Hinjawadi (IT Hub)
- Baner
- Kothrud
- Hadapsar
- Viman Nagar
- Nigdi
- Koregaon Park
- Aundh
- Wakad
- Pimpri

## 🎮 Usage

### For Windows Users:

1. **Start the Application**:
   - Run `start_backend.bat` in one Command Prompt window
   - Run `start_frontend.bat` in another Command Prompt window
   - Open http://localhost:3000 in your browser

2. **Use the Interface**:
   - **Adjust Parameters**: Set population size (50), generations (100), and coverage radius (5km)
   - **Run Optimization**: Click "🚀 Run Optimization" to start the NSGA-II algorithm
   - **View Results**: 
     - Green dots show EV users on the map
     - Blue markers show selected charging stations
     - Light blue circles show coverage areas
   - **Explore Solutions**: Click on points in the Pareto front chart to see different solutions
   - **Compare Trade-offs**: Analyze the cost vs coverage relationship

3. **Understanding the Results**:
   - **Pareto Front Chart**: Shows cost vs coverage trade-offs
   - **Map Visualization**: Interactive Pune city map with station placements
   - **Solution Details**: Cost, coverage percentage, and selected stations

## 📊 Key Metrics

- **Total Cost**: Sum of installation costs for selected stations
- **Coverage**: Number of EV users within coverage radius
- **Coverage Percentage**: Percentage of total users covered
- **Stations Count**: Number of selected charging stations

## 🎓 Academic Context

This project is designed for a **Soft Computing course** and demonstrates:

- **Multi-objective Optimization**: Real-world problem with conflicting objectives
- **Genetic Algorithms**: NSGA-II implementation for Pareto-optimal solutions
- **Visualization**: Interactive maps and charts for result interpretation
- **Real-world Application**: EV infrastructure planning for smart cities

## 🔧 Technical Stack

### Frontend
- **React 18** with TypeScript
- **Leaflet.js** for interactive maps
- **Recharts** for data visualization
- **CSS3** with modern styling

### Backend
- **FastAPI** for REST API
- **pymoo** for multi-objective optimization
- **NumPy** for numerical computations
- **Pydantic** for data validation

## 📈 Future Enhancements

- Real-time traffic data integration
- Dynamic user demand modeling
- Grid connectivity constraints
- Environmental impact assessment
- Mobile-responsive design improvements

## 🤝 Contributing

This is an academic project, but suggestions and improvements are welcome!

## 📄 License

This project is created for educational purposes as part of a Soft Computing course.

---

**Note**: Make sure both the backend (port 8000) and frontend (port 3000) are running for the application to work properly.
