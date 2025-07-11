import { useState } from "react";
import axios from "axios";
import "./OrderPage.css";
import logo from "../../images/iteration-1-images/logo.svg";
import { useNavigate } from "react-router-dom";

export default function OrderPage() {
  // Kullanıcıyı sipariş sonrası teşekkür sayfasına yönlendirmek için navigate'i kullandım
  const navigate = useNavigate();

  // Formdaki girişleri state ile tutuyorum
  const [isim, setIsim] = useState("");
  const [boyut, setBoyut] = useState("");
  const [hamur, setHamur] = useState("Normal"); // Varsayılan olarak "Normal" hamur seçili
  const [malzemeler, setMalzemeler] = useState([]);
  const [notlar, setNotlar] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [adet, setAdet] = useState(1); //başlangıç değeri 1 çünkü pizza siparişi

  // Kullanıcıya gösterdiğim pizza malzemeleri listesi
  const malzemeSecenekleri = [
    "Pepperoni",
    "Sosis",
    "Jambon",
    "Turşu",
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
  ];

  // Sabit pizza fiyatını burada belirledim
  const pizzaFiyat = 85.5;

  // Form doğrulama fonksiyonu oluşturdum
  const validate = () => {
    const errs = {};
    if (isim.trim().length < 3) errs.isim = "En az 3 karakter girin.";
    if (!boyut) errs.boyut = "Pizza boyutu seçin.";
    if (malzemeler.length < 4 || malzemeler.length > 10)
      errs.malzemeler = "4–10 arası malzeme seçin.";
    return errs;
  };

  // Malzemelerin seçimini kontrol eden fonksiyon
  const toggleMalzeme = (malzeme) => {
    setMalzemeler((oncekiMalzemeListesi) =>
      oncekiMalzemeListesi.includes(malzeme)
        ? oncekiMalzemeListesi.filter(
            (seciliMalzeme) => seciliMalzeme !== malzeme
          )
        : [...oncekiMalzemeListesi, malzeme]
    );
  };

  // Sipariş toplam fiyatını hesaplayan kod
  const total = ((pizzaFiyat + malzemeler.length * 5) * adet).toFixed(2);

  // Formun geçerli olup olmadığını kontrol ettiğim boolean değer
  const isValid =
    isim.trim().length >= 3 &&
    boyut !== "" &&
    hamur.trim() !== "" &&
    malzemeler.length >= 4 &&
    malzemeler.length <= 10;

  // Form submit edildiğinde çalışan fonksiyon
  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length) return;

    setIsSubmitting(true);
    try {
      // Sipariş verilerini API'ye gönderiyorum
      const res = await axios.post(
        "https://reqres.in/api/pizza",
        { isim, boyut, hamur, malzemeler, notlar, adet },
        { headers: { "x-api-key": "reqres-free-v1" } }
      );

      console.log("Sipariş Özeti:", res.data);

      // Başarılı siparişten sonra teşekkür sayfasına yönlendiriyorum
      navigate("/tesekkurler");
    } catch (err) {
      console.error(err);
      alert("Hata oluştu."); //alert ekranı buttonu disabled yaptığım için artık gözükmüyor
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
            Frontend Dev olarak hala position:absolute kullanıyorsan bu çok acı
            pizza tam sana göre.
          </p>
        </div>

        {/* Sipariş Formu */}
        <form id="order-form" onSubmit={handleSubmit}>
          {/* İsim Giriş Alanı */}
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

          {/* Pizza Boyut Seçimi */}
          <fieldset className="size-fieldset">
            <legend>Pizzanızın Boyutunu Seçin:</legend>
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

          {/* Hamur Tipi Seçimi */}
          <label>
            Pizzanızın Hamurunu Seçin:
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

          {/* Malzeme Seçimi */}
          <fieldset>
            <legend>Ek Malzemeler (En Fazla 10 Adet Seçebilirsiniz):</legend>
            {malzemeSecenekleri.map(
              (
                m // her biri için checkbox oluşturdum, toggle edilince ekle veya çıkar yaptım
              ) => (
                <label key={m}>
                  <input
                    type="checkbox"
                    checked={malzemeler.includes(m)}
                    onChange={() => toggleMalzeme(m)}
                    disabled={
                      // 10'dan fazla seçilmemesi için yaptım
                      isSubmitting ||
                      (malzemeler.length === 10 && !malzemeler.includes(m))
                    }
                  />
                  {m}
                </label>
              )
            )}
            {errors.malzemeler && (
              <small className="error">{errors.malzemeler}</small>
            )}
          </fieldset>

          {/* Sipariş Not Alanı */}
          <label>
            Sipariş Notu:
            <textarea
              value={notlar}
              onChange={(e) => setNotlar(e.target.value)}
              disabled={isSubmitting}
              placeholder="Siparişinizle ilgili not ekleyebilirsiniz.."
            />
          </label>

          {/* Toplam Fiyat ve Adet Kontrolü */}
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
            <div>Ek Malzemeler: {(malzemeler.length * 5).toFixed(2)}₺</div>
            <div>Toplam: {total}₺</div>
          </div>

          <button
            type="submit"
            disabled={!isValid || isSubmitting}
            className="submit-button"
          >
            SİPARİŞ VER
          </button>
        </form>
      </div>
    </div>
  );
}
