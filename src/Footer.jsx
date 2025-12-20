import React from "react";
import { motion } from "framer-motion";
import { Twitter, Facebook, Instagram, Github, Send } from "lucide-react";

const Footer = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 },
  };

  return (
    <footer className="bg-black text-white overflow-hidden w-full">
      <div className="py-10 sm:pt-16 lg:pt-24">
        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-2 md:col-span-3 lg:grid-cols-6 gap-y-16 gap-x-12">
            
            {/* Brand Section */}
            <motion.div 
              {...fadeInUp}
              className="col-span-2 md:col-span-3 lg:col-span-2 lg:pr-8"
            >
             <h1 className="text-3xl font-bold tracking-wide text-white">
    ZoeLume
  </h1>
              <p className="text-base leading-relaxed text-gray-400 mt-7">
                Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
                sint. Velit officia consequat duis enim velit mollit.
              </p>
              <ul className="flex items-center space-x-3 mt-9">
                {[
                  { Icon: Twitter, color: "hover:bg-blue-400" },
                  { Icon: Facebook, color: "hover:bg-blue-600" },
                  { Icon: Instagram, color: "hover:bg-pink-600" },
                  { Icon: Github, color: "hover:bg-gray-700" },
                ].map((social, index) => (
                  <motion.li key={index} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <a
                      href="#"
                      className={`flex items-center justify-center text-white transition-all duration-300 bg-gray-800 rounded-full w-10 h-10 ${social.color}`}
                    >
                      <social.Icon size={18} />
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Company Links */}
            <motion.div {...fadeInUp} transition={{ delay: 0.1 }}>
              <p className="text-sm font-semibold tracking-widest text-gray-500 uppercase">
                Company
              </p>
              <ul className="mt-6 space-y-4">
                {["About", "Features", "Works", "Career"].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-base text-gray-300 transition-all duration-200 hover:text-blue-500 hover:pl-2">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Help Links */}
            <motion.div {...fadeInUp} transition={{ delay: 0.2 }}>
              <p className="text-sm font-semibold tracking-widest text-gray-500 uppercase">
                Help
              </p>
              <ul className="mt-6 space-y-4">
                {["Support", "Delivery", "Terms", "Privacy"].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-base text-gray-300 transition-all duration-200 hover:text-blue-500 hover:pl-2">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Newsletter */}
            <motion.div 
              {...fadeInUp} 
              transition={{ delay: 0.3 }}
              className="col-span-2 md:col-span-1 lg:col-span-2 lg:pl-8"
            >
              <p className="text-sm font-semibold tracking-widest text-gray-500 uppercase">
                Subscribe to newsletter
              </p>
              <form className="mt-6">
                <div className="relative group">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="block w-full p-4 text-white placeholder-gray-500 bg-gray-900 border border-gray-800 rounded-md focus:outline-none focus:border-blue-600 transition-all"
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="inline-flex items-center justify-center w-full px-6 py-4 mt-3 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-all"
                >
                  Subscribe <Send size={16} className="ml-2" />
                </motion.button>
              </form>
            </motion.div>
          </div>

          <hr className="mt-16 mb-10 border-gray-800" />
          <p className="text-sm text-center text-gray-500">
            © Copyright 2025, All Rights Reserved by Postcraft
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
