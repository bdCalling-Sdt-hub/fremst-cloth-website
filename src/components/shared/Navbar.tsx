"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import Link from "next/link";
import { AiOutlineMenu } from "react-icons/ai";
import { useEffect, useState } from "react";
import { Badge, Dropdown, MenuProps, Tooltip } from "antd";
import NavItems from "./NavItems";
import MobileDrawer from "./MobileDrawer";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { Plus_Jakarta_Sans } from "next/font/google";
import { useGetUserProfileQuery } from "@/redux/apiSlices/authSlice";
import { getImageUrl } from "@/utils/getImageUrl";
import Currency from "@/utils/Currency";
import logo from "../../assets/logo.png";
import randomImage from "../../assets/randomImage22.jpg";
import { FaShoppingCart } from "react-icons/fa";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const Navbar = () => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [count, setCount] = useState(0);
  const [tooltipWidth, setTooltipWidth] = useState("290px");
  const [cartItems, setCartItems] = useState<any[]>([]);

  const { data: userProfileData, isLoading } =
    useGetUserProfileQuery(undefined);

  useEffect(() => {
    const updateCartItems = () => {
      const cartData = localStorage.getItem("cart");
      const items = cartData ? JSON.parse(cartData) : [];
      setCartItems(items);
      setCount(items.length); // Update count based on items length
    };

    updateCartItems(); // Call it initially
    window.addEventListener("storage", updateCartItems); // Sync across tabs

    return () => window.removeEventListener("storage", updateCartItems);
  }, []);

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
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Image className="w-24" src={logo} alt="" />
      </div>
    );
  }

  const userProfile = userProfileData?.data?.user || [];
  const adminProfile = userProfileData?.data || [];
  const { budget, budgetLeft } = userProfileData?.data || {};
  const role = userProfileData?.data?.user?.role || [];
  console.log(adminProfile);

  const tooltipContent = (
    <div className="flex items-center justify-between">
      <div className="w-[40px] hidden h-10 bg-primary text-white rounded-full md:flex items-center justify-center font-semibold text-[12px]">
        {budgetLeft} <Currency />
      </div>
      <div className="p-2 w-[235px]">
        <p className="font-bold mb-1 text-[12px]">
          Remaining Credit:{" "}
          <span className="text-red-500"> {budgetLeft?.toFixed(1)} </span> of
          {budget} <Currency />
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

  const items2: MenuProps["items"] =
    role !== "admin" && role !== "super-admin" && role !== "company"
      ? [
          {
            label: <Link href={"/profile"}> Profile </Link>,
            key: "0",
          },
          {
            label: (
              <Link
                href={"/login"}
                onClick={() => {
                  localStorage.removeItem("authenticationToken");
                  localStorage.removeItem("refreshToken");
                  localStorage.removeItem("role");
                  localStorage.removeItem("cart");
                  sessionStorage.removeItem("authenticationToken");
                  sessionStorage.removeItem("refreshToken");
                  sessionStorage.removeItem("role");
                  window.location.reload();
                }}
              >
                Logout
              </Link>
            ),
            key: "1",
          },
        ]
      : [
          {
            label: (
              <Link
                href={"/login"}
                onClick={() => {
                  localStorage.removeItem("authenticationToken");
                  localStorage.removeItem("refreshToken");
                  localStorage.removeItem("role");
                  localStorage.removeItem("cart");
                  sessionStorage.removeItem("authenticationToken");
                  sessionStorage.removeItem("refreshToken");
                  sessionStorage.removeItem("role");
                  window.location.reload();
                }}
              >
                Logout
              </Link>
            ),
            key: "0",
          },
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

            {userProfile?.role || role ? (
              <div className="flex items-center space-x-4">
                <div className="hidden md:block">
                  <Badge count={count ? (count === 0 ? "" : count) : ""}>
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
                  <div className="border-2 p-1 border-primary w-14 h-14 rounded-full text-gray-600 flex items-center justify-center text-[12px] font-semibold">
                    {Math.trunc(budgetLeft)} <Currency />
                  </div>
                </Tooltip>

                <div className="md:block hidden">
                  <Dropdown menu={{ items: items2 }}>
                    <a onClick={(e) => e.preventDefault()}>
                      <div className="flex items-center cursor-pointer justify-center border-4 pe-4 p-1 rounded-full gap-2">
                        <div>
                          <Image
                            src={
                              userProfile?.profile
                                ? getImageUrl(userProfile?.profile)
                                : adminProfile?.profile
                                ? getImageUrl(adminProfile?.profile)
                                : randomImage
                            }
                            alt=""
                            height={44}
                            width={44}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                        </div>
                        <p className="text-sm md:text-xl">
                          {userProfile?.name || adminProfile?.name}
                        </p>
                      </div>
                    </a>
                  </Dropdown>
                </div>
                <div className="md:hidden block">
                  <Link href="/cart">
                    <div className="flex items-center cursor-pointer justify-center  gap-2">
                      <FaShoppingCart size={30} />
                      <p className="text-sm">{cartItems?.length || 0}</p>
                    </div>
                  </Link>
                </div>
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
        <MobileDrawer
          open={showDrawer}
          setOpen={setShowDrawer}
          items={items}
          userProfile={userProfile}
          adminProfile={adminProfile}
          cartItems={cartItems}
          count={count}
        />
      </header>
    </div>
  );
};

export default Navbar;
