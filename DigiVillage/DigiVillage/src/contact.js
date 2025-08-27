import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { FaHome, FaUser, FaInfoCircle, FaComments, FaImages, FaSignOutAlt } from 'react-icons/fa';

const About = () => {
  const [language, setLanguage] = useState('en');

  const creators = [
    {
      name: "Jhansi Palli",
      role: "website Developer",
      email: "jhansipalli2005@gmail.com",
      phone: "6281842282"
    },
    {
      name: "Harshitha Reddy",
      role: "WebsiteDeveloper",
      email: "saiharshitha2005@gmail.com",
      phone: "9618555675"
    },
    {
      name: "Sangeetha Murra",
      role: "Website Developer",
      email: "sangeethamurra2709@gmail.com",
      phone: "9014624479"
    },
    {
      name: "Joseph",
      role: "Website Developer",
      email: "mlourdujoseph7@gmail.com",
      phone: "9063712401"
    }
  ];

  // Translation dictionary
  const translations = {
    en: {
      "About Us": "About Us",
      "Welcome to our website! We are dedicated to providing high-quality services and smooth experience to our Website users. Our mission is to create value and make villages digitally step a head in this digitalized world..":
        "Welcome to our website! We are dedicated to providing high-quality services and smooth experience to our Website users. Our mission is to create value and make villages digitally step a head in this digitalized world..",
      "Our team consists of enthusiastic students passionate about learning new things and delivering exceptional results. We strive to exceed expectations and build lasting relationships with our website users.":
        "Our team consists of enthusiastic students passionate about learning new things and delivering exceptional results. We strive to exceed expectations and build lasting relationships with our website users.",
      "Meet Our Creators": "Meet Our Creators",
      "digitalVillage": "Digital Village",
      "Home": "Home",
      "Login": "Login",
      "Information": "Information",
      "Community Chat": "Community Chat",
      "Gallery": "Gallery",
      "Contact Us": "Contact Us",
      "Exit": "Exit"
    },
    te: {
      "About Us": "మా గురించి",
      "Welcome to our website! We are dedicated to providing high-quality services and smooth experience to our Website users. Our mission is to create value and make villages digitally step a head in this digitalized world..":
        "మా వెబ్‌సైట్‌కు స్వాగతం! మేము అధిక-నాణ్యత సేవలు మరియు మా వెబ్‌సైట్ వినియోగదారులకు సున్నితమైన అనుభవాన్ని అందించడానికి అంకితం చేయబడ్డాము. ఈ డిజిటలైజ్డ్ ప్రపంచంలో గ్రామాలను డిజిటల్‌గా ముందుకు తీసుకురావడమే మా లక్ష్యం.",
      "Our team consists of enthusiastic students passionate about learning new things and delivering exceptional results. We strive to exceed expectations and build lasting relationships with our website users.":
        "మా బృందం కొత్త విషయాలు నేర్చుకోవడం మరియు అనూహ్య ఫలితాలను అందించడం పట్ల ఆసక్తి కలిగిన ఉత్సాహభరితమైన విద్యార్థులను కలిగి ఉంది. మేము ఆశించిన దానికంటే మించి, మా వెబ్‌సైట్ వినియోగదారులతో శాశ్వత సంబంధాలను నిర్మించడానికి ప్రయత్నిస్తాము.",
      "Meet Our Creators": "మా సృష్టికర్తలను కలవండి",
      "digitalVillage": "డిజిటల్ గ్రామం",
      "Home": "హోమ్",
      "Login": "లాగిన్",
      "Information": "సమాచారం",
      "Community Chat": "కమ్యూనిటీ చాట్",
      "Gallery": "గ్యాలరీ",
      "Contact Us": "సంప్రదించండి",
      "Exit": "బయటకు వెళ్ళండి"
    }
  };

  const t = (text) => translations[language][text] || text;


  return (
    <div className="page-container">
      <nav className="navbar">
        <div className="navbar-container">
          <Link className="navbar-brand" to="/">
            <img
              src="https://thumbs.dreamstime.com/z/dv-vd-abstract-outstanding-professional-business-awesome-artistic-branding-company-different-colors-illustration-logo-291485919.jpg"
              alt="Logo"
              className="navbar-logo"
            />

          </Link>

          <button className="navbar-toggler" type="button">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="navbar-collapse">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  <FaHome className="nav-icon" />
                  {t("Home")}
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  <FaUser className="nav-icon" />
                  {t("Login")}
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/information">
                  <FaInfoCircle className="nav-icon" />
                  {t("Information")}
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/chatbox">
                  <FaComments className="nav-icon" />
                  {t("Community Chat")}
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/gallery">
                  <FaImages className="nav-icon" />
                  {t("Gallery")}
                </Link>
              </li>

            </ul>

            <div className="navbar-actions">
              <div className="language-switcher">
                <button
                  className={`btn btn-sm ${language === 'en' ? 'btn-primary' : 'btn-outline-primary'}`}
                  onClick={() => setLanguage('en')}
                >
                  English
                </button>
                <button
                  className={`btn btn-sm ${language === 'te' ? 'btn-primary' : 'btn-outline-primary'}`}
                  onClick={() => setLanguage('te')}
                >
                  తెలుగు
                </button>
              </div>
              {/* Removed the onClick handler from the button */}
              <Link className="logout-btn" to="/end" >
                <FaSignOutAlt className="logout-icon" />
                {t("Exit")}
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundColor: "#f4f4f4",
        padding: "20px",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed"
      }}>
        <div style={{
          background: "rgba(255, 255, 255, 0.9)",
          padding: "30px",
          borderRadius: "10px",
          boxShadow: "0 0 20px rgba(0, 0, 0, 0.2)",
          maxWidth: "1000px",
          textAlign: "center",
          margin: "20px"
        }}>
          <h2>{t("About Us")}</h2>
          <p>
            {t("Welcome to our website! We are dedicated to providing high-quality services and smooth experience to our Website users. Our mission is to create value and make villages digitally step a head in this digitalized world..")}
          </p>
          <p>
            {t("Our team consists of enthusiastic students passionate about learning new things and delivering exceptional results. We strive to exceed expectations and build lasting relationships with our website users.")}
          </p>
          <h3>{t("Meet Our Creators")}</h3>
          <div style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "20px",
            marginTop: "20px"
          }}>
            {creators.map((creator, index) => (
              <div key={index} style={{
                textAlign: "center",
                background: "white",
                padding: "20px",
                borderRadius: "8px",
                boxShadow: "0 0 10px rgba(0,0,0,0.1)",
                flex: "1 1 200px",
                minWidth: "200px"
              }}>
                <h4>{creator.name}</h4>
                <p>{creator.role}</p>
                <p>Email: <a href={`mailto:${creator.email}`}>{creator.email}</a></p>
                <p>Phone: <a href={`tel:${creator.phone}`}>{creator.phone}</a></p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .page-container {
          min-height: 100vh;
          width: 100%;
          position: relative;
          overflow: hidden;
        }

        .navbar {
          background-color: #5d8233;
          padding: 0.5rem 1rem;
        }

        .navbar-container {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: space-between;
          max-width: 1200px;
          margin: 0 auto;
        }

        .navbar-brand {
          display: flex;
          align-items: center;
          color: white;
          text-decoration: none;
          font-weight: bold;
          font-size: 1.25rem;
        }

        .navbar-logo {
          height: 40px;
          margin-right: 10px;
        }

        .brand-text {
          color: white;
        }

        .navbar-toggler {
          padding: 0.25rem 0.75rem;
          font-size: 1.25rem;
          line-height: 1;
          background-color: transparent;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 0.25rem;
          color: rgba(255, 255, 255, 0.5);
        }

        .navbar-collapse {
          display: flex;
          flex-basis: 100%;
          flex-grow: 1;
          align-items: center;
        }

        .navbar-nav {
          display: flex;
          flex-direction: column;
          padding-left: 0;
          margin-bottom: 0;
          list-style: none;
          flex: 1;
        }

        .nav-item {
          margin: 0 0.5rem;
        }

        .nav-link {
          display: flex;
          align-items: center;
          color: rgba(255, 255, 255, 0.8);
          text-decoration: none;
          padding: 0.5rem 0;
        }

        .nav-link:hover {
          color: white;
        }

        .nav-icon {
          margin-right: 0.5rem;
        }

        .navbar-actions {
          display: flex;
          align-items: center;
        }

        .language-switcher {
          display: flex;
          margin-right: 1rem;
          padding: 0.25rem 0.5rem;
        }

        .language-btn {
          padding: 0.25rem 0.5rem;
          margin: 0 0.25rem;
          background: rgba(255, 255, 255, 0.1);
          border: none;
          color: white;
          border-radius: 4px;
          cursor: pointer;
        }

        .language-btn.active {
          background: white;
          color: #5d8233;
        }

        .logout-btn {
          display: flex;
          align-items: center;
          padding: 0.375rem 0.75rem;
          background-color: #dc3545;
          color: white;
          border-radius: 4px;
          text-decoration: none;
        }

        .logout-icon {
          margin-right: 0.5rem;
        }

        @media (min-width: 768px) {
          .navbar-nav {
            flex-direction: row;
          }

          .navbar-collapse {
            display: flex !important;
            flex-basis: auto;
          }

          .navbar-toggler {
            display: none;
          }
        }

        @media (max-width: 600px) {
          .navbar-container {
            flex-direction: column;
            align-items: flex-start;
          }

          .navbar-collapse {
            width: 100%;
          }

          .navbar-actions {
            margin-top: 1rem;
            width: 100%;
            justify-content: space-between;
          }
        }
      `}</style>
    </div>
  );
};

export default About;