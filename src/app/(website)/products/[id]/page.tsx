"use client";

import { FaStar } from "react-icons/fa";
import productImg1 from "@/assets/product1.1.png";
import productImg2 from "@/assets/product1.2.png";
import productImg3 from "@/assets/product1.3.png";
import productImg4 from "@/assets/product1.4.png";
import { useState } from "react";
import { ConfigProvider, Tabs } from "antd";

import Link from "next/link";
import toast from "react-hot-toast";
import Image from "next/image";
import { FiCheckSquare } from "react-icons/fi";
import Heading from "@/components/shared/Heading";
import YouMayLikeSection from "@/components/ui/website/product/YouMayLikeSection";

interface Review {
  name: string;
  rating: number;
  comment: string;
}

interface ProductData {
  title: string;
  reviews: Review[];
  price: number;
  shortDescription: string;
  availability: string;
  tags: string;
  category: string;
}

const productData: ProductData = {
  title: "Functional Shirt - Pesso Nordic",
  reviews: [
    {
      name: "John Doe",
      rating: 5,
      comment: "This product is amazing. I love it!",
    },
    {
      name: "Jane Smith",
      rating: 4,
      comment: "I really dislike this product. It's not what I expected.",
    },
  ],
  price: 25,
  shortDescription:
    "Breathable, durable, and designed for maximum comfort and safety in demanding work environments. Made with moisture-wicking fabric to keep you dry and visible throughout the day. Perfect for professional use in low-light and high-activity conditions.",
  availability: "available",
  tags: "Shirt",
  category: "Shirt",
};

// interface RelatedProduct {
//   id: number;
//   image: string;
//   label: string;
//   title: string;
//   description: string;
//   price: string;
// }

const ProductDetailsPage: React.FC = () => {
  const [mainImage, setMainImage] = useState<typeof productImg1>(productImg1);
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState<number>(1);

  const totalPrice = productData?.price * quantity;

  const description = (
    <div className="space-y-5">
      <div>
        <h1 className="text-lg font-bold">Functional Shirt - Pesso Nordic</h1>
        <p>
          Comfortable high-visibility t-shirt with excellent breathability and
          visibility. The &quot;Quick-dry&quot; fabric keeps the body cool on
          warm days
        </p>
      </div>
      <div>
        <h1 className="text-lg font-bold">Material</h1>
        <p>50% Cotton, 50% Polyester</p>
      </div>
      <div>
        <h1 className="text-lg font-bold">Standard</h1>
        <p>EN ISO 20471 Class 2</p>
      </div>
    </div>
  );

  const items = [
    {
      key: "1",
      label: <p className="md:text-xl ">Description</p>,
      children: description,
    },
    {
      key: "2",
      label: <p className="md:text-xl">Additional Information</p>,
      children: "Content of Tab Pane 2",
    },
    {
      key: "3",
      label: <p className="md:text-xl">Reviews</p>,
      children: "Content of Tab Pane 3",
    },
  ];

  return (
    <>
      <div className="md:p-28 md:pb-0 p-8 max-w-7xl mx-auto font-fontTwo">
        <div className="md:flex items-center justify-center gap-5">
          <div className="md:w-[45%] flex flex-col items-center">
            <div className="w-full mb-5">
              <Image
                className="md:w-[600px] w-[350px] h-[300px] md:h-[440px]"
                src={mainImage}
                alt="Main Image"
                width={100}
                height={100}
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {[productImg1, productImg2, productImg3, productImg4].map(
                (img, index) => (
                  <Image
                    key={index}
                    src={img}
                    alt={`Thumbnail ${index + 1}`}
                    className="cursor-pointer md:h-28 md:w-28 h-20 w-20 transition-transform transform hover:scale-110"
                    onClick={() => setMainImage(img)}
                    width={100}
                    height={100}
                  />
                )
              )}
            </div>
          </div>
          <div className="md:space-y-3 md:w-[55%] mt-7 md:mt-0">
            {/* <h1 className="md:text-3xl text-2xl">{productData.title}</h1> */}
            <Heading className="">{productData.title}</Heading>
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <FaStar key={i} className="text-orange-600" />
                  ))}
              </div>
              <p>{productData.reviews.length} Reviews</p>
            </div>
            <div className="flex gap-3 text-3xl font-bold text-primary">
              <p>${productData?.price}</p>
            </div>
            <p className="leading-5">{productData.shortDescription}</p>
            <div className="flex items-center gap-10 mt-10 md:mt-0">
              <h1 className="font-bold text-2xl">Size:</h1>
              <div>
                <div className="flex flex-wrap gap-2">
                  {["S", "M", "L", "XL", "2XL", "3XL"].map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`border px-4 py-2 rounded-lg ${
                        selectedSize === size
                          ? "bg-primary text-white"
                          : "bg-gray-200"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex gap-5 mt-5 md:mt-0 items-center">
              <h1 className="font-bold text-2xl">Color:</h1>
              <div className="w-20 border rounded-xl h-10 bg-[#e9fc52]"></div>
            </div>
            <div className="flex items-center gap-4 ">
              <div className="flex border font-semibold p-2 rounded-2xl border-gray-300 items-center gap-3">
                <button
                  onClick={() =>
                    setQuantity((prev) => (prev > 1 ? prev - 1 : 1))
                  }
                  className="border bg-gray-200 rounded-2xl px-3 py-1"
                >
                  -
                </button>
                <span className="text-xl">{quantity}</span>
                <button
                  onClick={() => setQuantity((prev) => prev + 1)}
                  className="border bg-gray-200 rounded-2xl px-3 py-1"
                >
                  +
                </button>
              </div>
              <p className="text-3xl font-bold text-primary">
                ${totalPrice.toFixed(2)}
              </p>
            </div>
            <div className="flex md:text-xl font-bold gap-4 mb-5 md:mb-0">
              <button
                onClick={() =>
                  toast.success("Product added to cart successfully!")
                }
                className="bg-primary text-white px-5 py-3 rounded-lg"
              >
                Add to Cart
              </button>
              <Link href="/checkout">
                <button className="bg-primary text-white px-5 py-3 rounded-lg">
                  Buy Now
                </button>
              </Link>
            </div>
            <h1 className="flex gap-2 items-center">
              <span className="font-bold">Available:</span>
              {productData?.availability === "available" ? (
                <span className="text-green-600 flex gap-1">
                  In Stock <FiCheckSquare />
                </span>
              ) : (
                <span className="text-red-500">Out Of Stock</span>
              )}
            </h1>
            <h1>
              <span className="font-bold">Tags: </span> {productData?.tags}
            </h1>
            <h1>
              <span className="font-bold">Category:</span>{" "}
              {productData?.category}
            </h1>
          </div>
        </div>
        <ConfigProvider>
          <Tabs defaultActiveKey="1" items={items} />
        </ConfigProvider>
      </div>
      <YouMayLikeSection />
    </>
  );
};

export default ProductDetailsPage;
