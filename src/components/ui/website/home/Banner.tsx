import React from "react";
import { Big_Shoulders_Display } from "next/font/google";
// import { Plus_Jakarta_Sans } from "next/font/google";
import Link from "next/link";

const bigShoulders = Big_Shoulders_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
});

// const plusJakarta = Plus_Jakarta_Sans({
//   subsets: ["latin"],
//   weight: ["400", "500", "600", "700"],
// });

const Banner = () => {
  return (
    <div
      className="w-full md:h-[800px] h-[300px] flex items-center justify-start "
      style={{
        backgroundImage: `url('/Handske_header (1).jpg')`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        width: "100%",
      }}
    >
      <div className=" flex flex-col gap-1 container">
        <p
          className={`${bigShoulders.className}  w-full uppercase text-white font-[800] text-[32px] md:text-7xl mb-5`}
        >
          Welcome to Fremst - <br /> Your one stop shop
        </p>

        {/* <p
          className={`${plusJakarta.className}  text-white font-[500] text-[18px] tracking-wider`}
        >
          Select from a variety of models for every purpose.{" "}
        </p> */}

        <Link href={"/products"}>
          <button className=" bg-[#FFC700] w-[220px] font-semibold rounded-full py-2 text-gray-700 text-[16px] mt-3">
            {" "}
            Explore our SHOP
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Banner;
