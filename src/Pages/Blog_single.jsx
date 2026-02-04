import React, { useEffect } from 'react'
import { BlogData } from '../Data/Blog';
import { ProductData } from '../Data/Product';
import { useNavigate, useParams } from 'react-router-dom';
//import ProductCard from '../Partials/Components/ProductCard';
import Placeholder from '../assets/placeholder.webp'
const Blog_single = () => {
     const { id } = useParams(); // Get blog ID from URL
     const navigate = useNavigate(); // For back navigation
  const blog = BlogData.find(blog => blog.id === parseInt(id)) 
  // Get unique categories
  const categories = ['all', ...new Set(BlogData.map(b => b.category))];
  useEffect(() => {
     window.scrollTo(0, 0);
   
  });
  // Get related blogs from the same category, excluding the current blog
  const relatedBlogs = BlogData
    .filter(b => b.category === blog.category && b.id !== blog.id)
    .slice(0, 3); // Limit to 3 related blogs

  // Filter related products by blog's category and concerns
  const relatedProducts = ProductData
    .filter(product => product.category === blog.category)
    .filter(product => product.concerns.includes(blog.concern.toLowerCase()))
    .slice(0, 4); // Limit to 4 products
    
 return (
    <div className=" min-h-screen mx-2 md:mx-4 lg:mx-10">
      <div className="container mx-auto px-4 py-10 lg:px-0">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Article */}
          <div className="lg:w-2/3 space-y-8  bg-white rounded-lg ">
            {/* Banner Section */}
            <div className="relative rounded-t-lg border border-stone-200 h-[40vh] lg:h-[50vh] w-full">
              <img
                src={blog.image || Placeholder}
                onError={(e) => (e.target.src = Placeholder)}
                alt="Blog Banner"
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent"></div>
             <div className="absolute bottom-4 left-4 text-white flex items-center gap-2">
    <span className="text-xs italic font-medium bg-black/25 px-2 py-1 rounded-full">
       by <span className='font-lg not-italic font-semibold capitalize'>{blog.Author}</span>
    </span>
  </div>
            </div>

            {/* Content Section */}
            <div className="space-y-4 px-4">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center text-sm font-medium text-gray-500">
                <span className="mb-2 sm:mb-0">
                  {blog.category} | {blog.concern}
                </span>
                <span className="text-pink-600 font-semibold">{blog.hashtag}</span>
              </div>

              <h1 className="text-3xl lg:text-4xl font-semibold text-pink-700  leading-tight">
                {blog.title}
              </h1>

           <p
  className="text-base text-gray-700 leading-relaxed tracking-wide"
  dangerouslySetInnerHTML={{ __html: blog.description }}
/>

            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:w-1/3">
            <div className="sticky top-6 space-y-6 bg-white rounded-xl shadow p-4">
              {/* Back Button */}
              <div className="hidden lg:block">
                <button
                  onClick={() => navigate(-1)}
                  className="flex items-center text-pink-600 hover:text-pink-700 text-sm font-semibold hover:underline"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                  </svg>
                  Back 
                </button>
              </div>

              {/* Recommended Products */}
              {relatedProducts?.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-800  mb-4">
                    Recommended Products
                  </h3>
                  <ul className="space-y-4">
                    {relatedProducts.map((product) => (
                      <li key={product.id} className="flex items-center gap-4">
                        <img
                          src={product.images ||Placeholder}
                          onError={(e) => (e.target.src = Placeholder)}
                          alt={product.name}
                          className="w-16 h-16 object-cover rounded-md"
                        />
                        <a
                          href={`/Product/${product.id}`}
                          className="text-md text-gray-800 hover:text-pink-600 hover:underline line-clamp-2"
                        >
                          {product.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Related Blogs */}
              {relatedBlogs?.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-800  mb-4">
                    More in {blog.category}
                  </h3>
                  <ul className="space-y-4">
                    {relatedBlogs.map((relatedBlog) => (
                      <li key={relatedBlog.id} className="flex items-center gap-4">
                        <img
                          src={relatedBlog.image ||Placeholder}
                          onError={(e) => (e.target.src = Placeholder)}
                          alt={relatedBlog.title}
                          className="w-16 h-16 object-cover rounded-md"
                        />
                        <a
                          href={`/Blog/${relatedBlog.id}`}
                          className="text-sm text-gray-800 hover:text-pink-600 hover:underline line-clamp-2"
                        >
                          {relatedBlog.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Categories */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800  mb-4 mt-10">Categories</h3>
                <ul className="space-y-1">
                  {categories.map((category) => (
                    <li key={category}>
                      <button
                        onClick={() => navigate(`/Blog?category=${category}`)}
                        className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition duration-200 ${
                          blog.category === category && category !== "all"
                            ? "bg-pink-100 text-pink-600 font-semibold"
                            : "text-gray-800 hover:bg-pink-100 hover:text-pink-600"
                        }`}
                      >
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );

}

export default Blog_single