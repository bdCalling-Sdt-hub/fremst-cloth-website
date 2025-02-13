"use client";

import { useState, useEffect } from "react";
import debounce from "lodash/debounce"; // Install lodash if not installed
import Heading from "@/components/shared/Heading";
import ProductCard from "@/components/shared/ProductCard";
import { Slider, Pagination, Checkbox, Spin, ConfigProvider } from "antd";
import { Big_Shoulders_Display } from "next/font/google";
import {
  useGetAllProductsQuery,
  useGetCategoriesQuery,
} from "@/redux/apiSlices/productSlice";
import Currency from "@/utils/Currency";

const bigShoulders = Big_Shoulders_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const ShopPage = () => {
  const [checkedCategories, setCheckedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 30000]);
  const [debouncedPriceRange, setDebouncedPriceRange] = useState(priceRange);

  useEffect(() => {
    const handler = debounce(() => {
      setDebouncedPriceRange(priceRange);
    }, 500);

    handler();
    return () => handler.cancel();
  }, [priceRange]);

  const { data: getAllProducts, isFetching } = useGetAllProductsQuery({
    category: checkedCategories,
    minPrice: debouncedPriceRange[0],
    maxPrice: debouncedPriceRange[1],
  });

  const { data: getAllCategories } = useGetCategoriesQuery(undefined);

  const handlePriceChange = (value: number | number[] | [number, number]) => {
    if (Array.isArray(value)) {
      if (
        value.length === 2 &&
        typeof value[0] === "number" &&
        typeof value[1] === "number"
      ) {
        setPriceRange(value as [number, number]);
      } else {
        console.error(
          "Invalid price range. Expected an array with exactly two numbers."
        );
      }
    } else {
      setPriceRange([value, priceRange[1]]);
    }
  };

  const handleCategoryChange = (values: string[]) => {
    setCheckedCategories([...values]);
  };

  const products = getAllProducts?.data || [];
  const categories = getAllCategories?.data || [];

  return (
    <div className="container">
      <h1 className={`my-5 text-3xl font-bold ${bigShoulders.className}`}>
        Shop
      </h1>
      <h1 className="my-5">
        Total Items: <span className="font-bold"> {products.length}</span>
      </h1>
      <div className="md:flex justify-center gap-10">
        {/* Sidebar - Filters */}
        <div className="md:w-[30%]">
          <h1
            className={`text-xl font-bold uppercase ${bigShoulders.className}`}
          >
            Filter By Price
          </h1>
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: "#292C61",
              },
            }}
          >
            <Slider
              range
              max={30000}
              min={0}
              value={priceRange} // Controlled component
              onChange={handlePriceChange}
            />
          </ConfigProvider>
          <p className="font-bold">
            Price: {priceRange[0]}.00 <Currency /> - {priceRange[1]}.00{" "}
            <Currency />
          </p>

          {/* Category Filter */}
          <div className="my-10">
            <Heading className="text-black">Product Category</Heading>
            <Checkbox.Group
              className="flex flex-col gap-2 mt-3"
              options={categories.map((item: any) => ({
                label: item.title,
                value: item._id,
              }))}
              value={checkedCategories}
              onChange={handleCategoryChange}
            />
          </div>
        </div>

        {/* Product List */}
        <div className="md:w-[70%] mb-20">
          {/* Product Cards (Show previous data while fetching new ones) */}
          {isFetching && products.length === 0 ? (
            <div className="flex items-center justify-center mt-10">
              <Spin size="large" />
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-10 grid-cols-1">
              {products?.map((product: any) => (
                <ProductCard product={product} key={product._id} />
              ))}
            </div>
          )}

          {/* Pagination */}
          <div className="flex justify-center mt-10">
            <Pagination pageSize={12} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
