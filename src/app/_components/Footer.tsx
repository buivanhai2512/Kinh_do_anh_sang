"use client";

import React from "react";
import Link from "next/link";
import { FacebookOutlined, TwitterOutlined, InstagramOutlined } from "@ant-design/icons";
import { useCompanyDetail } from "../_hook/useApi"; // Import hook để lấy dữ liệu từ API
import { Spin } from "antd";

export default function Footer() {
  // Lấy dữ liệu công ty từ API (id = 1 chỉ là ví dụ)
  const { data: companyData, isLoading, isError, error } = useCompanyDetail(1);

  if (isLoading) {
    return (
      <footer className="bg-black text-white py-6">
        <div className="max-w-[1220px] mx-auto px-4">
          <div className="flex justify-center">
            <Spin size="large" />
          </div>
        </div>
      </footer>
    );
  }

  if (isError) {
    return (
      <footer className="bg-black text-white py-6">
        <div className="max-w-[1220px] mx-auto px-4">
          <div className="text-center text-red-500">
            Lỗi khi tải dữ liệu: {error?.message || "Lỗi không xác định"}
          </div>
        </div>
      </footer>
    );
  }
  function formatPhoneNumber(phoneNumber: string): string {
    // Sử dụng Regular Expression để nhóm 4 số đầu, 3 số tiếp theo, và 3 số cuối
    return phoneNumber.replace(/(\d{4})(\d{3})(\d{3})/, "$1.$2.$3");
  }
  return (
    <footer className="bg-black text-white py-6">
      <div className="max-w-[1220px] mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-6 md:mb-0 leading-8 cursor-pointer">
            <h3 className="text-lg font-semibold mb-4">Liên hệ với chúng tôi</h3>
            <p>Địa chỉ: {companyData?.addresses[0]?.streetAddress || "Chưa có địa chỉ"}</p>
            <p>
              Điện thoại:{" "}
              <a href={`tel:${companyData?.phone}`} className="text-white">
                {formatPhoneNumber(companyData?.phone || "Chưa có số điện thoại")}
              </a>
            </p>
            <p>
              Email:{" "}
              <a href={`mailto:${companyData?.email}`} className="text-white">
                {companyData?.email || "Chưa có email"}
              </a>
            </p>
          </div>
          <div className="mb-6 md:mb-0 leading-8">
            <h3 className="text-lg font-semibold mb-4">Điều khoản</h3>
            <ul>
              <li>
                <Link href="/terms" className="text-white hover:underline">
                  Điều khoản sử dụng
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-white hover:underline">
                  Chính sách bảo mật
                </Link>
              </li>
            </ul>
          </div>
          <div className="mb-6 md:mb-0">
            <h3 className="text-lg font-semibold mb-4">Theo dõi chúng tôi</h3>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-red">
                <FacebookOutlined />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-red">
                <TwitterOutlined />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-red">
                <InstagramOutlined />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-6 border-t border-gray-600 pt-4 text-center">
          <p>&copy; {new Date().getFullYear()} Kinh Đô Ánh Sáng. Tất cả quyền được bảo lưu.</p>
        </div>
      </div>
    </footer>
  );
}
