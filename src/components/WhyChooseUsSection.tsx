import React, { useEffect, useRef, useState } from 'react';
import { Check, Heart, Clock, Star, DollarSign } from 'lucide-react';

const WhyChooseUsSection = () => {
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

  const features = [
    {
      icon: Heart,
      title: "Authentic Mexican Flavor",
      description: "Traditional recipes passed down through generations"
    },
    {
      icon: Clock,
      title: "Fresh Ingredients Daily",
      description: "We prepare everything fresh every morning"
    },
    {
      icon: Star,
      title: "No Reservations Needed",
      description: "Walk in anytime and enjoy our welcoming atmosphere"
    },
    {
      icon: Check,
      title: "Loved by the Community",
      description: "25+ years of serving happy customers in Fresno"
    },
    {
      icon: DollarSign,
      title: "Affordable Meals",
      description: "Great value with portions that will satisfy"
    }
  ];

  return (
    <section 
      id="why-choose-us" 
      ref={sectionRef}
      className="py-16 bg-white"
    >
      <div className="container-max section-padding">
        {/* Header */}
        <div className={`text-center mb-16 ${isVisible ? 'animate-fade-in-up' : ''}`}>
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Why Locals Love Us
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We're Fresno's go-to taco spot for a reason.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mt-6"></div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div 
                key={index}
                className={`card-mexican text-center group ${isVisible ? 'animate-fade-in-up' : ''}`}
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {feature.title}
                </h3>
                
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className={`text-center mt-16 ${isVisible ? 'animate-fade-in-up' : ''}`} style={{animationDelay: '0.6s'}}>
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-primary mb-4">
              Ready to Taste the Difference?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Join thousands of satisfied customers who have made us their favorite Mexican restaurant in Fresno.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="tel:+15592277281"
                className="btn-primary inline-flex items-center justify-center"
              >
                Call Now: (559) 227-7281
              </a>
              <button 
                onClick={() => {
                  const element = document.getElementById('location');
                  if (element) element.scrollIntoView({ behavior: 'smooth' });
                }}
                className="btn-secondary inline-flex items-center justify-center"
              >
                Get Directions
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;