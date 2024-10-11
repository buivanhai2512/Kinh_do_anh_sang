import Link from 'next/link';

export default function Custom404() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center">
      <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <p className="text-xl text-gray-600 mb-6">
        Trang bạn đang tìm không tồn tại. Vui lòng quay lại trang chủ.
      </p>
      <Link href="/">
        <a className="text-lg text-blue-500 hover:text-blue-700 underline">
          Về Trang Chủ
        </a>
      </Link>
    </div>
  );
}
