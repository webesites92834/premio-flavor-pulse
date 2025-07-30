import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

const RESTAURANT_KNOWLEDGE = {
  name: "Taqueria El Premio Mayor",
  hours: "Monday - Sunday: 9:00 AM - 9:00 PM",
  phone: "(559) 227-7281",
  address: "3141 N Maroa Ave, Fresno, CA 93704 (Shield & Maroa)",
  priceRange: "$10-$20 per person",
  established: "Since 1996",
  specialties: ["quesatacos", "burritos", "tacos", "tortas", "aguas frescas", "menudo"],
  menu: {
    tacos: ["Asada ($2.50)", "Adobada ($2.50)", "Cabeza ($2.50)", "Pollo ($2.50)", "Lengua ($3.50)", "Tripa ($2.75)", "Chile Verde ($2.75)", "Carnitas ($2.75)"],
    burritos: ["Burrito ($8.99)", "Burrito Supreme ($9.99)", "Wet Burrito ($11.99)", "Bacon Wrap Burrito ($8.99)", "Breakfast Burrito ($8.99)"],
    tortas: ["Asada/Adobada/Pollo/Jamon/Hawaiian/Lomo ($9.99)", "Pierna/Milanesa/Cubana ($10.99)", "Milanesa & Cubana Mixta ($12.99)"],
    drinks: ["Jarritos ($2.99)", "Coca-Cola/Fanta 1.5L ($4.50)", "Soda Can ($1.98)", "Aguas Frescas Regular ($3.50)", "Aguas Frescas Large ($4.50)"],
    menudo: ["Chico/Small ($10.29)", "Grande/Large ($12.99)"]
  },
  features: ["No reservations needed", "Walk-ins welcome", "Fresh ingredients daily", "Authentic Mexican flavors", "Family-owned", "Community favorite"]
};

const generateResponse = (userMessage: string): string => {
  const message = userMessage.toLowerCase();
  
  // Greetings
  if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
    return `¡Hola! Welcome to ${RESTAURANT_KNOWLEDGE.name}! I'm here to help you with any questions about our authentic Mexican food, menu, hours, or location. What would you like to know?`;
  }
  
  // Hours
  if (message.includes('hour') || message.includes('open') || message.includes('close') || message.includes('time')) {
    return `We're open ${RESTAURANT_KNOWLEDGE.hours}. We're here every day of the week to serve you delicious Mexican food!`;
  }
  
  // Location/Address
  if (message.includes('location') || message.includes('address') || message.includes('where') || message.includes('direction')) {
    return `You can find us at ${RESTAURANT_KNOWLEDGE.address}. We're located at the Shield & Maroa intersection. Need directions? Just call us at ${RESTAURANT_KNOWLEDGE.phone}!`;
  }
  
  // Phone
  if (message.includes('phone') || message.includes('call') || message.includes('number')) {
    return `You can call us at ${RESTAURANT_KNOWLEDGE.phone}. We're always happy to help with orders or answer questions!`;
  }
  
  // Menu - General
  if (message.includes('menu') && !message.includes('taco') && !message.includes('burrito')) {
    return `Our menu features authentic Mexican favorites! We have tacos, burritos, tortas, aguas frescas, and menudo. Our specialties include our famous quesatacos! What specific item would you like to know about?`;
  }
  
  // Tacos
  if (message.includes('taco')) {
    const tacoList = RESTAURANT_KNOWLEDGE.menu.tacos.join(', ');
    return `Our delicious tacos include: ${tacoList}. All made fresh with authentic flavors! Our most popular are the Asada and Adobada.`;
  }
  
  // Burritos
  if (message.includes('burrito')) {
    const burritoList = RESTAURANT_KNOWLEDGE.menu.burritos.join(', ');
    return `Our hearty burritos include: ${burritoList}. All are big, bold, and fully loaded with fresh ingredients!`;
  }
  
  // Drinks
  if (message.includes('drink') || message.includes('agua') || message.includes('fresca') || message.includes('beverage')) {
    const drinkList = RESTAURANT_KNOWLEDGE.menu.drinks.join(', ');
    return `We have refreshing drinks including: ${drinkList}. Our aguas frescas are traditional and made fresh daily!`;
  }
  
  // Price
  if (message.includes('price') || message.includes('cost') || message.includes('expensive') || message.includes('cheap')) {
    return `Our prices are very affordable! Most meals range from ${RESTAURANT_KNOWLEDGE.priceRange}. We believe in providing great value for authentic, quality Mexican food.`;
  }
  
  // Reservations
  if (message.includes('reservation') || message.includes('book') || message.includes('table')) {
    return `No reservations needed! We welcome walk-ins and are here to serve you when you're ready. Just come on in and we'll take great care of you!`;
  }
  
  // About
  if (message.includes('about') || message.includes('story') || message.includes('history')) {
    return `${RESTAURANT_KNOWLEDGE.name} has been serving authentic Mexican flavors ${RESTAURANT_KNOWLEDGE.established}. We're a family-owned taqueria committed to fresh ingredients, traditional recipes, and being part of the Fresno community.`;
  }
  
  // Specialties
  if (message.includes('special') || message.includes('recommend') || message.includes('popular') || message.includes('famous')) {
    return `Our specialties include our famous quesatacos, carne asada tacos, and hearty burritos! We're also known for our fresh aguas frescas and weekend menudo. Everything is made with love and authentic Mexican tradition!`;
  }
  
  // Thanks
  if (message.includes('thank') || message.includes('gracias')) {
    return `¡De nada! Thank you for your interest in ${RESTAURANT_KNOWLEDGE.name}. We can't wait to serve you authentic Mexican food made with love. Come visit us soon!`;
  }
  
  // Default response
  return `I'd love to help you learn more about ${RESTAURANT_KNOWLEDGE.name}! You can ask me about our menu, hours, location, prices, or anything else. We're here ${RESTAURANT_KNOWLEDGE.hours} at ${RESTAURANT_KNOWLEDGE.address}. What would you like to know?`;
};

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: `¡Hola! Welcome to ${RESTAURANT_KNOWLEDGE.name}! I'm here to help you with questions about our authentic Mexican food, menu, hours, or location. What can I help you with today?`,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate bot thinking time
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: generateResponse(userMessage.content),
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1500); // Random delay between 1-2.5 seconds
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 w-80 md:w-96 h-96 bg-white border border-gray-200 rounded-lg shadow-xl animate-in slide-in-from-bottom-4 duration-300">
          {/* Header */}
          <div className="flex items-center justify-between p-4 bg-primary text-white rounded-t-lg">
            <div className="flex items-center space-x-2">
              <Bot className="w-5 h-5" />
              <div>
                <h3 className="font-semibold text-sm">Taqueria Assistant</h3>
                <p className="text-xs text-white/80">Ask me anything!</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/20"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Messages */}
          <ScrollArea className="h-64 p-4">
            <div className="space-y-3">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.type === 'user'
                        ? 'bg-primary text-white'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    <div className="flex items-start space-x-2">
                      {message.type === 'bot' && (
                        <Bot className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      )}
                      {message.type === 'user' && (
                        <User className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      )}
                      <p className="text-sm leading-relaxed">{message.content}</p>
                    </div>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 p-3 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Bot className="w-4 h-4" />
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div ref={messagesEndRef} />
          </ScrollArea>

          {/* Input */}
          <div className="p-4 border-t">
            <div className="flex space-x-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about our menu, hours, location..."
                className="flex-1 text-sm"
                disabled={isTyping}
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isTyping}
                size="icon"
                className="bg-primary hover:bg-primary/90"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Chat Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-12 h-12 rounded-full bg-primary hover:bg-primary/90 text-white shadow-lg transition-all duration-300 ${
          isOpen ? 'rotate-180' : 'hover:scale-110'
        }`}
        size="icon"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </Button>
    </div>
  );
};

export default Chatbot;