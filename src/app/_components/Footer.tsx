// /src/app/_components/Footer.tsx
import React from "react";
import Link from "next/link";
import { FacebookOutlined, TwitterOutlined, InstagramOutlined } from "@ant-design/icons";

export default function Footer() {
  return (
    <footer className="bg-black text-white py-6">
      <div className="max-w-[1220px] mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-6 md:mb-0 leading-8 cursor-pointer">
            <h3 className="text-lg font-semibold mb-4">Liên hệ với chúng tôi</h3>
            <p>Địa chỉ: 123 Đường Luật, Thành phố Luật, Việt Nam</p>
            <p>Điện thoại: <a href="tel:0912601896" className="text-white">0912.601.896</a></p>
            <p>Email: <a href="mailto:luatsunghia007h@gmail.com" className="text-white">luatsunghia007h@gmail.com</a></p>
          </div>
          <div className="mb-6 md:mb-0 leading-8">
            <h3 className="text-lg font-semibold mb-4">Điều khoản</h3>
            <ul>
              <li><Link href="/terms" className="text-white hover:underline">Điều khoản sử dụng</Link></li>
              <li><Link href="/privacy" className="text-white hover:underline">Chính sách bảo mật</Link></li>
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
