import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Suggestionblog from '../../Partials/Components/Question';

const KnowMore = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      className="py-12 px-4 bg-gradient-to-br from-purple-50 to-pink-50"
    >
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-serif text-pink-700 mb-3">
          Beauty Insights
        </h2>
        <p className="text-gray-600 text-sm mb-8 max-w-2xl mx-auto">
          Expert tips and product recommendations tailored for you
        </p>
        <Suggestionblog />
      </div>
    </motion.section>
  );
};

export default KnowMore;