import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {FaInfoCircle, FaComments, FaImages, FaEnvelope, FaSignOutAlt, FaUser } from "react-icons/fa";

const VillageInfoPortal = () => {
  const [eventDate, setEventDate] = useState("");
  const [eventInfo, setEventInfo] = useState("");
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    document.body.style.background = "linear-gradient(135deg, #74ebd5, #acb6e5)";
    document.body.style.padding = "0px";
    return () => {
      document.body.style = "";
    };
  }, []);

  const events = {
    "01-01": language === 'en' ? "New Year Celebration" : "నూతన సంవత్సర వేడుక",
    "02-14": language === 'en' ? "Farmer Awareness Program" : "రైతు అవగాహన కార్యక్రమం",
    "03-08": language === 'en' ? "International Women's Day" : "అంతర్జాతీయ మహిళా దినోత్సవం",
    "03-17": language === 'en' ? "Earth Day Plantation Drive" : "భూమి దినోత్సవం నాటే ప్రచారం",
    "05-01": language === 'en' ? "Labor Day Celebration" : "శ్రామిక దినోత్సవం",
    "06-21": language === 'en' ? "Yoga Camp" : "యోగా శిబిరం",
    "07-04": language === 'en' ? "Health Checkup Camp" : "ఆరోగ్య పరీక్షా శిబిరం",
    "08-15": language === 'en' ? "Independence Day Celebration" : "స్వాతంత్ర్య దినోత్సవం",
    "09-05": language === 'en' ? "Teacher's Day Event" : "గురువుల దినోత్సవం",
    "10-02": language === 'en' ? "Gandhi Jayanti Celebration" : "గాంధీ జయంతి వేడుక",
    "11-14": language === 'en' ? "Children's Day Function" : "బాలల దినోత్సవం",
    "12-25": language === 'en' ? "Christmas Celebration" : "క్రిస్మస్ వేడుక",
    "04-19": language === 'en' ? "giving pension at sachivalayam":"సచివాలయంలో పెన్షన్ పంపించి చేస్తున్నారు",
  };

  const showEvent = () => {
    if (!eventDate) {
      alert(language === 'en' ? "Please select a date!" : "దయచేసి తేదీని ఎంచుకోండి!");
      return;
    }
    const selectedDate = eventDate.slice(5);
    setEventInfo(events[selectedDate] || (language === 'en' ? "No event on this date." : "ఈ తేదీన ఈవెంట్ లేదు."));
  };

  const VillageHistory = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    const fullTextEn = `Kottam is a small Village/hamlet in Srungavarapukota Mandal in Vizianagaram 
    District of Andhra Pradesh State, India. It comes under Kothakota Panchayath. It belongs to 
    Andhra region . It is located 25 KM towards west from District head quarters Vizianagaram. 
    6 KM from Srungavarapukota. 592 KM from State capital Hyderabad.This village was established 
    originally settled by farmers and craftsmen, the village grew around the central marketplace 
    that still stands today. The historic St. Mary's Church, built in 1792, is one of the finest 
    examples of colonial architecture in the region. During the 19th century, the village became 
    an important stop on the trade route between the mountains and the coast. Many of the original 
    stone houses have been preserved and now serve as museums and cultural centers. The annual 
    Harvest Festival, dating back to 1823, attracts visitors from all over the country.`;
    
    const fullTextTe = `కొట్టాం ఆంధ్రప్రదేశ్ రాష్ట్రం, విజయనగరం జిల్లాలోని శ్రుంగవరపుకోట మండలంలో ఒక చిన్న గ్రామం. 
    ఇది కోతకోట పంచాయతీ పరిధిలోకి వస్తుంది. ఇది ఆంధ్ర ప్రాంతానికి చెందినది. ఇది జిల్లా 
    కేంద్రమైన విజయనగరం నుండి పడమర వైపు 25 కి.మీ దూరంలో ఉంది. శ్రుంగవరపుకోట నుండి 6 కి.మీ. 
    రాష్ట్ర రాజధాని హైదరాబద్ నుండి 592 కి.మీ. ఈ గ్రామం మొదట్లో రైతులు మరియు హస్తకళాకారులచే 
    స్థాపించబడింది, గ్రామం కేంద్ర మార్కెట్ చుట్టూ అభివృద్ధి చెందింది. 1792లో నిర్మించిన సెయింట్ మేరీస్ 
    చర్చి ఈ ప్రాంతంలోని వలసవాద వాస్తుశిల్పానికి గొప్ప ఉదాహరణ. 19వ శతాబ్దంలో, ఈ గ్రామం పర్వతాలు మరియు 
    తీరం మధ్య వాణిజ్య మార్గంలో ఒక ముఖ్యమైన స్టాప్గా మారింది. అసలు రాతి ఇళ్లలో చాలావరకు సంరక్షించబడ్డాయి 
    మరియు ఇప్పుడు మ్యూజియంలు మరియు సాంస్కృతిక కేంద్రాలుగా పనిచేస్తున్నాయి. 1823 నాటి వార్షిక 
    పంట పండుగ దేశం నలుమూలల నుండి సందర్శకులను ఆకర్షిస్తుంది.`;
    
    const truncatedTextEn = fullTextEn.slice(0, 300) + '...';
    const truncatedTextTe = fullTextTe.slice(0, 300) + '...';

    return (
      <div style={styles.infoBox}>
        <h3>📜 {language === 'en' ? "Village History" : "గ్రామ చరిత్ర"}</h3>
        <pre>{isExpanded ? (language === 'en' ? fullTextEn : fullTextTe) : (language === 'en' ? truncatedTextEn : truncatedTextTe)}</pre>
        <button 
          style={styles.readMoreBtn}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? (language === 'en' ? 'Read Less' : 'తక్కువ చదవండి') : (language === 'en' ? 'Read More' : 'మరింత చదవండి')}
        </button>
      </div>
    );
  };

  const styles = {
    container: {
      display: "flex",
      width: "95%",
      maxWidth: "1200px",
      gap: "20px",
      margin: "0 auto",
      padding: "20px",
    },
    leftPanel: {
      flex: 1,
      background: "white",
      padding: "20px",
      borderRadius: "10px",
      boxShadow: "0 5px 15px rgba(0, 0, 0, 0.2)",
      textAlign: "center",
      fontFamily: "'Poppins', sans-serif",
    },
    rightPanel: {
      width: "500px",
      background: "white",
      padding: "20px",
      borderRadius: "10px",
      boxShadow: "0 5px 15px rgba(0, 0, 0, 0.2)",
      display: "flex",
      flexDirection: "column",
      gap: "20px"
    },
    button: {
      width: "100%",
      padding: "12px",
      background: "#007BFF",
      color: "white",
      fontSize: "16px",
      fontWeight: "600",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      transition: "0.3s",
      marginTop: "10px",
    },
    buttonHover: {
      background: "#0056b3",
    },
    infoBox: {
      background: "#f5f5f5",
      padding: "10px",
      borderRadius: "5px",
      marginTop: "15px",
    },
    input: {
      width: "100%",
      padding: "10px",
      fontSize: "16px",
      border: "1px solid #ccc",
      borderRadius: "5px",
      marginBottom: "15px",
    },
    iframe: {
      width: "100%",
      height: "250px",
      borderRadius: "10px",
      border: "none"
    },
    mapContainer: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      gap: "15px"
    },
    readMoreBtn: {
      color: "#0066cc",
      background: "none",
      border: "none",
      cursor: "pointer",
      padding: "5px 0",
      fontWeight: "bold"
    },
    navbar: {
      backgroundColor: "#5d8233",
      padding: "0.5rem 1rem",
      marginBottom: "20px"
    },
    navbarContainer: {
      display: "flex",
      flexWrap: "wrap",
      alignItems: "center",
      justifyContent: "space-between",
      maxWidth: "1200px",
      margin: "0 auto",
    },
    navbarBrand: {
      display: "flex",
      alignItems: "center",
      color: "white",
      textDecoration: "none",
      fontWeight: "bold",
      fontSize: "1.25rem",
    },
    navbarLogo: {
      height: "40px",
      marginRight: "10px",
    },
    brandText: {
      color: "white",
    },
    navbarNav: {
      display: "flex",
      listStyle: "none",
      padding: 0,
      margin: 0,
    },
    navItem: {
      margin: "0 0.5rem",
    },
    navLink: {
      display: "flex",
      alignItems: "center",
      color: "rgba(255, 255, 255, 0.8)",
      textDecoration: "none",
      padding: "0.5rem 0",
    },
    navIcon: {
      marginRight: "0.5rem",
    },
    navbarActions: {
      display: "flex",
      alignItems: "center",
    },
    languageSwitcher: {
      display: "flex",
      marginRight: "1rem",
    },
    languageBtn: {
      padding: "0.25rem 0.5rem",
      margin: "0 0.25rem",
      background: "rgba(255, 255, 255, 0.1)",
      border: "none",
      color: "white",
      borderRadius: "4px",
      cursor: "pointer",
    },
    activeLanguageBtn: {
      background: "white",
      color: "#5d8233",
    },
    logoutBtn: {
      display: "flex",
      alignItems: "center",
      padding: "0.375rem 0.75rem",
      backgroundColor: "#dc3545",
      color: "white",
      borderRadius: "4px",
      textDecoration: "none",
    },
    logoutIcon: {
      marginRight: "0.5rem",
    }
  };

  return (
    <div>
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
                  <FaUser style={{ marginRight: '5px' }} />
                  {language === 'en' ? 'Home' : 'హోమ్'}
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  <FaUser style={{ marginRight: '5px' }} />
                  {language === 'en' ? 'Login' : 'లాగిన్'}
                </Link>
              </li>
              
              <li className="nav-item">
                <Link className="nav-link" to="/chatbox">
                  <FaComments style={{ marginRight: '5px' }} />
                  {language === 'en' ? 'Community Chat' : 'కమ్యూనిటీ చాట్'}
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
                  {language === 'en' ? 'Contact Us' : 'సంప్రదించండి'}
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

      <div style={styles.container}>
        {/* Left Panel - Content */}
        <div style={styles.leftPanel}>
          <h2>📍 {language === 'en' ? "Village Information Portal" : "గ్రామ సమాచార పోర్టల్"}</h2>

          <label htmlFor="eventDate">{language === 'en' ? "Select a Date:" : "తేదీని ఎంచుకోండి:"}</label>
          <input
            type="date"
            id="eventDate"
            style={styles.input}
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
          />
          <button
            style={styles.button}
            onMouseOver={(e) => (e.target.style.background = styles.buttonHover.background)}
            onMouseOut={(e) => (e.target.style.background = styles.button.background)}
            onClick={showEvent}
          >
            {language === 'en' ? "Check Events" : "ఈవెంట్లను తనిఖీ చేయండి"}
          </button>

          {eventInfo && <div style={styles.infoBox}><strong>{language === 'en' ? "Event:" : "ఈవెంట్:"}</strong> {eventInfo}</div>}

          <div style={styles.infoBox}>
            <h3>🎓 {language === 'en' ? "Education & Schemes" : "విద్య మరియు పథకాలు"}</h3>
            <p>{language === 'en' ? "Literacy Rate:" : "అక్షరాస్యత రేటు:"} <strong>78%</strong></p>
            <p>👨{language === 'en' ? "Male:" : "పురుషులు:"} <strong>67%</strong></p>
            <p>👩{language === 'en' ? "Female:" : "స్త్రీలు:"} <strong>33%</strong></p>
            <p><strong>{language === 'en' ? "Government Schemes:" : "ప్రభుత్వ పథకాలు:"}</strong> {language === 'en' ? "PM Awas Yojana, MGNREGA, Skill India Program" : "పి.ఎం. ఆవాస్ యోజన, మన్రేగా, స్కిల్ ఇండియా ప్రోగ్రామ్"}</p>
          </div>

          <div style={styles.infoBox}>
            <h3>🌾 {language === 'en' ? "Agriculture Information" : "వ్యవసాయ సమాచారం"}</h3>
            <p><strong>{language === 'en' ? "Crops:" : "పంటలు:"}</strong> {language === 'en' ? "Wheat, Rice, Maize" : "గోధుమ, బియ్యం, మొక్కజొన్న"}</p>
            <p><strong>{language === 'en' ? "Soil Type:" : "నేల రకం:"}</strong> {language === 'en' ? "Black Soil" : "నల్ల నేల"}</p>
            <p><strong>{language === 'en' ? "Livestock:" : "పశువులు:"}</strong> {language === 'en' ? "Cows, Buffaloes, Goats" : "ఆవులు, ఎద్దులు, మేకలు"}</p>
          </div>

          <VillageHistory />
        </div>

        {/* Right Panel - Maps */}
        <div style={styles.rightPanel}>
          <div style={styles.mapContainer}>
            <h3>🏛️ {language === 'en' ? "Government Offices" : "ప్రభుత్వ కార్యాలయాలు"}</h3>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d485390.83854383096!2d82.56228629045461!3d18.112437049866212!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a3befae0c0a20a5%3A0x1c68abf418d53793!2sSachivalayam!5e0!3m2!1sen!2sin!4v1740998141967!5m2!1sen!2sin"
              style={styles.iframe}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={language === 'en' ? "Government Offices" : "ప్రభుత్వ కార్యాలయాలు"}
            ></iframe>
          </div>

          <div style={styles.mapContainer}>
            <h3>🏥 {language === 'en' ? "Government Hospital" : "ప్రభుత్వ ఆసుపత్రి"}</h3>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d485394.9677507097!2d82.56229661242122!3d18.11094684207658!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a3bdb315d459507%3A0xa5a5aa0822a1cf14!2sGoverment%20Hospital%2C%20Srungavarapukota!5e0!3m2!1sen!2sin!4v1740998071059!5m2!1sen!2sin"
              style={styles.iframe}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={language === 'en' ? "Government Hospital" : "ప్రభుత్వ ఆసుపత్రి"}
            ></iframe>
          </div>

          <div style={styles.mapContainer}>
            <h3>🏫 {language === 'en' ? "Government School" : "ప్రభుత్వ పాఠశాల"}</h3>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d485397.03233680484!2d82.5623017734375!3d18.110201699999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a3bdb341bfebeb9%3A0xf9ba53e55ee48ae7!2sGovt%20High%20School!5e0!3m2!1sen!2sin!4v1740998017531!5m2!1sen!2sin"
              style={styles.iframe}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={language === 'en' ? "Government School" : "ప్రభుత్వ పాఠశాల"}
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VillageInfoPortal;