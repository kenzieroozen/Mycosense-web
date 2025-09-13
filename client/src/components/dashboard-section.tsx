import FileUploadZone from "./file-upload-zone";
import DataVisualization from "./data-visualization";

export default function DashboardSection() {
  return (
    <section id="dashboard" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-secondary/50 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-border">
            <i className="fas fa-chart-bar text-primary text-sm"></i>
            <span className="text-sm text-muted-foreground">Data Analytics</span>
          </div>
          
          <h3 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            📊 Interactive <span className="text-primary">Dashboard</span>
          </h3>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12">
            Upload your CSV data and visualize soil contamination patterns with advanced interactive charts.
          </p>
        </div>
        
        <FileUploadZone />
        <DataVisualization />
      </div>
    </section>
  );
}
