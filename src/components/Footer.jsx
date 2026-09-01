import { Link } from "react-router-dom";
import { Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#1E2E3E] text-white">
      <div className="container-site grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-[1.15fr_.9fr_1fr]">
        <div>
          <img
            src="/logo3.jpg"
            alt="Brass Leaf Uniforms"
            className="mb-5 h-20 w-54 rounded-lg p-1"
          />
          <p className="max-w-sm text-[15px] leading-7 text-slate-300">
            We at BrassLeaf work with one core mission – That is to provide the
            best in class quality at affordable price and word class service. We
            duly understand the importance of uniforms and assure you 100%
            quality for all the products that we deal in. Our team of experts
            always work hard and cater to provide you best in class service
          </p>
          {/* <div className="mt-6 flex gap-3">
            <a
              href="tel:+919999999999"
              aria-label="Phone"
              className="rounded-full border border-white/10 p-2.5 transition hover:border-[#D9A537] hover:text-[#D9A537]"
            >
              <Phone size={18} />
            </a>
            <a
              href="#"
              aria-label="Instagram"
              className="rounded-full border border-white/10 p-2.5 transition hover:border-[#D9A537] hover:text-[#D9A537]"
            >
              <Instagram size={18} />
            </a>
            <a
              href="#"
              aria-label="Facebook"
              className="rounded-full border border-white/10 p-2.5 transition hover:border-[#D9A537] hover:text-[#D9A537]"
            >
              <Facebook size={18} />
            </a>
          </div> */}
        </div>

        <div>
          <h3 className="mb-5 text-lg font-bold text-[#D9A537]">Information</h3>
          <div className="flex flex-col gap-3.5 text-[15px] text-slate-300">
            <Link to="/privacy-policy" className="transition hover:text-white">
              Privacy Policy
            </Link>
            <Link to="/return-policy" className="transition hover:text-white">
              Return Policy
            </Link>
            <Link to="/refund-policy" className="transition hover:text-white">
              Refund Policy
            </Link>
            <Link to="/shipping-policy" className="transition hover:text-white">
              Shipping Policy
            </Link>
            <Link
              to="/cancellation-policy"
              className="transition hover:text-white"
            >
              Cancellation Policy
            </Link>
          </div>
        </div>

        <div>
          <h3 className="mb-5 text-lg font-bold text-[#D9A537]">Contact Us</h3>
          <div className="space-y-5 text-[15px] text-slate-300">
            <div className="flex gap-3">
              <Phone size={19} className="mt-0.5 shrink-0 text-[#D9A537]" />
              <a
                href="tel:+919876543210"
                className="transition hover:text-white"
              >
                +91 99999 99999
              </a>
            </div>
            {/* <div className="flex gap-3">
              <Mail size={19} className="mt-0.5 shrink-0 text-[#D9A537]" />
              <a
                href="mailto:info@uniforms.com"
                className="transition hover:text-white"
              >
                info@uniforms.com
              </a>
            </div> */}
            <div className="flex gap-3">
              <MapPin size={19} className="mt-0.5 shrink-0 text-[#D9A537]" />
              <span className="leading-6">6-3-666/B, Pillar No. #1118, Panjagutta, Hyderabad – 500082, Opp. Nims Hospital.</span>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-sm text-slate-400">
        © 2026 Brass Leaf Uniforms. All Rights Reserved.
      </div>
    </footer>
  );
}
