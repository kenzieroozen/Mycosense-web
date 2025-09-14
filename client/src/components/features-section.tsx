export default function FeaturesSection() {
  const features = [
    {
      icon: "fas fa-microscope",
      color: "primary",
      title: "Real-Time Detection",
      description: "Detect heavy metals, PFAS, and other contaminants instantly with our advanced biosensor array technology.",
    },
    {
      icon: "fas fa-leaf",
      color: "accent",
      title: "Sustainable Design",
      description: "Eco-conscious biosensor design that minimizes environmental impact while maximizing detection accuracy.",
    },
    {
      icon: "fas fa-microchip",
      color: "primary",
      title: "IoT Integration",
      description: "ESP32-powered remote monitoring with wireless data transmission and cloud-based analytics.",
    },
    {
      icon: "fas fa-chart-line",
      color: "accent",
      title: "AI Analytics",
      description: "Machine learning algorithms analyze patterns and predict contamination trends with comprehensive and deep data-driven accuracy.",
    },
    {
      icon: "fas fa-mobile-alt",
      color: "primary",
      title: "Mobile Ready",
      description: "Access your soil data anywhere with our responsive dashboard and mobile companion app.",
    },
    {
      icon: "fas fa-shield-alt",
      color: "accent",
      title: "Data Security",
      description: "Enterprise-grade security with encrypted data transmission and compliance with environmental standards.",
    },
  ];

  return (
    <section id="features" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-secondary/50 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-border">
            <i className="fas fa-star text-accent text-sm"></i>
            <span className="text-sm text-muted-foreground">Core Features</span>
          </div>
          
          <h3 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Advanced <span className="text-primary">Biosensor</span> Technology
          </h3>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive soil analysis powered by cutting-edge biosensors and machine learning algorithms.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="feature-card p-8 rounded-2xl bg-card/30" data-testid={`card-feature-${index}`}>
              <div className={`w-16 h-16 bg-${feature.color}/10 rounded-2xl flex items-center justify-center mb-6`}>
                <i className={`${feature.icon} text-${feature.color} text-2xl`}></i>
              </div>
              <h4 className="text-2xl font-bold mb-4 text-foreground">{feature.title}</h4>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {feature.description}
              </p>
              <div className={`flex items-center text-${feature.color} text-sm font-medium`}>
                <span>Learn more</span>
                <i className="fas fa-arrow-right ml-2"></i>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
