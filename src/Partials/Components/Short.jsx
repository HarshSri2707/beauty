// // import React, { useState, useEffect } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import { ProductData } from '../../Data/Product';
// // import { videoData } from '../../Data/video';

// // const Shorts = () => {
// //   const navigate = useNavigate();
// //   const [playingVideos, setPlayingVideos] = useState(new Set());

// //   // Set the first video to play by default when component mounts
// //   useEffect(() => {
// //     if (videoData.length > 0) {
// //       setPlayingVideos(new Set([videoData[0].videoId]));
// //     }
// //   }, []);

// //   const getProductId = (productName) => {
// //     const product = ProductData.find((p) => p.name === productName);
// //     return product ? product.id : null;
// //   };

// //   const getProductDetails = (productName) => {
// //     return ProductData.find((p) => p.name === productName) || {};
// //   };

// //   const handleViewNow = (productName) => {
// //     const productId = getProductId(productName);
// //     if (productId) {
// //       navigate(`/Product/${productId}`);
// //     } else {
// //       console.warn(`No product found for name: ${productName}`);
// //     }
// //   };

// //   const handleMouseEnter = (videoId) => {
// //     setPlayingVideos((prev) => new Set(prev).add(videoId));
// //   };

// //   const getVideoSrc = (videoId) => {
// //     return `https://www.youtube.com/embed/${videoId}?autoplay=${
// //       playingVideos.has(videoId) ? 1 : 0
// //     }&mute=1&playsinline=1&modestbranding=1&loop=1&playlist=${videoId}`;
// //   };

// //   return (
// //     <div className="py-4 overflow-x-auto hide-scrollbar">
// //       <div className="flex flex-row space-x-7 py-2">
// //         {videoData.map((video) => {
// //           const product = getProductDetails(video.productName);
// //           return (
// //             <div
// //               key={video.id}
// //               className="flex-none w-54 flex flex-col items-center shadow-xs rounded-md"
// //               onMouseEnter={() => handleMouseEnter(video.videoId)}
// //             >
// //               <iframe
// //                 className="w-full h-96 rounded-t-md"
// //                 src={getVideoSrc(video.videoId)}
// //                 title={video.productName}
// //                 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
// //               ></iframe>
// //               <div className="flex flex-col items-center w-full mt-2">
// //                 <div className="flex flex-row items-center">
// //                   <img
// //                     src={product.images && product.images[0] ? product.images[0] : 'https://via.placeholder.com/150'}
// //                     alt={video.productName}
// //                     className="w-12 h-16 object-contain rounded-lg"
// //                   />
// //                   <h2 className="text-md text-center ml-1">{video.productName}</h2>
// //                 </div>
// //                 <p className="text-lg text-gray-600">
// //                   {product.price ? `\u20B9${product.price}` : 'Price not available'}
// //                 </p>
// //                 <button
// //                   onClick={() => handleViewNow(video.productName)}
// //                   className="mt-2 px-15 py-2 text-pink-500 border border-pink-500 rounded hover:bg-pink-50 disabled:opacity-50 disabled:cursor-not-allowed"
// //                   disabled={!getProductId(video.productName)}
// //                 >
// //                   View Now
// //                 </button>
// //               </div>
// //             </div>
// //           );
// //         })}
// //       </div>
// //     </div>
// //   );
// // };

// // export default Shorts;


// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { ProductData } from '../../Data/Product';
// import { videoData } from '../../Data/video';

// const Shorts = () => {
//   const navigate = useNavigate();
//   const [activeVideoId, setActiveVideoId] = useState(null);

//   useEffect(() => {
//     if (videoData.length > 0) {
//       setActiveVideoId(videoData[0].videoId);
//     }
//   }, []);

//   const getProductDetails = (productName) => {
//     return ProductData.find((p) => p.name === productName) || {};
//   };

//   const handleViewNow = (productName) => {
//     const product = getProductDetails(productName);
//     if (product.id) navigate(`/Product/${product.id}`);
//   };

//   return (
//     /* Container mein padding badha di hai taaki cards cut na lagein */
//     <div className="py-10 bg-inherit overflow-x-auto no-scrollbar snap-x snap-mandatory">
//       <div className="flex flex-row space-x-8 px-8 md:px-20"> {/* Extra side padding for 'breathing' room */}
//         {videoData.map((video) => {
//           const product = getProductDetails(video.productName);
//           const isActive = activeVideoId === video.videoId;

//           return (
//             <div
//               key={video.id}
//               className="flex-none w-[280px] md:w-[320px] snap-center group" 
//               onMouseEnter={() => setActiveVideoId(video.videoId)}
//             >
//               {/* Video Container with defined Border & Shadow */}
//               <div className={`relative h-[480px] rounded-[2.5rem] overflow-hidden border-4 transition-all duration-700 
//                 ${isActive 
//                   ? 'border-white shadow-2xl scale-105 z-10' 
//                   : 'border-transparent shadow-md scale-95 opacity-60'}`}
//               >
//                 <iframe
//                   className="w-full h-full object-cover pointer-events-none"
//                   src={`https://www.youtube.com/embed/${video.videoId}?autoplay=${isActive ? 1 : 0}&mute=1&controls=0&loop=1&playlist=${video.videoId}&modestbranding=1&rel=0`}
//                   title={video.productName}
//                   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                 ></iframe>

//                 {/* Price Badge with higher contrast */}
//                 <div className="absolute top-6 right-6 bg-black/80 backdrop-blur-md px-4 py-1.5 rounded-full">
//                   <p className="text-[11px] font-bold text-white tracking-widest">
//                     {product.price ? `₹${product.price}` : 'NEW'}
//                   </p>
//                 </div>
//               </div>

//               {/* Info Card - Improved contrast and spacing */}
//               <div className={`mt-[-70px] relative z-20 px-6 transition-all duration-500 ${isActive ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
//                 <div className="bg-white p-5 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-slate-100 text-center">
//                   <div className="mb-4 inline-block p-1 bg-slate-50 rounded-xl border border-slate-100">
//                     <img
//                       src={product.images?.[0] || 'https://via.placeholder.com/150'}
//                       alt={video.productName}
//                       className="w-14 h-14 object-contain rounded-lg"
//                     />
//                   </div>
                  
//                   <h3 className="text-sm font-bold text-slate-800 mb-1 line-clamp-1 uppercase tracking-tight">
//                     {video.productName}
//                   </h3>
//                   <p className="text-[10px] text-pink-500 font-bold mb-4 tracking-[0.2em] uppercase">Glow Essentials</p>

//                   <button
//                     onClick={() => handleViewNow(video.productName)}
//                     className="w-full py-3 bg-pink-500 hover:bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-pink-100 hover:shadow-slate-200"
//                   >
//                     Shop the Look
//                   </button>
//                 </div>
//               </div>
//             </div>
//           );
//         })}
        
//         {/* Extra Empty Space at the end to prevent cut-off feel */}
//         <div className="flex-none w-20 md:w-40" />
//       </div>
//     </div>
//   );
// };

// export default Shorts;


import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ProductData } from '../../Data/Product';
import { videoData } from '../../Data/video';

const Shorts = () => {
  const navigate = useNavigate();
  const [activeVideoId, setActiveVideoId] = useState(null);

  useEffect(() => {
    if (videoData.length > 0) setActiveVideoId(videoData[0].videoId);
  }, []);

  const getProductDetails = (productName) => {
    return ProductData.find((p) => p.name === productName) || {};
  };

  return (
    <div className="py-6 overflow-x-auto no-scrollbar snap-x snap-mandatory">
      <div className="flex flex-row space-x-6 md:space-x-10 px-4 md:px-10">
        {videoData.map((video, index) => {
          const product = getProductDetails(video.productName);
          const isActive = activeVideoId === video.videoId;

          return (
            <div
              key={video.id}
              className="flex-none w-[260px] md:w-[300px] snap-center py-10"
              onMouseEnter={() => setActiveVideoId(video.videoId)}
              onTouchStart={() => setActiveVideoId(video.videoId)}
            >
              {/* Video Frame */}
              <div className={`relative h-[450px] md:h-[520px] rounded-[3rem] overflow-hidden transition-all duration-700 ease-out
                ${isActive ? 'scale-105 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)]' : 'scale-95 opacity-50 grayscale-[40%]'}`}
              >
                <iframe
                  className="w-full h-full object-cover scale-[1.05]"
                  src={`https://www.youtube.com/embed/${video.videoId}?autoplay=${isActive ? 1 : 0}&mute=1&controls=0&loop=1&playlist=${video.videoId}&modestbranding=1&rel=0&showinfo=0`}
                  title={video.productName}
                  allow="autoplay; encrypted-media"
                ></iframe>

                {/* Glassmorphism Product Overlay */}
                <div className="absolute inset-x-4 bottom-4">
                   <AnimatePresence>
                    {isActive && (
                      <motion.div 
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 10, opacity: 0 }}
                        className="bg-white/10 backdrop-blur-xl border border-white/20 p-4 rounded-[2rem] flex items-center justify-between shadow-2xl"
                      >
                        <div className="flex items-center gap-3">
                          <img 
                            src={product.images?.[0]} 
                            className="w-10 h-10 rounded-full object-cover border border-white/50" 
                            alt="thumb" 
                          />
                          <div>
                            <p className="text-white text-[10px] font-bold uppercase tracking-tighter truncate w-24">
                              {video.productName}
                            </p>
                            <p className="text-white/70 text-[9px] font-medium tracking-widest">
                              ₹{product.price || '999'}
                            </p>
                          </div>
                        </div>
                        <button 
                          onClick={() => navigate(`/Product/${product.id}`)}
                          className="bg-white text-black p-2.5 rounded-full hover:bg-pink-500 hover:text-white transition-colors"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7-7 7" />
                          </svg>
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          );
        })}
        {/* End Spacer */}
        <div className="flex-none w-10 md:w-20" />
      </div>
    </div>
  );
};

export default Shorts;