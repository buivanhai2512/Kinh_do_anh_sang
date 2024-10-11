"use client";

import Link from "next/link";

// Định nghĩa kiểu dữ liệu cho DropdownItem
interface DropdownItem {
  href: string;
  label: string;
}

// Dữ liệu của Sidebar sẽ được định nghĩa trực tiếp trong file này
const sidebarItems: DropdownItem[] = [
  { href: "/dich-vu/luat-su-tu-van", label: "Luật sư tư vấn" },
  { href: "/dich-vu/luat-su-dai-dien", label: "Luật sư đại diện" },
  { href: "/dich-vu/luat-su-tranh-tung", label: "Luật sư tranh tụng" },
  { href: "/dich-vu/dich-vu-khac", label: "Dịch vụ khác" },
];

// Component Sidebar để hiển thị danh sách liên kết
const Sidebar = () => {
  if (sidebarItems.length === 0) {
    return null; // Nếu không có mục nào, không hiển thị Sidebar
  }

  return (
    <div className="p-4 rounded-lg Sidebar">
      <ul className="space-y-2">
        {sidebarItems.map((item, idx) => (
          <li key={idx}>
            <Link
              href={item.href}
              className="block p-3 bg-black text-white hover:bg-gray-800 transition-colors rounded-md"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
