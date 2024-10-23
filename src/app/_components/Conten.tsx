"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Spin } from "antd";
import { useAllCategoriesClient } from "../_hook/useApi";

// Định nghĩa kiểu dữ liệu cho bài viết
interface PostItem {
  id: number;
  title: string;
  slug: string;
  description: string;
  image: string;
}

// Định nghĩa kiểu dữ liệu cho danh mục
interface CategoryItem {
  id: number;
  name: string;
  slug: string;
  children: PostItem[];
}

export default function Content() {
  const { data: menuItems = [], isLoading, isError, error } = useAllCategoriesClient(); // Gọi hook lấy dữ liệu từ API

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[200px]">
        <Spin />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-red-500">
        Đã xảy ra lỗi khi tải dữ liệu: {error?.message || "Lỗi không xác định"}
      </div>
    );
  }

  return (
    <div className="max-w-[1220px] mx-auto pb-8">
      {/* Grid chứa các mục dịch vụ và bài viết */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {menuItems
          .filter((service: CategoryItem) => service.children && service.children.length > 0) // Chỉ hiển thị danh mục có danh mục con
          .map((service: CategoryItem, serviceIndex: number) => (
            <div key={serviceIndex} className="service-column px-4">
              {/* Lấy tiêu đề từ bài viết con đầu tiên nếu có */}
              <h2 className="text-xl font-bold mb-4 text-black">
                {service.children[0]?.title || service.name}
              </h2>
              {/* Hiển thị tối đa 3 bài viết của dịch vụ đó */}
              <div className="flex flex-col space-y-4">
                {service.children.slice(0, 3).map((post: PostItem, postIndex: number) => {
                  return (
                    <div
                      key={postIndex}
                      className="border-b gap-3 grid grid-cols-[28%_72%] items-center border-gray-300 pb-4"
                    >
                      {/* Hình ảnh của bài viết */}
                      <div className="relative w-full min-h-[100px] group overflow-hidden">
                        <Link href={`/${service.slug}/${post.slug}`} title={post.title}>
                          <Image
                            src={post.image}
                            alt={post.title || "Bài viết không có tiêu đề"}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            style={{ objectFit: "cover" }}
                            className="rounded-lg transition-transform duration-300 ease-in-out group-hover:scale-110"
                            loading="lazy"
                            placeholder="blur"
                            blurDataURL="/default-image.jpg"
                          />
                        </Link>
                      </div>
                      <div className="pr-[10px]">
                        <h3 className="text-[14px] min-[608px]:text-lg line-clamp-1 uppercase font-bold my-1">
                          {post.title || "Tiêu đề mặc định"}
                        </h3>
                        <p className="text-gray-600 text-[70%] min-[533px]:text-[95%] min-[533px]:text-justify leading-5 line-clamp-3">
                          {post.description || "Mô tả mặc định cho bài viết."}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
