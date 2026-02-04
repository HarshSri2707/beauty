// import React, { useRef } from 'react';
// import { motion, useInView } from 'framer-motion';
// import { useNavigate } from 'react-router-dom';

// const Ingredients = ({ ingredients, placeholder }) => {
//   const ref = useRef(null);
//   const isInView = useInView(ref, { once: true, margin: "-100px" });
//   const navigate = useNavigate();

//   // Show only first 6 items
//   const displayIngredients = ingredients.slice(0, 6);

//   return (
//     <section ref={ref} className="py-12 lg:py-16 bg-gradient-to-br from-pink-50 to-white relative overflow-hidden">
//       {/* Decorative Circle */}
//       <div className="absolute -right-20 top-10 w-64 h-64 bg-pink-200/20 rounded-full blur-3xl" />
      
//       <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10">
//         {/* Header with centered alignment */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={isInView ? { opacity: 1, y: 0 } : {}}
//           className="text-center mb-10"
//         >
//           <span className="inline-block px-4 py-1.5 bg-pink-100 text-pink-600 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
//             Pure Nature
//           </span>
//           <h2 className="text-3xl md:text-4xl font-serif text-slate-900 mb-2">
//             Power Ingredients
//           </h2>
//           <p className="text-slate-500 text-sm">Discover what makes our products effective</p>
//         </motion.div>

//         {/* Horizontal Scrolling Cards - Compact */}
//         <div className="flex overflow-x-auto gap-4 pb-4 no-scrollbar snap-x snap-mandatory">
//           {displayIngredients.map((ingredient, index) => (
//             <motion.div
//               key={index}
//               initial={{ opacity: 0, x: 50 }}
//               animate={isInView ? { opacity: 1, x: 0 } : {}}
//               transition={{ delay: index * 0.1 }}
//               onClick={() => navigate(`/Products?filter=${encodeURIComponent(ingredient.filter)}`)}
//               className="group flex-shrink-0 w-40 snap-center cursor-pointer"
//             >
//               {/* Circular Image */}
//               <div className="relative w-40 h-40 mb-3 overflow-hidden rounded-full border-4 border-white shadow-lg">
//                 <img
//                   src={ingredient.image || placeholder}
//                   onError={(e) => (e.target.src = placeholder)}
//                   alt={ingredient.name}
//                   className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
//                 />
//                 <div className="absolute inset-0 bg-pink-600/0 group-hover:bg-pink-600/20 transition-colors duration-300" />
//               </div>
              
//               {/* Name */}
//               <h3 className="text-center text-sm font-medium text-slate-800 group-hover:text-pink-600 transition-colors">
//                 {ingredient.name}
//               </h3>
//             </motion.div>
//           ))}
//         </div>
//       </div>

//       <style jsx>{`
//         .no-scrollbar::-webkit-scrollbar { display: none; }
//         .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
//       `}</style>
//     </section>
//   );
// };

// export default Ingredients;


import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const IngredientsSection = ({ ingredients, placeholder }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const navigate = useNavigate();

  // Sabhi 6 items
  const displayIngredients = ingredients.slice(0, 6);

  return (
    <section ref={ref} className="relative py-12 md:py-16 bg-white overflow-hidden">
      {/* Background Glow - Thoda aur subtle kiya hai */}
      <div className="absolute top-0 left-0 w-[30%] h-[30%] bg-pink-50/40 rounded-full blur-[80px] -translate-y-1/2 -translate-x-1/4 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10">
        
        {/* Header Section - Chota aur Crisp */}
        <div className="flex items-end justify-between mb-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="text-pink-500 font-bold tracking-[0.3em] uppercase text-[9px] block mb-2">
              Botanical Bio-Actives
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-slate-900 leading-tight">
              Powerful <span className="italic text-pink-600 font-normal">Ingredients</span>
            </h2>
          </motion.div>

          <button 
            onClick={() => navigate('/Products')}
            className="text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-pink-600 transition-colors border-b border-slate-100 pb-1"
          >
            See All
          </button>
        </div>

        {/* 6-Item Slider - Cards size reduced */}
        <div className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar gap-5 pb-8">
          {displayIngredients.map((ingredient, index) => (
            <IngredientCard 
              key={index} 
              item={ingredient} 
              index={index} 
              isInView={isInView} 
              navigate={navigate}
              placeholder={placeholder}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
};

const IngredientCard = ({ item, index, isInView, navigate, placeholder }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.05, duration: 0.6 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => navigate(`/Products?filter=${encodeURIComponent(item.filter)}`)}
      // Cards width reduced for a lighter feel (W-64 to W-[240px])
      className="group relative flex-shrink-0 w-[240px] md:w-[280px] aspect-[4/5] overflow-hidden rounded-[2rem] snap-center bg-slate-50 cursor-pointer border border-pink-50/50 shadow-sm transition-all duration-500"
    >
      <motion.img
        src={item.image || placeholder}
        alt={item.name}
        className="w-full h-full object-cover"
        animate={{ 
          scale: isHovered ? 1.1 : 1,
          filter: isHovered ? "brightness(0.7) blur(2px)" : "brightness(0.95) blur(0px)"
        }}
        transition={{ duration: 0.5 }}
      />

      {/* Overlay Content - Smaller fonts */}
      <div className="absolute inset-0 flex flex-col justify-end p-6">
        
        <motion.div
          animate={{ y: isHovered ? -10 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <h3 className="text-white font-serif text-xl md:text-2xl mb-1 drop-shadow-md leading-tight">
            {item.name}
          </h3>
          <span className="text-pink-200 text-[8px] font-bold uppercase tracking-[0.2em]">
            Active Formula 0{index + 1}
          </span>
        </motion.div>

        {/* Small Glass Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: isHovered ? 1 : 0, 
            y: isHovered ? 0 : 20 
          }}
          className="mt-3 bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl shadow-lg"
        >
          <p className="text-white text-[10px] leading-relaxed font-light mb-3 line-clamp-2">
            Concentrated extracts for deep skin nourishment and natural restoration.
          </p>
          <div className="flex items-center justify-between text-white">
            <span className="text-[9px] font-bold uppercase tracking-widest">Explore</span>
            <span className="text-sm">→</span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default IngredientsSection;