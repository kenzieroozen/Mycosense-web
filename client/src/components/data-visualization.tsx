import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { Upload, SoilData } from "@shared/schema";
import { createHeatmap, createBarChart, createLineChart } from "@/lib/charts";

export default function DataVisualization() {
  const { data: uploads } = useQuery<Upload[]>({
    queryKey: ["/api/uploads"],
  });

  const latestUpload = uploads && uploads.length > 0 ? uploads[uploads.length - 1] : null;

  const { data: soilData, isLoading } = useQuery<SoilData[]>({
    queryKey: ["/api/uploads", latestUpload?.id, "data"],
    enabled: !!latestUpload,
  });

  useEffect(() => {
    if (soilData && soilData.length > 0) {
      // Create charts with the soil data
      createHeatmap(soilData, 'heatmapChart');
      createBarChart(soilData, 'barChart');
      createLineChart(soilData, 'lineChart');
    }
  }, [soilData]);

  if (!uploads || uploads.length === 0) {
    return (
      <div className="mt-10">
        <div className="text-center py-16">
          <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <i className="fas fa-chart-area text-primary text-3xl"></i>
          </div>
          <h4 className="text-2xl font-bold text-foreground mb-4">No Data Available</h4>
          <p className="text-muted-foreground">
            Upload a CSV file to start visualizing your soil contamination data
          </p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="mt-10">
        <div className="text-center py-16">
          <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
            <i className="fas fa-spinner fa-spin text-primary text-3xl"></i>
          </div>
          <h4 className="text-2xl font-bold text-foreground mb-4">Loading Data...</h4>
          <p className="text-muted-foreground">
            Processing your soil contamination data
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-10 space-y-8" data-testid="data-visualization">
      {/* Heatmap Visualization */}
      <div className="chart-container rounded-2xl p-8">
        <div className="flex items-center justify-between mb-6">
          <h4 className="text-2xl font-bold text-foreground">Soil Contamination Heatmap</h4>
          <div className="flex items-center space-x-2">
            <button className="text-muted-foreground hover:text-primary" title="Refresh" data-testid="button-refresh-heatmap">
              <i className="fas fa-sync-alt"></i>
            </button>
            <button className="text-muted-foreground hover:text-primary" title="Download" data-testid="button-download-heatmap">
              <i className="fas fa-download"></i>
            </button>
            <button className="text-muted-foreground hover:text-primary" title="Settings" data-testid="button-settings-heatmap">
              <i className="fas fa-cog"></i>
            </button>
          </div>
        </div>
        
        <div id="heatmapChart" className="w-full h-96" data-testid="chart-heatmap"></div>
      </div>
      
      {/* Bar Chart and Line Chart Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Pollutant Distribution Bar Chart */}
        <div className="chart-container rounded-2xl p-8">
          <div className="flex items-center justify-between mb-6">
            <h4 className="text-xl font-bold text-foreground">Pollutant Distribution</h4>
            <button className="text-muted-foreground hover:text-primary" title="Expand" data-testid="button-expand-bar">
              <i className="fas fa-expand"></i>
            </button>
          </div>
          
          <div id="barChart" className="w-full h-64" data-testid="chart-bar"></div>
        </div>
        
        {/* Voltage Trend Line Chart */}
        <div className="chart-container rounded-2xl p-8">
          <div className="flex items-center justify-between mb-6">
            <h4 className="text-xl font-bold text-foreground">Voltage Trend Analysis</h4>
            <button className="text-muted-foreground hover:text-primary" title="Expand" data-testid="button-expand-line">
              <i className="fas fa-expand"></i>
            </button>
          </div>
          
          <div id="lineChart" className="w-full h-64" data-testid="chart-line"></div>
        </div>
      </div>
    </div>
  );
}
