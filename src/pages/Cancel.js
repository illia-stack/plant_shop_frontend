import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LanguageContext } from "../context/LanguageContext";
import { translations } from "../translations";

function Cancel() {

  const navigate = useNavigate();
  const { language } = useContext(LanguageContext);
  const t = translations[language];

  return (

    <div style={pageWrapper}>

      <div style={cancelCard}>

        <h2 style={titleStyle}>
          ❌ {t.cancelTitle}
        </h2>

        <p style={messageStyle}>
          {t.cancelMessage}
        </p>

        <button
          style={buttonStyle}
          onClick={() => navigate("/")}
        >
          {t.cancelBack}
        </button>

      </div>

    </div>

  );
}

/* PAGE STYLE */

const pageWrapper = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "80vh",
  padding: "40px",
};

/* CARD */

const cancelCard = {
  maxWidth: "500px",
  width: "100%",

  background: "#ffffff",

  padding: "40px",

  borderRadius: "12px",

  textAlign: "center",

  boxShadow: "0 10px 30px rgba(0,0,0,0.15)"
};

/* TITLE */

const titleStyle = {
  color: "#e74c3c",
  marginBottom: "20px"
};

/* MESSAGE */

const messageStyle = {
  fontSize: "16px",
  marginBottom: "25px",
  color: "#555"
};

/* BUTTON */

const buttonStyle = {
  padding: "10px 20px",
  fontSize: "15px",

  backgroundColor: "#2ecc71",
  color: "#fff",

  border: "none",
  borderRadius: "6px",

  cursor: "pointer"
};

export default Cancel;