import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { AiFillStar } from "react-icons/ai";
import { ChevronLeft, ChevronRight } from "lucide-react";
import BookCard from "./BookCard";

const books = [
  {
    id: 1,
    title: "Rich Dad",
    author: "Robert T. Kiyosaki",
    price: 30,
    oldPrice: 45,
    rate: 4.2,
    reviews: 180,
    left: 4,
    total: 10,
    image: "/RichDad.png",
  },
  {
    id: 2,
    title: "Rich Dad",
    author: "Robert T. Kiyosaki",
    price: 30,
    oldPrice: 45,
    rate: 4.2,
    reviews: 180,
    left: 6,
    total: 10,
    image: "/RichDad.png",
  },
  {
    id: 3,
    title: "Rich Dad",
    author: "Robert T. Kiyosaki",
    price: 30,
    oldPrice: 45,
    rate: 4.2,
    reviews: 180,
    left: 2,
    total: 10,
    image: "/RichDad.png",
  },
  {
    id: 4,
    title: "Rich Dad",
    author: "Robert T. Kiyosaki",
    price: 30,
    oldPrice: 45,
    rate: 4.2,
    reviews: 180,
    left: 8,
    total: 10,
    image: "/RichDad.png",
  },
];

export default function FlashSale({ flashSales }) {
  // if (!flashSales || flashSales.lenght === 0)
    const totalTime = 30 * 60;
    const [timeLeft, setTimeLeft] = useState(totalTime);

    useEffect(() => {
      const timer = setInterval(() => {
        setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
      return () => clearInterval(timer);
    }, []);

    const formatTime = (seconds) => {
      const m = Math.floor(seconds / 60);
      const s = seconds % 60;
      return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
    };

    const radius = 28;
    const circumference = 2 * Math.PI * radius;
    const progressPercent = timeLeft / totalTime;
    const dashOffset = circumference * (1 - progressPercent);

    return (
      // <section className="px-10 py-16 bg-pink-50">
      //   <h2 className="text-2xl font-semibold mb-6">Flash Sale</h2>
      //   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      //     {flashSales.map((book) => (
      //       <BookCard key={book.bookId} book={book} />
      //     ))}
      //   </div>
      // </section>

      <section className="py-25 px-5 bg-gray-100">
        <div className="flex justify-between items-center mb-8 max-w-5xl mx-auto">
          <div>
            <h2 className="text-2xl font-bold">Flash Sale</h2>
            <p className="text-gray-500 text-sm mt-1 max-w-md">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris et
              ultricies est. Aliquam in justo varius, sagittis neque ut, malesuada
              leo.
            </p>
          </div>

          <div className="relative w-16 h-16">
            <svg className="rotate-[-90deg]" width="100%" height="100%">
              <circle
                cx="50%"
                cy="50%"
                r={radius}
                stroke="#ddd"
                strokeWidth="4"
                fill="none"
              />
              <circle
                cx="50%"
                cy="50%"
                r={radius}
                stroke="#ec4899"
                strokeWidth="4"
                fill="none"
                strokeDasharray={circumference}
                strokeDashoffset={dashOffset}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center text-black font-bold text-sm">
              {formatTime(timeLeft)}
            </div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto relative">
          <Swiper
            modules={[Navigation]}
            spaceBetween={20}
            slidesPerView={1}
            onBeforeInit={(swiper) => {
              swiper.params.navigation.prevEl = ".custom-prev";
              swiper.params.navigation.nextEl = ".custom-next";
            }}
            navigation
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
            }}
          >
            {books.map((book) => (
              <SwiperSlide key={book.id} className="flex justify-center">
                <div className="flex flex-col sm:flex-row bg-[#2C243A] text-white rounded-lg overflow-hidden w-full max-w-xs sm:max-w-md mx-auto">
                  <img
                    src={book.image}
                    alt={book.title}
                    className="w-1/3 h-40 object-contain bg-gray-800 p-2"
                  />

                  <div className="p-4 flex flex-col justify-between w-2/3">
                    <div>
                      <h2 className="text-lg font-bold">{book.title}</h2>
                      <p className="text-gray-300 text-sm mt-1">{book.author}</p>
                    </div>

                    <div>
                       <div className="flex items-center gap-0.5 mt-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <AiFillStar
                            key={star}
                            className={
                              star <= Math.round(book?.rate || 0)
                                ? "text-yellow-400"
                                : "text-gray-500"
                            }
                          />
                        ))}
                        <span className="ml-1 text-sm">{book?.rate}</span>
                        <span className="text-gray-400 text-sm">
                          ({book?.reviews}{" "}
                          {book?.reviews === 1 ? "Review" : "Reviews"})
                        </span>
                      </div>

                      <div className="flex items-center gap-2 mt-2">
                        <span className="line-through text-gray-400">
                          ${book.oldPrice}
                        </span>
                        <span className="font-bold">${book.price}</span>
                      </div>

                      <div className="w-full bg-gray-700 h-2 rounded-full mt-2">
                        <div
                          className="bg-orange-500 h-2 rounded-full"
                          style={{
                            width: `${(book.left / book.total) * 100}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <button className="custom-prev absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white w-9 h-9 rounded-full shadow flex items-center justify-center hover:scale-110 transition">
            <ChevronLeft size={18} className="text-black" />
          </button>

          <button className="custom-next absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white w-9 h-9 rounded-full shadow flex items-center justify-center hover:scale-110 transition">
            <ChevronRight size={18} className="text-black" />
          </button>
        </div>
      </section>
    );
}
