// import { Routes, Route, Navigate } from "react-router-dom";
// import Layout from "./Components/Layout/Layout";
// import Home from "./Pages/Home/Home";
// import Login from "./Pages/Login/Login";
// import Register from "./Pages/Register/Register";
// import About from "./Pages/About/About";
// import Books from "./Pages/Books/Books";
// import Hero from "./Components/Header/Hero";
// import Navbar from "./Components/Header/Navbar";

// function App() {
//   return (
//     <Routes>
//       <Route element={<Layout />}>
//         <Route index element={<Navigate to="/home" />} />
//         <Route path="/" element={<Home />} />
//         <Route path="/hero" element={<Hero />} />
//         <Route path="/navbar" element={<Navbar />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/books" element={<Books />} />
//         <Route path="/about" element={<About />} />
//       </Route>
//     </Routes>
//   );
// }

// export default App;

import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Auth/Login/Login";
import Register from "./Pages/Auth/Register/Register";
import About from "./Pages/About/About";
import Books from "./Pages/Books/Books";
import ShopNow from "./Pages/Home/ShopNow";
import ForgetPassword from "./Pages/Auth/Forget-Password/ForgetPassword";
import ResetPassword from "./Pages/Auth/Reset-Password/ResetPassword";
import NewPassword from "./Pages/Auth/New-Password/NewPassword";
import Profile from "./Pages/Auth/Profile/Profile";
import ProductDetails from "./Pages/Books/ProductDetails/ProductDetails";
import Cart from "./Pages/Cart/Cart";
import Wishlist from "./Pages/Wishlist/Wishlist";
import Checkout from "./Pages/Checkout/Checkout";
import { Toaster } from "react-hot-toast";
import Success from "./Pages/Success/Success";
import OrderHistory from "./Pages/OrderHistory/OrderHistory";

function App() {
  return (
    <>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/ForgetPassword" element={<ForgetPassword />} />
          <Route path="/ResetPassword" element={<ResetPassword />} />
          <Route path="/NewPassword" element={<NewPassword />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/books" element={<Books />} />
          <Route path="/books/:id" element={<ProductDetails />} />
          <Route path="/about" element={<About />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/success" element={<Success />} />
          <Route path="/orders" element={<OrderHistory/>} />

          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
