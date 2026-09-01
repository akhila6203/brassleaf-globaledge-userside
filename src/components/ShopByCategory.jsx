import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useRef } from "react";
import { useCategories } from "../hooks/useCategories";

export default function ShopByCategory({ categories: externalCategories, loading: externalLoading }) {
  const ref = useRef(null);
  const move = (n) =>
    ref.current?.scrollBy({ left: n * 260, behavior: "smooth" });

  const shouldFetch = externalCategories == null;
  const { categories: fetchedCategories, loading: fetchedLoading } = useCategories(
    { limit: 50, sort: "name", dir: "asc" },
    { enabled: shouldFetch }
  );

  const categories = externalCategories ?? fetchedCategories;
  const loading = externalLoading ?? (shouldFetch ? fetchedLoading : false);

  const visibleCategories = categories.filter(
    (category) => category.productCount > 0
  );

  return (
    <section className="section-pad bg-white">
      <div className="container-site">
        <div className="mb-9 text-center">
          <p className="text-sm font-extrabold uppercase tracking-[.2em] text-[#D9A537]">
            Shop By Category
          </p>
          <h2 className="mt-2 text-3xl font-black text-[#243346] sm:text-4xl">
            Shop School Essentials
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-slate-500">
            Choose a category to view all related products.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#D9A537] border-t-transparent" />
          </div>
        ) : visibleCategories.length === 0 ? (
          <p className="text-center text-slate-500">No categories available.</p>
        ) : (
          <div className="relative">
            <button
              type="button"
              onClick={() => move(-1)}
              className="absolute left-0 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white text-[#243346] shadow-xl ring-1 ring-slate-100 hover:bg-[#D9A537]"
              aria-label="Previous"
            >
              <ChevronLeft size={22} />
            </button>

            <div
              ref={ref}
              className="flex snap-x snap-mandatory gap-7 overflow-x-auto px-8 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:gap-10 sm:px-12"
            >
              {visibleCategories.map((category) => (
                <Link
                  key={category.id}
                  to={`/collections?category=${category.slug}`}
                  className="group min-w-[125px] snap-start text-center sm:min-w-[155px]"
                >
                  <div className="mx-auto aspect-square overflow-hidden rounded-full bg-slate-100 ring-1 ring-slate-200 transition duration-300 group-hover:-translate-y-1 group-hover:ring-2 group-hover:ring-[#D9A537]">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                    />
                  </div>
                  <h3 className="mt-4 text-base font-extrabold text-[#243346] group-hover:text-[#D9A537]">
                    {category.name}
                  </h3>
                </Link>
              ))}
            </div>

            <button
              type="button"
              onClick={() => move(1)}
              className="absolute right-0 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white text-[#243346] shadow-xl ring-1 ring-slate-100 hover:bg-[#D9A537]"
              aria-label="Next"
            >
              <ChevronRight size={22} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
