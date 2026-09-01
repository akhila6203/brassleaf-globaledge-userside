import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { testimonials } from "../data/dummyData";
import { useEffect, useRef, useState } from "react";

export default function Testimonials() {
  const sliderRef = useRef(null);
  const autoSlideRef = useRef(null);

  const [isPaused, setIsPaused] = useState(false);

  /*
   * Duplicate testimonials.
   * This allows the slider to continue smoothly
   * from the last item back to the first item.
   */
  const sliderItems = [...testimonials, ...testimonials];

  /* =========================================
     CARD WIDTH + GAP
  ========================================= */
  const getSlideDistance = () => {
    const slider = sliderRef.current;

    if (!slider) return 0;

    const card = slider.querySelector("[data-testimonial-card]");

    if (!card) return 0;

    const cardWidth = card.offsetWidth;
    const gap = 24;

    return cardWidth + gap;
  };

  /* =========================================
     MOVE ONE CARD
  ========================================= */
  const moveNext = () => {
    const slider = sliderRef.current;

    if (!slider) return;

    slider.scrollBy({
      left: getSlideDistance(),
      behavior: "smooth",
    });
  };

  const movePrevious = () => {
    const slider = sliderRef.current;

    if (!slider) return;

    slider.scrollBy({
      left: -getSlideDistance(),
      behavior: "smooth",
    });
  };

  /* =========================================
     CONTINUOUS AUTO SLIDE
  ========================================= */
  useEffect(() => {
    if (isPaused) return;

    autoSlideRef.current = setInterval(() => {
      const slider = sliderRef.current;

      if (!slider) return;

      const distance = getSlideDistance();

      if (!distance) return;

      slider.scrollBy({
        left: distance,
        behavior: "smooth",
      });
    }, 4000);

    return () => {
      clearInterval(autoSlideRef.current);
    };
  }, [isPaused]);

  /* =========================================
     RESET DUPLICATE SECTION
     WITHOUT VISIBLE BACKWARD MOVEMENT
  ========================================= */
  const handleScroll = () => {
    const slider = sliderRef.current;

    if (!slider) return;

    const originalSetWidth =
      slider.scrollWidth / 2;

    /*
     * Once we enter the duplicated section,
     * silently move back by one original set.
     *
     * Because both sets contain exactly the same
     * cards, visually the user sees no jump.
     */
    if (slider.scrollLeft >= originalSetWidth) {
      slider.style.scrollBehavior = "auto";

      slider.scrollLeft =
        slider.scrollLeft - originalSetWidth;

      slider.style.scrollBehavior = "smooth";
    }
  };

  return (
    <section className="section-pad bg-[#f7f8fa]">
      <div className="container-site">

        {/* =====================================
            HEADING
        ====================================== */}
        <div className="mx-auto mb-10 max-w-2xl text-center sm:mb-12">

          <p className="text-sm font-extrabold uppercase tracking-[.2em] text-[#D9A537]">
            Testimonials
          </p>

          <h2 className="mt-3 text-3xl font-black text-[#243346] sm:text-4xl">
            What Our Customers Say
          </h2>

          <p className="mt-4 text-slate-500">
            Trusted by schools, teams and organizations for quality uniforms
            and dependable service.
          </p>

        </div>

        {/* =====================================
            SLIDER
        ====================================== */}
        <div
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >

          {/* =====================================
              LEFT GLASS ARROW
          ====================================== */}
          <button
            type="button"
            onClick={movePrevious}
            aria-label="Previous testimonial"
            className="
              absolute
              left-0
              top-1/2
              z-20
              -translate-y-1/2

              flex
              h-10
              w-10
              items-center
              justify-center

              rounded-full
              border
              border-white/80
              bg-white/80
              text-[#243346]

              shadow-lg
              backdrop-blur-md

              transition
              duration-300

              hover:bg-white
              hover:text-[#D9A537]
              hover:shadow-xl

              sm:left-1
              sm:h-11
              sm:w-11
            "
          >
            <ChevronLeft size={21} />
          </button>

          {/* =====================================
              RIGHT GLASS ARROW
          ====================================== */}
          <button
            type="button"
            onClick={moveNext}
            aria-label="Next testimonial"
            className="
              absolute
              right-0
              top-1/2
              z-20
              -translate-y-1/2

              flex
              h-10
              w-10
              items-center
              justify-center

              rounded-full
              border
              border-white/80
              bg-white/80
              text-[#243346]

              shadow-lg
              backdrop-blur-md

              transition
              duration-300

              hover:bg-white
              hover:text-[#D9A537]
              hover:shadow-xl

              sm:right-1
              sm:h-11
              sm:w-11
            "
          >
            <ChevronRight size={21} />
          </button>

          {/* =====================================
              SLIDER TRACK
          ====================================== */}
          <div
            ref={sliderRef}
            onScroll={handleScroll}
            className="
              flex
              gap-6
              overflow-x-hidden
              scroll-smooth
            "
          >

            {sliderItems.map((item, index) => (
              <article
                key={`${item.id}-${index}`}
                data-testimonial-card
                className="
                  shrink-0
                  w-full

                  rounded-2xl
                  bg-white
                  p-7
                  shadow-sm

                  sm:w-[calc((100%-24px)/2)]

                  lg:w-[calc((100%-48px)/3)]
                "
              >

                {/* Quote */}
                <Quote
                  className="text-[#D9A537]"
                  size={32}
                />

                {/* Rating */}
                <div className="mt-4 flex gap-1">
                  {Array.from({
                    length: item.rating,
                  }).map((_, index) => (
                    <Star
                      key={index}
                      size={16}
                      fill="#D9A537"
                      color="#D9A537"
                    />
                  ))}
                </div>

                {/* Review */}
                <p
                  className="
                    mt-5
                    leading-7
                    text-slate-600
                    line-clamp-5
                  "
                >
                  “{item.message}”
                </p>

                {/* Customer */}
                <div className="mt-5 border-t border-slate-100 pt-5">

                  <p className="font-bold text-[#243346]">
                    {item.name}
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    {item.role}
                  </p>

                </div>

              </article>
            ))}

          </div>
        </div>

      </div>
    </section>
  );
}