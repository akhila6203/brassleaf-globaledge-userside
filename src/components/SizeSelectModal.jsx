import { X } from "lucide-react";

export default function SizeSelectModal({
  product,
  open,
  size,
  setSize,
  onConfirm,
  onClose,
  action = "Add to Cart",
}) {
  if (!open || !product || !product.sizes?.length) return null;

  // const variationFor = (item) =>
  //   product.variations?.find((variation) => variation.size === item);
 const variationFor = (item) =>
    product.variations?.find(
      (variation) =>
        String(variation.size) ===
        String(item)
    );
    
  return (
    <div className="fixed inset-0 z-[80] grid place-items-center bg-[#243346]/60 px-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[.18em] text-[#D9A537]">Choose Size</p>
            <h2 className="mt-2 text-xl font-black text-[#243346]">{product.name}</h2>
          </div>
          <button onClick={onClose} className="rounded-full p-2 text-slate-500 hover:bg-slate-100" aria-label="Close">
            <X size={20} />
          </button>
        </div>

        <p className="mt-5 text-sm text-slate-500">Please select a size before continuing.</p>

        <div className="mt-4 grid grid-cols-4 gap-2">
          {/* {product.sizes.map((item) => { */}
          {[...product.sizes]
            .sort((a, b) => Number(a) - Number(b))
            .map((item) => {
            const variation = variationFor(item);
            const unavailable = variation?.stockStatus === "outofstock";
            return (
              <button
                key={item}
                type="button"
                disabled={unavailable}
                onClick={() => !unavailable && setSize(item)}
                className={`rounded-xl border px-3 py-3 text-sm font-bold transition ${
                  unavailable
                    ? "cursor-not-allowed border-slate-200 bg-slate-50 text-slate-400 line-through"
                    : size === item
                      ? "border-[#D9A537] bg-[#D9A537] text-[#243346]"
                      : "border-slate-200 text-[#243346] hover:border-[#D9A537]"
                }`}
              >
                {item}
              </button>
            );
          })}
        </div>

        <button type="button" onClick={onConfirm} className="btn-gold mt-6 w-full">{action}</button>
      </div>
    </div>
  );
}
