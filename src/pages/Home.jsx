import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <h1>Ana Sayfa</h1>
      <Link to="/siparis">
        <button>Siparis Ver</button>
      </Link>
    </div>
  );
}
