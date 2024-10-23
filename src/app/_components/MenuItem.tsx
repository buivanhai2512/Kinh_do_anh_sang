import Link from "next/link";
import { usePathname } from "next/navigation";
import { DownOutlined } from "@ant-design/icons";

interface MenuItemProps {
  name: string;
  slug: string;
  dropdownItems?: { slug: string; name: string, title?: string }[];
}

const MenuItem: React.FC<MenuItemProps> = ({ slug, name, dropdownItems }) => {
  const pathname = usePathname() || "";

  // Kiểm tra trạng thái active chỉ khi slug là "/" và pathname là "/"
  const isHomePage = slug === "/" && pathname === "/";

  // Kiểm tra nếu đây là mục đang active
  const isActiveParent = pathname.startsWith(slug) && slug !== "/";
  const isActiveChild = dropdownItems?.some((item) => pathname.startsWith(`${slug}/${item.slug}`)) || false;

  // Tổng hợp trạng thái active
  const isActive = isHomePage || isActiveParent || isActiveChild;

  // Hàm để lấy class dựa trên trạng thái active
  const getLinkClass = (isActive: boolean, defaultColor: string) =>
    isActive ? "text-white" : defaultColor;

  return (
    <li className={`relative group ${isActive ? "bg-[#333] text-white" : ""} transition-all`}>
      {/* Link chính */}
      <Link
        href={slug}
        className={`flex uppercase whitespace-nowrap max-[900px]:py-[1px] overflow-x-auto max-w-[600px] tracking-[0.5px] items-center leading-[40px] transition-color text-[14px] p-[0_13px] font-bold ${getLinkClass(isActive, "text-black")} hover:bg-[#333] hover:text-white`}
      >
        {name}
        {dropdownItems && dropdownItems.length > 0 && (
          <span
            className={`ml-1 ${getLinkClass(isActive, "text-black")} text-[10px] flex transition-colors group-hover:text-white items-center`}
          >
            <DownOutlined />
          </span>
        )}
      </Link>

      {/* Dropdown items (nếu có) */}
      {dropdownItems && dropdownItems.length > 0 && (
        <ul className="absolute top-full left-0 navMenu dropdown-menu overflow-y-auto group-hover:block line-clamp-1 bg-white shadow-lg p-4 space-y-2 z-[100]"
        style={{ maxHeight: "200px" }}
        >
          {dropdownItems.map((item, index) => (
            <li key={index}>
              <Link
                href={`${slug}/${item.slug}`}
                className={`block p-3 ${pathname.startsWith(`${slug}/${item.slug}`) ? "bg-[#333] text-white" : "text-black"} hover:bg-[#333] hover:text-white`}
              >
                {item.name || item.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};

export default MenuItem;
