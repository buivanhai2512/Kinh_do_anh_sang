import axios from "axios";
import { message } from "antd";

// Định nghĩa kiểu dữ liệu cho thông tin người dùng (đăng ký và đăng nhập)
interface UserValues {
  firstName: string;
  lastName: string;
  email: string;
  phone: string; // Trường này tương ứng với 'phonenumber'
}

// Định nghĩa kiểu dữ liệu cho phản hồi API chung
interface ApiResponse<T> {
  errCode: number;
  errMessage: string;
  data?: T;
}

// Định nghĩa kiểu dữ liệu cho phản hồi khi đăng ký người dùng
interface RegisterResponse {
  errCode: number;
  errMessage: string;
}

// Định nghĩa kiểu dữ liệu cho phản hồi khi đăng nhập
interface LoginResponse {
  errCode: number;
  errMessage: string;
  accessToken: string;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
}

// Định nghĩa kiểu dữ liệu cho bình luận
interface CommentValues {
  text: string;
  articleId: string;
}
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;


// Hàm đăng ký người dùng mới
export const registerUser = async (values: UserValues): Promise<RegisterResponse | null> => {
  try {
    const response = await axios.post<ApiResponse<RegisterResponse>>(
      `${API_BASE_URL}/user/create-new-user`
      ,
      {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        phonenumber: values.phone,
        password: "123456", // Giả sử mật khẩu cố định cho mục đích test
        genderId: "1", // Giả sử genderId cố định
      }
    );

    const data = response.data;
    if (data.errCode === 0) {
      return data; // Trả về dữ liệu đăng ký thành công
    } else {
      message.error(data.errMessage);
      return null;
    }
  } catch (error) {
    console.error("Lỗi khi đăng ký:", error);
    message.error("Đã xảy ra lỗi khi đăng ký.");
    return null;
  }
};

// Hàm đăng nhập người dùng
export const loginUser = async (values: UserValues): Promise<LoginResponse | null> => {
  try {
    const response = await axios.post<LoginResponse>( // Không cần ApiResponse vì bạn không có 'data' trong response
      `${API_BASE_URL}/user/login`,
      {
        email: values.email,
        password: "123456", // Mật khẩu cố định
      }
    );

    const data = response.data;
    if (data.errCode === 0 && data.accessToken) {
      return data; // Trả về cả accessToken và user
    } else {
      message.error(data.errMessage);
      return null;
    }
  } catch (error) {
    console.error("Lỗi khi đăng nhập:", error);
    message.error("Đã xảy ra lỗi khi đăng nhập.");
    return null;
  }
};

// Hàm gửi bình luận
export const submitComment = async (values: CommentValues, userId: string, token: string): Promise<boolean> => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/comment/create-new-comment`,
      {
        content: values.text,
        articleId: values.articleId,
        userId: userId,
        statusId: "1", // Giả sử trạng thái mặc định là 1
      },
      {
        headers: {
          Authorization: `Bearer ${token}`, // Đính kèm token trong headers
        },
      }
    );

    const data = response.data;
    if (data.errCode === 0) {
      message.success("Bình luận đã được gửi!");
      return true;
    } else {
      message.error(data.errMessage);
      return false;
    }
  } catch (error) {
    console.error("Lỗi khi gửi bình luận:", error);
    message.error("Đã xảy ra lỗi khi gửi bình luận.");
    return false;
  }
};
