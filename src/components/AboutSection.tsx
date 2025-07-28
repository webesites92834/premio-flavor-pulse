import React, { useEffect, useRef, useState } from 'react';
import restaurantImage from '../assets/restaurant-exterior.jpg';

const AboutSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="py-16 bg-gradient-to-b from-background to-muted/30"
    >
      <div className="container-max section-padding">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className={`space-y-6 ${isVisible ? 'animate-slide-in-left' : ''}`}>
            <div className="text-center lg:text-left">
              <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
                Made with Heart
                <span className="block text-secondary">Since 1996</span>
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto lg:mx-0 mb-6"></div>
            </div>

            <p className="text-lg text-muted-foreground leading-relaxed">
              At Taqueria El Premio Mayor, we serve more than just food — we serve tradition. 
              Since 1996, we've brought real Mexican flavor to the Fresno community through 
              handmade dishes, fresh ingredients, and a commitment to quality and care.
            </p>

            <p className="text-lg text-muted-foreground leading-relaxed">
              Every taco, burrito, and quesadilla is crafted with the same passion and 
              authenticity that our families have cherished for generations. We believe 
              that great food brings people together, and that's exactly what we've been 
              doing in our Shield & Maroa location for over 25 years.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <div className="bg-primary/10 rounded-lg p-4 flex-1">
                <h3 className="font-semibold text-primary mb-2">Traditional Recipes</h3>
                <p className="text-sm text-muted-foreground">Passed down through generations</p>
              </div>
              <div className="bg-secondary/10 rounded-lg p-4 flex-1">
                <h3 className="font-semibold text-secondary mb-2">Fresh Ingredients</h3>
                <p className="text-sm text-muted-foreground">Sourced daily for quality</p>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className={`${isVisible ? 'animate-slide-in-right' : ''}`} style={{animationDelay: '0.2s'}}>
            <div className="relative">
              <img 
                src={restaurantImage} 
                alt="Taqueria El Premio Mayor Restaurant" 
                className="rounded-2xl shadow-2xl w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent rounded-2xl"></div>
              
              {/* Floating Card */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-xl p-6 max-w-xs">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-xl">25+</span>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Years of Service</p>
                    <p className="text-sm text-muted-foreground">Serving Fresno since 1996</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;