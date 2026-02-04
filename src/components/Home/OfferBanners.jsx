import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const OfferBanners = ({ banner1, banner2, placeholder }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.section 
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      className="py-10 lg:py-16 px-4 lg:px-9"
    >
      <div className="grid md:grid-cols-2 gap-6 max-w-7xl mx-auto">
        {[banner1, banner2].map((banner, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: index * 0.2, duration: 0.6 }}
            className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500"
          >
            <motion.img
              src={banner || placeholder}
              onError={(e) => (e.target.src = placeholder)}
              alt={`Offer ${index + 1}`}
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.6 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default OfferBanners;