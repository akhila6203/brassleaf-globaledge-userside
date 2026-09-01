import {
  CheckCircle2,
  PackageCheck,
  ShoppingBag,
  UserRound,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export default function OrderSuccess() {
  const { state } = useLocation();

  const order =
    state ||
    JSON.parse(
      sessionStorage.getItem("uniforms_last_order") || "null"
    );

  const orderItems = order?.items || [];

  const totalQuantity = orderItems.reduce(
    (sum, item) => sum + Number(item.quantity || 0),
    0
  );

  return (
    <main className="bg-[#f7f8fa]">
      {/* =====================================================
          BREADCRUMB
          ===================================================== */}
{/* =====================================================
          SUCCESS SECTION
          ===================================================== */}
      <section className="px-4 py-10 sm:py-12 lg:py-16">
        <div className="mx-auto w-full max-w-3xl overflow-hidden rounded-3xl bg-white shadow-sm">

          {/* =================================================
              SUCCESS TOP
              ================================================= */}
          <div className="px-5 pb-7 pt-8 text-center sm:px-10 sm:pb-9 sm:pt-10">

            {/* Success Icon */}
            <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-green-50 sm:h-24 sm:w-24">
              <CheckCircle2
                size={52}
                className="text-green-600"
              />
            </div>

            <p className="mt-6 text-xs font-extrabold uppercase tracking-[.2em] text-[#D9A537] sm:text-sm">
              Thank You
            </p>

            <h1 className="mt-2 text-3xl font-black text-[#243346] sm:text-4xl">
              Order Placed Successfully
            </h1>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-slate-500 sm:text-base">
              Your school uniform order has been received. We will
              process your order and update you with delivery details.
            </p>
          </div>

          {/* =================================================
              ORDER BASIC INFORMATION
              ================================================= */}
          <div className="border-y border-slate-100 bg-[#f7f8fa] px-5 py-5 sm:px-8">
            <div className="grid gap-4 sm:grid-cols-3">

              {/* Order ID */}
              <div>
                <span className="text-xs font-semibold text-slate-500">
                  Order ID
                </span>

                <p className="mt-1 break-all text-sm font-black text-[#243346] sm:text-base">
                  {order?.id || "BL-ORDER"}
                </p>
              </div>

              {/* Items */}
              <div>
                <span className="text-xs font-semibold text-slate-500">
                  Total Items
                </span>

                <p className="mt-1 text-sm font-black text-[#243346] sm:text-base">
                  {totalQuantity}
                </p>
              </div>

              {/* Order Total */}
              <div>
                <span className="text-xs font-semibold text-slate-500">
                  Order Total
                </span>

                <p className="mt-1 text-lg font-black text-[#D9A537]">
                  ₹{order?.total || 0}
                </p>
              </div>

            </div>
          </div>

          {/* =================================================
              ORDERED PRODUCTS
              ================================================= */}
          <div className="px-5 py-7 sm:px-8">

            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#D9A537]/15">
                <ShoppingBag
                  size={19}
                  className="text-[#D9A537]"
                />
              </div>

              <div>
                <h2 className="text-lg font-black text-[#243346] sm:text-xl">
                  Your Order
                </h2>

                <p className="mt-0.5 text-xs text-slate-500">
                  Products included in this order
                </p>
              </div>
            </div>

            {/* Product List */}
            {orderItems.length > 0 ? (
              <div className="divide-y divide-slate-100 rounded-2xl border border-slate-100">

                {orderItems.map((item, index) => (
                  <div
                    key={item.key || `${item.id}-${index}`}
                    className="flex items-center gap-3 p-4 sm:gap-4"
                  >

                    {/* Image */}
                    <div className="h-20 w-16 shrink-0 overflow-hidden rounded-xl bg-slate-100 sm:h-24 sm:w-20">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    {/* Product Information */}
                    <div className="min-w-0 flex-1">
                      <p className="line-clamp-2 text-sm font-black text-[#243346] sm:text-base">
                        {item.name}
                      </p>

                      <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 sm:text-sm">
                        <span>
                          Size:{" "}
                          <b className="text-[#243346]">
                            {item.size}
                          </b>
                        </span>

                        <span>
                          Qty:{" "}
                          <b className="text-[#243346]">
                            {item.quantity}
                          </b>
                        </span>
                      </div>

                      <p className="mt-2 text-sm font-black text-[#D9A537]">
                        ₹{item.price * item.quantity}
                      </p>
                    </div>

                  </div>
                ))}

              </div>
            ) : (
              <div className="rounded-2xl bg-[#f7f8fa] p-5 text-center">
                <p className="text-sm text-slate-500">
                  Order product information is not available.
                </p>
              </div>
            )}
          </div>

          {/* =================================================
              CUSTOMER INFO
              ================================================= */}
          {order?.customer && (
            <div className="mx-5 border-t border-slate-100 py-5 sm:mx-8">

              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#D9A537]/15">
                  <UserRound
                    size={18}
                    className="text-[#D9A537]"
                  />
                </div>

                <div>
                  <p className="text-xs text-slate-500">
                    Order placed for
                  </p>

                  <p className="mt-0.5 text-sm font-black text-[#243346]">
                    {order.customer}
                  </p>
                </div>
              </div>

            </div>
          )}

          {/* =================================================
              BOTTOM ACTIONS
              ================================================= */}
          <div className="border-t border-slate-100 px-5 py-7 sm:px-8">

            <div className="flex flex-row gap-3">

              <Link
                to="/products"
                className="btn-gold flex-1 justify-center px-3 text-center text-sm sm:px-5 sm:text-base"
              >
                <PackageCheck size={18} />
                Continue Shopping
              </Link>

              <Link
                to={`/order-tracking/${order?.id}`}
                className="flex flex-1 items-center justify-center rounded-xl border border-slate-200 px-3 py-3 text-center text-sm font-bold text-[#243346] transition hover:border-[#D9A537] hover:text-[#D9A537] sm:px-5 sm:text-base"
              >
                Order Tracking
              </Link>

            </div>

            <p className="mx-auto mt-5 max-w-md text-center text-xs leading-5 text-slate-400">
              Keep your Order ID for future order-related enquiries.
            </p>

          </div>

        </div>
      </section>
    </main>
  );
}