import { Link } from "react-router-dom";

export default function PrivacyPolicy() {
  return (
    <main className="bg-white">
      {/* =========================================
          PAGE HEADER
      ========================================= */}

      <section className="bg-[#243346]">
        <div className="container-site py-9 sm:py-11 lg:py-12">
          <h1 className="text-3xl font-black text-[#eff2f5] sm:text-4xl">
            Privacy Policy
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
              Privacy Policy
            </span>
          </div>
        </div>
      </section>

      {/* =========================================
          PRIVACY POLICY CONTENT
      ========================================= */}

      <section className="container-site py-14 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-6xl">

          {/* =====================================
              PROTECTION STRATEGY
          ===================================== */}

          <section>
            <h2 className="text-xl font-black text-[#243346] sm:text-[22px]">
              Protection Strategy
            </h2>

            <p className="mt-5 text-[15px] leading-8 text-slate-600 sm:text-base sm:leading-8">
              We protect your privacy: Our protection strategy is basic and
              straightforward: any data you share with us, stays with us. We
              don’t lease, sell, loan, or in any case convey your own data to
              anybody under any circumstance. This incorporates your contact
              data, as well as unambiguous request data. We limit information
              admittance to the individuals who truly need to be aware. Inside
              our association, your own information is open to just a
              predetermined number of representatives with exceptional access
              honors. Despite the fact that we may, now and again, incorporate
              general segment data in light of your request, this data is shared
              inside our association just and has no recognizable individual
              information related with it.
            </p>
          </section>

          {/* =====================================
              INFORMATION COLLECTED
          ===================================== */}

          <section className="mt-8 sm:mt-10">
            <h2 className="text-xl font-black text-[#243346] sm:text-[22px]">
              Information Collected:
            </h2>

            <p className="mt-5 text-[15px] leading-8 text-slate-600 sm:text-base sm:leading-8">
              We require the following fundamental information about you in
              order for you to be able to place an order on our website: Your
              Most memorable Name, Your Last Name, and Your Location, City,
              Postal division, State, Nation, Telephone Number and Contact Email
              address. Aside from this, our frameworks assemble specific
              insights concerning your PC’s web association like your IP address
              when you visit our website. Your IP address doesn’t recognize you
              actually. We utilize this data to convey our pages to you upon
              demand, to modify our site according to your advantage, to
              ascertain the quantity of guests on our site and to know the
              geographic areas from where our guests come. We permit no
              unapproved individual or association be it different individuals,
              guests, and anybody not in that frame of mind to utilize any data
              gathered from you.
            </p>
          </section>

        </div>
      </section>
    </main>
  );
}


