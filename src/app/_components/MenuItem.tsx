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
  
  // Xử lý trang chủ riêng biệt
  const isHome = href === '/' && pathname === '/';

  // Xử lý danh mục cha chỉ active khi ở chính trang của nó
  const isActiveParent = pathname === href;

  // Kiểm tra nếu bất kỳ mục con nào đang được chọn
  const isActiveChild = dropdownItems?.some(item => pathname === item.href);

  // Đảm bảo chỉ kiểm tra trạng thái khi nằm trong cùng danh mục cha
  const isChildPathActive = dropdownItems?.some(item => pathname.startsWith(item.href) && href === "/services");

  return (
    <li className={`relative group ${isHome || isActiveParent || isActiveChild || isChildPathActive ? "bg-[#333] text-white" : ""}`}>
      {/* Link chính */}
      <Link
        href={href}
        className={`flex uppercase whitespace-nowrap max-[900px]:py-[1px] overflow-x-auto max-w-[600px] tracking-[0.5px] items-center leading-[40px] transition-color text-[14px] p-[0_13px] font-bold ${isHome || isActiveParent || isActiveChild || isChildPathActive ? "text-white" : "text-black"} hover:bg-[#333] hover:text-white`}
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
                className={`block p-3 ${pathname === item.href ? "bg-[#333] text-white" : "text-black"} hover:bg-[#333] hover:text-white`}
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
