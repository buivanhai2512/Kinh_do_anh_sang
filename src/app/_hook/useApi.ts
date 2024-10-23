import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
interface Article {
  id: number;
  title: string;
  description: string;
  slug: string;
  image: string;
  createdAt: string;
}
interface Address {
  id: number;
  streetAddress: string;
  ward: string;
  district: string;
  city: string;
  postalCode: string;
  country: string;
  iframe: string;
  srcMap: string;
  statusId: string;
  companyId: number;
  createdAt: string;
  updatedAt: string;
}
interface CompanyDetail {
  id: number;
  companyName: string;
  industry: string;
  phone: string;
  email: string;
  image: { type: string; data: number[] };

  statusId: string;
  createdAt: string;
  updatedAt: string;
  addresses: Address[];
}
interface addresses {
  id: number;
  companyName: string;
  industry: string;
  phone: string;
  email: string;
  image: { type: string; data: number[] };
  statusId: string;
  createdAt: string;
  updatedAt: string;
}
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
// 1. Hook để lấy tất cả các danh mục từ API "get-all-category-clent"
const fetchAllCategoriesClient = async () => {
  const response = await axios.get(`${API_BASE_URL}/category/get-all-category-clent`);
  return response.data.data;
};

export const useAllCategoriesClient = () => {
  return useQuery({
    queryKey: ["allCategoriesClient"],
    queryFn: fetchAllCategoriesClient,
  });
};

// 2. Hook để lấy chi tiết bài viết từ API "get-detail-articles-client" dựa trên slug
const fetchArticleDetails = async (slug: string) => {
  const response = await axios.get(`${API_BASE_URL}/article/get-detail-articles-client?slug=${slug}`);
  return response.data.data;
};

export const useArticleDetails = (slug: string) => {
  return useQuery({
    queryKey: ["articleDetails", slug],
    queryFn: () => fetchArticleDetails(slug),
    enabled: !!slug, // Chỉ thực hiện query nếu slug tồn tại
  });
};

// 3. Hook để lấy chi tiết danh mục từ API "get-detail-category-clent" dựa trên slug
const fetchCategoryDetails = async (slug: string) => {
  const response = await axios.get(`${API_BASE_URL}/category/get-detail-category-clent?slug=${slug}`);
  return response.data.data;
};

export const useCategoryDetails = (slug: string) => {
  return useQuery({
    queryKey: ["categoryDetails", slug],
    queryFn: () => fetchCategoryDetails(slug),
    enabled: !!slug,
  });
};

// 4. Hook để lấy tất cả các danh mục từ API "get-all-category"
const fetchAllCategories = async () => {
  const response = await axios.get(`${API_BASE_URL}/category/get-all-category`);
  return response.data.data;
};

export const useAllCategories = () => {
  return useQuery({
    queryKey: ["allCategories"],
    queryFn: fetchAllCategories,
  });
};
const fetchArticleByIds = async () => {
  const response = await axios.get(`${API_BASE_URL}/category/get-detail-category-clent?slug=dich-vu`);
  return response.data.data; // Truy cập đúng vào "data" trong kết quả trả về
};
export const useArticleByIds = () => {
  return useQuery({
    queryKey: ["articleByIds"],
    queryFn: fetchArticleByIds,
  });
};

// 4. Hook để tìm kiếm bài viết từ API 
const fetchSearchArticles = async (keyword: string, limit: number, offset: number): Promise<{ data: Article[]; count: number }> => {
  const response = await axios.get(
    `${API_BASE_URL}/article/get-all-articles?keyword=${encodeURIComponent(
      keyword
    )}&limit=${limit}&offset=${offset}`
  );
  if (response.data.errCode === 0) {
    return { data: response.data.data, count: response.data.count };
  } else {
    throw new Error("Không tìm thấy bài viết nào");
  }
};

export const useSearchArticles = (keyword: string, limit: number = 10, offset: number = 0) => {
  const [previousData, setPreviousData] = useState<{ data: Article[]; count: number } | null>(null);

  const query = useQuery({
    queryKey: ["searchArticles", keyword, limit, offset],
    queryFn: () => fetchSearchArticles(keyword, limit, offset),
    enabled: !!keyword, // Chỉ gọi API khi có keyword
    retry: false, // Không tự động retry nếu có lỗi
  });

  useEffect(() => {
    if (query.data) {
      setPreviousData(query.data);
    }
  }, [query.data]);

  return {
    ...query,
    data: query.isLoading && previousData ? previousData : query.data, // Sử dụng dữ liệu trước đó nếu đang loading
  };
};
// Hàm gọi API để lấy tất cả các công ty
const fetchAllCompanies = async (): Promise<{ data: addresses[]; count: number }> => {
  const response = await axios.get(`${API_BASE_URL}/company/get-all-company`);
  if (response.data.errCode === 0) {
    return { data: response.data.data, count: response.data.count };
  } else {
    throw new Error("Không lấy được dữ liệu công ty");
  }
};
// Hook sử dụng React Query để lấy danh sách công ty
export const useAllCompanies = () => {
  return useQuery({
    queryKey: ["allCompanies"],
    queryFn: fetchAllCompanies,
    retry: false, // Không tự động retry nếu có lỗi
    staleTime: 5 * 60 * 1000, // Thời gian cache (5 phút)
  });
};
const fetchCompanyDetail = async (id: number): Promise<CompanyDetail> => {
  const response = await axios.get(`${API_BASE_URL}/company/get-detail-company?id=${id}`);
  if (response.data.errCode === 0) {
    return response.data.data;
  } else {
    throw new Error("Không lấy được chi tiết công ty");
  }
};

// Hook sử dụng React Query để lấy chi tiết công ty
export const useCompanyDetail = (id: number) => {
  return useQuery({
    queryKey: ["companyDetail", id],
    queryFn: () => fetchCompanyDetail(id),
    enabled: !!id, // Chỉ thực hiện query nếu có id
  });
};
// Hàm để gọi API lấy danh sách banner
const fetchBannerData = async () => {
  const response = await axios.get(`${API_BASE_URL}/banner/get-all-banner`);
  return response.data.data; // Truy cập vào phần "data" của kết quả trả về
};

// Hook để sử dụng trong component
export const useBannerData = () => {
  return useQuery({
    queryKey: ["bannerData"],
    queryFn: fetchBannerData,
  });
};  