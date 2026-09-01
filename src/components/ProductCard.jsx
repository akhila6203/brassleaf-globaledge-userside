import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useCart } from "../context/CartContext";

import { getProductById } from "../services/productService";

import { toDetailProduct } from "../utils/productAdapter";

export default function ProductCard({
  product,
}) {
  const navigate = useNavigate();

  const { addToCart } =
    useCart();

  const [
    detailProduct,
    setDetailProduct,
  ] = useState(null);

  const [
    checkingOptions,
    setCheckingOptions,
  ] = useState(true);

  const [
    adding,
    setAdding,
  ] = useState(false);

  /*
  =========================================
  LOAD PRODUCT DETAILS

  List API doesn't contain variations.
  So this checks once whether sizes exist.
  =========================================
  */

  useEffect(() => {
    let cancelled = false;

    const loadDetails =
      async () => {
        try {
          setCheckingOptions(true);

          const response =
            await getProductById(
              product.id
            );

          if (cancelled) return;

          const mapped =
            toDetailProduct(
              response
            );

          setDetailProduct(
            mapped
          );
        } catch {
          if (!cancelled) {
            setDetailProduct(
              null
            );
          }
        } finally {
          if (!cancelled) {
            setCheckingOptions(
              false
            );
          }
        }
      };

    loadDetails();

    return () => {
      cancelled = true;
    };
  }, [product.id]);

  /*
  =========================================
  PRICE
  =========================================
  */

  const min =
    product.minPrice ??
    product.price;

  const max =
    product.maxPrice ??
    min;

  const priceText =
    min == null
      ? ""
      : max != null &&
          Number(max) !==
            Number(min)
        ? `₹${Number(
            min
          ).toFixed(
            Number(min) %
              1 ===
              0
              ? 2
              : 2
          )} - ₹${Number(
            max
          ).toFixed(2)}`
        : `₹${Number(
            min
          ).toFixed(2)}`;

  /*
  =========================================
  STOCK
  =========================================
  */

  const isOutOfStock =
    product.isOutOfStock ||
    product.stockStatus ===
      "outofstock" ||
    detailProduct?.isOutOfStock;

  /*
  =========================================
  HAS SIZES
  =========================================
  */

  const hasSizes =
    detailProduct?.hasSizes ===
    true;

  /*
  =========================================
  CARD CLICK
  =========================================
  */

  const openDetails = () => {
    navigate(
      `/products/${product.id}`
    );
  };

  /*
  =========================================
  ADD DIRECTLY TO CART

  Only products WITHOUT sizes.
  =========================================
  */

  const handleAddToCart =
    async (event) => {
      event.preventDefault();
      event.stopPropagation();

      if (
        isOutOfStock ||
        adding
      ) {
        return;
      }

      setAdding(true);

      try {
        let current =
          detailProduct;

        /*
        In case details have
        not loaded yet.
        */

        if (!current) {
          const response =
            await getProductById(
              product.id
            );

          current =
            toDetailProduct(
              response
            );

          setDetailProduct(
            current
          );
        }

        /*
        If sizes exist,
        don't add directly.
        Go to Details page.
        */

        if (
          current.hasSizes
        ) {
          navigate(
            `/products/${product.id}`
          );

          return;
        }

        /*
        NO SIZE PRODUCT
        Direct cart add.
        */

        addToCart(
          current,
          "",
          current.price ??
            current.minPrice
        );
      } catch (error) {
        console.error(
          "Add to cart failed:",
          error
        );
      } finally {
        setAdding(false);
      }
    };

  /*
  =========================================
  SELECT OPTIONS

  Size products → Details page
  =========================================
  */

  const handleSelectOptions =
    (event) => {
      event.preventDefault();
      event.stopPropagation();

      navigate(
        `/products/${product.id}`
      );
    };

  return (
    <article
      onClick={openDetails}
      className="
        group
        min-w-0
        cursor-pointer
        bg-white
        text-center
      "
    >
      {/* =========================
          PRODUCT IMAGE
      ========================== */}

      <div
        className="
          relative
          flex
          h-[205px]
          items-center
          justify-center
          overflow-hidden
          bg-white
          sm:h-[250px]
          md:h-[285px]
          lg:h-[310px]
        "
      >
        {product.image && (
          <img
            src={product.image}
            alt={product.name}
            className="
              h-full
              w-full
              object-contain
              transition
              duration-300
              group-hover:scale-[1.02]
            "
          />
        )}

        {/* OUT OF STOCK */}

        {isOutOfStock && (
          <span
            className="
              absolute
              left-2
              top-2
              rounded-full
              bg-[#9aa0a6]
              px-2.5
              py-1
              text-[9px]
              font-bold
              uppercase
              text-white
              sm:left-3
              sm:top-3
              sm:text-[10px]
            "
          >
            Out of Stock
          </span>
        )}
      </div>

      {/* =========================
          PRODUCT CONTENT
      ========================== */}

      <div className="px-1 pb-7 pt-4">

        {/* PRODUCT NAME */}

        <h3
          className="
            line-clamp-2
            min-h-[36px]
            text-[13px]
            font-medium
            uppercase
            leading-5
            text-[#243346]
            transition
            group-hover:text-[#D9A537]
            sm:text-sm
          "
        >
          {product.name}
        </h3>

        {/* PRICE */}

        <p
          className="
            mt-1
            text-sm
            font-black
            text-[#D9A537]
            sm:text-[15px]
          "
        >
          {priceText}
        </p>

        {/* SMALL LINE */}

        <div
          className="
            mx-auto
            mt-4
            h-px
            w-10
            bg-slate-300
          "
        />

        {/* =========================
            ACTION
        ========================== */}

        <div className="mt-4">

          {checkingOptions ? (
            <span
              className="
                text-[11px]
                font-black
                uppercase
                text-slate-400
              "
            >
              Loading...
            </span>
          ) : isOutOfStock ? (
            <span
              className="
                text-[11px]
                font-black
                uppercase
                text-slate-400
              "
            >
              Out of Stock
            </span>
          ) : hasSizes ? (
            /*
            SIZE PRODUCT
            */
            <button
              type="button"
              onClick={
                handleSelectOptions
              }
              className="
                text-[11px]
                font-black
                uppercase
                tracking-wide
                text-[#243346]
                transition
                hover:text-[#D9A537]
                sm:text-xs
              "
            >
              Select Options »
            </button>
          ) : (
            /*
            NO SIZE PRODUCT
            */
            <button
              type="button"
              onClick={
                handleAddToCart
              }
              disabled={adding}
              className="
                text-[11px]
                font-black
                uppercase
                tracking-wide
                text-[#243346]
                transition
                hover:text-[#D9A537]
                disabled:cursor-not-allowed
                disabled:opacity-60
                sm:text-xs
              "
            >
              {adding
                ? "Adding..."
                : "Add to Cart »"}
            </button>
          )}
        </div>
      </div>
    </article>
  );
}


// import { Eye, ShoppingCart } from "lucide-react";
// import { Link } from "react-router-dom";
// import { useState } from "react";
// import { useCart } from "../context/CartContext";
// import { getProductById } from "../services/productService";
// import { toDetailProduct } from "../utils/productAdapter";
// import SizeSelectModal from "./SizeSelectModal";

// export default function ProductCard({ product }) {
//   const { addToCart } = useCart();
//   const [open, setOpen] = useState(false);
//   const [size, setSize] = useState("");
//   const [modalProduct, setModalProduct] = useState(product);
//   const [loadingSizes, setLoadingSizes] = useState(false);

//   const fetchDetail = async () => {
//     const detail = toDetailProduct(await getProductById(product.id));
//     setModalProduct(detail);
//     return detail;
//   };

//   const add = async () => {
//     if (product.isOutOfStock || product.stockStatus === "outofstock") return;

//     setSize("");
//     setLoadingSizes(true);
//     try {
//       const detail = await fetchDetail();
//       if (detail.isOutOfStock) return;

//       if (!detail.hasSizes) {
//         addToCart(detail, "", detail.price);
//         return;
//       }
//       setOpen(true);
//     } catch {
//       // No fallback sizes or dummy product data.
//     } finally {
//       setLoadingSizes(false);
//     }
//   };

//   const confirm = () => {
//     if (!size) return;
//     const variation = modalProduct.variations?.find((v) => v.size === size);
//     if (!variation || variation.stockStatus === "outofstock") return;
//     addToCart(modalProduct, size, variation.price);
//     setOpen(false);
//   };

//   const min = product.minPrice ?? product.price;
//   const max = product.maxPrice ?? min;
//   const priceText =
//     min == null
//       ? ""
//       : max != null && Number(max) !== Number(min)
//         ? `₹${min} - ₹${max}`
//         : `₹${min}`;

//   return (
//     <>
//       <article className="group min-w-0 overflow-hidden rounded-xl border border-slate-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md sm:rounded-2xl">
//         <div className="relative overflow-hidden bg-slate-100">
//           <Link to={`/products/${product.id}`}>
//             {product.image && (
//               <img
//                 src={product.image}
//                 alt={product.name}
//                 className="h-32 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-40 lg:h-48"
//               />
//             )}
//           </Link>

//           {(product.isOutOfStock || product.stockStatus === "outofstock") && (
//             <span className="absolute left-1.5 top-1.5 rounded-full bg-[#243346] px-2 py-1 text-[9px] font-extrabold text-white sm:left-2 sm:top-2 sm:text-[10px] lg:px-2.5 lg:text-xs">
//               Out of Stock
//             </span>
//           )}
//         </div>

//         <div className="p-2 sm:p-3 lg:p-4">
//           {product.category && (
//             <p className="truncate text-[9px] font-bold uppercase tracking-wide text-[#D9A537] sm:text-[10px] lg:text-xs">
//               {product.category}
//             </p>
//           )}

//           <Link
//             to={`/products/${product.id}`}
//             title={product.name}
//             className="mt-1 block truncate whitespace-nowrap text-xs font-extrabold leading-5 text-[#243346] hover:text-[#D9A537] sm:text-sm lg:text-base"
//           >
//             {product.name}
//           </Link>

//           <div className="mt-1.5 flex min-w-0 items-center gap-1.5 sm:mt-2 sm:gap-2">
//             <span className="truncate text-sm font-black text-[#243346] sm:text-base lg:text-lg">
//               {priceText}
//             </span>
//           </div>

//           <div className="mt-2 grid grid-cols-2 gap-1.5 sm:mt-3 sm:gap-2">
//             <Link
//               to={`/products/${product.id}`}
//               className="inline-flex h-8 items-center justify-center gap-1 rounded-lg border border-slate-200 px-1 text-[9px] font-bold text-[#243346] transition hover:border-[#D9A537] hover:bg-[#D9A537]/10 sm:h-9 sm:rounded-xl sm:px-2 sm:text-[10px] lg:h-10 lg:text-xs"
//             >
//               <Eye size={13} /> Details
//             </Link>

//             <button
//               type="button"
//               onClick={add}
//               disabled={loadingSizes || product.isOutOfStock || product.stockStatus === "outofstock"}
//               className="inline-flex h-8 items-center justify-center gap-1 rounded-lg bg-[#243346] px-1 text-[9px] font-bold text-white transition hover:bg-[#D9A537] hover:text-[#243346] disabled:cursor-not-allowed disabled:opacity-50 sm:h-9 sm:rounded-xl sm:px-2 sm:text-[10px] lg:h-10 lg:text-xs"
//             >
//               <ShoppingCart size={13} />
//               {loadingSizes ? "..." : "Add"}
//             </button>
//           </div>
//         </div>
//       </article>

//       <SizeSelectModal
//         product={modalProduct}
//         open={open}
//         size={size}
//         setSize={setSize}
//         onConfirm={confirm}
//         onClose={() => setOpen(false)}
//         action="Select Size & Add to Cart"
//       />
//     </>
//   );
// }
