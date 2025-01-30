"use client";

import { useEffect, useState } from "react";
import { ConfigProvider, Tabs } from "antd";

import Link from "next/link";
import toast from "react-hot-toast";
import Image from "next/image";
import { FiCheckSquare } from "react-icons/fi";
import Heading from "@/components/shared/Heading";
import YouMayLikeSection from "@/components/ui/website/product/YouMayLikeSection";
import { useParams } from "next/navigation";
import { useGetSingleProductQuery } from "@/redux/apiSlices/productSlice";
import { FaCheckCircle } from "react-icons/fa";
import { getImageUrl } from "@/utils/getImageUrl";
import { useCreateCartMutation } from "@/redux/apiSlices/cartSlice";

const ProductDetailsPage: React.FC = () => {
  const [mainImage, setMainImage] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedColors, setSelectedColors] = useState("");

  // console.log(mainImage);

  const { id } = useParams();

  const { data: product, isFetching } = useGetSingleProductQuery(id as string);
  const [addToCart] = useCreateCartMutation();

  useEffect(() => {
    if (product) {
      setMainImage(product?.data?.image);
    }
  }, [product]);

  if (isFetching) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  const singleProduct = product?.data;
  // console.log(singleProduct);

  const totalPrice =
    (singleProduct?.salePrice
      ? singleProduct?.salePrice
      : singleProduct?.price) * quantity;

  const items = [
    {
      key: "1",
      label: <p className="md:text-xl ">Description</p>,
      children: singleProduct?.description,
    },
    {
      key: "2",
      label: <p className="md:text-xl">Additional Information</p>,
      children: singleProduct?.additionalInfo,
    },
  ];

  const handleAddToCart = async () => {
    const data = {
      product: id,
      quantity: quantity,
      color: selectedColors,
      size: selectedSize,
    };
    try {
      const response = await addToCart(data).unwrap();
      console.log(response);
      if (response?.success) {
        toast.success(
          response?.message || "Product added to cart successfully!"
        );
      } else {
        toast.error(
          response?.message || "Something went wrong. Please try again later."
        );
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong. Please try again later.");
    }
  };

  return (
    <>
      <div className="md:p-28 md:pb-0 p-8 max-w-7xl mx-auto font-fontTwo">
        <div className="md:flex items-center justify-center gap-5">
          <div className="md:w-[45%] flex flex-col items-center">
            <div className="w-full mb-5">
              <Image
                className="md:w-[600px] w-[350px] object-cover h-[300px] md:h-[440px]"
                src={getImageUrl(mainImage)}
                alt="Main Image"
                width={100}
                height={100}
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {singleProduct?.featuredImages
                ?.slice(0, 4)
                ?.map((img: string, index: number) => (
                  <Image
                    key={index}
                    src={getImageUrl(img)}
                    alt={`Thumbnail ${index + 1}`}
                    className="cursor-pointer object-cover md:h-28 md:w-28 h-20 w-20 border border-gray-300 rounded-lg transition-transform transform hover:scale-110"
                    onClick={() => setMainImage(img)}
                    width={100}
                    height={100}
                  />
                ))}
            </div>
          </div>
          <div className="md:space-y-3 md:w-[55%] mt-7 md:mt-0">
            {/* <h1 className="md:text-3xl text-2xl">{productData.title}</h1> */}
            <Heading className="">{singleProduct?.name}</Heading>

            <div className=" relative flex gap-3 text-primary">
              {singleProduct?.salePrice ? (
                <div>
                  <p className="line-through text-gray-500">
                    ${singleProduct?.price}
                  </p>
                  <p className="absolute font-bold top-4 left-0 text-2xl ">
                    ${singleProduct?.salePrice}
                  </p>
                </div>
              ) : (
                <p className="absolute font-bold top-4 left-0 text-2xl ">
                  ${singleProduct?.price}
                </p>
              )}
            </div>
            <h1 className="flex gap-2 pt-5 items-center">
              <span className="font-bold">Availability:</span>
              {singleProduct?.availability === true ? (
                <span className="text-green-600 flex gap-1">
                  In Stock <FiCheckSquare />
                </span>
              ) : (
                <span className="text-red-500">Out Of Stock</span>
              )}
            </h1>
            <div className="flex items-center gap-10 mt-10 md:mt-0">
              <h1 className="font-bold text-2xl">Size:</h1>
              <div>
                <div className="flex flex-wrap gap-2">
                  {singleProduct?.sizes.map((size: string) => (
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
            <div className="flex gap-3 mt-5 md:mt-0 items-center">
              <h1 className="font-bold text-2xl me-3">Color:</h1>
              <div className="flex gap-2">
                {singleProduct?.colors?.map((color: string) => (
                  <label key={color} className="cursor-pointer relative">
                    <input
                      type="radio"
                      name="color"
                      value={color}
                      className="hidden"
                      onChange={() => setSelectedColors(color)}
                    />
                    <div
                      className={`w-10 h-10 rounded-xl border-2 flex items-center justify-center ${
                        selectedColors === color
                          ? "border-black"
                          : "border-gray-300"
                      }`}
                      style={{ backgroundColor: color.toLowerCase() }}
                    >
                      {selectedColors === color && (
                        <FaCheckCircle
                          size={30}
                          className={`absolute text-white bg-primary rounded-full p-1`}
                        />
                      )}
                    </div>
                  </label>
                ))}
              </div>
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
                onClick={() => handleAddToCart()}
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

            <div className="py-3">
              <span className="font-bold">Tags: </span>
              {singleProduct?.tags?.map((tag: string, index: number) => (
                <span
                  key={index}
                  className="mr-2 bg-gray-200 px-2 py-1 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
            <h1>
              <span className="font-bold">Category:</span>{" "}
              {singleProduct?.category?.title}
            </h1>
          </div>
        </div>
        <ConfigProvider>
          <Tabs defaultActiveKey="1" items={items} />
        </ConfigProvider>
      </div>
      <YouMayLikeSection categoryId={singleProduct?.category?._id} />
    </>
  );
};

export default ProductDetailsPage;
