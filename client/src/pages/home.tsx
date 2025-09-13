import AppHeader from "@/components/app-header";
import HeroSection from "@/components/hero-section";
import FeaturesSection from "@/components/features-section";
import DashboardSection from "@/components/dashboard-section";
import AnalysisSection from "@/components/analysis-section";
import AppFooter from "@/components/app-footer";

export default function Home() {
  return (
    <div className="bg-gradient-mesh text-foreground min-h-screen">
      <AppHeader />
      <HeroSection />
      <FeaturesSection />
      <DashboardSection />
      <AnalysisSection />
      <AppFooter />
    </div>
  );
}
