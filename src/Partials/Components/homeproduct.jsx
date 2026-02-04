// import React, { useState, useRef, useEffect, useMemo } from 'react';
// import {FeaturedData} from '../../Data/Featuredproduct';
// import {  FaFilter} from 'react-icons/fa';
// import { useNavigate } from 'react-router-dom';
// import Placeholder from '../../assets/placeholder.webp'
// const HomeProduct = () => {
//   const [selectedCategory, setSelectedCategory] = useState('all');
//   const [sortOption, setSortOption] = useState('default');
//   const [priceRange, setPriceRange] = useState('all'); 
//   const [showPriceDropdown, setShowPriceDropdown] = useState(false);
//   const [showSortDropdown, setShowSortDropdown] = useState(false);
// const navigate =useNavigate();
//   const priceDropdownRef = useRef(null);
//   const sortDropdownRef = useRef(null);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (priceDropdownRef.current && !priceDropdownRef.current.contains(event.target)) {
//         setShowPriceDropdown(false);
//       }
//       if (sortDropdownRef.current && !sortDropdownRef.current.contains(event.target)) {
//         setShowSortDropdown(false);
//       }
//     };
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   const filteredProducts = useMemo(() => {
//     return FeaturedData
//       .filter(product => selectedCategory === 'all' || product.category === selectedCategory)
//       .filter(product => {
//         if (priceRange === 'all') return true;
//         if (priceRange === 'under-200') return product.price < 200;
//         if (priceRange === '200-500') return product.price >= 200 && product.price <= 500;
//         if (priceRange === '500-1000') return product.price > 500 && product.price <= 1000;
//         if (priceRange === 'above-1000') return product.price > 1000;
//         return true;
//       })
//       .sort((a, b) => {
//         if (sortOption === 'price-low-high') return a.price - b.price;
//         if (sortOption === 'price-high-low') return b.price - a.price;
//         if (sortOption === 'rating-high-low') return b.rating - a.rating;
//         if (sortOption === 'bestseller') {
//           if (b.tags === 'bestseller' && a.tags !== 'bestseller') return -1;
//           if (a.tags === 'bestseller' && b.tags !== 'bestseller') return 1;
//           return 0;
//         }
//         if (sortOption === 'newest') {
//           if (b.tags === 'new' && a.tags !== ' ‘new') return -1;
//           if (a.tags === 'new' && b.tags !== 'new') return 1;
//           return 0;
//         }
//         return 0;
//       });
//   }, [selectedCategory, priceRange, sortOption]);
// return (
//     <div className="p-4 min-h-[100px] my-6 ">
//       <div className="text-center mb-6">
//         <h2 className="text-2xl font-semibold text-pink-700">Featured Products</h2>
//         <p className="text-gray-700 text-md font-medium font-playfair">
//           Discover our handpicked selection of top-rated beauty products from premium brands.
//         </p>
//       </div>

//       <div className="flex flex-wrap justify-center lg:justify-between mb-6 gap-4">
//         <div className="flex space-x-2 justify-center mx-auto">
//           {['all', 'skincare', 'haircare', 'makeup'].map(cat => (
//             <button
//               key={cat}
//               onClick={() => setSelectedCategory(cat)}
//               className={`px-4 py-2 rounded-md shadow-md 
//                 ${selectedCategory === cat ? 'bg-pink-600 text-white' : 'bg-gray-100 text-gray-800'}`}
//               aria-label={`Filter by ${cat}`}
//             >
//               {cat.charAt(0).toUpperCase() + cat.slice(1)}
//             </button>
//           ))}
//         </div>

//       </div>

//       <div className="flex overflow-x-auto space-x-4 hide-scrollbar">
//         {filteredProducts.length > 0 ? (
//           filteredProducts.map(product => (
//             <div key={product.id} className="flex-shrink-0 w-64 bg-white rounded-lg shadow-md p-4 m-2 relative flex flex-col min-h-[350px]"
//              onClick={() => navigate(`/Product/${product.id}`)} 
//             >
//   {product.tags && (
//     <span className="absolute top-2 right-2 bg-pink-100 text-pink-500 text-xs font-semibold px-2 py-1 rounded">
//       {product.tags}
//     </span>
//   )}
//   <img
//     src={product.images[0] || Placeholder}
//     onError={(e) => (e.target.src = Placeholder)}
//     alt={product.name}
//     className="w-full h-40 object-contain rounded-md"
//   />
//   <div className="mt-2 flex flex-col flex-grow">
//     <div className="flex justify-between items-start">
//       <p className="text-sm text-gray-500 capitalize">
//         {product.category} | {product.subcategory}
//       </p>
//     </div>
//     <h3 className="text-lg font-semibold mt-1">{product.name}</h3>
//     <p className="text-pink-500">{'★'.repeat(product.rating)}{'☆'.repeat(5 - product.rating)}</p>
//     <div className="flex justify-between items-center mt-auto">
//       <p className="text-pink-600">₹{product.price}</p>
//       <button
//         onClick={() => navigate(`/Product/${product.id}`)}
//         className="bg-pink-600 hover:bg-pink-800 text-sm font-medium text-white p-2 rounded-md"
//       >
//         View
//       </button>
//     </div>
//   </div>
// </div>
//           ))
//         ) : (
//           <p className="text-center text-gray-500 w-full py-10">No products found for the selected filters.</p>
//         )}
//       </div>
//     </div>
// );
// };

// export default HomeProduct;

import React, { useState, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useSpring } from 'framer-motion';
import { FeaturedData } from '../../Data/Featuredproduct';
import Placeholder from '../../assets/placeholder.webp';

const HomeProduct = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const navigate = useNavigate();
  
  // Ref for the scroll container to track progress
  const scrollRef = useRef(null);
  
  const displayProducts = useMemo(() => {
    return FeaturedData.filter(
      product => selectedCategory === 'all' || product.category.toLowerCase() === selectedCategory.toLowerCase()
    ).slice(0, 10); 
  }, [selectedCategory]);

  return (
    // Background changed to a very soft pink gradient
    <div className="py-20 bg-gradient-to-b from-white via-pink-50/40 to-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="max-w-xl">
            <motion.span 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-pink-500 font-bold tracking-[0.4em] uppercase text-[9px] block mb-2"
            >
              The Beauty Edit
            </motion.span>
            <h2 className="text-4xl md:text-5xl font-serif text-gray-900 leading-tight">
              Our <span className="italic text-pink-600/80">Bestsellers</span>
            </h2>
          </div>
          
          {/* Minimalist Filter Bar */}
          <div className="flex gap-2 bg-white/60 backdrop-blur-md p-1.5 rounded-full border border-pink-100 overflow-x-auto hide-scrollbar shadow-sm">
            {['all', 'skincare', 'haircare', 'makeup'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-7 py-2.5 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-widest transition-all duration-300 whitespace-nowrap
                  ${selectedCategory === cat ? 'bg-pink-600 text-white shadow-md scale-105' : 'text-gray-500 hover:text-pink-500'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Cinematic Slider Container */}
        <div className="relative">
          <div 
            ref={scrollRef}
            className="flex overflow-x-auto gap-8 pb-12 hide-scrollbar scroll-smooth snap-x snap-mandatory"
          >
            {displayProducts.map((product) => (
              <motion.div
                key={product.id}
                whileHover={{ y: -12 }}
                className="snap-start flex-shrink-0 w-[270px] md:w-[310px] group cursor-pointer"
                onClick={() => navigate(`/Product/${product.id}`)}
              >
                {/* Product Image Box - Soft Pink Glow on Hover */}
                <div className="relative aspect-[4/5] bg-white rounded-[3rem] overflow-hidden flex items-center justify-center p-8 transition-all duration-500 border border-pink-50 group-hover:shadow-[0_20px_50px_rgba(219,39,119,0.1)] group-hover:border-pink-100">
                  
                  {product.tags && (
                    <div className="absolute top-6 left-6 z-10">
                      <span className="bg-pink-50 text-pink-600 text-[8px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest border border-pink-100">
                        {product.tags}
                      </span>
                    </div>
                  )}
                  
                  <img
                    src={product.images[0] || Placeholder}
                    alt={product.name}
                    className="w-full h-full object-contain mix-blend-multiply transition-transform duration-1000 group-hover:scale-110"
                  />

                  {/* Glassmorphism Quick View */}
                  <div className="absolute inset-x-0 bottom-6 px-8 translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <div className="w-full py-4 bg-white/80 backdrop-blur-md text-pink-600 text-[10px] font-bold uppercase tracking-[0.2em] rounded-2xl text-center border border-white shadow-lg">
                      View Details
                    </div>
                  </div>
                </div>

                {/* Info Section */}
                <div className="mt-8 text-center px-4">
                  <span className="text-[9px] text-pink-400 font-bold uppercase tracking-[0.2em] mb-2 block">{product.category}</span>
                  <h3 className="text-gray-800 font-medium text-sm md:text-base mb-3 line-clamp-1 group-hover:text-pink-600 transition-colors">
                    {product.name}
                  </h3>
                  
                  <div className="flex items-center justify-center gap-4">
                    <span className="text-xl font-bold text-gray-900 font-serif">₹{product.price}</span>
                    <div className="flex items-center gap-1 bg-pink-50 px-2.5 py-1 rounded-lg text-[10px] font-bold text-pink-600 border border-pink-100">
                      <span>★</span>
                      <span>{product.rating}.0</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* 3. Visual Scroll Indicator - Ye line pta chalne degi ki slide krna h */}
          <div className="mt-4 flex flex-col items-center gap-6">
             {/* Progress Bar Track */}
             <div className="w-48 h-[2px] bg-pink-100 rounded-full overflow-hidden relative">
                <motion.div 
                  className="absolute inset-0 bg-pink-500 origin-left"
                  initial={{ scaleX: 0.2 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                />
             </div>
             
             {/* Global CTA */}
             <button 
               onClick={() => navigate('/Products')}
               className="group flex flex-col items-center gap-2"
             >
               <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-gray-400 group-hover:text-pink-600 transition-colors">
                 See All 
               </span>
               <div className="w-1 h-1 bg-pink-500 rounded-full group-hover:h-8 transition-all duration-500" />
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeProduct;