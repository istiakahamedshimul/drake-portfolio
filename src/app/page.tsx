import { getPortfolioData } from "@/lib/supabase/queries";

import { PageLoader } from "@/components/PageLoader";
import { BackgroundVideo } from "@/components/BackgroundVideo";
import { ScrollAnimations } from "@/components/ScrollAnimations";
import { Sidebar } from "@/components/Sidebar";
import { FloatingNav } from "@/components/FloatingNav";
import { MobileNav } from "@/components/MobileNav";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ResumeSection } from "@/components/sections/ResumeSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { PortfolioSection } from "@/components/sections/PortfolioSection";
import { TestimonialSection } from "@/components/sections/TestimonialSection";
import { PricingSection } from "@/components/sections/PricingSection";
import { ContactSection } from "@/components/sections/ContactSection";

export const dynamic = "force-dynamic";

export default async function Home() {
  const {
    personalInfo,
    stats,
    experiences,
    services,
    skills,
    projects,
    testimonials,
    clientBrands,
    pricingPlans,
  } = await getPortfolioData();
  return (
    <>
      {/* Preloader with bouncing ball */}
      <PageLoader />

      {/* 3D Animated Background Video Overlay */}
      <BackgroundVideo />

      {/* GSAP Scroll Animations Engine */}
      <ScrollAnimations />

      {/* Mobile Drawer and Hamburger Menu */}
      <MobileNav info={personalInfo} />

      {/* Dynamic Theme / Color Switcher + 3D Shape switcher */}
      <ThemeSwitcher />

      {/* Floating Vertical Navigation Dock (Desktop) */}
      <FloatingNav />

      {/* Desktop Fixed Left Sidebar */}
      <Sidebar info={personalInfo} />

      {/* Main Content Area */}
      <main className="drake-main">
        <div id="smooth-wrapper">
          <div id="smooth-content">
            {/* Mobile / Tablet In-flow Sidebar (hidden on desktop screens > 1220px) */}
            <Sidebar info={personalInfo} />

            {/* Sections */}
            <HeroSection info={personalInfo} stats={stats} />
            <AboutSection info={personalInfo} />
            <ResumeSection experiences={experiences} />
            <ServicesSection services={services} />
            <SkillsSection skills={skills} />
            <PortfolioSection projects={projects} />
            <TestimonialSection
              testimonials={testimonials}
              clients={clientBrands}
            />
            <PricingSection plans={pricingPlans} />
            <ContactSection info={personalInfo} />
          </div>
        </div>
      </main>
    </>
  );
}
