"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Spin } from "antd"; // Import các thành phần từ antd
import Image from "next/image";
import CommentSection from "@/app/_components/CommentSection";
import Breadcrumbs from "@/app/_components/Navbar";
import Sidebar from "@/app/_components/Sidebar";

// Định nghĩa kiểu PostItem cho các mục
interface PostItem {
  href: string;
  title: string;
  description: string;
  image: string;
}

// Dữ liệu giả lập cho các bài viết
const posts: PostItem[] = [
  {
    href: "/gioi-thieu/gioi-thieu-chung",
    title: "Giới thiệu chung",
    description: "Thông tin về công ty và lịch sử phát triển",
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
  {
    href: "/dich-vu/luat-su-tu-van",
    title: "Luật sư tư vấn",
    description: "Dịch vụ tư vấn pháp luật chuyên nghiệp.",
    image:
      "https://luathungbach.vn/wp-content/uploads/2023/03/Tranh-chap-con-chung.jpg",
  },
  {
    href: "/dich-vu/luat-su-dai-dien",
    title: "Luật sư đại diện",
    description: "Đại diện bảo vệ quyền lợi cho khách hàng.",
    image:
      "https://luathungbach.vn/wp-content/uploads/2023/03/Tranh-chap-con-chung.jpg",
  },
  {
    href: "/dich-vu/luat-su-tranh-tung",
    title: "Luật sư tranh tụng",
    description: "Tranh tụng tại tòa án, bảo vệ quyền lợi hợp pháp.",
    image:
      "https://luathungbach.vn/wp-content/uploads/2023/03/Tranh-chap-con-chung.jpg",
  },
  {
    href: "/dich-vu/dich-vu-khac",
    title: "Dịch vụ pháp lý khác",
    description: "Cung cấp các dịch vụ pháp lý khác.",
    image:
      "https://luathungbach.vn/wp-content/uploads/2023/03/Tranh-chap-con-chung.jpg",
  },
  {
    href: "/tin-tuc/hinh-su",
    title: "Sự kiện mới",
    description: "Cập nhật các sự kiện pháp lý nổi bật.",
    image:
      "https://luathungbach.vn/wp-content/uploads/2023/04/Dich-vu-ly-hon-3.jpg",
  },
  {
    href: "/tin-tuc/dan-su",
    title: "Hoạt động công ty",
    description: "Các hoạt động nội bộ nổi bật của công ty.",
    image:
      "https://luathungbach.vn/wp-content/uploads/2023/04/Dich-vu-ly-hon-3.jpg",
  },
];

// Component SubcategoryPage để hiển thị chi tiết bài viết
const SubcategoryPage = () => {
  const params = useParams() as Record<string, string | string[]>;
  const category = params?.category as string;
  const subcategory = params?.subcategory as string;

  const [currentPost, setCurrentPost] = useState<PostItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [imageLoading, setImageLoading] = useState(true); // Trạng thái cho việc tải ảnh

  // Tìm post dựa trên URL động
  useEffect(() => {
    const fullHref = `/${category}/${subcategory}`;
    const foundPost = posts.find((post) => post.href === fullHref);
    setCurrentPost(foundPost || null);
    setIsLoading(false);
  }, [category, subcategory]);

  if (isLoading) {
    return (
      <div className="max-w-[1220px] flex justify-center items-center h-44 mx-auto ">
        <Spin />
      </div>
    );
  }

  if (!currentPost) {
    return (
      <div className="max-w-[1220px] flex justify-center items-center h-44 mx-auto ">
        <p className="text-xl font-bold text-red-500">
          Bài viết không tồn tại!
        </p>
      </div>
    );
  }

  return (
    <>
      <Breadcrumbs />
      <div className="max-w-[1220px] mx-auto py-8 px-8">
        <div className="flex flex-wrap -mx-4">
          <div className="w-1/4 px-4 Sidebar">
            <Sidebar />
          </div>
          <div className=" max-[900px]:w-full  w-3/4 px-4">
            <h1 className="text-3xl text-[#930] font-bold mb-6">
              {currentPost.title}
            </h1>

            {/* Hiển thị Spin loader khi ảnh đang tải */}
            {imageLoading && (
              <div className="flex justify-center items-center h-80 mb-6">
                <Spin size="large" />
              </div>
            )}

            {/* Hiển thị ảnh sau khi đã tải xong */}
            <div
              className="relative w-full h-80 mb-6"
              style={{ display: imageLoading ? "none" : "block" }}
            >
              <Image
                src={currentPost.image}
                alt={currentPost.title}
                fill
                priority
                className="object-cover"
                onLoadingComplete={() => setImageLoading(false)} // Ẩn loader khi ảnh tải xong
              />
            </div>
            <p className="mb-8">{currentPost.description}</p>

            {/* Thêm phần đánh giá bình luận */}
            <CommentSection />
          </div>
        </div>
      </div>
    </>
  );
};

export default SubcategoryPage;
