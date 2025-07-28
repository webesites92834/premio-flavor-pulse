import React, { useEffect, useRef, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const Menu = () => {
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

  const menuSections = [
    {
      emoji: "🌮",
      title: "Tacos",
      subtitle: "(Each)",
      items: [
        { name: "Asada", price: "$2.50" },
        { name: "Adobada", price: "$2.50" },
        { name: "Cabeza", price: "$2.50" },
        { name: "Pollo", price: "$2.50" },
        { name: "Lengua", price: "$3.50" },
        { name: "Tripa", price: "$2.75" },
        { name: "Chile Verde", price: "$2.75" },
        { name: "Carnitas", price: "$2.75" }
      ]
    },
    {
      emoji: "🌯",
      title: "Burritos",
      subtitle: "",
      items: [
        { name: "Burrito", price: "$8.99" },
        { name: "Burrito Supreme", price: "$9.99" },
        { name: "Wet Burrito", price: "$11.99" },
        { name: "Bacon Wrap Burrito", price: "$8.99" },
        { name: "Breakfast Burrito", price: "$8.99" }
      ]
    },
    {
      emoji: "🍲",
      title: "Menudo",
      subtitle: "",
      items: [
        { name: "Chico (Small)", price: "$10.29" },
        { name: "Grande (Large)", price: "$12.99" }
      ]
    },
    {
      emoji: "🥤",
      title: "Drinks",
      subtitle: "Bebidas",
      items: [
        { name: "Jarritos", price: "$2.99" },
        { name: "Coca-Cola / Fanta (1.5L)", price: "$4.50" },
        { name: "Soda (Can)", price: "$1.98" }
      ]
    },
    {
      emoji: "🍹",
      title: "Aguas Frescas",
      subtitle: "",
      items: [
        { name: "Regular", price: "$3.50" },
        { name: "Large", price: "$4.50" }
      ]
    },
    {
      emoji: "🥪",
      title: "Tortas",
      subtitle: "",
      items: [
        { name: "Asada / Adobada / Pollo / Jamon / Hawaiian / Lomo", price: "$9.99" },
        { name: "Pierna / Milanesa / Cubana", price: "$10.99" },
        { name: "Milanesa & Cubana Mixta", price: "$12.99" }
      ]
    }
  ];

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
              🌮 Our Menu
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto animate-fade-in" style={{animationDelay: '0.2s'}}>
              Authentic Mexican flavors, made fresh daily.
            </p>
          </div>
        </div>
      </section>

      {/* Menu Content */}
      <section ref={sectionRef} className="py-16 bg-background">
        <div className="container-max section-padding">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {menuSections.map((section, sectionIndex) => (
              <div 
                key={sectionIndex}
                className={`card-mexican ${isVisible ? 'animate-fade-in-up' : ''}`}
                style={{animationDelay: `${sectionIndex * 0.1}s`}}
              >
                {/* Section Header */}
                <div className="text-center mb-6">
                  <div className="text-4xl mb-2">{section.emoji}</div>
                  <h2 className="text-2xl font-bold text-primary mb-1">
                    {section.title}
                  </h2>
                  {section.subtitle && (
                    <p className="text-sm text-muted-foreground italic">
                      {section.subtitle}
                    </p>
                  )}
                </div>

                {/* Menu Items */}
                <div className="space-y-3">
                  {section.items.map((item, itemIndex) => (
                    <div 
                      key={itemIndex}
                      className="flex justify-between items-start group hover:bg-primary/5 rounded-lg p-3 transition-colors"
                    >
                      <div className="flex-1">
                        <h3 className="font-medium text-foreground group-hover:text-primary transition-colors">
                          {item.name}
                        </h3>
                      </div>
                      <div className="flex-shrink-0 ml-4">
                        <span className="font-bold text-secondary text-lg">
                          {item.price}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className={`mt-16 text-center bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl p-8 ${isVisible ? 'animate-fade-in-up' : ''}`} style={{animationDelay: '0.8s'}}>
            <h3 className="text-2xl font-bold text-primary mb-4">
              Ready to Order?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Come visit us at our Shield & Maroa location or call ahead to place your order. 
              Fresh, authentic Mexican food made daily!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <a 
                href="tel:+15592277281"
                className="btn-primary flex-1"
              >
                Call to Order
              </a>
              <Link 
                to="/visit"
                className="btn-secondary flex-1 inline-flex items-center justify-center"
              >
                Visit Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Menu;