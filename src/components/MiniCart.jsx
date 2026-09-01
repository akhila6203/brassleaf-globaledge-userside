import {
  ShoppingBag,
  X,
} from "lucide-react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import { useCart } from "../context/CartContext";

export default function MiniCart({
  onClose,
}) {
  const {
    cart,
    subtotal,
    removeFromCart,
  } = useCart();

  const navigate =
    useNavigate();

  const go = (path) => {
    onClose?.();
    navigate(path);
  };

  return (
    <div
      className="
        fixed
        left-3
        right-3
        top-[82px]
        z-[250]
        pt-2

        sm:absolute
        sm:left-auto
        sm:right-0
        sm:top-full
        sm:w-[355px]
        sm:max-w-[calc(100vw-24px)]
        sm:pt-3
      "
    >
      {/*
        Arrow triangle removed.
        Same attached style as login.
      */}

      <div
        className="
          border
          border-slate-200
          border-t-2
          border-t-[#D9A537]
          bg-white
          p-5
          shadow-2xl
        "
      >
        {/* =========================
            EMPTY CART
        ========================== */}

        {!cart.length ? (
          <div className="py-6 text-center">

            <ShoppingBag
              size={34}
              className="mx-auto text-[#D9A537]"
            />

            <p
              className="
                mt-3
                font-black
                text-[#243346]
              "
            >
              Your cart is empty
            </p>

            <Link
              onClick={onClose}
              to="/"
              className="
                mt-3
                inline-block
                text-sm
                font-bold
                text-[#D9A537]
                hover:text-[#243346]
              "
            >
              Continue shopping
            </Link>
          </div>
        ) : (
          <>
            {/* =========================
                PRODUCTS
            ========================== */}

            <div
              className="
                max-h-64
                space-y-4
                overflow-y-auto
                pr-1
              "
            >
              {cart.map(
                (item) => (
                  <div
                    key={item.key}
                    className="
                      flex
                      gap-3
                      border-b
                      border-slate-100
                      pb-4
                      last:border-0
                    "
                  >
                    {/* REMOVE */}

                    <button
                      type="button"
                      onClick={() =>
                        removeFromCart(
                          item.key
                        )
                      }
                      className="
                        mt-7
                        h-5
                        w-5
                        shrink-0
                        rounded-full
                        border
                        border-slate-300
                        text-slate-400
                        hover:border-red-400
                        hover:text-red-500
                      "
                      aria-label={`Remove ${item.name}`}
                    >
                      <X
                        size={12}
                        className="m-auto"
                      />
                    </button>

                    {/* IMAGE → DETAILS */}

                    <button
                      type="button"
                      onClick={() =>
                        go(
                          `/products/${item.id}`
                        )
                      }
                      className="shrink-0"
                    >
                      <img
                        src={
                          item.image
                        }
                        alt={
                          item.name
                        }
                        className="
                          h-20
                          w-16
                          object-contain
                        "
                      />
                    </button>

                    {/* CONTENT */}

                    <div
                      className="
                        min-w-0
                        flex-1
                        pt-1
                      "
                    >
                      {/* NAME → DETAILS */}

                      <button
                        type="button"
                        onClick={() =>
                          go(
                            `/products/${item.id}`
                          )
                        }
                        className="
                          block
                          w-full
                          truncate
                          text-left
                          text-sm
                          font-black
                          text-[#243346]
                          hover:text-[#D9A537]
                        "
                      >
                        {item.name}
                      </button>

                      {item.size && (
                        <p
                          className="
                            mt-1
                            text-xs
                            text-slate-500
                          "
                        >
                          Size:{" "}
                          {item.size}
                        </p>
                      )}

                      <p
                        className="
                          mt-1
                          text-sm
                          font-bold
                        "
                      >
                        <span className="text-[#D9A537]">
                          {
                            item.quantity
                          }
                        </span>{" "}
                        × ₹
                        {Number(
                          item.price
                        ).toFixed(
                          2
                        )}
                      </p>
                    </div>
                  </div>
                )
              )}
            </div>

            {/* SUBTOTAL */}

            <div
              className="
                mt-4
                flex
                items-center
                justify-between
                border-t
                border-slate-200
                pt-4
              "
            >
              <span
                className="
                  text-sm
                  font-bold
                  text-[#243346]
                "
              >
                Subtotal:
              </span>

              <b
                className="
                  text-xl
                  text-[#243346]
                "
              >
                ₹
                {subtotal.toFixed(
                  2
                )}
              </b>
            </div>

            {/* CHECKOUT */}

            <button
              type="button"
              onClick={() =>
                go("/checkout")
              }
              className="
                btn-gold
                mt-5
                w-full
                rounded-none
              "
            >
              Checkout
            </button>

            {/* VIEW CART */}

            <button
              type="button"
              onClick={() =>
                go("/cart")
              }
              className="
                mt-3
                w-full
                py-2
                text-sm
                font-black
                text-[#243346]
                hover:text-[#D9A537]
              "
            >
              View cart »
            </button>
          </>
        )}
      </div>
    </div>
  );
}


// import { ShoppingBag, X } from "lucide-react";
// import { Link, useNavigate } from "react-router-dom";
// import { useCart } from "../context/CartContext";

// export default function MiniCart({ onClose }) {
//   const { cart, subtotal, removeFromCart } = useCart();
//   const navigate = useNavigate();

//   const go = (path) => {
//     onClose?.();
//     navigate(path);
//   };

//   return (
//     <div className="absolute right-0 top-full z-[240] w-[355px] max-w-[calc(100vw-24px)] pt-3">
//       <span className="absolute right-12 top-1.5 h-4 w-4 rotate-45 border-l border-t border-slate-200 bg-white" />
//       <div className="border-t-2 border-[#D9A537] bg-white p-5 shadow-2xl ring-1 ring-slate-200">
//         {!cart.length ? (
//           <div className="py-6 text-center">
//             <ShoppingBag size={34} className="mx-auto text-[#D9A537]" />
//             <p className="mt-3 font-black text-[#243346]">Your cart is empty</p>
//             <Link onClick={onClose} to="/" className="mt-3 inline-block text-sm font-bold text-[#D9A537]">Continue shopping</Link>
//           </div>
//         ) : (
//           <>
//             <div className="max-h-64 space-y-4 overflow-y-auto pr-1">
//               {cart.map((item) => (
//                 <div key={item.key} className="flex gap-3 border-b border-slate-100 pb-4 last:border-0">
//                   <button
//                     type="button"
//                     onClick={() => removeFromCart(item.key)}
//                     className="mt-7 h-5 w-5 shrink-0 rounded-full border border-slate-300 text-slate-400 hover:border-red-400 hover:text-red-500"
//                     aria-label={`Remove ${item.name}`}
//                   >
//                     <X size={12} className="m-auto" />
//                   </button>
//                   <img src={item.image} alt={item.name} className="h-20 w-16 shrink-0 object-contain" />
//                   <div className="min-w-0 flex-1 pt-1">
//                     <p className="truncate text-sm font-black text-[#243346]">{item.name}</p>
//                     {item.size && <p className="mt-1 text-xs text-slate-500">Size: {item.size}</p>}
//                     <p className="mt-1 text-sm font-bold"><span className="text-[#D9A537]">{item.quantity}</span> × ₹{Number(item.price).toFixed(2)}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             <div className="mt-4 flex items-center justify-between border-t border-slate-200 pt-4">
//               <span className="text-sm font-bold text-[#243346]">Subtotal:</span>
//               <b className="text-xl text-[#243346]">₹{subtotal.toFixed(2)}</b>
//             </div>
//             <button type="button" onClick={() => go("/checkout")} className="btn-gold mt-5 w-full rounded-none">Checkout</button>
//             <button type="button" onClick={() => go("/cart")} className="mt-3 w-full py-2 text-sm font-black text-[#243346] hover:text-[#D9A537]">View cart »</button>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }
