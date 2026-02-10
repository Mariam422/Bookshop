// import { useState } from "react";
// import { Link, NavLink } from "react-router-dom";
// import { Menu, X } from "lucide-react";
// import { ResetStore } from "../../Pages/Auth/passwordResetStore/resetStore";

// export default function Navbar() {
//   const [isOpen, setIsOpen] = useState(false);
//   const user = ResetStore((state) => state.user);

//   return (
//     <nav className="absolute top-0 left-0 w-full z-50">
//       <div className="flex items-center justify-between px-6 md:px-10 py-5 bg-white/20 text-white">

//         <Link
//           to="/"
//           className="flex items-center gap-2 text-xl font-semibold tracking-wide"
//         >
//           <img
//             src="/logo.png"
//             alt="Bookshop Logo"
//             className="w-8 h-8 object-contain"
//           />
//           <span>Bookshop</span>
//         </Link>

//         <ul className="hidden md:flex gap-8 text-sm font-light">
//           <NavLink
//             to="/"
//             className={({ isActive }) =>
//               isActive ? "text-orange-500" : "hover:text-pink-400 transition"
//             }
//           >
//             Home
//           </NavLink>
//           <NavLink
//             to="/books"
//             className={({ isActive }) =>
//               isActive ? "text-orange-500" : "hover:text-pink-400 transition"
//             }
//           >
//             Books
//           </NavLink>
//           <NavLink
//             to="/about"
//             className={({ isActive }) =>
//               isActive ? "text-orange-500" : "hover:text-pink-400 transition"
//             }
//           >
//             About us
//           </NavLink>
//         </ul>

//         <div className="hidden md:flex gap-3">
//           <Link
//             to="/login"
//             className="bg-pink-600 hover:bg-pink-700 transition px-4 py-1.5 rounded-md text-sm"
//           >
//             Log in
//           </Link>
//           <Link
//             to="/register"
//             className="bg-white text-pink-600 hover:bg-gray-100 transition px-4 py-1.5 rounded-md text-sm font-medium"
//           >
//             Sign Up
//           </Link>
//         </div>

//         <div className="md:hidden">
//           <button onClick={() => setIsOpen(!isOpen)}>
//             {isOpen ? <X size={24} /> : <Menu size={24} />}
//           </button>
//         </div>
//       </div>

//       {isOpen && (
//         <div className="md:hidden bg-white/90 text-black px-6 py-4 space-y-3 transition-all duration-300">
//           <NavLink
//             to="/"
//             onClick={() => setIsOpen(false)}
//             className={({ isActive }) =>
//               isActive ? "text-orange-500 block" : "hover:text-pink-400 block"
//             }
//           >
//             Home
//           </NavLink>
//           <NavLink
//             to="/books"
//             onClick={() => setIsOpen(false)}
//             className={({ isActive }) =>
//               isActive ? "text-orange-500 block" : "hover:text-pink-400 block"
//             }
//           >
//             Books
//           </NavLink>
//           <NavLink
//             to="/about"
//             onClick={() => setIsOpen(false)}
//             className={({ isActive }) =>
//               isActive ? "text-orange-500 block" : "hover:text-pink-400 block"
//             }
//           >
//             About us
//           </NavLink>

//           <Link
//             to="/login"
//             onClick={() => setIsOpen(false)}
//             className="block bg-pink-600 hover:bg-pink-700 transition px-4 py-2 rounded-md text-sm text-white text-center"
//           >
//             Log in
//           </Link>
//           <Link
//             to="/register"
//             onClick={() => setIsOpen(false)}
//             className="block bg-white text-pink-600 hover:bg-gray-100 transition px-4 py-2 rounded-md text-sm font-medium text-center"
//           >
//             Sign Up
//           </Link>
//         </div>
//       )}
//     </nav>
//   );
// }
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, Heart } from "lucide-react";
import { AuthStore } from "../../Pages/Auth/AuthStore";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = AuthStore();

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

        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <>
              <div className="flex items-center gap-2 bg-white px-3 py-1 rounded-full shadow">
                <img
                  src={user?.image === "default" ? "/avatar.png" : user?.image}
                  alt="User Avatar"
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div className="flex flex-col">
                  <span className="text-black text-sm font-medium">
                    {user?.first_name} {user?.last_name}
                  </span>
                  <span className="text-gray-500 text-xs">{user?.email}</span>
                </div>
              </div>
              <button className="p-2 rounded-full hover:bg-pink-100 transition">
                <Heart size={20} className="text-pink-600" />
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="bg-pink-600 hover:bg-pink-700 transition px-4 py-1.5 rounded-md text-sm text-white"
              >
                Log in
              </Link>
              <Link
                to="/register"
                className="bg-white text-pink-600 hover:bg-gray-100 transition px-4 py-1.5 rounded-md text-sm font-medium"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white/90 text-black px-6 py-4 space-y-3 transition-all duration-300">
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

          {user ? (
            <div className="flex items-center gap-2 mt-3">
              <img
                src={user?.image === "default" ? "/avatar.png" : user?.image}
                alt="User Avatar"
                className="w-8 h-8 rounded-full object-cover"
              />
              <div className="flex flex-col">
                <span className="text-black font-medium text-sm">
                  {user?.first_name} {user?.last_name}
                </span>
                <span className="text-gray-500 text-xs">{user?.email}</span>
              </div>
              <Heart size={20} className="text-pink-600" />
            </div>
          ) : (
            <>
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="block bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-md text-center"
              >
                Log in
              </Link>
              <Link
                to="/register"
                onClick={() => setIsOpen(false)}
                className="block bg-white text-pink-600 hover:bg-gray-100 px-4 py-2 rounded-md text-center"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
