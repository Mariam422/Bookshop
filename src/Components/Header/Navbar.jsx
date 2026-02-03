import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react"; 

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="absolute top-0 left-0 w-full z-50">
      <div className="flex items-center justify-between px-6 md:px-10 py-5 bg-white/20 text-white">

        <Link
          to="/"
          className="flex items-center gap-2 text-xl font-semibold tracking-wide"
        >
          <img
            src="/logo.png"
            alt="Bookshop Logo"
            className="w-8 h-8 object-contain"
          />
          <span>Bookshop</span>
        </Link>

        <ul className="hidden md:flex gap-8 text-sm font-light">
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


        <div className="hidden md:flex gap-3">
          <Link
            to="/login"
            className="bg-pink-600 hover:bg-pink-700 transition px-4 py-1.5 rounded-md text-sm"
          >
            Log in
          </Link>
          <Link
            to="/register"
            className="bg-white text-pink-600 hover:bg-gray-100 transition px-4 py-1.5 rounded-md text-sm font-medium"
          >
            Sign Up
          </Link>
        </div>


        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>


      {isOpen && (
        <div className="md:hidden bg-white/90 text-black px-6 py-4 space-y-3">
          <NavLink
            to="/"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              isActive ? "text-orange-500 block" : "hover:text-pink-400 block"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/books"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              isActive ? "text-orange-500 block" : "hover:text-pink-400 block"
            }
          >
            Books
          </NavLink>
          <NavLink
            to="/about"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              isActive ? "text-orange-500 block" : "hover:text-pink-400 block"
            }
          >
            About us
          </NavLink>

          <Link
            to="/login"
            onClick={() => setIsOpen(false)}
            className="block bg-pink-600 hover:bg-pink-700 transition px-4 py-2 rounded-md text-sm text-white text-center"
          >
            Log in
          </Link>
          <Link
            to="/register"
            onClick={() => setIsOpen(false)}
            className="block bg-white text-pink-600 hover:bg-gray-100 transition px-4 py-2 rounded-md text-sm font-medium text-center"
          >
            Sign Up
          </Link>
        </div>
      )}
    </nav>
  );
}
