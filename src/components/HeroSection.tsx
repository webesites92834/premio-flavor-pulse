import React from 'react';
import heroImage from '../assets/hero-tacos.jpg';

const HeroSection = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="hero" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `url(${heroImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 hero-gradient"></div>

      {/* Content */}
      <div className="relative z-10 text-center text-white container-max section-padding">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in-up">
            Flavor That Speaks
            <span className="block text-mexican-yellow">for Itself.</span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 animate-fade-in-up opacity-90 max-w-3xl mx-auto" style={{animationDelay: '0.2s'}}>
            Authentic Mexican flavors made fresh daily in the heart of Fresno. 
            From our famous quesatacos to aguas frescas — no reservations needed, 
            just walk in and enjoy!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up" style={{animationDelay: '0.4s'}}>
            <button 
              onClick={() => scrollToSection('menu')}
              className="btn-primary bg-primary hover:bg-primary/90 text-lg px-8 py-4 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              See Menu
            </button>
            <button 
              onClick={() => scrollToSection('location')}
              className="btn-secondary bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 border border-white/30 text-lg px-8 py-4"
            >
              Visit Us
            </button>
          </div>

          {/* Info Cards */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in-up" style={{animationDelay: '0.6s'}}>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
              <h3 className="text-xl font-semibold mb-2">Fresh Daily</h3>
              <p className="text-white/90">Made with authentic ingredients every morning</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
              <h3 className="text-xl font-semibold mb-2">Since 1996</h3>
              <p className="text-white/90">Serving Fresno with traditional recipes</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
              <h3 className="text-xl font-semibold mb-2">Walk-ins Welcome</h3>
              <p className="text-white/90">No reservations needed, just come hungry</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;