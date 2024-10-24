"use client";

import { useParams } from "next/navigation";
import { Spin } from "antd"; // Import các thành phần từ antd
import Image from "next/image";
import CommentSection from "@/app/_components/CommentSection";
import Breadcrumbs from "@/app/_components/Navbar";
import Sidebar from "@/app/_components/Sidebar";
import { useArticleDetails } from "@/app/_hook/useApi";
import { useState, useEffect } from "react";
import Head from "next/head";


// Hàm để trích xuất các thẻ in đậm từ HTML
const extractBoldHeadings = (htmlContent: string) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlContent, "text/html");

  // Tìm tất cả các thẻ <strong> và <b>
  const boldTags = doc.querySelectorAll("strong, b");
  const headings: { id: string; text: string }[] = [];

  boldTags.forEach((tag, index) => {
    const id = `heading-${index}`;
    tag.setAttribute("id", id); // Gán ID duy nhất cho mỗi thẻ in đậm
    headings.push({ id, text: tag.textContent || "" });
  });

  return { headings, updatedHTML: doc.body.innerHTML };
};

// Component SubcategoryPage để hiển thị chi tiết bài viết
const SubcategoryPage = () => {
  const params = useParams() as Record<string, string | string[]>;
  const slug = params?.subcategory as string; // Lấy slug từ URL

  const { data: article, isLoading, isError } = useArticleDetails(slug);
  const [imageLoading, setImageLoading] = useState(true); // Trạng thái cho việc tải ảnh
  const [tableOfContents, setTableOfContents] = useState<
    { id: string; text: string }[]
  >([]);
  const [htmlContent, setHtmlContent] = useState("");

  useEffect(() => {
    if (article?.contentHTML) {
      const { headings, updatedHTML } = extractBoldHeadings(
        article.contentHTML
      );
      setTableOfContents(headings); // Lưu các tiêu đề in đậm vào state
      setHtmlContent(updatedHTML); // Cập nhật HTML với các ID mới
    }
  }, [article?.contentHTML]);

  if (isLoading) {
    return (
      <div className="max-w-[1220px] flex justify-center items-center h-44 mx-auto ">
        <Spin />
      </div>
    );
  }
  if (isError || !article) {
    return (
      <div className="max-w-[1220px] mx-auto text-[red] h-[200px] flex items-center justify-center">
        Bài viết không tồn tại!
      </div>
    );
  }

  return (
    <>
     <Head>
        <title>{article.title}</title>
        <meta property="og:title" content={article.title} />
        <meta name="description" content={article.description} />
        <meta property="og:description" content={article.description} />
        <meta property="og:image" content={article.image} />
        <meta property="og:url" content={`${process.env.NEXT_PUBLIC_API_BASE_URL}/${slug}`} />
        <meta name="twitter:title" content={article.title} />
        <meta name="twitter:description" content={article.description} />
        <meta name="twitter:image" content={article.image} />
      </Head>
      <Breadcrumbs />
      <div className="max-w-[1220px] mx-auto py-8 px-8">
        <div className="flex flex-wrap -mx-4">
          <div className="w-1/4 px-4 Sidebar">
            <Sidebar />
          </div>
          <div className="max-[900px]:w-full w-3/4 px-4">
            <h1 className="text-3xl text-[#930] font-bold mb-6">
              {article.title}
            </h1>
            <p className="mb-4">{article.description}</p>

            {/* Hiển thị Spin loader khi ảnh đang tải */}
            {imageLoading && (
              <div className="flex justify-center items-center h-80 mb-6">
                <Spin size="large" />
              </div>
            )}
            {/* Mục lục */}
            <div className="toc mb-8 p-4  border-gray-200 bg-gray-50 rounded-md">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Mục Lục
              </h2>
              <ul className="list-decimal list-inside space-y-2">
                {tableOfContents.map((heading, index) => (
                  <li
                    key={heading.id}
                    className="text-lg text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    <a href={`#${heading.id}`}>{`${index + 1}. ${
                      heading.text
                    }`}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Hiển thị ảnh sau khi đã tải xong */}
            <div
              className="relative w-full h-[500px] mb-6"
              style={{ display: imageLoading ? "none" : "block" }}
            >
              <Image
                src={article.image}
                alt={article.title}
                fill
                priority
                className="object-cover"
                onLoadingComplete={() => setImageLoading(false)} // Ẩn loader khi ảnh tải xong
              />
            </div>

            <div
              className="content-html leading-7 pb-5"
              dangerouslySetInnerHTML={{ __html: htmlContent }} // Hiển thị nội dung đã cập nhật
            />

            {/* Thêm phần đánh giá bình luận */}
            {article.id && <CommentSection articleId={article.id} />}
          </div>
        </div>
      </div>
    </>
  );
};

export default SubcategoryPage;
