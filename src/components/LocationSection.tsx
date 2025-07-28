import React, { useEffect, useRef, useState } from 'react';
import { MapPin, Clock, Phone, DollarSign, Navigation } from 'lucide-react';

const LocationSection = () => {
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

  const openDirections = () => {
    window.open('https://www.google.com/maps/place/Taqueria+El+Premio+Mayor/data=!4m2!3m1!1s0x80946765931a7a9b:0x804af70d63c040b0?sa=X&ved=1t:242&ictx=111', '_blank');
  };

  return (
    <section 
      id="location" 
      ref={sectionRef}
      className="py-16 bg-white"
    >
      <div className="container-max section-padding">
        {/* Header */}
        <div className={`text-center mb-16 ${isVisible ? 'animate-fade-in-up' : ''}`}>
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Visit Us Today
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Come hungry, leave happy. We're conveniently located in Shield & Maroa.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mt-6"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Information Cards */}
          <div className={`space-y-6 ${isVisible ? 'animate-slide-in-left' : ''}`}>
            {/* Address Card */}
            <div className="card-mexican">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Address</h3>
                  <p className="text-muted-foreground">
                    3141 N Maroa Ave<br />
                    Fresno, CA 93704<br />
                    United States
                  </p>
                  <p className="text-sm text-secondary mt-2 font-medium">
                    📍 Located in Shield & Maroa
                  </p>
                </div>
              </div>
            </div>

            {/* Hours Card */}
            <div className="card-mexican">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-secondary to-primary rounded-full flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Hours</h3>
                  <p className="text-muted-foreground">
                    Monday to Sunday<br />
                    9:00 AM – 9:00 PM
                  </p>
                  <p className="text-sm text-secondary mt-2 font-medium">
                    🚶‍♂️ Walk-ins welcome - No reservations needed!
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Card */}
            <div className="card-mexican">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Contact</h3>
                  <a 
                    href="tel:+15592277281"
                    className="text-primary hover:text-primary/80 font-medium text-lg transition-colors"
                  >
                    (559) 227-7281
                  </a>
                  <p className="text-sm text-muted-foreground mt-1">
                    Click to call for orders or questions
                  </p>
                </div>
              </div>
            </div>

            {/* Price Card */}
            <div className="card-mexican">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-secondary to-primary rounded-full flex items-center justify-center flex-shrink-0">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Price Range</h3>
                  <p className="text-muted-foreground">
                    $10 – $20 per person
                  </p>
                  <p className="text-sm text-secondary mt-2 font-medium">
                    💳 Great value for authentic Mexican food
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <button 
              onClick={openDirections}
              className="w-full btn-primary bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 flex items-center justify-center space-x-2 text-lg py-4"
            >
              <Navigation className="w-5 h-5" />
              <span>Get Directions</span>
            </button>
          </div>

          {/* Map */}
          <div className={`${isVisible ? 'animate-slide-in-right' : ''}`} style={{animationDelay: '0.2s'}}>
            <div className="card-mexican h-full min-h-[600px] p-0 overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3172.8369851234567!2d-119.82345678901234!3d36.78901234567890!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80946765931a7a9b%3A0x804af70d63c040b0!2sTaqueria%20El%20Premio%20Mayor!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '600px' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Taqueria El Premio Mayor Location"
                className="rounded-xl"
              ></iframe>
            </div>
          </div>
        </div>

        {/* Bottom Info */}
        <div className={`mt-16 text-center bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl p-8 ${isVisible ? 'animate-fade-in-up' : ''}`} style={{animationDelay: '0.4s'}}>
          <h3 className="text-2xl font-bold text-primary mb-4">
            Ready for Authentic Mexican Food?
          </h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            No need to wait or make reservations. Just come on over to our Shield & Maroa location 
            and experience the flavors that have been delighting Fresno for over 25 years.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <a 
              href="tel:+15592277281"
              className="btn-primary flex-1"
            >
              Call to Order
            </a>
            <button 
              onClick={openDirections}
              className="btn-secondary flex-1"
            >
              Get Directions
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;