"use client";

import { Form, Input, Button, Radio, Modal } from "antd";
import { useState } from "react";
import Image from "next/image";
import Head from "next/head";

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

  const onFinish = (values: Record<string, unknown>) => {
    console.log("Form Values:", values);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="bg-white">
      <Head>
        <title>Checkout - Doublet24</title>
      </Head>
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
              label="Business Name"
              name="fullName"
              rules={[{ required: true }]}
            >
              <Input className="py-2" placeholder="Business Name" />
            </Form.Item>
            <div className="flex w-full gap-5">
              <Form.Item
                label="Country"
                name="country"
                rules={[{ required: true }]}
                className="w-1/2"
              >
                <Input className="py-2" placeholder="Country" />
              </Form.Item>
              <Form.Item
                label="State/Province"
                name="state"
                rules={[{ required: true }]}
                className="w-1/2"
              >
                <Input className="py-2" placeholder="State/Province" />
              </Form.Item>
            </div>
            <Form.Item
              label="Street Address"
              name="streetAddress"
              rules={[{ required: true }]}
            >
              <Input className="py-2" placeholder="Street Address" />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, type: "email" }]}
            >
              <Input className="py-2" placeholder="Email" />
            </Form.Item>
            <Form.Item label="Phone" name="phone" rules={[{ required: true }]}>
              <Input className="py-2" placeholder="Phone" />
            </Form.Item>
            <Heading className="">Additional Info</Heading>
            <Form.Item label="Order Notes (Optional)" name="orderNotes">
              <Input.TextArea placeholder="Order Notes (Optional)" />
            </Form.Item>
          </div>

          <div className="md:w-[30%] shadow-lg border border-t-8 border-t-[#292C61] rounded-2xl p-1">
            <Heading className="mx-5">Order Summary</Heading>
            <div className="w-full p-5 border-none">
              <ul>
                {cart?.map((item) => (
                  <li
                    key={item.key}
                    className="flex items-center justify-between py-2"
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

            <h2 className="text-lg mx-6 mb-4">Payment Method</h2>
            <div className="px-5">
              <Form.Item
                name="paymentMethod"
                className="mx-6"
                rules={[{ required: true }]}
              >
                <Radio.Group>
                  <Radio value="cash">Cash on Delivery</Radio>
                  <Radio value="paypal">PayPal</Radio>
                </Radio.Group>
              </Form.Item>
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
