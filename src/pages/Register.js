import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { LanguageContext } from "../context/LanguageContext";
import { translations } from "../translations";

function Register() {
  const { login } = useContext(AuthContext);
  const { language } = useContext(LanguageContext);
  const t = translations[language];

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const res = await fetch(
        "http://localhost/4_Indoor_Gardening_Plants/indoor-gardening-backend/api/register.php", // Use correct URL
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password }),
        }
      );

      const data = await res.json();

      if (data.success) {
        alert(t.registerSuccess);
        login(data.user); // optional: auto-login
        navigate("/"); // go to home after registration
      } else {
        alert(data.message || t.registerFailed);
      }
    } catch (err) {
      console.error(err);
      alert(t.registerFailed);
    }
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>{t.registerTitle}</h2>
      <input
        placeholder={t.registerName}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <br />
      <input
        placeholder={t.registerEmail}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      <input
        type="password"
        placeholder={t.registerPassword}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <button onClick={handleRegister}>{t.registerButton}</button>
    </div>
  );
}

export default Register;