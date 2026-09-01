import { ArrowLeft, ArrowRight, LockKeyhole } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const slides = [
  {
    title: (
      <>
        Official School{" "}
        <span className="text-[#D9A537]">Uniforms</span>, Designed for
        Comfort & Style
      </>
    ),
    text: "Premium quality uniforms for schools and institutions, with dependable sizing, branding and bulk-order support.",
    image:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1800&q=85",
  },
  {
    title: (
      <>
        Uniforms That Build a{" "}
        <span className="text-[#D9A537]">Strong Identity</span>
      </>
    ),
    text: "Smart, comfortable collections for schools, colleges, corporate teams and organizations.",
    image:
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1800&q=85",
  },
  {
    title: (
      <>
        Private School Stores,{" "}
        <span className="text-[#D9A537]">Made Simple</span>
      </>
    ),
    text: "Explore collections, select sizes and build your uniform order from one trusted storefront.",
    image:
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=1800&q=85",
  },
];

export default function HeroSlider() {
  const [active, setActive] = useState(0);

  // Automatic slider
  useEffect(() => {
    const timer = setInterval(() => {
      setActive((current) => (current + 1) % slides.length);
    }, 5500);

    return () => clearInterval(timer);
  }, []);

  const slide = slides[active];

  // Previous slide
  const previousSlide = () => {
    setActive((current) =>
      current === 0 ? slides.length - 1 : current - 1
    );
  };

  // Next slide
  const nextSlide = () => {
    setActive((current) => (current + 1) % slides.length);
  };

  return (
    <section className="relative min-h-[400px] overflow-hidden bg-[#243346] text-white sm:min-h-[400px] lg:min-h-[550px]">
      {/* Background Image */}
      <img
        src={slide.image}
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-20 transition-all duration-700"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#243346] via-[#243346]/95 to-[#243346]/65" />

      {/* =========================
          LEFT ARROW - MIDDLE
      ========================== */}
      <button
        type="button"
        onClick={previousSlide}
        aria-label="Previous slide"
        className="
          absolute
          left-4
          top-1/2
          z-30
          flex
          h-12
          w-12
          -translate-y-1/2
          items-center
          justify-center
          rounded-full
          border
          border-white/25
          bg-[#243346]/80
          text-white
          shadow-lg
          backdrop-blur-sm
          transition-all
          duration-300
          hover:border-[#D9A537]
          hover:bg-[#D9A537]
          hover:text-[#243346]
          sm:left-6
          lg:left-8
        "
      >
        <ArrowLeft size={22} strokeWidth={2} />
      </button>

      {/* =========================
          RIGHT ARROW - MIDDLE
      ========================== */}
      <button
        type="button"
        onClick={nextSlide}
        aria-label="Next slide"
        className="
          absolute
          right-4
          top-1/2
          z-30
          flex
          h-12
          w-12
          -translate-y-1/2
          items-center
          justify-center
          rounded-full
          border
          border-white/25
          bg-[#243346]/80
          text-white
          shadow-lg
          backdrop-blur-sm
          transition-all
          duration-300
          hover:border-[#D9A537]
          hover:bg-[#D9A537]
          hover:text-[#243346]
          sm:right-6
          lg:right-8
        "
      >
        <ArrowRight size={22} strokeWidth={2} />
      </button>

      {/* Hero Content */}
      <div className="relative z-10 container-site flex min-h-[430px] items-center py-8 sm:min-h-[400px] sm:py-10 lg:min-h-[500px] lg:py-12">
        <div className="max-w-5xl px-4 sm:px-10 lg:px-14">
          {/* Badge */}
          <div
            className="
              mb-7
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-[#D9A537]/60
              bg-[#D9A537]/10
              px-4
              py-2
              text-sm
              font-semibold
              text-[#E5BD62]
            "
          >
            <LockKeyhole size={17} />
            Premium School Uniform Store
          </div>

          {/* Heading */}
          <h1
            className="
            text-3xl
            font-black
            leading-[1.08]
            tracking-tight
            sm:text-4xl
            lg:text-7xl
            "
          >
            {slide.title}
          </h1>

          {/* Description */}
          <p
            className="
              mt-5
              max-w-3xl
              text-sm
              leading-6
              text-slate-300
              sm:text-base
            "
          >
            {slide.text}
          </p>

          {/* Buttons */}
          <div className="mt-6 flex flex-row flex-nowrap gap-2 sm:mt-7 sm:gap-3">
            <Link
                to="/collections"
                className="btn-gold whitespace-nowrap px-4 text-xs sm:px-5 sm:text-sm"
              >
              Explore Collections
              <ArrowRight size={18} />
            </Link>

            <Link
              to="/contact"
              className="btn-outline whitespace-nowrap px-4 text-xs sm:px-5 sm:text-sm"
            >
              Bulk Order Enquiry
            </Link>
          </div>
        </div>
      </div>

      {/* =========================
          SLIDE DOTS
          Keep at bottom-center
      ========================== */}
      <div
        className="
          absolute
          bottom-7
          left-1/2
          z-20
          flex
          -translate-x-1/2
          gap-2
        "
      >
        {slides.map((_, index) => (
          <button
            key={index}
            type="button"
            aria-label={`Go to slide ${index + 1}`}
            onClick={() => setActive(index)}
            className={`
              h-2.5
              rounded-full
              transition-all
              duration-300
              ${
                active === index
                  ? "w-8 bg-[#D9A537]"
                  : "w-2.5 bg-white/40 hover:bg-white/70"
              }
            `}
          />
        ))}
      </div>
    </section>
  );
}