import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Standard SVG Icons
const UserIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const PencilIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
  </svg>
);

const LogoutIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
  </svg>
);

export default function Profile() {
  const navigate = useNavigate();

  const [user, setUser] = useState({ name: "", email: "" });
  const [editMode, setEditMode] = useState(false);
  const [tempName, setTempName] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      const parsedUser = JSON.parse(stored);
      setUser(parsedUser);
      setTempName(parsedUser.name);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const saveProfile = () => {
    const newUser = { ...user, name: tempName };
    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
    setEditMode(false);
  };

  const cancelEdit = () => {
    setTempName(user.name);
    setEditMode(false);
  };

  const modalTransitionClasses = editMode ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none";

  return (
    <div className="min-h-screen bg-black font-sans flex items-start justify-center p-6 sm:p-12">
      {/* Profile Card Container */}
      <div className="group w-full max-w-lg mt-16 bg-gray-900 text-white rounded-xl shadow-lg border border-gray-700 overflow-hidden transition-all duration-300 ease-in-out hover:shadow-2xl hover:translate-y-[-4px]">
        
        {/* Header/Banner Area */}
        <div className="h-20 bg-blue-600/10 relative">
          <div className="absolute inset-0 bg-cover bg-center opacity-5" />
        </div>

        {/* Profile Content Area */}
        <div className="p-6 -mt-10">
          <div className="flex flex-col items-center text-center">
            <div className="mb-4">
              <UserIcon 
                className="h-24 w-24 text-blue-400 bg-gray-900 rounded-full p-1 border-4 border-gray-900 shadow-md transition-transform duration-300 hover:scale-110 hover:rotate-6" 
              />
            </div>
            
            <h1 className="text-3xl font-semibold mt-2 transition-colors duration-300 group-hover:text-blue-400">
              {user.name || "Guest User"}
            </h1>
            <p className="text-md text-gray-400 mt-1">
              {user.email || "Email Not Provided"}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 pt-6 border-t border-gray-700 flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => setEditMode(true)}
              className="flex-1 flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white py-2.5 px-6 rounded-lg font-medium transition duration-200 transform hover:scale-[1.01] active:scale-95 shadow-md shadow-blue-500/20"
            >
              <PencilIcon className="h-5 w-5" />
              <span>Edit Name</span>
            </button>
            <button
              onClick={logout}
              className="flex-1 flex items-center justify-center space-x-2 bg-gray-800 hover:bg-gray-700 text-white py-2.5 px-6 rounded-lg font-medium border border-gray-600 transition duration-200 transform hover:scale-[1.01] active:scale-95"
            >
              <LogoutIcon className="h-5 w-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* EDIT PROFILE MODAL */}
      <div 
        className={`fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50 transition-opacity duration-300 ${editMode ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      >
        <div 
          className={`bg-gray-900 text-white p-8 rounded-xl w-full max-w-sm border border-blue-600/30 shadow-2xl transition-transform duration-300 ease-out ${modalTransitionClasses}`}
        >
          <h2 className="text-2xl font-semibold mb-6 border-b border-gray-700 pb-3">Update Profile</h2>
          
          <label htmlFor="name-input" className="block text-sm font-medium mb-2">
              Display Name
          </label>
          <input
            id="name-input"
            value={tempName}
            onChange={(e) => setTempName(e.target.value)}
            placeholder="Your Name"
            className="w-full p-3 mb-6 rounded-lg bg-gray-800 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
          />

          <div className="flex gap-3 mt-4">
            <button
              onClick={saveProfile}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition duration-200 transform active:scale-95 shadow-md"
            >
              Save
            </button>
            <button
              onClick={cancelEdit}
              className="flex-1 border border-gray-600 py-3 rounded-lg text-white hover:bg-gray-800 transition duration-200 transform active:scale-95 font-medium"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
