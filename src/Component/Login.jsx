import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserByEmail } from "../Component/api/api";
import { ToastContainer, toast } from "react-toastify";
// Helper component for the Netflix-style Input Field (Floating Label)
const NetflixInput = ({ id, type, placeholder, value, onChange }) => (
  <div className="relative mb-6">
    <input
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      placeholder=" "
      required
      className="
        peer
        w-full
        h-14
        px-4
        pt-6
        rounded-md
        bg-gray-700/70
        text-white
        border
        border-gray-700
        focus:outline-none
        focus:border-white
        focus:bg-gray-700
      "
    />

    <label
      htmlFor={id}
      className="
        absolute
        left-4
        top-1/2
        -translate-y-1/2
        text-gray-400
        text-base
        pointer-events-none
        transition-all
        duration-200

        peer-focus:top-2
        peer-focus:text-xs
        peer-focus:text-white
        peer-focus:translate-y-0

        peer-not-placeholder-shown:top-2
        peer-not-placeholder-shown:text-xs
        peer-not-placeholder-shown:text-white
        peer-not-placeholder-shown:translate-y-0
      "
    >
      {placeholder}
    </label>
  </div>
);



export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      toast.error("Please enter a valid email address.");
      return;
    }

    try {
      const user = await getUserByEmail(trimmedEmail);

      if (!user) {
        toast.error("No account found. Please register first.");
        navigate("/");
        return;
      }

      if (user.password !== password) {
        toast.error("Wrong password!");
        return;
      }

      // ✅ SAVE LOGIN
      localStorage.setItem("user", JSON.stringify(user));

      toast.success("Login successful!");
      navigate("/banner"); // 🔥 AUTO REDIRECT
    } catch (error) {
      console.error("Login error:", error);
      toast.error("An error occurred during login.");
    }
  };

  return (
    // Background container - Unchanged
    <div
      className="relative min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: `url('https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/f562aaf4-5dbb-4603-a32b-6ef6c2230136/dh0w8qv-9d8ee6b2-b41a-4681-ab9b-8a227560dc75.jpg/v1/fill/w_1192,h_670,q_70,strp/the_netflix_login_background__canada__2024___by_logofeveryt_dh0w8qv-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NzIwIiwicGF0aCI6Ii9mL2Y1NjJhYWY0LTVkYmItNDYwMy1hMzJiLTZlZjZjMjIzMDEzNi9kaDB3OHF2LTlkOGVlNmIyLWI0MWEtNDY4MS1hYjliLThhMjI3NTYwZGM3NS5qcGciLCJ3aWR0aCI6Ijw9MTI4MCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.FScrpAAFnKqBVKwe2syeiOww6mfH6avq-DRHZ_uFVNw')`,
      }}
    >
      {/* Dark overlay - Unchanged */}
      <div className="absolute inset-0 bg-black/70"></div>

      {/* Netflix-Style Form Card */}
      <form
        onSubmit={handleLogin}
        // Netflix card style: solid black with larger padding
        className="relative z-10 bg-black/80 p-16 rounded w-full max-w-md text-black shadow-2xl"
      >
        <h1 className="text-3xl font-bold mb-8">Sign In</h1>

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

        {/* Sign In Button (The Big Red One) */}
        <button className="w-full bg-red-600 hover:bg-red-700 py-3 rounded font-semibold text-xl mt-4 transition duration-200">
          Sign In
        </button>

        {/* Help/Remember Me and Sign Up Link */}
        <div className="flex justify-between items-center text-sm text-gray-400 mt-3 mb-10">
          <div className="flex items-center">
            <input type="checkbox" id="remember" className="mr-2 bg-gray-700 border-gray-600 focus:ring-red-600" />
            <label htmlFor="remember">Remember me</label>
          </div>
          <a href="#" className="hover:underline">Need help?</a>
        </div>
        
        {/* Sign Up Link and ReCAPTCHA Info */}
        <div className="mt-6">
          <p className="text-base text-gray-400">
            New to Netflix?{" "}
            <span
              onClick={() => navigate("/")}
              className="text-white cursor-pointer hover:underline font-medium"
            >
              Sign up now.
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