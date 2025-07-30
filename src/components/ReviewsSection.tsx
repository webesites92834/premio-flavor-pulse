import React, { useEffect, useRef, useState } from 'react';
import { Star, Quote } from 'lucide-react';

const ReviewsSection = () => {
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

  const reviews = [
    {
      name: "Maria Rodriguez",
      rating: 5,
      review: "Best quesatacos in Fresno! The flavors are absolutely authentic and the service is always friendly. Been coming here for 10+ years and it never disappoints.",
      date: "2 months ago"
    },
    {
      name: "David Chen",
      rating: 5,
      review: "Amazing family-owned restaurant with incredible food at great prices. The aguas frescas are refreshing and the portions are generous. Highly recommend!",
      date: "1 month ago"
    },
    {
      name: "Sarah Johnson",
      rating: 5,
      review: "Authentic Mexican food that reminds me of my travels to Mexico. The burritos are huge and packed with flavor. Perfect spot for a quick, delicious meal.",
      date: "3 weeks ago"
    }
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-5 h-5 ${
          index < rating ? 'text-mexican-yellow fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <section 
      id="reviews" 
      ref={sectionRef}
      className="py-16 bg-gradient-to-b from-secondary/5 to-background"
    >
      <div className="container-max section-padding">
        {/* Header */}
        <div className={`text-center mb-16 ${isVisible ? 'animate-fade-in-up' : ''}`}>
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            What People Are Saying
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Don't just take our word for it - here's what our customers love about us.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mt-6"></div>
        </div>

        {/* Horizontal Ticker Reviews */}
        <div className="relative overflow-hidden">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background via-background/80 to-transparent z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background via-background/80 to-transparent z-10"></div>
          
          {/* Ticker container */}
          <div className="flex animate-ticker-smooth space-x-6">
            {/* First set of reviews */}
            {reviews.map((review, index) => (
              <div 
                key={`first-${index}`}
                className="flex-shrink-0 w-72 md:w-80 lg:w-96 bg-white rounded-2xl shadow-lg border border-gray-100 p-6 relative transition-transform hover:scale-105"
              >
                {/* Quote Icon */}
                <div className="absolute -top-3 -left-3 w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                  <Quote className="w-4 h-4 text-white" />
                </div>

                {/* Rating */}
                <div className="flex items-center space-x-1 mb-4">
                  {renderStars(review.rating)}
                </div>

                {/* Review Text */}
                <p className="text-muted-foreground leading-relaxed mb-6 italic">
                  "{review.review}"
                </p>

                {/* Reviewer Info */}
                <div className="border-t pt-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-foreground">{review.name}</p>
                      <p className="text-sm text-muted-foreground">{review.date}</p>
                    </div>
                    <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center">
                      <span className="text-primary font-bold text-lg">
                        {review.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Duplicate set for seamless loop */}
            {reviews.map((review, index) => (
              <div 
                key={`second-${index}`}
                className="flex-shrink-0 w-72 md:w-80 lg:w-96 bg-white rounded-2xl shadow-lg border border-gray-100 p-6 relative transition-transform hover:scale-105"
              >
                {/* Quote Icon */}
                <div className="absolute -top-3 -left-3 w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                  <Quote className="w-4 h-4 text-white" />
                </div>

                {/* Rating */}
                <div className="flex items-center space-x-1 mb-4">
                  {renderStars(review.rating)}
                </div>

                {/* Review Text */}
                <p className="text-muted-foreground leading-relaxed mb-6 italic">
                  "{review.review}"
                </p>

                {/* Reviewer Info */}
                <div className="border-t pt-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-foreground">{review.name}</p>
                      <p className="text-sm text-muted-foreground">{review.date}</p>
                    </div>
                    <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center">
                      <span className="text-primary font-bold text-lg">
                        {review.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Overall Rating Summary */}
        <div className={`mt-16 text-center ${isVisible ? 'animate-fade-in-up' : ''}`} style={{animationDelay: '0.8s'}}>
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md mx-auto">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="flex space-x-1">
                {renderStars(5)}
              </div>
              <span className="text-2xl font-bold text-primary">5.0</span>
            </div>
            
            <p className="text-muted-foreground mb-4">
              Based on 100+ Google Reviews
            </p>
            
            <p className="text-lg font-semibold text-foreground mb-6">
              "Fresno's Favorite Taqueria"
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <a 
                href="https://www.google.com/maps/place/Taqueria+El+Premio+Mayor/data=!4m2!3m1!1s0x80946765931a7a9b:0x804af70d63c040b0?sa=X&ved=1t:242&ictx=111"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary flex-1 text-center"
              >
                Read More Reviews
              </a>
              <button 
                onClick={() => {
                  const element = document.getElementById('location');
                  if (element) element.scrollIntoView({ behavior: 'smooth' });
                }}
                className="btn-primary flex-1"
              >
                Visit Us Today
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;