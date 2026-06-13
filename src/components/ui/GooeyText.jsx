import { useEffect, useId, useRef } from "react";

function GooeyText({ texts, morphTime = 1, cooldownTime = 0.28, className = "" }) {
  const text1Ref = useRef(null);
  const text2Ref = useRef(null);
  const filterId = useId().replace(/:/g, "");

  useEffect(() => {
    if (!texts.length) return undefined;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      if (text1Ref.current && text2Ref.current) {
        text1Ref.current.textContent = texts[0];
        text1Ref.current.style.opacity = "1";
        text2Ref.current.style.opacity = "0";
      }
      return undefined;
    }

    let textIndex = texts.length - 1;
    let time = performance.now();
    let morph = 0;
    let cooldown = cooldownTime;
    let frameId = 0;

    const setMorph = (fraction) => {
      const safeFraction = Math.max(fraction, 0.001);
      const inverseFraction = Math.max(1 - safeFraction, 0.001);

      if (text1Ref.current && text2Ref.current) {
        text2Ref.current.style.filter = `blur(${Math.min(8 / safeFraction - 8, 100)}px)`;
        text2Ref.current.style.opacity = `${Math.pow(safeFraction, 0.4)}`;
        text1Ref.current.style.filter = `blur(${Math.min(8 / inverseFraction - 8, 100)}px)`;
        text1Ref.current.style.opacity = `${Math.pow(inverseFraction, 0.4)}`;
      }
    };

    const doCooldown = () => {
      morph = 0;
      if (text1Ref.current && text2Ref.current) {
        text2Ref.current.style.filter = "";
        text2Ref.current.style.opacity = "1";
        text1Ref.current.style.filter = "";
        text1Ref.current.style.opacity = "0";
      }
    };

    const doMorph = () => {
      morph -= cooldown;
      cooldown = 0;
      let fraction = morph / morphTime;

      if (fraction > 1) {
        cooldown = cooldownTime;
        fraction = 1;
      }

      setMorph(fraction);
    };

    const animate = () => {
      frameId = window.requestAnimationFrame(animate);
      const nextTime = performance.now();
      const shouldIncrementIndex = cooldown > 0;
      const delta = (nextTime - time) / 1000;
      time = nextTime;
      cooldown -= delta;

      if (cooldown <= 0) {
        if (shouldIncrementIndex) {
          textIndex = (textIndex + 1) % texts.length;
          if (text1Ref.current && text2Ref.current) {
            text1Ref.current.textContent = texts[textIndex % texts.length];
            text2Ref.current.textContent = texts[(textIndex + 1) % texts.length];
          }
        }
        doMorph();
      } else {
        doCooldown();
      }
    };

    if (text1Ref.current && text2Ref.current) {
      text1Ref.current.textContent = texts[0];
      text2Ref.current.textContent = texts[1 % texts.length];
    }

    animate();

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, [texts, morphTime, cooldownTime]);

  return (
    <div className={`gooeyText ${className}`} aria-label={texts.join(", ")}>
      <svg className="gooeyTextFilter" aria-hidden="true" focusable="false">
        <defs>
          <filter id={filterId}>
            <feColorMatrix
              in="SourceGraphic"
              type="matrix"
              values="1 0 0 0 0
                      0 1 0 0 0
                      0 0 1 0 0
                      0 0 0 255 -140"
            />
          </filter>
        </defs>
      </svg>
      <div className="gooeyTextStage" style={{ filter: `url(#${filterId})` }}>
        <span ref={text1Ref} />
        <span ref={text2Ref} />
      </div>
    </div>
  );
}

export default GooeyText;
