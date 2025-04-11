"use client";
import { useForgerPasswordMutation } from "@/redux/apiSlices/authSlice";
import { Form, Input } from "antd";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";

const ForgetPassword = () => {
  const router = useRouter();
  const [forgotPassword, { isLoading }] = useForgerPasswordMutation();

  // const [form] = Form.useForm();

  const onFinish = async (values: { email: string }) => {
    console.log(values);
    const res = await forgotPassword(values);
    console.log(res);
    if (res?.data?.success) {
      toast.success(res?.data?.message);
      router.push(`/verify-otp?email=${values?.email}`);
    }
  };

  return (
    <div>
      <div className="text-center mb-4">
        <h1 className="text-[25px] font-semibold ">Forgot Password ?</h1>
      </div>

      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item
          label={<p>Email</p>}
          name="email"
          id="email"
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
          ]}
        >
          <Input
            placeholder="Enter your email address"
            style={{
              height: 40,
              border: "1px solid #d9d9d9",
              outline: "none",
              boxShadow: "none",
            }}
          />
        </Form.Item>

        <Form.Item>
          <button
            type="submit"
            style={{
              width: "100%",
              height: 45,
              color: "white",
              fontWeight: "400px",
              fontSize: "18px",

              marginTop: 20,
            }}
            className="flex items-center justify-center bg-primary rounded-lg"
          >
            {isLoading ? "Loading..." : "Send OTP"}
          </button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ForgetPassword;
