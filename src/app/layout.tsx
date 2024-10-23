// import type { Metadata } from "next";
import "antd/dist/reset.css";
import "./globals.css";
import Header from "./_components/Header";
import Footer from "./_components/Footer";
import ContactButtons from "./_components/ContactButtons";
import Providers from "./util/Providers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="preload" as="image" href="/banner_2.webp" />
        <link
          rel="stylesheet"
          href="https://necolas.github.io/normalize.css/8.0.1/normalize.css"
          crossOrigin=""
        />
        <meta property="og:title" content="Kinh Đô Ánh Sáng" />
        <meta property="og:description" content="Văn phòng luật sư Kinh
         Đô Ánh Sáng được thành lập năm 2024, là tổ chức hành nghề
          luật sư được thành lập bởi những Luật sư có kinh nhiệm trong các 
          lĩnh vực Hình sự, Dân sự, Đất đai, Doanh nghiệp, Hôn nhân và gia đình,… 
          cùng với cơ cấu tổ chức ổn định, đội ngũ Luật sư, Chuyên viên pháp lý và 
          cố vấn có chuyên môn giỏi và luôn tận tâm với công việc." />
        <meta property="og:image" content="/kihn đô.png" />
        <link rel="icon" href="/logo.png" sizes="32x32" type="image/png" />
      </head>
      <body>
        <Providers>
        <Header />
        {children}
        <ContactButtons />
        <Footer />
        </Providers>
      </body>
    </html>
  );
}
