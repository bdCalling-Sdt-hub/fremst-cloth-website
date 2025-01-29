"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import Link from "next/link";
import { AiOutlineMenu } from "react-icons/ai";
import { useEffect, useState } from "react";
import { Badge, Tooltip } from "antd";
import NavItems from "./NavItems";
import MobileDrawer from "./MobileDrawer";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { Plus_Jakarta_Sans } from "next/font/google";
import profileImg from "../../assets/randomProfile4.jpg";
import { useGetUserProfileQuery } from "@/redux/apiSlices/authSlice";
const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const Navbar = () => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [tooltipWidth, setTooltipWidth] = useState("290px");
  const { data: userProfileData, isLoading } =
    useGetUserProfileQuery(undefined);

  //   const pathname = usePathname();
  const totalCredit = 1000;
  const remainingCredit = 954;

  useEffect(() => {
    const updateTooltipWidth = () => {
      if (window.innerWidth <= 768) {
        setTooltipWidth("200px");
      } else {
        setTooltipWidth("290px");
      }
    };

    updateTooltipWidth(); // Set initial value
    window.addEventListener("resize", updateTooltipWidth);

    return () => window.removeEventListener("resize", updateTooltipWidth);
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const userProfile = userProfileData?.data?.user || [];
  // console.log(userProfile);

  const tooltipContent = (
    <div className="flex items-center justify-between">
      <div className="w-[40px] hidden h-10 bg-primary text-white rounded-full md:flex items-center justify-center font-semibold text-[12px]">
        954$
      </div>
      <div className="p-2 w-[235px]">
        <p className="font-bold mb-1 text-[12px]">
          Remaining Credit:{" "}
          <span className="text-red-500"> ${remainingCredit} </span> of $
          {totalCredit}
        </p>
        <p className="text-[12px]">
          You can still purchase items worth up to this amount. Be mindful of
          your budget!
        </p>
      </div>
    </div>
  );

  const items = [
    { key: "home", label: "Home", path: "/" },
    { key: "products", label: "Products", path: "/products" },
    { key: "about-us", label: "About Us", path: "/about-us" },
    { key: "contact-us", label: "Contact Us", path: "/contact" },
  ];

  return (
    <div className={`${plusJakarta.className}`}>
      {/* 1st navbar */}
      <div className="bg-primary p-1 h-[50px] md:flex items-center justify-center font-[400] lg:text-[14px] text-[14px] text-white tracking-wide">
        <p className="hidden md:block">
          Get high-quality workwear, protective gear, and tools at unbeatable
          wholesale prices!{" "}
          <span className="font-semibold underline underline-offset-2 px-1">
            Show more
          </span>
        </p>
      </div>
      {/* 2nd navbar */}
      <header className={`bg-[#FFFFFF] shadow w-full`}>
        <nav className="container h-[100px] relative z-10 w-full">
          <div className="flex justify-between items-center h-full w-full">
            <div className="flex items-center lg:gap-0 gap-1">
              <div className="md:hidden">
                <AiOutlineMenu
                  onClick={() => setShowDrawer(!showDrawer)}
                  className="text-primaryText cursor-pointer"
                  size={24}
                />
              </div>
              {/* Logo */}
              <Link href={"/"}>
                <Image alt="Logo" src="/logo.svg" width={131} height={30} />
              </Link>
            </div>
            {/* Nav Items for Desktop */}
            <div className="hidden md:flex p-2 items-center gap-5">
              <NavItems items={items} />
            </div>

            {userProfile?.role ? (
              <div className="flex items-center space-x-4">
                <div className="hidden md:block">
                  <Badge count="4">
                    <Link href={"/cart"} className="hidden md:flex">
                      <HiOutlineShoppingBag size={34} color="#292C61" />
                    </Link>
                  </Badge>
                </div>

                <Tooltip
                  title={tooltipContent}
                  color="white"
                  placement="topRight"
                  overlayInnerStyle={{
                    color: "rgba(0, 0, 0, 0.88)",
                    width: tooltipWidth,
                  }}
                  overlayClassName="tooltip-content"
                >
                  <div className="border-2 p-1 border-primary w-10 h-10 rounded-full text-gray-600 flex items-center justify-center text-[12px] font-semibold">
                    {remainingCredit}$
                  </div>
                </Tooltip>

                <Link href={"/profile"}>
                  <div className="flex items-center justify-center border-4 pe-4 p-1 rounded-full gap-2">
                    <div>
                      <Image
                        src={profileImg}
                        alt=""
                        height={44}
                        width={44}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    </div>
                    <p className="text-xl">Asad</p>
                  </div>
                </Link>
              </div>
            ) : (
              <Link href="/login">
                <button className="bg-primary px-10 text-white py-2 rounded-md">
                  Login
                </button>
              </Link>
            )}
          </div>
        </nav>

        {/* Mobile Drawer */}
        <MobileDrawer open={showDrawer} setOpen={setShowDrawer} items={items} />
      </header>
    </div>
  );
};

export default Navbar;
