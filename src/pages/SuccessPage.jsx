// SuccessPage.jsx
import { useNavigate } from "react-router-dom";
import logo from "../../images/iteration-1-images/logo.svg";
import "./SuccessPage.css";

export default function SuccessPage() {
  const navigate = useNavigate();
  return (
    <div className="success-container">
      <div className="success-logo">
        <img src={logo} alt="Teknolojik Yemekler Logo" />
      </div>
      <h1 className="success-header">TEBRİKLER!</h1>
      <p className="success-message">SİPARİŞİNİZ ALINDI!</p>
      <button className="back-button" onClick={() => navigate("/")}>
        Ana Menüye Dön
      </button>
    </div>
  );
}
