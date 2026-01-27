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
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import About from "./Pages/About/About";
import Books from "./Pages/Books/Books";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* أول ما يفتح الموقع */}
        <Route index element={<Home />} />

        {/* باقي الصفحات */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="books" element={<Books />} />
        <Route path="about" element={<About />} />

        {/* لو دخل لينك غلط */}
        <Route path="*" element={<Navigate to="/" />} />
      </Route>
    </Routes>
  );
}

export default App;
