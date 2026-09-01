import { ChevronRight, Home } from "lucide-react";
import { Link } from "react-router-dom";

export default function Breadcrumb({ items = [] }) {
  return (
    <div className="border-b border-slate-100 bg-white">
      <div className="container-site flex min-h-12 items-center gap-2 overflow-x-auto whitespace-nowrap text-sm">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 font-semibold text-slate-500 hover:text-[#D9A537]"
        >
          <Home size={15} /> Home
        </Link>
        {items.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-2">
            <ChevronRight size={14} className="text-slate-300" />
            {item.to ? (
              <Link
                to={item.to}
                className="font-semibold text-slate-500 hover:text-[#D9A537]"
              >
                {item.label}
              </Link>
            ) : (
              <span className="font-semibold text-[#243346]">{item.label}</span>
            )}
          </span>
        ))}
      </div>
    </div>
  );
}
