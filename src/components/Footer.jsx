import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      
      <div className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-8">
        
        {/* BRAND */}
        <div>
          <h2 className="text-xl font-semibold text-white mb-3">
            ShoppingHub
          </h2>
          <p className="text-sm text-gray-400">
            Fresh and organic products delivered to your doorstep with love and care.
          </p>
        </div>

        {/* LINKS */}
        <div>
          <h3 className="text-white font-medium mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-white cursor-pointer transition">Home</li>
            <li className="hover:text-white cursor-pointer transition">Products</li>
            <li className="hover:text-white cursor-pointer transition">Categories</li>
            <li className="hover:text-white cursor-pointer transition">Contact</li>
          </ul>
        </div>

        {/* SOCIALS */}
        <div>
          <h3 className="text-white font-medium mb-3">Follow Us</h3>
          <div className="flex gap-4">
            
            {/* Instagram */}
            <a
              href="https://www.instagram.com/?hl=en"
              className="p-2 bg-gray-800 rounded-full hover:bg-pink-500 transition"
            >
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17" cy="7" r="1" />
              </svg>
            </a>

            {/* Facebook */}
            <a
              href="https://www.facebook.com/"
              className="p-2 bg-gray-800 rounded-full hover:bg-blue-600 transition"
            >
              <svg
                className="w-5 h-5 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M22 12a10 10 0 1 0-11.5 9.9v-7h-2.3v-2.9h2.3V9.4c0-2.3 1.4-3.6 3.5-3.6 1 0 2 .2 2 .2v2.2h-1.1c-1.1 0-1.4.7-1.4 1.4v1.7h2.4l-.4 2.9h-2v7A10 10 0 0 0 22 12z" />
              </svg>
            </a>

            {/* Twitter */}
            <a
              href="https://x.com/"
              className="p-2 bg-gray-800 rounded-full hover:bg-blue-400 transition"
            >
              <svg
                className="w-5 h-5 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M22 5.9c-.7.3-1.5.5-2.3.6a4 4 0 0 0 1.8-2.2 7.8 7.8 0 0 1-2.5 1A4 4 0 0 0 12 8.1a11.3 11.3 0 0 1-8.2-4.2 4 4 0 0 0 1.2 5.4c-.6 0-1.2-.2-1.7-.5v.1a4 4 0 0 0 3.2 3.9c-.5.1-1 .2-1.5.1a4 4 0 0 0 3.7 2.8A8 8 0 0 1 2 18.6a11.3 11.3 0 0 0 6.1 1.8c7.3 0 11.3-6.1 11.3-11.3v-.5c.8-.6 1.4-1.3 1.9-2.1z" />
              </svg>
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/uas/login"
              className="p-2 bg-gray-800 rounded-full hover:bg-blue-700 transition"
            >
              <svg
                className="w-5 h-5 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M6.9 6.5a2.3 2.3 0 1 1 0-4.6 2.3 2.3 0 0 1 0 4.6zM4.7 8.5h4.4V22H4.7zM14.3 8.5h4.2v1.8h.1a4.6 4.6 0 0 1 4.1-2.3c4.4 0 5.2 2.9 5.2 6.7V22h-4.4v-6.5c0-1.6 0-3.7-2.3-3.7s-2.6 1.8-2.6 3.6V22h-4.4z" />
              </svg>
            </a>

          </div>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="border-t border-gray-700 text-center py-4 text-sm text-gray-400">
        © {new Date().getFullYear()} Khushi Khairnar. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;