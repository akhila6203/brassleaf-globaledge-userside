import axiosClient from "../api/axiosClient";
import API_ENDPOINTS from "../api/endpoints";

const mapCategory = (item) => ({
  id: item.term_id,
  slug: item.slug,
  name: item.name,
  parent: item.parent,
  productCount: Number(item.product_count) || 0,
  description: item.description || "",
  image: item.image_url || item.image || item.thumbnail_url || null,
});

export const getCategories = async (params = {}, config = {}) => {
  const response = await axiosClient.get(API_ENDPOINTS.CATEGORIES, {
    params,
    ...config,
  });

  const result = response.data;

  return {
    total: result.total,
    page: result.page,
    limit: result.limit,
    pages: result.pages,
    categories: (result.data || []).map(mapCategory),
  };
};

export const getCategoryById = async (id, config = {}) => {
  const response = await axiosClient.get(
    API_ENDPOINTS.CATEGORY_BY_ID(id),
    config
  );

  const item = response.data;

  return {
    ...mapCategory(item),
    products: item.products || [],
  };
};
