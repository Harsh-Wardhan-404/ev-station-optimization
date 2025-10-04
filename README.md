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
└── README.md
```

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 or higher)
- Python (v3.8 or higher)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Start the FastAPI server:
```bash
python main.py
```

The backend will be available at `http://localhost:8000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The frontend will be available at `http://localhost:3000`

## 🎯 How It Works

### Problem Definition

The optimization problem aims to:
- **Minimize** total installation cost of charging stations
- **Maximize** coverage of EV users within a specified radius

### Data Model

- **EV Users**: Simulated based on Pune's major areas with different densities
- **Potential Stations**: 10 locations across Pune with varying installation costs
- **Coverage**: Each station covers users within a configurable radius (default: 3km)

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

1. **Adjust Parameters**: Set population size, generations, and coverage radius
2. **Run Optimization**: Click "🚀 Run Optimization" to start the NSGA-II algorithm
3. **View Results**: 
   - Green dots show EV users on the map
   - Blue markers show selected charging stations
   - Light blue circles show coverage areas
4. **Explore Solutions**: Click on points in the Pareto front chart to see different solutions
5. **Compare Trade-offs**: Analyze the cost vs coverage relationship

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
