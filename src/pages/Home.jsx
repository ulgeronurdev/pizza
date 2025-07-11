import { useNavigate } from "react-router-dom";
import "./HomePage.css";
import homeBanner from "../../images/iteration-1-images/home-banner.png";
import logo from "../../images/iteration-1-images/logo.svg";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <img src={homeBanner} alt="Banner" className="home-banner" />
      <div className="home-text">
        <div className="home-content">
          <img src={logo} alt="Teknolojik Yemekler" className="home-logo" />
          <h1>
            KOD ACIKTIRIR <br /> PİZZA, DOYURUR
          </h1>
          <button onClick={() => navigate("/siparis")}>ACIKTIM</button>
        </div>
      </div>
    </div>
  );
}
