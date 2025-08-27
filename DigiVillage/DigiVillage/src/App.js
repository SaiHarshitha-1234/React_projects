
import React, { useRef, useEffect, useState } from "react";
import {  FaUser, FaInfoCircle, FaComments, FaImages, FaEnvelope, FaSignOutAlt } from 'react-icons/fa';
import { Chart, registerables } from "chart.js";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route, Navigate, Link } from "react-router-dom";
import Chatbox from "./chatbox";
import Login from "./login";
import About from "./contact";
import VillageInfoPortal from "./information";
import Gallery from "./gallery";
import End from "./end";

Chart.register(...registerables);

// ========== Language Context ==========
const LanguageContext = React.createContext();

const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');
  const [translations, setTranslations] = useState({});
  const [isTranslating, setIsTranslating] = useState(false);

  // Common translations
  const commonTranslations = {
    en: {
      welcome: "🌿 Welcome To Our Beautiful Village Community 🌿",
      villageLocation: "Village Location",
      populationDistribution: "Population Distribution",
      villageUpdates: "📢 Village Updates & News 📢",
      addUpdate: "➕ Add Update",
      villageInfo: "Village Info",
      photoGallery: "Photo Gallery",
      communityChat: "Community Chat",
      contactUs: "Contact Us",
      about: "About Digital Village",
      quickLinks: "Quick Links",
      contact: "Contact",
      digitalVillage: "Digital Village",
      login: "Login",
      information: "Information",
      gallery: "Gallery",
      EmpoweringRuralIndiaDigitally : "🚀 Empowering Rural India Digitally 🌍"
    },
    te: {
      welcome: "🌿 మా అందమైన గ్రామ సమాజానికి స్వాగతం 🌿",
      villageLocation: "గ్రామ స్థానం",
      populationDistribution: "జనాభా పంపిణీ",
      villageUpdates: "📢 గ్రామ నవీకరణలు & వార్తలు 📢",
      addUpdate: "➕ నవీకరణను జోడించండి",
      villageInfo: "గ్రామ సమాచారం",
      photoGallery: "ఫోటో గ్యాలరీ",
      communityChat: "కమ్యూనిటీ చాట్",
      contactUs: "మమ్మల్ని సంప్రదించండి",
      about: "డిజిటల్ గ్రామం గురించి",
      quickLinks: "ద్రుత లింకులు",
      contact: "సంప్రదించండి",
      digitalVillage: "డిజిటల్ గ్రామం",
      login: "లాగిన్",
      information: "సమాచారం",
      gallery: "గ్యాలరీ",
     EmpoweringRuralIndiaDigitally : "🚀 డిజిటల్ గా గ్రామీణ భారతదేశాన్ని శక్తివంతం చేస్తోంది 🌍"
    }
  };

  const translatePageContent = async (content, targetLang) => {
    setIsTranslating(true);
    try {
      setTranslations(commonTranslations[targetLang] || {});
      setLanguage(targetLang);
    } catch (error) {
      console.error("Translation error:", error);
    } finally {
      setIsTranslating(false);
    }
  };

  const t = (key) => {
    return translations[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, t, translatePageContent, isTranslating }}>
      {children}
    </LanguageContext.Provider>
  );
};

const useLanguage = () => {
  return React.useContext(LanguageContext);
};
// ========== END OF Language Context ==========

const images = [
  "https://images.unsplash.com/photo-1623211270083-5743da6c67ec?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aW5kaWFuJTIwdmlsbGFnZXxlbnwwfHwwfHx8MA%3D%3D",
  "https://www.travellersofindia.com/wp-content/uploads/2020/09/Impressions-of-Villages-A-Glimpse-Into-Rural-India_TRavellersofIndia.jpg",
  "https://sc0.blr1.cdn.digitaloceanspaces.com/article/194070-dcrqudbuml-1694671879.jpg",
  "https://i.pinimg.com/736x/53/87/7f/53877f71c0d538c569ddb5daed618396.jpg",
  "https://media.istockphoto.com/id/468861698/photo/life-in-rural-india.jpg?s=612x612&w=0&k=20&c=tL_-l5aiDO8Liwke7xoRP_tUGUaPlKtzajAJJi4Dxww=",
];

const Carousel = () => {
  const [index, setIndex] = useState(0);
  const { t } = useLanguage();

  const showSlide = (i) => {
    if (i >= images.length) setIndex(0);
    else if (i < 0) setIndex(images.length - 1);
    else setIndex(i);
  };

  const nextSlide = () => showSlide(index + 1);
  const prevSlide = () => showSlide(index - 1);

  useEffect(() => {
    const interval = setInterval(nextSlide, 3000);
    return () => clearInterval(interval);
  }, [index]);

  return (
    <div className="carousel-container">
      <div className="carousel-slides" style={{ transform: `translateX(${-index * 100}%)` }}>
        {images.map((src, idx) => (
          <div key={idx} className="carousel-slide">
            <img src={src} alt={`Slide ${idx + 1}`} className="carousel-image" />
            <div className="carousel-caption">
              {t('EmpoweringRuralIndiaDigitally')}
            </div>
          </div>
        ))}
      </div>
      <button className="carousel-button prev" onClick={prevSlide}>
        ❮
      </button>
      <button className="carousel-button next" onClick={nextSlide}>
        ❯
      </button>
    </div>
  );
};

const DigiVillage = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const [updates, setUpdates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { t, language, translatePageContent, isTranslating } = useLanguage();

  useEffect(() => {
    if (chartRef.current) {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
      chartInstance.current = new Chart(chartRef.current, {
        type: "pie",
        data: {
          labels: language === 'te' ? ["పురుషులు", "స్త్రీలు", "పిల్లలు", "వృద్ధులు"] : ["Male", "Female", "Children", "Elderly"],
          datasets: [{
            data: [30, 35, 28, 7],
            backgroundColor: ["#36A2EB", "#FF6384", "#FFCE56", "#9CCC65"],
          }],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { position: "right" },
            tooltip: {
              callbacks: {
                label: (tooltipItem) => `${tooltipItem.label}: ${tooltipItem.raw}%`,
              },
            },
          },
        },
      });
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [language]);

  useEffect(() => {
    const fetchUpdates = async () => {
      try {
        const response = await fetch('http://localhost/api.php');
        const data = await response.json();
        setUpdates(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching updates:", error);
        setUpdates([
          language === 'te' ? 
            "✅ రైతుల మార్కెట్ ఈ ఆదివారం ఉదయం 10 గంటలకు జరుగుతుంది." : 
            "✅ Farmers Market will be held this Sunday at 10 AM.",
          language === 'te' ? 
            "⚠️ సోమవారం మధ్యాహ్నం 2 నుండి 4 గంటల వరకు విద్యుత్ నిర్వహణ షెడ్యూల్ చేయబడింది." : 
            "⚠️ Electricity maintenance scheduled for Monday, 2 PM - 4 PM.",
          language === 'te' ? 
            "🎉 ఏప్రిల్ 5న గ్రామోత్సవం! వేడుకలకు మాతో చేరండి!" : 
            "🎉 Village festival on April 5th! Join us for celebrations!",
        ]);
        setIsLoading(false);
      }
    };

    fetchUpdates();
  }, [language]);

  const addUpdate = async () => {
    const newUpdate = prompt(language === 'te' ? "కొత్త నవీకరణను నమోదు చేయండి:" : "Enter a new update:");
    if (newUpdate) {
      try {
        setIsLoading(true);
        const response = await fetch('http://localhost/api.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            message: language === 'te' ? 
              `🔔 ${newUpdate}` : 
              `🔔 ${newUpdate}` 
          }),
        });

        const updatedList = await response.json();
        setUpdates(updatedList);
      } catch (error) {
        console.error("Error adding update:", error);
        alert(language === 'te' ? "నవీకరణను జోడించడంలో విఫలమైంది. దయచేసి మళ్లీ ప్రయత్నించండి." : "Failed to add update. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleLanguageChange = (lang) => {
    translatePageContent(document.body.innerText, lang);
  };


  return (
    <div className="digivillage-container">
      

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
                      <Link className="nav-link" to="/login">
                        <FaUser style={{ marginRight: '5px' }} />
                        {language === 'en' ? 'Login' : 'లాగిన్'}
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/information">
                        <FaInfoCircle style={{ marginRight: '5px' }} />
                        {language === 'en' ? 'Information' : 'సమాచారం'}
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/chatbox">
                        <FaComments style={{ marginRight: '5px' }} />{language === 'en' ? 'Community Chat' : 'కమ్యూనిటీ చాట్'}
                        
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/gallery">
                        <FaImages style={{ marginRight: '5px' }} />
                        {language === 'en' ? 'Gallery' : 'గ్యాలరీ'}
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/contact">
                        <FaEnvelope style={{ marginRight: '5px' }} />
                        {language === 'en' ? 'Contact Us' : ' సంప్రదించండి'}
                      </Link>
                    </li>
                  </ul>
                  
                  <div className="d-flex align-items-center"> 
                  
                  
                    <div className="btn-group mr-2" role="group"> {/* Added margin for spacing */}
                <button
                  type="button"
                  className={`btn btn-sm ${language === 'en' ? 'btn-primary' : 'btn-outline-primary'}`}
                  onClick={() => handleLanguageChange('en')}
                  disabled={isTranslating}
                >
                  English
                </button>
                <button
                  type="button"
                  className={`btn btn-sm ${language === 'te' ? 'btn-primary' : 'btn-outline-primary'}`}
                  onClick={() => handleLanguageChange('te')}
                  disabled={isTranslating}
                >
                  తెలుగు
                </button>
              </div>
                  </div>
                  

                  

                </div>
              </div>
            </nav>
            
      <Carousel />

      <div className="container main-content">
        <div className="row">
          <div className="col-lg-8 col-md-12 mb-4">
            <div className="card map-card">
              <div className="card-header">
                <h3>{t('villageLocation')}</h3>
              </div>
              <div className="card-body p-0">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7585.05204706546!2d83.22189163439201!3d18.093483979107845!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a3bdd6aec28dfa5%3A0x2dbd8fbd63f71d43!2sKottam%2C%20Andhra%20Pradesh%20535148!5e0!3m2!1sen!2sin!4v1742624209857!5m2!1sen!2sin" allowFullScreen loading="lazy" className="map-iframe" title="Village Map"></iframe>
              </div>
            </div>
          </div>

          <div className="col-lg-4 col-md-12 mb-4">
            <div className="card chart-card">
              <div className="card-header">
                <h3>{t('populationDistribution')}</h3>
              </div>
              <div className="card-body">
                <canvas ref={chartRef} className="population-chart"></canvas>
              </div>
            </div>
          </div>
        </div>

        <div className="welcome-banner">
          <marquee>
            <h2>{t('welcome')}</h2>
          </marquee>
        </div>

        <div className="card updates-card">
          <div className="card-header">
            <h3>{t('villageUpdates')}</h3>
          </div>
          <div className="card-body">
            {isLoading ? (
              <div className="text-center py-3">
                <div className="spinner-border text-primary" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            ) : (
              <ul className="updates-list">
                {updates.map((update, idx) => (
                  <li key={idx} className="update-item">
                    {update}
                  </li>
                ))}
              </ul>
            )}
            <div className="text-center mt-3">
              <button onClick={addUpdate} className="btn btn-primary add-update-btn" disabled={isLoading}>
                {isLoading ? (language === 'te' ? 'జోడిస్తోంది...' : 'Adding...') : t('addUpdate')}
              </button>
            </div>
          </div>
        </div>

        <div className="quick-links">
          <h4 className="section-title">{t('quickLinks')}</h4>
          <div className="row">
            <div className="col-md-3 col-6 mb-3">
              <Link to="/information" className="quick-link-card">
                <div className="icon"><i className="fas fa-info-circle"></i></div>
                <div className="title">{t('villageInfo')}</div>
              </Link>
            </div>
            <div className="col-md-3 col-6 mb-3">
              <Link to="/gallery" className="quick-link-card">
                <div className="icon"><i className="fas fa-images"></i></div>
                <div className="title">{t('photoGallery')}</div>
              </Link>
            </div>
            <div className="col-md-3 col-6 mb-3">
              <Link to="/chatbox" className="quick-link-card">
                <div className="icon"><i className="fas fa-comments"></i></div>
                <div className="title">{t('communityChat')}</div>
              </Link>
            </div>
            <div className="col-md-3 col-6 mb-3">
              <Link to="/contact" className="quick-link-card">
                <div className="icon"><i className="fas fa-envelope"></i></div>
                <div className="title">{t('contactUs')}</div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <footer className="footer">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <h5>{t('about')}</h5>
              <p>{language === 'te' ? "సాంకేతికత మరియు డిజిటల్ పరిష్కారాల ద్వారా గ్రామీణ సంఘాలను శక్తివంతం చేస్తుంది." : "Empowering rural communities through technology and digital solutions."}</p>
            </div>
            <div className="col-md-4">
              <h5>{t('quickLinks')}</h5>
              <ul>
                <li><Link to="/information">{t('villageInfo')}</Link></li>
                <li><Link to="/gallery">{t('photoGallery')}</Link></li>
                <li><Link to="/chatbox">{t('communityChat')}</Link></li>
              </ul>
            </div>
            <div className="col-md-4">
              <h5>{t('contact')}</h5>
              <p><i className="fas fa-map-marker-alt"></i> {language === 'te' ? "కొట్టాం, ఆంధ్ర ప్రదేశ్ 535148" : "Kottam, Andhra Pradesh 535148"}</p>
              <p><i className="fas fa-phone"></i> +91 9876543210</p>
              <p><i className="fas fa-envelope"></i> info@digitalvillage.com</p>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© {new Date().getFullYear()} {t('digitalVillage')}. {language === 'te' ? "అన్ని హక్కులు ప్రత్యేకించబడ్డాయి." : "All rights reserved."}</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

const styles = `
.digivillage-container {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f8f9fa;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
 
}
.navbar {
  background-color: #2c3e50 !important;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  padding: 10px 0;
  paddingLeft: 10px;
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
.brand-text {
  font-size: 1.2rem; 
  font-weight: bold; 
  color: white;
}
.nav-link {
  display: flex; /* Make the link a flex container */
  align-items: center; /* Vertically align items (icon and text) */
  color: white !important;
  font-weight: 500;
  margin: 0 10px;
  transition: all 0.3s ease;
  text-decoration: none; /* Ensure text decoration is removed from the link */
}

.nav-icon {
  margin-right: 0.5rem; /* Add some spacing between the icon and text */
}
.nav-link:hover {
  color: #18bc9c !important;
}
.carousel-container {
  position: relative; 
  width: 100%; 
  overflow: hidden; 
  max-width: 100vw; 
  margin-bottom: 30px;
}
.carousel-slides {
  display: flex; 
  transition: transform 1s ease-in-out;
}
.carousel-slide {
  position: relative; 
  width: 100vw; 
  flex-shrink: 0;
}
.carousel-image {
  width: 100%; 
  height: 500px; 
  object-fit: cover;
}
.carousel-caption {
  position: absolute; 
  top: 50%; left: 50%; 
  transform: translate(-50%, -50%); 
  color: white; 
  font-size: 3rem; 
  font-weight: bold; 
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.7); 
  background-color: rgba(0, 0, 0, 0.5); 
  padding: 15px 10px; 
  border-radius: 10px; 
  text-align: center; 
  width: 80%; height:32%;
}
.carousel-button {
  position: absolute; 
  top: 50%; transform: translateY(-50%); 
  background-color: rgba(0, 0, 0, 0.5); 
  color: white; 
  border: none; 
  padding: 15px; 
  cursor: pointer; 
  border-radius: 50%; 
  z-index: 10; 
  font-size: 1.5rem; 
  width: 50px; height: 50px; 
  display: flex; 
  align-items: center; 
  justify-content: center; 
  transition: all 0.3s ease;
}
.carousel-button:hover {
  background-color: rgba(0, 0, 0, 0.8);
}
.carousel-button.prev {
  left: 0px;
}
.carousel-button.next {
  right: 20px;
}
.main-content {
  padding: 20px 15px; 
  flex: 1;
}
.card {
  border: none; 
  border-radius: 10px; 
  box-shadow: 0 4px 6px rgba(0,0,0,0.1); 
  margin-bottom: 20px; 
  overflow: hidden;
}
.card-header {
  background-color: #2c3e50; 
  color: white; 
  padding: 15px 20px; 
  border-bottom: none;
}
.card-header h3 {
  margin: 0; 
  font-size: 1.3rem;
}
.map-card {
  height: 100%;
}
.map-iframe {
  width: 100%; 
  height: 400px; 
  border: none;
}
.chart-card {
  height: 100%;
}
.population-chart {
  width: 100% !important; 
  height: 300px !important;
}
.welcome-banner {
  background: linear-gradient(to right, #27ae60, #2ecc71); 
  padding: 15px 0; 
  margin: 20px 0; 
  border-radius: 8px; 
  color: white; 
  text-align: center;
}
.welcome-banner h2 {
  margin: 0; 
  font-size: 1.5rem; 
  font-weight: bold;
}
.updates-card {
  margin-top: 30px;
}
.updates-list {
  list-style-type: none; 
  padding: 0;
}
.update-item {
  padding: 12px 15px; 
  border-bottom: 1px solid #eee; 
  font-size: 1rem; 
  transition: all 0.3s ease;
}
.update-item:last-child {
  border-bottom: none;
}
.update-item:hover {
  background-color: #f8f9fa; 
  padding-left: 20px;
}
.add-update-btn {
  padding: 8px 20px; 
  font-size: 0.9rem; 
  border-radius: 50px; 
  transition: all 0.3s ease;
}
.add-update-btn:hover {
  transform: translateY(-2px); 
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}
.quick-links {
  margin: 40px 0;
}
.section-title {
  color: #2c3e50; 
  font-weight: bold; 
  margin-bottom: 20px; 
  padding-bottom: 10px; 
  border-bottom: 2px solid #eee;
}
.quick-link-card {
  display: block; 
  background: white; 
  padding: 20px; 
  border-radius: 8px; 
  text-align: center; 
  color: #2c3e50; 
  text-decoration: none; 
  box-shadow: 0 2px 4px rgba(0,0,0,0.1); 
  transition: all 0.3s ease;
}
.quick-link-card:hover {
  transform: translateY(-5px); 
  box-shadow: 0 6px 12px rgba(0,0,0,0.1); 
  color: #18bc9c; 
  text-decoration: none;
}
.quick-link-card .icon {
  font-size: 2rem; 
  margin-bottom: 10px; 
  color: #18bc9c;
}
.quick-link-card .title {
  font-weight: 600;
}
.footer {
  background-color: #2c3e50; 
  color: white; 
  padding: 40px 0 20px; 
  margin-top: 50px;
}
.footer h5 {
  font-size: 1.2rem; 
  margin-bottom: 20px; 
  color: #18bc9c;
}
.footer ul {
  list-style: none; 
  padding: 0;
}
.footer ul li {
  margin-bottom: 10px;
}
.footer ul li a {
  color: #ecf0f1; 
  text-decoration: none; 
  transition: all 0.3s ease;
}
.footer ul li a:hover {
  color: #18bc9c; 
  padding-left: 5px;
}
.footer p {
  margin-bottom: 10px; 
  display: flex; 
  align-items: center;
}
.footer i {
  margin-right: 10px; 
  color: #18bc9c;
}
.footer-bottom {
  border-top: 1px solid #34495e; 
  padding-top: 20px; 
  margin-top: 20px; 
  text-align: center;
}
.language-switcher {
  position: fixed;
  top: 70px;
  right: 20px;
  z-index: 1000;
}
.language-switcher .btn-group {
  box-shadow: 0 2px 5px rgba(0,0,0,0.2);
}
@media (max-width: 992px) {
  .carousel-caption {
    font-size: 2rem; 
    padding: 10px 20px;
  }
  .language-switcher {
    top: 60px;
    right: 10px;
  }
}
@media (max-width: 768px) {
  .carousel-caption {
    font-size: 1.5rem; 
    width: 90%;
  } 
  .navbar-brand .brand-text {
    display: none;
  } 
  .footer .col-md-4 {
    margin-bottom: 30px;
  }
  .language-switcher {
    top: 10px;
    right: 10px;
  }
}
@media (max-width: 576px) {
  .carousel-caption {
    font-size: 1.2rem;
    padding: 8px 15px;
  } 
  .carousel-button {
    width: 40px; 
    height: 40px; 
    font-size: 1rem;
  } 
  .map-iframe {
    height: 300px;
  }
}`;

const styleElement = document.createElement('style');
styleElement.innerHTML = styles;
document.head.appendChild(styleElement);
function App() {
  return (
    <LanguageProvider>
      <Routes>
        <Route path="/" element={<Navigate to="/App" />} />
        <Route path="/App" element={<DigiVillage />} />
        <Route path="/chatbox" element={<Chatbox />} />
        <Route path="/contact" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/information" element={<VillageInfoPortal />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/end" element={<End/>} />
      </Routes>
    </LanguageProvider>
  );
}

export default App;