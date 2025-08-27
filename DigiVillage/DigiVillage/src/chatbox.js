import React, { useState, useEffect, useRef } from 'react';
import { FaPaperPlane, FaUser, FaRobot, FaHome, FaInfoCircle, FaImages, FaEnvelope } from 'react-icons/fa';
import { Link } from "react-router-dom";

const Chatbox = () => {
  const [language, setLanguage] = useState('en');
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef(null);

  // Translation dictionary
  const translations = {
    en: {
      "Chat with Us": "Chat with Us",
      "Type your message here...": "Type your message here...",
      "Send": "Send",
      "Hello! How can I help you today?": "Hello! How can I help you today?",
      "Thanks for your message! Our team will get back to you soon.": "Thanks for your message! Our team will get back to you soon.",
      "Please enter a message.": "Please enter a message.",
      "Switch to Telugu": "Switch to Telugu",
      "Switch to English": "Switch to English",
      "Village Information": "Village Information",
      "Festival Details": "Festival Details",
      "Local Services": "Local Services",
      "Contact Officials": "Contact Officials",
      "Quick Actions": "Quick Actions",
      "Select an option to get quick information:": "Select an option to get quick information:",
      "digitalVillage": "Digital Village",
      "Home": "Home",
      "Login": "Login",
      "Information": "Information",
      "Community Chat": "Community Chat",
      "Gallery": "Gallery",
      "Contact Us": "Contact Us",
    },
    te: {
      "Chat with Us": "మాతో చాట్ చేయండి",
      "Type your message here...": "ఇక్కడ మీ సందేశాన్ని టైప్ చేయండి...",
      "Send": "పంపించు",
      "Hello! How can I help you today?": "హలో! ఈరోజు నేను మీకు ఎలా సహాయం చేయగలను?",
      "Thanks for your message! Our team will get back to you soon.": "మీ సందేశానికి ధన్యవాదాలు! మా టీమ్ త్వరలో మీకు తిరిగి స్పందిస్తుంది.",
      "Please enter a message.": "దయచేసి ఒక సందేశాన్ని నమోదు చేయండి.",
      "Switch to Telugu": "తెలుగుకు మారండి",
      "Switch to English": "ఆంగ్లంలోకి మారండి",
      "Village Information": "గ్రామ సమాచారం",
      "Festival Details": "పండుగ వివరాలు",
      "Local Services": "స్థానిక సేవలు",
      "Contact Officials": "అధికారులను సంప్రదించండి",
      "Quick Actions": "త్వరిత చర్యలు",
      "Select an option to get quick information:": "త్వరిత సమాచారం పొందడానికి ఒక ఎంపికను ఎంచుకోండి:",
      "digitalVillage": "డిజిటల్ గ్రామం",
      "Home": "హోమ్",
      "Login": "లాగిన్",
      "Information": "సమాచారం",
      "Community Chat": "కమ్యూనిటీ చాట్",
      "Gallery": "గ్యాలరీ",
      "Contact Us": " సంప్రదించండి",
    }
  };

  const t = (text) => translations[language][text] || text;

  const quickActions = [
    { id: 1, text: t("Village Information") },
    { id: 2, text: t("Festival Details") },
    { id: 3, text: t("Local Services") },
    { id: 4, text: t("Contact Officials") }
  ];

  useEffect(() => {
    setMessages([{
      id: 1,
      text: t("Hello! How can I help you today?"),
      sender: 'bot',
      timestamp: new Date()
    }]);
  }, [language]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputMessage.trim()) {
      alert(t("Please enter a message."));
      return;
    }

    const userMessage = {
      id: messages.length + 1,
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');

    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        text: t("Thanks for your message! Our team will get back to you soon."),
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  const handleQuickAction = (actionText) => {
    const quickActionMessage = {
      id: messages.length + 1,
      text: actionText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, quickActionMessage]);

    setTimeout(() => {
      let responseText = '';
      switch(actionText) {
        case t("Village Information"):
          responseText = language === 'en' 
            ? "Our village has a population of 2,500 people with rich cultural heritage dating back 300 years." 
            : "మా గ్రామం 300 సంవత్సరాల నాటి సంపన్న సాంస్కృతిక వారసత్వంతో 2,500 మంది జనాభాను కలిగి ఉంది.";
          break;
        case t("Festival Details"):
          responseText = language === 'en'
            ? "The next village festival is on November 15th - a harvest celebration with traditional dances and food."
            : "తదుపరి గ్రామ పండుగ నవంబర్ 15న - సాంప్రదాయ నృత్యాలు మరియు ఆహారంతో పంట వేడుక.";
          break;
        case t("Local Services"):
          responseText = language === 'en'
            ? "Local services include: Health center (open Mon-Sat), Post office, School, and Community hall."
            : "స్థానిక సేవలు: ఆరోగ్య కేంద్రం (సోమ-శని తెరిచి), తపాలా కార్యాలయం, పాఠశాల మరియు సమాజ మందిరం.";
          break;
        case t("Contact Officials"):
          responseText = language === 'en'
            ? "Village head: Mr. Rao (9876543210), Health worker: Mrs. Devi (9876543211), School principal: Mr. Kumar (9876543212)"
            : "గ్రామ ప్రధాని: శ్రీ రావు (9876543210), ఆరోగ్య కార్యకర్త: శ్రీమతి దేవి (9876543211), పాఠశాల ప్రధానోపాధ్యాయుడు: శ్రీ కుమార్ (9876543212)";
          break;
        default:
          responseText = t("Thanks for your message! Our team will get back to you soon.");
      }

      const botResponse = {
        id: messages.length + 2,
        text: responseText,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSendMessage();
  };

  return (
    <div className="page-container">
      <nav className="navbar navbar-expand-md navbar-dark" style={{ backgroundColor: '#5d8233' }}>
        <div className="container">
          <Link className="navbar-brand" to="/">
            <img 
              src="https://thumbs.dreamstime.com/z/dv-vd-abstract-outstanding-professional-business-awesome-artistic-branding-company-different-colors-illustration-logo-291485919.jpg" 
              alt="Logo" 
              className="navbar-logo" 
              style={{ height: '40px', marginRight: '10px' }}
            />
          </Link>

          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarCollapse">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/App">
                  <FaHome style={{ marginRight: '5px' }} />
                  {t("Home")}
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  <FaUser style={{ marginRight: '5px' }} />
                  {t("Login")}
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/information">
                  <FaInfoCircle style={{ marginRight: '5px' }} />
                  {t("Information")}
                </Link>
              </li>
              
              <li className="nav-item">
                <Link className="nav-link" to="/gallery">
                  <FaImages style={{ marginRight: '5px' }} />
                  {t("Gallery")}
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contact">
                  <FaEnvelope style={{ marginRight: '5px' }} />
                  {t("Contact Us")}
                </Link>
              </li>
            </ul>
            
            <div className="d-flex align-items-center">
             
              <div className="btn-group mr-2" role="group">
                <button
                  type="button"
                  className={`btn btn-sm ${language === 'en' ? 'btn-primary' : 'btn-outline-primary'}`}
                  onClick={() => setLanguage('en')}
                >
                  English
                </button>
                <button
                  type="button"
                  className={`btn btn-sm ${language === 'te' ? 'btn-primary' : 'btn-outline-primary'}`}
                  onClick={() => setLanguage('te')}
                >
                  తెలుగు
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="chatbox-container">
        <div className="chatbox-header">
          <h2>{t("Chat with Us")}</h2>
        </div>

        <div className="chatbox-messages">
          {messages.map((message) => (
            <div 
              key={message.id} 
              className={`message ${message.sender === 'user' ? 'user-message' : 'bot-message'}`}
            >
              <div className="message-icon">
                {message.sender === 'user' ? <FaUser /> : <FaRobot />}
              </div>
              <div className="message-content">
                <p>{message.text}</p>
                <span className="message-time">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className="quick-actions">
          <h4>{t("Quick Actions")}</h4>
          <p className="quick-actions-subtitle">{t("Select an option to get quick information:")}</p>
          <div className="quick-action-buttons">
            {quickActions.map(action => (
              <button
                key={action.id}
                className="quick-action-btn"
                onClick={() => handleQuickAction(action.text)}
              >
                {action.text}
              </button>
            ))}
          </div>
        </div>

        <div className="chatbox-input">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={t("Type your message here...")}
          />
          <button onClick={handleSendMessage}>
            <FaPaperPlane /> {t("Send")}
          </button>
        </div>
      </div>

      <style jsx>{`
        .page-container {
          background-image: url('https://previews.123rf.com/images/stockseller/stockseller2007/stockseller200700701/152538142-an-indian-poor-village-farmer-cartoon-illustration-working-on-smart-phone-isolated-colorful-nature.jpg');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          background-attachment: fixed;
          min-height: 100vh;
          width: 100%;
          position: relative;
          overflow: hidden;
        }

        .navbar {
          background-color: #5d8233;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }

        .navbar-brand {
          display: flex;
          align-items: center;
        }

        .navbar-logo {
          width: 50px;
          height: auto;
          margin-right: 10px;
        }

        .nav-link {
          display: flex;
          align-items: center;
          color: white !important;
          font-weight: 500;
          margin: 0 10px;
          transition: all 0.3s ease;
          text-decoration: none;
        }

        .nav-link:hover {
          color: #18bc9c !important;
        }

        .chatbox-container {
          display: flex;
          flex-direction: column;
          height: 80vh;
          max-width: 800px;
          margin: 20px auto;
          border: 1px solid #ddd;
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0 4px 8px rgba(0,0,0,0.1);
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background-color: rgba(255, 255, 255, 0.85);
        }

        .chatbox-header {
          background-color: #5d8233;
          color: white;
          padding: 15px 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .chatbox-header h2 {
          margin: 0;
          font-size: 1.5rem;
        }

        .chatbox-messages {
          flex: 1;
          padding: 20px;
          overflow-y: auto;
          background-color: #f9f9f9;
        }

        .message {
          display: flex;
          margin-bottom: 15px;
          max-width: 80%;
        }

        .user-message {
          margin-left: auto;
          flex-direction: row-reverse;
        }

        .bot-message {
          margin-right: auto;
        }

        .message-icon {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background-color: #e8c07d;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 10px;
          flex-shrink: 0;
        }

        .message-content {
          padding: 10px 15px;
          border-radius: 18px;
          position: relative;
        }

        .user-message .message-content {
          background-color: #5d8233;
          color: white;
          border-top-right-radius: 0;
        }

        .bot-message .message-content {
          background-color: white;
          color: #333;
          border-top-left-radius: 0;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }

        .message-time {
          font-size: 0.7rem;
          opacity: 0.7;
          display: block;
          margin-top: 5px;
        }

        .user-message .message-time {
          text-align: right;
        }

        .quick-actions {
          padding: 15px 20px;
          background-color: #f0f0f0;
          border-top: 1px solid #ddd;
        }

        .quick-actions h4 {
          margin: 0 0 5px 0;
          font-size: 1rem;
          color: #555;
        }

        .quick-actions-subtitle {
          margin: 0 0 10px 0;
          font-size: 0.8rem;
          color: #777;
        }

        .quick-action-buttons {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .quick-action-btn {
          background-color: white;
          border: 1px solid #5d8233;
          color: #5d8233;
          padding: 5px 10px;
          border-radius: 15px;
          font-size: 0.8rem;
          cursor: pointer;
          transition: all 0.3s;
        }

        .quick-action-btn:hover {
          background-color: #5d8233;
          color: white;
        }

        .chatbox-input {
          display: flex;
          padding: 15px;
          background-color: white;
          border-top: 1px solid #ddd;
        }

        .chatbox-input input {
          flex: 1;
          padding: 10px 15px;
          border: 1px solid #ddd;
          border-radius: 20px;
          outline: none;
          font-size: 1rem;
        }

        .chatbox-input button {
          background-color: #5d8233;
          color: white;
          border: none;
          border-radius: 20px;
          padding: 0 20px;
          margin-left: 10px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 5px;
          transition: background 0.3s;
        }

        .chatbox-input button:hover {
          background-color: #4a6b28;
        }

        @media (max-width: 768px) {
          .chatbox-container {
            height: 90vh;
            margin: 10px;
          }
          
          .message {
            max-width: 90%;
          }
        }
      `}</style>
    </div>
  );
};

export default Chatbox;
