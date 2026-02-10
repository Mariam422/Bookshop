import Navbar from "./Navbar";
import Hero from "./Hero";

export default function Header() {
  return (
    <header className="relative">
      <div
        className="
        relative h-screen w-full
        bg-[url('/libarayjpg.png')] bg-cover
      "
      ></div>
      <div className="absolute inset-0 bg-black/60"></div>
      <Navbar />
    </header>
  );
}
