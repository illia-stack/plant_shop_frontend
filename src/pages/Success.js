import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LanguageContext } from "../context/LanguageContext";
import { translations } from "../translations";

function Success() {
  const navigate = useNavigate();
  const { language } = useContext(LanguageContext);
  const t = translations[language];

  useEffect(() => {
    // Clear cart after successful payment
    localStorage.removeItem("cart");
  }, []);

  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h2>{t.successTitle || "Payment Successful 🎉"}</h2>
      <p>{t.successMessage || "Thank you for your order!"}</p>

      <button onClick={() => navigate("/")}>
        {t.backHome || "Back to Shop"}
      </button>
    </div>
  );
}

export default Success;