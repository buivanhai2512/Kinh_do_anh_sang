"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

// Định nghĩa kiểu dữ liệu cho các mục menu
interface MenuItem {
  href: string;
  label: string;
  dropdownItems?: MenuItem[]; // dropdownItems là một mảng các MenuItem (nếu có)
}

// Mảng các mục menu với kiểu đã định nghĩa
const menuItems: MenuItem[] = [
  { href: "/", label: "Trang chủ" },
  {
    href: "/gioi-thieu",
    label: "Giới thiệu",
    dropdownItems: [
      { href: "/gioi-thieu/gioi-thieu-chung", label: "Giới thiệu chung" },
      { href: "/gioi-thieu/dich-vu", label: "Dịch vụ luật sư" },
      { href: "/gioi-thieu/chinh-sach-bao-mat", label: "Chính sách dịch vụ và bảo mật" },
      { href: "/gioi-thieu/list-luat-su", label: "Danh sách luật sư" },
    ],
  },
  {
    href: "/dich-vu",
    label: "Dịch vụ",
    dropdownItems: [
      { href: "/dich-vu/luat-su-tu-van", label: "Luật sư tư vấn" },
      { href: "/dich-vu/luat-su-dai-dien", label: "Luật sư đại diện" },
      { href: "/dich-vu/luat-su-tranh-tung", label: "Luật sư tranh tụng" },
      { href: "/dich-vu/dich-vu-khac", label: "Dịch vụ khác" },
    ],
  },
  {
    href: "/tin-tuc",
    label: "Tin tức",
    dropdownItems: [
      { href: "/tin-tuc/hinh-su", label: "Hình sự" },
      { href: "/tin-tuc/dan-su", label: "Dân sự" },
    ],
  },
  { href: "/lien-he", label: "Liên hệ" },
];

// Hàm tìm kiếm item theo URL
const findMenuItem = (url: string, items: MenuItem[]): MenuItem | null => {
  for (const item of items) {
    if (item.href === url) {
      return item;
    }
    if (item.dropdownItems) {
      const found = findMenuItem(url, item.dropdownItems);
      if (found) return found;
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
    <div className="h-[100px] bg-[#2c2a2a]  text-white">
      <ul className=" space-x-2 max-w-[1220px] mx-auto px-8 flex h-[100px] items-center">
        {breadcrumbs.map((breadcrumb, index) => (
          <li key={index} className="flex items-center ">
            <Link href={breadcrumb.href} className="font-bold line-clamp-1 min-[394px]:text-[16px] lg:text-[22px]">
              {breadcrumb.label}
            </Link>
            {index < breadcrumbs.length - 1 && (
              <span className="mx-2">{">"}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Breadcrumbs;
