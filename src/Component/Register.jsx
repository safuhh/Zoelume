import { useState } from "react";
import { registerUser, getUserByEmail } from "../Component/api/api";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

// Helper component for the Netflix-style Input Field
const NetflixInput = ({ id, type, placeholder, value, onChange }) => (
  <div className="relative mb-6">
    <input
      id={id}
      type={type}
      className="peer w-full h-14 p-4 pt-6 rounded-md bg-gray-700/70 text-white placeholder-transparent border border-gray-700 focus:outline-none focus:ring-0 focus:bg-gray-700 focus:border-white transition duration-200"
      placeholder={placeholder} // The placeholder text is crucial for the floating effect
      value={value}
      onChange={onChange}
      required
    />
    <label
      htmlFor={id}
      className="absolute left-4 top-4 text-sm text-gray-400 pointer-events-none origin-top-left transition-all duration-200 
                 peer-placeholder-shown:text-base 
                 peer-placeholder-shown:top-4 
                 peer-focus:-translate-y-2 
                 peer-focus:text-xs 
                 peer-focus:text-white"
    >
      {placeholder}
    </label>
  </div>
);

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      toast.error("Please enter a valid email address.");
      return;
    }

    try {
      const existingUser = await getUserByEmail(trimmedEmail);

      if (existingUser) {
        toast.success("Already have an account. Please login ");
        navigate("/login");
        return;
      }

      const createdUser = await registerUser({ email: trimmedEmail, password });

      if (!createdUser) {
        toast.error("Registration failed ");
        return;
      }

      toast.success("Registration successful ");
      setEmail("");
      setPassword("");
      navigate("/login");
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("An error occurred during registration.");
    }
  };

  return (
    // Background container - Uses your original background image
    <div
      style={{
        minHeight: "100vh",
        backgroundImage: `url("https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/f562aaf4-5dbb-4603-a32b-6ef6c2230136/dh0w8qv-9d8ee6b2-b41a-4681-ab9b-8a227560dc75.jpg/v1/fill/w_1192,h_670,q_70,strp/the_netflix_login_background__canada__2024___by_logofeveryt_dh0w8qv-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NzIwIiwicGF0aCI6Ii9mL2Y1NjJhYWY0LTVkYmItNDYwMy1hMzJiLTZlZjZjMjIzMDEzNi9kaDB3OHF2LTlkOGVlNmIyLWI0MWEtNDY4MS1hYjliLThhMjI3NTYwZGM3NS5qcGciLCJ3aWR0aCI6Ijw9MTI4MCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.FScrpAAFnKqBVKwe2syeiOww6mfH6avq-DRHZ_uFVNw")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="flex items-center justify-center"
    >
      {/* Dark overlay - using the signature 70% opacity */}
      <div className="absolute inset-0 bg-black/70"></div>

      {/* Netflix-Style Form Card */}
      <form
        onSubmit={handleRegister}
        // Netflix card style: solid black with rounded corners, centered
        className="relative bg-black/80 p-16 rounded w-full max-w-md text-white z-10 shadow-2xl"
      >
        <h1 className="text-3xl font-bold mb-8">Sign Up</h1>

        {/* Floating Email Input */}
        <NetflixInput
          id="email"
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value.trim())}
        />

        {/* Floating Password Input */}
        <NetflixInput
          id="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Sign Up Button (The Big Red One) */}
        <button className="w-full bg-red-600 hover:bg-red-700 py-3 rounded font-semibold text-xl mt-4 transition duration-200">
          Sign Up
        </button>

        {/* Login Link and ReCAPTCHA Info */}
        <div className="mt-12">
          <p className="text-sm text-gray-400">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-white cursor-pointer hover:underline"
            >
              Log in now.
            </span>
          </p>
          <p className="text-xs text-gray-500 mt-2">
            This page is protected by Google reCAPTCHA to ensure you're not a bot.
            <a href="#" className="text-blue-500 hover:underline ml-1">
              Learn more.
            </a>
          </p>
        </div>
      </form>
    </div>
  );
}