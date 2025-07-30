import React, { useEffect, useRef, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Chatbot from '../components/Chatbot';
import { ArrowLeft, Heart, Users, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import storefrontImage from '../assets/restaurant-storefront.jpg';
import interiorImage from '../assets/restaurant-interior.jpg';

const About = () => {
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
              About Us
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto animate-fade-in" style={{animationDelay: '0.2s'}}>
              A family story of tradition, flavor, and community.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section ref={sectionRef} className="py-16 bg-background">
        <div className="container-max section-padding">
          {/* Story Section */}
          <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16 ${isVisible ? 'animate-fade-in-up' : ''}`}>
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-primary mb-6">
                Welcome to Taqueria El Premio Mayor
              </h2>
              
              <p className="text-lg text-muted-foreground leading-relaxed">
                Welcome to Taqueria El Premio Mayor — a family-owned taqueria rooted in the heart of 
                Fresno, California. Since the beginning, our mission has been simple: to serve authentic, 
                flavorful Mexican street food that brings people together.
              </p>

              <p className="text-lg text-muted-foreground leading-relaxed">
                Our recipes are inspired by tradition, passed down through generations, and made with 
                only the freshest ingredients. Whether it's our sizzling carne asada tacos, our famous 
                burritos, or a bowl of rich, hearty menudo, every dish is prepared with love, care, and 
                a passion for quality.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <div className="bg-primary/10 rounded-lg p-4 flex items-center space-x-3">
                  <Heart className="w-6 h-6 text-primary" />
                  <div>
                    <h3 className="font-semibold text-primary">Made with Love</h3>
                    <p className="text-sm text-muted-foreground">Every dish crafted with care</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="order-first lg:order-last">
              <img 
                src={storefrontImage} 
                alt="Taqueria El Premio Mayor Storefront" 
                className="rounded-2xl shadow-2xl w-full h-auto"
              />
            </div>
          </div>

          {/* Community Section */}
          <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16 ${isVisible ? 'animate-fade-in-up' : ''}`} style={{animationDelay: '0.2s'}}>
            <div>
              <img 
                src={interiorImage} 
                alt="Taqueria El Premio Mayor Interior" 
                className="rounded-2xl shadow-2xl w-full h-auto"
              />
            </div>

            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-secondary mb-6">
                Part of the Community
              </h2>
              
              <p className="text-lg text-muted-foreground leading-relaxed">
                At Taqueria El Premio Mayor, we're more than just a restaurant — we're part of the 
                community. Locals know us for our quick service, affordable prices, and unforgettable 
                flavors. Whether you're grabbing lunch with coworkers, picking up dinner for the family, 
                or just craving a late breakfast burrito, we're here for you every day with open doors 
                and open hearts.
              </p>

              <p className="text-lg text-muted-foreground leading-relaxed">
                Gracias for making us a part of your daily life — we can't wait to serve you!
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <div className="bg-secondary/10 rounded-lg p-4 flex items-center space-x-3">
                  <Users className="w-6 h-6 text-secondary" />
                  <div>
                    <h3 className="font-semibold text-secondary">Community First</h3>
                    <p className="text-sm text-muted-foreground">Serving Fresno families daily</p>
                  </div>
                </div>
                <div className="bg-primary/10 rounded-lg p-4 flex items-center space-x-3">
                  <Clock className="w-6 h-6 text-primary" />
                  <div>
                    <h3 className="font-semibold text-primary">Always Fresh</h3>
                    <p className="text-sm text-muted-foreground">Made daily with fresh ingredients</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Values Grid */}
          <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 ${isVisible ? 'animate-fade-in-up' : ''}`} style={{animationDelay: '0.4s'}}>
            <div className="card-mexican text-center">
              <div className="text-4xl mb-4">🌮</div>
              <h3 className="text-xl font-bold text-primary mb-3">Authentic Recipes</h3>
              <p className="text-muted-foreground">
                Traditional recipes passed down through generations, ensuring every bite is authentic.
              </p>
            </div>

            <div className="card-mexican text-center">
              <div className="text-4xl mb-4">🥬</div>
              <h3 className="text-xl font-bold text-secondary mb-3">Fresh Ingredients</h3>
              <p className="text-muted-foreground">
                We source the freshest ingredients daily to guarantee quality in every dish.
              </p>
            </div>

            <div className="card-mexican text-center">
              <div className="text-4xl mb-4">❤️</div>
              <h3 className="text-xl font-bold text-primary mb-3">Family Values</h3>
              <p className="text-muted-foreground">
                Family-owned and operated, we treat every customer like part of our familia.
              </p>
            </div>
          </div>

          {/* Call to Action */}
          <div className={`text-center bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl p-8 ${isVisible ? 'animate-fade-in-up' : ''}`} style={{animationDelay: '0.6s'}}>
            <h3 className="text-2xl font-bold text-primary mb-4">
              Experience Our Story
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Come taste the tradition and become part of our family. We're always excited to meet 
              new friends and serve our community with the best Mexican food in Fresno.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <Link 
                to="/menu"
                className="btn-primary flex-1"
              >
                View Our Menu
              </Link>
              <Link 
                to="/visit"
                className="btn-secondary flex-1"
              >
                Visit Us Today
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <Chatbot />
    </div>
  );
};

export default About;