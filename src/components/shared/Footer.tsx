"use client";

import React from "react";
import { ConfigProvider, Form, Input, message } from "antd";
import Link from "next/link";
import Image from "next/image";
import { FaFacebookF, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import { BsWhatsapp } from "react-icons/bs";
import { Send } from "lucide-react";
import { Big_Shoulders_Display } from "next/font/google";
import { Rubik } from "next/font/google";
import { Plus_Jakarta_Sans } from "next/font/google";

const rubik = Rubik({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

const bigShoulders = Big_Shoulders_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

interface SubscribeFormData {
  email: string;
}

const socialLinks = [
  { Icon: FaFacebookF, href: "#" },
  { Icon: FaTwitter, href: "#" },
  { Icon: FaLinkedinIn, href: "#" },
  { Icon: BsWhatsapp, href: "#" },
];

const linkSections = [
  {
    title: "Quick Links",
    links: [
      { label: "About Us", href: "/about-us" },
      { label: "Contact Us", href: "/contact" },
      { label: "Training", href: "/training" },
    ],
  },
  {
    title: "Quick Links",
    links: [
      { label: "FAQ", href: "/faq" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms & Conditions", href: "/terms" },
      { label: "Refund Policy", href: "/refund" },
    ],
  },
];

const Footer = () => {
  const [form] = Form.useForm<SubscribeFormData>();

  const onFinish = (values: SubscribeFormData) => {
    console.log("Success:", values);
    message.success("Successfully subscribed!");
    form.resetFields();
  };

  return (
    <footer className="bg-[#111229] text-[#EFFBF0]">
      <div className="container px-4 pt-16 pb-8">
        <div className="flex lg:flex-row flex-col justify-between">
          {/* Logo and Description Section */}
          <div>
            <div className="flex items-center">
              <Link href={"/"}>
                <Image
                  alt="Logo"
                  src="/footerLogo.svg"
                  width={145}
                  height={55}
                />
              </Link>
            </div>
            <p
              className={` ${rubik.className} text-[#EFFBF0] text-[15px] font-[400] pb-4 ps-2.5 py-[14px] tracking-wide w-[300px]`}
            >
              Helping you find and become a member of a Barcelona Cannabis club
              near you.
            </p>
            <div className="flex gap-4 ps-2.5">
              {socialLinks.map(({ Icon, href }, index) => (
                <a
                  key={index}
                  href={href}
                  className="w-8 h-8 flex items-center justify-center rounded bg-transparent border border-white hover:bg-primary transition-colors"
                >
                  <Icon className="w-5 h-5" fill="white" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Section */}
          <div>
            <div className="grid grid-cols-2">
              {linkSections.map((section, index) => (
                <div key={`${section.title}-${index}`} className="w-[227px]">
                  <h3
                    className={`font-bold mb-[30px] text-[24px] ${bigShoulders.className} text-white uppercase tracking-wide`}
                  >
                    {section.title}
                  </h3>
                  <ul className={`space-y-2 ${plusJakarta.className}`}>
                    {section.links.map((link) => (
                      <li key={link.label}>
                        <a
                          href={link.href}
                          className="transition-colors text-[16px] font-[400] text-[#BDBECE]"
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Subscribe Form Section */}
          <div>
            <div>
              <h3
                className={`font-bold mb-[30px] text-[24px] ${bigShoulders.className} text-white uppercase tracking-wide`}
              >
                Newsletter
              </h3>
              <p
                className={`mb-4 text-[16px] font-normal text-[#BDBECE] ${plusJakarta.className} tracking-wide`}
              >
                Subscribe to our newsletter for exciting news & <br /> updates.
              </p>

              <Form
                form={form}
                name="subscribe"
                onFinish={onFinish}
                autoComplete="off"
                className="flex items-center w-full"
              >
                <ConfigProvider
                  theme={{
                    token: {
                      colorTextPlaceholder: "#A5A5A5",
                    },
                  }}
                >
                  <Form.Item
                    name="email"
                    rules={[
                      { required: true, message: "Please input your email!" },
                      { type: "email", message: "Please enter a valid email!" },
                    ]}
                  >
                    <Input
                      style={{
                        height: 55,
                        width: 337,
                      }}
                      placeholder="Enter Your Email"
                      className="bg-[#181D21] border border-transparent placeholder-[#A5A5A5] rounded-full footerInput"
                      suffix={
                        <button
                          style={{
                            height: 55,
                          }}
                          type="submit"
                          className="bg-[#FFC700] text-white w-16 rounded-r-lg flex items-center justify-center"
                        >
                          <Send size={24} />
                        </button>
                      }
                    />
                  </Form.Item>
                </ConfigProvider>
              </Form>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div
          className={`mt-16 pt-8 border-t border-white/10 text-center ${plusJakarta.className} tracking-wide text-[#EBEBEB]`}
        >
          <p>All right reserved Fremst © {new Date().getFullYear()}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
