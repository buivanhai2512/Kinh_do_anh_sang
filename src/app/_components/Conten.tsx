import Image from "next/image";
import Link from "next/link";
import React from "react";

// Dữ liệu dịch vụ và bài viết
const menuItems = [
  {
    href: "/luat-su-tu-van",
    label: "Luật sư tư vấn",
    posts: [
      {
        href: "/luat-su-tu-van/bai-viet-1",
        title: "THỦ TỤC KHÁNG CÁO BẢN ÁN SƠ THẨM",
        description:
          "Bạn không đồng ý với phán quyết của Tòa án sơ thẩm? Hãy tìm hiểu về thủ tục kháng cáo.",
        image: "/luat-su-dai-dien.jpg",
      },
    ],
  },
  {
    href: "/luat-su-dai-dien",
    label: "Luật sư đại diện",
    posts: [
      {
        href: "/luat-su-dai-dien/bai-viet-1",
        title: "LUẬT SƯ ĐẠI DIỆN CHO KHÁCH HÀNG",
        description:
          "Luật sư đại diện bảo vệ quyền lợi cho khách hàng trong các vụ kiện.",
        image: "/luat-su-trang-chap.png",
      },
    ],
  },
  {
    href: "/luat-su-tranh-tung",
    label: "Luật sư tranh tụng",
    posts: [
      {
        href: "/luat-su-tranh-tung/bai-viet-1",
        title: "THỦ TỤC TRANH TỤNG HÌNH SỰ",
        description:
          "Tìm hiểu quy trình tranh tụng trong các vụ án hình sự và vai trò của luật sư.",
        image: "/luat-su-tu-van.png",
      },
    ],
  },
  {
    href: "/dich-vu-khac",
    label: "Dịch vụ khác",
    posts: [
      {
        href: "/dich-vu-khac/bai-viet-1",
        title: "DỊCH VỤ PHÁP LÝ DOANH NGHIỆP",
        description:
          "Luật sư tư vấn và hỗ trợ doanh nghiệp về các vấn đề pháp lý.",
        image: "/dich-vu-khac.png",
      },
    ],
  },
];

// Component Content để hiển thị dịch vụ và bài viết
export default function Content() {
  return (
    <div className="max-w-[1220px] mx-auto py-8 px-5 ">
      {/* Grid chứa các mục dịch vụ và bài viết */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {menuItems.map((service, serviceIndex) => (
          <div key={serviceIndex} className="service-column px-4">
            {/* Tiêu đề dịch vụ */}
            <h2 className="text-xl font-bold mb-4 text-black">
              {service.label}
            </h2>
            {/* Hiển thị bài viết của dịch vụ đó */}
            <div className="flex flex-col space-y-4">
              {service.posts.map((post, postIndex) => (
                <div
                  key={postIndex}
                  className="border-b gap-3 grid grid-cols-[28%_72%] items-center border-gray-300 pb-4"
                >
                  {/* Hình ảnh của bài viết */}
                  <div className="relative w-full min-h-[100px] group overflow-hidden">
                    <Link href={post.href} >
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill // Thay thế layout="fill"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Tối ưu kích thước hình ảnh
                        style={{ objectFit: "cover" }} // Thay thế objectFit="cover"
                        className="rounded-lg transition-transform duration-300 ease-in-out group-hover:scale-110"
                        loading="lazy" // Lazy loading cho hình ảnh
                        placeholder="blur" // Sử dụng mã hóa hình ảnh mờ
                        blurDataURL={post.image} // URL mã hóa cho hình ảnh mờ
                      />
                    </Link>
                  </div>
                  <div>
                    <h3 className="text-[14px] min-[608px]:text-lg line-clamp-1 uppercase font-bold my-1">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 text-[70%] min-[533px]:text-[95%] min-[533px]:text-justify leading-5 line-clamp-3">
                      {post.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
