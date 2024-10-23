"use client";

import React, { useState } from "react";
import Image from "next/image";
import { AutoComplete, Empty, Input, Spin } from "antd";
import { SearchOutlined, MenuOutlined, CloseOutlined } from "@ant-design/icons";
import Link from "next/link";
import MobileMenu from "./MobileMenu";
import MenuItem from "./MenuItem";
import {
  useAllCategoriesClient,
  useCompanyDetail,
  useSearchArticles,
} from "../_hook/useApi"; // Sử dụng hook tìm kiếm

// Hàm chuyển buffer thành chuỗi base64
const bufferToBase64 = (buffer: number[] | undefined): string | null => {
  if (!buffer || !Array.isArray(buffer)) {
    return null;
  }
  const binary = buffer.map((byte) => String.fromCharCode(byte)).join("");
  return `data:image/png;base64,${btoa(binary)}`;
};

const isBase64Image = (image: string): boolean => {
  return /^data:image\/(jpeg|png|webp);base64,/.test(image);
};

// Định nghĩa kiểu dữ liệu cho mục menu
interface MenuItemProps {
  id: number;
  name: string;
  slug: string;
  title?: string;
  desc?: string;
  statusId?: number;
  createdAt: string;
  updatedAt: string;
  children?: MenuItemProps[];
}

export default function Header() {
  const [searchKeyword, setSearchKeyword] = useState(""); // Lưu trữ từ khóa tìm kiếm
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const {
    data: companyData,
    isLoading: logoLoading,
    isError: logoErr,
    error,
  } = useCompanyDetail(1);

  // Sử dụng hook useAllCategoriesClient để lấy danh mục
  const { data: menuItems = [], isLoading, isError } = useAllCategoriesClient();

  // Sử dụng hook useSearchArticles để tìm kiếm bài viết theo từ khóa
  const {
    data: searchResults = { data: [], count: 0 },
    isLoading: isSearchLoading,
  } = useSearchArticles(searchKeyword, 10, 0);

  // Xử lý tìm kiếm
  const handleSearch = (value: string) => {
    setSearchKeyword(value); // Cập nhật từ khóa tìm kiếm
  };

  // Lọc và hiển thị các kết quả tìm kiếm
  const filteredResults = searchResults.data.filter((item) =>
    item.title.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  // Xử lý khi người dùng chọn một kết quả tìm kiếm
  const handleSelect = (value: string) => {
    const selectedItem = searchResults.data.find((item) => item.title === value);
    if (selectedItem) {
      window.location.href = `/bai-viet/${selectedItem.slug}`; 
    }
    setIsSearchVisible(false);
  };

  // Sắp xếp các mục menu dựa trên createdAt
  const sortedMenuItems = menuItems.sort(
    (a: MenuItemProps, b: MenuItemProps) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return dateA - dateB;
    }
  );

  return (
    <header className="w-full bg-center bg-cover bg-[white] h-[90px] sticky top-0 transition-all ease-in-out duration-300 z-[1001]">
      <div className="max-w-[1220px] flex-nowrap px-4 py-2 flex h-[90px] justify-between items-center mx-auto">
        {/* Logo */}
        <div className="relative w-[365px] aspect-[365/82]">
          <Link href="/">
            {logoLoading ? (
              <Spin />
            ) : logoErr ? (
              <div>Lỗi tải logo: {error?.message}</div>
            ) : companyData?.image ? (
              <Image
                className="object-contain"
                src={
                  typeof companyData.image === "string" && isBase64Image(companyData.image)
                    ? companyData.image
                    : bufferToBase64(companyData.image.data) || "/default-logo.png"
                }
                layout="fill"
                priority
                alt={companyData?.companyName || "Company Logo"}
              />
            ) : (
              <div className="text-[red]">Không có logo</div>
            )}
          </Link>
        </div>

        {/* Menu icon cho mobile */}
        <div className="min-[1024px]:hidden flex items-center">
          {isMenuOpen ? (
            <CloseOutlined
              className="text-2xl cursor-pointer"
              onClick={() => setIsMenuOpen(false)}
            />
          ) : (
            <MenuOutlined
              className="text-2xl cursor-pointer"
              onClick={() => setIsMenuOpen(true)}
            />
          )}
        </div>

        {/* Menu items cho desktop */}
        <nav className="max-[1024px]:hidden ">
          <ul className="flex items-center max-w-full justify-center relative overflow-visible">
            {isLoading ? (
              <Spin size="small" className="m-4" /> // Hiển thị Spin khi loading
            ) : isError ? (
              <li className="text-[red]">Không lấy được dữ liệu danh mục.</li>
            ) : sortedMenuItems.length > 0 ? (
              sortedMenuItems.map((item: MenuItemProps) =>
                item.slug ? (
                  <MenuItem
                    key={item.id}
                    slug={
                      item.slug.startsWith("/") ? item.slug : `/${item.slug}`
                    }
                    name={item.name}
                    dropdownItems={item.children}
                  />
                ) : null
              )
            ) : (
              <li className="text-[red]">Không có mục nào</li>
            )}
          </ul>
        </nav>

        {/* Tìm kiếm với AutoComplete */}
        <div className="relative max-[1024px]:hidden">
          <SearchOutlined
            className="text-xl sreach cursor-pointer"
            onClick={() => setIsSearchVisible(true)}
          />
          {isSearchVisible && (
            <div
              className="absolute right-0 bg-white shadow-lg p-4 rounded"
              onMouseLeave={() => setIsSearchVisible(false)}
            >
              <AutoComplete
                options={filteredResults.map((item) => ({
                  value: item.title,
                }))}
                className="w-64 h-10 rounded-none"
                onSearch={handleSearch}
                onSelect={handleSelect}
                notFoundContent={
                  isSearchLoading ? (
                    <Spin size="small" />
                  ) : (
                    <Empty description="Không tìm thấy tin tức" />
                  )
                }
              >
                <Input.Search
                  id="custom-button-sreach"
                  placeholder="Tìm kiếm..."
                />
              </AutoComplete>
            </div>
          )}
        </div>
      </div>

      {/* Menu mobile */}
      <MobileMenu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
    </header>
  );
}
