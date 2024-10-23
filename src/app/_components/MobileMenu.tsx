import React, { useState } from "react";
import { Menu, AutoComplete, Input, Empty, Spin, message } from "antd";
import { MenuProps } from "antd";
import { CloseOutlined, SearchOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useAllCategoriesClient } from "../_hook/useApi"; // Sử dụng hook của bạn

// Định nghĩa kiểu dữ liệu cho menu items
interface MenuItemProps {
  id: number;
  name: string;
  slug: string;
  title?: string;
  desc?: string;
  statusId?: number;
  children?: MenuItemProps[];
}

// Chuyển đổi dữ liệu API thành định dạng `MenuProps["items"]` cho Ant Design Menu
const convertToAntdMenuItems = (items: MenuItemProps[]): MenuProps["items"] => {
  return items.map((item) => {
    if (item.children && item.children.length > 0) {
      // Nếu có danh mục con, hiển thị danh mục con cùng với link cho danh mục cha
      return {
        key: item.slug,
        label: (
          <Link className="line-clamp-1" href={`/${item.slug}`}>
            {item.name}
          </Link>
        ),
        children: item.children.map((subItem) => ({
          key: subItem.slug,
          label: (
            <Link className="line-clamp-1" href={`/${item.slug}/${subItem.slug}`}>
              {subItem.name || subItem.title}
            </Link>
          ),
        })),
      };
    } else {
      // Nếu không có danh mục con, chỉ hiển thị link cho danh mục cha
      return {
        key: item.slug,
        label: (
          <Link className="line-clamp-1" href={`/${item.slug}`}>
            {item.name}
          </Link>
        ),
      };
    }
  });
};

// Component MobileMenu
interface MobileMenuProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isMenuOpen, setIsMenuOpen }) => {
  const [isSearchVisible, setIsSearchVisible] = useState(false); // Trạng thái cho phần tìm kiếm
  const [options, setOptions] = useState<{ value: string }[]>([]); // Trạng thái cho tìm kiếm tự động hoàn thành

  // Sử dụng hook để lấy danh mục
  const { data: menuItems = [], isLoading, isError } = useAllCategoriesClient();

  // Chuyển đổi dữ liệu menu từ API sang định dạng phù hợp
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

  if (isError) {
    // Hiển thị thông báo lỗi
    message.error("Không lấy được dữ liệu danh mục.");
  }

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
        <div className="flex justify-between p-4 items-center">
          <CloseOutlined
            className="text-2xl text-white cursor-pointer"
            onClick={() => setIsMenuOpen(false)}
          />
          <SearchOutlined
            style={{ color: "white" }}
            className="text-2xl cursor-pointer"
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

        {/* Hiển thị Spin nếu loading */}
        {isLoading ? (
          <div className="flex justify-center items-center h-[100px]">
            <Spin size="large" /> {/* Hiển thị Spin khi đang loading */}
          </div>
        ) : (
          <Menu
            onClick={handleMenuClick}
            className="custom-menu text-white"
            style={{ width: "100%" }}
            defaultSelectedKeys={["1"]}
            mode="inline"
            items={mobileMenuItems} // Sử dụng dữ liệu đã chuyển đổi
          />
        )}
      </nav>
    </>
  );
};

export default MobileMenu;
