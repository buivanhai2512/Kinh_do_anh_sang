import React, { useState } from "react";
import { Menu, AutoComplete, Input, Empty } from "antd";
import { MenuProps } from "antd";
import { CloseOutlined, SearchOutlined } from "@ant-design/icons";
import Link from "next/link";

// Định nghĩa kiểu dữ liệu cho menu items
interface DropdownItem {
  href: string;
  label: string;
}

interface MenuItem {
  href: string;
  label: string;
  dropdownItems?: DropdownItem[];
}

// Dữ liệu menu với kiểu đã định nghĩa
const menuItems = [
  { href: "/", label: "Trang chủ" },
  {
    href: "/gioi-thieu",
    label: "Giới thiệu",
    dropdownItems: [
      { href: "/gioi-thieu/gioi-thieu-chung", label: "Giới thiệu chung" },
      { href: "/gioi-thieu/dich-vu", label: "Dịch vụ luật sư" },
      {
        href: "/gioi-thieu/chinh-sach-bao-mat",
        label: "Chính sách dịch vụ và bảo mật",
      },
      { href: "/gioi-thieu/list-luat-su", label: "Danh sách luật sư " },
    ],
  },
  {
    href: "/dich-vu",
    label: "Dịch vụ",
    dropdownItems: [
      { href: "/dich-vu/luat-su-tu-van", label: "Luật sư tư vấn" },
      { href: "/dich-vu/luat-su-dai-dien", label: " Luật sư đại diện" },
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
  {
    href: "/lien-he ",
    label: "Liên hệ",
  },
];

// Chuyển đổi `menuItems` thành định dạng `MenuItem[]` cho Ant Design Menu
const convertToAntdMenuItems = (items: MenuItem[]): MenuProps["items"] => {
  return items.map((item) => {
    if (item.dropdownItems) {
      return {
        key: item.href,
        label: item.label,
        children: item.dropdownItems.map((subItem) => ({
          key: subItem.href,
          label: <Link className="line-clamp-1" href={subItem.href}>{subItem.label}</Link>,
        })),
      };
    }
    return {
      key: item.href,
      label: <Link href={item.href}>{item.label}</Link>,
    };
  });
};

// Component MobileMenu
interface MobileMenuProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({
  isMenuOpen,
  setIsMenuOpen,
}) => {
  const [isSearchVisible, setIsSearchVisible] = useState(false); // Trạng thái cho phần tìm kiếm
  const [options, setOptions] = useState<{ value: string }[]>([]); // Trạng thái cho tìm kiếm tự động hoàn thành

  const mobileMenuItems: MenuProps["items"] = convertToAntdMenuItems(menuItems);

  // Xử lý tìm kiếm
  const handleSearch = (value: string) => {
    const searchData = ["apple", "banana", "orange", "grape", "pineapple"]; // Dữ liệu mô phỏng tìm kiếm
    setOptions(
      value
        ? searchData
            .filter((item) => item.toLowerCase().includes(value.toLowerCase()))
            .map((item) => ({ value: item }))
        : []
    );
  };

  const handleMenuClick: MenuProps["onClick"] = () => {
    setIsMenuOpen(false); // Đóng menu khi người dùng chọn một mục
  };

  return (
    <>
      {/* Overlay: lớp nền mờ đen */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-[1001]"
          onClick={() => setIsMenuOpen(false)} // Đóng menu khi nhấn vào overlay
        />
      )}

      {/* Menu mobile */}
      <nav
        className={`fixed top-0 left-0 h-screen w-[80%] bg-white z-[1002] menu-mobile transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{
          maxHeight: "100vh",
          overflowY: "auto",
          maxWidth: "290px",
          backgroundColor: "black",
        }}
      >
        {/* Close icon */}
        <div className="flex justify-between p-4 items-center *:text-[white]">
          <CloseOutlined
            className="text-2xl cursor-pointer"
            onClick={() => setIsMenuOpen(false)}
          />
          <SearchOutlined
            style={{ color: "white" }}
            className="text-2xl  cursor-pointer"
            onClick={() => setIsSearchVisible(!isSearchVisible)}
          />
        </div>

        {/* Form tìm kiếm trong menu mobile */}
        {isSearchVisible && (
          <div className="px-4 mb-4">
            <AutoComplete
              options={options}
              className="w-full"
              onSearch={handleSearch}
              onSelect={(value) => {
                setIsSearchVisible(false);
                console.log("Selected:", value);
              }}
              notFoundContent={<Empty description="Không tìm thấy tin tức" />} // Hiển thị khi không tìm thấy kết quả
            >
              <Input.Search placeholder="Tìm kiếm..." enterButton />
            </AutoComplete>
          </div>
        )}

        {/* Menu items */}
        <Menu
          onClick={handleMenuClick}
          className="custom-menu *:text-[white]"
          style={{ width: "100%" }}
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={mobileMenuItems} // Sử dụng dữ liệu đã chuyển đổi
        />
      </nav>
    </>
  );
};

export default MobileMenu;
