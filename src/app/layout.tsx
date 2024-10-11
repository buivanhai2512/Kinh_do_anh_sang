import type { Metadata } from "next";
import "antd/dist/reset.css";
import "./globals.css";
import Header from "./_components/Header";
import Footer from "./_components/Footer";
import ContactButtons from "./_components/ContactButtons";

export const metadata: Metadata = {
  title: "Kinh Đô Ánh Sáng",
  description: "dùng cho seo",
  icons: {
    icon: "/kihn đô.png",
  },
};

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
        <meta property="og:description" content="dùng cho seo" />
        <meta property="og:image" content="/kihn đô.png" />
        <meta property="og:url" content="http://localhost:3000" />
      </head>
      <body>
        <Header />
        {children}
        <ContactButtons />
        <Footer />
      </body>
    </html>
  );
}
