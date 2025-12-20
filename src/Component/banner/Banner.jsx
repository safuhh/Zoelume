import React, { useState, useEffect } from "react";
import "./banner.css";
import Navbar from "../Navbar/Navbar";
import MovieList from "../../MovieList";
import Footer from "../../Footer";

const API_KEY = "c3c59c2805e454036ec8468615bcd11c"; // TMDb API

const Banner = () => {
  const [showVideo, setShowVideo] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [movieInfo, setMovieInfo] = useState(null);

  const videoUrl = "https://www.youtube.com/embed/SEa7ata9wBI"; // embed format

  const fetchMovieInfo = async () => {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/346364?api_key=${API_KEY}&append_to_response=credits`
      ); // 346364 = IT (2017)
      const data = await res.json();
      setMovieInfo(data);
      setShowInfo(true);
    } catch (err) {
      console.error("Error fetching movie info:", err);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="banner">
        <div className="banner-contents">
          <h1 className="movie-title">
            <span className="it">IT</span>
            <span className="right-side">
              <span className="welcome">
                <span className="welcome-word">WELCOME</span>{" "}
                <span
                  className="to-word text-red-600 text-3xl"
                  style={{ fontFamily: "'Cinzel', serif", fontWeight: 900 }}
                >
                  TO
                </span>
              </span>
              <span className="derry">SCARY</span>
            </span>
          </h1>

          <p className="movie-caption">
            Derry waits silently — a town where laughter hides fear, where
            shadows remember what you’ve tried to forget, and darkness always
            returns for those who dare to look too close.
          </p>
          <br />

          <div className="banner-button">
            <button
              className="banner-play-button"
              onClick={() => setShowVideo(true)}
            >
              Play
            </button>

            <button
              className="banner-info-button"
              onClick={fetchMovieInfo}
            >
              More info
            </button>
          </div>
        </div>
        <div className="fade"></div>
      </div>

      <MovieList />
      <Footer/>

      {/* Video Modal */}
      {showVideo && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center"
          onClick={() => setShowVideo(false)}
        >
          <div className="relative w-[90%] md:w-[70%] aspect-video">
            <button
              onClick={() => setShowVideo(false)}
              className="absolute -top-10 right-0 bg-red-600 px-4 py-1 rounded-full text-sm"
            >
              ✕ Close
            </button>

            <iframe
              className="w-full h-full rounded-xl"
              src={videoUrl + "?autoplay=1"}
              allow="autoplay; encrypted-media"
              allowFullScreen
              title="Scary Video"
            />
          </div>
        </div>
      )}

      {/* Movie Info Modal */}
      {showInfo && movieInfo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4"
          onClick={() => setShowInfo(false)}
        >
          <div
            className="relative w-full max-w-5xl bg-gray-900 rounded-xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header with poster as background */}
            <div
              className="w-full h-64 md:h-80 bg-cover bg-center relative"
              style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/original${movieInfo.backdrop_path || movieInfo.poster_path})`,
              }}
            >
              <div className="absolute inset-0 bg-black/60 flex items-end p-6">
                <h2 className="text-4xl md:text-5xl font-extrabold text-red-600">
                  WELCOME TO SCARY
                </h2>
              </div>
            </div>

            {/* Movie content */}
            <div className="p-6 space-y-4">
              <p className="text-gray-300 text-lg">{movieInfo.overview}</p>
              <p className="text-gray-400">
                <strong>Genres:</strong>{" "}
                {movieInfo.genres.map((g) => g.name).join(", ")}
              </p>
              <p className="text-gray-400">
                <strong>Rating:</strong> {movieInfo.vote_average} / 10
              </p>

              {/* Cast */}
              <div className="mt-4">
                <h3 className="text-xl font-semibold mb-2 text-red-600">Cast</h3>
                <div className="flex gap-4 overflow-x-auto py-2">
                  {movieInfo.credits.cast.slice(0, 8).map((actor) => (
                    <div
                      key={actor.cast_id}
                      className="flex-shrink-0 flex flex-col items-center w-24"
                    >
                      <img
                        src={
                          actor.profile_path
                            ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                            : "https://via.placeholder.com/80x120?text=No+Image"
                        }
                        alt={actor.name}
                        className="w-24 h-32 object-cover rounded-lg mb-1 shadow-md"
                      />
                      <p className="text-sm font-medium text-white text-center">
                        {actor.name}
                      </p>
                      <p className="text-xs text-gray-400 text-center truncate">
                        {actor.character}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end mt-6">
                <button
                  onClick={() => setShowInfo(false)}
                  className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-full font-semibold transition"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Banner;
