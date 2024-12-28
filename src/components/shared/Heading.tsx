import React from "react";
import { Big_Shoulders_Display } from "next/font/google";
const bigShoulders = Big_Shoulders_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
});

interface IButtonProps {
  name?: React.ReactNode;
  children?: React.ReactNode;
  className: string;
}

const Heading: React.FC<IButtonProps> = ({ children, className }) => {
  return (
    <div
      className={` text-primary  font-[800] lg:text-[40px] text-[22px] uppercase ${bigShoulders.className} ${className}`}
    >
      {children}
    </div>
  );
};

export default Heading;
