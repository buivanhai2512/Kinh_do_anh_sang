"use client";
import React, { useState } from "react";
import Image from "next/image";
import { AutoComplete, Empty, Input } from "antd";
import { SearchOutlined, MenuOutlined, CloseOutlined } from "@ant-design/icons";
import Link from "next/link";
import MobileMenu from "./MobileMenu";
import MenuItem from "./MenuItem";

// Dữ liệu menu
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

export default function Header() {
  const [options, setOptions] = useState<{ value: string }[]>([]);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Xử lý tìm kiếm
  const handleSearch = (value: string) => {
    setOptions(
      value
        ? ["apple", "banana", "orange", "grape", "pineapple"]
            .filter((item) => item.toLowerCase().includes(value.toLowerCase()))
            .map((item) => ({ value: item }))
        : []
    );
  };

  // Xử lý khi người dùng chọn một mục từ AutoComplete
  const handleSelect = (value: string) => {
    console.log("Bạn đã chọn:", value);
    setIsSearchVisible(false);
  };

  return (
    <header className="w-full bg-center bg-cover bg-[white] h-[90px] sticky top-0 transition-all ease-in-out duration-300 z-[1001]">
      <div className="max-w-[1220px] flex-nowrap px-4 py-2 flex h-[90px] justify-between items-center mx-auto">
        {/* Logo */}
        <div className="mr-8 w-[392px] lg:h-[82px]">
          <Link href="/">
            <Image
              className="h-auto object-contain"
              src="/kihn đô.png"
              priority
              width={363}
              height={83}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              alt="luat-su-binh"
            />
          </Link>
        </div>

        {/* Menu icon cho mobile */}
        <div className="min-[901px]:hidden flex items-center">
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
        <nav className="max-[900px]:hidden">
          <ul className="flex items-center max-w-full justify-center relative overflow-visible">
            {/* Render các mục menu cho desktop */}
            {menuItems.map((item, index) => (
              <MenuItem
                key={index}
                href={item.href}
                label={item.label}
                dropdownItems={item.dropdownItems}
              />
            ))}
          </ul>
        </nav>

        {/* Tìm kiếm với AutoComplete */}
        <div className="relative max-[900px]:hidden">
          <SearchOutlined
            className="text-xl sreach  cursor-pointer"
            onClick={() => setIsSearchVisible(true)}
          />
          {isSearchVisible && (
            <div
              className="absolute right-0 bg-white shadow-lg p-4 rounded"
              onMouseLeave={() => setIsSearchVisible(false)}
            >
              <AutoComplete
                options={options}
                className="w-64 h-10 rounded-none"
                onSearch={handleSearch}
                onSelect={handleSelect}
                notFoundContent={<Empty description="Không tìm thấy tin tức" />} // Hiển thị khi không tìm thấy kết quả
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
