"use client";
import { Form, Input, Button, Spin } from "antd";
import { useState } from "react";

// Interface for the contact form data
interface ContactFormData {
  name: string; // Full name of the user
  phone: string; // User's phone number
  email: string; // User's email address
  subject?: string; // Optional subject for the message
  message: string; // Message or inquiry from the user
}

// Office address data
const offices = [
  {
    city: "Hà Nội",
    address: "L3-11.430 Cầu Am, P. Vạn Phúc, Q. Hà Đông, TP. Hà Nội",
    phone: "0912.601.896",
    email: "luatsunghia007h@gmail.com",
    website: "kinhdoanhsang.vn",
    mapSrc:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3725.3995596030004!2d105.7729061111823!3d20.976614789486177!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3134532c24b9b155%3A0xd7031070c76156e2!2zNDMwIFAuIEPhuqd1IEFtLCBW4bqhbiBQaMO6YywgSMOgIMSQw7RuZywgSMOgIE7hu5lpLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1728642552096!5m2!1svi!2s",
  },
  {
    city: "Hồ Chí Minh",
    address: "Số 306 Nguyễn Văn Lượng, phường 16, quận Gò Vấp",
    phone: "0912.601.896",
    email: "luatsunghia007h@gmail.com",
    website: "kinhdoanhsang.vn",
    mapSrc:
      "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d617.147028356543!2d106.6698374780107!3d10.83885086186099!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x5f95a17f89b5dd4d!2zTFXhuqxUIEjDmU5HIELDgUNIIC0gQ0hJIE5Iw4FOSCBI4buSIENIw40gTUlOSA!5e0!3m2!1svi!2s!4v1620976427364!5m2!1svi!2s",
  },
];

const ContactForm = () => {
  const [form] = Form.useForm();
  const [loadingState, setLoadingState] = useState<boolean[]>(Array(offices.length).fill(true)); // Trạng thái loading cho từng iframe

  // Handle form submission
  const onFinish = (values: ContactFormData) => {
    console.log("Form Data:", values);
    // Handle form submission, e.g., API call
  };

  const handleIframeLoad = (index: number) => {
    const updatedLoadingState = [...loadingState];
    updatedLoadingState[index] = false;
    setLoadingState(updatedLoadingState);
  };

  return (
    <div className="max-w-[1200px] mx-auto py-8 px-8">
      <div className="flex flex-wrap justify-between">
        {/* Office addresses */}
        <div className="w-full lg:w-1/2 space-y-8">
          {offices.map((office, index) => (
            <div
              key={index}
              className="grid md:grid-cols-2 gap-6 grid-cols-1 justify-between rounded"
            >
              <div>
                <h3 className="font-bold text-lg mb-2">{`Chi nhánh ${office.city}`}</h3>
                <p className="leading-5">
                  <b>Địa chỉ:</b> {office.address}
                </p>
                <p className="leading-10 text-[#36c] font-bold">
                  <b className="text-black">Điện thoại:</b> {office.phone}
                </p>
                <p className="leading-10">
                  <b>Email:</b> {office.email}
                </p>
                <p className="leading-10">
                  <b>Website:</b> {office.website}
                </p>
              </div>

              {/* Hiển thị Spin khi iframe chưa tải xong */}
              <div className="relative">
                {loadingState[index] && (
                  <div className="absolute inset-0 flex justify-center items-center">
                    <Spin size="large" />
                  </div>
                )}
                <iframe
                  src={office.mapSrc}
                  width="100%"
                  height="200"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  onLoad={() => handleIframeLoad(index)} // Xử lý khi iframe tải xong
                ></iframe>
              </div>
            </div>
          ))}
        </div>

        {/* Contact form */}
        <div className="w-full lg:w-[45%] p-6">
          <h3 className="text-xl font-bold mb-6">Liên hệ với chúng tôi</h3>
          <Form
            form={form}
            name="contact"
            onFinish={onFinish}
            layout="vertical"
            className="space-y-4"
          >
            <Form.Item
              name="name"
              rules={[{ required: true, message: "Vui lòng nhập tên của bạn" }]}
            >
              <Input placeholder="Họ tên" />
            </Form.Item>

            <Form.Item
              name="phone"
              rules={[
                { required: true, message: "Vui lòng nhập số điện thoại" },
              ]}
            >
              <Input placeholder="Số điện thoại" />
            </Form.Item>

            <Form.Item
              name="email"
              rules={[
                { required: true, message: "Vui lòng nhập email" },
                { type: "email", message: "Email không hợp lệ" },
              ]}
            >
              <Input placeholder="Email" />
            </Form.Item>

            <Form.Item name="subject">
              <Input placeholder="Tiêu đề" />
            </Form.Item>

            <Form.Item name="message">
              <Input.TextArea placeholder="Nội dung" rows={4} />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Gửi đi
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
