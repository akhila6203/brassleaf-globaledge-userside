import { useCallback, useEffect, useRef, useState } from "react";
import { getProducts } from "../services/productService";
import { toCardProduct } from "../utils/productAdapter";

export function useProducts(params = {}, options = {}) {
  const { enabled = true, mapItems = true } = options;

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(enabled);
  const [error, setError] = useState(null);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(params.page || 1);
  const [pages, setPages] = useState(1);

  const paramKey = JSON.stringify(params);
  const abortRef = useRef(null);

  const fetchProducts = useCallback(async () => {
    if (!enabled) return;

    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setLoading(true);
    setError(null);

    try {
      const result = await getProducts(params, {
        signal: controller.signal,
      });

      if (controller.signal.aborted) return;

      const mapped = mapItems
        ? result.products.map((item) => toCardProduct(item))
        : result.products;

      setProducts(mapped);
      setTotal(result.total);
      setPage(result.page);
      setPages(result.pages);
    } catch (err) {
      if (controller.signal.aborted || err.name === "CanceledError") return;
      setError(err.message || "Failed to load products");
      setProducts([]);
    } finally {
      if (!controller.signal.aborted) {
        setLoading(false);
      }
    }
  }, [enabled, mapItems, paramKey]);

  useEffect(() => {
    fetchProducts();
    return () => abortRef.current?.abort();
  }, [fetchProducts]);

  return {
    products,
    loading,
    error,
    total,
    page,
    pages,
    refetch: fetchProducts,
  };
}

export function usePaginatedProducts(baseParams = {}, pageSize = 20) {
  const [page, setPage] = useState(1);
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  const paramKey = JSON.stringify(baseParams);
  const abortRef = useRef(null);

  const loadPage = useCallback(
    async (pageNum, append = false) => {
      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;

      setLoading(true);
      setError(null);

      try {
        const result = await getProducts(
          {
            ...baseParams,
            page: pageNum,
            limit: pageSize,
          },
          { signal: controller.signal }
        );

        if (controller.signal.aborted) return;

        const mapped = result.products.map((item) => toCardProduct(item));

        setAllProducts((prev) => (append ? [...prev, ...mapped] : mapped));
        setHasMore(pageNum < result.pages);
        setPage(pageNum);
      } catch (err) {
        if (controller.signal.aborted || err.name === "CanceledError") return;
        setError(err.message || "Failed to load products");
        if (!append) setAllProducts([]);
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    },
    [paramKey, pageSize]
  );

  useEffect(() => {
    setPage(1);
    loadPage(1, false);
    return () => abortRef.current?.abort();
  }, [loadPage]);

  const loadMore = () => {
    if (!loading && hasMore) {
      loadPage(page + 1, true);
    }
  };

  return {
    products: allProducts,
    loading,
    error,
    hasMore,
    loadMore,
    refetch: () => loadPage(1, false),
  };
}
