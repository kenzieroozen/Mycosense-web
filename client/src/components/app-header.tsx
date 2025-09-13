export default function AppHeader() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full flex justify-between items-center p-6 bg-black/70 backdrop-blur-md z-50 border-b border-border">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
          <i className="fas fa-seedling text-primary-foreground text-xl"></i>
        </div>
        <h1 className="text-2xl font-bold text-primary">MycoSense</h1>
      </div>
      
      <nav className="hidden md:flex items-center space-x-8">
        <button 
          onClick={() => scrollToSection('home')} 
          className="text-muted-foreground hover:text-primary transition-colors duration-200"
          data-testid="nav-home"
        >
          Home
        </button>
        <button 
          onClick={() => scrollToSection('features')} 
          className="text-muted-foreground hover:text-primary transition-colors duration-200"
          data-testid="nav-features"
        >
          Features
        </button>
        <button 
          onClick={() => scrollToSection('dashboard')} 
          className="text-muted-foreground hover:text-primary transition-colors duration-200"
          data-testid="nav-dashboard"
        >
          Dashboard
        </button>
        <button 
          onClick={() => scrollToSection('analysis')} 
          className="text-muted-foreground hover:text-primary transition-colors duration-200"
          data-testid="nav-analysis"
        >
          Analysis
        </button>
      </nav>
      
      <div className="flex items-center space-x-4">
        <button className="md:hidden text-muted-foreground hover:text-primary" data-testid="menu-toggle">
          <i className="fas fa-bars text-xl"></i>
        </button>
        <div className="hidden md:flex items-center space-x-2 bg-secondary rounded-lg px-3 py-2">
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
          <span className="text-sm text-muted-foreground">Live</span>
        </div>
      </div>
    </header>
  );
}
