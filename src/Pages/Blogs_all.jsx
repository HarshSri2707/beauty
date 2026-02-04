import React, { useRef, useState, useEffect } from 'react';
import Image from '../assets/blogbanner.jpg';
import { BlogData } from '../Data/Blog';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Placeholder from '../assets/placeholder.webp'
const BlogsAll = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedConcern, setSelectedConcern] = useState('all');
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showConcernDropdown, setShowConcernDropdown] = useState(false);
  const categoryDropdownRef = useRef(null);
  const concernDropdownRef = useRef(null);
  const postsPerPage = 6;
  const navigate =useNavigate();

  // Unique categories and concerns for filters
  const categories = ['all', ...new Set(BlogData.map(blog => blog.category))];
  const concerns = ['all', ...new Set(BlogData.map(blog => blog.concern))];

  // Set initial category from URL query parameter
  useEffect(() => {
     window.scrollTo(0, 0);
    const categoryFromUrl = searchParams.get('category');
    if (categoryFromUrl && categories.includes(categoryFromUrl)) {
      setSelectedCategory(categoryFromUrl);
    }
  }, [searchParams]);

  // Update URL when category changes
  useEffect(() => {
    setSearchParams({ category: selectedCategory });
  }, [selectedCategory, setSearchParams]);

  // Filter and paginate posts
  const filteredPosts = BlogData
    .filter(blog => selectedCategory === 'all' || blog.category === selectedCategory)
    .filter(blog => selectedConcern === 'all' || blog.concern === selectedConcern);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  // Function to truncate description to 200 words
const truncateDescription = (htmlText, wordLimit) => {
  // Create a temporary DOM element to parse HTML
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = htmlText;

  // Extract plain text from HTML
  const plainText = tempDiv.textContent || tempDiv.innerText || '';

  // Split into words and truncate
  const words = plainText.split(' ');
  if (words.length <= wordLimit) return htmlText;

  // Truncate to word limit and reconstruct HTML
  const truncatedText = words.slice(0, wordLimit).join(' ') + '...';

  // Re-insert truncated text into HTML structure
  tempDiv.textContent = truncatedText;
  return tempDiv.innerHTML;
};

  // Pagination navigation
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Category filter handler
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setShowCategoryDropdown(false);
    setCurrentPage(1);  
  };

  // Concern filter handler
  const handleConcernChange = (concern) => {
    setSelectedConcern(concern);
    setShowConcernDropdown(false);
    setCurrentPage(1);
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (categoryDropdownRef.current && !categoryDropdownRef.current.contains(event.target)) {
        setShowCategoryDropdown(false);
      }
      if (concernDropdownRef.current && !concernDropdownRef.current.contains(event.target)) {
        setShowConcernDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
   <div className="min-h-screen mx-2 md:mx-4 lg:mx-10">
    {/* Banner Section */}
   <div className="  h-[30vh] lg:h-[40vh] min-h-[30vh] max-h-[60vh] w-full  my-2 rounded-md border-1 border-stone-200">
        <img
          src={Image || Placeholder}
          onError={(e) => (e.target.src = Placeholder)}
          className="w-full h-full object-cover rounded-md border-1 border-stone-200"
          alt="Blog Banner"
        />
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-6 md:py-8 lg:py-5">
        <div className="text-center mb-10">
          <div className="flex items-center justify-center mb-4">
            <div className="flex-1 h-px bg-pink-400"></div>
            <h2 className="text-3xl font-semibold text-pink-600 mx-4">Beauty Blog</h2>
            <div className="flex-1 h-px bg-pink-400"></div>
          </div>
          <p className="text-stone-800 text-base font-medium font-playfair max-w-xl mx-auto">
            Dive into expert tips and insights for radiant skin and hair.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap justify-left mb-8 gap-4">
          <div className="relative lg:hidden" ref={concernDropdownRef}>
            <button
              onClick={() => setShowConcernDropdown(!showConcernDropdown)}
              className="px-4 py-2 rounded-full bg-stone-50 shadow-md 
               text-gray-800 text-sm font-semibold flex items-center hover:bg-pink-100 hover:text-pink-600 transition-colors duration-200"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              {selectedConcern === 'all' ? 'Concern' : selectedConcern.charAt(0).toUpperCase() + selectedConcern.slice(1)}
            </button>
            {showConcernDropdown && (
              <div className="absolute mt-2 w-40 bg-white rounded-md shadow-lg border border-[#E5E5DA] z-10">
                {concerns.map(concern => (
                  <button
                    key={concern}
                    onClick={() => handleConcernChange(concern)}
                    className={`block w-full text-left px-4 py-2 text-sm text-gray-800 hover:bg-pink-100 hover:text-pink-600 ${
                      selectedConcern === concern ? 'bg-pink-100 text-pink-600 font-semibold' : ''
                    }`}
                  >
                    {concern.charAt(0).toUpperCase() + concern.slice(1)}
                  </button>
                ))}
              </div>
            )}
          </div>
          {/*Category button */}
               <div className="relative" ref={categoryDropdownRef}>
            <button
              onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
              className="px-4 py-2 rounded-full bg-stone-50 shadow-md 
               text-gray-800 text-sm font-semibold flex items-center hover:bg-pink-100 hover:text-pink-600 transition-colors duration-200"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              {selectedCategory === 'all' ? 'Category' : selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}
            </button>
            {showCategoryDropdown && (
              <div className="absolute mt-2 w-40 bg-white rounded-md shadow-lg border border-[#E5E5DA] z-10">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => handleCategoryChange(category)}
                    className={`block w-full text-left px-4 py-2 text-sm text-gray-800 hover:bg-pink-100 hover:text-pink-600 ${
                      selectedCategory === category ? 'bg-pink-100 text-pink-600 font-semibold' : ''
                    }`}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </button>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* Main Content with Sidebar */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar for Concern Filters */}
          <aside className="lg:w-1/4 bg-white/60 rounded-lg shadow-md p-4 h-full hidden lg:block">
            <h3 className="text-lg font-semibold text-gray-800  mb-4">Concerns</h3>
            <ul className="space-y-2">
              {concerns.map(concern => (
                <li key={concern}>
                  <button
                    onClick={() => handleConcernChange(concern)}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                      selectedConcern === concern
                        ? 'bg-pink-100 text-pink-600 font-semibold'
                        : 'text-gray-800 hover:bg-pink-100 hover:text-pink-600'
                    }`}
                  >
                    {concern.charAt(0).toUpperCase() + concern.slice(1)}
                  </button>
                </li>
              ))}
            </ul>
          </aside>

          {/* Blog Cards */}
          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
              {currentPosts.length > 0 ? (
                currentPosts.map(blog => (
                  <div
                    key={blog.id}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
                     onClick={(e) => navigate(`/Blog/${blog.id}`)}
                  >
                    <img
                      src={blog.image ||Placeholder}
                      onError={(e) => (e.target.src = Placeholder)}
                      alt={blog.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs text-gray-500 font-medium capitalize">
                          {blog.category} | {blog.concern}
                        </span>
                        <span className="text-xs text-pink-600 font-semibold">{blog.hashtag}</span>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-800  line-clamp-2 mb-2">
                        {blog.title}
                      </h3>
                 <p
      className="text-gray-600 text-sm font-medium line-clamp-4 mb-3"
      dangerouslySetInnerHTML={{ __html: truncateDescription(blog.description, 200) }}
    />
                      <a
                        href={`/Blog/${blog.id}`}
                        className="text-pink-600 hover:text-pink-700 text-sm font-semibold hover:underline"
                      >
                        Read More
                      </a>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-600 col-span-full py-10 text-base font-medium ">
                  No blogs found for the selected filters.
                </p>
              )}
            </div>

      {/* Pagination Controls */}
{totalPages > 1 && (
  <div className="flex justify-center mt-8 space-x-2 md:hidden">
    {/* Previous Button */}
    <button
      onClick={() => handlePageChange(currentPage - 1)}
      disabled={currentPage === 1}
      className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-200 shadow-sm 
        ${
          currentPage === 1
            ? 'bg-stone-100 text-gray-500 cursor-not-allowed'
            : 'bg-stone-50 text-gray-800 hover:bg-pink-100 hover:text-pink-600'
        }`}
    >
      Prev
    </button>

    {/* Next Button */}
    <button
      onClick={() => handlePageChange(currentPage + 1)}
      disabled={currentPage === totalPages}
      className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-200 shadow-sm
        ${
          currentPage === totalPages
            ? 'bg-stone-100 text-gray-500 cursor-not-allowed'
            : 'bg-stone-50 text-gray-800 hover:bg-pink-100 hover:text-pink-600'
        }`}
    >
      Next
    </button>
  </div>
)}

          {/* Pagination Controls */}
{totalPages > 1 && (
  <div className="hidden md:flex justify-center mt-8 space-x-2">
    {/* Previous Button */}
    <button
      onClick={() => handlePageChange(currentPage - 1)}
      disabled={currentPage === 1}
      className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-200 shadow-sm 
        ${
          currentPage === 1
            ? 'bg-stone-100 text-gray-500 cursor-not-allowed'
            : 'bg-stone-50 text-gray-800 hover:bg-pink-100 hover:text-pink-600'
        }`}
    >
      Prev
    </button>

    {/* Page Numbers */}
    {(() => {
      const pages = [];
      const maxPagesToShow = 1; // Adjust this to control how many page numbers to display
      const startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
      const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

      // Add first page and ellipsis if needed
      if (startPage > 1) {
        pages.push(
          <button
            key={1}
            onClick={() => handlePageChange(1)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-200 shadow-sm
              ${currentPage === 1 ? 'bg-pink-500 text-white' : 'bg-stone-50 text-gray-800 hover:bg-pink-100 hover:text-pink-600'}`}
          >
            1
          </button>
        );
        if (startPage > 2) {
          pages.push(<span key="start-ellipsis" className="px-4 py-2">...</span>);
        }
      }

      // Add page numbers in the range
      for (let page = startPage; page <= endPage; page++) {
        pages.push(
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-200 shadow-sm
              ${
                currentPage === page
                  ? 'bg-pink-500 text-white'
                  : 'bg-stone-50 text-gray-800 hover:bg-pink-100 hover:text-pink-600'
              }`}
          >
            {page}
          </button>
        );
      }

      // Add last page and ellipsis if needed
      if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
          pages.push(<span key="end-ellipsis" className="px-4 py-2">...</span>);
        }
        pages.push(
          <button
            key={totalPages}
            onClick={() => handlePageChange(totalPages)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-200 shadow-sm
              ${
                currentPage === totalPages
                  ? 'bg-pink-500 text-white'
                  : 'bg-stone-50 text-gray-800 hover:bg-pink-100 hover:text-pink-600'
              }`}
          >
            {totalPages}
          </button>
        );
      }

      return pages;
    })()}

    {/* Next Button */}
    <button
      onClick={() => handlePageChange(currentPage + 1)}
      disabled={currentPage === totalPages}
      className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-200 shadow-sm
        ${
          currentPage === totalPages
            ? 'bg-stone-100 text-gray-500 cursor-not-allowed'
            : 'bg-stone-50 text-gray-800 hover:bg-pink-100 hover:text-pink-600'
        }`}
    >
      Next
    </button>
  </div>
)} 
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogsAll;