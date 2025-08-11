import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiMessageCircle, FiX, FiSend, FiHome, FiPackage, FiShoppingCart, FiHelpCircle, FiSettings } from "react-icons/fi";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "bot",
      content: "Hello! 👋 I'm your AI assistant for Simple Self Inventory Management. How can I help you today? 😄\n\nI can help with:\n• Login and account issues 🔑\n• Product and inventory questions 📦\n• Navigation and page help 🧭\n• General troubleshooting 🛠️",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Enhanced predefined responses for common issues
  const botResponses = {
    login: {
      content: "Having trouble logging in? Let me help! 🔑\n\n**Step-by-step solution:**\n1. ✅ Check your email and password carefully\n2. ✅ Make sure caps lock is off\n3. ✅ Try refreshing the page (F5 or Ctrl+R)\n4. ✅ Clear browser cache and cookies\n5. ✅ Check your internet connection\n\n**Still having issues?**\n• Click 'Forgot Password' on the login page\n• Try signing up for a new account\n• Contact support if problems persist\n\nNeed to sign up? Click the 'Sign Up' link in the sidebar! ✍️",
      quickActions: ["Go to Login", "Go to Sign Up", "Forgot Password Help"]
    },
    cart: {
      content: "Product not showing in cart? Let's fix that! 🛒\n\n**Quick fixes to try:**\n1. 🔄 Refresh the page completely\n2. 🔐 Make sure you're logged in\n3. 🛒 Try adding the product again\n4. 🧹 Clear browser cache and cookies\n5. 🌐 Try a different browser\n\n**Check these pages:**\n• Products page - to see all available items\n• Inventory page - to check stock levels\n• Orders page - to view your order history\n\nIf the problem continues, try logging out and back in! 🔄",
      quickActions: ["Go to Products", "Go to Inventory", "Go to Orders"]
    },
    stock: {
      content: "Out of stock issues? Here's what to do! 📦\n\n**Immediate actions:**\n1. 📊 Check the Inventory page for current stock levels\n2. 📈 Review Analytics for stock trends and predictions\n3. 🏢 Contact suppliers through the Suppliers page\n4. ⚠️ Set up low stock alerts for future\n5. 📋 Check Orders page for pending restocks\n\n**Pro tips:**\n• Use Analytics to predict when you'll need more stock\n• Contact suppliers early to avoid delays\n• Set up automatic reorder points\n• Track seasonal demand patterns\n\nI can help you navigate to any of these pages! 🚀",
      quickActions: ["Go to Inventory", "Go to Suppliers", "Go to Analytics", "Go to Orders"]
    },
    navigation: {
      content: "Need help navigating? Here's your complete guide! 🧭\n\n**Main Pages:**\n🏠 **Home** - Overview of your system and quick stats\n📊 **Dashboard** - Key metrics, charts, and insights\n🛒 **Products** - Manage your product catalog and details\n📦 **Inventory** - Track stock levels and manage inventory\n💰 **Sales** - View sales data and revenue reports\n📋 **Orders** - Manage customer orders and fulfillment\n🏢 **Suppliers** - Contact and manage supplier relationships\n📈 **Analytics** - Detailed reports and business insights\n🚚 **Logistics** - Shipping, delivery, and logistics management\n\n**Quick Access:**\n• Use the sidebar menu on the left\n• Each page has specific tools and features\n• Look for help icons (?) on each page\n\nWhich page would you like to visit? 😊",
      quickActions: ["Go to Home", "Go to Dashboard", "Go to Products", "Go to Inventory", "Go to Analytics"]
    },
    password: {
      content: "Forgot your password? No worries! 🔐\n\n**How to reset your password:**\n1. 📧 Go to the Login page\n2. 🔗 Click 'Forgot Password' link\n3. 📝 Enter your email address\n4. 📨 Check your email for reset instructions\n5. 🔑 Create a new password\n\n**Password tips:**\n• Use a strong password (8+ characters)\n• Include numbers and special characters\n• Don't use personal information\n• Consider using a password manager\n\n**Still having trouble?**\n• Check your spam/junk folder\n• Try signing up for a new account\n• Contact support for assistance\n\nNeed to go to login? I can help! 😊",
      quickActions: ["Go to Login", "Go to Sign Up", "Password Tips"]
    },
    general: {
      content: "I'm here to help with any inventory management questions! 🤖\n\n**What I can assist with:**\n🔑 **Account Issues** - Login, signup, password problems\n🛒 **Product Management** - Adding, editing, organizing products\n📦 **Inventory Control** - Stock levels, alerts, tracking\n💰 **Sales & Orders** - Processing orders, sales reports\n🏢 **Supplier Management** - Contacting suppliers, restocking\n📊 **Analytics & Reports** - Business insights and data\n🧭 **Navigation Help** - Finding pages and features\n🛠️ **Technical Support** - Browser issues, troubleshooting\n\n**Quick help categories:**\nJust ask me about any of these topics, and I'll provide step-by-step guidance! 😄",
      quickActions: ["Navigation Help", "Login Issues", "Stock Issues", "Password Help"]
    }
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim() || isTyping) return;

    const userMessage = {
      id: Date.now(),
      type: "user",
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    // Simulate bot response with typing indicator
    setTimeout(() => {
      const botResponse = generateBotResponse(inputMessage.toLowerCase());
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const generateBotResponse = (message) => {
    let responseType = "general";

    // Enhanced keyword detection
    if (message.includes("login") || message.includes("log in") || message.includes("sign in") || message.includes("can't log")) {
      responseType = "login";
    } else if (message.includes("cart") || message.includes("product") || message.includes("add") || message.includes("not showing")) {
      responseType = "cart";
    } else if (message.includes("stock") || message.includes("out of stock") || message.includes("inventory") || message.includes("low stock") || message.includes("restock")) {
      responseType = "stock";
    } else if (message.includes("navigate") || message.includes("where") || message.includes("page") || message.includes("menu") || message.includes("how to find")) {
      responseType = "navigation";
    } else if (message.includes("password") || message.includes("forgot") || message.includes("reset") || message.includes("can't access")) {
      responseType = "password";
    }

    return {
      id: Date.now() + 1,
      type: "bot",
      content: botResponses[responseType].content,
      quickActions: botResponses[responseType].quickActions,
      timestamp: new Date()
    };
  };

  const handleQuickAction = (action) => {
    const actionMessage = {
      id: Date.now(),
      type: "user",
      content: action,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, actionMessage]);
    setIsTyping(true);

    // Enhanced bot response for quick action
    setTimeout(() => {
      let responseContent = "";
      
      if (action.includes("Go to ")) {
        const pageName = action.replace("Go to ", "");
        responseContent = `Perfect! I'll help you navigate to ${pageName}. 🧭\n\n**How to get there:**\n• Look for "${pageName}" in the sidebar menu on the left\n• Click on it to access the page\n• The page will load with all its features\n\n**What you'll find there:**\n${getPageDescription(pageName)}\n\nNeed help with anything specific on that page? Just ask! 😊`;
      } else if (action === "Forgot Password Help") {
        responseContent = botResponses.password.content;
      } else if (action === "Password Tips") {
        responseContent = "**Strong Password Tips:** 🔐\n\n✅ **Do's:**\n• Use 8+ characters\n• Mix uppercase and lowercase\n• Include numbers (0-9)\n• Add special characters (!@#$%^&*)\n• Use unique passwords for each account\n\n❌ **Don'ts:**\n• Don't use personal info (name, birthday)\n• Don't use common words\n• Don't reuse passwords\n• Don't share passwords\n\n**Pro tip:** Consider using a password manager for better security! 🛡️";
      } else {
        responseContent = `Great choice! I can help you with ${action}. Let me know what specific issue you're facing, and I'll provide detailed guidance! 😄`;
      }

      const botResponse = {
        id: Date.now() + 1,
        type: "bot",
        content: responseContent,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000);
  };

  const getPageDescription = (pageName) => {
    const descriptions = {
      "Home": "• System overview and quick statistics\n• Recent activity and notifications\n• Quick access to main features",
      "Dashboard": "• Key performance metrics\n• Charts and visualizations\n• Real-time data insights",
      "Products": "• Product catalog management\n• Add, edit, and organize products\n• Product details and pricing",
      "Inventory": "• Stock level tracking\n• Inventory management tools\n• Low stock alerts",
      "Analytics": "• Detailed business reports\n• Sales and inventory trends\n• Performance analytics"
    };
    return descriptions[pageName] || "• All the tools and features you need\n• Easy-to-use interface\n• Comprehensive data and reports";
  };

  const formatTime = (timestamp) => {
    return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <>
      {/* Chatbot Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 z-50"
        title="AI Assistant - Get Help"
      >
        {isOpen ? <FiX size={24} /> : <FiMessageCircle size={24} />}
      </button>

      {/* Chatbot Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 h-[500px] bg-white rounded-lg shadow-xl border border-gray-200 flex flex-col z-50">
          {/* Header */}
          <div className="bg-blue-600 text-white p-4 rounded-t-lg flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mr-3">
                <span className="text-blue-600 font-bold text-sm">AI</span>
              </div>
              <div>
                <h3 className="font-semibold">Simple Self Assistant</h3>
                <p className="text-xs text-blue-100">Always here to help! 😄</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-blue-100 transition-colors"
              title="Close Chat"
            >
              <FiX size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-xs p-3 rounded-lg ${
                    message.type === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  <div className="whitespace-pre-line text-sm">{message.content}</div>
                  {message.quickActions && (
                    <div className="mt-3 space-y-2">
                      {message.quickActions.map((action, index) => (
                        <button
                          key={index}
                          onClick={() => handleQuickAction(action)}
                          className="block w-full text-left text-xs bg-blue-100 hover:bg-blue-200 text-blue-800 px-3 py-2 rounded transition-colors"
                        >
                          {action}
                        </button>
                      ))}
                    </div>
                  )}
                  <div className={`text-xs mt-2 ${message.type === "user" ? "text-blue-100" : "text-gray-500"}`}>
                    {formatTime(message.timestamp)}
                  </div>
                </div>
              </div>
            ))}
            
            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-800 p-3 rounded-lg">
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder="Type your message here..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                disabled={isTyping}
              />
              <button
                onClick={handleSendMessage}
                disabled={isTyping || !inputMessage.trim()}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                title="Send Message"
              >
                <FiSend size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
} 