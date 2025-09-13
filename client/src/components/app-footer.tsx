export default function AppFooter() {
  return (
    <footer className="py-16 px-6 border-t border-border">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <i className="fas fa-seedling text-primary-foreground text-xl"></i>
              </div>
              <h1 className="text-2xl font-bold text-primary">MycoSense</h1>
            </div>
            <p className="text-muted-foreground mb-6 max-w-md">
              Advanced soil biosensor technology for environmental monitoring and contamination detection.
            </p>
            <div className="flex items-center space-x-4">
              <button className="w-10 h-10 bg-secondary hover:bg-primary rounded-lg flex items-center justify-center transition-colors" data-testid="button-github">
                <i className="fab fa-github text-muted-foreground hover:text-primary-foreground"></i>
              </button>
              <button className="w-10 h-10 bg-secondary hover:bg-primary rounded-lg flex items-center justify-center transition-colors" data-testid="button-twitter">
                <i className="fab fa-twitter text-muted-foreground hover:text-primary-foreground"></i>
              </button>
              <button className="w-10 h-10 bg-secondary hover:bg-primary rounded-lg flex items-center justify-center transition-colors" data-testid="button-linkedin">
                <i className="fab fa-linkedin text-muted-foreground hover:text-primary-foreground"></i>
              </button>
            </div>
          </div>
          
          <div>
            <h6 className="font-semibold text-foreground mb-4">Product</h6>
            <div className="space-y-3 text-sm text-muted-foreground">
              <a href="#" className="block hover:text-primary transition-colors" data-testid="link-features">Features</a>
              <a href="#" className="block hover:text-primary transition-colors" data-testid="link-dashboard">Dashboard</a>
              <a href="#" className="block hover:text-primary transition-colors" data-testid="link-analytics">Analytics</a>
              <a href="#" className="block hover:text-primary transition-colors" data-testid="link-api">API</a>
            </div>
          </div>
          
          <div>
            <h6 className="font-semibold text-foreground mb-4">Support</h6>
            <div className="space-y-3 text-sm text-muted-foreground">
              <a href="#" className="block hover:text-primary transition-colors" data-testid="link-docs">Documentation</a>
              <a href="#" className="block hover:text-primary transition-colors" data-testid="link-help">Help Center</a>
              <a href="#" className="block hover:text-primary transition-colors" data-testid="link-contact">Contact</a>
              <a href="#" className="block hover:text-primary transition-colors" data-testid="link-status">Status</a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-sm text-muted-foreground">
            © 2024 MycoSense. All rights reserved.
          </p>
          <div className="flex items-center space-x-6 mt-4 md:mt-0 text-sm text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors" data-testid="link-privacy">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors" data-testid="link-terms">Terms of Service</a>
            <a href="#" className="hover:text-primary transition-colors" data-testid="link-cookies">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
