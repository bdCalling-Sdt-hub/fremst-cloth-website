"use client";

import { Collapse } from "antd";
import { useState } from "react";

interface FaqItem {
  key: string;
  header: string;
  content: string;
}

function FaqPage() {
  const [activePanel, setActivePanel] = useState<number | null>(null);

  const faqData: FaqItem[] = [
    {
      key: "1",
      header: "What is this website about?",
      content:
        "This website is a platform where users can explore various services and information. It's designed to provide a user-friendly experience with easy navigation and relevant content.",
    },
    {
      key: "2",
      header: "How do I create an account?",
      content:
        "To create an account, click on the 'Sign Up' button and fill in your details. A confirmation email will be sent to you to verify your email address.",
    },
    {
      key: "3",
      header: "What services do you offer?",
      content:
        "We offer a variety of services including hair, nail, and beauty treatments. You can find detailed information on each service under the 'Services' section of the website.",
    },
    {
      key: "4",
      header: "How can I contact customer support?",
      content:
        "You can contact our customer support team via the 'Contact Us' page or by emailing us at support@example.com. We're here to help you 24/7.",
    },
    {
      key: "5",
      header: "What payment methods do you accept?",
      content:
        "We accept a range of payment methods including credit cards, PayPal, and bank transfers. You can choose your preferred method during the checkout process.",
    },
    {
      key: "6",
      header: "How do I track my order?",
      content:
        "Once your order is placed, you will receive a confirmation email with a tracking link. You can track your order status in the 'Order History' section of your account.",
    },
  ];

  const handlePanelChange = (key: string | string[]) => {
    setActivePanel(key ? Number(key) : null);
  };

  return (
    <>
      <div className="md:p-20 p-8 md:px-40 max-w-7xl mx-auto">
        <h1 className="md:text-4xl text-2xl mb-10 text-center font-bold">
          Frequently Asked <span className="text-primary">Questions</span>
        </h1>
        <Collapse
          accordion
          expandIconPosition="end"
          bordered={false}
          onChange={handlePanelChange}
          className="bg-[#eeeeee] space-y-3"
        >
          {faqData.map((item) => (
            <Collapse.Panel
              key={item.key}
              header={item.header}
              className={`rounded-2xl ${
                activePanel === Number(item.key)
                  ? "bg-[#f0f5fa] border-t-8 border-primary"
                  : "bg-white"
              }`}
            >
              <div
                className={`p-4 ${
                  activePanel === Number(item.key)
                    ? "text-black"
                    : "text-gray-600"
                }`}
              >
                {item.content}
              </div>
            </Collapse.Panel>
          ))}
        </Collapse>
      </div>
    </>
  );
}

export default FaqPage;
