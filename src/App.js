// App.js
import React, { useState, useEffect } from "react";
import "./App.css";


const NASA_API_KEY = ""; 
const NASA_POWER_BASE_URL = "https://power.larc.nasa.gov/api/temporal/daily/point";

// Selected regions
const REGIONS = {
  "new-york": {
    name: "New York City",
    country: "USA",
    lat: 40.7128,
    lon: -74.006,
  },
  mumbai: {
    name: "Mumbai",
    country: "India",
    lat: 19.076,
    lon: 72.8777,
  },
  london: {
    name: "London",
    country: "UK",
    lat: 51.5074,
    lon: -0.1278,
  },
  sydney: {
    name: "Sydney",
    country: "Australia",
    lat: -33.8688,
    lon: 151.2093,
  },
  lagos: {
    name: "Lagos",
    country: "Nigeria",
    lat: 6.5244,
    lon: 3.3792,
  },
};

//Climate problems and proposed solutions
const CLIMATE_PROBLEMS = {
  "new-york": [
    {
      problem: "Coastal Flooding",
      severity: "High",
      explanation:
        "Sea-level rise combined with higher storm surge and more intense precipitation events is increasing the frequency and severity of coastal flood events. Low-lying neighborhoods, critical electrical substations, and transport corridors are at risk of repeated inundation.",
      impactSummary:
        "Repeated flooding disrupts commerce, damages housing, increases insurance costs, and disproportionately affects low-income communities. Economically, flood events can cost hundreds of millions per major event in an urban economy like New York’s.",
      solutions: [
        {
          title: "Green infrastructure for stormwater management",
          rationale:
            "Bioretention, permeable pavements and urban wetlands slow and infiltrate runoff, reducing peak flows and lowering flood heights at critical times.",
          impact:
            "Can reduce localized flooding and provide co-benefits (cooling, biodiversity), while costing less than hard-engineered solutions in many cases.",
        },
        {
          title: "Elevate and protect critical infrastructure",
          rationale:
            "Raising substations, sewage pumps and emergency centers — or building flood shields — keeps essential services available during storms.",
          impact:
            "Avoids catastrophic service interruptions and reduces the long-term cost of repeated repairs and outages.",
        },
        {
          title: "Comprehensive coastal resilience planning",
          rationale:
            "Zoning changes, managed retreat in highest-risk areas, and integrated nature-based defenses create strategic, prioritized protection plans.",
          impact:
            "Improves public safety and enables targeted investments that maximize social returns and reduce long-term liability.",
        },
      ],
    },
    {
      problem: "Urban Heat Islands",
      severity: "Medium",
      explanation:
        "Dense built environments with low vegetation and dark surfaces retain heat, causing urban temperatures to spike higher than surrounding rural areas. Heat waves' frequency and intensity are rising, stressing public health systems.",
      impactSummary:
        "Heat-related illnesses and mortality increase, electricity demand for cooling spikes (risking grid strain), and outdoor workers face higher health risks—creating economic and health inequities.",
      solutions: [
        {
          title: "Increase green spaces and urban forestry",
          rationale:
            "Shaded streets and parks reduce surface and air temperatures via evapotranspiration and shade.",
          impact:
            "Reduces cooling energy demand, improves air quality, and provides social and mental health benefits.",
        },
        {
          title: "Cool roof and cool pavement programs",
          rationale:
            "Reflective materials reduce heat absorption from buildings and streets.",
          impact:
            "Lower building cooling loads and slower heat accumulation in the urban canopy.",
        },
        {
          title: "Targeted community cooling centers and outreach",
          rationale:
            "Provides immediate protection during heatwaves for vulnerable populations.",
          impact:
            "Reduces heat-related morbidity and mortality and can be deployed faster than infrastructure projects.",
        },
      ],
    },
  ],

  mumbai: [
    {
      problem: "Monsoon Intensity & Flash Flooding",
      severity: "High",
      explanation:
        "Shifts in atmospheric moisture patterns and land-use change cause heavier, more localized rainfall during monsoon months. Poorly maintained drainage and rapid land reclamation amplify runoff.",
      impactSummary:
        "Street and building flooding, transport disruption, spread of water-borne disease, and damage to informal settlements lead to high social and economic costs—especially among low-income populations.",
      solutions: [
        {
          title: "Upgrade and de-silt drainage networks",
          rationale:
            "Larger, well-maintained drains and canals reduce surface ponding and speed safe conveyance of runoff.",
          impact:
            "Immediate reduction in urban flooding incidents and lower maintenance costs over time.",
        },
        {
          title: "Early warning and local flood mapping",
          rationale:
            "Community-focused warnings and micro-scale maps guide evacuations and protective behavior.",
          impact:
            "Reduces loss of life and allows for targeted emergency response.",
        },
        {
          title: "Flood-resilient architecture and raised access",
          rationale:
            "Designing housing with raised ground floors and flood-tolerant materials reduces repair costs and speeds recovery.",
          impact:
            "Protects the most vulnerable housing stock and reduces long-term displacement.",
        },
      ],
    },
  ],

  london: [
    {
      problem: "River & Surface Flooding",
      severity: "Medium",
      explanation:
        "Heavier rainfall events increase peak river flows and runoff. Where historic floodplains have been constricted by development, flood peaks are higher and faster.",
      impactSummary:
        "Flooding damages homes and businesses, strains drainage systems, and can close transport corridors—impacting economic activity and safety.",
      solutions: [
        {
          title: "Restore natural floodplains",
          rationale:
            "Returning land to floodplain function stores water upstream and reduces downstream peaks.",
          impact:
            "Provides ecosystem benefits and reduces reliance on costly engineering works downstream.",
        },
        {
          title: "Sustainable Urban Drainage Systems (SUDS)",
          rationale:
            "Decentralized infiltration and retention reduce stormwater runoff volumes and rates.",
          impact:
            "Lower peak flows and improved urban amenity value (parks, wetlands).",
        },
        {
          title: "Improve flood warning & community preparedness",
          rationale:
            "Timely warnings and clear evacuation routes reduce human risk.",
          impact:
            "Minimizes injury and allows quicker, organized response and recovery.",
        },
      ],
    },
  ],

  sydney: [
    {
      problem: "Increased Bushfire Risk",
      severity: "High",
      explanation:
        "Higher temperatures, longer dry seasons, and episodic extreme heat create conditions favorable to large, fast-moving wildfires in urban–wildland interfaces.",
      impactSummary:
        "Loss of life, property, ecosystem damage, air quality deterioration with long-range smoke impacts—plus large economic losses from firefighting and recovery.",
      solutions: [
        {
          title: "Create and maintain fuel breaks & managed burns",
          rationale:
            "Proactive vegetation management reduces available fuel and slows wildfire spread.",
          impact:
            "Reduces intensity and area burned in large events when done correctly and safely.",
        },
        {
          title: "Community preparedness & evacuation planning",
          rationale:
            "Clear plans and training reduce confusion during fire events.",
          impact:
            "Saves lives and reduces last-minute panic that leads to more damage.",
        },
        {
          title: "Early detection & real-time monitoring",
          rationale:
            "Sensors, satellites and local reporting allow faster response and containment.",
          impact:
            "Smaller fires and fewer resources lost to late detection.",
        },
      ],
    },
  ],

  lagos: [
    {
      problem: "Coastal Erosion & Sea-level Threats",
      severity: "High",
      explanation:
        "Rising sea level, stronger wave action, and human-driven coastal changes accelerate erosion, threatening homes, transport infrastructure and livelihoods in coastal communities.",
      impactSummary:
        "Loss of land, displacement of communities, reduced fishery productivity, and expensive infrastructure repairs—all hitting vulnerable communities hardest.",
      solutions: [
        {
          title: "Mangrove restoration and living shorelines",
          rationale:
            "Mangroves stabilize sediments, attenuate wave energy, and support fisheries.",
          impact:
            "Provides long-term coastal protection and livelihood co-benefits at relatively low cost.",
        },
        {
          title: "Strategic seawalls and hybrid defenses",
          rationale:
            "Combine hard defenses at critical nodes with nature-based solutions elsewhere for balanced protection.",
          impact:
            "Protects key infrastructure while preserving natural coastal functions where possible.",
        },
        {
          title: "Coastal zone management planning",
          rationale:
            "Zoning, relocation plans and community participation reduce ad-hoc development in high-risk zones.",
          impact:
            "Reduces future exposure and long-term public costs.",
        },
      ],
    },
  ],
};

/**
 * Helper: safe numeric average with fallback.
 */
const safeAverage = (arr) => {
  const nums = arr.filter((v) => typeof v === "number" && !Number.isNaN(v));
  if (nums.length === 0) return null;
  const sum = nums.reduce((a, b) => a + b, 0);
  return sum / nums.length;
};

/**
 * Component
 */
function App() {
  const [selectedRegion, setSelectedRegion] = useState("new-york");
  const [climateData, setClimateData] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    title: "",
    priority: "medium",
    status: "pending",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // UI state for expanded problem/solutions per card
  const [expandedProblems, setExpandedProblems] = useState({});

  useEffect(() => {
    // Fetch climate data whenever the selected region changes
    const fetchNASAClimateData = async () => {
      setLoading(true);
      setError(null);

      try {
        const region = REGIONS[selectedRegion];
        // Use a 5-year window ending at the last full year (safer)
        const now = new Date();
        const endYear = now.getFullYear() - 0; // current year included if available
        const startYear = endYear - 4; // 5-year window

        const startDate = `${startYear}0101`;
        const endDate = `${endYear}1231`;

        // Parameters we want (retain the ones you used)
        const parameterList = [
          "T2M", // Temperature at 2m
          "PRECTOT", // Precipitation
          "RH2M", // Relative humidity
          "WS2M", // Wind speed
          "ALLSKY_SFC_SW_DWN", // Solar radiation
        ].join(",");

        // Build query params robustly
        const params = new URLSearchParams({
          parameters: parameterList,
          community: "RE",
          longitude: region.lon,
          latitude: region.lat,
          start: startDate,
          end: endDate,
          format: "JSON",
        });

        // Append API key only if configured (safer)
        if (NASA_API_KEY && NASA_API_KEY.trim().length > 0) {
          params.set("api_key", NASA_API_KEY.trim());
        }

        const url = `${NASA_POWER_BASE_URL}?${params.toString()}`;

        // Attempt fetch with a timeout fallback
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 20000); // 20s

        const response = await fetch(url, { signal: controller.signal });
        clearTimeout(timeoutId);

        if (!response.ok) {
          throw new Error(`NASA API error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();

        // Process the NASA data more defensively
        const processed = processNASADataSafely(data, region);
        setClimateData({ ...processed, dataSource: "NASA POWER API - Real Data" });
      } catch (err) {
        console.error("Error fetching NASA data:", err);
        setError(
          `Failed to load NASA data: ${
            err.name === "AbortError" ? "request timed out" : err.message
          }. Falling back to sample data.`
        );

        // Use a richer sample fallback (includes more fields)
        setClimateData({
          ...generateSampleData(REGIONS[selectedRegion]),
          dataSource: "Sample Data (NASA unavailable)",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchNASAClimateData();
    // reset expanded problems when region changes
    setExpandedProblems({});
  }, [selectedRegion]);

  /**
   * Process NASA POWER response defensively.
   * The API historically returns parameters on `properties.parameter`, but
   * some responses may nest differently; this function checks for either.
   */
  const processNASADataSafely = (nasaData, region) => {
    // The NASA POWER JSON usually contains `properties.parameter.<PARAM>.<DATE> = value`
    const paramContainer =
      nasaData?.properties?.parameter || nasaData?.properties?.parameters || nasaData?.parameters;
    if (!paramContainer) {
      throw new Error("Unexpected NASA response shape: no parameters found");
    }

    // Extract arrays of numeric values for each parameter across dates
    const getValues = (paramName) => {
      const paramObj = paramContainer[paramName];
      if (!paramObj) return [];
      // paramObj usually: { "YYYYMMDD": value, ... }
      const values = Object.values(paramObj).map((v) =>
        typeof v === "number" ? v : Number(v)
      ).filter(v => typeof v === "number" && !Number.isNaN(v));
      return values;
    };

    const tempVals = getValues("T2M");
    const precipVals = getValues("PRECTOT");
    const rhVals = getValues("RH2M");
    const windVals = getValues("WS2M");

    // if we don't have enough values, throw so fallback triggers
    if (tempVals.length < 30 || precipVals.length < 30) {
      throw new Error("Insufficient climate data returned from NASA");
    }

    // Compute current-ish averages (last 365 days if available, otherwise whole set)
    const lastN = (arr, n) => arr.slice(Math.max(0, arr.length - n));
    const avgLast365 = (arr) => {
      const slice = lastN(arr, 365);
      return safeAverage(slice);
    };

    const avgFirst365 = (arr) => {
      const slice = arr.slice(0, Math.min(365, arr.length));
      return safeAverage(slice);
    };

    const currentTemp = avgLast365(tempVals);
    const temp5YearsAgo = avgFirst365(tempVals);
    const tempChange = currentTemp != null && temp5YearsAgo != null ? currentTemp - temp5YearsAgo : null;

    const currentPrecip = safeAverage(lastN(precipVals, 365));
    const precip5YearsAgo = safeAverage(precipVals.slice(0, Math.min(365, precipVals.length)));
    const precipChangePercent =
      currentPrecip != null && precip5YearsAgo != null && precip5YearsAgo !== 0
        ? ((currentPrecip - precip5YearsAgo) / precip5YearsAgo) * 100
        : null;

    return {
      name: region.name,
      country: region.country,
      temperature: {
        current: currentTemp != null ? currentTemp.toFixed(1) : "N/A",
        change:
          tempChange != null ? `${tempChange > 0 ? "+" : ""}${tempChange.toFixed(1)}°C` : "N/A",
        trend:
          tempChange != null ? (tempChange > 0.5 ? "rising" : tempChange < -0.5 ? "falling" : "stable") : "unknown",
      },
      precipitation: {
        current: currentPrecip != null ? `${currentPrecip.toFixed(1)} mm/day` : "N/A",
        change: precipChangePercent != null ? `${precipChangePercent > 0 ? "+" : ""}${precipChangePercent.toFixed(1)}%` : "N/A",
        trend:
          precipChangePercent != null ? (precipChangePercent > 5 ? "increasing" : precipChangePercent < -5 ? "decreasing" : "stable") : "unknown",
      },
      humidity: {
        current: rhVals.length ? `${safeAverage(lastN(rhVals, 30)).toFixed(1)}%` : "N/A",
        trend: "stable",
      },
      windSpeed: {
        current: windVals.length ? `${safeAverage(lastN(windVals, 30)).toFixed(1)} m/s` : "N/A",
        trend: "stable",
      },
      seaLevel: {
        current: "See NASA Sea Level API",
        change: "Specialized data required",
        trend: "unknown",
      },
      airQuality: {
        index: "See NASA Air Quality API",
        trend: "unknown",
      },
    };
  };

  /**
   * Generate sample data but with somewhat plausible values and richer meta
   */
  const generateSampleData = (region) => {
    const temp = 10 + Math.random() * 18;
    return {
      name: region.name,
      country: region.country,
      temperature: {
        current: temp.toFixed(1),
        change: `${Math.random() > 0.5 ? "+" : ""}${(Math.random() * 1.6).toFixed(1)}°C`,
        trend: Math.random() > 0.6 ? "rising" : "stable",
      },
      precipitation: {
        current: `${(2 + Math.random() * 5).toFixed(2)} mm/day`,
        change: `${Math.random() > 0.5 ? "+" : ""}${(Math.random() * 15).toFixed(1)}%`,
        trend: Math.random() > 0.6 ? "increasing" : "stable",
      },
      humidity: {
        current: `${(40 + Math.random() * 40).toFixed(1)}%`,
        trend: "stable",
      },
      windSpeed: {
        current: `${(2 + Math.random() * 4).toFixed(1)} m/s`,
        trend: "stable",
      },
      seaLevel: {
        current: `${(0.05 + Math.random() * 0.4).toFixed(2)} m`,
        change: `${Math.random() > 0.5 ? "+" : ""}${(Math.random() * 0.2).toFixed(2)} m`,
        trend: "rising",
      },
      airQuality: {
        index: Math.floor(20 + Math.random() * 80),
        trend: Math.random() > 0.7 ? "improving" : Math.random() > 0.3 ? "stable" : "worsening",
      },
    };
  };

  // Task manager functions
  const addTask = () => {
    if (newTask.title.trim()) {
      setTasks([...tasks, { ...newTask, id: Date.now(), region: selectedRegion }]);
      setNewTask({ title: "", priority: "medium", status: "pending" });
    }
  };
  const updateTaskStatus = (taskId, newStatus) => {
    setTasks(tasks.map((task) => (task.id === taskId ? { ...task, status: newStatus } : task)));
  };

  // UI helpers
  const getTrendIcon = (trend) => {
    switch (trend) {
      case "rising":
      case "increasing":
      case "worsening":
        return "📈";
      case "falling":
      case "decreasing":
      case "improving":
        return "📉";
      case "stable":
        return "➡️";
      case "unknown":
        return "❓";
      default:
        return "➡️";
    }
  };
  const getSeverityColor = (severity) => {
    switch (severity.toLowerCase()) {
      case "high":
        return "#ff4444";
      case "medium":
        return "#ffaa00";
      case "low":
        return "#00aa00";
      default:
        return "#666";
    }
  };

  const toggleProblemExpand = (index) => {
    setExpandedProblems((s) => ({ ...s, [index]: !s[index] }));
  };

  return (
    <div className="App">
      <header className="app-header">
        <h1>🌍 Climate Impact Monitor</h1>
        <p>Tracking Climate Change Impacts with NASA Data — enriched with actionable context</p>

        <div className="api-status">
          {loading && <span className="loading">🔄 Loading NASA Data...</span>}
          {error && <span className="error">⚠️ {error}</span>}
          {climateData && !loading && !error && (
            <span className="success">✅ Using {climateData.dataSource}</span>
          )}
        </div>
      </header>

      <div className="app-container">
        {/* Region Selection */}
        <div className="region-selector">
          <h3>Select Region:</h3>
          <div className="region-buttons">
            {Object.keys(REGIONS).map((region) => (
              <button
                key={region}
                className={`region-btn ${selectedRegion === region ? "active" : ""}`}
                onClick={() => setSelectedRegion(region)}
              >
                {REGIONS[region].name}
              </button>
              
            ))}
          </div>
        </div>

        {/* Main Tabs */}
        <div className="main-tabs">
          <button
            className={`tab-btn ${activeTab === "overview" ? "active" : ""}`}
            onClick={() => setActiveTab("overview")}
          >
            Climate Overview
          </button>
          <button
            className={`tab-btn ${activeTab === "problems" ? "active" : ""}`}
            onClick={() => setActiveTab("problems")}
          >
            Problems & Solutions
          </button>
          <button
            className={`tab-btn ${activeTab === "planner" ? "active" : ""}`}
            onClick={() => setActiveTab("planner")}
          >
            Urban Planner Panel
          </button>
        </div>

        {/* Content Area */}
        <div className="content-area">
          {/* Overview */}
          {activeTab === "overview" && climateData && (
            <div className="overview-tab">
              <h2>
                Climate Data for {climateData.name}, {climateData.country}
              </h2>

              <p className="data-source">
                📡 {climateData.dataSource} • 🔑 API:{" "}
                {NASA_API_KEY ? "configured (hidden)" : "not configured — using public endpoint/fallbacks"}
              </p>

              <div className="metrics-grid">
                <div className="metric-card">
                  <h3>🌡️ Temperature</h3>
                  <div className="metric-value">{climateData.temperature.current}°C</div>
                  <div className="metric-change">
                    {getTrendIcon(climateData.temperature.trend)} {climateData.temperature.change}
                  </div>
                  <small>5-year comparison (where available)</small>
                </div>

                <div className="metric-card">
                  <h3>🌧️ Precipitation</h3>
                  <div className="metric-value">{climateData.precipitation.current}</div>
                  <div className="metric-change">
                    {getTrendIcon(climateData.precipitation.trend)} {climateData.precipitation.change}
                  </div>
                  <small>Annual change where available</small>
                </div>

                <div className="metric-card">
                  <h3>💧 Humidity</h3>
                  <div className="metric-value">{climateData.humidity.current}</div>
                  <div className="metric-change">{getTrendIcon(climateData.humidity.trend)} {climateData.humidity.trend}</div>
                  <small>Recent monthly average</small>
                </div>

                <div className="metric-card">
                  <h3>💨 Wind Speed</h3>
                  <div className="metric-value">{climateData.windSpeed.current}</div>
                  <div className="metric-change">{getTrendIcon(climateData.windSpeed.trend)} {climateData.windSpeed.trend}</div>
                  <small>Recent monthly average</small>
                </div>

                <div className="metric-card">
                  <h3>🌊 Sea Level</h3>
                  <div className="metric-value">{climateData.seaLevel.current}</div>
                  <div className="metric-change">{getTrendIcon(climateData.seaLevel.trend)} {climateData.seaLevel.change}</div>
                  <small>Specialized dataset required</small>
                </div>

                <div className="metric-card">
                  <h3>🌫️ Air Quality</h3>
                  <div className="metric-value">{climateData.airQuality.index}</div>
                  <div className="metric-change">{getTrendIcon(climateData.airQuality.trend)} {climateData.airQuality.trend}</div>
                  <small>Specialized dataset required</small>
                </div>
              </div>

              <div className="incentives-section">
                <h3>📊 Government Action Incentives (high-level)</h3>
                <div className="incentives-grid">
                  <div className="incentive-card">
                    <h4>Economic Benefits</h4>
                    <p>
                      Strategic climate investments create jobs, reduce disaster spending, and improve investor confidence.
                    </p>
                  </div>
                  <div className="incentive-card">
                    <h4>Cost Savings</h4>
                    <p>
                      Early adaptation reduces expected cumulative damages and can shorten recovery time after events.
                    </p>
                  </div>
                  <div className="incentive-card">
                    <h4>Health & Equity</h4>
                    <p>
                      Resilience measures improve air and thermal comfort, lowering healthcare burdens for vulnerable communities.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Problems & Solutions */}
          {activeTab === "problems" && (
            <div className="problems-tab">
              <h2>Climate Challenges & Solutions for {REGIONS[selectedRegion].name}</h2>

              <div className="problems-grid">
                {(CLIMATE_PROBLEMS[selectedRegion] || []).map((item, index) => (
                  <div key={index} className="problem-card">
                    <div className="problem-header">
                      <h3>{item.problem}</h3>
                      <span
                        className="severity-badge"
                        style={{ backgroundColor: getSeverityColor(item.severity) }}
                      >
                        {item.severity} Priority
                      </span>
                    </div>

                    <p className="problem-description">{item.explanation}</p>

                    <div className="impact-summary">
                      <strong>Why this matters:</strong>
                      <p>{item.impactSummary}</p>
                    </div>

                    <div className="solutions-section">
                      <h4>Recommended Solutions</h4>

                      <ul className="solutions-list">
                        {item.solutions.map((sol, sidx) => (
                          <li key={sidx} className="solution-item">
                            <div className="solution-top">
                              <strong>{sol.title}</strong>
                              <button
                                className="toggle-solution"
                                onClick={() =>
                                  setExpandedProblems((s) => ({
                                    ...s,
                                    [`${index}-${sidx}`]: !s[`${index}-${sidx}`],
                                  }))
                                }
                              >
                                {expandedProblems[`${index}-${sidx}`] ? "Hide details" : "Show details"}
                              </button>
                            </div>

                            {expandedProblems[`${index}-${sidx}`] && (
                              <div className="solution-details">
                                <p><em>Rationale:</em> {sol.rationale}</p>
                                <p><em>Expected impact:</em> {sol.impact}</p>
                              </div>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="action-section">
                      <strong>Recommended timeline:</strong>
                      <div className="action-steps">
                        <div><strong>Short-term (0-1 year):</strong> emergency preparedness, early-warning, quick-wins</div>
                        <div><strong>Medium-term (2-3 years):</strong> infrastructure upgrades, policy and zoning changes</div>
                        <div><strong>Long-term (3+ years):</strong> strategic retreat, ecosystem restoration, large investments</div>
                      </div>
                    </div>

                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Planner */}
          {activeTab === "planner" && (
            <div className="planner-tab">
              <h2>Urban Planner Task Manager</h2>

              <div className="task-input-section">
                <h3>Add New Task</h3>
                <div className="task-form">
                  <input
                    type="text"
                    placeholder="Task description..."
                    value={newTask.title}
                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                    className="task-input"
                  />
                  <select
                    value={newTask.priority}
                    onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
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

              <div className="task-lists">
                <div className="task-column">
                  <h3>Pending ({tasks.filter((t) => t.status === "pending" && t.region === selectedRegion).length})</h3>
                  {tasks
                    .filter((task) => task.status === "pending" && task.region === selectedRegion)
                    .map((task) => (
                      <div key={task.id} className="task-item">
                        <span>{task.title}</span>
                        <span className={`priority-${task.priority}`}>{task.priority}</span>
                        <button onClick={() => updateTaskStatus(task.id, "in-progress")}>Start</button>
                      </div>
                    ))}
                </div>

                <div className="task-column">
                  <h3>In Progress ({tasks.filter((t) => t.status === "in-progress" && t.region === selectedRegion).length})</h3>
                  {tasks
                    .filter((task) => task.status === "in-progress" && task.region === selectedRegion)
                    .map((task) => (
                      <div key={task.id} className="task-item">
                        <span>{task.title}</span>
                        <span className={`priority-${task.priority}`}>{task.priority}</span>
                        <button onClick={() => updateTaskStatus(task.id, "completed")}>Complete</button>
                      </div>
                    ))}
                </div>

                <div className="task-column">
                  <h3>Completed ({tasks.filter((t) => t.status === "completed" && t.region === selectedRegion).length})</h3>
                  {tasks
                    .filter((task) => task.status === "completed" && task.region === selectedRegion)
                    .map((task) => (
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

      <footer className="app-footer">
        <small>
          Tip: to use the NASA POWER API with an API key, set <code>NASA_API_KEY</code> in the top of <code>App.js</code>. The app will not display the key.
        </small>
      </footer>
    </div>
  );
}

export default App;
