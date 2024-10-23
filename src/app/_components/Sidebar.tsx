"use client";

import Link from "next/link";
import { Spin } from "antd";
import React from "react";
import { useArticleByIds } from "../_hook/useApi";
interface DropdownItem {
  title: string;
  slug: string;
}
// Component Sidebar để hiển thị danh sách bài viết
const Sidebar = () => {
  // Sử dụng hook để gọi API và lấy dữ liệu
  const { data: articleItems = [], isLoading, isError } = useArticleByIds();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[200px]">
        <Spin />
      </div>
    );
  }

  if (isError) {
    return <div className="text-[red]">Đã xảy ra lỗi khi tải dữ liệu</div>;
  }

  if (!articleItems.chillrend || articleItems.chillrend.length === 0) {
    return null; // Nếu không có bài viết nào, không hiển thị Sidebar
  }

  return (
    <div
      className="p-4 rounded-lg navMenu"
      style={{
        maxHeight: "210px", // Giới hạn chiều cao của sidebar
        overflowY: "auto",  // Thêm scroll nếu có nhiều mục
      }}
    >
      <ul className="space-y-2">
        {articleItems.chillrend.map((item: DropdownItem, idx: number) => (
          <li key={idx}>
            <Link
              href={`/dich-vu/${item.slug}`} // Sử dụng slug cho đường dẫn
              className="block p-3 bg-black text-white hover:bg-gray-800 transition-colors rounded-md"
            >
              {item.title} {/* Hiển thị title của bài viết */}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
