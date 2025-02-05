/* eslint-disable @next/next/no-img-element */
import React from "react";
import { Plus_Jakarta_Sans } from "next/font/google";
import { Big_Shoulders_Display } from "next/font/google";
import Link from "next/link";
import { getImageUrl } from "@/utils/getImageUrl";
import Image from "next/image";
import Currency from "@/utils/Currency";
const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const bigShoulders = Big_Shoulders_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
});
const ProductCard = ({ product }: { product: any }) => {
  // console.log("savsv", product);
  return (
    <div className="relative border-2 rounded-2xl md:w-[290px] group bg-white bg-opacity-30  hover:border-primary ">
      <div className="relative">
        {product.availability === false && (
          <div className="absolute top-0 left-0 z-10">
            <div
              className={`bg-red-600  rounded-lg 
                rounded-tr-none rounded-bl-none font-semibold text-white text-[12px] tracking-wide py-1 px-3 ${plusJakarta.className}  `}
            >
              {" "}
              SOLD OUT{" "}
            </div>
          </div>
        )}
        <Image
          src={getImageUrl(product.image)}
          alt={product.name}
          className=" h-[250px] w-[250px] object-fill p-4"
          width={250}
          height={250}
        />
      </div>

      <div className="space-y-1 px-[16px] pb-[21px]">
        <p
          className={`text-[#797572] text-[12px] font-medium tracking-wide ${plusJakarta.className}`}
        >
          {product.category?.title}
        </p>
        <h1
          className={`text-[16px] tracking-wide font-bold ${bigShoulders.className}`}
        >
          {product.name}
        </h1>
        <p
          className={`${bigShoulders.className} 
          text-2xl tracking-wide font-normal mb-4 `}
        >
          {product.price} <Currency />
        </p>
        <Link href={`/products/${product?._id}`}>
          <button
            className=" border-2 mt-2 border-primary text-primary w-full h-[47px]  rounded-xl font-semibold  text-[20px] tracking-wide
           group-hover:bg-primary group-hover:text-white transition-colors "
          >
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
