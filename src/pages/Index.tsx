import React, { useEffect } from 'react';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import WhyChooseUsSection from '../components/WhyChooseUsSection';
import MenuSection from '../components/MenuSection';
import LocationSection from '../components/LocationSection';
import ReviewsSection from '../components/ReviewsSection';
import Footer from '../components/Footer';

const Index = () => {
  useEffect(() => {
    // Add smooth scroll behavior to the document
    document.documentElement.classList.add('smooth-scroll');
    
    return () => {
      document.documentElement.classList.remove('smooth-scroll');
    };
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <AboutSection />
      <WhyChooseUsSection />
      <MenuSection />
      <LocationSection />
      <ReviewsSection />
      <Footer />
    </div>
  );
};

export default Index;
