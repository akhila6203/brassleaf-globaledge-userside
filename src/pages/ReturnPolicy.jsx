import { Link } from "react-router-dom";

export default function ReturnPolicy() {
  return (
    <main className="bg-white">
      {/* =========================================
          PAGE HEADER / BREADCRUMB
      ========================================= */}

      <section className="bg-[#243346]">
        <div className="container-site py-9 sm:py-11 lg:py-12">
          <h1 className="text-3xl font-black text-[#eff2f5] sm:text-4xl">
            Return Policy
          </h1>

          <div className="mt-3 flex flex-wrap items-center gap-1.5 text-sm">
            <Link
              to="/"
              className="text-slate-200 transition hover:text-[#D9A537]"
            >
              Home
            </Link>

            <span className="text-slate-400">›</span>

            <span className="font-medium text-[#f7f9fb]">
              Return Policy
            </span>
          </div>
        </div>
      </section>

      {/* =========================================
          RETURN POLICY CONTENT
      ========================================= */}

      <section className="container-site py-14 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="space-y-6 text-[15px] leading-8 text-slate-600 sm:text-base sm:leading-8">

            {/* Paragraph 1 */}
            <p>
              No return will be handled after the delivery of the products,
              only exchange of the products with in 15 days of the delivery
              receipt date. You might demand for a exchange of product just
              when the item is unworn, unwashed, without stains, flawless and
              with every unique tag and bundling unblemished. Any other tags
              or products will not be accepted.
            </p>

            {/* Paragraph 2 */}
            <p>
              After a thorough inspection of the product in accordance with
              the aforementioned policies, our supervisor or delivery logistics
              has the authority to accept or reject the product for replacement,
              exchange, or return. The customer agrees not to challenge their
              decisions.
            </p>

            {/* Paragraph 3 */}
            <p>
              No item will be exchanged without items unique bill.
            </p>

            {/* Paragraph 4 */}
            <p>
              Conveyance charge of Rs.150/ – will be charged (independent of
              currently paid transportation charge) if the client need to deal
              with any substitution/return.
            </p>

            {/* Paragraph 5 */}
            <p>
              To get a substitution/exchange, email us your order number and
              the Justification for returning on our referenced email address
              i.e,
              <a
                href="mailto:query@brassleaf.store"
                className="ml-1 font-medium text-[#243346] transition hover:text-[#D9A537]"
              >
                query@brassleaf.store
              </a>
              .
            </p>

            {/* Paragraph 6 */}
            <p>
              For any exchange/substituion, you will have to visit our store
              at punjagutta.
            </p>

            {/* =====================================
                ADDRESS
            ===================================== */}
            <div className="pt-1">
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
//   RefreshCcw,
//   ReceiptText,
//   Mail,
//   MapPin,
// } from "lucide-react";

// export default function ReturnPolicy() {
//   return (
//     <main className="bg-[#f7f8fa]">

//       {/* =====================================================
//           HERO SECTION
//       ===================================================== */}

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
//               Return Policy
//             </span>

//           </div>

//           {/* Hero Content */}

//           <div className="text-center">

//             <p className="text-sm font-extrabold uppercase tracking-[.2em] text-[#D9A537]">
//               Information
//             </p>

//             <h1 className="mt-3 text-4xl font-black sm:text-5xl lg:text-6xl">
//               Return Policy
//             </h1>

//           </div>

//         </div>
//       </section>

//       {/* =====================================================
//           POLICY CONTENT
//       ===================================================== */}

//       <section className="py-10 sm:py-14 lg:py-16">

//         <div className="container-site">

//           <div className="mx-auto max-w-4xl rounded-3xl bg-white p-5 shadow-sm sm:p-8 lg:p-10">

//             {/* =================================================
//                 INTRO CARD
//             ================================================= */}

//             <div className="mb-8 flex items-start gap-4 rounded-2xl bg-[#f7f8fa] p-4 sm:p-5">

//               <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#D9A537]/15">

//                 <RefreshCcw
//                   size={22}
//                   className="text-[#D9A537]"
//                 />

//               </div>

//               <div>

//                 <h2 className="text-lg font-black text-[#243346] sm:text-xl">
//                   Returns & Exchanges
//                 </h2>

//                 <p className="mt-1 text-sm leading-6 text-slate-500">
//                   Please review the return and exchange policy below.
//                 </p>

//               </div>

//             </div>

//             {/* =================================================
//                 MAIN CONTENT
//             ================================================= */}

//             <div className="space-y-7">

//               {/* PARAGRAPH 1 */}

//               <div>

//                 <p className="text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
//                   No return will be handled after the delivery of the products,
//                   only exchange of the products with in 15 days of the delivery
//                   receipt date. You might demand for a exchange of product just
//                   when the item is unworn, unwashed, without stains, flawless
//                   and with every unique tag and bundling unblemished. Any other
//                   tags or products will not be accepted.
//                 </p>

//               </div>

//               {/* PARAGRAPH 2 */}

//               <div className="border-t border-slate-200 pt-7">

//                 <p className="text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
//                   After a thorough inspection of the product in accordance with
//                   the aforementioned policies, our supervisor or delivery
//                   logistics has the authority to accept or reject the product
//                   for replacement, exchange, or return. The customer agrees not
//                   to challenge their decisions.
//                 </p>

//               </div>

//               {/* PARAGRAPH 3 */}

//               <div className="border-t border-slate-200 pt-7">

//                 <div className="flex items-start gap-3">

//                   <ReceiptText
//                     size={20}
//                     className="mt-1 shrink-0 text-[#D9A537]"
//                   />

//                   <p className="text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
//                     No item will be exchanged without items unique bill.
//                   </p>

//                 </div>

//               </div>

//               {/* PARAGRAPH 4 */}

//               <div className="border-t border-slate-200 pt-7">

//                 <p className="text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
//                   Conveyance charge of Rs.150/ – will be charged
//                   (independent of currently paid transportation charge) if the
//                   client need to deal with any substitution/return.
//                 </p>

//               </div>

//               {/* PARAGRAPH 5 */}

//               <div className="border-t border-slate-200 pt-7">

//                 <div className="flex items-start gap-3">

//                   <Mail
//                     size={20}
//                     className="mt-1 shrink-0 text-[#D9A537]"
//                   />

//                   <p className="text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
//                     To get a substitution/exchange, email us your order number
//                     and the Justification for returning on our referenced email
//                     address i.e,
//                     <a
//                       href="mailto:query@brassleaf.store"
//                       className="ml-1 font-bold text-[#243346] transition hover:text-[#D9A537]"
//                     >
//                       query@brassleaf.store
//                     </a>
//                     .
//                   </p>

//                 </div>

//               </div>

//               {/* PARAGRAPH 6 */}

//               <div className="border-t border-slate-200 pt-7">

//                 <p className="text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
//                   For any exchange/substituion, you will have to visit our store
//                   at punjagutta.
//                 </p>

//               </div>

//             </div>

//             {/* =================================================
//                 ADDRESS
//             ================================================= */}

//             <div className="mt-9 rounded-2xl border border-slate-200 bg-[#f7f8fa] p-5 sm:p-6">

//               <div className="flex items-start gap-3">

//                 <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#D9A537]/15">

//                   <MapPin
//                     size={20}
//                     className="text-[#D9A537]"
//                   />

//                 </div>

//                 <div>

//                   <h3 className="text-lg font-black text-[#243346]">
//                     Address:
//                   </h3>

//                   <p className="mt-2 text-sm leading-7 text-slate-600 sm:text-base">
//                     6-3-666/B, Pillar No. #1118, Panjagutta, Hyderabad –
//                     500082, Opp. Nims Hospital.
//                   </p>

//                 </div>

//               </div>

//             </div>

//           </div>

//         </div>

//       </section>

//     </main>
//   );
// }