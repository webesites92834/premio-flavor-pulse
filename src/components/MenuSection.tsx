import React, { useEffect, useRef, useState } from 'react';
import menuImage from '../assets/menu-items.jpg';

const MenuSection = () => {
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

  const menuItems = [
    {
      emoji: "🌮",
      title: "Quesatacos",
      description: "Our signature crispy, cheesy tacos that made us famous",
      highlight: "Signature Dish"
    },
    {
      emoji: "🌯",
      title: "Burritos",
      description: "Big, bold, and fully loaded with your choice of meat and toppings",
      highlight: "Popular"
    },
    {
      emoji: "🌮",
      title: "Tacos",
      description: "Street-style authentic tacos packed with traditional flavors",
      highlight: "Traditional"
    },
    {
      emoji: "🥙",
      title: "Tortas",
      description: "Grilled Mexican sandwiches with fresh ingredients and bold flavors",
      highlight: "Hearty"
    },
    {
      emoji: "🍹",
      title: "Aguas Frescas",
      description: "Refreshing traditional drinks made fresh daily",
      highlight: "Refreshing"
    },
    {
      emoji: "🍽️",
      title: "Combo Plates",
      description: "Perfectly portioned full meals with rice, beans, and your favorites",
      highlight: "Complete Meal"
    }
  ];

  return (
    <section 
      id="menu" 
      ref={sectionRef}
      className="py-16 bg-gradient-to-b from-background to-secondary/5"
    >
      <div className="container-max section-padding">
        {/* Header */}
        <div className={`text-center mb-16 ${isVisible ? 'animate-fade-in-up' : ''}`}>
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Our Menu Highlights
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Handcrafted with flavor, tradition, and fresh ingredients.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mt-6"></div>
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {menuItems.map((item, index) => (
            <div 
              key={index}
              className={`card-mexican group relative overflow-hidden ${isVisible ? 'animate-fade-in-up' : ''}`}
              style={{animationDelay: `${index * 0.1}s`}}
            >
              {/* Highlight Badge */}
              <div className="absolute top-4 right-4 bg-gradient-to-r from-primary to-secondary text-white text-xs px-3 py-1 rounded-full font-medium">
                {item.highlight}
              </div>

              {/* Content */}
              <div className="text-center">
                <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {item.emoji}
                </div>
                
                <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                
                <p className="text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Hover Effect Background */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
            </div>
          ))}
        </div>

        {/* Featured Image and CTA */}
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${isVisible ? 'animate-fade-in-up' : ''}`} style={{animationDelay: '0.8s'}}>
          <div className="order-2 lg:order-1">
            <img 
              src={menuImage} 
              alt="Our delicious menu items" 
              className="rounded-2xl shadow-2xl w-full h-auto"
            />
          </div>
          
          <div className="order-1 lg:order-2 space-y-6">
            <h3 className="text-3xl font-bold text-primary">
              Every Bite Tells a Story
            </h3>
            
            <p className="text-lg text-muted-foreground leading-relaxed">
              From our famous quesatacos that put us on the map to our refreshing aguas frescas 
              that cool you down on hot Fresno days, every item on our menu is made with 
              passion and authentic Mexican traditions.
            </p>

            <div className="bg-gradient-to-r from-secondary/10 to-primary/10 rounded-xl p-6">
              <h4 className="font-semibold text-secondary mb-2">💰 Great Value</h4>
              <p className="text-muted-foreground mb-4">
                Generous portions at affordable prices. Most meals range from $10-20 per person.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <a 
                  href="tel:+15592277281"
                  className="btn-primary inline-flex items-center justify-center flex-1"
                >
                  Order by Phone
                </a>
                <button 
                  onClick={() => {
                    const element = document.getElementById('location');
                    if (element) element.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="btn-secondary inline-flex items-center justify-center flex-1"
                >
                  Visit Us Today
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MenuSection;