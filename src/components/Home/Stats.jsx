import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaUsers, FaBoxOpen, FaLeaf } from "react-icons/fa";

const Stats = ({ stats }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const icons = [FaUsers, FaBoxOpen, FaLeaf];

  return (
    <section ref={ref} className="py-10 px-4 bg-pink-600">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-3 gap-8 text-center">
          {stats.map((stat, index) => {
            const Icon = icons[index];
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: index * 0.1, duration: 0.4 }}
              >
                <Icon className="text-3xl md:text-4xl text-white/80 mx-auto mb-3" />
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-1">
                  {stat.value}
                </h3>
                <p className="text-xs md:text-sm text-white/80">
                  {stat.label}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Stats;