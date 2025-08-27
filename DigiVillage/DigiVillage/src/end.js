import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const ThankYou = () => {
  const navigate = useNavigate();

  return (
    <div style={{
      display: "flex", 
      flexDirection: "column", 
      alignItems: "center", 
      justifyContent: "center", 
      height: "100vh", 
      background: "linear-gradient(135deg, #ff9a9e, #fad0c4, #fbc2eb, #a6c1ee, #f6d365)", // Vibrant gradient
      color: "white",
      textAlign: "center",
      fontFamily: "'Poppins', sans-serif", // Modern font
      overflow: "hidden"
    }}>
      {/* Animated Effect */}
      <motion.div 
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 1,
          opacity: 0.8
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8 }}
        transition={{ delay: 0.8, duration: 1 }}
      />

      {/* Main Content */}
      <motion.div 
        style={{ zIndex: 2 }}
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <motion.h1 
          initial={{ opacity: 0, scale: 0.5 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ duration: 0.5 }}
          style={{ 
            fontSize: "4rem", 
            marginBottom: "10px", 
            fontWeight: "bold", 
            textShadow: "2px 2px 4px rgba(0,0,0,0.3)" 
          }}
        >
          🎉 Thank You! 🎉
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ delay: 0.3, duration: 0.5 }}
          style={{ 
            fontSize: "1.8rem", 
            marginBottom: "30px", 
            textShadow: "1px 1px 2px rgba(0,0,0,0.2)" 
          }}
        >
          Your action was successful. We appreciate you!
        </motion.p>
        <motion.button 
          whileHover={{ scale: 1.1, boxShadow: "0px 6px 15px rgba(0,0,0,0.3)" }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/App")}
          style={{
            padding: "15px 30px", 
            fontSize: "1.2rem", 
            color: "#0072ff", 
            background: "white", 
            border: "none", 
            borderRadius: "30px", 
            cursor: "pointer", 
            boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
            transition: "all 0.3s ease"
          }}
        >
          Go to Home
        </motion.button>
      </motion.div>

      
    </div>
  );
};

export default ThankYou;