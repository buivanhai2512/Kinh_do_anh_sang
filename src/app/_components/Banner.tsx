import "flickity/css/flickity.css";
import Image from "next/image";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Spin } from "antd";
import { useBannerData } from "../_hook/useApi";

// Import Flickity chỉ khi đã vào client-side
const Flickity = dynamic(() => import("react-flickity-component"), {
  ssr: false,
  loading: () => (
    <div className="flex justify-center z-[10003]">
      <Spin />
    </div>
  ),
});

export default function Banner() {
  const flickityOptions = {
    cellAlign: "center",
    imagesLoaded: true,
    lazyLoad: 2,
    wrapAround: true,
    autoPlay: 4000,
    prevNextButtons: true,
    contain: true,
    adaptiveHeight: true,
    pageDots: true,
  };
  interface Banner {
    id: number;
    image: string;
    title: string;
    description: string;
    imageUrl?: string; // Liên kết tùy chọn
  }
  // Sử dụng hook để lấy dữ liệu từ API
  const { data: banners = [], isLoading, isError } = useBannerData();

  // Hiển thị Spin khi đang tải dữ liệu
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[490px]">
        <Spin />
      </div>
    );
  }

  // Hiển thị thông báo lỗi nếu không tải được dữ liệu
  if (isError) {
    return <div className="text-red-500 text-center">Lỗi tải dữ liệu banner</div>;
  }

  return (
    <div className="relative h-[490px] overflow-hidden">
      <Flickity className="carousel" options={flickityOptions}>
        {banners.map((banner: Banner, index: number) => {
          return (
            <div key={banner.id} className="relative w-full h-[490px]">
                <Image
                  src={banner.image}
                  alt={banner.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  style={{ objectFit: "cover" }}
                  loading={index === 0 ? "eager" : "lazy"}
                  blurDataURL={banner.image}
                  priority={index === 0}
                  className="-z-10"
                />
              <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/60 to-transparent" />
              <div className="absolute inset-0 flex justify-center items-center p-5 max-w-[1220px] w-full">
                <div className="lg:w-[41%] p-5 rounded-lg text-white">
                  <h2 className="lg:text-[26px] uppercase text-[20px] font-bold tracking-[3px] line-clamp-1">
                    {banner.title}
                  </h2>
                  <p className="text-justify lg:text-xl text-[16px] mb-5 line-clamp-5">
                    {banner.description}
                  </p>
                  <Link
                    href={banner.imageUrl || ""}
                    className="text-white bg-red-700 px-6 py-3 rounded-lg inline-flex items-center gap-2 hover:scale-105 transition duration-300 ease-in-out"
                  >
                    <span className="text-lg">Xem thêm</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </Flickity>
    </div>
  );
}
