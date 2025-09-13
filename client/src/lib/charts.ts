import { SoilData } from "@shared/schema";

// Import Plotly.js
declare global {
  interface Window {
    Plotly: any;
  }
}

// Load Plotly.js dynamically
const loadPlotly = async () => {
  if (typeof window !== 'undefined' && !window.Plotly) {
    const script = document.createElement('script');
    script.src = 'https://cdn.plot.ly/plotly-latest.min.js';
    script.async = true;
    
    return new Promise((resolve, reject) => {
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }
  return Promise.resolve();
};

export const createHeatmap = async (data: SoilData[], containerId: string) => {
  await loadPlotly();
  
  if (!window.Plotly) {
    console.error('Plotly.js failed to load');
    return;
  }

  const trace = {
    x: data.map(d => d.x),
    y: data.map(d => d.y),
    z: data.map(d => d.voltage),
    type: 'heatmap',
    colorscale: [
      [0, '#10b981'], // Green (low contamination)
      [0.5, '#f59e0b'], // Yellow (medium contamination)
      [1, '#ef4444'] // Red (high contamination)
    ],
    showscale: true,
    colorbar: {
      title: 'Voltage Level',
      titlefont: { color: '#ffffff' },
      tickfont: { color: '#ffffff' }
    }
  };

  const layout = {
    title: {
      text: 'Soil Contamination Heatmap',
      font: { color: '#ffffff', size: 16 }
    },
    xaxis: {
      title: 'X Coordinate',
      color: '#ffffff',
      gridcolor: '#374151'
    },
    yaxis: {
      title: 'Y Coordinate',
      color: '#ffffff',
      gridcolor: '#374151'
    },
    paper_bgcolor: 'rgba(0,0,0,0)',
    plot_bgcolor: 'rgba(0,0,0,0)',
    font: { color: '#ffffff' }
  };

  const config = {
    responsive: true,
    displayModeBar: true,
    modeBarButtonsToRemove: ['pan2d', 'lasso2d', 'select2d'],
    displaylogo: false
  };

  window.Plotly.newPlot(containerId, [trace], layout, config);
};

export const createBarChart = async (data: SoilData[], containerId: string) => {
  await loadPlotly();
  
  if (!window.Plotly) {
    console.error('Plotly.js failed to load');
    return;
  }

  // Count pollutant occurrences
  const pollutantCounts: Record<string, number> = {};
  data.forEach(d => {
    pollutantCounts[d.pollutant] = (pollutantCounts[d.pollutant] || 0) + 1;
  });

  const trace = {
    x: Object.keys(pollutantCounts),
    y: Object.values(pollutantCounts),
    type: 'bar',
    marker: {
      color: '#10b981',
      opacity: 0.8
    }
  };

  const layout = {
    title: {
      text: 'Pollutant Distribution',
      font: { color: '#ffffff', size: 16 }
    },
    xaxis: {
      title: 'Pollutant Type',
      color: '#ffffff',
      gridcolor: '#374151'
    },
    yaxis: {
      title: 'Count',
      color: '#ffffff',
      gridcolor: '#374151'
    },
    paper_bgcolor: 'rgba(0,0,0,0)',
    plot_bgcolor: 'rgba(0,0,0,0)',
    font: { color: '#ffffff' }
  };

  const config = {
    responsive: true,
    displayModeBar: true,
    modeBarButtonsToRemove: ['pan2d', 'lasso2d', 'select2d'],
    displaylogo: false
  };

  window.Plotly.newPlot(containerId, [trace], layout, config);
};

export const createLineChart = async (data: SoilData[], containerId: string) => {
  await loadPlotly();
  
  if (!window.Plotly) {
    console.error('Plotly.js failed to load');
    return;
  }

  // Sort data by timestamp for trend analysis
  const sortedData = [...data].sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());

  const trace = {
    x: sortedData.map((_, i) => i + 1),
    y: sortedData.map(d => d.voltage),
    mode: 'lines+markers',
    type: 'scatter',
    line: {
      color: '#10b981',
      width: 2
    },
    marker: {
      color: '#10b981',
      size: 6
    }
  };

  const layout = {
    title: {
      text: 'Voltage Trend Analysis',
      font: { color: '#ffffff', size: 16 }
    },
    xaxis: {
      title: 'Data Point Index',
      color: '#ffffff',
      gridcolor: '#374151'
    },
    yaxis: {
      title: 'Voltage Level',
      color: '#ffffff',
      gridcolor: '#374151'
    },
    paper_bgcolor: 'rgba(0,0,0,0)',
    plot_bgcolor: 'rgba(0,0,0,0)',
    font: { color: '#ffffff' }
  };

  const config = {
    responsive: true,
    displayModeBar: true,
    modeBarButtonsToRemove: ['pan2d', 'lasso2d', 'select2d'],
    displaylogo: false
  };

  window.Plotly.newPlot(containerId, [trace], layout, config);
};
