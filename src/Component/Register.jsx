import { useState } from "react";
import { registerUser, getUserByEmail } from "../Component/api/api";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

// Helper component for the Modern Input Field
const ModernInput = ({ id, type, placeholder, value, onChange, icon }) => (
  <div className="relative mb-6 group">
    <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-pink-500/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    <div className="relative bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-4 transition-all duration-300 hover:bg-white/15 hover:border-white/30 focus-within:bg-white/20 focus-within:border-red-400/50">
      <div className="flex items-center">
        {icon && (
          <div className="text-gray-400 mr-3 group-hover:text-red-400 transition-colors duration-300">
            {icon}
          </div>
        )}
        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required
          className="w-full bg-transparent text-white placeholder-gray-400 focus:outline-none focus:placeholder-gray-300 text-lg"
        />
      </div>
    </div>
  </div>
);

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    const trimmedEmail = email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!trimmedEmail) {
      toast.error("Please enter an email address.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }

    if (!emailRegex.test(trimmedEmail)) {
      toast.error("Please enter a valid email address.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }

    try {
      const existingUser = await getUserByEmail(trimmedEmail);

      if (existingUser) {
        toast.info("Account already exists. Please login instead.", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        navigate("/login");
        return;
      }

      const createdUser = await registerUser({ email: trimmedEmail, password });

      if (!createdUser) {
        toast.error("Registration failed. Please try again.", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        return;
      }

      toast.success("Registration completed successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      setEmail("");
      setPassword("");
      navigate("/login");
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("An error occurred during registration. Please try again.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  return (
    <div className="min-h-screen relative bg-black selection:bg-[#e50914] selection:text-white flex flex-col">
      {/* Background Image & Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center opacity-50 sm:opacity-100 hidden sm:block"
        style={{ backgroundImage: `url('https://assets.nflxext.com/ffe/siteui/vlv3/9d3533b2-0e2b-40b2-95e0-eca792289525/eb312f2c-cb0b-468f-aa14-6ed5ed51d02c/US-en-20240311-popsignuptwoweeks-perspective_alpha_website_large.jpg')` }}
      ></div>
      
      {/* Heavy gradient overlay to darken the background image */}
      <div className="absolute inset-0 z-0 bg-black/60 sm:bg-gradient-to-b sm:from-black/80 sm:via-black/50 sm:to-black/80"></div>

      {/* Netflix Logo Area (Top Left) */}
      <div className="relative z-10 px-4 sm:px-12 py-6">
        <h1 className="text-[#e50914] text-3xl sm:text-5xl font-black tracking-tight cursor-pointer" onClick={() => navigate("/")}>
          NETFLIX
        </h1>
      </div>

      {/* Register Form Container */}
      <div className="relative z-10 flex flex-1 items-center justify-center px-4 sm:px-0 sm:pb-24">
        <div className="w-full max-w-[450px] sm:bg-black/80 sm:p-16 rounded-md">
          
          <h2 className="text-3xl font-bold text-white mb-8">Sign Up</h2>

          <form onSubmit={handleRegister} className="flex flex-col gap-4">
            
            {/* Email Input */}
            <div className="relative">
              <input
                id="email"
                type="email"
                required
                className="w-full bg-[#333333] text-white rounded px-4 pt-5 pb-2 focus:outline-none focus:bg-[#454545] peer transition-colors"
                placeholder=" "
                value={email}
                onChange={(e) => setEmail(e.target.value.trim())}
              />
              <label 
                htmlFor="email" 
                className="absolute text-gray-400 text-sm top-4 left-4 transition-all peer-focus:text-xs peer-focus:top-1.5 peer-valid:text-xs peer-valid:top-1.5 cursor-text"
              >
                Email address
              </label>
            </div>

            {/* Password Input */}
            <div className="relative">
              <input
                id="password"
                type="password"
                required
                className="w-full bg-[#333333] text-white rounded px-4 pt-5 pb-2 focus:outline-none focus:bg-[#454545] peer transition-colors"
                placeholder=" "
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label 
                htmlFor="password" 
                className="absolute text-gray-400 text-sm top-4 left-4 transition-all peer-focus:text-xs peer-focus:top-1.5 peer-valid:text-xs peer-valid:top-1.5 cursor-text"
              >
                Create a password
              </label>
            </div>

            {/* Sign Up Button */}
            <button
              type="submit"
              className="w-full bg-[#e50914] hover:bg-[#c11119] text-white font-bold py-3.5 rounded mt-4 transition-colors"
            >
              Sign Up
            </button>

            {/* Terms & Conditions */}
            <div className="flex items-start text-[#b3b3b3] text-sm mt-2">
              <label className="flex items-start cursor-pointer hover:text-white transition-colors">
                <input 
                  type="checkbox"
                  required 
                  className="mr-2 mt-1 w-4 h-4 accent-[#737373] bg-[#333] border-none rounded-sm shrink-0" 
                />
                <span className="leading-snug">
                  I agree to the <a href="#" className="hover:underline text-[#0071eb]">Terms of Service</a> and <a href="#" className="hover:underline text-[#0071eb]">Privacy Policy</a>.
                </span>
              </label>
            </div>
          </form>

          {/* Footer Area */}
          <div className="mt-12 sm:mt-16">
            <p className="text-[#737373] text-md">
              Already have an account?{" "}
              <span
                onClick={() => navigate("/login")}
                className="text-white hover:underline cursor-pointer font-medium"
              >
                Sign in now.
              </span>
            </p>
            <p className="text-[#8c8c8c] text-xs mt-4 leading-snug">
              This page is protected by Google reCAPTCHA to ensure you're not a bot.{" "}
              <a href="#" className="text-[#0071eb] hover:underline">
                Learn more.
              </a>
            </p>
          </div>

        </div>
      </div>
      <ToastContainer />
    </div>
  );
}