"use client";

import { Mail } from "lucide-react";
import React from "react";
import { Form, Input } from "antd";
import TextInput from "@/components/shared/TextInput";
import { GiRotaryPhone } from "react-icons/gi";
import { FaMapLocationDot } from "react-icons/fa6";
import { Big_Shoulders_Display } from "next/font/google";
import { Plus_Jakarta_Sans } from "next/font/google";
import Heading from "@/components/shared/Heading";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const bigShoulders = Big_Shoulders_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const Contact = () => {
  const contactDetails = [
    {
      title: "Phone Number",
      description: ["+41 949 214802", "+41 773 34593"],
      icon: (
        <GiRotaryPhone
          size={40}
          color="#292c61"
          className="w-10 h-10 text-primary"
        />
      ),
    },
    {
      title: "Email",
      description: ["testdomain@gmail.com", "mithila@gmail.com"],

      icon: <Mail className="w-10 h-10 text-primary" />,
    },
    {
      title: "Address",
      description: "Goethestrasse 14, 8000 Graz Mur, Austria",
      icon: (
        <FaMapLocationDot
          size={40}
          color="#292c61"
          className="w-10 h-10 text-primary"
        />
      ),
    },
  ];

  const ContactCard = ({
    title,
    description,
    icon,
  }: {
    title: string;
    description: string | string[];
    icon: React.ReactNode;
  }) => (
    <div className="bg-white p-[35px] rounded-lg shadow-xl border-0 border-t-8 border-primary">
      <div className="flex flex-col gap-y-3 items-center justify-center">
        <div
          className={`h-[100px] w-[100px] flex items-center justify-center rounded-full bg-[#EBEBEB]`}
        >
          {icon}
        </div>

        <h3
          className={`font-semibold text-gray-800 text-[20px] ${bigShoulders.className}`}
        >
          {title}
        </h3>
        {Array.isArray(description) ? (
          description.map((desc, index) => (
            <p
              key={index}
              className={`text-[16px] text-gray-600 ${plusJakarta.className} `}
            >
              {desc}
            </p>
          ))
        ) : (
          <p className={`text-sm text-gray-600 ${plusJakarta.className} `}>
            {description}
          </p>
        )}
      </div>
    </div>
  );

  return (
    <div>
      <div className=" ">
        <div className="container mx-auto pb-[146px]">
          <Heading className=" mt-[70px] text-center pb-[40px] ">
            {" "}
            Contact us
          </Heading>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-[130px]">
            {contactDetails.map((detail, index) => (
              <ContactCard key={index} {...detail} />
            ))}
          </div>

          {/* Contact Form */}
          <div className="bg-primary rounded-xl shadow-sm p-14 max-w-2xl mx-auto mt-[100px]">
            <h2
              className={`text-[28px] font-bold text-white mb-2 text-center ${bigShoulders.className}`}
            >
              Get in touch with us
            </h2>
            <p
              className={`text-white mb-6 leading-8 text-center ${plusJakarta.className}`}
            >
              we’ll get back to you as soon as possible.
            </p>

            <Form className="space-y-4" layout="vertical">
              <TextInput name="name" label="Full Name" />
              <TextInput name="email" label="Email" />

              <Form.Item
                label={<p className="text-white text-[16px]">Message</p>}
                rules={[
                  {
                    required: true,
                    message: `Please enter your ${"Message".toLowerCase()}`,
                  },
                ]}
              >
                <Input.TextArea
                  placeholder="Your message"
                  name="message"
                  rows={5}
                  style={{
                    resize: "none",
                    border: "1px solid #d9d9d9",
                    outline: "none",
                    boxShadow: "none",
                    backgroundColor: "white",
                    borderRadius: "4px",
                    padding: "8px",
                  }}
                  className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF4D4F] focus:border-transparent resize-none"
                />
              </Form.Item>

              <div className="flex w-full justify-end mt-4">
                <button
                  type="submit"
                  className="px-6 py-3 w-full bg-[#3843ff] text-white font-bold rounded-lg text-lg transition-colors duration-200"
                >
                  Submit your message
                </button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
