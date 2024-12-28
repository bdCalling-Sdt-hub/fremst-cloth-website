"use client";

import { useState } from "react";
import Heading from "@/components/shared/Heading";
import ProductCard from "@/components/shared/ProductCard";
import { Slider, Pagination, Select } from "antd";
import { Big_Shoulders_Display } from "next/font/google";
const bigShoulders = Big_Shoulders_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const category = [
  { name: "Workwear", items: 5 },
  { name: "Casual Wear", items: 8 },
  { name: "Formal Wear", items: 12 },
  { name: "Sportswear", items: 10 },
  { name: "Winter Collection", items: 7 },
  { name: "Summer Collection", items: 15 },
  { name: "Footwear", items: 6 },
  { name: "Accessories", items: 9 },
  { name: "Ethnic Wear", items: 4 },
  { name: "Party Wear", items: 3 },
];

const products = [
  {
    id: 1,
    title: "Vinterhanske - Aquaguard Thermo",
    price: 23.9,
    category: "Lite wear",
    image: "/cat6.svg",
    soldOut: false,
  },
  {
    id: 2,
    title: "Regnhanske - DryGuard Pro",
    price: 29.5,
    category: "Rainwear",
    image: "/cat1.svg",
    soldOut: true,
  },
  {
    id: 3,
    title: "Arbeidshanske - Iron Grip",
    price: 19.9,
    category: "Workwear",
    image: "/cat2.svg",
    soldOut: false,
  },
  {
    id: 4,
    title: "Skalljakke - Stormbreaker",
    price: 89.9,
    category: "Outerwear",
    image: "/cat3.svg",
    soldOut: true,
  },
  {
    id: 5,
    title: "Softshelljakke - Cozy Wind",
    price: 74.5,
    category: "Outerwear",
    image: "/cat4.svg",
    soldOut: false,
  },
  {
    id: 6,
    title: "Sportsjakke - Runner’s Shield",
    price: 49.9,
    category: "Sportswear",
    image: "/cat5.svg",
    soldOut: true,
  },
  {
    id: 7,
    title: "Vinterjakke - FrostGuard",
    price: 129.9,
    category: "Winterwear",
    image: "/cat6.svg",
    soldOut: false,
  },
  {
    id: 8,
    title: "Hettegenser - Comfort Fleece",
    price: 35.5,
    category: "Casual Wear",
    image: "/cat1.svg",
    soldOut: true,
  },
  {
    id: 9,
    title: "T-skjorte - Everyday Fit",
    price: 15.9,
    category: "Casual Wear",
    image: "/cat2.svg",
    soldOut: false,
  },
  {
    id: 10,
    title: "Treningsbukse - Power Stretch",
    price: 39.9,
    category: "Sportswear",
    image: "/cat3.svg",
    soldOut: true,
  },
  {
    id: 11,
    title: "Lue - WoolWarm",
    price: 12.9,
    category: "Accessories",
    image: "/cat4.svg",
    soldOut: false,
  },
  {
    id: 12,
    title: "Buff - NeckGuard Pro",
    price: 8.5,
    category: "Accessories",
    image: "/cat5.svg",
    soldOut: false,
  },
  {
    id: 13,
    title: "Fleecehanske - Arctic Comfort",
    price: 22.9,
    category: "Winterwear",
    image: "/cat6.svg",
    soldOut: true,
  },
  {
    id: 14,
    title: "Dunjakke - Snowbound",
    price: 199.9,
    category: "Winterwear",
    image: "/cat1.svg",
    soldOut: false,
  },
  {
    id: 15,
    title: "Ullgenser - Nordic Heritage",
    price: 89.5,
    category: "Winterwear",
    image: "/cat2.svg",
    soldOut: true,
  },
  {
    id: 16,
    title: "Regnbukse - DryZone Guard",
    price: 39.9,
    category: "Rainwear",
    image: "/cat3.svg",
    soldOut: false,
  },
  {
    id: 17,
    title: "Arbeidsbukse - Heavy Duty Pro",
    price: 59.9,
    category: "Workwear",
    image: "/cat4.svg",
    soldOut: true,
  },
  {
    id: 18,
    title: "Joggesko - Trail Runner",
    price: 79.9,
    category: "Sportswear",
    image: "/cat5.svg",
    soldOut: false,
  },
  {
    id: 19,
    title: "Sneakers - Everyday Comfort",
    price: 49.9,
    category: "Casual Wear",
    image: "/cat6.svg",
    soldOut: true,
  },
  {
    id: 20,
    title: "Regnjakke - StormGuard",
    price: 69.9,
    category: "Rainwear",
    image: "/cat7.svg",
    soldOut: false,
  },
];

const ShopPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);

  const handlePageChange = (page: number, pageSize?: number) => {
    setCurrentPage(page);
    if (pageSize) {
      setPageSize(pageSize);
    }
  };

  const paginatedProducts = products.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="container">
      <h1 className="my-5">
        <Heading className="">Shop</Heading>
      </h1>
      <h1 className="my-5">
        Showing <span className="font-bold">1-{pageSize} items</span> out of{" "}
        <span className="font-bold">{products?.length} results</span>
      </h1>
      <div className="flex justify-center gap-10">
        <div className="w-[30%]">
          <h1
            className={`text-xl font-bold uppercase ${bigShoulders.className}`}
          >
            Filter By Price
          </h1>
          <Slider range defaultValue={[0.0, 1000.0]} />
          <p className="font-bold">Price: $0.00 - $1000.00</p>
          <div className="my-10">
            <h1>
              <Heading className="text-black">Product Category</Heading>
            </h1>
            <div>
              {category.map((item) => (
                <div
                  key={item.name}
                  className="my-2 flex items-center justify-between"
                >
                  <div className="space-x-5">
                    <input
                      className="w-5 h-5"
                      type="checkbox"
                      id={item.name}
                      name={item.name}
                    />
                    <label className="text-xl" htmlFor={item.name}>
                      {item.name}
                    </label>
                  </div>
                  <span className="ml-2 text-xl">({item.items})</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="w-[70%] mb-20">
          <div className="flex justify-end mb-5">
            <Select
              placeholder="Select a category"
              style={{ width: 200 }}
              allowClear
            >
              {category.map((item) => (
                <Select.Option key={item.name} value={item.name}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          </div>
          <div className="grid md:grid-cols-3 gap-10 grid-cols-1">
            {paginatedProducts.map((product) => (
              <ProductCard product={product} key={product.id} />
            ))}
          </div>
          <div className="flex justify-center mt-10">
            <Pagination
              current={currentPage}
              pageSize={pageSize}
              total={products.length}
              onChange={handlePageChange}
              showSizeChanger
              pageSizeOptions={["6", "12", "24"]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
