import { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logos from "../imgs/vite.png";
import "./navbar.css";

const API_KEY = "c3c59c2805e454036ec8468615bcd11c";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigate = useNavigate();

  const navRef = useRef(null);
  const searchRef = useRef(null);
  const notificationRef = useRef(null);

  const navItems = [
    { name: "Home", path: "/banner" },
    { name: "Movies", path: "/movie" },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchResults([]);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchChange = async (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    if (!term.trim()) return setSearchResults([]);

    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(term)}&language=en-US&page=1`
      );
      const data = await res.json();
      setSearchResults(data.results.slice(0, 5));
    } catch (err) {
      console.error(err);
      setSearchResults([]);
    }
  };

  const handleSelectMovie = (movieId) => {
    navigate(`/movie/${movieId}`);
    setSearchTerm("");
    setSearchResults([]);
    setMobileMenuOpen(false);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim() && searchResults.length > 0) {
      handleSelectMovie(searchResults[0].id);
    }
    setSearchResults([]);
    setMobileMenuOpen(false);
  };

  return (
    <nav className={`nav ${scrolled ? "scrolled" : ""}`} ref={navRef}>
      <div className="nav-left">
        <img className="logo" src={logos} alt="logo" />
        <ul className="nav-links">
          {navItems.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  isActive ? "navlink active" : "navlink"
                }
              >
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      <div className="nav-right">
        {/* Desktop Search */}
        <form
          onSubmit={handleSearchSubmit}
          className="desktop-search"
          ref={searchRef}
        >
          <input
            type="text"
            placeholder="Search Movie..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
          {searchResults.length > 0 && (
            <div className="search-dropdown">
              {searchResults.map((movie) => (
                <p key={movie.id} onClick={() => handleSelectMovie(movie.id)}>
                  {movie.title}
                </p>
              ))}
            </div>
          )}
        </form>

        {/* Notifications */}
        <div className="notifications" ref={notificationRef}>
          <button
            className="tool-icon"
            onClick={() => setShowNotifications(!showNotifications)}
          >
            🔔
          </button>
          {showNotifications && (
            <div className="notification-dropdown">
              <p>New movie released!</p>
              <p>TV show updated!</p>
            </div>
          )}
        </div>

        {/* Profile */}
        <img
          className="profile"
          src="https://img.freepik.com/premium-vector/anime-boy-avatar_24640-79420.jpg"
          alt="profile-icon"
          onClick={() => navigate("/profile")}
        />

        {/* Hamburger Menu */}
        <button
          className="hamburger"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="mobile-menu">
          <ul>
            {navItems.map((item) => (
              <li key={item.name}>
                <NavLink
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
          <form onSubmit={handleSearchSubmit}>
            <input
              type="text"
              placeholder="Search Movie..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </form>
        </div>
      )}
    </nav>
  );
}
