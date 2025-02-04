import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import React from "react";
import AuthGuard from "@/components/AuthGuard";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Navbar />
      <AuthGuard>{children}</AuthGuard>
      <Footer />
    </div>
  );
};

export default layout;
