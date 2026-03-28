
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
  const [showSearch, setShowSearch] = useState(false);
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
        setShowSearch(false);
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
    setShowSearch(false);
    setMobileMenuOpen(false);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim() && searchResults.length > 0) {
      handleSelectMovie(searchResults[0].id);
    }
    setSearchResults([]);
    setShowSearch(false);
    setMobileMenuOpen(false);
  };

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out ${
        scrolled
          ? "bg-black/60 backdrop-blur-xl shadow-2xl border-b border-white/10 py-3"
          : "bg-gradient-to-b from-black/80 to-transparent py-6"
      }`}
    >
      <div className="max-w-screen-2xl mx-auto px-6 md:px-12 flex items-center justify-between">
        
        {/* --- LEFT ALIGN: Logo & Desktop Links --- */}
        <div className="flex items-center gap-10">
          <img 
            className="h-8 md:h-10 cursor-pointer transform hover:scale-105 transition-transform duration-300" 
            src={logos} 
            alt="Premium Logo" 
          />
          
          <ul className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <li key={item.name}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `text-sm font-medium tracking-wider transition-all duration-300 relative group ${
                      isActive ? "text-white" : "text-white/60 hover:text-white"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {item.name}
                      {/* Animated Underline */}
                      <span 
                        className={`absolute -bottom-2 left-0 h-[2px] bg-red-500 transition-all duration-300 ${
                          isActive ? "w-full" : "w-0 group-hover:w-full"
                        }`} 
                      />
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* --- RIGHT ALIGN: Tools & Profile --- */}
        <div className="flex items-center gap-6">
          
          {/* Search Wrapper */}
          <div className="relative" ref={searchRef}>
            <button
              className="text-white/70 hover:text-white transition-colors duration-300 transform hover:scale-110"
              onClick={() => setShowSearch(!showSearch)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
            </button>

            {/* Premium Search Dropdown */}
            {showSearch && (
              <form
                onSubmit={handleSearchSubmit}
                className="absolute top-full right-0 mt-6 w-80 bg-gray-900/90 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl p-3 z-50 animate-in fade-in slide-in-from-top-4 duration-300"
              >
                <div className="relative flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 absolute left-4 text-white/40">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Titles, people, genres..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    autoFocus
                    className="w-full bg-black/50 text-white rounded-xl pl-12 pr-4 py-3 text-sm border border-transparent focus:border-red-500/50 focus:ring-1 focus:ring-red-500/50 focus:outline-none transition-all placeholder:text-white/30"
                  />
                </div>

                {searchResults.length > 0 && (
                  <div className="mt-3 max-h-[60vh] overflow-y-auto custom-scrollbar rounded-xl">
                    {searchResults.map((movie) => (
                      <div
                        key={movie.id}
                        className="flex items-center gap-4 p-2 hover:bg-white/10 cursor-pointer rounded-lg transition-colors group"
                        onClick={() => handleSelectMovie(movie.id)}
                      >
                        <img
                          src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                          alt={movie.title}
                          className="w-12 h-16 object-cover rounded-md shadow-md group-hover:scale-105 transition-transform"
                        />
                        <div>
                          <p className="text-white text-sm font-semibold truncate w-48">{movie.title}</p>
                          <p className="text-white/40 text-xs mt-1">{movie.release_date?.split('-')[0]}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </form>
            )}
          </div>

          {/* Notifications Wrapper */}
          <div className="relative hidden md:block" ref={notificationRef}>
            <button
              className="text-white/70 hover:text-white transition-colors duration-300 transform hover:scale-110"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
              </svg>
            </button>

            {showNotifications && (
              <div className="absolute top-full right-0 mt-6 w-64 bg-gray-900/90 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl p-4 z-50 flex flex-col gap-3 animate-in fade-in slide-in-from-top-4 duration-300">
                <p className="text-sm text-white/80 hover:text-white cursor-pointer transition-colors border-b border-white/10 pb-2">New movie released!</p>
                <p className="text-sm text-white/80 hover:text-white cursor-pointer transition-colors">TV show updated!</p>
              </div>
            )}
          </div>

          {/* Profile Avatar */}
          <div className="relative group cursor-pointer hidden md:block" onClick={() => navigate("/profile")}>
            <div className="absolute -inset-0.5 bg-gradient-to-r from-red-500 to-purple-600 rounded-md opacity-0 group-hover:opacity-100 transition duration-300 blur-sm"></div>
            <img
              className="relative w-9 h-9 object-cover rounded-md border border-white/20"
              src="https://img.freepik.com/premium-vector/anime-boy-avatar_24640-79420.jpg"
              alt="profile-icon"
            />
          </div>

          {/* Hamburger Menu (Mobile) */}
          <button
            className="md:hidden text-white p-1"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
               <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
        </div>
      </div>

      {/* --- MOBILE MENU OVERLAY --- */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-black/95 backdrop-blur-3xl border-b border-white/10 shadow-2xl animate-in slide-in-from-top-4 duration-300">
          <div className="flex flex-col p-6 gap-6">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                placeholder="Search movies..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="w-full bg-white/5 text-white border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-red-500 focus:outline-none placeholder:text-white/30"
              />
            </form>
            
            <ul className="flex flex-col gap-4">
              {navItems.map((item) => (
                <li key={item.name}>
                  <NavLink
                    to={item.path}
                    className="text-lg font-medium text-white/70 hover:text-white block transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </NavLink>
                </li>
              ))}
              <li 
                className="text-lg font-medium text-white/70 hover:text-white block transition-colors cursor-pointer pt-4 border-t border-white/10 mt-2" 
                onClick={() => { setMobileMenuOpen(false); navigate("/profile"); }}
              >
                Profile
              </li>
            </ul>
          </div>
        </div>
      )}
    </nav>
  );
}
