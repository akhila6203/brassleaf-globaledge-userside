import { useCallback, useEffect, useRef, useState } from "react";
import { getCategories } from "../services/categoryService";

export function useCategories(params = {}, options = {}) {
  const { enabled = true } = options;

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(enabled);
  const [error, setError] = useState(null);

  const paramKey = JSON.stringify(params);
  const abortRef = useRef(null);

  const fetchCategories = useCallback(async () => {
    if (!enabled) return;

    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setLoading(true);
    setError(null);

    try {
      const result = await getCategories(params, {
        signal: controller.signal,
      });

      if (controller.signal.aborted) return;

      setCategories(result.categories);
    } catch (err) {
      if (controller.signal.aborted || err.name === "CanceledError") return;
      setError(err.message || "Failed to load categories");
      setCategories([]);
    } finally {
      if (!controller.signal.aborted) {
        setLoading(false);
      }
    }
  }, [enabled, paramKey]);

  useEffect(() => {
    fetchCategories();
    return () => abortRef.current?.abort();
  }, [fetchCategories]);

  return {
    categories,
    loading,
    error,
    refetch: fetchCategories,
  };
}
