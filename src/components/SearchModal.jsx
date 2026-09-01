import { Search, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { getProducts } from "../services/productService";
import { toCardProduct } from "../utils/productAdapter";

export default function SearchModal({ onClose }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const abortRef = useRef(null);

  useEffect(() => {
    const trimmed = query.trim();

    const timer = setTimeout(async () => {
      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;

      setLoading(true);

      try {
        const result = await getProducts(
          trimmed
            ? { search: trimmed, limit: 8, sort: "name", dir: "asc" }
            : { limit: 4, sort: "date", dir: "desc" },
          { signal: controller.signal }
        );

        if (controller.signal.aborted) return;

        setResults(result.products.map((item) => toCardProduct(item)));
      } catch (err) {
        if (controller.signal.aborted || err.name === "CanceledError") return;
        setResults([]);
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }, 300);

    return () => {
      clearTimeout(timer);
      abortRef.current?.abort();
    };
  }, [query]);

  return (
    <div
      className="fixed inset-0 z-[80] bg-[#243346]/70 p-4 backdrop-blur-sm"
      onMouseDown={onClose}
    >
      <div
        className="mx-auto mt-16 max-w-2xl rounded-2xl bg-white p-5 shadow-2xl"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-black text-[#243346]">Search Uniforms</h2>
          <button type="button" onClick={onClose} className="rounded-full p-2 hover:bg-slate-100">
            <X size={20} />
          </button>
        </div>

        <div className="relative mt-4">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            size={19}
          />
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search school uniforms, corporate uniforms..."
            className="input-field pl-10"
          />
        </div>

        <div className="mt-5 max-h-[55vh] overflow-auto">
          {loading ? (
            <div className="flex justify-center py-10">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#D9A537] border-t-transparent" />
            </div>
          ) : results.length ? (
            results.map((product) => (
              <Link
                key={product.id}
                to={`/products/${product.id}`}
                onClick={onClose}
                className="flex items-center gap-4 rounded-xl p-3 hover:bg-slate-50"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-16 w-16 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <p className="font-bold text-[#243346]">{product.name}</p>
                  {product.category && (
                    <p className="text-sm text-slate-500">{product.category}</p>
                  )}
                </div>
                <strong className="text-[#D9A537]">₹{product.price}</strong>
              </Link>
            ))
          ) : (
            <p className="py-10 text-center text-slate-500">No products found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
