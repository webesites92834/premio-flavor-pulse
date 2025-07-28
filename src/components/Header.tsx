import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-sm shadow-lg' 
          : 'bg-transparent'
      }`}
    >
      <div className="container-max section-padding py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">T</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-primary">Taqueria</h1>
              <p className="text-sm text-secondary -mt-1">El Premio Mayor</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/"
              className={`font-medium transition-colors hover:text-primary ${
                isScrolled ? 'text-foreground' : 'text-white'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/menu"
              className={`font-medium transition-colors hover:text-primary ${
                isScrolled ? 'text-foreground' : 'text-white'
              }`}
            >
              Menu
            </Link>
            <Link 
              to="/about"
              className={`font-medium transition-colors hover:text-primary ${
                isScrolled ? 'text-foreground' : 'text-white'
              }`}
            >
              About
            </Link>
            <Link 
              to="/visit"
              className={`font-medium transition-colors hover:text-primary ${
                isScrolled ? 'text-foreground' : 'text-white'
              }`}
            >
              Visit Us
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden p-2 rounded-lg transition-colors ${
              isScrolled ? 'text-foreground' : 'text-white'
            }`}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="md:hidden mt-4 py-4 bg-white rounded-lg shadow-lg">
            <div className="flex flex-col space-y-4 px-4">
              <Link 
                to="/"
                className="text-left font-medium text-foreground hover:text-primary transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/menu"
                className="text-left font-medium text-foreground hover:text-primary transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Menu
              </Link>
              <Link 
                to="/about"
                className="text-left font-medium text-foreground hover:text-primary transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                to="/visit"
                className="text-left font-medium text-foreground hover:text-primary transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Visit Us
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;