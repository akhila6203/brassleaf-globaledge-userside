import { Minus, Plus } from "lucide-react";
import { useState } from "react";
import { faqs } from "../data/dummyData";

export default function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <section className="section-pad bg-white">
      <div className="container-site">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <p className="text-sm font-extrabold uppercase tracking-[.2em] text-[#D9A537]">Frequently Asked Questions</p>
          <h2 className="mt-3 text-3xl font-black text-[#243346] sm:text-4xl">Everything You Need To Know</h2>
        </div>
        <div className="mx-auto max-w-4xl space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = open === i;
            return (
              <div key={faq.question} className="overflow-hidden rounded-2xl border border-slate-200">
                <button onClick={() => setOpen(isOpen ? -1 : i)} className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left font-bold text-[#243346]">
                  <span>{faq.question}</span>
                  {isOpen ? <Minus size={19} className="shrink-0 text-[#D9A537]"/> : <Plus size={19} className="shrink-0 text-[#D9A537]"/>}
                </button>
                {isOpen && <div className="border-t border-slate-100 px-5 pb-5 pt-4 text-sm leading-7 text-slate-600">{faq.answer}</div>}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}