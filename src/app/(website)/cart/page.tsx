"use client";

import { Table } from "antd";
import { useState, useEffect } from "react";

import Heading from "@/components/shared/Heading";
import Image from "next/image";

import { getImageUrl } from "@/utils/getImageUrl";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Currency from "@/utils/Currency";

interface CartItem {
  key: string;
  product: {
    id: string;
    image: string;
    name: string;
    price: number;
    salePrice?: number;
  };
  quantity: number;
}

const CartPage = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const router = useRouter();

  console.log(cart);

  useEffect(() => {
    const cartItems = localStorage.getItem("cart");
    if (cartItems) {
      setCart(JSON.parse(cartItems));
    }
  }, []); // Runs only once on mount

  // Update quantity and sync with localStorage
  const updateQuantity = (productId: string, newQuantity: number) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.map((item) =>
        item.product.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      );

      localStorage.setItem("cart", JSON.stringify(updatedCart)); // Sync changes
      return updatedCart;
    });
  };

  // Remove item and sync with localStorage
  const removeItem = (key: string) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.filter((item) => item.key !== key);
      localStorage.setItem("cart", JSON.stringify(updatedCart)); // Sync changes
      return updatedCart;
    });
  };

  // Calculate total price
  const totalPrice = cart?.reduce(
    (total: number, item: any) =>
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
        <p>
          {record.product.salePrice || record.product.price} <Currency />
        </p>
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
                updateQuantity(record.product.id, Math.max(1, quantity - 1))
              }
              className="border bg-gray-200 rounded-2xl px-3 py-1"
            >
              -
            </button>
            <span className="text-xl">{quantity}</span>
            <button
              onClick={() => updateQuantity(record.product.id, quantity + 1)}
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
          {(
            (record.product.salePrice || record.product.price) * record.quantity
          ).toFixed(2)}{" "}
          <Currency />
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

  const handleUpdateCart = async () => {
    if (typeof window !== "undefined") {
      // Now it's safe to use localStorage
      const getCart = localStorage.getItem("cart");
      if (getCart) {
        localStorage.removeItem("cart");
      }

      if (cart.length === 0) {
        toast.error("Cart is empty!");
        return;
      } else {
        localStorage.setItem("cart", JSON.stringify(cart));
        toast.success("Cart updated successfully!");
        router.push("/checkout");
      }
    }
  };

  return (
    <div className="min-h-screen">
      <Heading className="text-center mt-10">Cart</Heading>
      <div className="md:p-10 max-w-7xl mx-auto p-5 md:flex gap-10 w-full">
        <div className="md:w-[70%] border rounded-2xl shadow-lg">
          <Table
            className="border-t-8 border-t-[#292C61] rounded-2xl"
            dataSource={cart}
            rowKey={(record) => record?.product?.id}
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
              <span className="font-semibold">
                {totalPrice.toFixed(2)} <Currency />
              </span>
            </div>
            <div className="flex justify-between border-b-2 pb-3 text-lg mb-2">
              <span>Shipping:</span>
              <span className="font-semibold">Free</span>
            </div>
            <div className="flex justify-between pb-3 text-lg mb-2">
              <span>Total:</span>
              <span className="font-semibold">
                {totalPrice.toFixed(2)} <Currency />
              </span>
            </div>

            <button
              onClick={() => handleUpdateCart()}
              className="w-full mt-4 bg-[#292C61] text-white py-3 rounded-2xl hover:bg-[#292C61]"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
