import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LanguageContext } from "../context/LanguageContext";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import { translations } from "../translations";
import logo from "../logo.svg";
import { Link } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";

function Navbar() {
  const { language, changeLanguage } = useContext(LanguageContext);

  const { user, logout } = useContext(AuthContext);
  const { cart } = useContext(CartContext);

  const navigate = useNavigate();

  const { dark, setDark } = useContext(ThemeContext);

  const t = translations[language];

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const flagStyle = {
    width: "32px",
    height: "20px",
    cursor: "pointer",
    borderRadius: "4px",
    transition: "transform 0.2s",
  };

  const activeFlagStyle = {
    border: "2px solid #fff",
  };

  return (
    <nav style={navStyle}>

      {/* LEFT SIDE (HOME BUTTON) */}
      <div
        style={leftStyle}
        onClick={() => navigate("/")}
      >
                <img
                  src={logo}
                  alt="Logo"
                  style={{ width: "40px", cursor: "pointer" }}
                />
                <h2 style={{ margin: 0, cursor: "pointer" }}>
                  {t.title}
                </h2>
              </div>

              {/* HOME BUTTON (Also add this below the logo) */}
              <div
                style={homeButtonStyle}
                onClick={() => navigate("/")}
              >
                {t.home} {/* This will be the translation for "Home" */}
      </div>

      {/* RIGHT SIDE */}
      <div style={rightStyle}>
                {/* CART */}
              <div style={cartStyle} onClick={() => navigate("/cart")}>
                🛒 ({cartCount})
              </div>

              {/* LANGUAGE FLAGS */}
              <div style={flagsContainerStyle}>
                {["en", "es", "de"].map((lang) => (
                  <img
                    key={lang}
                    src={process.env.PUBLIC_URL + `/flags/${lang}.png`}
                    alt={lang}
                    style={{
                      ...flagStyle,
                      ...(language === lang ? activeFlagStyle : {}),
                    }}
                    onClick={() => changeLanguage(lang)}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.2)")}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                  />
                ))}

                <button
                    onClick={() => setDark(!dark)}
                    style={{
                      padding: "6px 10px",
                      borderRadius: "6px",
                      border: "none",
                      cursor: "pointer"
                    }}
                  >
                    {dark ? "☀️" : "🌙"}
                  </button>
              </div>








{/* CONTACT BUTTON */}
<div
  style={homeButtonStyle} // you can reuse homeButtonStyle or create a new style
  onClick={() => navigate("/contact")}
>
        {t.contact || "Contact Us"}
        
      <Link
        to="/contact"
        style={{
          color: "#fff",
          marginLeft: "10px",
          padding: "5px 10px",
          borderRadius: "4px",
          backgroundColor: "#3498db",
          textDecoration: "none",
        }}
      >
      </Link>
</div>










              {/* LOGIN / LOGOUT */}
              {user ? (
  <>
    <span style={{ color: "#fff" }}>Hi, {user.name}</span>
    <button
      onClick={logout}
      style={{
        marginLeft: "10px",
        padding: "5px 10px",
        cursor: "pointer",
        borderRadius: "4px",
        border: "none",
        backgroundColor: "#e74c3c",
        color: "#fff",
      }}
    >
      Logout
    </button>
  </>
) : (
  <>
    <Link
      to="/login"
      style={{
        color: "#fff",
        marginLeft: "10px",
        padding: "5px 10px",
        borderRadius: "4px",
        backgroundColor: "#2ecc71",
        textDecoration: "none",
      }}
    >
      Login
    </Link>
    <Link
      to="/register"
      style={{
        color: "#fff",
        marginLeft: "10px",
        padding: "5px 10px",
        borderRadius: "4px",
        backgroundColor: "#f39c12",
        textDecoration: "none",
      }}
    >
      Register
    </Link>
  </>
)}
    </div>
    </nav>
  );
}

const navStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "10px 30px",
  backgroundColor: "#2c3e50",
  color: "#fff",
  boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
};

const leftStyle = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
};

const homeButtonStyle = {
  color: "#fff",
  cursor: "pointer",
  fontSize: "16px",
  padding: "10px 20px",
  backgroundColor: "#3498db",
  borderRadius: "5px",
  marginLeft: "20px", // For spacing between the logo and the Home button
  transition: "background-color 0.3s ease",
};

const rightStyle = {
  display: "flex",
  alignItems: "center",
  gap: "20px",
};

const cartStyle = {
  fontSize: "16px",
  cursor: "pointer",
};

const flagsContainerStyle = {
  display: "flex",
  gap: "8px",
};

export default Navbar;