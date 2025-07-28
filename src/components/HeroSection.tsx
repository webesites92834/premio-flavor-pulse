import React from 'react';
import { Link } from 'react-router-dom';
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
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-white to-secondary/10">
        <div className="absolute inset-0 bg-[url('/placeholder.svg')] bg-cover bg-center opacity-5"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center container-max section-padding">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in-up text-primary">
            Flavor That Speaks
            <span className="block text-secondary">for Itself.</span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 animate-fade-in-up max-w-3xl mx-auto text-muted-foreground" style={{animationDelay: '0.2s'}}>
            Authentic Mexican flavors made fresh daily in the heart of Fresno. 
            From our famous quesatacos to aguas frescas — no reservations needed, 
            just walk in and enjoy!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up" style={{animationDelay: '0.4s'}}>
            <Link 
              to="/menu"
              className="btn-primary text-lg px-8 py-4 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              See Menu
            </Link>
            <Link 
              to="/visit"
              className="btn-secondary text-lg px-8 py-4"
            >
              Visit Us
            </Link>
          </div>

          {/* Info Cards */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in-up" style={{animationDelay: '0.6s'}}>
            <div className="card-mexican text-center bg-gradient-to-br from-primary/5 to-secondary/5">
              <h3 className="text-xl font-semibold mb-2 text-primary">Fresh Daily</h3>
              <p className="text-muted-foreground">Made with authentic ingredients every morning</p>
            </div>
            <div className="card-mexican text-center bg-gradient-to-br from-secondary/5 to-primary/5">
              <h3 className="text-xl font-semibold mb-2 text-secondary">Since 1996</h3>
              <p className="text-muted-foreground">Serving Fresno with traditional recipes</p>
            </div>
            <div className="card-mexican text-center bg-gradient-to-br from-primary/5 to-secondary/5">
              <h3 className="text-xl font-semibold mb-2 text-primary">Walk-ins Welcome</h3>
              <p className="text-muted-foreground">No reservations needed, just come hungry</p>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
};

export default HeroSection;