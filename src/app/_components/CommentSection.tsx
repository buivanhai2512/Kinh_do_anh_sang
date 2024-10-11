"use client";

import { useState } from "react";
import { message, Rate, Form, Input, Button, Checkbox } from "antd"; // Import các thành phần từ antd
import dayjs from "dayjs"; // Import thư viện dayjs để định dạng ngày tháng
import Image from "next/image";

// Định nghĩa kiểu dữ liệu cho bình luận lồng nhau
interface Comment {
  name: string;
  email: string;
  phone: string;
  text: string;
  rating: number;
  date: string;
  replies: Comment[];
}

const CommentSection = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [replyIndex, setReplyIndex] = useState<number[] | null>(null);
  const [form] = Form.useForm(); // Form instance để reset form

  // Hàm đệ quy để thêm phản hồi vào đúng vị trí
  const addReply = (comments: Comment[], indexes: number[], reply: Comment): Comment[] => {
    if (indexes.length === 1) {
      const newComments = [...comments];
      newComments[indexes[0]].replies.push(reply);
      return newComments;
    }
    const newComments = [...comments];
    newComments[indexes[0]].replies = addReply(newComments[indexes[0]].replies, indexes.slice(1), reply);
    return newComments;
  };

  // Hàm gửi bình luận mới
  const handleCommentSubmit = (values: Comment) => {
    const currentDate = dayjs().format("DD/MM/YYYY HH:mm:ss"); // Lấy thời gian hiện tại
    setComments([...comments, { ...values, date: currentDate, replies: [] }]);
    message.success("Bình luận đã được gửi!");
    form.resetFields(); // Reset form sau khi gửi bình luận thành công
  };

  // Hàm gửi phản hồi
  const handleReplySubmit = (indexes: number[], replyValues: Comment) => {
    const currentDate = dayjs().format("DD/MM/YYYY HH:mm:ss"); // Lấy thời gian hiện tại cho phản hồi
    const newReply: Comment = {
      ...replyValues,
      date: currentDate,
      replies: [],
    };
    setComments(addReply(comments, indexes, newReply)); // Sử dụng hàm đệ quy để thêm phản hồi vào đúng vị trí
    setReplyIndex(null);
    message.success("Đã trả lời bình luận!");
  };

  // Hàm đệ quy để hiển thị bình luận và phản hồi
  const renderComments = (comments: Comment[], indexes: number[] = [], level = 0) => {
    return comments.map((comment, index) => {
      const currentIndexes = [...indexes, index];
      return (
        <div
        key={index}
        className={`p-4 ${level === 0 && comments.length > 0 ? 'border-b border-gray-300' : ''}`}
        style={{ marginLeft: `${level * 10}px` }} // Đẩy lùi bình luận lồng nhau thêm 20px
      >
        {/* Hiển thị bình luận */}
        <div className="flex items-start justify-between space-x-4">
          <div className="flex space-x-4">
            <div className="flex-shrink-0">
              <Image
                src="https://secure.gravatar.com/avatar/2896da225f3f59a9d8c8b8ac324cb5e3?s=70&d=mm&r=g"
                alt="Avatar"
                width={56}
                height={56}
                className="rounded-full"
              />
            </div>

            <div className="flex-grow">
              <p className="font-semibold">{comment.name}</p>
              <Rate disabled defaultValue={comment.rating} className="mt-2 text-[14px]" />
              <p className="text-sm mb-[.9375rem] text-gray-500 mt-[.25rem]">{comment.date}</p>
              <p className="mb-4">{comment.text}</p>
            </div>
          </div>

          {/* Nút trả lời luôn nằm ngang với bình luận */}
          <Button
            type="link"
            onClick={() => setReplyIndex(currentIndexes)}
            className="text-blue-500"
          >
            Trả lời
          </Button>
        </div>

        {/* Hiển thị các phản hồi */}
        <div>{renderComments(comment.replies, currentIndexes, level + 1)}</div>

        {/* Form trả lời bình luận */}
        {replyIndex?.toString() === currentIndexes.toString() && (
          <Form
            onFinish={(values) => handleReplySubmit(currentIndexes, values)}
            className="mt-4"
          >
            <p className="text-sm font-semibold mb-2">Phản hồi đến {comment.name}</p>
            <div className="flex flex-col sm:flex-row sm:space-x-4">
              <Form.Item
                name="name"
                className="flex-1"
                rules={[{ required: true, message: "Vui lòng nhập tên!" }]}
              >
                <Input
                  placeholder="Tên *"
                  className="border border-gray-300 p-2 rounded"
                />
              </Form.Item>

              <Form.Item
                name="email"
                className="flex-1"
                rules={[
                  { required: true, message: "Vui lòng nhập email!" },
                  { type: "email", message: "Email không hợp lệ!" },
                ]}
              >
                <Input
                  placeholder="Email *"
                  className="border border-gray-300 p-2 rounded"
                />
              </Form.Item>

              <Form.Item
                name="phone"
                className="flex-1"
                rules={[{ required: true, message: "Vui lòng nhập số điện thoại!" }]}
              >
                <Input
                  placeholder="Số điện thoại *"
                  className="border border-gray-300 p-2 rounded"
                />
              </Form.Item>
            </div>

            <Form.Item
              name="text"
              rules={[{ required: true, message: "Vui lòng nhập phản hồi!" }]}
            >
              <Input.TextArea
                rows={2}
                placeholder="Phản hồi của bạn *"
                className="border border-gray-300 p-2 rounded"
              />
            </Form.Item>
            <Form.Item
          name="rating"
          label="Đánh giá"
          rules={[{ required: true, message: "Vui lòng chọn số sao!" }]}
        >
          <Rate />
        </Form.Item>

            <div className="flex space-x-4">
              <Button
                type="primary"
                htmlType="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4  rounded"
                id="submit"
              >
                Gửi phản hồi
              </Button>
              <Button
                onClick={() => setReplyIndex(null)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded"
              >
                Hủy
              </Button>
            </div>
          </Form>
        )}
      </div>
    );
  });
};

  return (
    <>
    <div className="mb-10 bg-[#f2f2f2] p-5">
      <h2 className="text-xl font-semibold mb-4">Đánh giá bài viết</h2>
      <p className="text-sm mb-4">
        Email của bạn sẽ không được hiển thị công khai. Các trường bắt buộc
        được đánh dấu *
      </p>

      <Form form={form} onFinish={handleCommentSubmit} className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:space-x-4">
          <Form.Item
            name="name"
            className="flex-1"
            rules={[{ required: true, message: "Vui lòng nhập tên!" }]}
          >
            <Input placeholder="Tên *" className="border border-gray-300 p-2 rounded" />
          </Form.Item>

          <Form.Item
            name="email"
            className="flex-1"
            rules={[
              { required: true, message: "Vui lòng nhập email!" },
              { type: "email", message: "Email không hợp lệ!" },
            ]}
          >
            <Input placeholder="Email *" className="border border-gray-300 p-2 rounded" />
          </Form.Item>

          <Form.Item
            name="phone"
            className="flex-1"
            rules={[{ required: true, message: "Vui lòng nhập số điện thoại!" }]}
          >
            <Input
              placeholder="Số điện thoại *"
              className="border border-gray-300 p-2 rounded"
            />
          </Form.Item>
        </div>

        <Form.Item
          name="text"
          rules={[{ required: true, message: "Vui lòng nhập bình luận!" }]}
        >
          <Input.TextArea
            rows={4}
            placeholder="Bình luận của bạn *"
            className="border border-gray-300 p-2 rounded w-full"
          />
        </Form.Item>

        <Form.Item
          name="rating"
          label="Đánh giá"
          rules={[{ required: true, message: "Vui lòng chọn số sao!" }]}
        >
          <Rate />
        </Form.Item>

        <Form.Item name="remember" valuePropName="checked">
          <Checkbox>
            Lưu tên của tôi, email, và trang web trong trình duyệt này cho lần
            bình luận kế tiếp của tôi.
          </Checkbox>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" id="submit">
            Gửi bình luận
          </Button>
        </Form.Item>
      </Form>

      {/* Hiển thị bình luận và phản hồi lồng nhau */}
    </div>
      {renderComments(comments)}
      </>
  );
};

export default CommentSection;
