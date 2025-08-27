import React, { useState, useEffect } from 'react';
import { FaFacebook, FaInstagram, FaYoutube, FaTwitter, FaHome, FaUser, FaInfoCircle, FaComments, FaImages, FaEnvelope } from 'react-icons/fa';
import { Link } from "react-router-dom";

const VillageGallery = () => {
  // State for filter and testimonial slider
  const [activeFilter, setActiveFilter] = useState('all');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [language, setLanguage] = useState('en'); // 'en' for English, 'te' for Telugu

  // Translation dictionary
  const translations = {
    en: {
      "Discover Our Village": "Discover Our Village",
      "Step into the heart of our community through these captivating glimpses of village life, traditions, and natural beauty": "Step into the heart of our community through these captivating glimpses of village life, traditions, and natural beauty",
      "Preserving traditions • Celebrating community • Embracing nature's gifts": "Preserving traditions • Celebrating community • Embracing nature's gifts",
      "All": "All",
      "Landscapes": "Landscapes",
      "Culture": "Culture",
      "People": "People",
      "Festivals": "Festivals",
      "Voices From Our Village": "Voices From Our Village",
      "© 2023 Our Village Community. All rights reserved.": "© 2023 Our Village Community. All rights reserved.",
      "Preserving our heritage, celebrating our present, building our future.": "Preserving our heritage, celebrating our present, building our future.",
      "digitalVillage": "Digital Village",
      "Home": "Home",
      "Login": "Login",
      "Information": "Information",
      "Community Chat": "Community Chat",
      "Gallery": "Gallery",
      "Contact Us": "Contact Us",
      "Morning Mist Over the Fields": "Morning Mist Over the Fields",
      "The golden sunrise peeks through the morning mist covering our wheat fields": "The golden sunrise peeks through the morning mist covering our wheat fields",
      "The Life-Giving River": "The Life-Giving River",
      "Our village river has nurtured generations of farmers and wildlife": "Our village river has nurtured generations of farmers and wildlife",
      "Ancient Pottery Techniques": "Ancient Pottery Techniques",
      "Master artisan Rama continues his family's 200-year-old pottery tradition": "Master artisan Rama continues his family's 200-year-old pottery tradition",
      "Heritage Architecture": "Heritage Architecture",
      "Our traditional mud houses stay cool in summer and warm in winter": "Our traditional mud houses stay cool in summer and warm in winter",
      "Wisdom of the Elders": "Wisdom of the Elders",
      "Grandmother Meera shares stories with the village children": "Grandmother Meera shares stories with the village children",
      "Joy of Simple Pleasures": "Joy of Simple Pleasures",
      "Children playing in the village square after school": "Children playing in the village square after school",
      "Harvest Festival": "Harvest Festival",
      "Annual celebration giving thanks for the year's bounty": "Annual celebration giving thanks for the year's bounty",
      "Moonlight Dance": "Moonlight Dance",
      "The traditional dance performed during the full moon festival": "The traditional dance performed during the full moon festival",
      "Evening Serenity": "Evening Serenity",
      "The peaceful sunset over the village brings the day to a close": "The peaceful sunset over the village brings the day to a close",
      "Daily Harvest": "Daily Harvest",
      "Farmer Jatin collects fresh vegetables from his organic farm": "Farmer Jatin collects fresh vegetables from his organic farm",
      "Handloom Weaving": "Handloom Weaving",
      "The intricate art of handloom weaving passed down through generations": "The intricate art of handloom weaving passed down through generations",
      "Festival of Lights": "Festival of Lights",
      "The village illuminated during our most colorful celebration": "The village illuminated during our most colorful celebration",
      "I've traveled the world, but the warmth of our village community is something I've never found elsewhere. Every visit feels like coming home.": "I've traveled the world, but the warmth of our village community is something I've never found elsewhere. Every visit feels like coming home.",
      "Rajesh Mehta, Former Resident": "Rajesh Mehta, Former Resident",
      "The village festivals are magical! The colors, music, and shared joy create memories that last a lifetime.": "The village festivals are magical! The colors, music, and shared joy create memories that last a lifetime.",
      "Priya Sharma, Visitor": "Priya Sharma, Visitor",
      "Growing up in this village taught me the value of community. We look after each other like one big family.": "Growing up in this village taught me the value of community. We look after each other like one big family.",
      "Amit Patel, Local Teacher": "Amit Patel, Local Teacher"
    },
    te: {
      "Discover Our Village": "మా గ్రామాన్ని అన్వేషించండి",
      "Step into the heart of our community through these captivating glimpses of village life, traditions, and natural beauty": "గ్రామ జీవితం, సంప్రదాయాలు మరియు ప్రకృతి సౌందర్యం యొక్క మనోహరమైన అంశాల ద్వారా మా సమాజం యొక్క గుండెలోకి అడుగుపెట్టండి",
      "Preserving traditions • Celebrating community • Embracing nature's gifts": "సంప్రదాయాలను సంరక్షించడం • సమాజాన్ని జరుపుకోవడం • ప్రకృతి బహుమతాలను ఆలింగనం చేయడం",
      "All": "అన్ని",
      "Landscapes": "ప్రకృతి దృశ్యాలు",
      "Culture": "సంస్కృతి",
      "People": "ప్రజలు",
      "Festivals": "పండుగలు",
      "Voices From Our Village": "మా గ్రామం నుండి స్వరాలు",
      "© 2023 Our Village Community. All rights reserved.": "© 2023 మా గ్రామ సమాజం. అన్ని హక్కులు ప్రత్యేకించబడ్డాయి.",
      "Preserving our heritage, celebrating our present, building our future.": "మా వారసత్వాన్ని సంరక్షించడం, మా వర్తమానాన్ని జరుపుకోవడం, మా భవిష్యత్తును నిర్మించడం.",
      "digitalVillage": "డిజిటల్ గ్రామం",
      "Home": "హోమ్",
      "Login": "లాగిన్",
      "Information": "సమాచారం",
      "Community Chat": "కమ్యూనిటీ చాట్",
      "Gallery": "గ్యాలరీ",
      "Contact Us": "సంప్రదించండి",
      "Morning Mist Over the Fields": "వ్యవసాయ భూములపై ఉదయం పొగమంచు",
      "The golden sunrise peeks through the morning mist covering our wheat fields": "మా గోధుమ భూములను కప్పివేసిన ఉదయం పొగమంచు ద్వారా బంగారు సూర్యోదయం కనిపిస్తుంది",
      "The Life-Giving River": "జీవనది",
      "Our village river has nurtured generations of farmers and wildlife": "మా గ్రామం నది రైతులు మరియు వన్యజీవుల అనేక తరాలను పోషించింది",
      "Ancient Pottery Techniques": "పురాతన కుండల తయారీ పద్ధతులు",
      "Master artisan Rama continues his family's 200-year-old pottery tradition": "మాస్టర్ కళాకారుడు రామ తన కుటుంబం యొక్క 200 సంవత్సరాల పురాతన కుండల తయారీ సంప్రదాయాన్ని కొనసాగిస్తున్నాడు",
      "Heritage Architecture": "వారసత్వ నిర్మాణ శైలి",
      "Our traditional mud houses stay cool in summer and warm in winter": "మా సంప్రదాయ బురద ఇళ్లు వేసవిలో చల్లగా మరియు శీతాకాలంలో వెచ్చగా ఉంటాయి",
      "Wisdom of the Elders": "ముసలివారి జ్ఞానం",
      "Grandmother Meera shares stories with the village children": "అమ్మమ్మ మీరా గ్రామం పిల్లలతో కథలు పంచుకుంటుంది",
      "Joy of Simple Pleasures": "సాధారణ ఆనందాల సంతోషం",
      "Children playing in the village square after school": "బడి తర్వాత గ్రామ చత్వరంలో ఆడుకునే పిల్లలు",
      "Harvest Festival": "పంట పండుగ",
      "Annual celebration giving thanks for the year's bounty": "సంవత్సరం యొక్క సమృద్ధికి కృతజ్ఞతలు తెలిపే వార్షిక వేడుక",
      "Moonlight Dance": "చంద్రకాంత నృత్యం",
      "The traditional dance performed during the full moon festival": "పౌర్ణమి పండుగ సమయంలో ప్రదర్శించే సంప్రదాయ నృత్యం",
      "Evening Serenity": "సాయంత్రం ప్రశాంతత",
      "The peaceful sunset over the village brings the day to a close": "గ్రామం మీద శాంతియుతమైన సూర్యాస్తమయం రోజును ముగిస్తుంది",
      "Daily Harvest": "రోజువారీ పంట",
      "Farmer Jatin collects fresh vegetables from his organic farm": "రైతు జతిన్ తన సేంద్రీయ వ్యవసాయ ఫారమ్ నుండి తాజా కూరగాయలను సేకరిస్తాడు",
      "Handloom Weaving": "చేనేత నేత",
      "The intricate art of handloom weaving passed down through generations": "తరాల తరబడి అందించబడిన చేనేత నేత యొక్క సంక్లిష్టమైన కళ",
      "Festival of Lights": "కాంతుల పండుగ",
      "The village illuminated during our most colorful celebration": "మా అత్యంత రంగురంగుల వేడుక సమయంలో గ్రామం ప్రకాశవంతమైంది",
      "I've traveled the world, but the warmth of our village community is something I've never found elsewhere. Every visit feels like coming home.": "నేను ప్రపంచాన్ని ప్రయాణించాను, కానీ మా గ్రామ సమాజం యొక్క వెచ్చదనం నేను మరెక్కడా కనుగొనలేదు. ప్రతి సందర్శన ఇంటికి వచ్చినట్లు అనిపిస్తుంది.",
      "Rajesh Mehta, Former Resident": "రాజేష్ మెహతా, మాజీ నివాసి",
      "The village festivals are magical! The colors, music, and shared joy create memories that last a lifetime.": "గ్రామ పండుగలు మాయాజాలం! రంగులు, సంగీతం మరియు పంచుకున్న ఆనందం జీవితకాలం నిలిచిపోయే జ్ఞాపకాలను సృష్టిస్తాయి.",
      "Priya Sharma, Visitor": "ప్రియ శర్మ, సందర్శకురాలు",
      "Growing up in this village taught me the value of community. We look after each other like one big family.": "ఈ గ్రామంలో పెరగడం నాకు సమాజం యొక్క విలువను నేర్పించింది. మేము ఒక పెద్ద కుటుంబం లాగా ఒకరికొకరు చూసుకుంటాము.",
      "Amit Patel, Local Teacher": "అమిత్ పటేల్, స్థానిక ఉపాధ్యాయుడు"
    }
  };

  // Helper function to translate text
  const t = (text) => {
    return translations[language][text] || text;
  };

  // Gallery data with translatable fields
  const galleryItems = [
    {
      id: 1,
      category: 'landscape',
      imageUrl: 'https://img.freepik.com/premium-photo/winter-early-morning-village-view_820076-5.jpg',
      title: t("Morning Mist Over the Fields"),
      description: t("The golden sunrise peeks through the morning mist covering our wheat fields")
    },
    {
      id: 2,
      category: 'landscape',
      imageUrl: 'https://www.assamtimes.org/sites/default/files/styles/718x440/public/field/image/protest_let%20the%20barak%20river%20flow%20%20free.JPG?itok=oRWcCBTN',
      title: t("The Life-Giving River"),
      description: t("Our village river has nurtured generations of farmers and wildlife")
    },
    {
      id: 3,
      category: 'culture',
      imageUrl: 'https://www.alphonsostories.com/AlphonSoStoriesImages/downloads/Traditional-Indian-potter-making-clay-pot.jpg',
      title: t("Ancient Pottery Techniques"),
      description: t("Master artisan Rama continues his family's 200-year-old pottery tradition")
    },
    {
      id: 4,
      category: 'culture',
      imageUrl: 'https://i1.wp.com/www.memoirsofanaveragejoe.com/wp-content/uploads/2023/11/IMG_1183-1.jpeg?resize=700%2C284&ssl=1',
      title: t("Heritage Architecture"),
      description: t("Our traditional mud houses stay cool in summer and warm in winter")
    },
    {
      id: 5,
      category: 'people',
      imageUrl: 'https://media.istockphoto.com/id/182801276/photo/cheerful-traditional-rural-indian-family-of-rajasthan.jpg?s=612x612&w=0&k=20&c=ElwvHf7Q1k3y8p1heICE7RdXbD4G_X2VjvXjQmn7i48=',
      title: t("Wisdom of the Elders"),
      description: t("Grandmother Meera shares stories with the village children")
    },
    {
      id: 6,
      category: 'people',
      imageUrl: 'https://media.licdn.com/dms/image/v2/D4E12AQGIaiA3qDEt3w/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1699012369384?e=2147483647&v=beta&t=tNkUL7dhcGN7dNT6OoBz6xY2qMxWNyxIs3aEByY9s2A',
      title: t("Joy of Simple Pleasures"),
      description: t("Children playing in the village square after school")
    },
    {
      id: 7,
      category: 'festivals',
      imageUrl: 'https://static.toiimg.com/thumb/msid-60719470,width-400,height-225,resizemode-72/60719470.jpg',
      title: t("Harvest Festival"),
      description: t("Annual celebration giving thanks for the year's bounty")
    },
    {
      id: 8,
      category: 'festivals',
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8duNELE9gNtSM1k__HX4yoSB8u716LGcBaQ&s',
      title: t("Moonlight Dance"),
      description: t("The traditional dance performed during the full moon festival")
    },
    {
      id: 9,
      category: 'landscape',
      imageUrl: 'https://static2.tripoto.com/media/filter/tst/img/111845/TripDocument/1562664914_2.jpeg',
      title: t("Evening Serenity"),
      description: t("The peaceful sunset over the village brings the day to a close")
    },
    {
      id: 10,
      category: 'people',
      imageUrl: 'https://i.ytimg.com/vi/AOkL7RIlarQ/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLC8MN8HyI44SMnupNYcIFCuB9Qymw',
      title: t("Daily Harvest"),
      description: t("Farmer Jatin collects fresh vegetables from his organic farm")
    },
    {
      id: 11,
      category: 'culture',
      imageUrl: 'https://www.villagesquare.in/wp-content/uploads/2019/09/Weaver3.jpg',
      title: t("Handloom Weaving"),
      description: t("The intricate art of handloom weaving passed down through generations")
    },
    {
      id: 12,
      category: 'festivals',
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHn4ubK4sKyszzor6loWsgdRJ2yZbtwcSHTA&s',
      title: t("Festival of Lights"),
      description: t("The village illuminated during our most colorful celebration")
    }
  ];

  // Testimonials data with translatable fields
  const testimonials = [
    {
      id: 1,
      text: t("I've traveled the world, but the warmth of our village community is something I've never found elsewhere. Every visit feels like coming home."),
      author: t("Rajesh Mehta, Former Resident")
    },
    {
      id: 2,
      text: t("The village festivals are magical! The colors, music, and shared joy create memories that last a lifetime."),
      author: t("Priya Sharma, Visitor")
    },
    {
      id: 3,
      text: t("Growing up in this village taught me the value of community. We look after each other like one big family."),
      author: t("Amit Patel, Local Teacher")
    }
  ];

  // Filter gallery items
  const filteredItems = activeFilter === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeFilter);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <div className="page-container">
      {/* Navigation Bar */}
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
              <li className="nav-item">
                <Link className="nav-link" to="/contact">
                  <FaEnvelope className="nav-icon" />
                  {t("Contact Us")}
                </Link>
              </li>
            </ul>
            
            <div style={{ margin: '10px' }}>
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
          </div>
        </div>
      </nav>

      {/* Gallery Content */}
      <div className="village-gallery">
        {/* Header Section */}
        <header className="gallery-header">
          <h1>{t("Discover Our Village")}</h1>
          <p>{t("Step into the heart of our community through these captivating glimpses of village life, traditions, and natural beauty")}</p>
          <div className="scrolling-text">
            {t("Preserving traditions • Celebrating community • Embracing nature's gifts")}
          </div>
        </header>

        {/* Gallery Section */}
        <div className="gallery-container">
          <div className="filter-buttons">
            <button 
              className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
              onClick={() => setActiveFilter('all')}
            >
              {t("All")}
            </button>
            <button 
              className={`filter-btn ${activeFilter === 'landscape' ? 'active' : ''}`}
              onClick={() => setActiveFilter('landscape')}
            >
              {t("Landscapes")}
            </button>
            <button 
              className={`filter-btn ${activeFilter === 'culture' ? 'active' : ''}`}
              onClick={() => setActiveFilter('culture')}
            >
              {t("Culture")}
            </button>
            <button 
              className={`filter-btn ${activeFilter === 'people' ? 'active' : ''}`}
              onClick={() => setActiveFilter('people')}
            >
              {t("People")}
            </button>
            <button 
              className={`filter-btn ${activeFilter === 'festivals' ? 'active' : ''}`}
              onClick={() => setActiveFilter('festivals')}
            >
              {t("Festivals")}
            </button>
          </div>

          <div className="gallery-grid">
            {filteredItems.map(item => (
              <div key={item.id} className="gallery-item">
                <img src={item.imageUrl} alt={item.title} />
                <div className="item-overlay">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials Section */}
        <section className="testimonials">
          <h2>{t("Voices From Our Village")}</h2>
          <div className="testimonial-slider">
            {testimonials.map((testimonial, index) => (
              <div 
                key={testimonial.id}
                className={`testimonial ${index === currentSlide ? 'active' : ''}`}
              >
                <p className="testimonial-text">{testimonial.text}</p>
                <p className="testimonial-author">- {testimonial.author}</p>
              </div>
            ))}
            <div className="slider-controls">
              <div className="slider-dots">
                {testimonials.map((_, index) => (
                  <div 
                    key={index}
                    className={`dot ${index === currentSlide ? 'active' : ''}`}
                    onClick={() => setCurrentSlide(index)}
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Footer Section */}
        <footer>
          <div className="social-links">
            <a href="./App"><FaFacebook /></a>
            <a href="./App"><FaInstagram /></a>
            <a href="./App"><FaYoutube /></a>
            <a href="./App"><FaTwitter /></a>
          </div>
          <p>{t("© 2023 Our Village Community. All rights reserved.")}</p>
          <p>{t("Preserving our heritage, celebrating our present, building our future.")}</p>
        </footer>
      </div>

      {/* CSS Styles */}
      <style jsx>{`
        .page-container {
          
          background-position: center;
          background-repeat: no-repeat;
          background-attachment: fixed;
          min-height: 100vh;
          width: 100%;
          position: relative;
          overflow: hidden;
        }

        /* Navigation Bar Styles */
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
          margin-right: 0.5rem;
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

        /* Gallery Content Styles */
        .village-gallery header {
          background: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('https://source.unsplash.com/random/1600x900/?village,scenic');
          background-size: cover;
          background-position: center;
          height: 60vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          color: white;
          padding: 0 20px;
          position: relative;
        }
        
        .village-gallery header h1 {
          font-size: 3.5rem;
          margin-bottom: 20px;
          text-shadow: 2px 2px 5px rgba(0,0,0,0.5);
          font-family: 'Georgia', serif;
        }
        
        .village-gallery header p {
          font-size: 1.2rem;
          max-width: 800px;
          text-shadow: 1px 1px 3px rgba(0,0,0,0.5);
        }
        
        .scrolling-text {
          position: absolute;
          bottom: 20px;
          width: 100%;
          text-align: center;
          font-style: italic;
          animation: scrollText 15s linear infinite;
          white-space: nowrap;
        }
        
        @keyframes scrollText {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        
        .gallery-container {
          padding: 50px 20px;
          max-width: 1200px;
          margin: 0 auto;
        }
        
        .filter-buttons {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 10px;
          margin-bottom: 30px;
        }
        
        .filter-btn {
          padding: 8px 20px;
          background-color: #5d8233;
          color: white;
          border: none;
          border-radius: 30px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-weight: 600;
        }
        
        .filter-btn:hover, .filter-btn.active {
          background-color: #9b5c2e;
          transform: translateY(-3px);
          box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }
        
        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 25px;
        }
        
        .gallery-item {
          position: relative;
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0 5px 15px rgba(0,0,0,0.1);
          transition: all 0.3s ease;
          aspect-ratio: 4/3;
        }
        
        .gallery-item:hover {
          transform: translateY(-10px);
          box-shadow: 0 15px 30px rgba(0,0,0,0.2);
        }
        
        .gallery-item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }
        
        .item-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
          padding: 20px;
          color: white;
          transform: translateY(100%);
          transition: transform 0.3s ease;
        }
        
        .gallery-item:hover .item-overlay {
          transform: translateY(0);
        }
        
        .item-overlay h3 {
          margin-bottom: 5px;
          font-size: 1.2rem;
        }
        
        .item-overlay p {
          font-size: 0.9rem;
          opacity: 0.8;
        }
        
        .testimonials {
          background-color: #5d8233;
          color: white;
          padding: 50px 20px;
          text-align: center;
        }
        
        .testimonials h2 {
          font-size: 2rem;
          margin-bottom: 30px;
          position: relative;
          display: inline-block;
        }
        
        .testimonials h2::after {
          content: '';
          position: absolute;
          bottom: -10px;
          left: 50%;
          transform: translateX(-50%);
          width: 80px;
          height: 3px;
          background-color: #e8c07d;
        }
        
        .testimonial-slider {
          max-width: 800px;
          margin: 0 auto;
          position: relative;
        }
        
        .testimonial {
          padding: 20px;
          background-color: rgba(255,255,255,0.1);
          border-radius: 10px;
          margin: 20px;
          display: none;
        }
        
        .testimonial.active {
          display: block;
          animation: fadeIn 1s ease;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        .testimonial-text {
          font-style: italic;
          margin-bottom: 15px;
          font-size: 1.1rem;
        }
        
        .testimonial-author {
          font-weight: bold;
        }
        
        .slider-controls {
          margin-top: 20px;
        }
        
        .slider-dots {
          display: flex;
          justify-content: center;
          gap: 10px;
        }
        
        .dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background-color: rgba(255,255,255,0.5);
          cursor: pointer;
        }
        
        .dot.active {
          background-color: white;
        }
        
        footer {
          background-color: #333;
          color: white;
          text-align: center;
          padding: 30px 20px;
        }
        
        .social-links {
          display: flex;
          justify-content: center;
          gap: 20px;
          margin: 20px 0;
        }
        
        .social-links a {
          color: white;
          font-size: 1.5rem;
          transition: color 0.3s ease;
        }
        
        .social-links a:hover {
          color: #e8c07d;
        }

        /* Responsive Styles */
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

          .village-gallery header h1 {
            font-size: 2.5rem;
          }
          
          .gallery-grid {
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          }
        }
      `}</style>
    </div>
  );
};

export default VillageGallery;