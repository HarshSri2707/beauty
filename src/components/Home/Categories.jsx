import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Categories = ({ categories, placeholder }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const navigate = useNavigate();

  return (
    <section ref={ref} className="py-12 lg:py-20 px-4 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Centered Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-serif text-slate-900 mb-3">
            Shop by Category
          </h2>
          <p className="text-slate-500">Curated collections for every beauty need</p>
        </motion.div>

        {/* Large 3-Column Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              onClick={() => navigate(`/Products?filter=${encodeURIComponent(category.filter)}`)}
              className="group relative h-96 overflow-hidden rounded-2xl cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500"
            >
              {/* Full Background Image */}
              <img
                src={category.image || placeholder}
                onError={(e) => (e.target.src = placeholder)}
                alt={category.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              
              {/* Content - Bottom */}
              <div className="absolute inset-x-0 bottom-0 p-8">
                <motion.div
                  initial={{ y: 20 }}
                  whileHover={{ y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-white font-serif text-3xl md:text-4xl mb-3">
                    {category.name}
                  </h3>
                  <p className="text-white/80 text-sm mb-6 line-clamp-2">
                    {category.description}
                  </p>
                  
                  {/* CTA Button */}
                  <button className="px-6 py-2.5 bg-white text-slate-900 rounded-full text-sm font-medium group-hover:bg-pink-600 group-hover:text-white transition-all">
                    Shop {category.name}
                  </button>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;