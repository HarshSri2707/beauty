// import React, { useState } from 'react'
// import Banner from '../Partials/Components/Banner'
// import { faqs } from '../Data/Faqs'
// import Short from '../Partials/Components/Short'
// import { useNavigate } from 'react-router-dom';
// import Suggestionblog from '../Partials/Components/Question';
// import Homeproduct from '../Partials/Components/homeproduct';
// import Hyluronicacid from '../assets/Hyluronicacid.png'
// import Salicylic from '../assets/salicylic-acid-banner.jpg'
// import coconut from '../assets/coconut.jpg'
// import shea from '../assets/shea.webp'
// import neem from '../assets/neem.jpg'
// import aloe from '../assets/aloe.jpg'
// import antiage from '../assets/antiage.jpg'
// import hyper from '../assets/hyper.avif'
// import oily from '../assets/oily.webp'
// import Dry from '../assets/dry.webp'
// import acne from '../assets/acne.png'
// import dryhair from '../assets/dryhair.webp'
// import frizzy from '../assets/frizzy.webp'
// import curl from '../assets/curl.webp'
// import damage from '../assets/damage.avif'
// import Makeup from '../assets/makeup.webp'
// import OfferBanner from '../assets/off20.jpg'
// import OfferBanner1 from '../assets/offerbanner.jpeg'
// import GuideAdd from '../assets/Addguide.png'
// import { FaUsers, FaBoxOpen, FaLeaf } from "react-icons/fa";
// import Placeholder from '../assets/placeholder.webp'

// const Home = () => {
//   const navigate = useNavigate();
//   const ingredients = [
//     {
//       name: 'Hyaluronic Acid',
//       gif: Hyluronicacid,
//       onClick: () => navigate(`/Products?filter=${encodeURIComponent('Hyaluronic Acid')}`)
//     },
//     {
//       name: 'Salicylic Acid',
//       gif: Salicylic,
//       onClick: () => navigate(`/Products?filter=${encodeURIComponent('Salicylic Acid')}`)
//     },
//     {
//       name: 'Coconut Oil',
//       gif: coconut,
//       onClick: () => navigate(`/Products?filter=${encodeURIComponent('Coconut Oil')}`)
//     },
//     {
//       name: 'Shea Butter',
//       gif: shea,
//       onClick: () => navigate(`/Products?filter=${encodeURIComponent('Shea Butter')}`)
//     },
//     {
//       name: 'Neem Extract',
//       gif: neem,
//       onClick: () => navigate(`/Products?filter=${encodeURIComponent('Neem Extract')}`)
//     },
//     {
//       name: 'Aloe Vera',
//       gif: aloe,
//       onClick: () => navigate(`/Products?filter=${encodeURIComponent('Aloe Vera')}`)
//     }
//   ];
//   const skinconcerns = [
//     {
//       name: 'Acne',
//       gif: acne,
//       onClick: () => navigate(`/Products?filter=${encodeURIComponent('Acne')}`)
//     },
//     {
//       name: 'Anti-aging',
//       gif: antiage,
//       onClick: () => navigate(`/Products?filter=${encodeURIComponent('Anti-aging')}`)
//     },
//     {
//       name: 'Hyperpigmentation',
//       gif: hyper,
//       onClick: () => navigate(`/Products?filter=${encodeURIComponent('Hyperpigmentation')}`)
//     },
//     {
//       name: 'Dryness',
//       gif: Dry,
//       onClick: () => navigate(`/Products?filter=${encodeURIComponent('Dryness')}`)
//     },
//     {
//       name: 'Oil control',
//       gif: oily,
//       onClick: () => navigate(`/Products?filter=${encodeURIComponent('Oil control')}`)
//     },
//     {
//       name: 'Acne',
//       gif: acne,
//       onClick: () => navigate(`/Products?filter=${encodeURIComponent('Acne')}`)
//     }
//   ];
//   const hairconcerns = [
//     {
//       name: 'Curl definition',
//       gif: curl,
//       onClick: () => navigate(`/Products?filter=${encodeURIComponent('Curl definition')}`)
//     },
//     {
//       name: 'Damage repair',
//       gif: damage,
//       onClick: () => navigate(`/Products?filter=${encodeURIComponent('Damage repair')}`)
//     },
//     {
//       name: 'Dry hair',
//       gif: dryhair,
//       onClick: () => navigate(`/Products?filter=${encodeURIComponent('Dry hair')}`)
//     },
//     {
//       name: 'Frizz',
//       gif: frizzy,
//       onClick: () => navigate(`/Products?filter=${encodeURIComponent('Frizz')}`)
//     },
//     {
//       name: 'Curl definition',
//       gif: curl,
//       onClick: () => navigate(`/Products?filter=${encodeURIComponent('Curl definition')}`)
//     },
//     {
//       name: 'Damage repair',
//       gif: damage,
//       onClick: () => navigate(`/Products?filter=${encodeURIComponent('Damage repair')}`)
//     },
//   ];
// const categories = [
//   {
//     name: 'Skincare',
//     image: Hyluronicacid,
//     description: 'Discover nourishing products for radiant skin.',
//     onClick: () => navigate(`/Products?filter=${encodeURIComponent('skincare')}`)
//   },
//   {
//     name: 'Haircare',
//     image: dryhair,
//     description: 'Transform your hair with our premium care solutions.',
//     onClick: () => navigate(`/Products?filter=${encodeURIComponent('haircare')}`)
//   },
//   {
//     name: 'MakeUp',
//     image: Makeup,
//     description: 'Enhance your beauty with our stunning makeup collection.',
//     onClick: () => navigate(`/Products?filter=${encodeURIComponent('makeup')}`)
//   }
// ];

//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     message: '',
//   });
//   const [openIndex, setOpenIndex] = useState(null);

//   const toggle = (index) => {
//     setOpenIndex(openIndex === index ? null : index);
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
   
//     setFormData({ name: '', email: '', message: '' });
//   };

//   return (
//     <div>
//      <div className='lg:mx-5'>
//      <Banner />
//      </div>
// <div className='lg:mx-5 '>
//    <Homeproduct />
// </div>




//  {/* Full-Width 20% Off Poster */}
// <div className="flex gap-4 justify-center items-center mx-4 lg:mx-9 my-5">
//   <img
//     src={OfferBanner || Placeholder} 
//      onError={(e) => (e.target.src = Placeholder)}
//     alt="Offer Banner"
//     className="border border-purple-200 rounded-md w-1/2 "
//   />
//   <img
//     src={OfferBanner1 ||Placeholder}
//     alt="Offer Banner"
//     className="border border-purple-200 rounded-md  w-1/2"
//   />
// </div>

//       {/* Skin Concerns */}
//       <div className='mb-8 mt-12 lg:mx-5'>
//       <div className=" px-4">
//         <div className="flex flex-nowrap overflow-x-auto gap-4 sm:grid sm:grid-cols-3 sm:gap-4 lg:grid-cols-6 pb-4 snap-x snap-mandatory">
//           {skinconcerns.map((concern, index) => (
//             <div
//               key={index}
//               className="bg-white  overflow-hidden cursor-pointer transition-shadow min-w-[150px] snap-center"
//               onClick={concern.onClick}
//             >
//               <img
//                 src={concern.gif || Placeholder}
//                 onError={(e) => (e.target.src = Placeholder)}
//                 alt={concern.name}
//                 className="w-full h-48 object-cover rounded-md"
//               />
//               <div className="p-1">
//                 <h3 className="text-lg font-semibold text-left">{concern.name}</h3>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//       </div>
  
//       <div className="mx-0  px-0 md:px-2 py-9 shadow-sm text-center space-y-2 mt-4 rounded-md bg-white/70 bg-gradient-to-br from-pink-100 to-purple-100">
//         <h2 className="text-2xl font-semibold text-pink-700 ">
//           Know More
//         </h2>
//         <p className="text-gray-700 text-md font-medium font-playfair">
//           Explore expert tips, handpicked product recommendations & beauty blogs tailored to your skin and style needs.
//         </p>
//         <Suggestionblog />
//       </div>
//       {/*Ingridents */}
//  <div className="mt-12 mb-10 px-4 lg:mx-5">
//   <div className="horizontal-scroll-container overflow-x-auto relative hide-scrollbar">
//     <div className="horizontal-scroll-content flex flex-row ">
//       {ingredients.map((ingredient, index) => (
//         <div
//           key={index}
//           className="relative  rounded-xl shadow-lg overflow-hidden cursor-pointer hover:scale-105 hover:shadow-xl transition-all duration-300 mx-2"
//           style={{ minWidth: '250px', height: '330px' }}
//           onClick={ingredient.onClick}
//         >
//           <img
//             src={ingredient.gif || Placeholder}
//             onError={(e) => (e.target.src = Placeholder)}
//             alt={ingredient.name}
//             className="w-full h-full object-cover"
//           />
//           <div className="absolute bottom-0 left-0 w-full p-4 flex items-end">
//             <h2 className="text-lg font-semibold text-white text-center w-full tracking-wide uppercase bg-black/10 py-3">
//               {ingredient.name}
//             </h2>
//           </div>
//         </div>
//       ))}
//     </div>
//   </div>
// </div>
// <section className="my-10 px-4 rounded-md lg:mx-5">
//   <h2 className="text-2xl font-semibold text-pink-600 text-center  mb-4">Watch. Buy. Glow</h2>
//   <Short />
// </section>
// <div className='lg:mx-5'>
  
// <img 
//   src={GuideAdd || Placeholder}
//   onError={(e) => (e.target.src = Placeholder)}
//   className="h-30 md:h-60 w-full mb-4 rounded-md my-7"
//   onClick={() => navigate('/Blog?category=all')}
// />
// </div>

//       {/* Hair Concerns */}
//      <div className='my-12 lg:mx-5'>
       
//       <div className="pb-1 px-4">
//         <div className="flex flex-nowrap overflow-x-auto gap-4 sm:grid sm:grid-cols-3 sm:gap-4 lg:grid-cols-6 md:gap-4 pb-4 snap-x snap-mandatory">
//           {hairconcerns.map((concern, index) => (
//             <div
//               key={index}
//               className="bg-white overflow-hidden cursor-pointer  transition-shadow min-w-[150px] snap-center"
//               onClick={concern.onClick}
//             >
//               <img
//                 src={concern.gif || Placeholder}  
//                 onError={(e) => (e.target.src = Placeholder)}
//                 alt={concern.name}
//                 className="w-full h-48 object-cover rounded-md"
//               />
//               <div className="p-1">
//                 <h3 className="text-lg font-semibold text-left">{concern.name}</h3>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//      </div>


//       {/* Explore Our Categories */}
//       <div className="bg-gradient-to-b from-pink-300 to-pink-50 py-10 px-4  rounded-md
//       ">
//         <div className="max-w-7xl mx-auto text-center">
//           <h2 className="text-4xl font-semibold text-pink-600  mb-8">Explore Our Categories</h2>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             {categories.map((category, index) => (
//               <div
//                 key={index}
//                 className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-xl transition-shadow duration-300 "
//                 onClick={category.onClick}
//               >
//                 <img
//                   src={category.image || Placeholder}
//                   onError={(e) => (e.target.src = Placeholder)}
//                   alt={category.name}
//                   className="w-full h-50 object-cover"
//                 />
//                 <div className="p-6">
//                   <h3 className="text-xl font-semibold text-gray-800 mb-2">{category.name}</h3>
//                   <p className="text-gray-600 text-sm mb-4">{category.description}</p>
//                   <button
//                     className="bg-pink-500 hover:bg-pink-600 text-white font-medium py-2 px-15 rounded-md transition-all duration-300"
//                     onClick={category.onClick}
//                   >
//                     Take a look
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Base About Company (Stats) */}
//       <div className="text-pink-600 bg-gradient-to-b from-pink-50 to-white px-4  pb-4 pt-10  ">
//         <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
//           <div className="flex flex-col items-center">
//             <FaUsers className="text-4xl mb-2" />
//             <p className="text-3xl font-bold">100+</p>
//             <p className="text-lg font-medium">Happy Customers</p>
//           </div>
//           <div className="flex flex-col items-center">
//             <FaBoxOpen className="text-4xl mb-2" />
//             <p className="text-3xl font-bold">200+</p>
//             <p className="text-lg font-medium">Products</p>
//           </div>
//           <div className="flex flex-col items-center">
//             <FaLeaf className="text-4xl mb-2" />
//             <p className="text-3xl font-bold">100+</p>
//             <p className="text-lg font-medium">Natural Ingredients</p>
//           </div>
//         </div>
//       </div>

//       {/* FAQs and Contact Form */}
//       <div className="bg-white py-12">
//         <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-30">
//           {/* FAQ Section */}
//           <div className="space-y-6">
//             <h2 className="text-3xl font-semibold text-pink-600 ">FAQs</h2>
//             <div className="space-y-4">
//               {faqs.map((faq, index) => (
//                 <div
//                   key={index}
//                   className="p-2 transition-all duration-300"
//                 >
//                   <button
//                     className="flex justify-between items-center w-full text-left text-lg font-medium text-pink-500 font-['Roboto']"
//                     onClick={() => toggle(index)}
//                   >
//                     {faq.question}
//                     <i className={`transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`}></i>
//                   </button>
//                   {openIndex === index && (
//                     <p className="mt-3 text-gray-600 font-['Roboto'] text-base">{faq.answer}</p>
//                   )}
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Contact Form Section */}
//           <div className="bg-white rounded-lg shadow-md p-8 border border-gray-100
//           ">
//             <h2 className="text-4xl font-semibold text-pink-600  text-center mb-6">Reach Out, Gorgeous!</h2>
//             <div className="space-y-6">
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//                 <div>
//                   <label htmlFor="name" className="block text-sm font-medium text-gray-700 font-['Roboto']">Name</label>
//                   <input
//                     type="text"
//                     id="name"
//                     name="name"
//                     value={formData.name}
//                     onChange={handleInputChange}
//                     className="mt-1 block w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
//                     placeholder="Your Name"
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label htmlFor="email" className="block text-sm font-medium text-gray-700 font-['Roboto']">Email</label>
//                   <input
//                     type="email"
//                     id="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleInputChange}
//                     className="mt-1 block w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
//                     placeholder="you@example.com"
//                     required
//                   />
//                 </div>
//               </div>
//               <div>
//                 <label htmlFor="message" className="block text-sm font-medium text-gray-700 font-['Roboto']">Message</label>
//                 <textarea
//                   id="message"
//                   name="message"
//                   rows="4"
//                   value={formData.message}
//                   onChange={handleInputChange}
//                   className="mt-1 block w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
//                   placeholder="Write your message here..."
//                   required
//                 ></textarea>
//               </div>
//               <div className="text-center">
//                 <button
//                   type="button"
//                   onClick={handleSubmit}
//                   className="bg-pink-500 hover:bg-pink-600 text-white font-medium py-3 px-8 rounded-md shadow-md transition-all duration-300 transform hover:scale-105"
//                 >
//                   Submit & Shine
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Home


// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// // Existing Components
// import Banner from '../Partials/Components/Banner';
// import Homeproduct from '../Partials/Components/homeproduct';
// import { faqs } from '../Data/Faqs';

// // Assets
// import Placeholder from '../assets/placeholder.webp';
// import OfferBanner from '../assets/off20.jpg';
// import OfferBanner1 from '../assets/offerbanner.jpeg';
// import GuideAdd from '../assets/Addguide.png';

// // Data
// import { 
//   ingredientsData, 
//   skinConcernsData, 
//   hairConcernsData, 
//   categoriesData,
//   statsData 
// } from '../Data/homeData';

// // New Unique Components
// import OfferBanners from '../components/Home/OfferBanners';
// import SkinConcerns from '../components/Home/SkinConcerns';
// import KnowMore from '../components/Home/KnowMore';
// import Ingredients from '../components/Home/Ingredients';
// import VideoShowcase from '../components/Home/VideoShowcase';
// import GuideBanner from '../components/Home/GuideBanner';
// import HairConcerns from '../components/Home/HairConcerns';
// import Categories from '../components/Home/Categories';
// import Stats from '../components/Home/Stats';
// import FAQContact from '../components/Home/FAQContact';

// const Home = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     message: '',
//   });
//   const [openIndex, setOpenIndex] = useState(null);

//   const toggle = (index) => {
//     setOpenIndex(openIndex === index ? null : index);
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setFormData({ name: '', email: '', message: '' });
//   };

//   return (
//     <div className="min-h-screen bg-white">
//       {/* Hero Banner */}
//       <div className='lg:mx-5'>
//         <Banner />
//       </div>

//       {/* Home Products */}
//       <div className='lg:mx-5'>
//         <Homeproduct />
//       </div>

//       {/* Offer Banners - 2 banners side by side */}
//       <OfferBanners 
//         banner1={OfferBanner}
//         banner2={OfferBanner1}
//         placeholder={Placeholder}
//       />

//       {/* Skin Concerns - Grid Tiles (only 4 items) */}
//       <SkinConcerns 
//         concerns={skinConcernsData}
//         placeholder={Placeholder}
//       />

//       {/* Know More - Compact */}
//       <KnowMore />

//       {/* Ingredients - Circular Carousel (only 6 items) */}
//       <Ingredients 
//         ingredients={ingredientsData}
//         placeholder={Placeholder}
//       />

//       {/* Video Showcase - Dark theme */}
//       <VideoShowcase />

//       {/* Guide Banner - Single clickable banner */}
//       <GuideBanner 
//         image={GuideAdd}
//         placeholder={Placeholder}
//         onClick={() => navigate('/Blog?category=all')}
//       />

//       {/* Hair Concerns - Stacked List (only 3 items) */}
//       <HairConcerns 
//         concerns={hairConcernsData}
//         placeholder={Placeholder}
//       />

//       {/* Categories - Large 3 Hero Cards */}
//       <Categories 
//         categories={categoriesData}
//         placeholder={Placeholder}
//       />

//       {/* Stats - Compact colored bar */}
//       <Stats stats={statsData} />

//       {/* FAQ & Contact - Side by side (4 FAQs only) */}
//       <FAQContact 
//         faqs={faqs}
//         formData={formData}
//         openIndex={openIndex}
//         toggle={toggle}
//         handleInputChange={handleInputChange}
//         handleSubmit={handleSubmit}
//       />
//     </div>
//   );
// };

// export default Home;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Existing Components
import Homeproduct from '../Partials/Components/homeproduct';
import { faqs } from '../Data/Faqs';

// Assets
import Placeholder from '../assets/placeholder.webp';
import OfferBanner from '../assets/off20.jpg';
import OfferBanner1 from '../assets/offerbanner.jpeg';
import GuideAdd from '../assets/Addguide.png';

// Data
import { 
  homeData, // Hero Section ka naya data jo humne banaya tha
  ingredientsData, 
  skinConcernsData, 
  hairConcernsData, 
  categoriesData,
  statsData,
  
} from '../Data/homeData';

import { BlogData } from '../Data/Blog.js'; // Guide Banner ke liye blog data

// New Unique Components
import HeroSection from '../components/Home/HeroSection'; // Purane Banner ki jagah ab HeroSection lega
import OfferBanners from '../components/Home/OfferBanners';
import SkinConcerns from '../components/Home/SkinConcerns';
import KnowMore from '../components/Home/KnowMore';
import Ingredients from '../components/Home/Ingredients';
import VideoShowcase from '../components/Home/VideoShowcase';
import GuideBanner from '../components/Home/GuideBanner';
import HairConcerns from '../components/Home/HairConcerns';
import Categories from '../components/Home/Categories';
import Stats from '../components/Home/Stats';
import FAQContact from '../components/Home/FAQContact';

const Home = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-white">
      
      {/* 1. Hero Banner - Using the cinematic HeroSection with its data */}
      <HeroSection data={homeData.hero} />

      {/* 2. Home Products - Bestsellers */}
      <div className='lg:mx-5 mt-12 md:mt-20'>
        <Homeproduct />
      </div>

   

      {/* 4. Skin Concerns - Problem-solving grid */}
      <SkinConcerns 
        concerns={skinConcernsData}
        placeholder={Placeholder}
      />

      {/* 5. Know More - Educational section */}
      <KnowMore />

      {/* 6. Ingredients - Powerhouse components */}
      <Ingredients 
        ingredients={ingredientsData}
        placeholder={Placeholder}
      />

      {/* 7. Video Showcase - Reels style shorts */}
      <VideoShowcase />

      {/* 8. Guide Banner - Editorial blog link */}
      <GuideBanner data={BlogData} />

      {/* 9. Hair Concerns - Specialized care */}
      <HairConcerns 
        concerns={hairConcernsData}
        placeholder={Placeholder}
      />

      {/* 10. Categories - Big visual entry points */}
      <Categories 
        categories={categoriesData}
        placeholder={Placeholder}
      />

      {/* 11. Stats - Social Proof bar */}
      <Stats stats={statsData} />

      {/* 12. FAQ & Contact - Customer support split */}
      <FAQContact 
        faqs={faqs}
        formData={formData}
        openIndex={openIndex}
        toggle={toggle}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default Home;