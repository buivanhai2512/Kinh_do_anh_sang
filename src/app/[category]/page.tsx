"use client"; // Đảm bảo đây là Client Component

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Sidebar from "../_components/Sidebar";
import Breadcrumb from "../_components/Navbar";
import ContactPage from "../_components/ContactPage";
import { Spin } from "antd"; // Import Spin từ Ant Design

// Định nghĩa kiểu dữ liệu cho Post và Menu
interface PostItem {
  href: string;
  title: string;
  description: string;
  image: string;
}

interface DropdownItem {
  href: string;
  label: string;
}

interface MenuItem {
  href: string;
  label: string;
  dropdownItems?: DropdownItem[];
  posts?: PostItem[];
}

// Dữ liệu của các bài viết chính cho phần Giới thiệu
const posts: PostItem[] = [
  {
    href: "/gioi-thieu/gioi-thieu-chung",
    title: "Giới thiệu chung Giới thiệu chung",
    description: "Thông tin về công ty và lịch sử phát triển ",
    image:
      "https://luathungbach.vn/wp-content/uploads/2023/08/luat-hung-bach-tuyen-dung.jpg",
  },
  {
    href: "/gioi-thieu/dich-vu",
    title: "Dịch vụ luật sư",
    description: "Cung cấp các dịch vụ luật sư chuyên nghiệp",
    image:
      "https://luathungbach.vn/wp-content/uploads/2023/08/luat-hung-bach-tuyen-dung.jpg",
  },
  {
    href: "/gioi-thieu/chinh-sach-bao-mat",
    title: "Chính sách dịch vụ và bảo mật",
    description: "Thông tin về các chính sách bảo mật của chúng tôi",
    image:
      "https://luathungbach.vn/wp-content/uploads/2023/08/luat-hung-bach-tuyen-dung.jpg",
  },
  {
    href: "/gioi-thieu/list-luat-su",
    title: "Danh sách luật sư",
    description: "Danh sách các luật sư uy tín và kinh nghiệm",
    image:
      "https://luathungbach.vn/wp-content/uploads/2023/08/luat-hung-bach-tuyen-dung.jpg",
  },
];

// Danh sách menu chính
const menuItems: MenuItem[] = [
  {
    href: "/gioi-thieu",
    label: "Giới thiệu",
    posts: posts,
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
    posts: [
      {
        href: "/dich-vu/luat-su-tu-van",
        title: "THỦ TỤC KHÁNG CÁO BẢN ÁN SƠ THẨM",
        description:
          "Bạn không đồng ý với phán quyết của Tòa án sơ thẩm? Hãy tìm hiểu về thủ tục kháng cáo.",
        image:
          "https://luathungbach.vn/wp-content/uploads/2023/03/Tranh-chap-con-chung.jpg",
      },
      {
        href: "/dich-vu/luat-su-dai-dien",
        title: "LUẬT SƯ ĐẠI DIỆN CHO KHÁCH HÀNG",
        description:
          "Luật sư đại diện bảo vệ quyền lợi cho khách hàng trong các vụ kiện.",
        image:
          "https://luathungbach.vn/wp-content/uploads/2023/03/Tranh-chap-con-chung.jpg",
      },
      {
        href: "/dich-vu/luat-su-tranh-tung",
        title: "THỦ TỤC TRANH TỤNG HÌNH SỰ",
        description:
          "Tìm hiểu quy trình tranh tụng trong các vụ án hình sự và vai trò của luật sư.",
        image:
          "https://luathungbach.vn/wp-content/uploads/2023/03/Tranh-chap-con-chung.jpg",
      },
      {
        href: "/dich-vu/dich-vu-khac",
        title: "DỊCH VỤ PHÁP LÝ DOANH NGHIỆP",
        description:
          "Luật sư tư vấn và hỗ trợ doanh nghiệp về các vấn đề pháp lý.",
        image:
          "https://luathungbach.vn/wp-content/uploads/2023/03/Tranh-chap-con-chung.jpg",
      },
    ],
  },
  {
    href: "/tin-tuc",
    label: "Tin tức",
    dropdownItems: [
      { href: "/tin-tuc/hinh-su", label: "Hình sự" },
      { href: "/tin-tuc/dan-su", label: "Dân sự" },
    ],
    posts: [
      {
        href: "/tin-tuc/hinh-su",
        title: "THỦ TỤC KHÁNG CÁO BẢN ÁN SƠ THẨM",
        description:
          "Bạn không đồng ý với phán quyết của Tòa án sơ thẩm? Hãy tìm hiểu về thủ tục kháng cáo.",
        image:
          "https://luathungbach.vn/wp-content/uploads/2023/08/Luat-Hung-Bach-11.jpg",
      },
      {
        href: "/tin-tuc/dan-su",
        title: "LUẬT SƯ ĐẠI DIỆN CHO KHÁCH HÀNG",
        description:
          "Luật sư đại diện bảo vệ quyền lợi cho khách hàng trong các vụ kiện.",
        image:
          "https://luathungbach.vn/wp-content/uploads/2023/08/Luat-Hung-Bach-11.jpg",
      },
    ],
  },
  {
    href: "/lien-he",
    label: "Liên hệ",
  },
];

// Component chính để hiển thị danh mục và bài viết
const CategoryPage = () => {
  const params = useParams();
  const category = params?.category;
  const [currentCategory, setCurrentCategory] = useState<MenuItem | null>(null);
  const [isLoading, setIsLoading] = useState(true); // Thêm isLoading cho quá trình tải danh mục
  const [imageLoading, setImageLoading] = useState(true); // Thêm imageLoading cho quá trình tải ảnh

  useEffect(() => {
    if (category) {
      const foundCategory = menuItems.find(
        (item) => item.href === `/${category}`
      );
      setCurrentCategory(foundCategory || null);
      setIsLoading(false); // Sau khi danh mục được tải xong
      
    }
  }, [category]);

  if (isLoading) {
    return (
      <div className="max-w-[1220px] mx-auto font-bold text-2xl h-[200px] text-red-500 flex items-center justify-center">
        <Spin />
      </div>
    );
  }

  if (category === "lien-he") {
    return <ContactPage />;
  }

  if (!currentCategory) {
    return (
      <div className="max-w-[1220px] mx-auto font-bold text-2xl h-[200px] text-red-500 flex items-center justify-center">
        Danh mục không tồn tại!
      </div>
    );
  }

  return (
    <>
      <Breadcrumb />
      <div className="max-w-[1220px] mx-auto py-8 px-8">
        <div className="flex flex-wrap -mx-4">
          {/* Sử dụng component Sidebar */}
          <div className="w-1/4 px-4 Sidebar">
            <Sidebar />
          </div>

          {/* Nội dung chính */}
          <div className=" max-[900px]:w-full  w-3/4 px-4">
            <div className="grid grid-cols-1 gap-6">
              {currentCategory?.posts?.map((post, idx) => (
                <Link
                  href={post.href}
                  key={idx}
                  className="flex flex-col border md:flex-row items-center md:space-x-4"
                  style={{ display: "table", width: "100%" }}
                >
                  {/* Hiển thị Spin loader khi ảnh đang tải */}
                  {imageLoading && (
                    <div className="flex justify-center items-center h-40 w-2/6 relative">
                      <Spin size="large" />
                    </div>
                  )}

                  {/* Hiển thị ảnh sau khi đã tải xong */}
                  <div
                    className="w-2/6 relative h-40"
                    style={{
                      display: imageLoading ? "none" : "table-cell",
                      verticalAlign: "middle",
                    }}
                  >
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      priority
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="rounded-md object-cover"
                      onLoadingComplete={() => setImageLoading(false)} // Ẩn loader khi ảnh tải xong
                    />
                  </div>

                  <div
                    className="w-full px-5 text-center md:text-left"
                    style={{ display: "table-cell", verticalAlign: "middle" }}
                  >
                    <h2 className="text-lg font-bold leading-10 uppercase line-clamp-1">
                      {post.title}
                    </h2>
                    <p className="line-clamp-4">{post.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryPage;
