import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  return (
    <div
      className="fixed right-0 top-0 w-[1px] h-screen z-[9980] pointer-events-none hidden md:block"
      style={{ background: 'rgba(220,216,192,0.07)' }}
    >
      <motion.div
        className="w-full h-full origin-top"
        style={{ scaleY, background: 'rgba(220,216,192,0.40)' }}
      />
    </div>
  );
};

export default ScrollProgress;
