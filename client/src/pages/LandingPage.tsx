import React from "react";
import HeroSection from "../components/HeroSection";
import Navbar from "../components/Navbar";
import ParallaxSection from "../components/Parallax";
import ContentSection from "../components/Content";
import Footer from "../components/Footer";
import FeatureSection from "../components/FeatureSection";




export default function LandingPage() {
  return (
    <div className="w-full min-h-screen bg-[#edf2f7] font-[Poppins,sans-serif] ">
      <Navbar />
      <main pt-16 w-full>
        <HeroSection />
        <ParallaxSection />
      
        <ContentSection />
      </main>
      <Footer />
    </div>
  );
}
