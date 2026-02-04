// import { motion, AnimatePresence } from 'framer-motion';
// import { useState, useEffect } from 'react';

// const HeroSection = ({ data }) => {
//   // Check if data exists, otherwise use fallback
//   const hero = data?.hero || {}; 
  
//   const [currentIndex, setCurrentIndex] = useState(0);

//   const heroImages = [
//     hero.heroImage, // Ab ye aapke static data se aayega
//     "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=1600&q=90",
//     "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=1600&q=90",
//   ];

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentIndex((prev) => (prev + 1) % heroImages.length);
//     }, 5000);
//     return () => clearInterval(timer);
//   }, [heroImages.length]);

//   return (
//     <section className="relative w-full bg-black overflow-hidden h-[600px] sm:h-[700px] lg:h-[85vh] xl:h-screen">
      
//       {/* Background Container */}
//       <div className="absolute inset-0 z-0 w-full h-full">
//         <AnimatePresence mode="wait">
//           <motion.div
//             key={currentIndex}
//             initial={{ opacity: 0, scale: 1.05 }}
//             animate={{ opacity: 1, scale: 1 }}
//             exit={{ opacity: 0 }}
//             transition={{ duration: 1.2 }}
//             className="absolute inset-0 w-full h-full"
//           >
//             <img
//               src={heroImages[currentIndex]}
//               alt={hero.altText || "Glam Beauty"}
//               className="w-full h-full object-cover object-center"
//             />
//             <div className="absolute inset-0 bg-black/40 lg:bg-transparent" />
//             <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent lg:bg-gradient-to-r lg:from-black/70 lg:via-transparent lg:to-transparent" />
//           </motion.div>
//         </AnimatePresence>
//       </div>

//       {/* Content Area */}
//       <div className="relative z-20 w-full max-w-7xl mx-auto px-6 md:px-12 h-full flex flex-col justify-center pt-10 md:pt-0">
//         <div className="max-w-4xl">
          
//           {/* Eyebrow */}
//           <motion.div
//             initial={{ opacity: 0, x: -15 }}
//             animate={{ opacity: 1, x: 0 }}
//             className="flex items-center gap-2 mb-3"
//           >
//             <span className="w-6 h-[1px] bg-pink-500" />
//             <p className="text-white text-[9px] md:text-[11px] uppercase tracking-[0.3em] font-bold">
//               {hero.eyebrow || "The Glam Street"}
//             </p>
//           </motion.div>

//           {/* Headline */}
//           <motion.h1
//             key={`title-${currentIndex}`}
//             initial={{ opacity: 0, y: 15 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="font-serif text-white leading-[1.1] md:leading-[1.15] mb-5"
//             style={{ 
//               fontSize: "clamp(2rem, 8vw, 5rem)", 
//               maxWidth: "850px"
//             }}
//           >
//             {/* Split headline logic (optional) or just display directly */}
//             {hero.headline || "Own Your Glam. Own Your Confidence."}
//           </motion.h1>

//           {/* Subheadline */}
//           <motion.p
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             className="text-white/70 font-light leading-relaxed mb-8 md:mb-10 max-w-[280px] xs:max-w-[350px] md:max-w-[420px]"
//             style={{ 
//               fontSize: "clamp(0.85rem, 4vw, 1.1rem)"
//             }}
//           >
//             {hero.subheadline}
//           </motion.p>

//           {/* Buttons */}
//           <div className="flex flex-col sm:flex-row gap-3.5 md:gap-4 w-full xs:w-auto">
//             {hero.cta?.primary && (
//               <a
//                 href={hero.cta.primary.href}
//                 className="w-full sm:w-auto px-10 py-4 bg-pink-600 text-white text-[10px] md:text-[11px] font-bold uppercase tracking-widest text-center rounded-full shadow-lg active:scale-95 transition-all"
//               >
//                 {hero.cta.primary.label}
//               </a>
//             )}
//             {hero.cta?.secondary && (
//               <a
//                 href={hero.cta.secondary.href}
//                 className="w-full sm:w-auto px-10 py-4 border border-white/30 text-white text-[10px] md:text-[11px] font-bold uppercase tracking-widest text-center rounded-full backdrop-blur-md active:scale-95 transition-all"
//               >
//                 {hero.cta.secondary.label}
//               </a>
//             )}
//           </div>
//         </div>
//       </div>

//       <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent z-10" />
//     </section>
//   );
// };

// export default HeroSection;\

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

const HeroSection = ({ data }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const heroImages = [
    data.heroImage,
    "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=1600&q=90",
    "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=1600&q=90",
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroImages.length]);

  return (
    <section className="relative w-full bg-black overflow-hidden h-[600px] sm:h-[700px] lg:h-[85vh] xl:h-screen">
      
      {/* Background Container - Smooth Crossfade without Black Pause */}
      <div className="absolute inset-0 z-0 w-full h-full">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full"
          >
            <img
              src={heroImages[currentIndex]}
              alt="Glam Beauty"
              // Object-center keeps the focus on the model for Z Flip/Moto screens
              className="w-full h-full object-cover object-center"
            />
            {/* Dark Overlays for better text visibility */}
            <div className="absolute inset-0 bg-black/40 lg:bg-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent lg:bg-gradient-to-r lg:from-black/70 lg:via-transparent lg:to-transparent" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Content Area - Fixed for all screens including Z Flip */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 md:px-12 h-full flex flex-col justify-center pt-10 md:pt-0">
        <div className="max-w-4xl">
          
          {/* Eyebrow - As per your original design */}
          <motion.div
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 mb-3"
          >
            <span className="w-6 h-[1px] bg-pink-500" />
            <p className="text-white text-[9px] md:text-[11px] uppercase tracking-[0.3em] font-bold">
              {data.eyebrow || "The Glam Street"}
            </p>
          </motion.div>

          {/* Headline - Responsive Font Sizes */}
          <motion.h1
            key={`title-${currentIndex}`}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif text-white leading-[1.1] md:leading-[1.15] mb-5"
            style={{ 
              fontSize: "clamp(2rem, 8vw, 5rem)", 
              maxWidth: "850px"
            }}
          >
            Own Your <span className="italic font-light text-pink-100">Glam.</span> <br />
            Own Your <span className="text-pink-500">Confidence.</span>
          </motion.h1>

          {/* Subheadline - Width limited to prevent edge cutting on Moto/Nord */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-white/70 font-light leading-relaxed mb-8 md:mb-10 max-w-[280px] xs:max-w-[350px] md:max-w-[420px]"
            style={{ 
              fontSize: "clamp(0.85rem, 4vw, 1.1rem)"
            }}
          >
            {data.subheadline}
          </motion.p>

          {/* Buttons - Same as your reference code (Mobile Stack & Desktop Side-by-side) */}
          <div className="flex flex-col sm:flex-row gap-3.5 md:gap-4 w-full xs:w-auto">
            <a
              href={data.cta.primary.href}
              className="w-full sm:w-auto px-10 py-4 bg-pink-600 text-white text-[10px] md:text-[11px] font-bold uppercase tracking-widest text-center rounded-full shadow-lg active:scale-95 transition-all"
            >
              {data.cta.primary.label}
            </a>
            <a
              href={data.cta.secondary.href}
              className="w-full sm:w-auto px-10 py-4 border border-white/30 text-white text-[10px] md:text-[11px] font-bold uppercase tracking-widest text-center rounded-full backdrop-blur-md active:scale-95 transition-all"
            >
              {data.cta.secondary.label}
            </a>
          </div>
        </div>
      </div>

      {/* Decorative Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent z-10" />
    </section>
  );
};

export default HeroSection;