export default function HeroSection() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="home" className="h-screen flex flex-col justify-center items-center text-center px-6 pt-20">
      {/* Microscopic pattern background */}
      <div className="absolute inset-0 opacity-5">
        <div className="grid grid-cols-12 gap-4 h-full">
          {Array(60).fill(0).map((_, i) => (
            <div key={i} className="w-4 h-4 bg-primary rounded-full opacity-30"></div>
          ))}
        </div>
      </div>
      
      <div className="relative z-10 max-w-5xl">
        <div className="inline-flex items-center space-x-2 bg-secondary/50 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-border">
          <i className="fas fa-microscope text-accent text-sm"></i>
          <span className="text-sm text-muted-foreground">Advanced Biosensor Technology</span>
        </div>
        
        <h2 className="text-6xl md:text-7xl font-black mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent leading-tight">
          Soil Safety<br/>Dashboard
        </h2>
        
        <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
          Upload your soil biosensor data to analyze contamination risks with real-time visualization and AI-powered insights.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
          <button 
            onClick={() => scrollToSection('dashboard')}
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-primary/25"
            data-testid="button-start-analysis"
          >
            <i className="fas fa-upload mr-2"></i>
            Start Analysis
          </button>
          
          <button 
            onClick={() => scrollToSection('features')}
            className="border border-border hover:bg-secondary text-foreground px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 backdrop-blur-sm"
            data-testid="button-watch-demo"
          >
            <i className="fas fa-play mr-2"></i>
            Watch Demo
          </button>
        </div>
        
        <div className="mt-12 flex items-center justify-center space-x-8 text-muted-foreground">
          <div className="flex items-center space-x-2">
            <i className="fas fa-shield-alt text-primary"></i>
            <span className="text-sm">Comprehensive AI Driven Analysis</span>
          </div>
          <div className="flex items-center space-x-2">
            <i className="fas fa-clock text-primary"></i>
            <span className="text-sm">Real-time Results</span>
          </div>
          <div className="flex items-center space-x-2">
            <i className="fas fa-leaf text-primary"></i>
            <span className="text-sm">Eco-friendly</span>
          </div>
        </div>
      </div>
    </section>
  );
}
