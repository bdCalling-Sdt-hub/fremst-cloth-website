"use client";

import { Form, Input, Button, Modal, Radio } from "antd";
import { useState } from "react";
import Image from "next/image";

import productImg1 from "../../../assets/product1.1.png";
import productImg2 from "../../../assets/product1.2.png";
import productImg3 from "../../../assets/product1.3.png";
import productImg4 from "../../../assets/product1.4.png";
import { FaCheckCircle } from "react-icons/fa";
import Link from "next/link";
import Heading from "@/components/shared/Heading";

interface CartItem {
  key: string;
  product: {
    image: string;
    name: string;
    price: number;
  };
}

const CheckoutPage: React.FC = () => {
  const [cart] = useState<CartItem[]>([
    {
      key: "1",
      product: {
        image: productImg1.src,
        name: "Bubba Kush THCA Flower",
        price: 750,
      },
    },
    {
      key: "2",
      product: {
        image: productImg2.src,
        name: "Sour Diesel THCA Flower",
        price: 850,
      },
    },
    {
      key: "3",
      product: {
        image: productImg3.src,
        name: "OG Kush THCA Flower",
        price: 950,
      },
    },
    {
      key: "4",
      product: {
        image: productImg4.src,
        name: "Granddaddy Purple THCA Flower",
        price: 1000,
      },
    },
  ]);

  const totalPrice = cart.reduce(
    (total, item) => total + item.product.price,
    0
  );

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [deliveryOption, setDeliveryOption] = useState("default");

  const onFinish = (values: Record<string, unknown>) => {
    console.log("Form Values:", values);
    setIsModalVisible(true);
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
                <Radio value="default" className="text-lg">
                  Use my default address
                </Radio>{" "}
                <br />
                <Radio value="different" className="text-lg">
                  Ship to a different address
                </Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item
              label="Address"
              name="address"
              rules={[{ required: true }]}
            >
              <Input className="py-2" placeholder="Address" />
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
                  {cart?.map((item) => (
                    <li
                      key={item.key}
                      className="flex items-center border-t justify-between py-2"
                    >
                      <Image
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-16 h-16 object-cover"
                        width={100}
                        height={100}
                      />
                      <span className="ml-4">{item.product.name}</span>
                      <span className="ml-4">
                        ${item.product.price.toFixed(2)}
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
