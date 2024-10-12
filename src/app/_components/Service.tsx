import Image from "next/image";
import Link from "next/link";
import React from "react";

// Dữ liệu dịch vụ
const services = [
  {
    title: "Luật sư tư vấn",
    description:
      "Luật sư tư vấn là một chuyên gia pháp lý cung cấp dịch vụ tư vấn về các vấn đề pháp lý cho cá nhân và tổ chức. Vai trò của luật sư tư vấn rất quan trọng trong việc đảm bảo rằng khách hàng hiểu rõ quyền lợi và nghĩa vụ của mình trong các tình huống pháp lý khác nhau",
    imageUrl: "/luat-su-tu-van.png",
  },
  {
    title: "Luật sư đại diện",
    description:
      "Luật sư đại diện là một chuyên gia pháp lý được ủy quyền để đại diện cho khách hàng trong các vụ việc pháp lý, từ việc đàm phán đến tham gia tố tụng tại tòa án. Vai trò của luật sư đại diện rất quan trọng trong việc bảo vệ quyền lợi hợp pháp của khách hàng và đảm bảo rằng họ được đối xử công bằng theo quy định của pháp luật.",
    imageUrl: "/luat-su-dai-dien.jpg",
  },
  {
    title: "Luật sư tranh tụng",
    description:
      "Luật sư tranh tụng hay còn gọi là Luật sư giải quyết tranh chấp. Họ thường xuất hiện khi khách hàng có nhu cầu có Luật sư hướng dẫn và đại diện để đứng ra giải quyết một tranh chấp nào đó với người khác, với cơ quan Nhà nước. Khi xảy ra một sự việc tranh chấp, nghĩa là có việc mâu thuẩn, xung đột về quyền và lợi ích.",
    imageUrl: "/luat-su-trang-chap.png",
  },
  {
    title: "Dịch vụ khác",
    description:
      "Cung cấp dịch vụ pháp lý đa dạng khác bao gồm giúp đỡ khách hàng thực hiện công việc liên quan đến thủ tục hành chính; giúp đỡ về pháp luật trong trường hợp giải quyết khiếu nại;",
    imageUrl: "/dich-vu-khac.png",
  },
];

export default function Service() {
  return (
    <div className="max-w-[1220px] mx-auto my-10">
      <h2 className="uppercase text-[1.6em] text-center font-bold">
        DỊCH VỤ CỦA CHÚNG TÔI
      </h2>
      <div className="grid grid-cols-2 min-[1220px]:p-0 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {services.map((service, index) => (
          <section key={index} className="p-4">
            <Link href={``}>
              <div className="relative w-full h-[120px] min-[533px]:h-48 group overflow-hidden">
                <Image
                  src={service.imageUrl}
                  alt={`Dịch vụ ${service.title}`}
                  fill // Thay thế layout="fill"
                  loading="lazy" // Lazy loading
                  placeholder="blur" // Mã hóa trước khi hình ảnh đầy đủ được tải
                  blurDataURL={service.imageUrl} // Bạn có thể tạo một hình ảnh nhỏ riêng hoặc sử dụng hình ảnh hiện tại
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Tối ưu hóa kích thước ảnh cho các thiết bị khác nhau
                  style={{ objectFit: "cover" }} // Thay thế objectFit="cover"
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
