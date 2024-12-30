/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Plus_Jakarta_Sans } from "next/font/google";
const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const NavItems = ({
  items,
  onClose,
}: {
  items: any[];
  onClose?: () => void;
}) => {
  const pathname = usePathname();

  return (
    <>
      {items.map((item, index) => (
        <Link
          key={index}
          onClick={onClose}
          className={` leading-4 ${
            plusJakarta.className
          } flex items-center p-2 pe-3 gap-2 text-lg font-[500] ${
            pathname === item.path
              ? "bg-primary rounded  drop-shadow text-white"
              : "text-[#070707]"
          }`}
          href={item.path}
        >
          <span
            className={`  ${
              pathname === item.path ? " text-white" : " text-primary"
            } `}
          >
            {" "}
            {item.icon}
          </span>{" "}
          <span> {item.label} </span>
        </Link>
      ))}
    </>
  );
};

export default NavItems;
