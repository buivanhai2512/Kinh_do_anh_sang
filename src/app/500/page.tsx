export default function Custom500() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center">
      <h1 className="text-6xl font-bold text-gray-800 mb-4">500</h1>
      <p className="text-xl text-gray-600 mb-6">
        Đã có lỗi xảy ra trên máy chủ. Vui lòng thử lại sau.
      </p>
      <a href="/" className="text-lg text-blue-500 hover:text-blue-700 underline">
        Về Trang Chủ
      </a>
    </div>
  );
}
