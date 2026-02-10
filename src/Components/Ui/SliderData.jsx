import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/free-mode";

export default function SliderData({ bestSelling }) {
  const books =
    bestSelling && bestSelling.length > 0
      ? bestSelling
      : [
          { image: "/RichDad.png", bookName: "Rich Dad" },
          { image: "/Design.png", bookName: "Design" },
          { image: "/Power.png", bookName: "Power" },
          { image: "/TheCraft.png", bookName: "The Craft" },
          { image: "/thinking.png", bookName: "Thinking" },
          { image: "/The7.png", bookName: "The 7 Habits" },
          { image: "/TheAlchemist.png", bookName: "The Alchemist" },
        ];

  return (
    <section className="py-16 bg-[#2C243A]">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h3 className="text-3xl md:text-4xl font-bold text-white">
          Best Seller
        </h3>

        <p className="text-gray-300 mt-3 mb-10 max-w-2xl mx-auto">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris et
          ultricies est. Aliquam in justo varius, sagittis neque ut, malesuada
          leo.
        </p>

        <Swiper
          modules={[FreeMode, Autoplay]}
          freeMode
          autoplay={{ delay: 1500, disableOnInteraction: false }}
          spaceBetween={20}
          slidesPerView={6}
          breakpoints={{
            0: { slidesPerView: 2 },
            640: { slidesPerView: 3 },
            768: { slidesPerView: 4 },
            1024: { slidesPerView: 6 },
          }}
        >
          {books.map((book, index) => (
            <SwiperSlide key={index}>
              <img
                src={book.image}
                alt={book.bookName}
                className="w-full h-56 object-contain"
              />
            </SwiperSlide>
          ))}

          <Link to="/shopnow">
            <button className="mt-12 bg-pink-600 hover:bg-pink-700 text-white px-8 py-3 rounded-full font-semibold transition">
              Shop Now
            </button>
          </Link>
        </Swiper>
      </div>
    </section>
  );
}
