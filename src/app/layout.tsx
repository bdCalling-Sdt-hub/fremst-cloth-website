import type { Metadata } from "next";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import CustomProvider from "@/utils/CustomProvider";

export const metadata: Metadata = {
  title: "FREMST E-COMMERCE",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <AntdRegistry>
          <CustomProvider>{children}</CustomProvider>
          <Toaster position="top-center" />
        </AntdRegistry>
      </body>
    </html>
  );
}
