import { Link } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";
import ProductCard from "../components/ProductCard";
import { usePaginatedProducts } from "../hooks/useProducts";

export default function Products({ requireAuth }) {
  const { products, loading, error, hasMore, loadMore } = usePaginatedProducts(
    { sort: "date", dir: "desc" },
    12
  );

  return (
    <main>
      <section className="bg-[#243346] py-6 text-white sm:py-8 lg:py-10">
        <div className="container-site">
          <div className="mb-4 flex items-center justify-center gap-2 overflow-x-auto whitespace-nowrap text-sm">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 font-semibold text-slate-300 transition hover:text-[#D9A537]"
            >
              <Home size={15} />
              Home
            </Link>
            <ChevronRight size={15} className="shrink-0 text-slate-500" />
            <span className="font-semibold text-[#D9A537]">Products</span>
          </div>

          <div className="text-center">
            <p className="text-sm font-extrabold uppercase tracking-[.2em] text-[#D9A537]">
              Shop
            </p>
            <h1 className="mt-2 text-4xl font-black sm:text-5xl lg:text-6xl">
              School Uniform Products
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
              Browse products from the Brass Leaf school-uniform database categories.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#f7f8fa]">
        <div className="container-site py-10 sm:py-14">
          {loading && products.length === 0 ? (
            <div className="flex justify-center py-16">
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#D9A537] border-t-transparent" />
            </div>
          ) : error ? (
            <div className="rounded-2xl bg-white px-6 py-12 text-center shadow-sm">
              <p className="font-semibold text-red-500">{error}</p>
              <p className="mt-2 text-sm text-slate-500">
                Make sure the backend server is running on port 4000.
              </p>
            </div>
          ) : products.length === 0 ? (
            <div className="rounded-2xl bg-white px-6 py-12 text-center shadow-sm">
              <p className="font-semibold text-slate-500">No products found.</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
                {products.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    requireAuth={requireAuth}
                  />
                ))}
              </div>

              {hasMore && (
                <div className="mt-10 flex justify-center">
                  <button
                    type="button"
                    onClick={loadMore}
                    disabled={loading}
                    className="btn-gold disabled:opacity-60"
                  >
                    {loading ? "Loading..." : "Load More"}
                  </button>
                </div>
              )}

              {!hasMore && products.length > 0 && (
                <div className="mt-10 text-center">
                  <p className="text-sm font-semibold text-slate-500">
                    You have viewed all products.
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </main>
  );
}
