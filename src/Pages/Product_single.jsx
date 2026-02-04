import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ProductData } from '../Data/Product';
import { BlogData } from '../Data/Blog';
import { useEffect } from 'react';
import Placeholder from '../assets/placeholder.webp'
import { FaArrowLeft } from 'react-icons/fa';
const Product_single = () => {
  const { id } = useParams();
  const product = ProductData.find((item) => item.id === parseInt(id));
    const [mainImage, setMainImage] = useState(product.images[0]);
    const [activeTab, setActiveTab] = useState('description');

  if (!product) {
    return <div className="text-center py-20">Product not found</div>;
  }
useEffect(() => {
  if (product) {
    setMainImage(product.images[0]);
    window.scrollTo(0, 0);
  }
}, [product]);

  // Handle product view for recently viewed
  const handleProductView = (product) => {
    const updatedRecent = [product, ...recentlyViewed.filter((p) => p.id !== product.id)].slice(0, 3);
    localStorage.setItem('recentlyViewed', JSON.stringify(updatedRecent));
  };
const navigate =useNavigate();
  // Get recommended products (same category, exclude current product, limit to 4)
  const recommendedProducts = ProductData.filter(
    (item) => item.category === product.category && item.id !== product.id
  ).slice(0, 4);

  // Get recommended blogs (match product concerns, limit to 3)
  const recommendedBlogs = BlogData.filter((blog) =>
    product.concerns.includes(blog.concern.toLowerCase())
  ).slice(0, 3);

  const handleBack = (e) => {
   console.log('Current location:', location.pathname, location.state);
    console.log('History length:', window.history.length);
    console.log('History state:', window.history.state);
    navigate(-1);
  };
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Main Product Section */}
     <button
        onClick={handleBack}
        className="flex lg:hidden items-center justify-center w-10 h-10 mr-2 text-pink-800 hover:text-pink-500"
      >
        <FaArrowLeft />
      </button>
      <div className="">
      <div >
      <div className="flex flex-col md:flex-row">
        {/* Image Section */}
        <div className="flex flex-col md:flex-row gap-2 w-full lg:w-1/3">
          {/* Thumbnails for large screens */}
          <div className="hidden md:flex flex-col gap-2 w-20
          ">
            {product.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${product.name} thumbnail ${index + 1}`}
                className={`w-16 h-16 object-cover rounded-md cursor-pointer border-2 ${
                  mainImage === image ? 'border-pink-400' : 'border-transparent'
                } hover:border-pink-300 transition`}
                onClick={() => setMainImage(image)}
              />
            ))}
          </div>

          {/* Main Image */}
          <div className="flex justify-center w-full">
            <img
              src={mainImage}
              alt={product.name}
              className="w-full max-w-md h-auto object-cover rounded-md"
            />
          </div>

          {/* Thumbnails for small/medium screens */}
          <div className="flex md:hidden gap-2 justify-center mt-4">
            {product.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${product.name} thumbnail ${index + 1}`}
                className={`w-16 h-16 object-cover rounded-md cursor-pointer border-2 ${
                  mainImage === image ? 'border-pink-400' : 'border-transparent'
                } hover:border-pink-300 transition`}
                onClick={() => setMainImage(image)}
              />
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="w-full lg:w-2/3 p-6 bg-white rounded-md">
          <h1 className="text-3xl font-semibold text-gray-700 mb-2">{product.name}</h1>
          <p className="text-xs  text-gray-600 mt-2 mb-2">{product.category} | {product.subcategory}</p>
          <div className='flex gap-4'>
            <p className="text-lg  text-gray-500 ">MRP:<span className='text-green-500 font-semibold text-xl'> ₹{product.price}</span></p>
             <p className="text-xs  text-gray-600 mb-10 mt-1.5">(inclusive of all taxes)</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
              {/* Rating */}
            <div>
              <h3 className="text-lg font-semibold text-gray-700">Rating</h3>
              <p className="text-pink-500 text-xl">
                {'★'.repeat(product.rating) + '☆'.repeat(5 - product.rating)}
              </p>
            </div>

            <div>

            </div>

            {/* Skin/Hair Type */}
            <div>
              <h3 className="text-lg font-semibold text-gray-700">Suitable for</h3>
              <p className="text-gray-600">{product.skintype_hairtype.join(', ')}</p>
            </div>

            {/* Concerns */}
            <div>
              <h3 className="text-lg font-semibold text-gray-700">Addresses</h3>
              <p className="text-gray-600">{product.concerns.join(', ')}</p>
            </div>            
          </div>

          {/* Shades (if applicable) */}
          {product.shades.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Available Shades</h3>
              <div className="flex flex-wrap gap-4">
                {product.shades.map((shade, index) => (
                  <div key={index} className="text-center">
                    <img
                      src={shade.images[0]||Placeholder}
                       onError={(e) => (e.target.src = Placeholder)}
                      alt={shade.name}
                      className="w-20 h-20 object-cover rounded-md border border-gray-200"
                    />
                    <p className="text-sm text-gray-600 mt-1">{shade.name}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Platform Prices and Links */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-1">Buy Now</h3>
            <div className="flex flex-wrap gap-4">
              {Object.entries(product.platforms_price).map(([platform, price]) => (
                <a
                  key={platform}
                  href={product.links[platform]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-4 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700 transition"
                >
                  {platform.charAt(0).toUpperCase() + platform.slice(1)}: ₹{price}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
   
   {/* Tabs for Description and Ingredients */}
          <div className=" pt-4">
            <div className="flex gap-4 mb-4">
              <button
                className={`text-lg font-semibold ${
                  activeTab === 'description' ? 'text-pink-600 border-b-2 border-pink-600' : 'text-gray-600'
                }`}
                onClick={() => setActiveTab('description')}
              >
                Description
              </button>
              <button
                className={`text-lg font-semibold ${
                  activeTab === 'ingredients' ? 'text-pink-600 border-b-2 border-pink-600' : 'text-gray-600'
                }`}
                onClick={() => setActiveTab('ingredients')}
              >
                Ingredients
              </button>
            </div>
            <div className="text-gray-600 leading-relaxed">
              {activeTab === 'description' ? (
                <p>{product.description}</p>
              ) : (
                <p>{product.ingredients.join(', ')}</p>
              )}
            </div>
          </div>
      </div>
 
     
      {/* Recommended Products */}
      <div className="mt-12">
       <div className="flex items-center justify-center mb-4">
          <h2 className="text-3xl font-semibold text-pink-600  mx-4">Related Products</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
     {recommendedProducts.map((item) => (
  <Link to={`/Product/${item.id}`} key={item.id} className="block">
    <div
      className="min-w-[250px] lg:min-w-0 bg-white rounded-lg shadow-md p-4 hover:shadow-xl transition-shadow duration-300 flex flex-col min-h-[350px]"
      onClick={() => handleProductView(item)}
    >
      <img
        src={item.images[0] || Placeholder}
        onError={(e) => (e.target.src = Placeholder)}
        alt={item.name}
        className="w-full h-48 object-contain"
      />
      <div className="space-y-1 flex flex-col flex-grow">
        <p className="text-xs text-gray-500 capitalize">{item.category} | {item.subcategory}</p>
        <h3 className="text-md font-semibold text-gray-800 line-clamp-2">{item.name}</h3>
        <p className="text-pink-500 text-sm">
          {'★'.repeat(Math.floor(item.rating))}{'☆'.repeat(5 - Math.floor(item.rating))}
        </p>
        <div className="flex justify-between items-center pt-2 mt-auto">
          <p className="text-pink-600 font-semibold">₹{item.price}</p>
          <button
            onClick={(e) => navigate(`/Product/${item.id}`)}
            className="text-sm text-pink-600 hover:underline"
          >
            View
          </button>
        </div>
      </div>
    </div>
  </Link>
))}
        </div>
      </div>

      {/* Recommended Blogs */}
      <div className="mt-12">
       <div className="flex items-center justify-center mb-4">
          <h2 className="text-3xl font-semibold text-pink-600  mx-4">Related blogs</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendedBlogs.map((blog) => (
            <div key={blog.id} className=" rounded-lg shadow-md overflow-hidden cursor-pointer" 
            onClick={(e) => {navigate(`/Blog/${blog.id}`)}}
            >
              <img
                src={blog.image || Placeholder}
                 onError={(e) => (e.target.src = Placeholder)}
                alt={blog.title}
                className="w-full h-50 object-cover"
              
              />
               <div className="p-5 bg-white">
                <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-1">
                  {blog.title}
                </h3>
               <p
  className="text-gray-600 text-sm mb-3 line-clamp-2"
  dangerouslySetInnerHTML={{ __html: blog.description }}
/>
                <p className="text-rose-600 text-sm font-medium">
                  {blog.hashtag}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );   
};

export default Product_single;
