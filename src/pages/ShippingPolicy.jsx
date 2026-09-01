import { Link } from "react-router-dom";

export default function ShippingPolicy() {
  return (
    <main className="bg-white">

      {/* =========================================
          PAGE HEADER / BREADCRUMB
      ========================================= */}

      <section className="bg-[#243346]">
        <div className="container-site py-9 sm:py-11 lg:py-12">

          <h1 className="text-3xl font-black text-[#eff2f5] sm:text-4xl">
            Shipping Policy
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
              Shipping Policy
            </span>

          </div>

        </div>
      </section>

      {/* =========================================
          SHIPPING POLICY CONTENT
      ========================================= */}

      <section className="container-site py-14 sm:py-16 lg:py-20">

        <div className="mx-auto max-w-6xl">

          <div className="text-[15px] leading-8 text-slate-600 sm:text-base sm:leading-8">

            {/* INTRO */}

            <p>
              Shipping charges vary based on the customer shipping address/city
              .All these charges are only applied on our retail section.
            </p>

            {/* NUMBERED RULES */}

            <ol className="mt-6 list-decimal space-y-1 pl-5">

              <li>
                Rs 150 will charges for the shipping for Hyderabad will be
                charged on the mentioned order amount and for a maximum package
                of 3 kgs.
              </li>

              <li>
                10 – 15 days shipping in Hyderabad only when ordered on working
                days by following the above order policies.
              </li>

              <li>
                It is possible that our courier partners have a holiday between
                the day you placed your order and the date of delivery, which is
                based on the timelines shown on the product page. In this case,
                we add a day to the estimated date. Some courier partners do not
                work on Sundays or Mondays and this is factored in to the
                delivery dates.
              </li>

              <li>
                In Other cases such as Gusted Holidays/National Holidays or some
                Happening violated events in the Country if you place order
                between these days the shipping may get effected.In such case we
                add a Day or Two accordingly.
              </li>

              <li>
                Other states 20 working days for delivery.
              </li>

            </ol>

            {/* DELAY */}

            <p className="mt-8">
              If there is a delay in delivery, the customers are requested to
              cooperate with it and customers shall contact us on Email Id :{" "}
              <a
                href="mailto:query@brassleaf.store"
                className="font-medium text-[#243346] transition hover:text-[#D9A537]"
              >
                query@brassleaf.store
              </a>{" "}
              if the product is not delivered with in 10 days from the ordered
              date.
            </p>

            {/* PACKAGE CONDITION */}

            <p className="mt-7">
              Customers are required not to accept any product if opened,
              teared, with damaged package and without product bill. Brassleaf
              will not be answerable to any product problem without bill.
            </p>

            {/* EXCHANGE / SHIPPING */}

            <p className="mt-7">
              To get a substitution/exchange, email us your order number and the
              Justification for returning on our referenced email address
              i.e,
              <span className="font-medium text-[#243346]">
                query@brassleaf
              </span>
              .The orders cannot be shipped to PO boxes or military addresses;
              rural domestic addresses require one or more additional days to
              deliver. Orders requiring engraving or any customization will
              require additional time. store.
            </p>

            {/* NON DELIVERY */}

            <p className="mt-7">
              If a non-delivery or late delivery occurs due to a mistake by the
              User (i.e. wrong or incomplete name or address or recipient not
              available or any other related reason) any extra cost spent by
              Brassleaf for re-delivery shall be claimed from the User.
            </p>

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
//   Mail,
//   PackageCheck,
//   Truck,
// } from "lucide-react";

// export default function ShippingPolicy() {
//   return (
//     <main className="bg-[#f7f8fa]">
//       {/* =====================================================
//           HERO SECTION
//           Same family as About / Contact / Policy pages
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

//             <ChevronRight size={15} className="shrink-0 text-slate-500" />

//             <span className="font-semibold text-[#D9A537]">
//               Shipping Policy
//             </span>
//           </div>

//           {/* Hero Content */}
//           <div className="text-center">
//             <p className="text-sm font-extrabold uppercase tracking-[.2em] text-[#D9A537]">
//               Information
//             </p>

//             <h1 className="mt-3 text-4xl font-black sm:text-5xl lg:text-6xl">
//               Shipping Policy
//             </h1>

//             <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
//               Details about shipping charges, delivery timelines and important
//               delivery conditions.
//             </p>
//           </div>

//         </div>
//       </section>

//       {/* =====================================================
//           SHIPPING POLICY CONTENT
//           ===================================================== */}
//       <section className="py-10 sm:py-14 lg:py-16">
//         <div className="container-site">
//           <div className="mx-auto max-w-4xl rounded-3xl bg-white p-5 shadow-sm sm:p-8 lg:p-10">

//             {/* Intro */}
//             <div className="mb-8 flex items-start gap-4 rounded-2xl bg-[#f7f8fa] p-4 sm:p-5">
//               <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#D9A537]/15">
//                 <Truck size={22} className="text-[#D9A537]" />
//               </div>

//               <div>
//                 <h2 className="text-lg font-black text-[#243346] sm:text-xl">
//                   Shipping Information
//                 </h2>

//                 <p className="mt-1 text-sm leading-6 text-slate-500">
//                   Shipping charges and delivery timelines depend on the delivery
//                   address and applicable order conditions.
//                 </p>
//               </div>
//             </div>

//             {/* Intro Policy */}
//             <div>
//               <p className="text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
//                 Shipping charges vary based on the customer shipping address/city
//                 .All these charges are only applied on our retail section.
//               </p>
//             </div>

//             {/* Numbered Shipping Rules */}
//             <div className="mt-8 space-y-4">

//               <div className="flex gap-4 rounded-2xl border border-slate-100 p-4 sm:p-5">
//                 <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#D9A537] text-sm font-black text-[#243346]">
//                   1
//                 </div>

//                 <p className="text-sm leading-7 text-slate-600 sm:text-base">
//                   Rs 150 will charges for the shipping for Hyderabad will be
//                   charged on the mentioned order amount and for a maximum
//                   package of 3 kgs.
//                 </p>
//               </div>

//               <div className="flex gap-4 rounded-2xl border border-slate-100 p-4 sm:p-5">
//                 <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#D9A537] text-sm font-black text-[#243346]">
//                   2
//                 </div>

//                 <p className="text-sm leading-7 text-slate-600 sm:text-base">
//                   10 – 15 days shipping in Hyderabad only when ordered on
//                   working days by following the above order policies.
//                 </p>
//               </div>

//               <div className="flex gap-4 rounded-2xl border border-slate-100 p-4 sm:p-5">
//                 <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#D9A537] text-sm font-black text-[#243346]">
//                   3
//                 </div>

//                 <p className="text-sm leading-7 text-slate-600 sm:text-base">
//                   It is possible that our courier partners have a holiday
//                   between the day you placed your order and the date of
//                   delivery, which is based on the timelines shown on the product
//                   page. In this case, we add a day to the estimated date. Some
//                   courier partners do not work on Sundays or Mondays and this is
//                   factored in to the delivery dates.
//                 </p>
//               </div>

//               <div className="flex gap-4 rounded-2xl border border-slate-100 p-4 sm:p-5">
//                 <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#D9A537] text-sm font-black text-[#243346]">
//                   4
//                 </div>

//                 <p className="text-sm leading-7 text-slate-600 sm:text-base">
//                   In Other cases such as Gusted Holidays/National Holidays or
//                   some Happening violated events in the Country if you place
//                   order between these days the shipping may get effected.In such
//                   case we add a Day or Two accordingly.
//                 </p>
//               </div>

//               <div className="flex gap-4 rounded-2xl border border-slate-100 p-4 sm:p-5">
//                 <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#D9A537] text-sm font-black text-[#243346]">
//                   5
//                 </div>

//                 <p className="text-sm leading-7 text-slate-600 sm:text-base">
//                   Other states 20 working days for delivery.
//                 </p>
//               </div>

//             </div>

//             {/* Delay Contact */}
//             <div className="mt-9 border-t border-slate-200 pt-8">
//               <div className="flex items-start gap-3">

//                 <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#D9A537]/15">
//                   <Mail size={19} className="text-[#D9A537]" />
//                 </div>

//                 <p className="text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
//                   If there is a delay in delivery, the customers are requested
//                   to cooperate with it and customers shall contact us on Email
//                   Id :{" "}
//                   <a
//                     href="mailto:query@brassleaf.store"
//                     className="font-bold text-[#243346] transition hover:text-[#D9A537]"
//                   >
//                     query@brassleaf.store
//                   </a>{" "}
//                   if the product is not delivered with in 10 days from the
//                   ordered date.
//                 </p>

//               </div>
//             </div>

//             {/* Package Condition */}
//             <div className="mt-8 border-t border-slate-200 pt-8">
//               <div className="flex items-start gap-3">

//                 <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#D9A537]/15">
//                   <PackageCheck size={19} className="text-[#D9A537]" />
//                 </div>

//                 <p className="text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
//                   Customers are required not to accept any product if opened,
//                   teared, with damaged package and without product bill.
//                   Brassleaf will not be answerable to any product problem
//                   without bill.
//                 </p>

//               </div>
//             </div>

//             {/* Exchange / Shipping Conditions */}
//             <div className="mt-8 border-t border-slate-200 pt-8">
//               <p className="text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
//                 To get a substitution/exchange, email us your order number and
//                 the Justification for returning on our referenced email address
//                 i.e,query@brassleaf.The orders cannot be shipped to PO boxes or
//                 military addresses; rural domestic addresses require one or
//                 more additional days to deliver. Orders requiring engraving or
//                 any customization will require additional time. store.
//               </p>
//             </div>

//             {/* Non-delivery / Re-delivery */}
//             <div className="mt-8 border-t border-slate-200 pt-8">
//               <p className="text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
//                 If a non-delivery or late delivery occurs due to a mistake by
//                 the User (i.e. wrong or incomplete name or address or recipient
//                 not available or any other related reason) any extra cost spent
//                 by Brassleaf for re-delivery shall be claimed from the User...
//               </p>
//             </div>

//           </div>
//         </div>
//       </section>
//     </main>
//   );
// }