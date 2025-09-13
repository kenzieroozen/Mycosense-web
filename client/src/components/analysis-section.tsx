import { useQuery } from "@tanstack/react-query";
import { Upload, SoilAnalysisResult } from "@shared/schema";

export default function AnalysisSection() {
  const { data: uploads } = useQuery<Upload[]>({
    queryKey: ["/api/uploads"],
  });

  const latestUpload = uploads && uploads.length > 0 ? uploads[uploads.length - 1] : null;

  const { data: analysis } = useQuery<SoilAnalysisResult>({
    queryKey: ["/api/uploads", latestUpload?.id, "analysis"],
    enabled: !!latestUpload,
  });

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'High': return 'text-destructive';
      case 'Medium': return 'text-yellow-500';
      case 'Low': return 'text-primary';
      default: return 'text-muted-foreground';
    }
  };

  const getSafetyColor = (safety: string) => {
    switch (safety) {
      case 'Dangerous': return 'text-destructive';
      case 'Acceptable': return 'text-yellow-500';
      case 'Safe': return 'text-primary';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <section id="analysis" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-secondary/50 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-border">
            <i className="fas fa-brain text-accent text-sm"></i>
            <span className="text-sm text-muted-foreground">AI Insights</span>
          </div>
          
          <h3 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Smart <span className="text-accent">Analysis</span> Results
          </h3>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Risk Assessment Card */}
          <div className="bg-card/30 backdrop-blur-sm rounded-2xl p-8 border border-border" data-testid="card-risk-assessment">
            <div className="flex items-center justify-between mb-6">
              <h4 className="text-xl font-bold text-foreground">Risk Assessment</h4>
              <div className="w-3 h-3 bg-accent rounded-full animate-pulse"></div>
            </div>
            
            <div className="space-y-4">
              {analysis ? (
                <>
                  <div className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg">
                    <span className="text-muted-foreground">Lead Contamination</span>
                    <span className={`font-semibold ${getRiskColor(analysis.riskAssessment.leadContamination)}`} data-testid="text-lead-risk">
                      {analysis.riskAssessment.leadContamination}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg">
                    <span className="text-muted-foreground">PFAS Levels</span>
                    <span className={`font-semibold ${getRiskColor(analysis.riskAssessment.pfasLevels)}`} data-testid="text-pfas-risk">
                      {analysis.riskAssessment.pfasLevels}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg">
                    <span className="text-muted-foreground">Overall Safety</span>
                    <span className={`font-semibold ${getSafetyColor(analysis.riskAssessment.overallSafety)}`} data-testid="text-overall-safety">
                      {analysis.riskAssessment.overallSafety}
                    </span>
                  </div>
                </>
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">Upload data to see risk assessment</p>
                </div>
              )}
            </div>
          </div>
          
          {/* Recommendations Card */}
          <div className="bg-card/30 backdrop-blur-sm rounded-2xl p-8 border border-border" data-testid="card-recommendations">
            <div className="flex items-center justify-between mb-6">
              <h4 className="text-xl font-bold text-foreground">AI Recommendations</h4>
              <i className="fas fa-lightbulb text-accent"></i>
            </div>
            
            <div className="space-y-4">
              {analysis && analysis.recommendations.length > 0 ? (
                analysis.recommendations.map((recommendation, index) => (
                  <div key={index} className="p-4 bg-primary/10 rounded-lg border-l-4 border-primary" data-testid={`text-recommendation-${index}`}>
                    <p className="text-sm text-foreground">{recommendation}</p>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">Upload data to see AI recommendations</p>
                </div>
              )}
            </div>
          </div>
          
          {/* Statistics Card */}
          <div className="bg-card/30 backdrop-blur-sm rounded-2xl p-8 border border-border" data-testid="card-statistics">
            <div className="flex items-center justify-between mb-6">
              <h4 className="text-xl font-bold text-foreground">Statistics</h4>
              <i className="fas fa-chart-pie text-primary"></i>
            </div>
            
            <div className="space-y-6">
              {analysis ? (
                <>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-1" data-testid="text-data-points">
                      {analysis.statistics.dataPointsAnalyzed.toLocaleString()}
                    </div>
                    <div className="text-sm text-muted-foreground">Data Points Analyzed</div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-accent mb-1" data-testid="text-accuracy">
                        {analysis.statistics.accuracy}%
                      </div>
                      <div className="text-xs text-muted-foreground">Accuracy</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary mb-1" data-testid="text-analysis-time">
                        {analysis.statistics.analysisTime}s
                      </div>
                      <div className="text-xs text-muted-foreground">Analysis Time</div>
                    </div>
                  </div>
                  
                  <div className="border-t border-border pt-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Last Updated</span>
                      <span className="text-foreground" data-testid="text-last-updated">
                        {new Date(analysis.statistics.lastUpdated).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">Upload data to see statistics</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
