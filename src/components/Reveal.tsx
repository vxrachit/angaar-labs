import { motion } from "framer-motion";

export default function Reveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "scale";
}) {
  const getInitial = () => {
    switch (direction) {
      case "scale":
        return { opacity: 0, scale: 0.92, y: 25 };
      case "left":
        return { opacity: 0, x: -45, y: 0 };
      case "right":
        return { opacity: 0, x: 45, y: 0 };
      case "down":
        return { opacity: 0, y: -35 };
      default:
        return { opacity: 0, y: 38 };
    }
  };

  return (
    <motion.div
      className={className}
      initial={getInitial()}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{
        duration: 0.85,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

