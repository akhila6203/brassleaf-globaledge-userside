import { useEffect, useMemo } from "react";
import ProductCard from "../components/ProductCard";
import { usePaginatedProducts } from "../hooks/useProducts";
import {
  sortProductsByUniformOrder,
} from "../utils/productOrder";

export default function Home() {
  const { products, loading, error, hasMore, loadMore } = usePaginatedProducts({ sort: "date", dir: "desc" }, 24);

  const orderedProducts = useMemo(
    () =>
      sortProductsByUniformOrder(
        products
      ),
    [products]
  );

  useEffect(() => {
    if (!loading && hasMore) loadMore();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, hasMore, products.length]);

  return (
    <main className="min-h-[70vh] bg-white py-8 sm:py-10 lg:py-12">
      <div className="container-site">
        {error && products.length === 0 ? (
          <p className="rounded-xl bg-red-50 px-4 py-3 text-center text-sm text-red-700">{error}</p>
        ) : products.length === 0 && loading ? (
          <div className="flex justify-center py-16"><div className="h-10 w-10 animate-spin rounded-full border-4 border-[#D9A537] border-t-transparent" /></div>
        ) : products.length === 0 ? (
          <p className="py-12 text-center text-slate-500">No products available.</p>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 lg:gap-5">
               {orderedProducts.map(
                (product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                  />
                )
              )}
              {/* {products.map((product) => <ProductCard key={product.id} product={product} />)} */}
            </div>
            {loading && <div className="flex justify-center py-8"><div className="h-8 w-8 animate-spin rounded-full border-4 border-[#D9A537] border-t-transparent" /></div>}
          </>
        )}
      </div>
    </main>
  );
}
