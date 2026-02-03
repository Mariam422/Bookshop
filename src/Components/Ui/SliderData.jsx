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
          freeMode={true}
          autoplay={{ delay: 1500 }}
          spaceBetween={20}
          slidesPerView={6}
          breakpoints={{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 4 },
            1024: { slidesPerView: 6 },
          }}
        >
          <SwiperSlide>
            <img src="/RichDad.png" className="w-full h-56 object-contain" />
          </SwiperSlide>

          <SwiperSlide>
            <img src="/theDesign.png" className="w-full h-56 object-contain" />
          </SwiperSlide>

          <SwiperSlide>
            <img src="/Power.png" className="w-full h-56 object-contain" />
          </SwiperSlide>

          <SwiperSlide>
            <img src="/TheCraft.png" className="w-full h-56 object-contain" />
          </SwiperSlide>

          <SwiperSlide>
            <img src="/Design.png" className="w-full h-56 object-contain" />
          </SwiperSlide>

          <SwiperSlide>
            <img src="/thinking.png" className="w-full h-56 object-contain" />
          </SwiperSlide>

          <SwiperSlide>
            <img src="/The7.png" className="w-full h-56 object-contain" />
          </SwiperSlide>

          <SwiperSlide>
            <img
              src="/TheAlchemist.png"
              className="w-full h-56 object-contain"
            />
          </SwiperSlide>

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
