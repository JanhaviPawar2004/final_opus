import { useState, useRef, useEffect } from "react";

export default function Carousel({ slides, speed = 50 }) {
  const containerRef = useRef(null);
  const [offset, setOffset] = useState(0);

  // Duplicate slides for infinite scrolling
  const slidesList = [...slides, ...slides];

  useEffect(() => {
    let animationFrameId;

    const scroll = () => {
      if (!containerRef.current) return;

      setOffset((prev) => {
        const maxOffset = containerRef.current.scrollWidth / 2;
        const newOffset = prev + 1;
        return newOffset >= maxOffset ? 0 : newOffset;
      });

      animationFrameId = requestAnimationFrame(scroll);
    };

    const interval = setTimeout(() => {
      animationFrameId = requestAnimationFrame(scroll);
    }, 1000 / speed); // control speed

    return () => {
      cancelAnimationFrame(animationFrameId);
      clearTimeout(interval);
    };
  }, [speed]);

  return (
    <div className="overflow-hidden w-full relative">
      <ul
        ref={containerRef}
        className="flex whitespace-nowrap gap-x-5.5"
        style={{
          transform: `translateX(-${offset}px)`,
          transition: "transform 0.05s linear",
        }}
      >
        {slidesList.map((slide, idx) => (
          <li
            key={idx}
            className="inline-flex items-center justify-center w-screen flex-shrink-0 relative"
          >
            <div className="relative w-full h-[60vh] text-white text-center rounded-xl overflow-hidden">
              <img
                src={slide.src}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40" />
              <div className="absolute inset-0 flex flex-col justify-center items-center p-8 z-10">
                <h2 className="text-3xl font-semibold">{slide.title}</h2>
                <button className="mt-6 bg-white text-black px-5 py-2 rounded-lg">
                  {slide.button}
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}