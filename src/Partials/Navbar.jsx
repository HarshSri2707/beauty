import React, { useState, useRef, useEffect } from 'react';
import { BsXCircle } from 'react-icons/bs';
import { FaSearch } from 'react-icons/fa';
import { PiSignIn } from 'react-icons/pi';
import { SlLogin, SlLogout } from 'react-icons/sl';
import { MdMenu } from 'react-icons/md';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { ProductData } from '../Data/Product';
import { BlogData } from '../Data/Blog';

const Navbar = () => {
 
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const [sidebarCategoryOpen, setSidebarCategoryOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const categoryRef = useRef(null);
   const [selectedItem, setSelectedItem] = useState(null);
  
  const navigate = useNavigate();
const [isScrolled, setIsScrolled] = useState(false);

const desktopSearchRef = useRef(null);
const mobileSearchRef = useRef(null);

  // Handle outside clicks for category and search dropdowns
useEffect(() => {
  const handleScroll = () => {
    setIsScrolled(window.scrollY > 50);
  };

const handleClickOutside = (event) => {
  if (
    (desktopSearchRef.current && !desktopSearchRef.current.contains(event.target)) &&
    (mobileSearchRef.current && !mobileSearchRef.current.contains(event.target))
  ) {
    setShowSearchDropdown(false);
  }

  if (categoryRef.current && !categoryRef.current.contains(event.target)) {
    setCategoryDropdownOpen(false);
    setSidebarCategoryOpen(false);
  }
};


  window.addEventListener('scroll', handleScroll);
  document.addEventListener('mousedown', handleClickOutside);

  // Initial scroll state in case user refreshes mid-scroll
  handleScroll();

  return () => {
    window.removeEventListener('scroll', handleScroll);
    document.removeEventListener('mousedown', handleClickOutside);
  };
}, []);

  // Search logic for products and blogs
  useEffect(() => {
    if (!searchTerm.trim()) {
      setSearchResults([]);
      setShowSearchDropdown(false);
      return;
    }

    const lowerSearchTerm = searchTerm.toLowerCase();

    // Filter products
    const productResults = ProductData.filter((product) => {
      const text = [
        product.name,
        product.category,
        product.subcategory || "",
        product.brand || "",
        product.ingredients.join(" "),
        product.concerns.join(" "),
        product.description,
      ].join(" ").toLowerCase();
      return text.includes(lowerSearchTerm);
    }).map((product) => ({
      type: 'product',
      id: product.id,
      label: `${product.name}`,
      image: product.images && product.images[0] ? product.images[0] : null,
      navigateTo: `/product/${(product.id)}`,
      //navigateTo: `/Products?filter=${encodeURIComponent(product.name)}`,
    }));

    // Filter blogs
    const blogResults = BlogData.filter((blog) => {
      const text = [
        blog.title,
        blog.description,
        blog.category,
        blog.concern,
        blog.hashtag,
      ].join(" ").toLowerCase();
      return text.includes(lowerSearchTerm);
    }).map((blog) => ({
      type: 'blog',
      id: blog.id,
      label: `Blog: ${blog.title}`,
      image: blog.image || null,
      navigateTo: `/Blog/${blog.id}`,
    }));

    // Combine and limit results
    const combinedResults = [...productResults, ...blogResults].slice(0, 10); // Limit to 10 results
    setSearchResults(combinedResults);
    setShowSearchDropdown(combinedResults.length > 0);
  }, [searchTerm]);

   const handleItemClick = (item) => {
    setSelectedItem(item);
    setCategoryDropdownOpen(false);
    navigate(`/Products?filter=${encodeURIComponent(item)}`);
  };
  const categoryData = {
    Skincare: ["Moisturizer", "Cleanser", "Sunscreen", "Toner"],
    Makeup: ["Lipstick", "Foundation", "Blush"],
    SkinType: ["Oily Skin", "Dry Skin", "Acne-Prone"],
    HairType: ["Curly", "Wavy", "Straight"],
    Haircare: ["Shampoo", "Conditioner", "Leave-in"],
    Concerns: [
      "Acne", "Anti-aging", "Clogged pores",
      "Curl definition", "Damage repair", "Dehydration", "Dry hair",
      "Dryness", "Frizz", "Hyperpigmentation",
      "Lip hydration", "Oil control", "Radiance",
      "Sun protection", "Uneven skin tone"
    ],
    Ingredients: [
      "Aloe Vera", "Hyaluronic Acid", "Salicylic Acid", "Zinc Oxide",
      "Coconut Oil", "Shea Butter", "Neem Extract", "Vitamin E"
    ],
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

 const handleSelectOption = (result) => {
  
  setSearchTerm("");
  setSearchResults([]);
  setShowSearchDropdown(false);
  navigate(result.navigateTo);
};

  const handleLogout = () => setIsLoggedIn(false);
  const handleLogin = () => setIsLoggedIn(true);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const navLinks = [
    { id: "blog", Label: "Guide", Link: "/Blog" },
    { id: "about", Label: "About us", Link: "/about" },
  ];

  return (
 <div>
 
     <nav className={`flex items-center justify-between  py-3 lg:w-full lg:fixed top-0 z-100 bg-pink-500 lg-border border-pink-600 px-6
      ${isScrolled ? 'blurred' : ''}`}>
        {/* Mobile Layout: Hamburger then Logo */}
        <div className="flex items-center lg:hidden">
          <button
            className="text-white mr-4"
            onClick={toggleSidebar}
            aria-label="Toggle menu"
          >
            {isSidebarOpen ? <BsXCircle size={24} /> : <MdMenu size={24} />}
          </button>
        </div>

        {/* Desktop Layout: Logo then Navlinks */}
        <div className="hidden lg:flex items-center gap-8">
          <NavLink to="/" className="text-2xl font-semibold text-white
           ">
            TheGlamStreet
          </NavLink>
          <ul className="flex items-center gap-6 text-white
           font-medium text-lg ml-50 ">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `flex items-center gap-1 px-1 rounded ${
                    isActive ? "text-white font-semibold" : "text-white hover:bg-pink-600/50"
                  }`
                }
              >
                Home
              </NavLink>
            </li>

            {/* Category Dropdown */}
            <li className="relative">
              <button
                onClick={() => setCategoryDropdownOpen(!categoryDropdownOpen)}
                className="flex items-center gap-1 text-white
                 hover:bg-pink-600/50
                px-1 rounded"
              >
                Product
                <span className="text-xs mt-[1px]">
                  {categoryDropdownOpen ? (
                    <svg className="w-3 h-3" viewBox="0 0 20 20" fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M5.23 12.21a.75.75 0 001.06.02L10 8.477l3.71 3.753a.75.75 0 001.08-1.04l-4.25-4.3a.75.75 0 00-1.08 0l-4.25 4.3a.75.75 0 00-.02 1.06z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <svg className="w-3 h-3" viewBox="0 0 20 20" fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M14.77 7.79a.75.75 0 00-1.06-.02L10 11.523 6.29 7.77a.75.75 0 00-1.08 1.04l4.25 4.3a.75.75 0 001.08 0l4.25-4.3a.75.75 0 00.02-1.06z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </span>
              </button>
              {categoryDropdownOpen && (
        <div
          ref={categoryRef}
          className="absolute top-full left-0 bg-pink-50 shadow-lg border border-pink-200 p-6 grid grid-cols-4 grid-rows-2 gap-6 z-50 min-w-[800px] rounded-md"
        >
          <div className="row-span-2 pr-6 border-r border-pink-200">
            <h4 className="font-semibold text-pink-900 mb-2">Concerns</h4>
            <ul className="space-y-1">
              {categoryData.Concerns.map((item) => (
                <li key={item} className="relative group">
                  <button
                    onClick={() => handleItemClick(item)}
                    className={`text-sm text-pink-600 hover:text-pink-500 transition-colors ${
                      selectedItem === item ? 'underline underline-offset-2 decoration-1 decoration-pink-500' : ''
                    }`}
                  >
                    {item}
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left"></span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
          {Object.entries(categoryData)
            .filter(([title]) => title !== "Concerns")
            .map(([title, items], index) => (
              <div
                key={title}
                className={`pr-6 ${index !== 2 && index !== 5 ? 'border-r border-pink-200' : ''}`}
              >
                <h4 className="font-semibold text-pink-900">{title}</h4>
                <ul className="space-y-1">
                  {items.map((item) => (
                    <li key={item} className="relative group">
                      <button
                        onClick={() => handleItemClick(item)}
                        className={`text-sm text-pink-600 hover:text-pink-500 transition-colors ${
                          selectedItem === item ? 'underline underline-offset-2 decoration-1 decoration-pink-500' : ''
                        }`}
                      >
                        {item}
                        <span className="absolute bottom-0 left-0 w-full h-[2px] bg-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left"></span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
        </div>
      )}
            </li>

            {navLinks.map((item) => (
              <li key={item.id}>
                <NavLink
                  to={item.Link}
                  className={({ isActive }) =>
                    `flex items-center gap-1 px-1 rounded ${
                      isActive ? "text-white font-semibold" : "text-white hover:bg-pink-600/50"
                    }`
                  }
                >
                  {item.Label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Sidebar */}
        <div
          className={`fixed top-0 left-0 h-full w-64 bg-pink-50
            shadow-lg transform ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 ease-in-out lg:hidden z-50`}
        >
          <div className="flex justify-between p-4">
            <NavLink to="/" className="text-xl font-bold text-pink-600 ">
              TheGlamStreet
            </NavLink>
            <button onClick={toggleSidebar} className="text-pink-800">
              <BsXCircle size={18} />
            </button>
          </div>
          <ul className="flex flex-col gap-4 p-4 text-pink-700 font-medium text-lg">
            <li>
              <NavLink
                to="/"
                onClick={toggleSidebar}
                className={({ isActive }) =>
                  isActive
                    ? "text-pink-600 font-bold block p-2 rounded"
                    : "hover:bg-pink-200 block p-2 rounded"
                }
              >
                Home
              </NavLink>
            </li>

            <li>
              <button
                onClick={() => setSidebarCategoryOpen(!sidebarCategoryOpen)}
                className="flex justify-between items-center w-full p-2 hover:bg-pink-200 rounded font-semibold"
              >
                Product
                <span className="ml-2">
                  {sidebarCategoryOpen ? (
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                    </svg>
                  ) : (
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                </span>
              </button>

              {sidebarCategoryOpen && (
                <div className="pl-4 mt-2 max-h-64 overflow-y-auto border-l border-pink-200">
                  {Object.entries(categoryData).map(([category, subItems]) => (
                    <div key={category} className="mb-3">
                      <h5 className="font-semibold text-pink-900">{category}</h5>
                      <ul className="ml-3 mt-1 space-y-1">
                        {subItems.map((subItem) => (
                          <li key={subItem}>
                            <button
                              onClick={() => {
                                setIsSidebarOpen(false);
                                setSidebarCategoryOpen(false);
                                navigate(`/Products?filter=${encodeURIComponent(subItem)}`);
                              }}
                              className="text-sm text-pink-700 hover:text-pink-500 w-full text-left"
                            >
                              {subItem}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </li>

            {navLinks
              .filter((item) => item.id !== "home")
              .map((item) => (
                <li key={item.id}>
                  <NavLink
                    to={item.Link}
                    onClick={toggleSidebar}
                    className={({ isActive }) =>
                      isActive
                        ? "text-pink-600 font-bold block p-2 rounded"
                        : "hover:bg-pink-200 block p-2 rounded"
                    }
                  >
                    {item.Label}
                  </NavLink>
                </li>
              ))}
          </ul>
        </div>

        {isSidebarOpen && (
          <div className="fixed inset-0 bg-black/50 md:hidden z-40" onClick={toggleSidebar}></div>
        )}

        {/* Right Controls: Search and Auth Buttons */}
        <div className="flex items-center gap-5">
        <div>
            <div className="hidden md:flex items-center gap-2 flex-1 p-2 bg-pink-50 hover:bg-pink-100 border rounded-md border-pink-200 hover:border-pink-300 relative"  ref={desktopSearchRef}>
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={handleSearchChange}
            className="bg-transparent outline-none text-pink-900 placeholder-pink-900 text-sm w-64"
          />
          <button>
            <FaSearch className="text-pink-800" />
          </button>
          {showSearchDropdown && (
            <div className="absolute top-full left-0 w-full bg-pink-50 shadow-lg border border-pink-200 rounded-md mt-1 z-[9999] max-h-60 overflow-y-auto hide-scrollbar">
              {searchResults.length > 0 ? (
                searchResults.map((result) => (
                  <button
  key={`${result.type}-${result.id}`}
  onClick={(e) => {
    e.stopPropagation();
    handleSelectOption(result);
  }}
  className="flex items-center w-full text-left px-4 py-2 text-sm text-pink-700 hover:bg-pink-100 hover:text-pink-500"
>
  {result.image && (
    <img
      src={result.image}
      alt={result.label}
      className="w-8 h-8 object-cover rounded mr-2"
    />
  )}
  <span>{result.label}</span>
</button>
                ))
              ) : (
                <div className="px-4 py-2 text-sm text-pink-500">No results found</div>
              )}
            </div>
          )}
        </div>
        </div>

         
        </div>
      </nav>
    {/* Mobile Search */}
      <div className="flex md:hidden px-6 py-2 bg-white  shadow-lg
       border-b border-pink-200">
        <div className="flex items-center gap-2 flex-1 p-2 bg-white
         
         border rounded-md border-pink-200 hover:border-pink-300 relative" ref={mobileSearchRef}>
          <input
            type="text"
            placeholder="Search products & blogs..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="bg-transparent outline-none text-pink-900 placeholder-pink-900 text-sm w-full"
          />
          <button>
            <FaSearch className="text-pink-800" />
          </button>
          {showSearchDropdown && (
            <div className="absolute top-full left-0 w-full bg-pink-50 shadow-lg border border-pink-200 rounded-md mt-1 z-50 max-h-60 overflow-y-auto hide-scrollbar">
              {searchResults.length > 0 ? (
                searchResults.map((result) => (
                  <button
  key={`${result.type}-${result.id}`}
  onClick={(e) => {
    e.stopPropagation();
    handleSelectOption(result);
  }}
  className="flex items-center w-full text-left px-4 py-2 text-sm text-pink-700 hover:bg-pink-100 hover:text-pink-500"
>
  {result.image && (
    <img
      src={result.image}
      alt={result.label}
      className="w-8 h-8 object-cover rounded mr-2"
    />
  )}
  <span>{result.label}</span>
</button>
                ))
              ) : (
                <div className="px-4 py-2 text-sm text-pink-500">No results found</div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;