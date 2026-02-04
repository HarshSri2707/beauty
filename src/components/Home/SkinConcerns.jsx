// import React, { useRef } from 'react';
// import { motion, useInView } from 'framer-motion';
// import { useNavigate } from 'react-router-dom';

// const SkinConcerns = ({ concerns, placeholder }) => {
//   const ref = useRef(null);
//   const isInView = useInView(ref, { once: true, margin: "-100px" });
//   const navigate = useNavigate();

//   // Show only first 4 items
//   const displayConcerns = concerns.slice(0, 4);

//   return (
//     <section ref={ref} className="py-12 lg:py-16 px-4 lg:px-8 bg-white">
//       <div className="max-w-7xl mx-auto">
//         {/* Minimal Header */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={isInView ? { opacity: 1, y: 0 } : {}}
//           className="flex items-center justify-between mb-8"
//         >
//           <div>
//             <h2 className="text-3xl md:text-4xl font-serif text-slate-900">
//               Skin Solutions
//             </h2>
//             <p className="text-slate-500 text-sm mt-2">Target your specific needs</p>
//           </div>
//           <button 
//             onClick={() => navigate('/Products')}
//             className="hidden md:block text-sm text-pink-600 hover:text-pink-700 font-medium border-b-2 border-pink-600 pb-1"
//           >
//             View All →
//           </button>
//         </motion.div>

//         {/* Unique Tile Grid - 2x2 on desktop, scroll on mobile */}
//         <div className="grid md:grid-cols-2 gap-4">
//           {displayConcerns.map((concern, index) => (
//             <motion.div
//               key={index}
//               initial={{ opacity: 0, scale: 0.95 }}
//               animate={isInView ? { opacity: 1, scale: 1 } : {}}
//               transition={{ delay: index * 0.1, duration: 0.5 }}
//               onClick={() => navigate(`/Products?filter=${encodeURIComponent(concern.filter)}`)}
//               className="group relative h-48 md:h-56 overflow-hidden rounded-2xl cursor-pointer"
//             >
//               <img
//                 src={concern.image || placeholder}
//                 onError={(e) => (e.target.src = placeholder)}
//                 alt={concern.name}
//                 className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
//               />
              
//               {/* Gradient Overlay */}
//               <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/30 to-transparent" />
              
//               {/* Content */}
//               <div className="absolute inset-0 p-6 flex flex-col justify-end">
//                 <h3 className="text-white font-serif text-2xl md:text-3xl mb-2">
//                   {concern.name}
//                 </h3>
//                 <div className="flex items-center text-pink-300 text-sm group-hover:translate-x-2 transition-transform">
//                   <span>Explore</span>
//                   <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
//                   </svg>
//                 </div>
//               </div>
//             </motion.div>
//           ))}
//         </div>

//         {/* Mobile View All */}
//         <motion.button
//           initial={{ opacity: 0 }}
//           animate={isInView ? { opacity: 1 } : {}}
//           onClick={() => navigate('/Products')}
//           className="md:hidden w-full mt-6 py-3 border border-slate-200 rounded-full text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
//         >
//           View All Concerns
//         </motion.button>
//       </div>
//     </section>
//   );
// };

// export default SkinConcerns;

// import React, { useRef } from 'react';
// import { motion, useInView } from 'framer-motion';
// import { useNavigate } from 'react-router-dom';

// const SkinConcerns = ({ concerns, placeholder }) => {
//   const ref = useRef(null);
//   const isInView = useInView(ref, { once: true, margin: "-50px" });
//   const navigate = useNavigate();

//   // Show only first 4 items
//   const displayConcerns = concerns.slice(0, 4);

//   return (
//     <section ref={ref} className="py-8 md:py-10 px-4 lg:px-8 bg-white overflow-hidden">
//       <div className="max-w-7xl mx-auto">
        
//         {/* Compact Header */}
//         <div className="flex items-end justify-between mb-6">
//           <motion.div
//             initial={{ opacity: 0, x: -20 }}
//             animate={isInView ? { opacity: 1, x: 0 } : {}}
//           >
//             <span className="text-pink-500 font-bold tracking-[0.2em] uppercase text-[9px] block mb-1">Expert Solutions</span>
//             <h2 className="text-2xl md:text-3xl font-serif text-slate-900 leading-none">
//               Shop by <span className="italic">Concern</span>
//             </h2>
//           </motion.div>
          
//           <button 
//             onClick={() => navigate('/Products')}
//             className="text-[11px] font-bold uppercase tracking-widest text-slate-400 hover:text-pink-600 transition-colors border-b border-slate-200 hover:border-pink-600 pb-1"
//           >
//             All Solutions
//           </button>
//         </div>

//         {/* Bento Grid Layout */}
//         <div className="grid grid-cols-2 md:grid-cols-4 md:grid-rows-2 gap-3 h-[400px] md:h-[450px]">
//           {displayConcerns.map((concern, index) => (
//             <motion.div
//               key={index}
//               initial={{ opacity: 0, y: 20 }}
//               animate={isInView ? { opacity: 1, y: 0 } : {}}
//               transition={{ delay: index * 0.1 }}
//               onClick={() => navigate(`/Products?filter=${encodeURIComponent(concern.filter)}`)}
//               className={`group relative overflow-hidden rounded-3xl cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500
//                 ${index === 0 ? 'col-span-2 row-span-1 md:row-span-2' : 'col-span-1 row-span-1'}`}
//             >
//               {/* Image with Dark Overlay */}
//               <img
//                 src={concern.image || placeholder}
//                 onError={(e) => (e.target.src = placeholder)}
//                 alt={concern.name}
//                 className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
//               />
//               <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:from-pink-900/80 transition-colors duration-500" />
              
//               {/* Content Positioned at Bottom */}
//               <div className="absolute inset-0 p-5 md:p-7 flex flex-col justify-end">
//                 <p className="text-pink-400 text-[9px] font-bold uppercase tracking-[0.2em] mb-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                   Targeted Care
//                 </p>
//                 <h3 className={`text-white font-serif leading-tight transition-all duration-300 group-hover:mb-2
//                   ${index === 0 ? 'text-2xl md:text-4xl' : 'text-lg md:text-xl'}`}>
//                   {concern.name}
//                 </h3>
                
//                 {/* Minimalist Arrow - Appears on Hover */}
//                 <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-500">
//                   <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
//                   </svg>
//                 </div>
//               </div>

//               {/* Decorative Border Glow */}
//               <div className="absolute inset-0 border border-white/10 group-hover:border-pink-500/30 rounded-3xl transition-colors pointer-events-none" />
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default SkinConcerns;

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const SkinConcerns = ({ concerns, placeholder }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const navigate = useNavigate();

  const displayConcerns = concerns?.slice(0, 4) || [];

  return (
    <section ref={ref} className="py-10 md:py-14 px-4 lg:px-10 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Sleek Header */}
        <div className="flex items-end justify-between mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
          >
            <span className="text-pink-500 font-bold tracking-[0.25em] uppercase text-[9px] block mb-1">Targeted Solutions</span>
            <h2 className="text-2xl md:text-4xl font-serif text-slate-900">
              Shop by <span className="italic font-normal">Concern</span>
            </h2>
          </motion.div>
          
          <button 
            onClick={() => navigate('/Products')}
            className="text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-pink-600 transition-all border-b border-slate-100 hover:border-pink-500 pb-1"
          >
            Explore All
          </button>
        </div>

        {/* --- REFINED ADAPTIVE GRID --- */}
        {/* Laptop Height fixed to 480px for a more compact look */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2 gap-4 h-auto lg:h-[480px]">
          {displayConcerns.map((concern, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              onClick={() => navigate(`/Products?filter=${encodeURIComponent(concern.filter)}`)}
              className={`group relative overflow-hidden rounded-[1.8rem] cursor-pointer shadow-sm hover:shadow-xl transition-all duration-700
                ${index === 0 
                  ? 'lg:col-span-2 lg:row-span-2 h-[220px] sm:h-[300px] lg:h-full' 
                  : 'h-[160px] sm:h-[220px] lg:h-full'}`}
            >
              {/* Image Layer */}
              <div className="absolute inset-0">
                <img
                  src={concern.image || placeholder}
                  onError={(e) => (e.target.src = placeholder)}
                  alt={concern.name}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/5 transition-colors duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
              </div>
              
              {/* Content Layer with tighter padding */}
              <div className="absolute inset-0 p-5 md:p-6 flex flex-col justify-end">
                <p className="text-pink-400 text-[9px] font-bold uppercase tracking-[0.2em] mb-1 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  Solutions
                </p>
                
                <h3 className={`text-white font-serif leading-tight mb-1
                  ${index === 0 ? 'text-xl md:text-3xl' : 'text-lg md:text-xl'}`}>
                  {concern.name}
                </h3>

                {/* Arrow Link */}
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 translate-x-[-10px] group-hover:translate-x-0 transition-all duration-500 delay-75">
                  <span className="text-white/70 text-[9px] font-bold uppercase tracking-widest">Shop Now</span>
                  <svg className="w-3.5 h-3.5 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkinConcerns;