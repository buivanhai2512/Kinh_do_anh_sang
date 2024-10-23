"use client"
import Image from "next/image";
import { useCompanyDetail } from "../_hook/useApi"; // Sử dụng hook để lấy dữ liệu
import { Spin } from "antd";

// Hàm để định dạng số điện thoại
function formatPhoneNumber(phoneNumber: string): string {
  return phoneNumber.replace(/(\d{4})(\d{3})(\d{3})/, "$1.$2.$3");
}

const ContactButtons = () => {
  // Lấy chi tiết công ty, giả sử companyId = 1
  const { data: companyData, isLoading, isError, error } = useCompanyDetail(1);

  if (isLoading) {
    return <div>
      <Spin/>
    </div>; // Hoặc sử dụng Spin nếu cần
  }

  if (isError) {
    return <div>Lỗi tải dữ liệu: {error?.message}</div>;
  }

  const formattedPhoneNumber = formatPhoneNumber(companyData?.phone || ""); // Định dạng số điện thoại
  const srcMap = companyData?.addresses[0]?.srcMap || "#"; // Lấy URL bản đồ từ API

  return (
    <div id="button-contact-vr" className="fixed bottom-0 z-50">
      <div id="map-vr" className="button-contact">
        <div className="phone-vr relative">
          <div className="phone-vr-circle-fill map absolute inset-0 bg-[rgba(35,217,72,0.7)] rounded-full" />
          <div className="phone-vr-img-circle map relative z-10 bg-[#1cd741] rounded-full p-2">
            <a target="_blank" href={srcMap} rel="noopener noreferrer">
              <Image
                src="https://suakhoathaibinh24h.vn/wp-content/plugins/button-contact-vr/img/showroom4.png"
                alt="Xem địa chỉ"
                width={40}
                height={40}
              />
            </a>
          </div>
        </div>
      </div>

      <div id="gom-all-in-one">
        {/* Nút Zalo */}
        <div id="zalo-vr" className="button-contact">
          <div className="phone-vr">
            <div className="phone-vr-circle-fill"></div>
            <div className="phone-vr-img-circle">
              <a
                target="_blank"
                href={`https://zalo.me/${companyData?.phone || ""}`}
                rel="noopener noreferrer"
              >
                <Image
                  src="https://luathungbach.vn/wp-content/plugins/button-contact-vr/img/zalo.png"
                  alt="Chat Zalo"
                  width={40}
                  height={40}
                />
              </a>
            </div>
          </div>
        </div>
        {/* Nút Điện thoại */}
        <div id="phone-vr" className="button-contact">
          <div className="phone-vr">
            <div className="phone-vr-circle-fill"></div>
            <div className="phone-vr-img-circle">
              <a href={`tel:${companyData?.phone}`}>
                <Image
                  src="https://luathungbach.vn/wp-content/plugins/button-contact-vr/img/phone.png"
                  alt="Gọi điện thoại"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              </a>
            </div>
          </div>
        </div>
        {/* Số điện thoại */}
        <div className="phone-bar phone-bar-n">
          <a href={`tel:${companyData?.phone}`}>
            <span className="text-phone">{formattedPhoneNumber}</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContactButtons;
