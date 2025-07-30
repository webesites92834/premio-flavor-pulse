import React from 'react';
import { MapPin, Phone, Clock, Heart } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigation = (path: string, sectionId?: string) => {
    if (location.pathname === path) {
      // If we're already on the page, scroll to section
      if (sectionId) {
        const element = document.getElementById(sectionId);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      } else {
        scrollToTop();
      }
    } else {
      // Navigate to the page
      navigate(path);
      // If there's a section, scroll to it after navigation
      if (sectionId) {
        setTimeout(() => {
          const element = document.getElementById(sectionId);
          if (element) element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  };

  return (
    <footer className="bg-gradient-to-b from-primary to-primary/90 text-white">
      <div className="container-max section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Restaurant Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">T</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold">Taqueria El Premio Mayor</h3>
                <p className="text-white/80">Authentic Mexican Flavors Since 1996</p>
              </div>
            </div>
            
            <p className="text-white/90 leading-relaxed mb-6 max-w-md">
              Serving the Fresno community with traditional Mexican recipes, 
              fresh ingredients, and a commitment to quality for over 25 years. 
              Come taste the difference that passion makes.
            </p>

            <div className="flex items-center space-x-2 text-white/80">
              <Heart className="w-4 h-4 fill-current" />
              <span className="text-sm">Made with love in Fresno, CA</span>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Contact Info</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-white/80 flex-shrink-0 mt-0.5" />
                <div className="text-white/90">
                  <p>3141 N Maroa Ave</p>
                  <p>Fresno, CA 93704</p>
                  <p className="text-sm text-white/70">(Shield & Maroa)</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-white/80" />
                <a 
                  href="tel:+15592277281"
                  className="text-white/90 hover:text-white transition-colors"
                >
                  (559) 227-7281
                </a>
              </div>
              
              <div className="flex items-start space-x-3">
                <Clock className="w-5 h-5 text-white/80 flex-shrink-0 mt-0.5" />
                <div className="text-white/90">
                  <p>Monday - Sunday</p>
                  <p>9:00 AM - 9:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
            <div className="space-y-3">
              <button 
                onClick={() => handleNavigation('/', 'hero')}
                className="block text-white/90 hover:text-white transition-colors"
              >
                Home
              </button>
              <button 
                onClick={() => handleNavigation('/menu')}
                className="block text-white/90 hover:text-white transition-colors"
              >
                Menu
              </button>
              <button 
                onClick={() => handleNavigation('/about')}
                className="block text-white/90 hover:text-white transition-colors"
              >
                About Us
              </button>
              <button 
                onClick={() => handleNavigation('/visit')}
                className="block text-white/90 hover:text-white transition-colors"
              >
                Visit Us
              </button>
              <a 
                href="https://www.google.com/maps/place/Taqueria+El+Premio+Mayor/data=!4m2!3m1!1s0x80946765931a7a9b:0x804af70d63c040b0?sa=X&ved=1t:242&ictx=111"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-white/90 hover:text-white transition-colors"
              >
                Directions
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-white/80">
            <p className="text-sm mb-4 md:mb-0">
              © 2024 Taqueria El Premio Mayor. All rights reserved.
            </p>
            
            <div className="flex items-center space-x-6 text-sm">
              <button 
                onClick={scrollToTop}
                className="hover:text-white transition-colors"
              >
                Back to Top
              </button>
              <span>•</span>
              <span>Fresno, California</span>
              <span>•</span>
              <span>Since 1996</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;