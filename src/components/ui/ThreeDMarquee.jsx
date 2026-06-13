import { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const tileColors = [
  ["#5eead4", "#0f766e"],
  ["#facc15", "#854d0e"],
  ["#60a5fa", "#1e3a8a"],
  ["#f8fafc", "#334155"],
  ["#a7f3d0", "#14532d"],
  ["#fde68a", "#713f12"],
  ["#67e8f9", "#155e75"],
  ["#cbd5e1", "#1e293b"],
  ["#99f6e4", "#115e59"],
  ["#fef3c7", "#78350f"],
  ["#bae6fd", "#075985"],
  ["#e2e8f0", "#0f172a"],
];

const tileLabels = [
  "Service",
  "Booking",
  "Gallery",
  "Contact",
  "Mobile",
  "SEO",
  "Launch",
  "Trust",
  "Pricing",
  "About",
  "Reviews",
  "Support",
];

const makeTileImage = (label, index) => {
  const [accent, base] = tileColors[index % tileColors.length];
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="520" height="390" viewBox="0 0 520 390">
      <defs>
        <linearGradient id="bg" x1="0" x2="1" y1="0" y2="1">
          <stop stop-color="${base}"/>
          <stop offset="1" stop-color="#020617"/>
        </linearGradient>
      </defs>
      <rect width="520" height="390" rx="30" fill="url(#bg)"/>
      <rect x="36" y="34" width="448" height="48" rx="15" fill="rgba(255,255,255,0.11)"/>
      <circle cx="66" cy="58" r="8" fill="${accent}"/>
      <circle cx="92" cy="58" r="8" fill="rgba(255,255,255,0.35)"/>
      <circle cx="118" cy="58" r="8" fill="rgba(255,255,255,0.22)"/>
      <rect x="52" y="128" width="270" height="18" rx="9" fill="${accent}"/>
      <rect x="52" y="168" width="390" height="14" rx="7" fill="rgba(255,255,255,0.38)"/>
      <rect x="52" y="202" width="316" height="14" rx="7" fill="rgba(255,255,255,0.24)"/>
      <rect x="52" y="276" width="126" height="42" rx="14" fill="${accent}"/>
      <text x="52" y="258" fill="#f8fafc" font-family="Arial, sans-serif" font-size="44" font-weight="800">${label}</text>
    </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
};

const defaultImages = tileLabels.map(makeTileImage);

function ThreeDMarquee({ images = defaultImages, label, title }) {
  const reduceMotion = useReducedMotion();
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const shouldFreeze = reduceMotion || isSmallScreen;

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 760px)");
    const updateScreen = () => setIsSmallScreen(mediaQuery.matches);
    updateScreen();
    mediaQuery.addEventListener("change", updateScreen);

    return () => mediaQuery.removeEventListener("change", updateScreen);
  }, []);

  const chunks = useMemo(() => {
    const chunkSize = Math.ceil(images.length / 3);
    return Array.from({ length: 3 }, (_, columnIndex) => {
      const start = columnIndex * chunkSize;
      return images.slice(start, start + chunkSize);
    });
  }, [images]);

  return (
    <div className="threeDMarquee" aria-label={title}>
      <div className="threeDMarqueeHeader">
        <span>{label}</span>
        <strong>{title}</strong>
      </div>
      <div className="threeDMarqueeStage" aria-hidden="true">
        <div className="threeDMarqueeGrid">
          {chunks.map((chunk, columnIndex) => (
            <motion.figure
              className="threeDMarqueeColumn"
              animate={shouldFreeze ? { y: 0 } : { y: columnIndex % 2 === 0 ? 46 : -46 }}
              transition={{
                duration: columnIndex % 2 === 0 ? 11 : 15,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
              key={`marquee-column-${columnIndex}`}
            >
              {chunk.map((src, imageIndex) => (
                <img
                  src={src}
                  alt=""
                  draggable={false}
                  loading="lazy"
                  key={`${src}-${imageIndex}`}
                />
              ))}
            </motion.figure>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ThreeDMarquee;
