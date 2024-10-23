"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { DoubleRightOutlined } from "@ant-design/icons";
import { useAllCategoriesClient } from "../_hook/useApi"; // Import hook để gọi API
import { Spin } from "antd";

// Định nghĩa kiểu dữ liệu cho các mục menu từ API
interface MenuItem {
  id: number;
  name: string;
  slug: string;
}

// Định nghĩa kiểu dữ liệu cho breadcrumb
interface Breadcrumb {
  href: string;
  label: string;
}

const Breadcrumbs = () => {
  const pathname = usePathname() || "";
  const pathArray = pathname.split("/").filter(Boolean);

  // Sử dụng hook useAllCategoriesClient để lấy dữ liệu từ API
  const { data: menuItems = [], isLoading, isError } = useAllCategoriesClient();

  // Hàm tìm kiếm item theo URL
  const findMenuItem = (url: string, items: MenuItem[]): MenuItem | null => {
    return items.find((item) => `/${item.slug}` === url) || null;
  };

  // Khởi tạo breadcrumbs với Trang chủ
  const breadcrumbs: Breadcrumb[] = [{ href: "/", label: "Trang chủ" }];

  // Tạo breadcrumbs từ URL
  let currentPath = "";
  pathArray.forEach((segment) => {
    currentPath += `/${segment}`;
    const menuItem = findMenuItem(currentPath, menuItems);

    if (menuItem && !breadcrumbs.some((crumb) => crumb.href === currentPath)) {
      breadcrumbs.push({ href: currentPath, label: menuItem.name });
    }
  });

  if (isLoading) {
    return <div> <Spin/></div>;
  }

  if (isError) {
    return <div className="text-[red]">Đã xảy ra lỗi khi tải dữ liệu!</div>;
  }

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
                <DoubleRightOutlined />
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Breadcrumbs;
