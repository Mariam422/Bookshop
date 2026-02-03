import React from "react";
import { Link, NavLink } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="w-full bg-[#3B2F4A] text-white py-8 px-5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <Link to="/" className="flex items-center gap-2 text-xl font-semibold">
          <img
            src="/logo.png"
            alt="Bookshop Logo"
            className="w-8 h-8 object-contain"
          />
          <span>Bookshop</span>
        </Link>

        <ul className="flex flex-col md:flex-row gap-4 md:gap-8 text-sm font-light">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "text-orange-500" : "hover:text-pink-400 transition"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/books"
            className={({ isActive }) =>
              isActive ? "text-orange-500" : "hover:text-pink-400 transition"
            }
          >
            Books
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? "text-orange-500" : "hover:text-pink-400 transition"
            }
          >
            About us
          </NavLink>
        </ul>

        <div className="flex flex-col items-center gap-3">
          <div className="flex items-center gap-6">
            <img
              src="/Face.png"
              alt="logos:facebook Logo"
              className="w-5 h-8 object-contain"
            />

            <img
              src="/insta.png"
              alt="logos:instagram Logo"
              className="w-5 h-8 object-contain"
            />

            <img
              src="/youtube.png"
              alt="logos:youtube Logo"
              className="w-5 h-8 object-contain"
            />
            <img
              src="/Vector (6).png"
              alt="logos:X-Twitter Logo"
              className="w-5 h-8 object-contain"
            />
          </div>
        </div>
      </div>

      <hr className="my-6 border-gray-400/50" />
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-xs">&copy; 2024 EraaSoft. All Rights Reserved.</p>
        <div className="flex items-center gap-2 text-xs border border-gray-500 px-2 py-1 rounded-xl cursor-pointer">
          <select className="bg-[#3B2F4A] text-xs text-gray-500 focus:outline-none">
            <option>Arabic</option>
            <option>English</option>
          </select>
        </div>
      </div>
    </footer>
  );
}
