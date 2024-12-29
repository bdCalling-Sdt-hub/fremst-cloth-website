/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
"use client";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineMenu } from "react-icons/ai";
import { useState } from "react";
import { Badge, ConfigProvider, Select, Tooltip } from "antd";
import { TbChevronDown } from "react-icons/tb";
import NavItems from "./NavItems";
import MobileDrawer from "./MobileDrawer";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { Plus_Jakarta_Sans } from "next/font/google";
const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const Navbar = () => {
  const [showDrawer, setShowDrawer] = useState(false);
  //   const pathname = usePathname();
  const totalCredit = 1000;
  const remainingCredit = 954;

  const tooltipContent = (
    <div className="flex items-center  justify-between">
      <div className=" w-[40px] h-10  bg-primary text-white rounded-full flex items-center justify-center font-semibold text-[12px] ">
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

  const languageOptions = [
    { value: "en", label: "English", shortLabel: "EN" },
    { value: "bn", label: "Bengali", shortLabel: "BN" },
    { value: "hi", label: "Hindi", shortLabel: "HI" },
    { value: "es", label: "Spanish", shortLabel: "ES" },
  ];

  const currency = [
    { value: "en", label: "Sweden(SEK kr.)" },
    { value: "bn", label: "Bengali(BDT tk.)" },
    { value: "hi", label: "Hindi(INR Rs.)" },
    { value: "es", label: "Spanish(USD $)" },
  ];

  const customLabel = (option: any) => (
    <div className="flex items-center gap-2">
      <span>{option.label}</span>
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
      {/* 1st navbar   */}
      <div className=" bg-primary p-1 h-[50px] md:flex items-center justify-center font-[400] lg:text-[14px] text-[14px] text-white tracking-wide ">
        <p className="hidden md:block">
          {" "}
          Get high-quality workwear, protective gear, and tools at unbeatable
          wholesale prices!{" "}
          <span className=" font-semibold underline underline-offset-2 px-1">
            Show more
          </span>
        </p>
        <div className="ms-5">
          <ConfigProvider
            theme={{
              components: {
                Select: {
                  optionSelectedColor: "#ffffff",
                  optionSelectedBg: "#292C61",
                  optionActiveBg: "#fdf0e9",
                  colorText: "#787878",
                },
              },
            }}
          >
            <Select
              defaultValue="en"
              options={languageOptions}
              variant={"borderless"}
              suffixIcon={
                <div className="ms-2">
                  <TbChevronDown size={20} color="#787878" />
                </div>
              }
              labelInValue
              optionLabelProp="label"
              menuItemSelectedIcon={null}
              onChange={(value) => console.log(value)}
              dropdownRender={(menu) => (
                <div className="text-white">{menu}</div>
              )}
              optionRender={(option) => (
                <div style={{ color: "" }}>{option.label}</div>
              )}
              style={{
                width: "90px",
                color: "red",
              }}
            />
          </ConfigProvider>

          <ConfigProvider
            theme={{
              components: {
                Select: {
                  optionSelectedColor: "#ffffff",
                  optionSelectedBg: "#292C61",
                  optionActiveBg: "#fdf0e9",
                  colorText: "#787878",
                },
              },
            }}
          >
            <Select
              defaultValue="en"
              options={currency}
              variant={"borderless"}
              suffixIcon={
                <div className="ms-2">
                  <TbChevronDown size={20} color="#787878" />
                </div>
              }
              labelInValue
              optionLabelProp="label"
              menuItemSelectedIcon={null}
              onChange={(value) => console.log(value)}
              optionRender={customLabel}
            />
          </ConfigProvider>
        </div>
      </div>
      {/* 2nd navbar   */}
      <header className={`bg-[#FFFFFF] shadow w-full`}>
        <nav className="container  h-[100px]  relative z-10 w-full">
          <div className="flex justify-between items-center h-full w-full ">
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
            <div className="hidden md:flex  p-2 items-center gap-5">
              <NavItems items={items} />
            </div>

            <div className="flex items-center space-x-4">
              <Badge count="4">
                <Link href={"/cart"} className="hidden md:flex">
                  <HiOutlineShoppingBag size={34} color="#292C61" />
                </Link>
              </Badge>

              <Tooltip
                title={tooltipContent}
                color="white"
                overlayInnerStyle={{
                  color: "rgba(0, 0, 0, 0.88)",
                  width: "290px",
                }}
              >
                <div className="border-2 p-1 border-primary w-10 h-10 rounded-full text-gray-600 flex items-center justify-center text-[12px] font-semibold">
                  {" "}
                  954${" "}
                </div>
              </Tooltip>

              <Link href={"/profile"} className=" flex items-center gap-2">
                <Image
                  src="/person.png"
                  alt=""
                  height={44}
                  width={44}
                  className="  rounded-full border-[2px] border-primary text-[16px]"
                />
                <p>Asad</p>
              </Link>
            </div>
          </div>
        </nav>

        {/* Mobile Drawer */}
        <MobileDrawer open={showDrawer} setOpen={setShowDrawer} items={items} />
      </header>
    </div>
  );
};

export default Navbar;
