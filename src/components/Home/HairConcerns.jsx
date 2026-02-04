// import React, { useRef } from 'react';
// import { motion, useInView } from 'framer-motion';
// import { useNavigate } from 'react-router-dom';

// const HairConcerns = ({ concerns, placeholder }) => {
//   const ref = useRef(null);
//   const isInView = useInView(ref, { once: true, margin: "-100px" });
//   const navigate = useNavigate();

//   // Show only first 3 items
//   const displayConcerns = concerns.slice(0, 3);

//   return (
//     <section ref={ref} className="py-12 lg:py-16 px-4 lg:px-8 bg-slate-50">
//       <div className="max-w-6xl mx-auto">
//         {/* Header - Left aligned */}
//         <motion.div
//           initial={{ opacity: 0, x: -20 }}
//           animate={isInView ? { opacity: 1, x: 0 } : {}}
//           className="mb-8"
//         >
//           <h2 className="text-3xl md:text-4xl font-serif text-slate-900 mb-2">
//             Hair Essentials
//           </h2>
//           <p className="text-slate-500 text-sm">Solutions for healthier, stronger hair</p>
//         </motion.div>

//         {/* Unique Stacked List Design */}
//         <div className="space-y-4">
//           {displayConcerns.map((concern, index) => (
//             <motion.div
//               key={index}
//               initial={{ opacity: 0, y: 20 }}
//               animate={isInView ? { opacity: 1, y: 0 } : {}}
//               transition={{ delay: index * 0.15 }}
//               onClick={() => navigate(`/Products?filter=${encodeURIComponent(concern.filter)}`)}
//               className="group relative h-32 md:h-40 overflow-hidden rounded-xl bg-white shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer"
//             >
//               {/* Background Image - Right side */}
//               <div className="absolute right-0 top-0 w-2/5 h-full">
//                 <img
//                   src={concern.image || placeholder}
//                   onError={(e) => (e.target.src = placeholder)}
//                   alt={concern.name}
//                   className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-r from-white via-white/50 to-transparent" />
//               </div>

//               {/* Content - Left side */}
//               <div className="relative h-full flex items-center px-8">
//                 <div>
//                   {/* Number Badge */}
//                   <span className="inline-block w-8 h-8 rounded-full bg-pink-100 text-pink-600 text-sm font-bold flex items-center justify-center mb-3">
//                     {index + 1}
//                   </span>
                  
//                   <h3 className="text-2xl md:text-3xl font-serif text-slate-900 mb-2 group-hover:text-pink-600 transition-colors">
//                     {concern.name}
//                   </h3>
                  
//                   <div className="flex items-center text-sm text-slate-500 group-hover:text-pink-500 transition-colors">
//                     <span>Shop Now</span>
//                     <svg className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                     </svg>
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           ))}
//         </div>

//         {/* View All Button */}
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={isInView ? { opacity: 1 } : {}}
//           className="mt-8 text-center"
//         >
//           <button
//             onClick={() => navigate('/Products')}
//             className="px-8 py-3 bg-slate-900 text-white rounded-full text-sm font-medium hover:bg-pink-600 transition-colors"
//           >
//             Explore All Hair Care
//           </button>
//         </motion.div>
//       </div>
//     </section>
//   );
// };

// export default HairConcerns;


import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const HairConcerns = ({ concerns = [], placeholder }) => {
  const containerRef = useRef(null);
  const navigate = useNavigate();
  
  const displayConcerns = concerns?.slice(0, 4) || [];

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Zoom & Tilt Effects (same as RitualSection)
  const imageScale = useTransform(scrollYProgress, [0, 0.4, 1], [1.4, 1, 0.95]);
  const imageRotate = useTransform(scrollYProgress, [0, 0.5, 1], [5, 0, -3]);
  const scale = useSpring(imageScale, { stiffness: 80, damping: 20 });
  const rotate = useSpring(imageRotate, { stiffness: 80, damping: 20 });

  // Active Index Calculation
  const activeIndex = useTransform(scrollYProgress, 
    [0, 0.25, 0.5, 0.75], 
    [0, 1, 2, 3],
    { clamp: true }
  );

  const [currentIdx, setCurrentIdx] = useState(0);
  
  useEffect(() => {
    return activeIndex.onChange((latest) => {
      const rounded = Math.round(latest);
      if (rounded !== currentIdx && rounded < displayConcerns.length) {
        setCurrentIdx(rounded);
      }
    });
  }, [activeIndex, currentIdx, displayConcerns.length]);

  if (displayConcerns.length === 0) return null;

  return (
    <section 
      ref={containerRef} 
      className="relative bg-white"
      style={{ height: `${displayConcerns.length * 100}vh` }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-full">
          
          {/* Section Header - Compact & Above Image on Mobile */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="pt-6 pb-4 lg:hidden text-center"
          >
            <span className="text-pink-500 font-bold tracking-[0.3em] text-[9px] uppercase block mb-2">
              Specialized Care
            </span>
            <h2 className="font-serif text-2xl text-slate-900 italic">
              Hair Concerns
            </h2>
          </motion.div>

          <div className="flex flex-col lg:flex-row gap-6 lg:gap-20 items-center lg:items-start h-full lg:pt-0">
            
            {/* LEFT: STICKY IMAGE */}
            <div className="w-full lg:w-[45%] flex items-center justify-center pt-4 pb-6 lg:pt-0 lg:pb-0 lg:sticky lg:top-24 h-auto lg:h-screen">
              <div className="relative w-full max-w-[280px] md:max-w-[380px] lg:max-w-[480px] aspect-[3/4] lg:aspect-[4/5] overflow-hidden rounded-[1.5rem] md:rounded-[2.5rem] shadow-[0_15px_40px_rgba(0,0,0,0.12)] border-[4px] md:border-[8px] lg:border-[12px] border-white">
                <motion.div 
                  style={{ scale, rotate }}
                  className="w-full h-full"
                >
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={currentIdx}
                      src={displayConcerns[currentIdx]?.image || placeholder}
                      onError={(e) => (e.target.src = placeholder)}
                      initial={{ opacity: 0, scale: 1.1 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.5 }}
                      className="w-full h-full object-cover"
                      alt={displayConcerns[currentIdx]?.name || "Hair Concern"}
                    />
                  </AnimatePresence>
                </motion.div>
                
                {/* Soft Inner Glow */}
                <div className="absolute inset-0 ring-1 ring-black/5 rounded-[1.5rem] md:rounded-[2.5rem] pointer-events-none" />
              </div>
            </div>

            {/* RIGHT: SCROLLABLE CONTENT */}
            <div className="w-full lg:w-[55%] flex flex-col justify-center pb-8 lg:pb-0 lg:pt-24">
              {/* Section Header - Desktop Only */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="hidden lg:block mb-24 text-left"
              >
                <span className="text-pink-500 font-bold tracking-[0.4em] text-xs uppercase block mb-4">
                  Specialized Hair Care
                </span>
                <h2 className="font-serif text-6xl xl:text-7xl text-slate-900 leading-tight italic mb-6">
                  Hair Concerns
                </h2>
                <p className="text-slate-400 text-lg font-light italic">
                  Solutions tailored to your unique hair needs
                </p>
              </motion.div>

              {/* Active Content Card */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIdx}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                  className="max-w-xl mx-auto lg:mx-0 px-4 lg:px-0"
                >
                  {/* Step Indicator - Compact on mobile */}
                  <div className="flex items-center justify-center lg:justify-start gap-3 mb-4">
                    <div className="flex-shrink-0 w-10 h-10 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-full bg-slate-900 text-white flex items-center justify-center font-serif text-lg md:text-xl lg:text-2xl shadow-lg">
                      0{currentIdx + 1}
                    </div>
                    <div>
                      <span className="text-pink-600 font-bold text-[9px] md:text-[10px] lg:text-xs tracking-[0.25em] uppercase block">
                        Solution #{currentIdx + 1}
                      </span>
                    </div>
                  </div>
                  
                  {/* Concern Name - Smaller on mobile */}
                  <h3 className="text-2xl md:text-3xl lg:text-5xl font-serif text-slate-900 leading-tight mb-4 lg:mb-6 text-center lg:text-left">
                    {displayConcerns[currentIdx]?.name}
                  </h3>
                  
                  {/* Description - Compact */}
                  <p className="text-slate-500 text-xs md:text-sm lg:text-lg font-light leading-relaxed mb-6 lg:mb-8 text-center lg:text-left">
                    Crafting a personalized path to healthier hair by addressing {displayConcerns[currentIdx]?.name.toLowerCase()} with botanical science.
                  </p>

                  {/* CTA Button - Smaller on mobile */}
                  <div className="flex justify-center lg:justify-start">
                    <button
                      onClick={() => navigate(`/Products?filter=${encodeURIComponent(displayConcerns[currentIdx].filter)}`)}
                      className="inline-flex items-center gap-2 md:gap-3 px-6 md:px-8 lg:px-10 py-2.5 md:py-3.5 lg:py-4 bg-slate-900 text-white rounded-full text-[9px] md:text-[10px] lg:text-xs font-bold tracking-[0.2em] uppercase hover:bg-pink-600 transition-all duration-300 shadow-lg"
                    >
                      Shop Solutions
                      <svg className="w-3 h-3 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Progress Indicator - Compact on mobile */}
              <div className="mt-6 lg:mt-0 lg:absolute lg:right-0 lg:top-1/2 lg:-translate-y-1/2">
                <div className="flex lg:flex-col gap-2 lg:gap-3 justify-center lg:justify-start">
                  {displayConcerns.map((concern, i) => (
                    <motion.div 
                      key={i}
                      animate={{ 
                        width: currentIdx === i ? (window.innerWidth < 1024 ? 32 : 12) : 10,
                        height: currentIdx === i ? (window.innerWidth < 1024 ? 10 : 40) : 10,
                        backgroundColor: currentIdx === i ? "#ec4899" : "#e2e8f0" 
                      }}
                      className="rounded-full transition-all duration-300" 
                      title={concern.name}
                    />
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default HairConcerns;