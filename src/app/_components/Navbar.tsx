"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { DoubleRightOutlined } from "@ant-design/icons"; // Đảm bảo nhập đúng icon

// Định nghĩa kiểu dữ liệu cho các mục menu
interface MenuItem {
  href: string;
  label: string;
  dropdownItems?: MenuItem[]; // dropdownItems là một mảng các MenuItem (nếu có)
}

// Mảng các mục menu với kiểu đã định nghĩa, chỉ mục cha
const menuItems: MenuItem[] = [
  { href: "/", label: "Trang chủ" },
  { href: "/gioi-thieu", label: "Giới thiệu" }, // Chỉ hiển thị cha
  { href: "/dich-vu", label: "Dịch vụ" }, // Chỉ hiển thị cha
  { href: "/tin-tuc", label: "Tin tức" }, // Chỉ hiển thị cha
  { href: "/lien-he", label: "Liên hệ" },
];

// Hàm tìm kiếm item theo URL
const findMenuItem = (url: string, items: MenuItem[]): MenuItem | null => {
  for (const item of items) {
    if (item.href === url) {
      return item;
    }
  }
  return null;
};

// Định nghĩa kiểu dữ liệu cho breadcrumb
interface Breadcrumb {
  href: string;
  label: string;
}

const Breadcrumbs = () => {
  const pathname = usePathname() || "";
  const pathArray = pathname.split("/").filter(Boolean);

  // Khởi tạo breadcrumbs với Trang chủ
  const breadcrumbs: Breadcrumb[] = [{ href: "/", label: "Trang chủ" }];

  // Tạo breadcrumbs từ URL
  let currentPath = "";
  pathArray.forEach((segment) => {
    currentPath += `/${segment}`;
    const menuItem = findMenuItem(currentPath, menuItems);

    if (menuItem && !breadcrumbs.some((crumb) => crumb.href === menuItem.href)) {
      breadcrumbs.push({ href: menuItem.href, label: menuItem.label });
    }
  });

  return (
    <div className="h-[100px] bg-[#2c2a2a] text-white">
      <ul className="space-x-2 max-w-[1220px] mx-auto px-8 flex h-[100px] items-center">
        {breadcrumbs.map((breadcrumb, index) => (
          <li key={index} className="flex items-center">
            <Link href={breadcrumb.href} className="font-bold line-clamp-1 min-[394px]:text-[16px] lg:text-[22px]">
              {breadcrumb.label}
            </Link>
            {index < breadcrumbs.length - 1 && (
              <span className="mx-2">
                <DoubleRightOutlined /> {/* Sử dụng icon từ Ant Design */}
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Breadcrumbs;
