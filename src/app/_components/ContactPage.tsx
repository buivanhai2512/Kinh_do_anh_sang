"use client";
import { Form, Input, Button, Spin } from "antd";
import { useState, useEffect } from "react";
import Breadcrumbs from "./Navbar";
import { useCompanyDetail } from "../_hook/useApi";

// Interface for the contact form data
interface ContactFormData {
  name: string;
  phone: string;
  email: string;
  subject?: string;
  message: string;
}

const ContactForm = () => {
  const [form] = Form.useForm();
  const [loadingState, setLoadingState] = useState<boolean[]>([]); // Trạng thái loading cho từng iframe

  // Gọi API lấy chi tiết công ty và chi nhánh
  const { data: companyData, isLoading, isError, error } = useCompanyDetail(1);

  useEffect(() => {
    // Khởi tạo trạng thái loading cho tất cả các iframe
    if (companyData?.addresses) {
      setLoadingState(companyData.addresses.map(() => true));
    }
  }, [companyData]);

  const handleIframeLoad = (index: number) => {
    const updatedLoadingState = [...loadingState];
    updatedLoadingState[index] = false; // Khi iframe tải xong, chuyển trạng thái thành false
    setLoadingState(updatedLoadingState);
  };function formatPhoneNumber(phoneNumber: string): string {
    return phoneNumber.replace(/(\d{4})(\d{3})(\d{3})/, "$1.$2.$3");
  }

  // Xử lý submit form
  const onFinish = (values: ContactFormData) => {
    const mailtoLink = `mailto:haibui648@gmail.com?subject=${encodeURIComponent(values.subject || '')}&body=${encodeURIComponent(
      'Họ tên: ' + values.name +
      '\nSố điện thoại: ' + values.phone +
      '\nEmail: ' + values.email +
      '\n\nNội dung: ' + values.message
    )}`;
    window.location.href = mailtoLink;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[200px]">
        <Spin />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-red-500 text-center">
        Đã xảy ra lỗi khi tải dữ liệu: {error?.message || "Lỗi không xác định"}
      </div>
    );
  }

  return (
    <>
      <Breadcrumbs />
      <div className="max-w-[1200px] mx-auto py-8 px-8">
        <div className="flex flex-wrap gap-10 justify-between">
          {/* Office addresses */}
          <div className="w-full lg:w-1/2 flex-1 gap-6 space-y-14">
            {companyData?.addresses.map((office, index) => (
              <div
                key={index}
                className="grid items-center md:grid-cols-[45%_55%] gap-6 grid-cols-1 justify-between rounded"
              >
                <div>
                  <h3 className="font-bold text-lg mb-2">{`Chi nhánh ${office.city}`}</h3>
                  <p className="leading-5">
                    <b>Địa chỉ:</b> {office.streetAddress}, {office.ward}, {office.district}, {office.city}
                  </p>
                  <p className="leading-10 text-[#36c] font-bold">
                    <b className="text-black">Điện thoại:</b> {formatPhoneNumber(companyData.phone)}
                  </p>
                  <p className="leading-10">
                    <b>Email:</b> {companyData.email}
                  </p>
                </div>

                {/* Hiển thị Spin khi iframe chưa tải xong */}
                <div className="relative md:p-4">
                  {loadingState[index] && (
                    <div className="absolute inset-0 flex justify-center items-center">
                      <Spin size="large" />
                    </div>
                  )}
                  <iframe
                    src={office.iframe || "null"}
                    width="100%"
                    height="200"
                    className="block"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    onLoad={() => handleIframeLoad(index)}
                    onError={() => handleIframeLoad(index)} // Xử lý khi có lỗi tải iframe
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Contact form */}
          <div className="w-full lg:w-[40%] px-6">
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
                rules={[{ required: true, message: "Vui lòng nhập số điện thoại" }]}
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

              <Form.Item name="subject" rules={[
                {required: true, message: "Vui lòng nhập Tiêu đề"}
              ]}>
                <Input placeholder="Tiêu đề" />
              </Form.Item>

              <Form.Item name="message" rules={[
                { required: true, message: "Vui lòng nhập nội dung"}
              ]}>
                <Input.TextArea placeholder="Nội dung" rows={4} />
              </Form.Item>

              <Form.Item>
                <Button type="primary" className="px-16 font-bold text-lg" htmlType="submit" block>
                  Gửi đi
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactForm;
