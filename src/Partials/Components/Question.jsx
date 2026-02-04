import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProductData } from '../../Data/Product';

const SuggestionBlog = () => {
  const navigate = useNavigate();

  // Category and question data
  const categories = ['skincare', 'haircare', 'makeup'];
  const questionsByCategory = {
    skincare: [
      {
        id: 'skinType',
        question: 'What is your skin type?',
        options: ['Oily', 'Dry', 'Acne Prone', 'Combination', 'Sensitive'],
      },
      {
        id: 'skinConcern',
        question: 'What is your main skin concern?',
        options: ['Acne', 'Dryness', 'Hyperpigmentation', 'Sun Protection', 'Redness'],
      },
      {
        id: 'productType',
        question: 'What type of product are you looking for?',
        options: ['Cleanser', 'Moisturizer', 'Sunscreen', 'Toner'],
      },
    ],
    haircare: [
      {
        id: 'hairType',
        question: 'What is your hair type?',
        options: ['Straight', 'Wavy', 'Curly', 'Frizzy'],
      },
      {
        id: 'hairConcern',
        question: 'What is your primary hair concern?',
        options: ['Frizz', 'Dry Hair', 'Dandruff', 'Hair Fall', 'Damage Repair'],
      },
      {
        id: 'productType',
        question: 'Which product are you looking for?',
        options: ['Shampoo', 'Conditioner', 'Hair Oil', 'Leave In'],
      },
    ],
    makeup: [
      {
        id: 'skinType',
        question: 'What is your skin type for makeup products?',
        options: ['Oily', 'Dry', 'Combination', 'Sensitive'],
      },
      {
        id: 'makeupConcern',
        question: 'What is your main makeup goal?',
        options: ['Lip Color', 'Complexion Enhancement', 'Radiance', 'Oil Control'],
      },
      {
        id: 'makeupProduct',
        question: 'Which product are you looking for?',
        options: ['Foundation', 'Lipstick', 'Blush'],
      },
    ],
  };

  // State management
  const [selectedCategory, setSelectedCategory] = useState('skincare');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showProducts, setShowProducts] = useState(false);

  // Get current questions based on category
  const currentQuestions = questionsByCategory[selectedCategory];

  // Handle answer selection
  const handleAnswer = (option) => {
    const currentQuestion = currentQuestions[currentQuestionIndex];
    setAnswers((prev) => {
      const newAnswers = { ...prev, [currentQuestion.id]: option };
    
      return newAnswers;
    });

    setCurrentQuestionIndex((prevIndex) => {
      if (prevIndex < currentQuestions.length - 1) {
        return prevIndex + 1;
      } else {
        setShowProducts(true);
        return prevIndex;
      }
    });
  };

  // Handle category change
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentQuestionIndex(0);
    setAnswers({});
    setShowProducts(false);
   
  };

  // Handle back button
  const handleBack = () => {
    setCurrentQuestionIndex((prevIndex) => Math.max(0, prevIndex - 1));
  };

  // Derive concerns and attributes from answers
  const derivedAttributes = () => {
    const attributes = {
      type: null,
      concern: null,
      productType: null,
    };

    if (selectedCategory === 'skincare') {
      if (answers.skinType) {
        attributes.type = answers.skinType.toLowerCase();
        if (answers.skinType === 'Dry') attributes.concern = 'dryness';
        if (answers.skinType === 'Acne Prone') attributes.concern = 'acne';
      }
      if (answers.skinConcern) attributes.concern = answers.skinConcern.toLowerCase();
      if (answers.productType) attributes.productType = answers.productType.toLowerCase();
    }

    if (selectedCategory === 'haircare') {
      if (answers.hairType) {
        attributes.type = answers.hairType.toLowerCase();
        if (answers.hairType === 'Frizzy') attributes.concern = 'frizz';
        if (answers.hairType === 'Curly') attributes.concern = 'curl definition';
      }
      if (answers.hairConcern) {
        const concernMap = {
          'Dry Hair': 'dry hair',
          'Damage Repair': 'damage repair',
          'Hair Fall': 'hair fall',
          'Dandruff': 'dandruff',
          'Frizz': 'frizz',
        };
        attributes.concern = concernMap[answers.hairConcern] || answers.hairConcern.toLowerCase();
      }
      if (answers.productType) attributes.productType = answers.productType.toLowerCase();
    }

    if (selectedCategory === 'makeup') {
      if (answers.skinType) {
        attributes.type = answers.skinType.toLowerCase();
        if (answers.skinType === 'Dry') attributes.concern = 'lip hydration';
        if (answers.skinType === 'Oily') attributes.concern = 'oil control';
      }
      if (answers.makeupConcern) attributes.concern = answers.makeupConcern.toLowerCase();
      if (answers.makeupProduct) {
        attributes.productType = answers.makeupProduct.toLowerCase();
        if (answers.makeupProduct === 'Lipstick') attributes.concern = 'lip color';
        if (answers.makeupProduct === 'Foundation') attributes.concern = 'uneven skin tone';
        if (answers.makeupProduct === 'Blush') attributes.concern = 'complexion enhancement';
      }
    }

   
    return attributes;
  };

  // Filter products and calculate match count
  const filteredProducts = ProductData.map((product) => {
    const attributes = derivedAttributes();
    let matchCount = 0;

    // Category match (required)
    const categoryMatch = product.category.toLowerCase() === selectedCategory.toLowerCase();
    if (!categoryMatch) return null;

    // Type match
    const typeMatch =
      attributes.type &&
      product.skintype_hairtype.map((t) => t.toLowerCase()).includes(attributes.type);
    if (typeMatch) matchCount++;

    // Concern match
    const concernMatch =
      attributes.concern &&
      product.concerns.map((c) => c.toLowerCase()).includes(attributes.concern);
    if (concernMatch) matchCount++;

    // Product type match
    const productTypeMatch =
      attributes.productType &&
      product.subcategory.toLowerCase() === attributes.productType;
    if (productTypeMatch) matchCount++;

    // Include product if at least one attribute matches
    if (matchCount > 0) {
      return { ...product, matchCount };
    }
    return null;
  })
    .filter((p) => p !== null)
    .sort((a, b) => b.matchCount - a.matchCount); // Sort by match count (descending)

 
  return (
    <div className="bg-white font-poppins  shadow-md inset-shadow-xs mx-4  rounded-3xl overflow-hidden">
      {/* Category Tabs */}
      <nav className="bg-white px-4 py-3 border-b border-pink-200">
        <ul className="flex space-x-4 sm:space-x-6 md:space-x-8 justify-center overflow-x-auto hide-scrollbar">
          {categories.map((category) => (
            <li key={category}>
              <button
                className={`capitalize text-sm sm:text-base md:text-lg font-semibold transition-all duration-300 px-3 py-1 rounded-full ${
                  selectedCategory.toLowerCase() === category.toLowerCase()
                    ? 'bg-pink-200 text-pink-700 shadow-sm'
                    : 'text-gray-600 hover:text-pink-500 hover:bg-pink-50'
                }`}
                onClick={() => handleCategoryChange(category)}
              >
                {category}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Content Area */}
      <div className="px-5 sm:px-8 pt-6 pb-10 flex flex-col md:flex-row gap-6">
        {/* Questionnaire */}
        <div className="md:w-2/3 bg-pink-50 rounded-lg p-4 sm:p-6">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Discover Your {selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Needs
          </h3>
          {!showProducts ? (
            <div>
              <p className="text-gray-600 text-sm sm:text-base mb-3">
                Step {currentQuestionIndex + 1} of {currentQuestions.length}
              </p>
              <h4 className="text-lg font-semibold text-pink-600 mb-4">
                {currentQuestions[currentQuestionIndex].question}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {currentQuestions[currentQuestionIndex].options.map((option) => (
                  <button
                    key={option}
                    className="text-sm sm:text-base text-pink-600 border border-pink-200 rounded-md py-2 px-4 hover:bg-pink-100 transition-colors"
                    onClick={() => handleAnswer(option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
              {currentQuestionIndex > 0 && (
                <button
                  type="button"
                  className="mt-4 text-sm text-pink-500 hover:underline"
                  onClick={handleBack}
                >
                  Back
                </button>
              )}
            </div>
          ) : (
            <div>
              <h4 className="text-lg font-semibold text-pink-600 mb-4">
                Your Personalized Recommendations
              </h4>
              <p className="text-gray-600 text-sm sm:text-base">
                Based on your answers, we’ve selected products tailored to your {selectedCategory} needs.
              </p>
              <button
                type="button"
                className="mt-4 text-sm text-pink-500 hover:underline"
                onClick={() => {
                  setCurrentQuestionIndex(0);
                  setAnswers({});
                  setShowProducts(false);
                }}
              >
                Start Over
              </button>
            </div>
          )}
        </div>

        {/* Products */}
        <div className="md:w-1/3">
          <h3 className="text-2xl font-semibold text-gray-800 mb-5">
            Recommended Products
          </h3>
          <div className="flex flex-nowrap gap-x-4 sm:gap-x-6 overflow-x-auto hide-scrollbar md:flex-col md:overflow-y-auto md:max-h-[250px]">
            {showProducts && filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white p-4 rounded-lg shadow-sm flex items-center md:flex-col flex-shrink-0 w-60 sm:w-64 md:w-full"
                >
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-lg mr-4 md:mr-0 md:mb-3"
                    onError={(e) => {
                      console.error(`Failed to load image for product ${product.id}`);
                      e.target.src = 'https://via.placeholder.com/100';
                    }}
                  />
                  <div className="flex flex-col">
                    <h4 className="text-sm sm:text-base font-semibold text-gray-800">
                      {product.name}
                    </h4>
                    <p className="text-pink-600 font-medium text-sm sm:text-base">
                      ₹{product.price}
                    </p>
                    <a
                      onClick={() => navigate(`/Product/${product.id}`)}
                      className="text-sm text-pink-500 hover:underline hover:cursor-pointer"
                    >
                      View
                    </a>
                  </div>
                </div>
              ))
            ) : showProducts ? (
              <p className="text-gray-500 text-sm">No products match your selections.</p>
            ) : (
              <p className="text-gray-500 text-sm">Complete the questionnaire to see recommendations.</p>
            )}
          </div>
          <button
            className="mt-6 bg-white border border-pink-400 text-pink-600 px-4 py-2 rounded-md hover:bg-pink-100 transition-colors w-full text-sm"
            onClick={() => navigate(`/Products?filter=${encodeURIComponent(selectedCategory)}`)}
          >
            View All Products
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuggestionBlog;