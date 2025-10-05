import React, { useState, useEffect } from 'react';
import './App.css';

// Sample data for demonstration
const SAMPLE_DATA = {
  'new-york': {
    name: 'New York City',
    country: 'USA',
    temperature: {
      current: 15.2,
      change: '+2.1°C',
      trend: 'rising'
    },
    seaLevel: {
      current: '0.3m',
      change: '+0.2m',
      trend: 'rising'
    },
    airQuality: {
      index: 65,
      trend: 'improving'
    },
    precipitation: {
      current: '1200mm',
      change: '+15%',
      trend: 'increasing'
    }
  },
  'mumbai': {
    name: 'Mumbai',
    country: 'India',
    temperature: {
      current: 28.5,
      change: '+1.8°C',
      trend: 'rising'
    },
    seaLevel: {
      current: '0.4m',
      change: '+0.25m',
      trend: 'rising'
    },
    airQuality: {
      index: 85,
      trend: 'worsening'
    },
    precipitation: {
      current: '2200mm',
      change: '+25%',
      trend: 'increasing'
    }
  },
  'london': {
    name: 'London',
    country: 'UK',
    temperature: {
      current: 12.8,
      change: '+1.5°C',
      trend: 'rising'
    },
    seaLevel: {
      current: '0.2m',
      change: '+0.15m',
      trend: 'rising'
    },
    airQuality: {
      index: 45,
      trend: 'improving'
    },
    precipitation: {
      current: '600mm',
      change: '+10%',
      trend: 'increasing'
    }
  },
  'sydney': {
    name: 'Sydney',
    country: 'Australia',
    temperature: {
      current: 19.3,
      change: '+2.3°C',
      trend: 'rising'
    },
    seaLevel: {
      current: '0.35m',
      change: '+0.28m',
      trend: 'rising'
    },
    airQuality: {
      index: 55,
      trend: 'stable'
    },
    precipitation: {
      current: '800mm',
      change: '-20%',
      trend: 'decreasing'
    }
  },
  'lagos': {
    name: 'Lagos',
    country: 'Nigeria',
    temperature: {
      current: 27.8,
      change: '+2.0°C',
      trend: 'rising'
    },
    seaLevel: {
      current: '0.5m',
      change: '+0.3m',
      trend: 'rising'
    },
    airQuality: {
      index: 90,
      trend: 'worsening'
    },
    precipitation: {
      current: '1500mm',
      change: '+18%',
      trend: 'increasing'
    }
  }
};

const CLIMATE_PROBLEMS = {
  'new-york': [
    {
      problem: "Coastal Flooding",
      severity: "High",
      description: "Increased frequency of coastal flooding due to sea level rise",
      solutions: [
        "Implement green infrastructure for stormwater management",
        "Elevate critical infrastructure",
        "Develop coastal resilience plans"
      ]
    },
    {
      problem: "Heat Islands",
      severity: "Medium",
      description: "Urban heat island effect intensifying heat waves",
      solutions: [
        "Increase green spaces and urban forests",
        "Implement cool roof programs",
        "Promote reflective surfaces"
      ]
    }
  ],
  'mumbai': [
    {
      problem: "Monsoon Intensity",
      severity: "High",
      description: "More intense and unpredictable monsoon seasons",
      solutions: [
        "Improve drainage systems",
        "Develop early warning systems",
        "Implement flood-resistant architecture"
      ]
    }
  ]
};

function App() {
  const [selectedRegion, setSelectedRegion] = useState('new-york');
  const [climateData, setClimateData] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: '', priority: 'medium', status: 'pending' });

  useEffect(() => {
    // Simulate API call to NASA data
    const fetchClimateData = async () => {
      // In a real app, this would be:
      // const response = await fetch(`NASA_API_URL/${selectedRegion}`);
      // const data = await response.json();
      
      // Using sample data for demonstration
      setTimeout(() => {
        setClimateData(SAMPLE_DATA[selectedRegion]);
      }, 500);
    };

    fetchClimateData();
  }, [selectedRegion]);

  const addTask = () => {
    if (newTask.title.trim()) {
      setTasks([...tasks, { ...newTask, id: Date.now(), region: selectedRegion }]);
      setNewTask({ title: '', priority: 'medium', status: 'pending' });
    }
  };

  const updateTaskStatus = (taskId, newStatus) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, status: newStatus } : task
    ));
  };

  const getTrendIcon = (trend) => {
    switch(trend) {
      case 'rising': return '📈';
      case 'improving': return '📉';
      case 'worsening': return '📈';
      case 'increasing': return '📈';
      case 'decreasing': return '📉';
      case 'stable': return '➡️';
      default: return '➡️';
    }
  };

  const getSeverityColor = (severity) => {
    switch(severity.toLowerCase()) {
      case 'high': return '#ff4444';
      case 'medium': return '#ffaa00';
      case 'low': return '#00aa00';
      default: return '#666';
    }
  };

  return (
    <div className="App">
      <header className="app-header">
        <h1>🌍 Climate Impact Monitor</h1>
        <p>Tracking Climate Change Impacts & Urban Planning Solutions</p>
      </header>

      <div className="app-container">
        {/* Region Selection */}
        <div className="region-selector">
          <h3>Select Region:</h3>
          <div className="region-buttons">
            {Object.keys(SAMPLE_DATA).map(region => (
              <button
                key={region}
                className={`region-btn ${selectedRegion === region ? 'active' : ''}`}
                onClick={() => setSelectedRegion(region)}
              >
                {SAMPLE_DATA[region].name}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content Tabs */}
        <div className="main-tabs">
          <button 
            className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            Climate Overview
          </button>
          <button 
            className={`tab-btn ${activeTab === 'problems' ? 'active' : ''}`}
            onClick={() => setActiveTab('problems')}
          >
            Problems & Solutions
          </button>
          <button 
            className={`tab-btn ${activeTab === 'planner' ? 'active' : ''}`}
            onClick={() => setActiveTab('planner')}
          >
            Urban Planner Panel
          </button>
        </div>

        {/* Content Area */}
        <div className="content-area">
          {activeTab === 'overview' && climateData && (
            <div className="overview-tab">
              <h2>Climate Data for {climateData.name}, {climateData.country}</h2>
              <div className="metrics-grid">
                <div className="metric-card">
                  <h3>Temperature</h3>
                  <div className="metric-value">{climateData.temperature.current}°C</div>
                  <div className="metric-change">
                    {getTrendIcon(climateData.temperature.trend)} 
                    {climateData.temperature.change}
                  </div>
                </div>
                <div className="metric-card">
                  <h3>Sea Level</h3>
                  <div className="metric-value">{climateData.seaLevel.current}</div>
                  <div className="metric-change">
                    {getTrendIcon(climateData.seaLevel.trend)} 
                    {climateData.seaLevel.change}
                  </div>
                </div>
                <div className="metric-card">
                  <h3>Air Quality</h3>
                  <div className="metric-value">Index: {climateData.airQuality.index}</div>
                  <div className="metric-change">
                    {getTrendIcon(climateData.airQuality.trend)} 
                    {climateData.airQuality.trend}
                  </div>
                </div>
                <div className="metric-card">
                  <h3>Precipitation</h3>
                  <div className="metric-value">{climateData.precipitation.current}</div>
                  <div className="metric-change">
                    {getTrendIcon(climateData.precipitation.trend)} 
                    {climateData.precipitation.change}
                  </div>
                </div>
              </div>

              {/* Government Incentives Section */}
              <div className="incentives-section">
                <h3>📊 Government Action Incentives</h3>
                <div className="incentives-grid">
                  <div className="incentive-card">
                    <h4>Economic Benefits</h4>
                    <p>Green infrastructure investments can create 25% more jobs than traditional projects</p>
                  </div>
                  <div className="incentive-card">
                    <h4>Cost Savings</h4>
                    <p>Early adaptation can reduce future climate damage costs by up to 90%</p>
                  </div>
                  <div className="incentive-card">
                    <h4>Health Improvements</h4>
                    <p>Climate-resilient planning can reduce healthcare costs by improving air quality</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'problems' && (
            <div className="problems-tab">
              <h2>Climate Challenges & Solutions for {SAMPLE_DATA[selectedRegion].name}</h2>
              
              <div className="problems-grid">
                {(CLIMATE_PROBLEMS[selectedRegion] || []).map((problem, index) => (
                  <div key={index} className="problem-card">
                    <div className="problem-header">
                      <h3>{problem.problem}</h3>
                      <span 
                        className="severity-badge"
                        style={{ backgroundColor: getSeverityColor(problem.severity) }}
                      >
                        {problem.severity} Priority
                      </span>
                    </div>
                    <p className="problem-description">{problem.description}</p>
                    
                    <div className="solutions-section">
                      <h4>Recommended Solutions:</h4>
                      <ul>
                        {problem.solutions.map((solution, idx) => (
                          <li key={idx}>{solution}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>

              {/* Call to Action */}
              <div className="action-section">
                <h3>🚀 Take Action Now</h3>
                <p>Immediate implementation of these solutions can significantly reduce climate vulnerability and create sustainable urban environments.</p>
                <div className="action-steps">
                  <div className="action-step">
                    <strong>Short-term (0-2 years):</strong> Emergency preparedness and quick-win projects
                  </div>
                  <div className="action-step">
                    <strong>Medium-term (2-5 years):</strong> Infrastructure upgrades and policy changes
                  </div>
                  <div className="action-step">
                    <strong>Long-term (5+ years):</strong> Comprehensive urban transformation
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'planner' && (
            <div className="planner-tab">
              <h2>Urban Planner Task Manager</h2>
              
              {/* Add New Task */}
              <div className="task-input-section">
                <h3>Add New Task</h3>
                <div className="task-form">
                  <input
                    type="text"
                    placeholder="Task description..."
                    value={newTask.title}
                    onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                    className="task-input"
                  />
                  <select
                    value={newTask.priority}
                    onChange={(e) => setNewTask({...newTask, priority: e.target.value})}
                    className="priority-select"
                  >
                    <option value="low">Low Priority</option>
                    <option value="medium">Medium Priority</option>
                    <option value="high">High Priority</option>
                    <option value="urgent">Urgent</option>
                  </select>
                  <button onClick={addTask} className="add-task-btn">
                    Add Task
                  </button>
                </div>
              </div>

              {/* Task Lists */}
              <div className="task-lists">
                <div className="task-column">
                  <h3>Pending ({tasks.filter(t => t.status === 'pending' && t.region === selectedRegion).length})</h3>
                  {tasks.filter(task => task.status === 'pending' && task.region === selectedRegion).map(task => (
                    <div key={task.id} className="task-item">
                      <span>{task.title}</span>
                      <span className={`priority-${task.priority}`}>{task.priority}</span>
                      <button onClick={() => updateTaskStatus(task.id, 'in-progress')}>
                        Start
                      </button>
                    </div>
                  ))}
                </div>

                <div className="task-column">
                  <h3>In Progress ({tasks.filter(t => t.status === 'in-progress' && t.region === selectedRegion).length})</h3>
                  {tasks.filter(task => task.status === 'in-progress' && task.region === selectedRegion).map(task => (
                    <div key={task.id} className="task-item">
                      <span>{task.title}</span>
                      <span className={`priority-${task.priority}`}>{task.priority}</span>
                      <button onClick={() => updateTaskStatus(task.id, 'completed')}>
                        Complete
                      </button>
                    </div>
                  ))}
                </div>

                <div className="task-column">
                  <h3>Completed ({tasks.filter(t => t.status === 'completed' && t.region === selectedRegion).length})</h3>
                  {tasks.filter(task => task.status === 'completed' && task.region === selectedRegion).map(task => (
                    <div key={task.id} className="task-item completed">
                      <span>{task.title}</span>
                      <span className={`priority-${task.priority}`}>{task.priority}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;