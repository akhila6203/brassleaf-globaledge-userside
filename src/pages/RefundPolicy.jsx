import { Link } from "react-router-dom";

export default function RefundPolicy() {
  return (
    <main className="bg-white">
      {/* =========================================
          PAGE HEADER / BREADCRUMB
      ========================================= */}

      <section className="bg-[#243346]">
        <div className="container-site py-9 sm:py-11 lg:py-12">
          <h1 className="text-3xl font-black text-[#eff2f5] sm:text-4xl">
            Refund Policy
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
              Refund Policy
            </span>
          </div>
        </div>
      </section>

      {/* =========================================
          REFUND POLICY CONTENT
      ========================================= */}

      <section className="container-site py-14 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="text-[15px] leading-8 text-slate-600 sm:text-base sm:leading-8">

            {/* POLICY CONTENT */}

            <p>
              All forward and return shipping costs, which are determined by the
              customer’s address and the shipping costs paid, will be deducted
              from the refund. Refund on the items is not allowed and only the
              exchange of the items is allowed at the BRASSLEAF STORE.
            </p>

            {/* ADDRESS */}

            <div className="mt-7">
              <p className="font-black text-[#243346]">
                Address:
              </p>

              <p className="mt-1">
                6-3-666/B, Pillar No. #1118, Panjagutta, Hyderabad – 500082,
                Opp. Nims Hospital.
              </p>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}

// import { Link } from "react-router-dom";
// import {
//   ChevronRight,
//   Home,
//   MapPin,
//   RotateCcw,
// } from "lucide-react";

// export default function RefundPolicy() {
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
//               Refund Policy
//             </span>
//           </div>

//           {/* Hero Content */}
//           <div className="text-center">
//             <p className="text-sm font-extrabold uppercase tracking-[.2em] text-[#D9A537]">
//               Information
//             </p>

//             <h1 className="mt-3 text-4xl font-black sm:text-5xl lg:text-6xl">
//               Refund Policy
//             </h1>

//             <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
//               Please review our refund and exchange conditions before making a request.
//             </p>
//           </div>

//         </div>
//       </section>

//       {/* =====================================================
//           REFUND POLICY CONTENT
//           ===================================================== */}
//       <section className="py-10 sm:py-14 lg:py-16">
//         <div className="container-site">

//           <div className="mx-auto max-w-4xl rounded-3xl bg-white p-5 shadow-sm sm:p-8 lg:p-10">

//             {/* Policy Intro */}
//             <div className="mb-8 flex items-start gap-4 rounded-2xl bg-[#f7f8fa] p-4 sm:p-5">

//               <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#D9A537]/15">
//                 <RotateCcw
//                   size={22}
//                   className="text-[#D9A537]"
//                 />
//               </div>

//               <div>
//                 <h2 className="text-lg font-black text-[#243346] sm:text-xl">
//                   Refund & Exchange Information
//                 </h2>

//                 <p className="mt-1 text-sm leading-6 text-slate-500">
//                   Please read the following policy regarding refunds, shipping costs and exchanges.
//                 </p>
//               </div>

//             </div>

//             {/* Main Content */}
//             <div>

//               <h2 className="text-2xl font-black text-[#243346] sm:text-3xl">
//                 Refund Policy
//               </h2>

//               <div className="mt-3 h-1 w-16 rounded-full bg-[#D9A537]" />

//               <p className="mt-5 text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
//                 All forward and return shipping costs, which are determined by the customer’s address and the shipping costs paid, will be deducted from the refund. Refund on the items is not allowed and only the exchange of the items is allowed at the BRASSLEAF STORE.
//               </p>

//             </div>

//             {/* Address */}
//             <div className="mt-9 border-t border-slate-200 pt-8">

//               <div className="rounded-2xl bg-[#f7f8fa] p-5 sm:p-6">

//                 <div className="flex items-start gap-3">

//                   <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#D9A537]/15">
//                     <MapPin
//                       size={20}
//                       className="text-[#D9A537]"
//                     />
//                   </div>

//                   <div>
//                     <h3 className="text-lg font-black text-[#243346]">
//                       Address
//                     </h3>

//                     <p className="mt-2 text-sm leading-7 text-slate-600 sm:text-base">
//                       6-3-666/B, Pillar No. #1118, Panjagutta, Hyderabad – 500082, Opp. Nims Hospital.
//                     </p>
//                   </div>

//                 </div>

//               </div>

//             </div>

//           </div>
//         </div>
//       </section>
//     </main>
//   );
// }