import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="absolute top-0 left-0 w-full z-50">
      <div className="flex items-center bg-white/20 justify-between px-10 py-5 text-white">
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

        <ul className="flex gap-8 text-sm font-light">
          <NavLink to="/" className="hover:text-pink-400 transition">
            Home
          </NavLink>
          <NavLink to="/books" className="hover:text-pink-400 transition">
            Books
          </NavLink>
          <NavLink to="/about" className="hover:text-pink-400 transition">
            About us
          </NavLink>
        </ul>

        <div className="flex gap-3">
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
      </div>
    </nav>
  );
}
