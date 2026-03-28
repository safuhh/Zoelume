import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const API_KEY = "c3c59c2805e454036ec8468615bcd11c";

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [crew, setCrew] = useState([]);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const [movieRes, creditsRes, videosRes] = await Promise.all([
          fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`),
          fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}`),
          fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}&language=en-US`)
        ]);

        if (!movieRes.ok) throw new Error("Movie not found");

        const movieData = await movieRes.json();
        const creditsData = await creditsRes.json();
        const videosData = await videosRes.json();

        setMovie(movieData);
        setCast(creditsData.cast.slice(0, 10)); // Top 10 cast
        setCrew(creditsData.crew);
        setVideos(videosData.results.filter(v => v.site === "YouTube" && v.type === "Trailer"));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (loading) return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-600"></div>
    </div>
  );
  if (error) return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-red-600 mb-4">Oops!</h1>
        <p className="text-gray-300 text-lg">{error}</p>
      </div>
    </div>
  );

  const trailer = videos.find(v => v.type === "Trailer") || videos[0];
  const director = crew.find(person => person.job === "Director")?.name || "Unknown";
  const backdropUrl = `https://image.tmdb.org/t/p/original${movie.backdrop_path}`;

 return (
    <div className="relative min-h-screen bg-black text-white selection:bg-red-500/30 font-sans overflow-hidden">
      
      {/* --- CINEMATIC AMBIENT BACKGROUND --- */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {movie.backdrop_path && (
          <div
            className="absolute inset-0 bg-cover bg-center opacity-30 blur-sm mix-blend-luminosity scale-105"
            style={{ backgroundImage: `url(${backdropUrl})` }}
          />
        )}
        {/* Complex gradients to ensure perfect text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 lg:py-32">
        
        {/* --- HERO SECTION --- */}
        <div className="flex flex-col md:flex-row gap-12 lg:gap-20 items-center md:items-end mb-24">
          
          {/* Floating Poster with Ambient Glow */}
          <div className="relative w-2/3 max-w-[280px] md:max-w-[320px] shrink-0 group">
            {/* Ambient Background Glow matching the poster */}
            <div className="absolute -inset-4 bg-gradient-to-tr from-red-600/30 to-purple-600/30 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition duration-700" />
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="relative w-full h-auto object-cover rounded-2xl shadow-2xl shadow-black/80 ring-1 ring-white/10 transform transition-transform duration-700 group-hover:-translate-y-2"
            />
          </div>

          {/* Typography & Details */}
          <div className="flex-1 text-center md:text-left">
            {/* Minimalist Metadata Row */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mb-4 text-xs sm:text-sm uppercase tracking-widest font-semibold text-white/60">
              <span className="flex items-center gap-1.5 text-white/90">
                <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                {movie.vote_average.toFixed(1)}
              </span>
              <span>•</span>
              <span>{new Date(movie.release_date).getFullYear()}</span>
              <span>•</span>
              <span>{movie.runtime} MIN</span>
              <span>•</span>
              <span className="border border-white/20 px-2 py-0.5 rounded backdrop-blur-md">HD</span>
            </div>

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-6 tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-white/40 pb-2">
              {movie.title}
            </h1>

            {/* Overview */}
            <p className="text-white/70 text-base sm:text-lg mb-10 leading-relaxed max-w-3xl font-light">
              {movie.overview}
            </p>

            {/* Elegant Key Info Divider */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 py-6 border-y border-white/10">
              <div>
                <p className="text-white/40 text-xs uppercase tracking-wider mb-1">Director</p>
                <p className="font-medium text-white/90">{director}</p>
              </div>
              <div>
                <p className="text-white/40 text-xs uppercase tracking-wider mb-1">Genres</p>
                <p className="font-medium text-white/90">{movie.genres.map(g => g.name).join(", ")}</p>
              </div>
              <div>
                <p className="text-white/40 text-xs uppercase tracking-wider mb-1">Release</p>
                <p className="font-medium text-white/90">{new Date(movie.release_date).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-white/40 text-xs uppercase tracking-wider mb-1">Budget</p>
                <p className="font-medium text-white/90">{movie.budget > 0 ? `$${movie.budget.toLocaleString()}` : 'N/A'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* --- OFFICIAL TRAILER SECTION --- */}
        {trailer && (
          <div className="mb-24 relative z-10">
            <h2 className="text-2xl font-bold mb-6 text-white/90 tracking-wide">Trailer</h2>
            <div className="relative w-full aspect-video rounded-3xl overflow-hidden ring-1 ring-white/10 shadow-2xl shadow-black/80 bg-black/50 backdrop-blur-sm group">
              {/* Subtle animated border effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/0 via-red-500/10 to-red-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 animate-pulse pointer-events-none" />
              <iframe
                className="w-full h-full relative z-10"
                src={`https://www.youtube.com/embed/${trailer.key}?color=white`}
                title="Trailer"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        )}

        {/* --- CAST SECTION --- */}
        {cast.length > 0 && (
          <div className="mb-24 relative z-10">
            <h2 className="text-2xl font-bold mb-8 text-white/90 tracking-wide">Top Cast</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
              {cast.map(actor => (
                <div key={actor.id} className="group relative aspect-[2/3] overflow-hidden rounded-2xl bg-gray-900 cursor-pointer ring-1 ring-white/5 hover:ring-white/20 transition-all duration-300">
                  <img
                    src={actor.profile_path ? `https://image.tmdb.org/t/p/w300${actor.profile_path}` : 'https://via.placeholder.com/300x450?text=N/A'}
                    alt={actor.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                  />
                  {/* Cinematic Bottom Fade */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Text positioned inside the image */}
                  <div className="absolute bottom-0 left-0 w-full p-4 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="font-bold text-white text-sm sm:text-base leading-tight truncate">{actor.name}</h3>
                    <p className="text-xs text-red-400 mt-1 truncate">{actor.character}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- ADDITIONAL INFO (GLASSMORPHIC FOOTER) --- */}
        <div className="relative z-10 mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-wrap gap-8 text-xs sm:text-sm text-white/40">
            <span className="flex items-center gap-2">
              <span className="uppercase tracking-widest font-semibold text-white/20">Status</span>
              <span className="text-white/70">{movie.status}</span>
            </span>
            <span className="flex items-center gap-2">
              <span className="uppercase tracking-widest font-semibold text-white/20">Language</span>
              <span className="text-white/70">{movie.original_language.toUpperCase()}</span>
            </span>
            <span className="flex items-center gap-2">
              <span className="uppercase tracking-widest font-semibold text-white/20">Production</span>
              <span className="text-white/70 truncate max-w-[200px]">{movie.production_countries.map(c => c.name).join(", ")}</span>
            </span>
            {movie.tagline && (
              <span className="flex items-center gap-2 ml-auto">
                <span className="italic text-white/50">"{movie.tagline}"</span>
              </span>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}