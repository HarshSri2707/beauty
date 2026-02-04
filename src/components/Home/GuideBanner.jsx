// import React, { useState, useRef } from 'react';
// import { motion, useInView } from 'framer-motion';

// const GuideBanner = ({ image, placeholder, onClick }) => {
//   const ref = useRef(null);
//   const isInView = useInView(ref, { once: true });
//   const [isHovered, setIsHovered] = useState(false);

//   return (
//     <motion.section
//       ref={ref}
//       initial={{ opacity: 0, y: 30 }}
//       animate={isInView ? { opacity: 1, y: 0 } : {}}
//       className="py-10 lg:py-16 lg:mx-5 px-4"
//     >
//       <motion.div
//         onMouseEnter={() => setIsHovered(true)}
//         onMouseLeave={() => setIsHovered(false)}
//         onClick={onClick}
//         className="relative overflow-hidden rounded-3xl shadow-xl cursor-pointer max-w-7xl mx-auto"
//       >
//         <motion.img
//           src={image || placeholder}
//           onError={(e) => (e.target.src = placeholder)}
//           alt="Beauty Guide"
//           className="w-full h-40 md:h-60 object-cover"
//           animate={{ scale: isHovered ? 1.05 : 1 }}
//           transition={{ duration: 0.6 }}
//         />
//         <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
//       </motion.div>
//     </motion.section>
//   );
// };

// export default GuideBanner;


import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';

const GuideBanner = ({ data }) => { // Make sure 'data' is passed correctly from Home.jsx
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const navigate = useNavigate();

  // FIX: Added fallback to empty array so slice doesn't fail
  const featuredBlogs = (data || []).slice(0, 6);

  if (!featuredBlogs.length) return null; // Agar data nahi hai to kuch mat dikhao

  return (
    <section ref={ref} className="relative py-16 lg:py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8 }}>
            <span className="text-pink-500 font-bold uppercase tracking-[0.3em] text-[10px] mb-3 block">Beauty Secrets</span>
            <h2 className="font-serif text-4xl md:text-5xl text-slate-900 leading-tight">
              The <span className="italic font-normal underline decoration-pink-100 underline-offset-8">Glow Edit</span>
            </h2>
          </motion.div>
        </div>

        <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-12" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {featuredBlogs.map((article, index) => (
            <div key={article.id} className="flex-shrink-0 w-[300px] md:w-[380px] snap-center">
              <BlogCard article={article} index={index} isInView={isInView} />
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-4">
          <button onClick={() => navigate('/Blog')} className="group flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-900 border-b-2 border-slate-100 pb-2 hover:border-pink-500 transition-all">
            Explore All Stories <span className="group-hover:translate-x-1 transition-transform">→</span>
          </button>
        </div>
      </div>
    </section>
  );
};

const BlogCard = ({ article, index, isInView }) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className="group"
    >
      <Link to={`/Blog/${article.id}`} className="block">
        <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] bg-slate-50 mb-6 border border-slate-100 shadow-sm">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
            onError={(e) => { e.target.src = 'https://via.placeholder.com/400x500?text=Beauty+Story'; }} // FIX: 404 Error fix
          />
          <div className="absolute top-5 left-5">
            <span className="px-4 py-1.5 bg-white/90 backdrop-blur-md text-slate-900 text-[9px] font-black uppercase tracking-widest rounded-full shadow-sm">
              {article.category}
            </span>
          </div>
        </div>

        <div className="px-2">
          <div className="flex items-center gap-3 text-[9px] text-pink-500 font-bold uppercase tracking-[0.2em] mb-3">
            <span>{article.concern}</span>
            <span className="text-slate-400 font-medium italic lowercase">by {article.Author?.split(' ')[0] || 'Editor'}</span>
          </div>
          <h3 className="font-serif text-2xl md:text-3xl text-slate-800 leading-snug group-hover:text-pink-600 transition-colors duration-300 mb-3 line-clamp-2">
            {article.title}
          </h3>
        </div>
      </Link>
    </motion.article>
  );
};

export default GuideBanner;