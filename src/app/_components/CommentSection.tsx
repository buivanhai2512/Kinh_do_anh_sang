import { useState, useEffect } from "react";
import { message, Form, Input, Button, Spin } from "antd";
import Image from "next/image";
import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  checkLoginStatus,
  getLoginData,
  saveLoginData,
} from "../_Services/authUtils";
import { loginUser, registerUser } from "../_Services/apiService";
import { CommentFormValues, Comment } from "../_Types/Type"; // Import các kiểu dữ liệu từ file types.ts

interface CommentSectionProps {
  articleId: number;
}
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// API để lấy tất cả các bình luận cho một bài viết
const fetchComments = async ({ queryKey }: { queryKey: [string, number] }) => {
  const [_key, articleId] = queryKey;
  const response = await axios.get(
    `${API_BASE_URL}/comment/get-all-comment?id=${articleId}`
  );
  console.log(_key)
  return response.data.data;
};
interface comment {
  articleId: string;
  statusId: string;
  userId: string | number;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  replyId: number | null;
  token: string | null;
  content?: string;
}

// Hàm gửi bình luận hoặc trả lời bình luận
const submitCommentAPI = async (commentData: comment) => {
  const { token, replyId } = commentData;
  const url = replyId
    ? `${API_BASE_URL}/comment/reply-comment`
    : `${API_BASE_URL}/comment/create-new-comment`;

  const response = await axios.post(url, commentData, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data;
};

const CommentSection = ({ articleId }: CommentSectionProps) => {
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Kiểm tra trạng thái đăng nhập

  // Kiểm tra trạng thái đăng nhập khi component được render
  useEffect(() => {
    setIsLoggedIn(checkLoginStatus());
  }, []);

  // Lấy danh sách bình luận từ API bằng React Query
  const { data: comments = [], isLoading } = useQuery({
    queryKey: ["comments", articleId],
    queryFn: fetchComments,
  });

  // Mutation để gửi bình luận hoặc trả lời bình luận
  const { mutate: submitCommentMutate } = useMutation({
    mutationFn: submitCommentAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", articleId] }); // Cập nhật lại danh sách bình luận sau khi gửi
        message.success("Gửi bình luận thành công !");
      form.resetFields();
      setReplyingTo(null);
    },
    onError: (error) => {
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      message.error("Đã xảy ra lỗi khi gửi bình luận.");
      console.error("Error submitting comment:", error);
    },
  });

  // Hàm xử lý đăng ký hoặc đăng nhập người dùng và tự động bình luận
  const handleLoginOrRegisterAndComment = async (values: CommentFormValues) => {
    const userValues = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      phone: values.phone, // Lấy số điện thoại từ form
    };

    try {
      const registerData = await registerUser(userValues);
      if (registerData) {
        const loginData = await loginUser(userValues);
        if (loginData) {
          saveLoginData(loginData.accessToken, loginData.user.id);
          setIsLoggedIn(true); // Đánh dấu là đã đăng nhập
          // Sau khi đăng nhập, tự động gửi bình luận
          const commentData = {
            ...values,
            articleId: articleId.toString(),
            replyId: replyingTo,
            statusId: "1",
            userId: Number(loginData.user.id),
            token: loginData.accessToken,
          };
          submitCommentMutate(commentData); // Gửi bình luận sau khi đăng nhập thành công
        }
      }
    } catch (error) {
      message.error("Đã xảy ra lỗi khi đăng ký hoặc đăng nhập.");
      console.error("Error during registration or login:", error);
    }
  };

  // Hàm xử lý gửi bình luận mới hoặc bình luận trả lời
  const handleCommentSubmit = async (values: CommentFormValues) => {
    if (!isLoggedIn) {
      handleLoginOrRegisterAndComment(values); // Yêu cầu đăng nhập hoặc đăng ký nếu chưa đăng nhập
      return;
    }

    try {
      const { token, userId } = getLoginData();
      const commentData = {
        ...values,
        articleId: articleId.toString(),
        replyId: replyingTo,
        statusId: "1",
        userId: Number(userId),
        token,
      };
      submitCommentMutate(commentData);
    } catch (error) {
      message.error("Đã xảy ra lỗi khi gửi bình luận vui lòng nhập lại thông tin .");
      console.error("Error:", error);
    }
  };

  // Hàm để hiển thị danh sách bình luận
  const renderComments = (comments: Comment[]) => {
    return comments.map((comment) => (
      <div
        key={comment.id}
        className={`md:p-8 py-8 ${
          !comment.replyId ? "border-b border-dashed border-gray-300" : "p-0"
        }`} // Bình luận to nhất (không có replyId) được thêm border
      >
        <div className="flex items-start justify-between space-x-4">
          <div className="flex space-x-4">
            <div className="flex-shrink-0">
              <Image
                src={
                  comment.user?.image ||
                  "https://secure.gravatar.com/avatar/cffdfe56752da6cdefb9db487c34f5ce?s=70&d=mm&r=g"
                }
                alt="Avatar"
                width={56}
                height={56}
                className="rounded-full"
              />
            </div>
            <div className="leading-6">
              <p className="font-semibold">
                {comment.user?.firstName} {comment.user?.lastName}
              </p>
              <p className="text-sm text-gray-500">
                {new Date(comment.createdAt).toLocaleString()}
              </p>
              <p>{comment.content}</p>
            </div>
          </div>
          <Button type="link" onClick={() => setReplyingTo(comment.id)}>
            Trả lời
          </Button>
        </div>

        {comment.childComment && comment.childComment.length > 0 && (
          <div className="pl-8 pt-4">
            {renderComments(comment.childComment)}
          </div>
        )}

        {/* Form để trả lời bình luận */}
        {replyingTo === comment.id && (
          
          <Form form={form} onFinish={handleCommentSubmit} className="mt-4">
           {!isLoggedIn && (
              <div className="flex flex-wrap gap-4 md:flex-nowrap">
                <Form.Item
                  name="firstName"
                  className="flex-grow"
                  rules={[{ required: true, message: "Vui lòng nhập họ!" }]}
                >
                  <Input placeholder="Họ *" />
                </Form.Item>
                <Form.Item
                  name="lastName"
                  className="flex-grow"
                  rules={[{ required: true, message: "Vui lòng nhập tên!" }]}
                >
                  <Input placeholder="Tên *" />
                </Form.Item>
                <Form.Item
                  name="phone"
                  className="flex-grow"
                  rules={[
                    { required: true, message: "Vui lòng nhập số điện thoại!" },
                    {
                      pattern: /^\d{10,11}$/,
                      message: "Số điện thoại phải là 10 hoặc 11 chữ số!",
                    },
                  ]}
                >
                  <Input placeholder="Số điện thoại *" />
                </Form.Item>
                <Form.Item
                  name="email"
                  className="flex-grow"
                  rules={[{ required: true, message: "Vui lòng nhập email!" }]}
                >
                  <Input placeholder="Email *" />
                </Form.Item>
              </div>
            )}
            <Form.Item
              name="content"
              rules={[{ required: true, message: "Vui lòng nhập bình luận!" }]}
            >
              <Input.TextArea rows={3} placeholder="Trả lời bình luận..." />
            </Form.Item>
            <Button type="primary" id="submit" htmlType="submit">
              Gửi trả lời
            </Button>
            <Button type="link" className="mx-4" onClick={() => setReplyingTo(null)}>
              Hủy
            </Button>
          </Form>
        )}
      </div>
    ));
  };

  return (
    <div>
      {isLoading ? (
        <Spin />
      ) : comments.length > 0 ? (
        renderComments(comments)
      ) : (
        <div className="py-6 text-[red]">Chưa có bình luận nào cho bài viết này.</div>
      )}

      <div className="mb-10 mt-8 bg-[#f2f2f2] p-5">
        <h2 className="text-xl font-semibold mb-4">Đánh giá bài viết</h2>
        {/* Form gửi bình luận mới */}
        {replyingTo === null && (
          <Form
            form={form}
            onFinish={handleCommentSubmit}
            className="space-y-6"
          >
            {/* Hiển thị trường thông tin người dùng nếu chưa đăng nhập */}
            {!isLoggedIn && (
              <div className="flex flex-wrap gap-4 md:flex-nowrap">
                <Form.Item
                  name="firstName"
                  className="flex-grow"
                  rules={[{ required: true, message: "Vui lòng nhập họ!" }]}
                >
                  <Input placeholder="Họ *" />
                </Form.Item>
                <Form.Item
                  name="lastName"
                  className="flex-grow"
                  rules={[{ required: true, message: "Vui lòng nhập tên!" }]}
                >
                  <Input placeholder="Tên *" />
                </Form.Item>
                <Form.Item
                  name="phone"
                  className="flex-grow"
                  rules={[
                    { required: true, message: "Vui lòng nhập số điện thoại!" },
                    {
                      pattern: /^\d{10,11}$/,
                      message: "Số điện thoại phải là 10 hoặc 11 chữ số!",
                    },
                  ]}
                >
                  <Input placeholder="Số điện thoại *" />
                </Form.Item>
                <Form.Item
                  name="email"
                  className="flex-grow"
                  rules={[{ required: true, message: "Vui lòng nhập email!" }]}
                >
                  <Input placeholder="Email *" />
                </Form.Item>
              </div>
            )}
            <Form.Item
              name="content"
              rules={[{ required: true, message: "Vui lòng nhập bình luận!" }]}
            >
              <Input.TextArea rows={4} placeholder="Bình luận của bạn *" />
            </Form.Item>
            <Button type="primary" id="submit" htmlType="submit">
              Gửi bình luận
            </Button>
          </Form>
        )}
      </div>
    </div>
  );
};

export default CommentSection;
