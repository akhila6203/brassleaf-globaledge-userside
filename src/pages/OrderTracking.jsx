import {
  Check,
  ChevronRight,
  Clock3,
  Home,
  MapPin,
  PackageCheck,
  ShoppingBag,
  Truck,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";

const trackingSteps = [
  {
    name: "Order Placed",
    icon: ShoppingBag,
  },
  {
    name: "Processing",
    icon: Clock3,
  },
  {
    name: "Shipped",
    icon: PackageCheck,
  },
  {
    name: "Out for Delivery",
    icon: Truck,
  },
  {
    name: "Delivered",
    icon: Check,
  },
];

export default function OrderTracking() {
  const { orderId } = useParams();

  const orders = JSON.parse(
    sessionStorage.getItem("uniforms_orders") || "[]"
  );

  const lastOrder = JSON.parse(
    sessionStorage.getItem("uniforms_last_order") || "null"
  );

  const order =
    orders.find(
      (item) => item.id === orderId
    ) ||
    (lastOrder?.id === orderId
      ? lastOrder
      : null);

  if (!order) {
    return (
      <main className="grid min-h-[65vh] place-items-center bg-[#f7f8fa] px-4">

        <div className="text-center">

          <PackageCheck
            size={45}
            className="mx-auto text-[#D9A537]"
          />

          <h1 className="mt-4 text-3xl font-black text-[#243346]">
            Order not found
          </h1>

          <Link
            to="/profile"
            className="btn-gold mt-6"
          >
            My Profile
          </Link>

        </div>

      </main>
    );
  }

  const currentIndex = Math.max(
    0,
    trackingSteps.findIndex(
      (step) =>
        step.name === order.status
    )
  );

  return (
    <main className="bg-[#f7f8fa]">

      {/* =====================================================
          HERO / BREADCRUMB
          ===================================================== */}
      <section className="bg-[#243346] py-8 text-white sm:py-10">

        <div className="container-site">

          <div className="flex items-center justify-center gap-2 text-sm">

            <Link
              to="/"
              className="inline-flex items-center gap-1 text-slate-300 hover:text-[#D9A537]"
            >
              <Home size={15} />
              Home
            </Link>

            <ChevronRight
              size={15}
              className="text-slate-500"
            />

            <Link
              to="/profile"
              className="text-slate-300 hover:text-[#D9A537]"
            >
              My Orders
            </Link>

            <ChevronRight
              size={15}
              className="text-slate-500"
            />

            <span className="text-[#D9A537]">
              Track Order
            </span>

          </div>

          <div className="mt-5 text-center">

            <p className="text-xs font-extrabold uppercase tracking-[.2em] text-[#D9A537]">
              Order Status
            </p>

            <h1 className="mt-2 text-3xl font-black sm:text-4xl">
              Track Your Order
            </h1>

            <p className="mt-3 text-sm text-slate-300">
              Order ID: {order.id}
            </p>

          </div>

        </div>

      </section>

      <section className="container-site py-10 sm:py-14">

        <div className="grid gap-6 lg:grid-cols-[1fr_360px]">

          {/* =================================================
              TRACKING
              ================================================= */}
          <div className="rounded-2xl bg-white p-5 shadow-sm sm:p-7">

            <h2 className="text-xl font-black text-[#243346]">
              Shipment Progress
            </h2>

            <div className="mt-8">

              {trackingSteps.map(
                (step, index) => {
                  const Icon = step.icon;

                  const completed =
                    index <= currentIndex;

                  return (
                    <div
                      key={step.name}
                      className="relative flex gap-4 pb-9 last:pb-0"
                    >

                      {index <
                        trackingSteps.length -
                          1 && (
                        <div
                          className={`absolute left-[19px] top-10 h-[calc(100%-20px)] w-px ${
                            index < currentIndex
                              ? "bg-[#D9A537]"
                              : "bg-slate-200"
                          }`}
                        />
                      )}

                      <div
                        className={`relative z-10 grid h-10 w-10 shrink-0 place-items-center rounded-full ${
                          completed
                            ? "bg-[#D9A537] text-[#243346]"
                            : "bg-slate-100 text-slate-400"
                        }`}
                      >
                        <Icon size={18} />
                      </div>

                      <div>

                        <h3
                          className={`font-black ${
                            completed
                              ? "text-[#243346]"
                              : "text-slate-400"
                          }`}
                        >
                          {step.name}
                        </h3>

                        <p className="mt-1 text-sm text-slate-500">
                          {index === 0 &&
                            "Your order has been received successfully."}

                          {index === 1 &&
                            "Your order is being prepared."}

                          {index === 2 &&
                            "Your order has been handed over to the courier."}

                          {index === 3 &&
                            "Your order is on the way to your delivery address."}

                          {index === 4 &&
                            "Your order has been delivered."}
                        </p>

                      </div>

                    </div>
                  );
                }
              )}

            </div>

          </div>

          {/* =================================================
              ORDER DETAILS
              ================================================= */}
          <aside className="h-fit rounded-2xl bg-white p-5 shadow-sm sm:p-6">

            <h2 className="text-xl font-black text-[#243346]">
              Order Details
            </h2>

            <div className="mt-5 space-y-4">

              {order.items?.map(
                (item, index) => (
                  <div
                    key={
                      item.key ||
                      `${item.id}-${index}`
                    }
                    className="flex gap-3"
                  >

                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-16 w-14 rounded-lg object-cover"
                    />

                    <div className="min-w-0 flex-1">

                      <p className="truncate text-sm font-black text-[#243346]">
                        {item.name}
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        Size {item.size} ×{" "}
                        {item.quantity}
                      </p>

                    </div>

                    <b className="text-sm">
                      ₹{item.price * item.quantity}
                    </b>

                  </div>
                )
              )}

            </div>

            <div className="mt-6 border-t border-slate-200 pt-5">

              <div className="flex justify-between">

                <b className="text-[#243346]">
                  Total
                </b>

                <b className="text-xl text-[#D9A537]">
                  ₹{order.total}
                </b>

              </div>

            </div>

            {/* Address */}
            {order.address && (
              <div className="mt-6 border-t border-slate-200 pt-5">

                <div className="flex gap-3">

                  <MapPin
                    size={19}
                    className="shrink-0 text-[#D9A537]"
                  />

                  <div>

                    <h3 className="text-sm font-black text-[#243346]">
                      Delivery Address
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-slate-500">
                      {order.address.name}
                      <br />
                      {order.address.address}
                      <br />
                      {order.address.city},{" "}
                      {order.address.state} -{" "}
                      {order.address.pincode}
                      <br />
                      {order.address.phone}
                    </p>

                  </div>

                </div>

              </div>
            )}

          </aside>

        </div>

      </section>

    </main>
  );
}