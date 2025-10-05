import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Circle, CircleMarker, Popup } from 'react-leaflet';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './App.css';

// Fix for default markers in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

interface User {
  lat: number;
  lon: number;
}

interface Station {
  id: number;
  name: string;
  lat: number;
  lon: number;
  cost: number;
}

interface Solution {
  id: number;
  cost: number;
  coverage: number;
  coverage_percentage: number;
  selected_stations: Station[];
}

interface OptimizationData {
  solutions: Solution[];
  pareto_front: Array<{
    cost: number;
    coverage: number;
    coverage_percentage: number;
  }>;
  users: User[];
  potential_stations: Station[];
}

const PUNE_CENTER: [number, number] = [18.5204, 73.8567];

function App() {
  const [optimizationData, setOptimizationData] = useState<OptimizationData | null>(null);
  const [selectedSolution, setSelectedSolution] = useState<Solution | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [populationSize, setPopulationSize] = useState(50);
  const [generations, setGenerations] = useState(100);
  const [coverageRadius, setCoverageRadius] = useState(0.05);

  const runOptimization = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:8000/optimize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          population_size: populationSize,
          generations: generations,
          coverage_radius: coverageRadius,
        }),
      });
      
      if (!response.ok) {
        throw new Error('Optimization failed');
      }
      
      const data = await response.json();
      setOptimizationData(data);
      if (data.solutions.length > 0) {
        setSelectedSolution(data.solutions[0]);
      }
    } catch (error) {
      console.error('Error running optimization:', error);
      alert('Failed to run optimization. Make sure the backend is running on port 8000.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleParetoPointClick = (data: any) => {
    if (optimizationData) {
      const solution = optimizationData.solutions.find(s => 
        Math.abs(s.cost - data.cost) < 1000 && 
        Math.abs(s.coverage_percentage - data.coverage_percentage) < 1
      );
      if (solution) {
        setSelectedSolution(solution);
      }
    }
  };

  return (
    <div className="App">
      
      <header className="hero-header">
  <h1 className="hero-title">
    EV Charging Station Optimization
  </h1>
  {/* <p className="hero-sub">
    Pune City · NSGA-II · Cost ↔ Coverage Trade‑offs
  </p> */}
</header>


      <div className="controls-panel">
        <div className="control-group">
          <label>Population Size:</label>
          <input
            type="number"
            value={populationSize}
            onChange={(e) => setPopulationSize(parseInt(e.target.value))}
            min="20"
            max="200"
          />
        </div>
        <div className="control-group">
          <label>Generations:</label>
          <input
            type="number"
            value={generations}
            onChange={(e) => setGenerations(parseInt(e.target.value))}
            min="50"
            max="500"
          />
        </div>
        <div className="control-group">
          <label>Coverage Radius (km):</label>
          <input
            type="number"
            value={coverageRadius * 100}
            onChange={(e) => setCoverageRadius(parseFloat(e.target.value) / 100)}
            min="1"
            max="10"
            step="1"
          />
        </div>
        <button 
          className="optimize-button" 
          onClick={runOptimization}
          disabled={isLoading}
        >
          {isLoading ? 'Optimizing...' : '🚀 Run Optimization'}
        </button>
      </div>

      <div className="main-content">
        <div className="map-container">
          <h3>Pune City Map - EV Users & Charging Stations</h3>
          <MapContainer
            center={PUNE_CENTER}
            zoom={11}
            style={{ height: '500px', width: '100%' }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            
            {/* EV Users */}
            {optimizationData?.users.map((user, index) => (
              <CircleMarker
                key={`user-${index}`}
                center={[user.lat, user.lon]}
                radius={3}
                color="green"
                fillColor="lightgreen"
                fillOpacity={0.7}
              >
                <Popup>EV User {index + 1}</Popup>
              </CircleMarker>
            ))}

            {/* Selected Charging Stations */}
            {selectedSolution?.selected_stations.map((station) => (
              <Marker
                key={`station-${station.id}`}
                position={[station.lat, station.lon]}
              >
                <Popup>
                  <div>
                    <strong>{station.name}</strong><br />
                    Cost: ₹{station.cost.toLocaleString()}
                  </div>
                </Popup>
              </Marker>
            ))}

            {/* Coverage Circles */}
            {selectedSolution?.selected_stations.map((station) => (
              <Circle
                key={`coverage-${station.id}`}
                center={[station.lat, station.lon]}
                radius={coverageRadius * 100000} // km->m
                pathOptions={{ color: '#3b82f6', weight: 1, fillColor: '#60a5fa', fillOpacity: 0.05 }}
                interactive={false}
              />
            ))}
          </MapContainer>
        </div>

        <div className="results-panel">
          <h3>Optimization Results</h3>
          
          {selectedSolution && (
            <div className="solution-info">
              <h4>Selected Solution</h4>
              <p><strong>Total Cost:</strong> ₹{selectedSolution.cost.toLocaleString()}</p>
              <p><strong>Coverage:</strong> {selectedSolution.coverage} users ({selectedSolution.coverage_percentage.toFixed(1)}%)</p>
              <p><strong>Stations:</strong> {selectedSolution.selected_stations.length}</p>
            </div>
          )}

          {optimizationData && (
            <div className="pareto-chart">
              <h4>Pareto Front - Cost vs Coverage Trade-off</h4>
              <p>Click on points to see different solutions</p>
              <ResponsiveContainer width="100%" height={320}>
                <ScatterChart data={optimizationData.pareto_front} margin={{ top: 10, right: 20, bottom: 20, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.25)" />
                  <XAxis 
                    type="number" 
                    dataKey="cost" 
                    name="Total Cost (₹)"
                    label={{ value: 'Total Installation Cost (₹)', position: 'insideBottom', offset: -5, fill: '#cbd5e1' }}
                    tickFormatter={(value) => `₹${(value/1000).toFixed(0)}k`}
                    tick={{ fill: '#cbd5e1' }}
                    axisLine={{ stroke: 'rgba(148,163,184,0.35)' }}
                    tickLine={{ stroke: 'rgba(148,163,184,0.35)' }}
                  />
                  <YAxis 
                    type="number" 
                    dataKey="coverage_percentage" 
                    name="Coverage (%)"
                    label={{ value: 'Coverage Percentage (%)', angle: -90, position: 'insideLeft', fill: '#cbd5e1' }}
                    domain={[0, 100]}
                    tick={{ fill: '#cbd5e1' }}
                    axisLine={{ stroke: 'rgba(148,163,184,0.35)' }}
                    tickLine={{ stroke: 'rgba(148,163,184,0.35)' }}
                  />
                  <Tooltip 
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload;
                        return (
                          <div style={{
                            backgroundColor: 'white',
                            border: '1px solid #ccc',
                            borderRadius: '4px',
                            padding: '10px',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                          }}>
                            <p style={{ margin: '0 0 5px 0', fontWeight: 'bold' }}>
                              Solution Details
                            </p>
                            <p style={{ margin: '0 0 3px 0' }}>
                              <strong>Cost:</strong> ₹{data.cost.toLocaleString()}
                            </p>
                            <p style={{ margin: '0 0 3px 0' }}>
                              <strong>Coverage:</strong> {Number(data.coverage_percentage).toFixed(1)}%
                            </p>
                            <p style={{ margin: '0' }}>
                              <strong>Users Covered:</strong> {data.coverage}
                            </p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Scatter 
                    dataKey="coverage_percentage" 
                    fill="#a78bfa"
                    fillOpacity={0.95}
                    stroke="#a78bfa"
                    shape="circle"
                    r={5}
                    onClick={handleParetoPointClick}
                    style={{ cursor: 'pointer' }}
                  />
                </ScatterChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
