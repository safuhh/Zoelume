import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const API_KEY = "c3c59c2805e454036ec8468615bcd11c";
const ITEMS_PER_SLIDE = 6; // desktop items per slide

export default function MovieList() {
  const [movies, setMovies] = useState([]);
  const [tvShows, setTvShows] = useState([]);
  const [videoKey, setVideoKey] = useState(null);

  const fetchData = async (type, setter) => {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/discover/${type}?api_key=${API_KEY}`
      );
      const json = await res.json();
      setter(json.results || []);
    } catch (err) {
      console.error(err);
    }
  };

  const getVideo = async (type, id) => {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/${type}/${id}/videos?api_key=${API_KEY}`
      );
      const json = await res.json();
      const trailer = json.results?.find(
        (v) => v.site === "YouTube" && v.type === "Trailer"
      );
      if (trailer) setVideoKey(trailer.key);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData("movie", setMovies);
    fetchData("tv", setTvShows);
  }, []);

  const AutoSlideRow = ({ title, data, type }) => {
    const [slide, setSlide] = useState(0);
    const [direction, setDirection] = useState(1);
    const totalSlides = Math.min(Math.ceil(data.length / ITEMS_PER_SLIDE), 3);
    const isDesktop = typeof window !== "undefined" && window.innerWidth >= 768;

    // Desktop auto-slide
    useEffect(() => {
      if (!isDesktop || totalSlides <= 1) return;

      const timer = setInterval(() => {
        setSlide((prev) => {
          if (prev === totalSlides - 1) {
            setDirection(-1);
            return prev - 1;
          }
          if (prev === 0) {
            setDirection(1);
            return prev + 1;
          }
          return prev + direction;
        });
      }, 3000);

      return () => clearInterval(timer);
    }, [direction, totalSlides, isDesktop]);

    return (
      <div className="mb-16">
        <h2 className="text-lg font-semibold mb-3 pl-2 border-l-4 border-red-600">
          {title}
        </h2>

        {isDesktop ? (
          // Desktop: Auto-slide with dots
          <div className="overflow-hidden">
            <motion.div
              className="flex gap-4 "
              animate={{ x: `-${slide * 100}%` }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              style={{ width: `${totalSlides * 100}%` }}
            >
              {Array.from({ length: totalSlides }).map((_, slideIndex) => {
                const slice = data.slice(
                  slideIndex * ITEMS_PER_SLIDE,
                  slideIndex * ITEMS_PER_SLIDE + ITEMS_PER_SLIDE
                );
                const isLastSlide = slice.length < ITEMS_PER_SLIDE;

                return (
                  <div
                    key={slideIndex}
                    className={`flex gap-10 w-full flex-shrink-0 ${
                      isLastSlide ? "justify-center" : ""
                    }`}
                  >
                    {slice.map((item) => (
                      <motion.div
                        key={item.id}
                        whileHover={{ scale: 1.07 }}
                        onClick={() => getVideo(type, item.id)}
                        className="w-60 h-[350px] cursor-pointer flex-shrink-0 relative group"
                      >
                        <img
                          src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                          alt={item.title || item.name}
                          className="w-full h-full object-cover rounded-md"
                        />
                      </motion.div>
                    ))}
                  </div>
                );
              })}
            </motion.div>

            {/* DOTS */}
            <div className="flex justify-center mt-4 gap-2">
              {Array.from({ length: totalSlides }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setSlide(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    slide === i ? "w-6 bg-red-600" : "w-2 bg-gray-500"
                  }`}
                />
              ))}
            </div>
          </div>
        ) : (
          // Mobile: 1 poster per swipe
          <div className="overflow-x-auto flex snap-x snap-mandatory scroll-pl-0 py-2">
            {data.map((item) => (
              <div
                key={item.id}
                className="flex-shrink-0 w-full h-[450px] cursor-pointer relative snap-start"
                onClick={() => getVideo(type, item.id)}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                  alt={item.title || item.name}
                  className="w-full h-full object-cover rounded-md"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-black text-white min-h-screen px-4 py-8">
      <AutoSlideRow title="Trending Movies" data={movies} type="movie" />
      <AutoSlideRow title="Popular TV Shows" data={tvShows} type="tv" />

      {/* VIDEO MODAL */}
      {videoKey && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center">
          <div className="relative w-[90%] md:w-[70%] aspect-video">
            <button
              onClick={() => setVideoKey(null)}
              className="absolute -top-10 right-0 bg-red-600 px-4 py-1 rounded-full text-sm"
            >
              ✕ Close
            </button>

            <iframe
              className="w-full h-full rounded-xl"
              src={`https://www.youtube.com/embed/${videoKey}?autoplay=1`}
              allow="autoplay; encrypted-media"
              allowFullScreen
              title="Trailer"
            />
          </div>
        </div>
      )}
    </div>
  );
}
