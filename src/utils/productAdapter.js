function cleanText(value = "") {
  return String(value)
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function toCardProduct(item, categoryName = "") {
  const minPrice = item.minPrice != null ? Number(item.minPrice) : null;
  const maxPrice = item.maxPrice != null ? Number(item.maxPrice) : minPrice;

  return {
    ...item,
    minPrice,
    maxPrice,
    price: minPrice,
    category:
      categoryName ||
      item.category ||
      item.categoryName ||
      item.categories?.[0]?.name ||
      "",
    image: item.image || null,
    isOutOfStock: item.stockStatus === "outofstock",
  };
}

export function toDetailProduct(item) {
  const imageUrls = (item.images || [])
    .map((img) => img.guid || img.url || img.image)
    .filter(Boolean);

  const category = item.categories?.[0];
  const variations = Array.isArray(item.variations) ? item.variations : [];
  const sizedVariations = variations.filter((variation) =>
    String(variation.size || "").trim()
  );

  const minPrice = item.minPrice != null ? Number(item.minPrice) : null;
  const maxPrice = item.maxPrice != null ? Number(item.maxPrice) : minPrice;
  const description = cleanText(item.description) || cleanText(item.shortDescription);

  return {
    ...item,
    minPrice,
    maxPrice,
    price: minPrice,
    category: category?.name || item.category || item.categoryName || "",
    categoryId: category?.slug || "",
    categorySlug: category?.slug || "",
    image: imageUrls[0] || item.image || null,
    images: imageUrls,
    variations,
    sizes: [...new Set(sizedVariations.map((variation) => variation.size))],
    hasSizes: sizedVariations.length > 0,
    description,
    isOutOfStock:
      item.stockStatus === "outofstock" ||
      (variations.length > 0 && variations.every((v) => v.stockStatus === "outofstock")),
  };
}
