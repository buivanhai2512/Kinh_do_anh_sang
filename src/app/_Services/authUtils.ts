// Kiểm tra trạng thái đăng nhập
export const checkLoginStatus = () => {
    const token = localStorage.getItem("token");
    return !!token; // Trả về true nếu có token
  };
  
  // Lưu token và userId vào localStorage
  export const saveLoginData = (token: string, userId: string) => {
    localStorage.setItem("token", token);
    localStorage.setItem("userId", userId);
  };
  
  // Lấy token và userId từ localStorage
  export const getLoginData = () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    return { token, userId };
  };
  