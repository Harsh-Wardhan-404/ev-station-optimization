from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any
import numpy as np
from pymoo.algorithms.moo.nsga2 import NSGA2
from pymoo.optimize import minimize
from pymoo.core.problem import ElementwiseProblem
import random

app = FastAPI(title="EV Station Optimization API")

# Enable CORS for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pune city areas with coordinates and user density
PUNE_AREAS = [
    {"name": "Hinjawadi", "lat": 18.595, "lon": 73.735, "density": 20},
    {"name": "Baner", "lat": 18.563, "lon": 73.789, "density": 15},
    {"name": "Kothrud", "lat": 18.507, "lon": 73.807, "density": 10},
    {"name": "Hadapsar", "lat": 18.498, "lon": 73.941, "density": 12},
    {"name": "Viman Nagar", "lat": 18.565, "lon": 73.911, "density": 10},
    {"name": "Nigdi", "lat": 18.650, "lon": 73.770, "density": 8},
    {"name": "Koregaon Park", "lat": 18.536, "lon": 73.896, "density": 18},
    {"name": "Aundh", "lat": 18.570, "lon": 73.800, "density": 14},
    {"name": "Wakad", "lat": 18.600, "lon": 73.750, "density": 16},
    {"name": "Pimpri", "lat": 18.629, "lon": 73.813, "density": 12}
]

class OptimizationRequest(BaseModel):
    population_size: int = 50
    generations: int = 100
    coverage_radius: float = 0.03  # ~3km in lat/lon units

class OptimizationResponse(BaseModel):
    solutions: List[Dict[str, Any]]
    pareto_front: List[Dict[str, float]]
    users: List[Dict[str, float]]
    potential_stations: List[Dict[str, Any]]

class EVChargingProblem(ElementwiseProblem):
    def __init__(self, costs, users, locations, coverage_radius):
        super().__init__(n_var=len(costs), n_obj=2, xl=0, xu=1, type_var=int)
        self.costs = costs
        self.users = users
        self.locations = locations
        self.coverage_radius = coverage_radius

    def _evaluate(self, x, out, *args, **kwargs):
        # Calculate total installation cost
        total_cost = np.sum(x * self.costs)
        
        # Calculate coverage (number of users covered)
        coverage = 0
        for user in self.users:
            user_covered = False
            for j in range(len(x)):
                if x[j] == 1:  # If station is placed at location j
                    distance = np.sqrt((user[0] - self.locations[j][0])**2 + 
                                     (user[1] - self.locations[j][1])**2)
                    if distance <= self.coverage_radius:
                        user_covered = True
                        break
            if user_covered:
                coverage += 1
        
        # Minimize cost, maximize coverage (negative for minimization)
        out["F"] = [total_cost, -coverage]

def generate_ev_users(areas, total_users=200):
    """Generate EV user locations based on area densities"""
    users = []
    total_density = sum(area["density"] for area in areas)
    
    for area in areas:
        num_users = int((area["density"] / total_density) * total_users)
        for _ in range(num_users):
            # Add some randomness around the area center
            lat = area["lat"] + random.uniform(-0.01, 0.01)
            lon = area["lon"] + random.uniform(-0.01, 0.01)
            users.append([lat, lon])
    
    return users

def generate_potential_stations(areas):
    """Generate potential charging station locations"""
    stations = []
    for i, area in enumerate(areas):
        # Base cost varies by area density (higher density = higher cost)
        base_cost = 100000 + (area["density"] * 5000)
        stations.append({
            "id": i,
            "name": area["name"],
            "lat": area["lat"],
            "lon": area["lon"],
            "cost": base_cost + random.randint(-20000, 20000)
        })
    return stations

@app.get("/")
async def root():
    return {"message": "EV Station Optimization API"}

@app.get("/areas")
async def get_areas():
    return {"areas": PUNE_AREAS}

@app.post("/optimize", response_model=OptimizationResponse)
async def optimize_stations(request: OptimizationRequest):
    try:
        # Generate EV users
        users = generate_ev_users(PUNE_AREAS)
        
        # Generate potential station locations
        potential_stations = generate_potential_stations(PUNE_AREAS)
        
        # Extract data for optimization
        costs = np.array([station["cost"] for station in potential_stations])
        locations = np.array([[station["lat"], station["lon"]] for station in potential_stations])
        
        # Create and solve optimization problem
        problem = EVChargingProblem(costs, users, locations, request.coverage_radius)
        algorithm = NSGA2(pop_size=request.population_size)
        
        res = minimize(problem, algorithm, ('n_gen', request.generations), verbose=False)
        
        # Process results
        solutions = []
        pareto_front = []
        
        for i, solution in enumerate(res.X):
            if res.F[i][0] > 0:  # Valid solution
                selected_stations = []
                for j, is_selected in enumerate(solution):
                    if is_selected == 1:
                        selected_stations.append(potential_stations[j])
                
                solutions.append({
                    "id": i,
                    "cost": float(res.F[i][0]),
                    "coverage": int(-res.F[i][1]),
                    "coverage_percentage": float(-res.F[i][1] / len(users) * 100),
                    "selected_stations": selected_stations
                })
                
                pareto_front.append({
                    "cost": float(res.F[i][0]),
                    "coverage": int(-res.F[i][1]),
                    "coverage_percentage": float(-res.F[i][1] / len(users) * 100)
                })
        
        # Sort Pareto front by cost
        pareto_front.sort(key=lambda x: x["cost"])
        
        return OptimizationResponse(
            solutions=solutions,
            pareto_front=pareto_front,
            users=[{"lat": user[0], "lon": user[1]} for user in users],
            potential_stations=potential_stations
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
