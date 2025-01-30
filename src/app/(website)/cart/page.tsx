"use client";

import { Table } from "antd";
import { useState, useEffect } from "react";
import Link from "next/link";
import Heading from "@/components/shared/Heading";
import Image from "next/image";
import { useGetCartItemsQuery } from "@/redux/apiSlices/cartSlice";
import { getImageUrl } from "@/utils/getImageUrl";

interface CartItem {
  key: string;
  product: {
    image: string;
    name: string;
    price: number;
    salePrice?: number;
  };
  quantity: number;
}

const CartPage = () => {
  const { data: cartItems, isFetching } = useGetCartItemsQuery(undefined);
  const [cart, setCart] = useState<CartItem[]>([]);

  console.log(cart);

  useEffect(() => {
    if (cartItems?.data?.products) {
      setCart(cartItems.data.products);
    }
  }, [cartItems]);

  // Update quantity
  const updateQuantity = (key: string, newQuantity: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.key === key ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Remove item from cart
  const removeItem = (key: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.key !== key));
  };

  // Calculate total price
  const totalPrice = cart.reduce(
    (total, item) =>
      total + (item.product.salePrice || item.product.price) * item.quantity,
    0
  );

  const columns = [
    {
      title: "Product",
      dataIndex: "product",
      key: "product",
      render: (product: any, record: any) => (
        <div className="flex items-center gap-4">
          <Image
            src={getImageUrl(record.product.image)}
            alt={product.name}
            className="w-16 h-16 object-cover"
            width={200}
            height={200}
          />
          <span>{product.name}</span>
        </div>
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (_: any, record: any) => (
        <p>${record.product.salePrice || record.product.price}</p>
      ),
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      render: (quantity: number, record: any) => (
        <div className="flex items-center gap-4 mt-3">
          <div className="flex border font-semibold p-2 rounded-2xl border-gray-300 items-center gap-3">
            <button
              onClick={() =>
                updateQuantity(record.key, Math.max(1, quantity - 1))
              }
              className="border bg-gray-200 rounded-2xl px-3 py-1"
            >
              -
            </button>
            <span className="text-xl">{quantity}</span>
            <button
              onClick={() => updateQuantity(record.key, quantity + 1)}
              className="border bg-gray-200 rounded-2xl px-3 py-1"
            >
              +
            </button>
          </div>
        </div>
      ),
    },
    {
      title: "Subtotal",
      dataIndex: "subtotal",
      key: "subtotal",
      render: (_: any, record: any) => (
        <p>
          $
          {(
            (record.product.salePrice || record.product.price) * record.quantity
          ).toFixed(2)}
        </p>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: any) => (
        <button
          className="text-red-500 hover:underline"
          onClick={() => removeItem(record.key)}
        >
          X
        </button>
      ),
    },
  ];

  if (isFetching) return <div>Loading...</div>;

  const handleUpdateCart = async () => {};

  return (
    <div className="min-h-screen">
      <Heading className="text-center mt-10">Cart</Heading>
      <div className="md:p-10 max-w-7xl mx-auto p-5 md:flex gap-10 w-full">
        <div className="md:w-[70%] border rounded-2xl shadow-lg">
          <Table
            className="border-t-8 border-t-[#292C61] rounded-2xl"
            rowKey="key"
            dataSource={cart}
            columns={columns}
            pagination={false}
            scroll={{ x: 700 }}
          />
        </div>
        <div className="md:w-[30%] border shadow-lg border-t-8 mt-10 md:mt-0 border-t-[#292C61] bg-white rounded-2xl">
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-4 border-b-2 pb-3">
              Cart Total
            </h1>

            <div className="flex justify-between border-b-2 pb-3 text-lg mb-2">
              <span>Subtotal:</span>
              <span className="font-semibold">${totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between border-b-2 pb-3 text-lg mb-2">
              <span>Shipping:</span>
              <span className="font-semibold">Free</span>
            </div>
            <div className="flex justify-between pb-3 text-lg mb-2">
              <span>Total:</span>
              <span className="font-semibold">${totalPrice.toFixed(2)}</span>
            </div>

            <Link href="/checkout">
              <button
                onClick={() => handleUpdateCart()}
                className="w-full mt-4 bg-[#292C61] text-white py-3 rounded-2xl hover:bg-[#292C61]"
              >
                Proceed to Checkout
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
