import React, { useEffect, useRef, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Chatbot from '../components/Chatbot';
import { ArrowLeft, MapPin, Clock, Phone, DollarSign, Navigation, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const Visit = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    document.documentElement.classList.add('smooth-scroll');
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
      document.documentElement.classList.remove('smooth-scroll');
    };
  }, []);

  const openDirections = () => {
    window.open('https://www.google.com/maps/place/Taqueria+El+Premio+Mayor/data=!4m2!3m1!1s0x80946765931a7a9b:0x804af70d63c040b0?sa=X&ved=1t:242&ictx=111', '_blank');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section with Parallax */}
      <section className="relative py-20 bg-gradient-to-br from-primary to-secondary overflow-hidden">
        <div className="absolute inset-0 bg-[url('/placeholder.svg')] bg-cover bg-center opacity-10"></div>
        <div className="container-max section-padding relative z-10">
          <div className="text-center text-white">
            <Link 
              to="/"
              className="inline-flex items-center space-x-2 text-white/80 hover:text-white transition-colors mb-6"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Home</span>
            </Link>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-4 animate-fade-in">
              Visit Us Today
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto animate-fade-in" style={{animationDelay: '0.2s'}}>
              Come hungry, leave happy. We're conveniently located in Shield & Maroa.
            </p>
          </div>
        </div>
      </section>

      {/* Location Information */}
      <section ref={sectionRef} className="py-16 bg-background">
        <div className="container-max section-padding">
          {/* Info Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {/* Address Card */}
            <div className={`card-mexican text-center ${isVisible ? 'animate-fade-in-up' : ''}`}>
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Address</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                3141 N Maroa Ave<br />
                Fresno, CA 93704<br />
                United States
              </p>
              <p className="text-sm text-secondary mt-2 font-medium">
                📍 Shield & Maroa
              </p>
            </div>

            {/* Hours Card */}
            <div className={`card-mexican text-center ${isVisible ? 'animate-fade-in-up' : ''}`} style={{animationDelay: '0.1s'}}>
              <div className="w-16 h-16 bg-gradient-to-br from-secondary to-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Hours</h3>
              <p className="text-muted-foreground text-sm">
                Monday to Sunday<br />
                9:00 AM – 9:00 PM
              </p>
              <p className="text-sm text-secondary mt-2 font-medium">
                🚶‍♂️ Walk-ins welcome!
              </p>
            </div>

            {/* Contact Card */}
            <div className={`card-mexican text-center ${isVisible ? 'animate-fade-in-up' : ''}`} style={{animationDelay: '0.2s'}}>
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Contact</h3>
              <a 
                href="tel:+15592277281"
                className="text-primary hover:text-primary/80 font-medium text-lg transition-colors block"
              >
                (559) 227-7281
              </a>
              <p className="text-sm text-muted-foreground mt-1">
                Click to call
              </p>
            </div>

            {/* Price Card */}
            <div className={`card-mexican text-center ${isVisible ? 'animate-fade-in-up' : ''}`} style={{animationDelay: '0.3s'}}>
              <div className="w-16 h-16 bg-gradient-to-br from-secondary to-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Price Range</h3>
              <p className="text-muted-foreground font-semibold text-lg">
                $10 – $20
              </p>
              <p className="text-sm text-secondary mt-1">
                per person
              </p>
            </div>
          </div>

          {/* Map and Quick Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {/* Quick Actions */}
            <div className={`space-y-4 ${isVisible ? 'animate-slide-in-left' : ''}`} style={{animationDelay: '0.4s'}}>
              <h3 className="text-2xl font-bold text-primary mb-6">Quick Actions</h3>
              
              <button 
                onClick={openDirections}
                className="w-full btn-primary bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 flex items-center justify-center space-x-3 text-lg py-4"
              >
                <Navigation className="w-5 h-5" />
                <span>Get Directions</span>
              </button>

              <a 
                href="tel:+15592277281"
                className="w-full btn-secondary flex items-center justify-center space-x-3 text-lg py-4"
              >
                <Phone className="w-5 h-5" />
                <span>Call to Order</span>
              </a>

              <Link 
                to="/menu"
                className="w-full btn-outline flex items-center justify-center space-x-3 text-lg py-4"
              >
                <span>📱</span>
                <span>View Menu</span>
              </Link>

              {/* Additional Info */}
              <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl p-6 mt-6">
                <h4 className="font-semibold text-primary mb-3">📍 Easy to Find</h4>
                <p className="text-muted-foreground text-sm mb-3">
                  Located in the heart of Shield & Maroa area. Plenty of parking available.
                </p>
                <p className="text-muted-foreground text-sm">
                  <strong>💳 Payment:</strong> Cash and Card accepted<br />
                  <strong>🚗 Parking:</strong> Free parking on-site<br />
                  <strong>♿ Accessibility:</strong> Wheelchair accessible
                </p>
              </div>
            </div>

            {/* Map */}
            <div className={`lg:col-span-2 ${isVisible ? 'animate-slide-in-right' : ''}`} style={{animationDelay: '0.6s'}}>
              <div className="card-mexican h-full min-h-[500px] p-0 overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3172.8369851234567!2d-119.82345678901234!3d36.78901234567890!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80946765931a7a9b%3A0x804af70d63c040b0!2sTaqueria%20El%20Premio%20Mayor!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: '500px' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Taqueria El Premio Mayor Location"
                  className="rounded-xl"
                ></iframe>
              </div>
            </div>
          </div>

          {/* Bottom Call to Action */}
          <div className={`text-center bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl p-8 ${isVisible ? 'animate-fade-in-up' : ''}`} style={{animationDelay: '0.8s'}}>
            <h3 className="text-3xl font-bold text-primary mb-4">
              Ready for Authentic Mexican Food?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-3xl mx-auto text-lg">
              No need to wait or make reservations. Just come on over to our Shield & Maroa location 
              and experience the flavors that have been delighting Fresno for over 25 years. We're open 
              every day from 9 AM to 9 PM, ready to serve you the best Mexican food in town!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto">
              <a 
                href="tel:+15592277281"
                className="btn-primary flex-1 text-lg py-3"
              >
                Call to Order
              </a>
              <button 
                onClick={openDirections}
                className="btn-secondary flex-1 text-lg py-3"
              >
                Get Directions
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <Chatbot />
    </div>
  );
};

export default Visit;