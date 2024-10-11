import "flickity/css/flickity.css";
import Image from "next/image";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Spin } from "antd";

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

  const banners = [
    {
      id: "banner-72465123",
      src: "/banner_2.webp",
      title: "Kinh đô ánh sáng",
      description: "Tổ chức hành nghề Luật sư cung cấp dịch vụ pháp lý chuyên sâu trong các lĩnh vực.",
      link: "https://luathungbach.vn/gioi-thieu-luat-hung-bach.html",
    },
    {
      id: "banner-1927593975",
      src: "/banner_kinhdo.webp",
      title: "SỨ MỆNH VÀ TẦM NHÌN",
      description: "Công ty Luật Hùng Bách đảm nhiệm sứ mệnh bảo vệ quyền con người.",
      link: "https://luathungbach.vn/gioi-thieu-luat-hung-bach.html",
    },
    {
      id: "banner-406446339",
      src: "/banner3.webp",
      title: "Kinh đô ánh sáng - PHÁP LÝ",
      description: "Chúng tôi cung cấp các dịch vụ pháp lý uy tín và chuyên nghiệp.",
      link: "https://luathungbach.vn/gioi-thieu-luat-hung-bach.html",
    },
  ];

  return (
    <div className="relative h-[490px] overflow-hidden">
      <Flickity className="carousel" options={flickityOptions}>
        {banners.map((banner, index) => (
          <div key={banner.id} className="relative w-full h-[490px]">
            <Image
              src={banner.src}
              alt={banner.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              style={{ objectFit: "cover" }}
              loading={index === 0 ? "eager" : "lazy"}
              placeholder="blur"
              blurDataURL={banner.src}
              priority={index === 0}
              className="-z-10"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/60 to-transparent" />
            <div className="absolute inset-0 flex justify-center items-center p-5 max-w-[1220px] w-full">
              <div className="lg:w-[41%] p-5 rounded-lg text-white">
                <h2 className="lg:text-[26px] uppercase text-[20px] font-bold tracking-[3px] line-clamp-1">{banner.title}</h2>
                <p className="text-justify lg:text-xl text-[16px] mb-5 line-clamp-5">{banner.description}</p>
                <Link href={banner.link} className="text-white bg-red-700 px-6 py-3 rounded-lg inline-flex items-center gap-2 hover:scale-105 transition duration-300 ease-in-out">
                  <span className="text-lg">Xem thêm</span>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </Flickity>
    </div>
  );
}
