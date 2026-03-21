import { useState, useEffect } from "react";

const Hero = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  const farmerImages = [
    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=80&h=80&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=80&h=80&fit=crop&crop=face",
  ];

  return (
    <section className="relative w-full min-h-screen overflow-hidden font-sans">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=1600&q=80')",
        }}
      />

      {/* Dark base overlay */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Green gradient overlay on left */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(105deg, rgba(20, 83, 45, 0.97) 0%, rgba(21, 128, 61, 0.92) 30%, rgba(22, 163, 74, 0.75) 55%, rgba(22, 163, 74, 0.2) 75%, transparent 100%)",
        }}
      />

      {/* Decorative leaf shapes */}
      <div
        className="absolute top-0 left-0 w-72 h-72 rounded-full opacity-10"
        style={{
          background: "radial-gradient(circle, #86efac, transparent 70%)",
          transform: "translate(-30%, -30%)",
        }}
      />
      <div
        className="absolute bottom-20 left-60 w-40 h-40 rounded-full opacity-10"
        style={{
          background: "radial-gradient(circle, #4ade80, transparent 70%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex items-center min-h-screen px-8 md:px-16 lg:px-24 py-20">
        <div className="max-w-2xl">
          {/* Subtitle pill */}
          <div
            className={`inline-flex items-center gap-2 mb-6 transition-all duration-700 ${
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: "100ms" }}
          >
            <span
              className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold tracking-widest uppercase"
              style={{
                background: "rgba(255,255,255,0.12)",
                border: "1px solid rgba(255,255,255,0.25)",
                color: "#bbf7d0",
                backdropFilter: "blur(8px)",
              }}
            >
              <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
              Best Agro Company
            </span>
          </div>

          {/* Main heading */}
          <h1
            className={`text-5xl md:text-6xl lg:text-7xl font-black leading-tight text-white mb-6 transition-all duration-700 ${
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
            style={{
              transitionDelay: "250ms",
              fontFamily: "'Georgia', serif",
              textShadow: "0 4px 24px rgba(0,0,0,0.3)",
              lineHeight: 1.1,
            }}
          >
            Bring Growth{" "}
            <span
              style={{
                WebkitTextStroke: "2px #4ade80",
                color: "transparent",
              }}
            >
              Fresh
            </span>{" "}
            <br />
            Agriculture
          </h1>

          {/* Description */}
          <p
            className={`text-base md:text-lg leading-relaxed mb-10 transition-all duration-700 ${
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
            style={{
              transitionDelay: "400ms",
              color: "rgba(220, 252, 231, 0.85)",
              maxWidth: "480px",
              fontFamily: "'Georgia', sans-serif",
              fontWeight: 300,
            }}
          >
            AI-powered crop selection, fertilizer optimization, real-time weather alerts, and pest detection — everything a farmer needs to grow smarter, reduce costs, and increase income.
          </p>

          {/* CTA Buttons */}
          <div
            className={`flex flex-wrap items-center gap-4 transition-all duration-700 ${
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
            style={{ transitionDelay: "550ms" }}
          >
            {/* Primary CTA */}
            <button
              className="group flex items-center gap-3 px-8 py-4 rounded-full font-bold text-white text-base transition-all duration-300 hover:scale-105 hover:shadow-2xl active:scale-95"
              style={{
                background:
                  "linear-gradient(135deg, #ea580c 0%, #f97316 50%, #fb923c 100%)",
                boxShadow: "0 8px 32px rgba(234, 88, 12, 0.45)",
              }}
            >
              Discover More
              <span
                className="flex items-center justify-center w-8 h-8 rounded-full bg-white/20 transition-transform duration-300 group-hover:translate-x-1"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </span>
            </button>

            {/* Secondary CTA */}
            <button
              className="flex items-center gap-2 px-6 py-4 rounded-full font-semibold text-white text-base transition-all duration-300 hover:bg-white/20 active:scale-95"
              style={{
                border: "1.5px solid rgba(255,255,255,0.4)",
                backdropFilter: "blur(6px)",
                background: "rgba(255,255,255,0.08)",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Watch Story
            </button>
          </div>

          {/* Stats row */}
          <div
            className={`flex flex-wrap gap-8 mt-14 transition-all duration-700 ${
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
            style={{ transitionDelay: "700ms" }}
          >
            {[
              { value: "15K+", label: "Happy Farmers" },
              { value: "98%", label: "Organic Certified" },
              { value: "200+", label: "Crop Varieties" },
            ].map((stat) => (
              <div key={stat.label}>
                <div
                  className="text-3xl font-black"
                  style={{ color: "#86efac" }}
                >
                  {stat.value}
                </div>
                <div
                  className="text-sm mt-0.5"
                  style={{ color: "rgba(187, 247, 208, 0.7)" }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom right: overlapping circular images + trust badge */}
      <div
        className={`absolute bottom-10 right-8 md:right-16 lg:right-24 flex flex-col items-end gap-3 transition-all duration-700 ${
          loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
        style={{ transitionDelay: "800ms" }}
      >
        {/* Trust card */}
        <div
          className="flex items-center gap-3 px-5 py-3 rounded-2xl"
          style={{
            background: "rgba(255,255,255,0.1)",
            border: "1px solid rgba(255,255,255,0.2)",
            backdropFilter: "blur(12px)",
          }}
        >
          {/* Overlapping avatars */}
          <div className="flex items-center">
            {farmerImages.map((src, i) => (
              <div
                key={i}
                className="relative rounded-full overflow-hidden border-2 border-white"
                style={{
                  width: 42,
                  height: 42,
                  marginLeft: i === 0 ? 0 : -14,
                  zIndex: i + 1,
                  boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
                }}
              >
                <img
                  src={src}
                  alt={`Customer ${i + 1}`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = "none";
                    e.target.parentElement.style.background =
                      i === 0 ? "#166534" : i === 1 ? "#15803d" : "#16a34a";
                  }}
                />
              </div>
            ))}
            {/* +count bubble */}
            <div
              className="relative flex items-center justify-center text-white text-xs font-bold rounded-full border-2 border-white"
              style={{
                width: 42,
                height: 42,
                marginLeft: -14,
                zIndex: 4,
                background: "linear-gradient(135deg, #ea580c, #f97316)",
                boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
              }}
            >
              +5k
            </div>
          </div>

          <div>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((s) => (
                <svg
                  key={s}
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-3 h-3"
                  viewBox="0 0 20 20"
                  fill="#fbbf24"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <p
              className="text-xs mt-0.5 font-medium"
              style={{ color: "rgba(220,252,231,0.9)" }}
            >
              5,000+ Trusted Farmers
            </p>
          </div>
        </div>

        {/* Fresh badge */}
        <div
          className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold"
          style={{
            background: "rgba(255,255,255,0.12)",
            border: "1px solid rgba(255,255,255,0.2)",
            backdropFilter: "blur(8px)",
            color: "#bbf7d0",
          }}
        >
          <span className="text-lg">🌱</span>
          100% Organic & Sustainable
        </div>
      </div>

      {/* Decorative bottom wave shape */}
      <div
        className="absolute bottom-0 left-0 right-0 h-2 rounded-none"
        style={{
          background:
            "linear-gradient(90deg, #16a34a, #4ade80, #ea580c, #16a34a)",
          opacity: 0.6,
        }}
      />
    </section>
  );
};

export default Hero;