// import React from "react";
// import Caard from "./Caard";
// import Hero from "../../Components/Header/Hero";
// import SliderData from "./SliderData";
// import Recommended from "./Recommended";
// import FlashSale from "./FlashSale";

// export default function Home() {

  const items = [
    {
      id: 1,
      title: "Fast & Reliable Shipping",
      discription:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris et ultricies est. Aliquam in justo varius, sagittis neque ut, malesuada leo.",
      image: "/shipping-fast.png",
    },
    {
      id: 2,
      title: "Secure Payment",
      discription:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris et ultricies est. Aliquam in justo varius, sagittis neque ut, malesuada leo.",
      image: "/credit-card-buyer.png",
    },
    {
      id: 3,
      title: "Easy Returns",
      discription:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris et ultricies est. Aliquam in justo varius, sagittis neque ut, malesuada leo.",
      image: "/restock.png",
    },
    {
      id: 4,
      title: "24/7 Customer Support",
      discription:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris et ultricies est. Aliquam in justo varius, sagittis neque ut, malesuada leo.",
      image: "/user-headset.png",
    },
  ];
//   return (
//     <div>
//       <Hero variant="home" />
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-8 px-10 py-16">
//         {items.map((item) => (
//           <Caard key={item.id} card={item} />
//         ))}
//       </div>
//       <SliderData />
//       <Recommended />
//       <FlashSale />
//     </div>
//   );
// }
import React, { useState, useEffect } from "react";
import Hero from "../../Components/Header/Hero";
import Caard from "./Caard";
import SliderData from "../../Components/Ui/SliderData";
import Recommended from "../../Components/Ui/Recommended";
import FlashSale from "../../Components/Ui/FlashSale";
import { getHomeData } from "../../Api/HomeApi";

export default function Home() {
  const [recommended, setRecommended] = useState([]);
  const [flashSales, setFlashSales] = useState([]);
  const [sliderImages, setSliderImages] = useState([]);
  const [ setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getHomeData();
        const data = response.data.data;

        setRecommended(data.recommended || []);
        setFlashSales(data.flashSales || []);
        setSliderImages(data.best_selling_image || []);
      } catch (error) {
        console.error("Failed to fetch home data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

 

  return (
    <div>
      <Hero variant="home" />
     <Caard />

      <SliderData images={sliderImages} />

      <Recommended recommended={recommended} />

      <FlashSale flashSales={flashSales} />
    </div>
  );
}
