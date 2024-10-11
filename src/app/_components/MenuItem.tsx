import Link from "next/link";
import { usePathname } from "next/navigation";
import { DownOutlined } from "@ant-design/icons";

interface MenuItemProps {
  href: string;
  label: string;
  dropdownItems?: { href: string; label: string }[];
}

const MenuItem: React.FC<MenuItemProps> = ({ href, label, dropdownItems }) => {
  const pathname = usePathname() || "";

  // Kiểm tra trạng thái active của menu chính
  const isActiveParent = pathname === href; // Kiểm tra chính xác với pathname

  // Kiểm tra nếu bất kỳ mục con nào đang được chọn
  const isActiveChild = dropdownItems?.some((item) => pathname === item.href);

  // Đảm bảo rằng nếu mục con hoặc cha được chọn thì đều có màu nền thay đổi
  const isActive = isActiveParent || isActiveChild;

  return (
    <li
      className={`relative group ${
        isActive ? "bg-[#333] text-white" : ""
      } transition-all`}
    >
      {/* Link chính */}
      <Link
        href={href}
        className={`flex uppercase whitespace-nowrap max-[900px]:py-[1px] overflow-x-auto max-w-[600px] tracking-[0.5px] items-center leading-[40px] transition-color text-[14px] p-[0_13px] font-bold ${
          isActive ? "text-white" : "text-black"
        } hover:bg-[#333] hover:text-white`}
      >
        {label}
        {dropdownItems && (
          <span className="ml-1 text-[#777777] text-[10px] flex items-center">
            <DownOutlined />
          </span>
        )}
      </Link>

      {/* Dropdown items (nếu có) */}
      {dropdownItems && (
        <ul className="absolute left-0 dropdown-menu group-hover:block bg-white shadow-lg p-4 space-y-2 z-[100]">
          {dropdownItems.map((item, index) => (
            <li key={index}>
              <Link
                href={item.href}
                className={`block p-3 ${
                  pathname === item.href ? "bg-[#333] text-white" : "text-black"
                } hover:bg-[#333] hover:text-white`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};

export default MenuItem;
