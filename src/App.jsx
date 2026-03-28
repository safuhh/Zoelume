import { Routes, Route } from "react-router-dom"; // ✅ import Route too
import Banner from "./Component/banner/Banner";
import Login from "./Component/Login";
import Register from "./Component/Register";
import MovieList from "./MovieList";
import MovieDetails from "./MovieDetails";
import Profile from "./Profile";

import Footer from "./Footer";

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/footer" element={<Footer />} />
        <Route path="/banner" element={<Banner />} />
        <Route path="/login" element={<Login />} />
        <Route path="/movie" element={<MovieList />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
}
