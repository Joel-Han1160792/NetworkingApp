import React from "react";
import HeroSection from "../components/HeroSection";
import Navbar from "../components/Navbar";
import ParallaxSection from "../components/Parallax";
import ContentSection from "../components/ContentSection";
import Footer from "../components/Footer";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";





export default function LandingPage() {
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/profile", { replace: true }); 
    }
  }, [user, navigate]);
  return (
    <div className="w-full min-h-screen bg-[#edf2f7] font-[Poppins,sans-serif] ">
      <Navbar />
      <main className="pt-16 w-full">
        <HeroSection />
        <ParallaxSection />
      
        <ContentSection />
      </main>
      <Footer />
    </div>
  );
}
