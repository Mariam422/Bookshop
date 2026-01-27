import Navbar from "./Navbar";
import Hero from "./Hero";

export default function Header() {
  return (
    <header className="relative">
      <Hero />
      <Navbar />
    </header>
  );
}
