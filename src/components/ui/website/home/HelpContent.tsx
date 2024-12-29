/* eslint-disable @next/next/no-img-element */
import React from "react";
import { Big_Shoulders_Display } from "next/font/google";
import { Plus_Jakarta_Sans } from "next/font/google";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const bigShoulders = Big_Shoulders_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const data = [
  {
    id: 1,
    image: "/help.svg",
    title: "Get Expert Help",
    description:
      "Professional guidance to select office supplies within your credit limit.",
  },
  {
    id: 2,
    image: "/contract.svg",
    title: "Become a Contract Customer",
    description:
      "Enjoy exclusive benefits and streamlined purchasing covered by your credit.",
  },
  {
    id: 3,
    image: "/help.svg",
    title: "Returns & Support",
    description: "Hassle-free returns and assistance for approved purchases.",
  },
];
const HelpContent = () => {
  return (
    <div className=" container py-[100px]">
      <div className=" md:flex space-y-5 md:space-y-0 items-center justify-between gap-10">
        {data?.map((value) => (
          <div
            key={value?.id}
            className="border border-primary bg-[#F3F6FD] p-10 rounded-xl transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-105  duration-300 "
          >
            <img
              src={value?.image}
              alt=""
              className=" w-[64px]
   h-[64px]  "
            />

            <p
              className={` ${bigShoulders.className} font-bold text-[20px] pt-[20px] pb-4 text-[#000000]`}
            >
              {" "}
              {value?.title}
            </p>

            <p
              className={` ${plusJakarta.className} font-[400]  text-[16px]  text-[#797572]`}
            >
              {value?.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HelpContent;
