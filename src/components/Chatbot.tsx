import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { GoogleGenAI } from '@google/genai';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

const RESTAURANT_KNOWLEDGE = `
You are **PremioBot**, a helpful and knowledgeable chatbot assistant specifically trained on the information from the website **Taqueria El Premio Mayor**.

Your main goal is to answer user questions accurately using ONLY the information provided about **Taqueria El Premio Mayor** and related content given.

### STRICT GUIDELINES:

1. **ONLY answer about Taqueria El Premio Mayor** - Never provide information about other restaurants, general food facts, cooking tips, or any topic unrelated to this specific restaurant.

2. **If asked about anything NOT related to Taqueria El Premio Mayor**, always respond with:
   **"I'm sorry, I can only provide information about Taqueria El Premio Mayor. Is there anything specific you'd like to know about our restaurant, menu, hours, or location?"**

3. **Your responses must be:**
   * Clear, concise, and informative about Taqueria El Premio Mayor only
   * Grammatically correct with proper spelling and punctuation
   * Polite and professional with a friendly tone
   * Limited to the provided restaurant information below

4. **If information is not available** in the provided details, respond with:
   **"I don't have that specific information right now, but I'm here to help with other questions about Taqueria El Premio Mayor. You can also call us directly at (559) 227-7281!"**

### RESTAURANT INFORMATION ONLY:

**Website Name:** Taqueria El Premio Mayor

**Description:**
A family-owned Mexican restaurant located at 3141 N Maroa Ave, Fresno, CA 93703, situated at the intersection of Shield & Maroa. Established in 1996, it has been serving the Fresno community for over 25 years with authentic Mexican flavors, earning recognition for its award-winning quesadillas.

**Founded:** 1996 (family-owned establishment - over 25 years of service)

**Core Business:**
Serving traditional Mexican street food including tacos, burritos, tortas, aguas frescas, menudo, and award-winning quesadillas. Everything prepared fresh daily using traditional recipes passed down through generations with love and a strong community focus.

**Menu Highlights:**
* **Tacos** ($2.50–$3.50): Asada, Adobada, Cabeza, Pollo, Lengua, Tripa, Chile Verde, Carnitas
* **Burritos** ($8.99–$11.99): Classic, Supreme, Wet, Bacon Wrap, Breakfast
* **Tortas** ($9.99–$12.99): Asada, Pollo, Milanesa, Jamon, and more
* **Quesadillas**: Award-winning quesadillas (our specialty!)
* **Menudo**: Small ($10.29), Large ($12.99)
* **Aguas Frescas**: Regular ($3.50), Large ($4.50)
* **Drinks**: Jarritos ($2.99), Coca-Cola/Fanta 1.5L ($4.50), Soda Can ($1.98)

**Store Information:**
* **Location:** 3141 N Maroa Ave, Fresno, CA 93703 (intersection of Shield & Maroa)
* **Hours:** 
  - Monday: CLOSED
  - Tuesday - Friday: 9:00 AM – 10:00 PM
  - Saturday - Sunday: 9:00 AM – 3:00 PM
* **Contact:** (559) 227-7281
* **Price Range:** $10–$20 per person

**Service Details:**
* **Dining Options:** Breakfast, Brunch, Lunch, Dinner
* **Food Types:** Comfort food, Late-night food, Quick bites, Small plates
* **Service Options:** On-site services, Takeaway, Dine-in
* **NO DELIVERY available**
* **NO RESERVATIONS accepted** - Walk-ins welcome
* **Payments:** Cash and Card accepted

**Parking & Facilities:**
* **Parking:** Free street parking and parking lot available
* **Restroom facilities:** Available on-site
* **Accessibility Features:**
  - Wheelchair-accessible parking
  - Wheelchair-accessible toilets
  - Wheelchair-accessible seating
  - Wheelchair-accessible entrance

**Why Customers Love Us:**
* Award-winning quesadillas - our specialty!
* Authentic flavors and family legacy since 1996 (over 25 years)
* Fast service and friendly environment
* Affordable pricing with generous portions
* Strong community focus and family atmosphere
* Fresh ingredients prepared daily using traditional recipes
* Convenient hours Tuesday through Sunday

**Mission & Values:**
* Traditional Mexican recipes passed down through generations
* Community-first approach, welcoming every guest like family
* Consistent quality with every dish made fresh daily with love
* Bringing people together through authentic Mexican food and tradition
* Maintaining strong community focus and family atmosphere

**Tagline:** "Flavor That Speaks for Itself."

**Additional Notes:**
* Located at the busy intersection of Shield & Maroa in Fresno, CA
* No reservations needed — just walk in and enjoy
* Family-owned since 1996 serving the Fresno community for over 25 years
* Closed Mondays, open all other days
* Award-winning quesadillas are our signature specialty

REMEMBER: Never provide information beyond Taqueria El Premio Mayor. Always redirect off-topic questions back to the restaurant.
`;

// Initialize Gemini AI
const ai = new GoogleGenAI({
  apiKey: 'AIzaSyCWW5o9YmHLL9szRBvO3MDJ_D0JT1POWvI',
});

const generateResponse = async (userMessage: string): Promise<string> => {
  try {
    const contents = [
      {
        role: 'user',
        parts: [
          {
            text: `${RESTAURANT_KNOWLEDGE}\n\nUser question: ${userMessage}`,
          },
        ],
      },
    ];

    const response = await ai.models.generateContentStream({
      model: 'gemma-3n-e2b-it',
      config: {},
      contents,
    });

    let fullResponse = '';
    for await (const chunk of response) {
      if (chunk.text && chunk.text !== 'undefined') {
        fullResponse += chunk.text;
      }
    }

    // Clean up any trailing undefined or empty content
    fullResponse = fullResponse.replace(/undefined\s*$/, '').trim();
    
    return fullResponse || "I'm here to help you with questions about Taqueria El Premio Mayor. What would you like to know?";
  } catch (error) {
    console.error('Error generating response:', error);
    return "I'm sorry, I'm having trouble responding right now. Please try again or call us at (559) 227-7281 for immediate assistance!";
  }
};

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: '¡Hola! Welcome to Taqueria El Premio Mayor! I\'m PremioBot, here to help you with questions about our authentic Mexican food, menu, hours, or location. What can I help you with today?',
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

  const handleSendMessage = async () => {
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

    try {
      const responseContent = await generateResponse(userMessage.content);
      
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: responseContent,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botResponse]);
    } catch (error) {
      console.error('Error getting response:', error);
      const errorResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: "I'm sorry, I'm having trouble responding right now. Please try again or call us at (559) 227-7281!",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorResponse]);
    } finally {
      setIsTyping(false);
    }
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
        <div className="mb-4 w-80 md:w-96 h-96 bg-white border border-gray-200 rounded-lg shadow-xl animate-scale-in">
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
                       <div className="text-sm leading-relaxed whitespace-pre-wrap" dangerouslySetInnerHTML={{
                         __html: message.content
                           .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                           .replace(/\*(.*?)\*/g, '<em>$1</em>')
                           .replace(/### (.*?)\n/g, '<h4 class="font-semibold text-primary mt-3 mb-2">$1</h4>')
                           .replace(/## (.*?)\n/g, '<h3 class="font-bold text-primary mt-4 mb-2">$1</h3>')
                           .replace(/# (.*?)\n/g, '<h2 class="font-bold text-lg text-primary mt-4 mb-3">$1</h2>')
                           .replace(/\n• /g, '<br/>• ')
                           .replace(/\n\* /g, '<br/>• ')
                           .replace(/\$(\d+\.\d+)/g, '<span class="font-semibold text-green-600">$$$1</span>')
                           .replace(/🌮|🌯|🍲|🥤|🍹|🥪|📍|📞|⏰|💰/g, '<span class="text-lg">$&</span>')
                           .replace(/\n\n/g, '<br/><br/>')
                           .replace(/\n/g, '<br/>')
                       }} />
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
          <div className="p-3 border-t bg-gray-50">
            <div className="flex items-end space-x-2">
              <div className="flex-1">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about our menu, hours, location..."
                  className="text-sm border-gray-300 focus:border-primary focus:ring-1 focus:ring-primary"
                  disabled={isTyping}
                  maxLength={500}
                />
              </div>
              <Button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isTyping}
                size="icon"
                className="bg-primary hover:bg-primary/90 flex-shrink-0 h-10 w-10"
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
          isOpen ? 'rotate-45' : 'hover:scale-110'
        }`}
        size="icon"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </Button>
    </div>
  );
};

export default Chatbot;