/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch, SetStateAction } from "react";
import randomImage from "../../assets/randomImage22.jpg";
import { ConfigProvider, Drawer, Select } from "antd";
import Link from "next/link";
import { Heart } from "lucide-react";
import { TbChevronDown, TbWorld } from "react-icons/tb";
import NavItems from "./NavItems";
import Image from "next/image";
import { getImageUrl } from "@/utils/getImageUrl";
const MobileDrawer = ({
  open,
  setOpen,
  items,
  userProfile,
  adminProfile,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  items: any[];
  userProfile: any;
  adminProfile: any;
  cartItems: any[];
  count: number;
}) => {
  const onClose = () => {
    setOpen(!open);
  };

  const languageOptions = [
    { value: "en", label: "English", shortLabel: "EN" },
    { value: "bn", label: "Bengali", shortLabel: "BN" },
    { value: "hi", label: "Hindi", shortLabel: "HI" },
    { value: "es", label: "Spanish", shortLabel: "ES" },
  ];

  const customLabel = (option: any) => (
    <div className="flex items-center gap-2">
      <span>{option.label}</span>
    </div>
  );

  return (
    <Drawer placement="right" onClose={onClose} open={open}>
      <div className="flex flex-col w-[80%] gap-8">
        <NavItems items={items} onClose={onClose} />

        <div className="flex items-center gap-6">
          <Link href={"/favorite"} className="">
            <Heart size={26} color="#292c61" />
          </Link>
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
        </div>
        <ConfigProvider
          theme={{
            components: {
              Select: {
                optionSelectedColor: "#ffffff",
                optionSelectedBg: "#292c61",
                optionActiveBg: "#fdf0e9",
                activeBorderColor: "#292c61",
                hoverBorderColor: "transparent",
              },
            },
          }}
        >
          <Select
            style={{ height: "45px" }}
            defaultValue="en"
            options={languageOptions}
            // variant={'borderless'}
            prefix={<TbWorld size={26} color="#292c61" />}
            suffixIcon={
              <div className="ms-2">
                <TbChevronDown size={20} color="#292c61" />
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
    </Drawer>
  );
};

export default MobileDrawer;
