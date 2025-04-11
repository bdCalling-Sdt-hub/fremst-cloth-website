"use client";
import { useVerifyOtpMutation } from "@/redux/apiSlices/authSlice";
import { Button, Form, Typography } from "antd";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import OTPInput from "react-otp-input";

const { Text } = Typography;

const VerifyOtp = () => {
  const router = useRouter();
  const [otp, setOtp] = useState<string>("");
  const [email, setEmail] = useState<string | null>(null);
  const [verifyOtp, { isLoading }] = useVerifyOtpMutation();

  useEffect(() => {
    const emailFromQuery = new URLSearchParams(window.location.search).get(
      "email"
    );
    setEmail(emailFromQuery);
  }, []);

  const onFinish = async () => {
    if (!email) return;
    const data = {
      oneTimeCode: otp,
      email: email,
    };
    console.log(data);
    try {
      const response = await verifyOtp(data);
      console.log(response);
      if (response?.data?.success) {
        toast.success(response?.data?.message);
        localStorage.setItem("oneTimeToken", response?.data?.data?.data);
        router.push("/reset-password");
      } else {
        toast.error(response?.data?.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred during login.");
    }
  };

  const handleResendEmail = async () => {};
  return (
    <div>
      <div className=" mb-6">
        <h1 className="text-[25px] font-semibold mb-6 text-primary ">
          Verification code
        </h1>
        <p className=" ">
          We&apos;ll send a verification code to your email. Check your inbox
          and enter the code here.
        </p>
      </div>

      <Form layout="vertical" onFinish={onFinish}>
        <div className="flex items-center justify-center mb-6">
          <OTPInput
            value={otp}
            onChange={setOtp}
            numInputs={6}
            inputStyle={{
              height: 50,
              width: 50,
              borderRadius: "8px",
              margin: "16px",
              fontSize: "20px",
              border: "1px solid #818181",
              color: "#2B2A2A",
              outline: "none",
              marginBottom: 10,
            }}
            renderInput={(props) => <input {...props} />}
          />
        </div>

        <div className="flex items-center justify-between mb-6 ">
          <Text>Don&apos;t received code?</Text>

          <p
            onClick={handleResendEmail}
            className="login-form-forgot underline font-medium"
            style={{ color: "#00B047", cursor: "pointer" }}
          >
            Resend
          </p>
        </div>

        <Form.Item style={{ marginBottom: 0 }}>
          <Button
            htmlType="submit"
            style={{
              width: "100%",
              height: 40,
              border: "1px solid #d9d9d9",
              outline: "none",
              boxShadow: "none",
              background: "#0A2369",
              color: "white",
            }}
          >
            {isLoading ? "Loading..." : "Verify"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default VerifyOtp;
