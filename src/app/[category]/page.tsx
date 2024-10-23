"use client";

import Link from "next/link";
import Image from "next/image";
import { Spin, Pagination } from "antd"; // Thêm Pagination từ antd
import Sidebar from "../_components/Sidebar";
import Breadcrumbs from "../_components/Navbar";
import ContactForm from "../_components/ContactPage";
import { useParams } from "next/navigation";
import { useAllCategoriesClient } from "../_hook/useApi"; // Hook được import từ file API
import { useState } from "react";

// Định nghĩa kiểu dữ liệu cho bài viết
interface PostItem {
  id: number;
  title: string;
  slug: string;
  description: string;
  image: string
}
// Định nghĩa kiểu dữ liệu cho menu
interface MenuItem {
  id: number;
  name: string;
  slug: string;
  children?: PostItem[]; // Có thể có hoặc không
}
const CategoryPage = () => {
  const params = useParams();
  const category = params?.category as string; // Lấy category từ URL
  const { data: menuItems = [], isLoading } = useAllCategoriesClient(); // Sử dụng hook để lấy dữ liệu

  const [imageLoading, setImageLoading] = useState<Record<number, boolean>>({}); // Quản lý trạng thái loading của ảnh
  const [currentPage, setCurrentPage] = useState(1); // Quản lý trang hiện tại
  const itemsPerPage = 10; // Số bài viết mỗi trang

  // Hàm xử lý trạng thái tải ảnh
  const handleImageLoading = (id: number) => {
    setImageLoading((prev) => ({ ...prev, [id]: false })); // Khi ảnh tải xong, cập nhật trạng thái loading
  };

  // Tìm danh mục hiện tại dựa trên slug
  const currentCategory = menuItems.find((item: MenuItem) => item.slug === category);

  // Tính toán các bài viết được hiển thị theo phân trang
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedChildren = currentCategory?.children?.slice(startIndex, endIndex) || [];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[200px]">
        <Spin />
      </div>
    );
  }

  if (category === "lien-he") {
    return <ContactForm />;
  }

  if (!currentCategory) {
    return (
      <div className="flex text-[red] items-center justify-center h-[200px]">
        Danh mục không tồn tại!
      </div>
    );
  }
  return (
    <>
      <Breadcrumbs />
      <div className="max-w-[1220px] mx-auto py-8 px-8">
        <div className="flex flex-wrap -mx-4 justify-center">
          {/* Sidebar */}
          <div className="w-1/4 px-4 Sidebar">
            <Sidebar />
          </div>
          <div className="w-full min-[900px]:w-3/4 p-4">
            {/* Hiển thị danh sách bài viết trong danh mục */}
            {paginatedChildren.length > 0 ? (
              <>
                <div className="grid grid-cols-1 gap-6">
                  {paginatedChildren.map((post: PostItem) => (
                    <Link
                      href={`/${category}/${post.slug}`}
                      title={post.title}
                      key={post.id}
                      className="flex flex-col min-[549px]:flex-row border rounded-lg transition-shadow duration-300 items-center min-[549px]:items-center"
                      style={{ width: "100%" }}
                    >
                      <div className="relative w-full group min-[549px]:w-1/3 h-44 overflow-hidden">
                        {imageLoading[post.id] !== false && (
                          <div className="flex justify-center items-center absolute inset-0 z-10">
                            <Spin size="large" />
                          </div>
                        )}

                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          priority
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="rounded-md object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
                          onLoadingComplete={() => handleImageLoading(post.id)}
                        />
                      </div>

                      <div className="w-full min-[549px]:w-2/3 mt-4 min-[549px]:mt-0 min-[549px]:ml-6">
                        <h2 className="text-lg font-bold leading-10 uppercase px-4 min-[549px]:p-0 line-clamp-1">
                          {post.title}
                        </h2>
                        <div className="p-[0_16px_16px_16px] min-[549px]:p-0">
                          <p className="line-clamp-3 leading-5 text-[0.9em] min-[549px]:mr-3">
                            {post.description}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
                {/* Phân trang */}
                
                <div className="flex justify-center">
                <Pagination
                  current={currentPage}
                  total={currentCategory.children?.length || 0}
                  pageSize={itemsPerPage}
                  onChange={(page) => setCurrentPage(page)} // Cập nhật trang hiện tại
                  style={{ marginTop: "20px", textAlign: "center" }}
                />
                </div>
              </>
            ) : (
              <div className="flex items-center text-[red] justify-center h-[200px]">
                Danh mục này chưa có bài viết!
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryPage;
