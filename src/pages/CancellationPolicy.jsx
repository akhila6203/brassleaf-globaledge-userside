import { Link } from "react-router-dom";

export default function CancellationPolicy() {
  return (
    <main className="bg-white">

      {/* =========================================
          PAGE HEADER / BREADCRUMB
      ========================================= */}

      <section className="bg-[#243346]">
        <div className="container-site py-9 sm:py-11 lg:py-12">

          <h1 className="text-3xl font-black text-[#eff2f5] sm:text-4xl">
            Cancellations
          </h1>

          <div className="mt-3 flex flex-wrap items-center gap-1.5 text-sm">

            <Link
              to="/"
              className="text-slate-200 transition hover:text-[#D9A537]"
            >
              Home
            </Link>

            <span className="text-slate-400">
              ›
            </span>

            <span className="font-medium text-[#f7f9fb]">
              Cancellations
            </span>

          </div>

        </div>
      </section>

      {/* =========================================
          CANCELLATION CONTENT
      ========================================= */}

      <section className="container-site py-14 sm:py-16 lg:py-20">

        <div className="mx-auto max-w-6xl">

          <div className="space-y-7 text-[15px] leading-8 text-slate-600 sm:text-base sm:leading-8">

            <p>
              In case we receive a cancellation e-mail and by that time the
              order is already “Out for Delivery” by Brassleaf or the courier,
              then the order cannot be cancelled. Brassleaf has the complete
              right to decide whether an order can be cancelled or not. The
              customer agrees not to dispute the decision made by Brassleaf and
              shall agree upon decision regarding cancellation.
            </p>

            <p>
              Brassleaf reserves the right to refuse or cancel any order placed
              for a product that is listed at an incorrect price or for any other
              reason. This shall be regardless of whether the order has been
              confirmed and/or payment been received.
            </p>

          </div>

        </div>

      </section>

    </main>
  );
}


// import { Link } from "react-router-dom";
// import {
//   Ban,
//   ChevronRight,
//   Home,
//   PackageX,
// } from "lucide-react";

// export default function CancellationPolicy() {
//   return (
//     <main className="bg-[#f7f8fa]">

//       {/* =====================================================
//           HERO SECTION
//           ===================================================== */}
//       <section className="bg-[#243346] py-8 text-white sm:py-10 lg:py-12">
//         <div className="container-site">

//           {/* Breadcrumb */}
//           <div className="mb-4 flex items-center justify-center gap-2 overflow-x-auto whitespace-nowrap text-sm">
//             <Link
//               to="/"
//               className="inline-flex items-center gap-1.5 font-semibold text-slate-300 transition hover:text-[#D9A537]"
//             >
//               <Home size={15} />
//               Home
//             </Link>

//             <ChevronRight
//               size={15}
//               className="shrink-0 text-slate-500"
//             />

//             <span className="font-semibold text-[#D9A537]">
//               Cancellations
//             </span>
//           </div>

//           {/* Hero Content */}
//           <div className="text-center">
//             <p className="text-sm font-extrabold uppercase tracking-[.2em] text-[#D9A537]">
//               Information
//             </p>

//             <h1 className="mt-3 text-4xl font-black sm:text-5xl lg:text-6xl">
//               Cancellations
//             </h1>

//             <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
//               Please review the conditions that apply when cancelling an order.
//             </p>
//           </div>

//         </div>
//       </section>

//       {/* =====================================================
//           CANCELLATION POLICY
//           Less left/right spacing
//           ===================================================== */}
//       <section className="py-8 sm:py-12 lg:py-14">
//         <div className="container-site">

//           <div className="w-full rounded-3xl bg-white p-5 shadow-sm sm:p-7 lg:p-8">

//             {/* Top Information */}
//             <div className="mb-7 flex items-start gap-4 rounded-2xl bg-[#f7f8fa] p-4 sm:p-5">

//               <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#D9A537]/15">
//                 <Ban
//                   size={21}
//                   className="text-[#D9A537]"
//                 />
//               </div>

//               <div>
//                 <h2 className="text-lg font-black text-[#243346] sm:text-xl">
//                   Order Cancellation
//                 </h2>

//                 <p className="mt-1 text-sm leading-6 text-slate-500">
//                   Cancellation depends on the current processing and delivery
//                   status of your order.
//                 </p>
//               </div>

//             </div>

//             {/* =================================================
//                 FIRST POLICY
//                 ================================================= */}
//             <div>
//               <div className="mb-4 flex items-center gap-3">

//                 <PackageX
//                   size={21}
//                   className="shrink-0 text-[#D9A537]"
//                 />

//                 <h2 className="text-xl font-black text-[#243346] sm:text-2xl">
//                   Cancellation of an Order
//                 </h2>

//               </div>

//               <p className="text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
//                 In case we receive a cancellation e-mail and by that time the
//                 order is already “Out for Delivery” by Brassleaf or the
//                 courier, then the order cannot be cancelled. Brassleaf has the
//                 complete right to decide whether an order can be cancelled or
//                 not. The customer agrees not to dispute the decision made by
//                 Brassleaf and shall agree upon decision regarding cancellation.
//               </p>
//             </div>

//             {/* Divider */}
//             <div className="my-7 border-t border-slate-200" />

//             {/* =================================================
//                 SECOND POLICY
//                 ================================================= */}
//             <div>
//               <div className="mb-4 flex items-center gap-3">

//                 <Ban
//                   size={21}
//                   className="shrink-0 text-[#D9A537]"
//                 />

//                 <h2 className="text-xl font-black text-[#243346] sm:text-2xl">
//                   Right to Cancel an Order
//                 </h2>

//               </div>

//               <p className="text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
//                 Brassleaf reserves the right to refuse or cancel any order
//                 placed for a product that is listed at an incorrect price or
//                 for any other reason. This shall be regardless of whether the
//                 order has been confirmed and/or payment been received.
//               </p>
//             </div>

//           </div>
//         </div>
//       </section>

//     </main>
//   );
// }