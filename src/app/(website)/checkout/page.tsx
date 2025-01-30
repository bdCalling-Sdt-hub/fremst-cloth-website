"use client";

import { Form, Input, Button, Modal, Radio } from "antd";
import { useEffect, useState } from "react";
import Image from "next/image";

import { FaCheckCircle } from "react-icons/fa";
import Link from "next/link";
import Heading from "@/components/shared/Heading";

import { getImageUrl } from "@/utils/getImageUrl";
import { useCreateOrderMutation } from "@/redux/apiSlices/orderSlice";
import toast from "react-hot-toast";
import { useGetUserProfileQuery } from "@/redux/apiSlices/authSlice";

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

const CheckoutPage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [deliveryOption, setDeliveryOption] = useState("default");
  const [cart, setCart] = useState<CartItem[]>([]);

  const { data: userData, isFetching } = useGetUserProfileQuery(undefined);
  const [placeOrder] = useCreateOrderMutation();

  useEffect(() => {
    const cartItems = localStorage.getItem("cart");
    if (cartItems) {
      setCart(JSON.parse(cartItems));
    }
  }, []);

  if (isFetching) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  const userDetails = userData?.data?.user;

  const { address } = userDetails;

  const totalPrice = cart?.reduce(
    (total: number, item: any) =>
      total + (item.product.salePrice || item.product.price) * item.quantity,
    0
  );

  const onFinish = async (values: Record<string, unknown>) => {
    const data = {
      items: cart?.map((item: any) => ({
        product: item.product.id,
        quantity: item.quantity,
        size: item.size,
        color: item.color,
      })),
      address: values.address,
      additionalInfo: values.orderNotes,
    };

    try {
      const res = await placeOrder(data).unwrap();
      if (res?.success) {
        toast.success(res?.message);
        setIsModalVisible(true);
        localStorage.removeItem("cart");
      }
    } catch (error: any) {
      toast.error(
        error?.data?.message || "Something went wrong. Please try again later."
      );
    }
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="bg-white">
      <Heading className="text-center">Checkout</Heading>
      <div className="p-10 max-w-7xl mx-auto">
        <Form
          layout="vertical"
          className="w-full md:flex gap-5"
          onFinish={onFinish}
        >
          <div className="md:w-[70%] md:p-10 md:border rounded-2xl md:shadow-lg">
            <Heading className="">Billing Information</Heading>
            <Form.Item
              label="Full Name"
              name="fullName"
              rules={[{ required: true }]}
            >
              <Input className="py-2" placeholder="Full Name" />
            </Form.Item>

            <h1 className="text-3xl font-semibold my-5">
              Choose delivery address
            </h1>
            <Form.Item name="deliveryOption">
              <Radio.Group
                onChange={(e) => setDeliveryOption(e.target.value)}
                value={deliveryOption}
                className="flex flex-col"
              >
                <Radio
                  value="default"
                  className="text-lg"
                  onChange={(e) => setDeliveryOption(e.target.value)}
                >
                  Use my default address
                </Radio>{" "}
                <br />
                <Radio
                  value="different"
                  className="text-lg"
                  onChange={(e) => setDeliveryOption(e.target.value)}
                >
                  Ship to a different address
                </Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item
              label="Address"
              name="address"
              rules={[{ required: true }]}
            >
              <Input
                className="py-2"
                placeholder="Address"
                defaultValue={deliveryOption === "default" ? address : ""}
              />
            </Form.Item>

            <Heading className="">Additional Info</Heading>
            <Form.Item label="Order Notes (Optional)" name="orderNotes">
              <Input.TextArea placeholder="Order Notes (Optional)" />
            </Form.Item>
          </div>

          <div className="md:w-[30%] shadow-lg border border-t-8 border-t-[#292C61] rounded-2xl p-1 flex flex-col justify-between">
            <div>
              <Heading className="mx-5">Order Summary</Heading>
              <div className="w-full p-5 border-none">
                <ul>
                  {cart?.map((item: any) => (
                    <li
                      key={item.key}
                      className="flex items-center border-t justify-between py-2"
                    >
                      <Image
                        src={getImageUrl(item.product.image)}
                        alt={item.product.name}
                        className="w-16 h-16 object-cover"
                        width={100}
                        height={100}
                      />
                      <span className="ml-4">{item.product.name}</span>
                      <span className="ml-4">
                        $
                        {(
                          (item.product.salePrice || item.product.price) *
                          item.quantity
                        ).toFixed(2)}
                      </span>
                    </li>
                  ))}
                  <li className="flex items-center justify-between font-bold py-3 border-t">
                    <span>Subtotal:</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </li>
                  <li className="flex items-center justify-between font-bold py-3 border-t">
                    <span>Shipping:</span>
                    <span>Free</span>
                  </li>
                  <li className="flex items-center justify-between font-bold py-3 border-t">
                    <span>Total:</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </li>
                </ul>
              </div>
            </div>

            <Button
              htmlType="submit"
              className=" w-full !bg-[#292C61] !text-white !text-xl !font-semibold mb-1 !py-5 !rounded-3xl"
            >
              Place Order
            </Button>
          </div>
        </Form>
      </div>

      <Modal
        title="Payment Complete"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleOk}
        footer={[
          <Link href="/" key="home">
            <Button
              className="!bg-[#292C61] !text-white mx-auto rounded-3xl py-2"
              onClick={handleOk}
            >
              Go to Home
            </Button>
          </Link>,
        ]}
        className="border-t-8 border-t-[#292C61] rounded-2xl"
      >
        <div className="flex flex-col items-center text-center py-20 justify-center">
          <FaCheckCircle className="text-[#292C61]" size={80} />
          <p className="my-2 font-bold text-[#292C61]">
            Thank you for your order! Your payment is complete.
          </p>
          <p className="text-[#6d6e7c]">
            We’ll notify you as soon as your order is on its way. If you have
            any questions or need assistance, feel free to contact our support
            team.
          </p>
        </div>
      </Modal>
    </div>
  );
};

export default CheckoutPage;
