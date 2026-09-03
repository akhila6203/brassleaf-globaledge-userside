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




// import { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";

// import { useCart } from "../context/CartContext";

// import { getProductById } from "../services/productService";

// import { toDetailProduct } from "../utils/productAdapter";

// export default function ProductCard({
//   product,
// }) {
//   const navigate = useNavigate();

//   const { addToCart } =
//     useCart();

//   const [
//     detailProduct,
//     setDetailProduct,
//   ] = useState(null);

//   const [
//     checkingOptions,
//     setCheckingOptions,
//   ] = useState(true);

//   const [
//     adding,
//     setAdding,
//   ] = useState(false);

//   /*
//   =========================================
//   LOAD PRODUCT DETAILS

//   List API doesn't contain variations.
//   So this checks once whether sizes exist.
//   =========================================
//   */

//   useEffect(() => {
//     let cancelled = false;

//     const loadDetails =
//       async () => {
//         try {
//           setCheckingOptions(true);

//           const response =
//             await getProductById(
//               product.id
//             );

//           if (cancelled) return;

//           const mapped =
//             toDetailProduct(
//               response
//             );

//           setDetailProduct(
//             mapped
//           );
//         } catch {
//           if (!cancelled) {
//             setDetailProduct(
//               null
//             );
//           }
//         } finally {
//           if (!cancelled) {
//             setCheckingOptions(
//               false
//             );
//           }
//         }
//       };

//     loadDetails();

//     return () => {
//       cancelled = true;
//     };
//   }, [product.id]);

//   /*
//   =========================================
//   PRICE
//   =========================================
//   */

//   const min =
//     product.minPrice ??
//     product.price;

//   const max =
//     product.maxPrice ??
//     min;

//   const priceText =
//     min == null
//       ? ""
//       : max != null &&
//           Number(max) !==
//             Number(min)
//         ? `₹${Number(
//             min
//           ).toFixed(
//             Number(min) %
//               1 ===
//               0
//               ? 2
//               : 2
//           )} - ₹${Number(
//             max
//           ).toFixed(2)}`
//         : `₹${Number(
//             min
//           ).toFixed(2)}`;

//   /*
//   =========================================
//   STOCK
//   =========================================
//   */

//   const isOutOfStock =
//     product.isOutOfStock ||
//     product.stockStatus ===
//       "outofstock" ||
//     detailProduct?.isOutOfStock;

//   /*
//   =========================================
//   HAS SIZES
//   =========================================
//   */

//   const hasSizes =
//     detailProduct?.hasSizes ===
//     true;

//   /*
//   =========================================
//   CARD CLICK
//   =========================================
//   */

//   const openDetails = () => {
//     navigate(
//       `/products/${product.id}`
//     );
//   };

//   /*
//   =========================================
//   ADD DIRECTLY TO CART

//   Only products WITHOUT sizes.
//   =========================================
//   */

//   const handleAddToCart =
//     async (event) => {
//       event.preventDefault();
//       event.stopPropagation();

//       if (
//         isOutOfStock ||
//         adding
//       ) {
//         return;
//       }

//       setAdding(true);

//       try {
//         let current =
//           detailProduct;

//         /*
//         In case details have
//         not loaded yet.
//         */

//         if (!current) {
//           const response =
//             await getProductById(
//               product.id
//             );

//           current =
//             toDetailProduct(
//               response
//             );

//           setDetailProduct(
//             current
//           );
//         }

//         /*
//         If sizes exist,
//         don't add directly.
//         Go to Details page.
//         */

//         if (
//           current.hasSizes
//         ) {
//           navigate(
//             `/products/${product.id}`
//           );

//           return;
//         }

//         /*
//         NO SIZE PRODUCT
//         Direct cart add.
//         */

//         addToCart(
//           current,
//           "",
//           current.price ??
//             current.minPrice
//         );
//       } catch (error) {
//         console.error(
//           "Add to cart failed:",
//           error
//         );
//       } finally {
//         setAdding(false);
//       }
//     };

//   /*
//   =========================================
//   SELECT OPTIONS

//   Size products → Details page
//   =========================================
//   */

//   const handleSelectOptions =
//     (event) => {
//       event.preventDefault();
//       event.stopPropagation();

//       navigate(
//         `/products/${product.id}`
//       );
//     };

//   return (
//     <article
//       onClick={openDetails}
//       className="
//         group
//         min-w-0
//         cursor-pointer
//         bg-white
//         text-center
//       "
//     >
//       {/* =========================
//           PRODUCT IMAGE
//       ========================== */}

//       <div
//         className="
//           relative
//           flex
//           h-[205px]
//           items-center
//           justify-center
//           overflow-hidden
//           bg-white
//           sm:h-[250px]
//           md:h-[285px]
//           lg:h-[310px]
//         "
//       >
//         {product.image && (
//           <img
//             src={product.image}
//             alt={product.name}
//             className="
//               h-full
//               w-full
//               object-contain
//               transition
//               duration-300
//               group-hover:scale-[1.02]
//             "
//           />
//         )}

//         {/* OUT OF STOCK */}

//         {isOutOfStock && (
//           <span
//             className="
//               absolute
//               left-2
//               top-2
//               rounded-full
//               bg-[#9aa0a6]
//               px-2.5
//               py-1
//               text-[9px]
//               font-bold
//               uppercase
//               text-white
//               sm:left-3
//               sm:top-3
//               sm:text-[10px]
//             "
//           >
//             Out of Stock
//           </span>
//         )}
//       </div>

//       {/* =========================
//           PRODUCT CONTENT
//       ========================== */}

//       <div className="px-1 pb-7 pt-4">

//         {/* PRODUCT NAME */}

//         <h3
//           className="
//             line-clamp-2
//             min-h-[36px]
//             text-[13px]
//             font-medium
//             uppercase
//             leading-5
//             text-[#243346]
//             transition
//             group-hover:text-[#D9A537]
//             sm:text-sm
//           "
//         >
//           {product.name}
//         </h3>

//         {/* PRICE */}

//         <p
//           className="
//             mt-1
//             text-sm
//             font-black
//             text-[#D9A537]
//             sm:text-[15px]
//           "
//         >
//           {priceText}
//         </p>

//         {/* SMALL LINE */}

//         <div
//           className="
//             mx-auto
//             mt-4
//             h-px
//             w-10
//             bg-slate-300
//           "
//         />

//         {/* =========================
//             ACTION
//         ========================== */}

//         <div className="mt-4">

//           {checkingOptions ? (
//             <span
//               className="
//                 text-[11px]
//                 font-black
//                 uppercase
//                 text-slate-400
//               "
//             >
//               Loading...
//             </span>
//           ) : isOutOfStock ? (
//             <span
//               className="
//                 text-[11px]
//                 font-black
//                 uppercase
//                 text-slate-400
//               "
//             >
//               Out of Stock
//             </span>
//           ) : hasSizes ? (
//             /*
//             SIZE PRODUCT
//             */
//             <button
//               type="button"
//               onClick={
//                 handleSelectOptions
//               }
//               className="
//                 text-[11px]
//                 font-black
//                 uppercase
//                 tracking-wide
//                 text-[#243346]
//                 transition
//                 hover:text-[#D9A537]
//                 sm:text-xs
//               "
//             >
//               Select Options »
//             </button>
//           ) : (
//             /*
//             NO SIZE PRODUCT
//             */
//             <button
//               type="button"
//               onClick={
//                 handleAddToCart
//               }
//               disabled={adding}
//               className="
//                 text-[11px]
//                 font-black
//                 uppercase
//                 tracking-wide
//                 text-[#243346]
//                 transition
//                 hover:text-[#D9A537]
//                 disabled:cursor-not-allowed
//                 disabled:opacity-60
//                 sm:text-xs
//               "
//             >
//               {adding
//                 ? "Adding..."
//                 : "Add to Cart »"}
//             </button>
//           )}
//         </div>
//       </div>
//     </article>
//   );
// }

