import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Spin } from "antd";
import { useArticleByIds } from "../_hook/useApi";

// Định nghĩa interface cho dịch vụ (bài viết)
interface ServiceItem {
  id: number;
  title: string;
  description: string;
  slug: string;
  image: string;
}

export default function Service() {
  // Gọi hook để lấy dữ liệu bài viết từ API
  const { data, isLoading, isError, error } = useArticleByIds();

  // Lấy ra danh sách bài viết từ thuộc tính `chillrend`
  const services: ServiceItem[] = data?.chillrend || [];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[200px]">
        <Spin />
      </div>
    );
  }

  if (isError || services.length === 0) {
    return (
      <div className="text-red-500 text-center">
        Đã xảy ra lỗi khi tải dữ liệu: {error?.message || "Lỗi không xác định"} hoặc không có dịch vụ nào.
      </div>
    );
  }

  return (
    <div className="max-w-[1220px] mx-auto my-10">
      <div className="mb-5">
        <h2 className="uppercase text-[1.6em] text-center font-bold">
          DỊCH VỤ CỦA CHÚNG TÔI
        </h2>
      </div>

     <div className="flex overflow-x-auto navMenu space-x-4 p-4">
        {services.map((service) => (
          <section
            key={service.id}
            className="w-[293px] max-[608px]:w-[200px] flex-shrink-0"
          >
            <Link href={`/dich-vu/${service.slug}`}>
              <div className="relative w-full h-[120px] min-[533px]:h-48 group overflow-hidden">
                <Image
                  src={service.image}
                  alt={`Dịch vụ ${service.title}`}
                  fill
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  style={{ objectFit: "cover" }}
                  className="rounded-md transition-transform duration-300 ease-in-out group-hover:scale-110"
                />
              </div>

              <div className="py-2">
                <h3 className="text-[14px] min-[608px]:text-lg text-center line-clamp-1 uppercase font-bold my-1">
                  {service.title}
                </h3>
                <p className="text-[70%] min-[533px]:text-[95%] min-[533px]:text-justify leading-5 line-clamp-4">
                  {service.description}
                </p>
              </div>
            </Link>
          </section>
        ))}
      </div>
     </div>
  );
}
