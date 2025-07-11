// OrderPage.jsx

import React, { useState, useEffect } from "react";
import axios from "axios";
import "./OrderPage.css";
import logo from "../../images/iteration-1-images/logo.svg";
import { BrowserRouter as Router } from "react-router-dom";
import ReactDOM from "react-dom/client";
import { useNavigate } from "react-router-dom";

export default function OrderPage() {
  const navigate = useNavigate();
  const [isim, setIsim] = useState("");
  const [boyut, setBoyut] = useState("");
  const [hamur, setHamur] = useState("Normal");
  const [malzemeler, setMalzemeler] = useState([]);
  const [notlar, setNotlar] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [adet, setAdet] = useState(1);

  const toppingOptions = [
    "Pepperoni",
    "Sosis",
    "Kanada Jambonu",
    "Tavuk Izgara",
    "Soğan",
    "Domates",
    "Mısır",
    "Jalapeno",
    "Sarımsak",
    "Biber",
    "Ekstra Peynir",
    "Salam",
    "Sucuk",
    "Turşu",
  ];
  const basePrice = 85.5;

  useEffect(() => {}, []);

  const validate = () => {
    const errs = {};
    if (isim.trim().length < 3) errs.isim = "En az 3 karakter girin.";
    if (!boyut) errs.boyut = "Pizza boyutu seçin.";
    if (malzemeler.length < 4 || malzemeler.length > 10)
      errs.malzemeler = "4–10 arası malzeme seçin.";
    return errs;
  };

  const toggleMalzeme = (m) => {
    setMalzemeler((prev) =>
      prev.includes(m) ? prev.filter((x) => x !== m) : [...prev, m]
    );
  };

  const total = ((basePrice + malzemeler.length * 5) * adet).toFixed(2);

  const isValid =
    isim.trim().length >= 3 && // isim en az 3 karakter
    boyut !== "" && // boyut seçili
    hamur.trim() !== "" && // hamur seçili
    malzemeler.length >= 4 && // en az 4 malzeme
    malzemeler.length <= 10;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setIsSubmitting(true);

    try {
      const res = await axios.post(
        "https://reqres.in/api/pizza",
        { isim, boyut, hamur, malzemeler, notlar, adet },
        { headers: { "x-api-key": "reqres-free-v1" } }
      );
      console.log("Sipariş Özeti:", res.data);

      // Başarı durumunda sadece yönlendir, alert yok
      navigate("/tesekkurler");
    } catch (err) {
      console.error(err);
      // Hata varsa kullanıcıya bildir
      alert("Hata oluştu.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="order-page">
      <div className="order-card">
        <div className="logo">
          <img src={logo} alt="Pizza Logo" />
        </div>
        <div className="aciklama">
          <p>
            Frontent Dev olarak hala position:absolute kullanıyorsan bu çok acı
            pizza tam sana göre.
          </p>
        </div>
        <form id="order-form" onSubmit={handleSubmit}>
          <label>
            İsim:
            <input
              type="text"
              value={isim}
              onChange={(e) => setIsim(e.target.value)}
              disabled={isSubmitting}
            />
            {errors.isim && <small className="error">{errors.isim}</small>}
          </label>

          <fieldset className="size-fieldset">
            <legend>Boyut Seç:</legend>
            {["Küçük", "Orta", "Büyük"].map((size) => (
              <label key={size} className="size-radio">
                <input
                  type="radio"
                  name="boyut"
                  value={size}
                  checked={boyut === size}
                  onChange={(e) => setBoyut(e.target.value)}
                  disabled={isSubmitting}
                />
                {size}
              </label>
            ))}
            {errors.boyut && <small className="error">{errors.boyut}</small>}
          </fieldset>

          <label>
            Hamur Seç:
            <select
              value={hamur}
              onChange={(e) => setHamur(e.target.value)}
              disabled={isSubmitting}
            >
              <option>Normal Kenar</option>
              <option>İnce Kenar</option>
              <option>Kalın Kenar</option>
            </select>
          </label>

          <fieldset>
            <legend>Ek Malzemeler (En Fazla 10 Adet Seçebilirsiniz):</legend>
            {toppingOptions.map((m) => (
              <label key={m}>
                <input
                  type="checkbox"
                  checked={malzemeler.includes(m)}
                  onChange={() => toggleMalzeme(m)}
                  disabled={
                    isSubmitting ||
                    (malzemeler.length === 10 && !malzemeler.includes(m))
                  }
                />
                {m}
              </label>
            ))}
            {errors.malzemeler && (
              <small className="error">{errors.malzemeler}</small>
            )}
          </fieldset>

          <label>
            Sipariş Notu:
            <textarea
              value={notlar}
              onChange={(e) => setNotlar(e.target.value)}
              disabled={isSubmitting}
              placeholder="Siparişinizle ilgili not ekleyebilirsiniz.."
            />
          </label>

          <div className="order-summary">
            <div className="qty-control">
              <button
                type="button"
                onClick={() => setAdet((a) => Math.max(1, a - 1))}
                disabled={isSubmitting}
              >
                -
              </button>
              <span>{adet}</span>
              <button
                type="button"
                onClick={() => setAdet((a) => a + 1)}
                disabled={isSubmitting}
              >
                +
              </button>
            </div>
            <div className="totals">
              <div>Seçimler: {(malzemeler.length * 5).toFixed(2)}₺</div>
              <div>Toplam: {total}₺</div>
            </div>
          </div>

          <button
            type="submit"
            disabled={!isValid || isSubmitting}
            className="submit-button"
          >
            SIPARIŞ VER
          </button>
        </form>
      </div>
    </div>
  );
}
