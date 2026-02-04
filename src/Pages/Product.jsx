import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaFilter } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import { ProductData } from '../Data/Product';
import { BlogData } from '../Data/Blog';
import Placeholder from '../assets/placeholder.webp'

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Product = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const query = useQuery();
  const filterKeyword = query.get('filter')?.toLowerCase() || '';
  const navigate = useNavigate();

  // Extract unique attributes
  const categories = [...new Set(ProductData.map((p) => p.category))];
  const skincareConcerns = [
    ...new Set(ProductData.filter((p) => p.category === 'skincare').flatMap((p) => p.concerns)),
  ];
  const haircareConcerns = [
    ...new Set(ProductData.filter((p) => p.category === 'haircare').flatMap((p) => p.concerns)),
  ];
  const allConcerns = [...new Set([...skincareConcerns, ...haircareConcerns])];
  const skintypesHairtypes = [...new Set(ProductData.flatMap((p) => p.skintype_hairtype))];
  const ingredients = [...new Set(ProductData.flatMap((p) => p.ingredients))];

  // State for filters
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedConcern, setSelectedConcern] = useState('');
  const [selectedSkinHairType, setSelectedSkinHairType] = useState('');
  const [selectedIngredient, setSelectedIngredient] = useState('');
  const [maxPrice, setMaxPrice] = useState(1000);
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState('relevance');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // State for dropdown visibility
  const [showSortByDropdown, setShowSortByDropdown] = useState(false);
  const [showSkinHairDropdown, setShowSkinHairDropdown] = useState(false);
  const [showSkincareConcernsDropdown, setShowSkincareConcernsDropdown] = useState(false);
  const [showHaircareConcernsDropdown, setShowHaircareConcernsDropdown] = useState(false);

  // Refs for dropdowns
  const sortByDropdownRef = useRef(null);
  const skinHairDropdownRef = useRef(null);
  const skincareConcernsDropdownRef = useRef(null);
  const haircareConcernsDropdownRef = useRef(null);

  // Handle click outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sortByDropdownRef.current && !sortByDropdownRef.current.contains(event.target)) {
        setShowSortByDropdown(false);
      }
      if (skinHairDropdownRef.current && !skinHairDropdownRef.current.contains(event.target)) {
        setShowSkinHairDropdown(false);
      }
      if (skincareConcernsDropdownRef.current && !skincareConcernsDropdownRef.current.contains(event.target)) {
        setShowSkincareConcernsDropdown(false);
      }
      if (haircareConcernsDropdownRef.current && !haircareConcernsDropdownRef.current.contains(event.target)) {
        setShowHaircareConcernsDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Recently viewed products state
  const [recentlyViewed, setRecentlyViewed] = useState(() => {
    const saved = localStorage.getItem('recentlyViewed');
    return saved ? JSON.parse(saved).slice(0, 3) : [];
  });

  // Initialize based on filter keyword
  useEffect(() => {
    if (filterKeyword) {
      if (categories.includes(filterKeyword)) {
        setSelectedCategory(filterKeyword);
        setSelectedConcern('');
        setSelectedSkinHairType('');
        setSelectedIngredient('');
      } else if (allConcerns.includes(filterKeyword)) {
        setSelectedConcern(filterKeyword);
        setSelectedCategory(skincareConcerns.includes(filterKeyword) ? 'skincare' : 'haircare');
        setSelectedSkinHairType('');
        setSelectedIngredient('');
      } else if (skintypesHairtypes.includes(filterKeyword)) {
        setSelectedSkinHairType(filterKeyword);
        setSelectedCategory(
          ProductData.some((p) => p.skintype_hairtype.includes(filterKeyword) && p.category === 'skincare')
            ? 'skincare'
            : 'haircare'
        );
        setSelectedConcern('');
        setSelectedIngredient('');
      } else if (ingredients.includes(filterKeyword)) {
        setSelectedIngredient(filterKeyword);
        setSelectedCategory('');
        setSelectedConcern('');
        setSelectedSkinHairType('');
      }
    }
  }, [filterKeyword]);

  // Handle product view for recently viewed
  const handleProductView = (product) => {
    const updatedRecent = [product, ...recentlyViewed.filter((p) => p.id !== product.id)].slice(0, 3);
    setRecentlyViewed(updatedRecent);
    localStorage.setItem('recentlyViewed', JSON.stringify(updatedRecent));
  };

  // Create keywords array
  const keywords = [
    ...searchTerm.toLowerCase().split(' ').filter(Boolean),
    ...(filterKeyword ? [filterKeyword] : []),
    ...(selectedCategory ? [selectedCategory.toLowerCase()] : []),
    ...(selectedConcern ? [selectedConcern.toLowerCase()] : []),
    ...(selectedSkinHairType ? [selectedSkinHairType.toLowerCase()] : []),
    ...(selectedIngredient ? [selectedIngredient.toLowerCase()] : []),
  ];

  // Filter products
  const filteredProducts = ProductData.map((product) => {
    const text = [
      product.name,
      product.category,
      product.subcategory || '',
      product.brand || '',
      product.skintype_hairtype.join(' '),
      product.ingredients.join(' '),
      product.concerns.join(', '),
      product.description,
    ]
      .join(' ')
      .toLowerCase();

    const matchCount = keywords.reduce((count, keyword) => (text.includes(keyword) ? count + 1 : count), 0);

    return { ...product, matchCount };
  })
    .filter((product) => {
      return (
        (product.matchCount > 0 || keywords.length === 0) &&
        product.price <= maxPrice &&
        product.rating >= minRating &&
        (!selectedConcern || product.concerns.includes(selectedConcern)) &&
        (!selectedSkinHairType || product.skintype_hairtype.includes(selectedSkinHairType)) &&
        (!selectedIngredient || product.ingredients.includes(selectedIngredient))
      );
    })
    .sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'bestseller') {
        const aIsBestseller = a.tags?.toLowerCase() === 'bestseller';
        const bIsBestseller = b.tags?.toLowerCase() === 'bestseller';
        if (aIsBestseller && !bIsBestseller) return -1;
        if (!aIsBestseller && bIsBestseller) return 1;
        return b.matchCount - a.matchCount; // Fallback to relevance
      }
      if (sortBy === 'newest') {
        const aIsNew = a.tags?.toLowerCase() === 'new';
        const bIsNew = b.tags?.toLowerCase() === 'new';
        if (aIsNew && !bIsNew) return -1;
        if (!aIsNew && bIsNew) return 1;
        return b.matchCount - a.matchCount; // Fallback to relevance
      }
      return b.matchCount - a.matchCount; // Default relevance sort
    });

  // New products (tagged "new")
  const newProducts = ProductData.filter((p) => p.tags?.toLowerCase() === 'new').slice(0, 3);

  // Filter related blogs
  const relatedBlogs = BlogData.filter((blog) => {
    const blogCategory = blog.category.toLowerCase();
    const blogConcern = blog.concern?.toLowerCase() || '';

    if (selectedIngredient) {
      return true;
    } else if (selectedConcern) {
      return blogConcern === selectedConcern.toLowerCase();
    } else if (selectedSkinHairType) {
      const isSkincareType = ProductData.some(
        (p) => p.skintype_hairtype.includes(selectedSkinHairType) && p.category === 'skincare'
      );
      return blogCategory === (isSkincareType ? 'skincare' : 'haircare');
    } else if (selectedCategory) {
      return blogCategory === selectedCategory.toLowerCase();
    } else if (filterKeyword && categories.includes(filterKeyword)) {
      return blogCategory === filterKeyword;
    }
    return categories.includes(blog.category);
  })
    .sort(() => (selectedIngredient ? Math.random() - 0.5 : 0))
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Categories and Filter Button Container */}
        <div className="mb-6 flex flex-col lg:flex-row lg:items-center lg:justify-between">
          {/* Category Images */}
          <div className="flex gap-1 overflow-x-auto pb-2">
            {categories.map((category) => (
              <div
                key={category}
                onClick={() => {
                  setSelectedCategory(category);
                  setSelectedConcern('');
                  setSelectedSkinHairType('');
                  setSelectedIngredient('');
                  navigate(`?filter=${category}`);
                }}
                className={`flex-shrink-0 cursor-pointer rounded-lg px-4 py-1 transition-all duration-200 mx-1 my-1 
                  ${selectedCategory === category ? 'ring-2 ring-pink-500 bg-pink-100' : 'ring-1 ring-gray-200 hover:ring-rose-300'}`}
              >
                <span className="text-stone-800 text-base sm:text-lg md:text-xl capitalize">{category}</span>
              </div>
            ))}
          </div>

          {/* Filter Button */}
          <div className="mt-4 lg:mt-0">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center gap-2 bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition-colors lg:hidden"
            >
              <FaFilter /> Filters
            </button>
          </div>
        </div>

        {/* Filter Dropdown for Mobile */}
        <AnimatePresence>
          {isFilterOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
               className="bg-white rounded-xl shadow-lg p-6 mb-6 overflow-hidden md:w-md lg:absolute top-50 left-240 z-10 lg:hidden block
              max-h-[80vh] overflow-y-auto"
            >
              <div className="space-y-6">
                {/* Skincare Concerns Filter */}
                {selectedCategory === 'skincare' && (
                  <div className="relative" ref={skincareConcernsDropdownRef}>
                    <label className="block text-sm font-medium text-pink-600 mb-2">Skincare Concerns</label>
                    <button
                      onClick={() => setShowSkincareConcernsDropdown(!showSkincareConcernsDropdown)}
                      className="w-full px-4 py-2.5 rounded-md bg-stone-50 shadow-md text-gray-800 text-sm font-semibold flex items-center justify-between hover:bg-pink-100 hover:text-pink-600 transition-colors duration-200"
                    >
                      <span>{selectedConcern ? selectedConcern.split(' ').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') : 'All Concerns'}</span>
                      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {showSkincareConcernsDropdown && (
                      <div className="absolute mt-2 w-full bg-white rounded-md shadow-lg border border-[#E5E5DA] z-10">
                        <button
                          onClick={() => {
                            setSelectedConcern('');
                            navigate(`?filter=`);
                            setShowSkincareConcernsDropdown(false);
                          }}
                          className={`block w-full text-left px-4 py-2 text-sm text-gray-800 hover:bg-pink-100 hover:text-pink-600 ${
                            selectedConcern === '' ? 'bg-pink-100 text-pink-600 font-semibold' : ''
                          }`}
                        >
                          All Concerns
                        </button>
                        {skincareConcerns.map((concern) => (
                          <button
                            key={concern}
                            onClick={() => {
                              setSelectedConcern(concern);
                              navigate(`?filter=${concern}`);
                              setShowSkincareConcernsDropdown(false);
                            }}
                            className={`block w-full text-left px-4 py-2 text-sm text-gray-800 hover:bg-pink-100 hover:text-pink-600 ${
                              selectedConcern === concern ? 'bg-pink-100 text-pink-600 font-semibold' : ''
                            }`}
                          >
                            {concern
                              .split(' ')
                              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                              .join(' ')}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Haircare Concerns Filter */}
                {selectedCategory === 'haircare' && (
                  <div className="relative" ref={haircareConcernsDropdownRef}>
                    <label className="block text-sm font-medium text-pink-600 mb-2">Haircare Concerns</label>
                    <button
                      onClick={() => setShowHaircareConcernsDropdown(!showHaircareConcernsDropdown)}
                      className="w-full px-4 py-2.5 rounded-md bg-stone-50 shadow-md text-gray-800 text-sm font-semibold flex items-center justify-between hover:bg-pink-100 hover:text-pink-600 transition-colors duration-200"
                    >
                      <span>{selectedConcern ? selectedConcern.split(' ').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') : 'All Concerns'}</span>
                      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {showHaircareConcernsDropdown && (
                      <div className="absolute mt-2 w-full bg-white rounded-md shadow-lg border border-[#E5E5DA] z-10">
                        <button
                          onClick={() => {
                            setSelectedConcern('');
                            navigate(`?filter=`);
                            setShowHaircareConcernsDropdown(false);
                          }}
                          className={`block w-full text-left px-4 py-2 text-sm text-gray-800 hover:bg-pink-100 hover:text-pink-600 ${
                            selectedConcern === '' ? 'bg-pink-100 text-pink-600 font-semibold' : ''
                          }`}
                        >
                          All Concerns
                        </button>
                        {haircareConcerns.map((concern) => (
                          <button
                            key={concern}
                            onClick={() => {
                              setSelectedConcern(concern);
                              navigate(`?filter=${concern}`);
                              setShowHaircareConcernsDropdown(false);
                            }}
                            className={`block w-full text-left px-4 py-2 text-sm text-gray-800 hover:bg-pink-100 hover:text-pink-600 ${
                              selectedConcern === concern ? 'bg-pink-100 text-pink-600 font-semibold' : ''
                            }`}
                          >
                            {concern
                              .split(' ')
                              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                              .join(' ')}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Skin/Hair Type Filter */}
                <div className="relative" ref={skinHairDropdownRef}>
                  <label className="block text-sm font-medium text-pink-600 mb-2">Skin/Hair Type</label>
                  <button
                    onClick={() => setShowSkinHairDropdown(!showSkinHairDropdown)}
                    className="w-full px-4 py-2.5 rounded-md bg-stone-50 shadow-md text-gray-800 text-sm font-semibold flex items-center justify-between hover:bg-pink-100 hover:text-pink-600 transition-colors duration-200"
                  >
                    <span>{selectedSkinHairType ? selectedSkinHairType.split(' ').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') : 'All Types'}</span>
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {showSkinHairDropdown && (
                    <div className="absolute mt-2 w-full bg-white rounded-md shadow-lg border border-[#E5E5DA] z-10">
                      <button
                        onClick={() => {
                          setSelectedSkinHairType('');
                          navigate(`?filter=`);
                          setShowSkinHairDropdown(false);
                        }}
                        className={`block w-full text-left px-4 py-2 text-sm text-gray-800 hover:bg-pink-100 hover:text-pink-600 ${
                          selectedSkinHairType === '' ? 'bg-pink-100 text-pink-600 font-semibold' : ''
                        }`}
                      >
                        All Types
                      </button>
                      {skintypesHairtypes.map((type) => (
                        <button
                          key={type}
                          onClick={() => {
                            setSelectedSkinHairType(type);
                            navigate(`?filter=${type}`);
                            setShowSkinHairDropdown(false);
                          }}
                          className={`block w-full text-left px-4 py-2 text-sm text-gray-800 hover:bg-pink-100 hover:text-pink-600 ${
                            selectedSkinHairType === type ? 'bg-pink-100 text-pink-600 font-semibold' : ''
                          }`}
                        >
                          {type
                            .split(' ')
                            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                            .join(' ')}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Price Range */}
                <div>
                  <label className="block text-sm font-medium text-pink-600 mb-2">Max Price: ₹{maxPrice}</label>
                  <input
                    type="range"
                    min="100"
                    max="1000"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(+e.target.value)}
                    className="w-full accent-rose-500"
                  />
                </div>

                {/* Sort By */}
                <div className="relative" ref={sortByDropdownRef}>
                  <label className="block text-sm font-medium text-pink-600 mb-2">Sort By</label>
                  <button
                    onClick={() => setShowSortByDropdown(!showSortByDropdown)}
                    className="w-full px-4 py-2.5 rounded-md bg-stone-50 shadow-md text-gray-800 text-sm font-semibold flex items-center justify-between hover:bg-pink-100 hover:text-pink-600 transition-colors duration-200"
                  >
                    <span>{sortBy.split('-').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</span>
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {showSortByDropdown && (
                    <div className="absolute mt-2 w-full bg-white rounded-md shadow-lg border border-[#E5E5DA] z-10">
                      {['relevance', 'bestseller', 'newest', 'price-low', 'price-high', 'rating'].map((option) => (
                        <button
                          key={option}
                          onClick={() => {
                            setSortBy(option);
                            setShowSortByDropdown(false);
                          }}
                          className={`block w-full text-left px-4 py-2 text-sm text-gray-800 hover:bg-pink-100 hover:text-pink-600 ${
                            sortBy === option ? 'bg-pink-100 text-pink-600 font-semibold' : ''
                          }`}
                        >
                          {option
                            .split('-')
                            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                            .join(' ')}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Two-Column Layout */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Sidebar */}
          <div className="w-1/3 lg:h-full bg-gradient-to-b from-white to-gray-50 rounded-2xl shadow-lg p-6 lg:block hidden">
            <div className="space-y-8">
              {/* Filter Section */}
              <div className="space-y-6">
                {/* Skincare Concerns Filter */}
                {selectedCategory === 'skincare' && (
                  <div className="relative" ref={skincareConcernsDropdownRef}>
                    <label className="block text-sm font-semibold text-rose-600 mb-2">Skincare Concerns</label>
                    <button
                      onClick={() => setShowSkincareConcernsDropdown(!showSkincareConcernsDropdown)}
                      className="w-full px-4 py-2.5 rounded-md bg-stone-50 shadow-md text-gray-800 text-sm font-semibold flex items-center justify-between hover:bg-pink-100 hover:text-pink-600 transition-colors duration-200"
                    >
                      <span>{selectedConcern ? selectedConcern.split(' ').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') : 'All Concerns'}</span>
                      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {showSkincareConcernsDropdown && (
                      <div className="absolute mt-2 w-full bg-white rounded-md shadow-lg border border-[#E5E5DA] z-10">
                        <button
                          onClick={() => {
                            setSelectedConcern('');
                            navigate(`?filter=`);
                            setShowSkincareConcernsDropdown(false);
                          }}
                          className={`block w-full text-left px-4 py-2 text-sm text-gray-800 hover:bg-pink-100 hover:text-pink-600 ${
                            selectedConcern === '' ? 'bg-pink-100 text-pink-600 font-semibold' : ''
                          }`}
                        >
                          All Concerns
                        </button>
                        {skincareConcerns.map((concern) => (
                          <button
                            key={concern}
                            onClick={() => {
                              setSelectedConcern(concern);
                              navigate(`?filter=${concern}`);
                              setShowSkincareConcernsDropdown(false);
                            }}
                            className={`block w-full text-left px-4 py-2 text-sm text-gray-800 hover:bg-pink-100 hover:text-pink-600 ${
                              selectedConcern === concern ? 'bg-pink-100 text-pink-600 font-semibold' : ''
                            }`}
                          >
                            {concern
                              .split(' ')
                              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                              .join(' ')}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Haircare Concerns Filter */}
                {selectedCategory === 'haircare' && (
                  <div className="relative" ref={haircareConcernsDropdownRef}>
                    <label className="block text-sm font-semibold text-rose-600 mb-2">Haircare Concerns</label>
                    <button
                      onClick={() => setShowHaircareConcernsDropdown(!showHaircareConcernsDropdown)}
                      className="w-full px-4 py-2.5 rounded-md bg-stone-50 shadow-md text-gray-800 text-sm font-semibold flex items-center justify-between hover:bg-pink-100 hover:text-pink-600 transition-colors duration-200"
                    >
                      <span>{selectedConcern ? selectedConcern.split(' ').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') : 'All Concerns'}</span>
                      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {showHaircareConcernsDropdown && (
                      <div className="absolute mt-2 w-full bg-white rounded-md shadow-lg border border-[#E5E5DA] z-10">
                        <button
                          onClick={() => {
                            setSelectedConcern('');
                            navigate(`?filter=`);
                            setShowHaircareConcernsDropdown(false);
                          }}
                          className={`block w-full text-left px-4 py-2 text-sm text-gray-800 hover:bg-pink-100 hover:text-pink-600 ${
                            selectedConcern === '' ? 'bg-pink-100 text-pink-600 font-semibold' : ''
                          }`}
                        >
                          All Concerns
                        </button>
                        {haircareConcerns.map((concern) => (
                          <button
                            key={concern}
                            onClick={() => {
                              setSelectedConcern(concern);
                              navigate(`?filter=${concern}`);
                              setShowHaircareConcernsDropdown(false);
                            }}
                            className={`block w-full text-left px-4 py-2 text-sm text-gray-800 hover:bg-pink-100 hover:text-pink-600 ${
                              selectedConcern === concern ? 'bg-pink-100 text-pink-600 font-semibold' : ''
                            }`}
                          >
                            {concern
                              .split(' ')
                              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                              .join(' ')}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Skin/Hair Type Filter */}
                <div className="relative" ref={skinHairDropdownRef}>
                  <label className="block text-sm font-semibold text-rose-600 mb-2">Skin/Hair Type</label>
                  <button
                    onClick={() => setShowSkinHairDropdown(!showSkinHairDropdown)}
                    className="w-full px-4 py-2.5 rounded-md bg-stone-50 shadow-md text-gray-800 text-sm font-semibold flex items-center justify-between hover:bg-pink-100 hover:text-pink-600 transition-colors duration-200"
                  >
                    <span>{selectedSkinHairType ? selectedSkinHairType.split(' ').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') : 'All Types'}</span>
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {showSkinHairDropdown && (
                    <div className="absolute mt-2 w-full bg-white rounded-md shadow-lg border border-[#E5E5DA] z-10">
                      <button
                        onClick={() => {
                          setSelectedSkinHairType('');
                          navigate(`?filter=`);
                          setShowSkinHairDropdown(false);
                        }}
                        className={`block w-full text-left px-4 py-2 text-sm text-gray-800 hover:bg-pink-100 hover:text-pink-600 ${
                          selectedSkinHairType === '' ? 'bg-pink-100 text-pink-600 font-semibold' : ''
                        }`}
                      >
                        All Types
                      </button>
                      {skintypesHairtypes.map((type) => (
                        <button
                          key={type}
                          onClick={() => {
                            setSelectedSkinHairType(type);
                            navigate(`?filter=${type}`);
                            setShowSkinHairDropdown(false);
                          }}
                          className={`block w-full text-left px-4 py-2 text-sm text-gray-800 hover:bg-pink-100 hover:text-pink-600 ${
                            selectedSkinHairType === type ? 'bg-pink-100 text-pink-600 font-semibold' : ''
                          }`}
                        >
                          {type
                            .split(' ')
                            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                            .join(' ')}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Price Range */}
                <div>
                  <label className="block text-sm font-semibold text-rose-600 mb-2">Price Range</label>
                  <input
                    type="range"
                    min="0"
                    max="1000"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(+e.target.value)}
                    className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-rose-400"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>₹100</span>
                    <span>₹1000</span>
                  </div>
                </div>

                {/* Sort By */}
                <div className="relative" ref={sortByDropdownRef}>
                  <label className="block text-sm font-semibold text-rose-600 mb-2">Sort By</label>
                  <button
                    onClick={() => setShowSortByDropdown(!showSortByDropdown)}
                    className="w-full px-4 py-2.5 rounded-md bg-stone-50 shadow-md text-gray-800 text-sm font-semibold flex items-center justify-between hover:bg-pink-100 hover:text-pink-600 transition-colors duration-200"
                  >
                    <span>{sortBy.split('-').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</span>
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {showSortByDropdown && (
                    <div className="absolute mt-2 w-full bg-white rounded-md shadow-lg border border-[#E5E5DA] z-10">
                      {['relevance', 'bestseller', 'newest', 'price-low', 'price-high', 'rating'].map((option) => (
                        <button
                          key={option}
                          onClick={() => {
                            setSortBy(option);
                            setShowSortByDropdown(false);
                          }}
                          className={`block w-full text-left px-4 py-2 text-sm text-gray-800 hover:bg-pink-100 hover:text-pink-600 ${
                            sortBy === option ? 'bg-pink-100 text-pink-600 font-semibold' : ''
                          }`}
                        >
                          {option
                            .split('-')
                            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                            .join(' ')}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* New Products */}
              <div>
                <h2 className="text-md font-semibold text-rose-600 mb-4">New Arrivals</h2>
                {newProducts.length === 0 ? (
                  <p className="text-gray-500 text-sm">No new products available</p>
                ) : (
                  <div className="space-y-4">
                    {newProducts.map((p) => (
                      <div
                        key={p.id}
                        className="flex items-center gap-4 p-2 hover:bg-gray-100 rounded-lg transition-all duration-200"
                           onClick={() => {
                              handleProductView(p);
                              navigate(`/Product/${p.id}`);
                            }}
                      >
                        <img
                          src={p.images[0] || Placeholder}
                          onError={(e) => (e.target.src = Placeholder)}
                          alt={p.name}
                          className="w-14 h-14 object-contain rounded-md"
                        />
                        <div className="flex-1">
                          <h3 className="text-sm font-medium text-gray-800">{p.name}</h3>
                          <p className="text-rose-500 text-sm font-semibold">₹{p.price}</p>
                          <button
                            onClick={() => {
                              handleProductView(p);
                              navigate(`/Product/${p.id}`);
                            }}
                            className="text-rose-600 text-xs font-medium hover:text-rose-700 transition-colors"
                          >
                            View
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Recently Viewed */}
              <div>
                <h2 className="text-md font-semibold text-rose-600 mb-4">Recently Viewed</h2>
                {recentlyViewed.length === 0 ? (
                  <p className="text-gray-500 text-sm">No recently viewed products</p>
                ) : (
                  <div className="space-y-4">
                    {recentlyViewed.map((p) => (
                      <div
                        key={p.id}
                        className="flex items-center gap-4 p-2 hover:bg-gray-100 rounded-lg transition-all duration-200"
                          onClick={() => {
                              handleProductView(p);
                              navigate(`/Product/${p.id}`);
                            }}
                      >
                        <img
                          src={p.images[0]}
                          alt={p.name}
                          className="w-14 h-14 object-contain rounded-md"
                        />
                        <div className="flex-1">
                          <h3 className="text-sm font-medium text-gray-800">{p.name}</h3>
                          <p className="text-rose-500 text-sm font-semibold">₹{p.price}</p>
                          <button
                            onClick={() => {
                              handleProductView(p);
                              navigate(`/Product/${p.id}`);
                            }}
                            className="text-rose-600 text-xs font-medium hover:text-rose-700 transition-colors"
                          >
                            View
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Side: Recommended Products and Blogs */}
          <div className="w-full lg:w-3/4">
            <div className="flex items-center justify-center mb-4">
              <h2 className="lg:text-3xl text-xl font-semibold text-pink-600 mx-4">Explore Products</h2>
            </div>
            {filteredProducts.length === 0 ? (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center text-gray-500 text-lg font-medium"
              >
                No products found
              </motion.p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((p) => (
                  <motion.div
                    key={p.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    viewport={{ once: true }}
                  >
                    <div className="w-full bg-white rounded-lg shadow-md p-4 relative min-h-[350px] flex flex-col justify-between"
                     onClick={() => {
                            handleProductView(p);
                            navigate(`/Product/${p.id}`);
                          }}
                    >
                      {p.tags && (
                        <span className="w-[70px] text-center absolute top-2 right-2 bg-pink-100 text-pink-500 text-xs font-semibold px-2 py-1 rounded">
                          {p.tags}
                        </span>
                      )}
                      <img src={p.images[0]} alt={p.name} className="w-full h-40 object-contain rounded-md" />
                      <div className="mt-3 flex flex-col flex-grow">
                        <p className="text-sm text-gray-500 capitalize">
                          {p.category} | {p.subcategory}
                        </p>
                        <h3 className="text-lg font-semibold">{p.name}</h3>
                        <p className="text-pink-500 text-sm">
                          {'★'.repeat(p.rating)}
                          {'☆'.repeat(5 - p.rating)}
                        </p>
                      </div>
                      <div className="flex justify-between items-center">
                        <p className="text-pink-600 font-semibold">₹{p.price}</p>
                        <button
                          onClick={() => {
                            handleProductView(p);
                            navigate(`/Product/${p.id}`);
                          }}
                          className="bg-pink-600 hover:bg-pink-800 text-sm font-medium text-white px-4 py-2 rounded-md"
                        >
                          View
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {relatedBlogs.length > 0 && (
              <div className="mt-12 hidden lg:block">
                <div className="flex items-center justify-center mb-4">
                  <h2 className="text-3xl font-semibold text-pink-600 mx-4">Related Blogs</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {relatedBlogs.map((blog) => (
                    <motion.div
                      key={blog.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                      viewport={{ once: true }}
                      className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer"
                      onClick={() => navigate(`/Blog/${blog.id}`)}
                    >
                      <img src={blog.image || Placeholder} 
                      alt={blog.title} 
                      onError={(e) => (e.target.src = Placeholder)}
                      className="w-full h-50 object-cover" />
                      <div className="p-5 bg-white">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-1">{blog.title}</h3>
                     <p
  className="text-gray-600 text-sm mb-3 line-clamp-2"
  dangerouslySetInnerHTML={{ __html: blog.description }}
/>
                        <div className="flex justify-between items-center">
                          <p className="text-rose-600 text-sm font-medium">{blog.hashtag}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>
           {/* Scrollable Sections for Small to Medium Screens */}
            <div className="lg:hidden mb-6 mt-4 pt-4 ">
              {/* Recently Viewed (Mobile) */}
              <div className="mb-6">
              {/* Recently Viewed (Mobile) */}
<div className="mb-6">
  <h2 className="text-xl font-semibold text-pink-600 mb-4 text-center">Recently Viewed</h2>
   {recentlyViewed.length === 0 ? (
                  <p className="text-gray-500 text-sm">No recently viewed products</p>
                ) : (
                  <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4">
                    {recentlyViewed.map((p) => (
                      <div
                        key={p.id}
                        className="flex-shrink-0 w-64 bg-white rounded-lg shadow-md p-4 snap-center"
                      >
                        <img
                          src={p.images[0] || Placeholder}
                          onError={(e) => (e.target.src = Placeholder)}
                          alt={p.name}
                          className="w-full h-32 object-contain rounded-md"
                        />
                        <div className="mt-3">
                          <h3 className="text-sm font-medium text-gray-800 line-clamp-1">{p.name}</h3>
                          <p className="text-rose-500 text-sm font-semibold">₹{p.price}</p>
                          <button
                            onClick={() => {
                              handleProductView(p);
                              navigate(`/Product/${p.id}`);
                            }}
                            className="text-rose-600 text-xs font-medium hover:text-rose-700 transition-colors"
                          >
                            View
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
</div>

              
              </div>

              {/* Related Blogs (Mobile) */}
              {relatedBlogs.length > 0 && (
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-pink-600 mb-4 text-center">Related Blogs</h2>
                  <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4">
                    {relatedBlogs.map((blog) => (
                      <motion.div
                        key={blog.id}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4 }}
                        viewport={{ once: true }}
                        className="flex-shrink-0 w-64 bg-white rounded-xl shadow-md overflow-hidden snap-center"
                        onClick={() => navigate(`/Blog/${blog.id}`)}
                      >
                        <img
                          src={blog.image || Placeholder}
                          onError={(e) => (e.target.src = Placeholder)}
                          alt={blog.title}
                          className="w-full h-32 object-cover"
                        />
                        <div className="p-4">
                          <h3 className="text-sm font-semibold text-gray-800 mb-2 line-clamp-1">{blog.title}</h3>
                          <p
                            className="text-gray-600 text-xs mb-3 line-clamp-2"
                            dangerouslySetInnerHTML={{ __html: blog.description }}
                          />
                          <p className="text-rose-600 text-xs font-medium">{blog.hashtag}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* New Arrivals (Mobile) */}
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-pink-600 mb-4 text-center">New Arrivals</h2>
                {newProducts.length === 0 ? (
                  <p className="text-gray-500 text-sm">No new products available</p>
                ) : (
                  <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4">
                    {newProducts.map((p) => (
                      <div
                        key={p.id}
                        className="flex-shrink-0 w-64 bg-white rounded-lg shadow-md p-4 snap-center"
                      >
                        <img
                          src={p.images[0] || Placeholder}
                          onError={(e) => (e.target.src = Placeholder)}
                          alt={p.name}
                          className="w-full h-32 object-contain rounded-md"
                        />
                        <div className="mt-3">
                          <h3 className="text-sm font-medium text-gray-800 line-clamp-1">{p.name}</h3>
                          <p className="text-rose-500 text-sm font-semibold">₹{p.price}</p>
                          <button
                            onClick={() => {
                              handleProductView(p);
                              navigate(`/Product/${p.id}`);
                            }}
                            className="text-rose-600 text-xs font-medium hover:text-rose-700 transition-colors"
                          >
                            View
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Product; 