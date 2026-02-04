// // import React, { useRef } from 'react';
// // import { motion, useInView } from 'framer-motion';
// // import Short from '../../Partials/Components/Short';

// // const VideoShowcase = () => {
// //   const ref = useRef(null);
// //   const isInView = useInView(ref, { once: true });

// //   return (
// //     <motion.section
// //       ref={ref}
// //       initial={{ opacity: 0 }}
// //       animate={isInView ? { opacity: 1 } : {}}
// //       className="py-12 px-4 bg-slate-900"
// //     >
// //       <div className="max-w-5xl mx-auto text-center">
// //         <h2 className="text-3xl md:text-4xl font-serif text-white mb-2">
// //           Watch & Shop
// //         </h2>
// //         <p className="text-white/60 text-sm mb-8">See our products in action</p>
// //         <Short />
// //       </div>
// //     </motion.section>
// //   );
// // };

// // export default VideoShowcase;


// // import React, { useRef } from 'react';
// // import { motion, useInView } from 'framer-motion';
// // import Short from '../../Partials/Components/Short';

// // const VideoShowcase = () => {
// //   const ref = useRef(null);
// //   const isInView = useInView(ref, { once: true, margin: "-100px" });

// //   return (
// //     <section 
// //       ref={ref} 
// //       className="py-16 md:py-24 px-4 bg-[#F9F6F0] relative overflow-hidden" // Richer Warm Background
// //     >
// //       {/* Soft Glow Effects for Depth */}
// //       <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-pink-200/30 rounded-full blur-[120px] -translate-y-1/2" />
// //       <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-100/20 rounded-full blur-[120px] translate-y-1/2" />

// //       <div className="max-w-7xl mx-auto relative z-10">
        
// //         {/* Header */}
// //         <div className="text-center mb-10 md:mb-14">
// //           <motion.div
// //             initial={{ opacity: 0, y: 20 }}
// //             animate={isInView ? { opacity: 1, y: 0 } : {}}
// //             transition={{ duration: 0.7 }}
// //           >
// //             <span className="text-pink-600 font-bold tracking-[0.4em] uppercase text-[10px] block mb-4">
// //               Beauty in Motion
// //             </span>
// //             <h2 className="text-4xl md:text-6xl font-serif text-slate-900 mb-6 italic">
// //               Watch & <span className="not-italic font-normal text-pink-500 underline decoration-pink-200 underline-offset-[12px]">Shop</span>
// //             </h2>
// //             <p className="text-slate-600 text-sm md:text-base font-light max-w-lg mx-auto leading-relaxed">
// //               Tap to discover our community's favorite rituals and real results.
// //             </p>
// //           </motion.div>
// //         </div>

// //         {/* Video Container */}
// //         <motion.div 
// //           initial={{ opacity: 0, y: 30 }}
// //           animate={isInView ? { opacity: 1, y: 0 } : {}}
// //           className="relative"
// //         >
// //           {/* Isme humne logic inject kiya hai */}
// //           <Short />
// //         </motion.div>

// //         <div className="mt-16 flex justify-center">
// //            <div className="px-6 py-2 bg-white/50 backdrop-blur-md border border-white/20 rounded-full text-[10px] font-bold uppercase tracking-widest text-slate-500 shadow-sm">
// //              Hover to Play • Scroll to Explore
// //            </div>
// //         </div>
// //       </div>
// //     </section>
// //   );
// // };

// // export default VideoShowcase;

// import React, { useRef } from 'react';
// import { motion, useInView } from 'framer-motion';
// import Short from '../../Partials/Components/Short';

// const VideoShowcase = () => {
//   const ref = useRef(null);
//   const isInView = useInView(ref, { once: true, margin: "-100px" });

//   return (
//     <section 
//       ref={ref} 
//       className="py-12 md:py-16 bg-white overflow-hidden" // White bg for clean look
//     >
//       <div className="max-w-7xl mx-auto px-6">
        
//         {/* Compact Layout: Text Left, Slider Right (Desktop) */}
//         <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
          
//           {/* Section Info - Small & Sharp */}
//           <motion.div
//             initial={{ opacity: 0, x: -30 }}
//             animate={isInView ? { opacity: 1, x: 0 } : {}}
//             className="w-full lg:w-1/3 text-center lg:text-left"
//           >
//             <div className="inline-flex items-center gap-2 px-3 py-1 bg-pink-50 rounded-full mb-6">
//               <span className="relative flex h-2 w-2">
//                 <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
//                 <span className="relative inline-flex rounded-full h-2 w-2 bg-pink-500"></span>
//               </span>
//               <span className="text-[10px] font-bold uppercase tracking-widest text-pink-600">Live Showroom</span>
//             </div>

//             <h2 className="text-3xl md:text-5xl font-serif text-slate-900 mb-4 leading-tight">
//               Real Results, <br />
//               <span className="italic text-pink-500">In Motion.</span>
//             </h2>
            
//             <p className="text-slate-500 text-xs md:text-sm font-light max-w-sm mb-8 leading-relaxed">
//               Experience our rituals through the eyes of our community. Tap a video to shop the routine.
//             </p>

//             <button className="hidden lg:flex items-center gap-4 group text-[11px] font-black uppercase tracking-[0.2em] text-slate-800">
//               View All Reels
//               <div className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center group-hover:bg-slate-900 group-hover:text-white transition-all">
//                 <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
//               </div>
//             </button>
//           </motion.div>

//           {/* Videos - Taking the spotlight */}
//           <motion.div 
//             initial={{ opacity: 0, x: 50 }}
//             animate={isInView ? { opacity: 1, x: 0 } : {}}
//             className="w-full lg:w-2/3"
//           >
//             <div className="relative group">
//               {/* Decorative Frame behind videos */}
//               <div className="absolute inset-0 bg-pink-50 rounded-[3rem] translate-x-4 translate-y-4 -z-10 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-700" />
              
//               <div className="bg-white p-2 rounded-[3.5rem] shadow-2xl border border-slate-50">
//                 <Short />
//               </div>
//             </div>
//           </motion.div>

//         </div>

//         {/* Mobile View CTA */}
//         <div className="mt-10 lg:hidden flex justify-center">
//           <button className="px-8 py-3 bg-slate-900 text-white rounded-full text-[10px] font-bold uppercase tracking-widest shadow-lg">
//             Shop the Look
//           </button>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default VideoShowcase;


import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Shorts from '../../Partials/Components/Short'; // Path sahi check karlein

const VideoShowcase = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section ref={ref} className="py-12 md:py-20 bg-[#fdfdfd] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-10">
        
        {/* Header - Left Aligned but clean */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            className="max-w-xl"
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="w-10 h-[1px] bg-pink-500" />
              <span className="text-pink-500 font-bold tracking-[0.3em] uppercase text-[10px]">Community Reels</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-serif text-slate-900 leading-tight">
              Watch. <span className="italic text-slate-400 font-normal">Love.</span> Shop.
            </h2>
          </motion.div>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            className="text-slate-500 text-sm max-w-[280px] font-light leading-relaxed mb-1"
          >
            Real people. Real results. Swipe through our community's favorite beauty rituals.
          </motion.p>
        </div>

        {/* Cinematic Video Strip */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="relative rounded-[3rem] overflow-hidden"
        >
          {/* Subtle Background Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-pink-50/50 blur-[100px] -z-10" />
          
          <Shorts />
        </motion.div>
      </div>
    </section>
  );
};

export default VideoShowcase;