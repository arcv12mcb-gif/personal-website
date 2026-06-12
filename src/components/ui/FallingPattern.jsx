import { motion } from "framer-motion";

const backgroundImage = [
  "radial-gradient(4px 100px at 0px 235px, var(--falling-color), transparent)",
  "radial-gradient(4px 100px at 300px 235px, var(--falling-color), transparent)",
  "radial-gradient(1.5px 1.5px at 150px 117.5px, var(--falling-color) 100%, transparent 150%)",
  "radial-gradient(4px 100px at 0px 252px, var(--falling-color), transparent)",
  "radial-gradient(4px 100px at 300px 252px, var(--falling-color), transparent)",
  "radial-gradient(1.5px 1.5px at 150px 126px, var(--falling-color) 100%, transparent 150%)",
  "radial-gradient(4px 100px at 0px 150px, var(--falling-color), transparent)",
  "radial-gradient(4px 100px at 300px 150px, var(--falling-color), transparent)",
  "radial-gradient(1.5px 1.5px at 150px 75px, var(--falling-color) 100%, transparent 150%)",
  "radial-gradient(4px 100px at 0px 204px, var(--falling-color), transparent)",
  "radial-gradient(4px 100px at 300px 204px, var(--falling-color), transparent)",
  "radial-gradient(1.5px 1.5px at 150px 102px, var(--falling-color) 100%, transparent 150%)",
].join(", ");

const backgroundSize = [
  "300px 235px",
  "300px 235px",
  "300px 235px",
  "300px 252px",
  "300px 252px",
  "300px 252px",
  "300px 150px",
  "300px 150px",
  "300px 150px",
  "300px 204px",
  "300px 204px",
  "300px 204px",
].join(", ");

const startPositions =
  "0px 220px, 3px 220px, 151.5px 337.5px, 25px 24px, 28px 24px, 176.5px 150px, 50px 16px, 53px 16px, 201.5px 91px, 100px 19px, 103px 19px, 251.5px 121px";
const endPositions =
  "0px 6800px, 3px 6800px, 151.5px 6917.5px, 25px 13632px, 28px 13632px, 176.5px 13758px, 50px 5416px, 53px 5416px, 201.5px 5491px, 100px 5119px, 103px 5119px, 251.5px 5221px";

function FallingPattern({
  className = "",
  color = "rgba(94, 234, 212, 0.42)",
  backgroundColor = "rgba(2, 6, 23, 0.08)",
  duration = 110,
  density = 1,
}) {
  return (
    <div
      className={`fallingPattern ${className}`}
      style={{
        "--falling-color": color,
        "--falling-background": backgroundColor,
        "--falling-dot-size": `${8 * density}px`,
      }}
      aria-hidden="true"
    >
      <motion.div
        className="fallingPatternMotion"
        initial={{ opacity: 0, backgroundPosition: startPositions }}
        animate={{ opacity: 1, backgroundPosition: [startPositions, endPositions] }}
        transition={{ opacity: { duration: 0.2 }, backgroundPosition: { duration, ease: "linear", repeat: Infinity } }}
        style={{
          backgroundImage,
          backgroundSize,
        }}
      />
      <div className="fallingPatternVeil" />
    </div>
  );
}

export default FallingPattern;
