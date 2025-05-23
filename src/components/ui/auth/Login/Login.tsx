"use client";

import TextInput from "@/components/shared/TextInput";
import { useLoginMutation } from "@/redux/apiSlices/authSlice";
import { Checkbox, Form, Input } from "antd";

import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";
import Cookies from "js-cookie";

const Login = () => {
  const [remember, setRemember] = React.useState(false);
  const router = useRouter();

  const [login] = useLoginMutation();

  const onFinish = async (values: { email: string; password: string }) => {
    const { email, password } = values;
    const trimmedValues = {
      email: email.trim(),
      password: password.trim(),
    };

    try {
      const res = await login(trimmedValues).unwrap();
      if (res?.success) {
        if (res?.data?.role === "company") {
          toast.error(
            "You cannot login as a company. Please login as an employee."
          );
          return;
        }

        if (remember) {
          localStorage.setItem("authenticationToken", res?.data?.accessToken);
          localStorage.setItem("refreshToken", res?.data?.refreshToken);
          localStorage.setItem("role", res?.data?.role);
          Cookies.set("refreshToken", res?.data?.refreshToken);
        } else {
          sessionStorage.setItem("authenticationToken", res?.data?.accessToken);
          sessionStorage.setItem("refreshToken", res?.data?.refreshToken);
          sessionStorage.setItem("role", res?.data?.role);
          Cookies.set("refreshToken", res?.data?.refreshToken);
        }
        toast.success(res?.message);

        setTimeout(() => {
          router.replace("/");
        }, 500);
      } else {
        toast.error(res?.message);
      }
    } catch (error: any) {
      toast.error(
        error?.data?.errorMessages[0]?.message || "Something went wrong"
      );
    }
  };

  return (
    <div>
      <div className=" mb-6">
        <h1 className="text-[25px] font-semibold mb-2">
          Log in to your account
        </h1>
        <p className="text-primary">
          {" "}
          Please enter your email and password to continue
        </p>
      </div>
      <Form onFinish={onFinish} layout="vertical">
        <TextInput name={"email"} label={"Email"} />

        <Form.Item
          name="password"
          label={<p>Password</p>}
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}
        >
          <Input.Password
            type="password"
            placeholder="Enter your password"
            style={{
              height: 40,
              border: "1px solid #d9d9d9",
              outline: "none",
              boxShadow: "none",
            }}
          />
        </Form.Item>

        <div className="flex items-center justify-between">
          <Form.Item
            style={{ marginBottom: 0 }}
            name="remember"
            valuePropName="checked"
          >
            <Checkbox
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
            >
              Remember me
            </Checkbox>
          </Form.Item>

          <a
            className="login-form-forgot text-primary font-semibold"
            href="/forgot-password"
          >
            Forgot password
          </a>
        </div>

        <Form.Item style={{ marginBottom: 0 }}>
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
            {/* {isLoading? < Spinner/> : "Sign in"} */} Sign in
          </button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
