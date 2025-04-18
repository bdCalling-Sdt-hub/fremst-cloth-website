/* eslint-disable @next/next/no-img-element */
"use client";
import Heading from "@/components/shared/Heading";
import React, { useState } from "react";
import { Big_Shoulders_Display } from "next/font/google";
import Slider, { Settings } from "react-slick";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import { Plus_Jakarta_Sans } from "next/font/google";
import ProductCard from "@/components/shared/ProductCard";
import { useGetWinterCollectionQuery } from "@/redux/apiSlices/productSlice";
import { Loader2 } from "lucide-react";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const bigShoulders = Big_Shoulders_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const WinterCollection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const { data: getAllProducts, isFetching } =
    useGetWinterCollectionQuery(undefined);

  if (isFetching) {
    return (
      <div className="flex items-center justify-center mt-10">
        <Loader2 className="animate-spin w-10 h-10 text-gray-600" />
      </div>
    );
  }

  const productsData = getAllProducts?.data?.slice(0, 4).reverse();
  console.log(productsData);

  const CustomNextArrow = ({ onClick }: { onClick?: () => void }) => (
    <div
      className=" absolute lg:flex hidden  lg:-right-10 right-0 top-1/3 cursor-pointer   "
      onClick={onClick}
    >
      <div className="w-10 h-10 bg-white/80  rounded-full flex items-center justify-center shadow-md">
        <FaArrowRightLong color="#292C61" size={20} />
      </div>
    </div>
  );

  const CustomPrevArrow = ({ onClick }: { onClick?: () => void }) => (
    <div
      className="absolute lg:flex hidden  lg:-left-7 left-0 top-1/3 cursor-pointer z-30"
      onClick={onClick}
    >
      <div className=" w-10 h-10 bg-white/80  rounded-full flex items-center justify-center shadow-md">
        <FaArrowLeftLong color="#292C61" size={20} />
      </div>
    </div>
  );

  const settings: Settings = {
    infinite: false,
    speed: 500,
    initialSlide: 0,
    // arrows: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: false,
    dots: true,
    autoplaySpeed: 2000,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
    beforeChange: (current, next) => setActiveIndex(next),
    customPaging: (i) => (
      <div
        style={{
          width: "35px",
          height: "3px",
          borderRadius: "5px",
          backgroundColor: i === activeIndex ? "#292C61" : "#D3D3D3",
          cursor: "pointer",
          transition: "background-color 0.3s ease",
          marginTop: "40px",
        }}
      />
    ),
    appendDots: (dots) => (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          padding: "10px",
          gap: "10px",
        }}
      >
        {dots}
      </div>
    ),

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div
      className={`${bigShoulders.className} pt-[80px] pb-[100px] container `}
    >
      {/* heading  */}
      <div className=" pb-[50px]">
        <Heading className=" underline underline-offset-[12px] underline-primary   ">
          {" "}
          OUR TOP COLLECTIONS
        </Heading>
        <p className="border-b border-gray-300"></p>
        <div className="flex items-center justify-end -mt-5">
          <button
            className={`bg-white border border-gray-300 text-[#000000] py-2 px-6 rounded-full font-semibold  text-[12px] tracking-wide ${plusJakarta.className} `}
          >
            {" "}
            View More{" "}
          </button>
        </div>
      </div>

      {/* body   */}
      <div className="w-full ">
        <div className=" lg:w-[1300px] md:w-[600px]">
          <Slider {...settings}>
            {productsData?.slice(0, 8)?.map((product: any) => (
              <div key={product.id} className=" ms-5">
                <ProductCard product={product} />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default WinterCollection;
