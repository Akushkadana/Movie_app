import { Link } from "react-router-dom";
import "./Header.css";

function Header() {
  return (
    <header className="header">
      <h1 className="logo">Filmix</h1>
      <nav>
        <Link to="/">Главная</Link>
        <Link to="/movies">Фильмы</Link>
      </nav>
    </header>
  );
}

export default Header;
