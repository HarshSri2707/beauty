import React, { useEffect } from 'react';
import { FaAmazon, FaAngleRight, FaGithub, FaGitter, FaInstagram, FaLinkedin, FaMoon, FaSnapchat, FaTwitter, FaYoutube } from 'react-icons/fa';
import { FaHandHoldingDollar } from 'react-icons/fa6';

const AboutUs = () => {
  const partnerIcons = [
    { name: 'Amazon', iconType: FaAmazon },
    { name: 'Snapchat', iconType: FaSnapchat },
    { name: 'Twitter', iconType: FaTwitter },
    { name: 'Instagram', iconType: FaInstagram },
    { name: 'YouTube', iconType: FaYoutube },
    { name: 'Gitter', iconType: FaGitter },
    { name: 'Moon', iconType: FaMoon },
    { name: 'LinkedIn', iconType: FaLinkedin },  
    { name: 'GitHub', iconType: FaGithub },
    { name: 'Finance', iconType: FaHandHoldingDollar },
  ];

 useEffect(() => {
  
     window.scrollTo(0, 0);
  
 });
  const duplicatedIcons = [...partnerIcons, ...partnerIcons];

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen font-sans">
      {/* Sticky Sidebar Navigation */}
      <nav className="fixed left-0 top-1/2 lg:top-1/4 block w-16 bg-white shadow-lg rounded-r-lg py-6 z-10 transform transition-transform duration-500 ease-out">
        <ul className="space-y-6 text-center">
          {["Mission", "Vision", "Partners"].map((item, idx) => (
            <li key={idx}>
              <a href={`#${item.toLowerCase()}`} className="text-gray-600 hover:text-pink-500 transition-colors">
                <FaAngleRight className="w-6 h-6 mx-auto" />
                <span className="text-xs">{item}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Header */}
      <header className="bg-pink-50 py-16" id="intro">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-pink-600 font-serif transform transition-all duration-600 ease-out scale-100 opacity-100 animate-[scaleIn_0.6s_ease-out]">
            Welcome to TheGlamStreet
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Discover the perfect beauty routine tailored to your unique skin and hair concerns.
          </p>
        </div>
      </header>

      {/* Why TheGlamStreet */}
      <section id="whyguid" className="py-16 bg-white">
        <div className="max-w-4xl mx-auto text-center transform transition-all duration-600 ease-out translate-y-0 opacity-100 animate-[slideUp_0.6s_ease-out]">
          <h2 className="text-3xl font-bold text-pink-600 mb-6">Why TheGlamStreet?</h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            At TheGlamStreet, we know that every woman’s beauty journey is unique. That’s why we’ve created a personalized recommendation system that understands your skin type, hair texture, and beauty concerns like acne, dullness, frizz, pigmentation, and more.
            <br /><br />
            Whether you’re looking for solutions to oily skin or want to find the best sulfate-free shampoo for curly hair, we’ve got you covered. Our smart suggestion engine brings you the best-matched skincare, haircare, and makeup products — trusted by dermatologists and real women alike.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section id="mission" className="py-16 bg-pink-50">
        <div className="max-w-3xl mx-auto text-center transform transition-all duration-600 ease-out translate-y-0 opacity-100 animate-[slideUp_0.6s_ease-out]">
          <h2 className="text-3xl font-bold text-pink-600 mb-6">Our Mission</h2>
          <p className="text-gray-700 leading-relaxed mb-1">
            At TheGlamStreet, our mission is to redefine how women discover and use beauty products. We believe that beauty is deeply personal, and every woman deserves a routine that reflects her individuality, her concerns, and her goals — not just trends. That’s why we’re committed to providing personalized, intelligent, and accessible product recommendations for skincare, haircare, and makeup.
          </p>
          <p className="text-gray-700 leading-relaxed mb-1">
            We harness the power of technology and data to understand your unique needs — whether it's managing sensitive skin, combating hair fall, or finding the perfect foundation for your skin tone. Our goal is to remove the guesswork and overwhelm from beauty shopping and replace it with clarity, confidence, and results. TheGlamStreet is more than just a beauty platform — it’s your personal guide, your beauty ally, and your daily dose of self-care wisdom. We're here to help you make informed choices, embrace your natural beauty, and feel radiant every day.
          </p>
        </div>
      </section>

      {/* Vision */}
      <section id="vision" className="py-16">
        <div className="max-w-3xl mx-auto text-center transform transition-all duration-600 ease-out translate-y-0 opacity-100 animate-[slideUp_0.6s_ease-out]">
          <h2 className="text-3xl font-bold text-pink-600 mb-6">Our Vision</h2>
          <p className="text-gray-700 mb-1">
            Our vision is to create a world where beauty feels effortless, inclusive, and deeply personal. We see a future where every woman — regardless of age, background, skin type, or hair texture — has access to beauty recommendations that actually work for her. A future where the beauty industry stops being overwhelming and starts being empowering.
          </p>
          <p className="text-gray-700 mb-1">
            Through innovative algorithms, deep research, and curated partnerships with leading brands, TheGlamStreet aims to simplify the journey to self-care. We want to replace endless scrolling and trial-and-error with smart, concern-based solutions that are rooted in your real needs. Whether you’re looking to brighten dull skin, nourish dry curls, or build a minimalist makeup routine, our platform guides you with clarity and care.
          </p>
          <p className="text-gray-700 mb-1">
            In this evolving beauty landscape, TheGlamStreet strives to be a trusted companion that grows with you — adapting to your changing concerns, celebrating your milestones, and helping you fall in love with your reflection, every single day.
          </p>
        </div>
      </section>

      {/* Partners */}
      <section id="partners" className="py-16 bg-pink-50">
        <h2 className="text-3xl font-bold text-center text-pink-600 mb-8">Our Trusted Partners</h2>
        <div className="relative overflow-hidden py-6">
          <div className="flex items-center animate-[scroll_30s_linear_infinite]">
            {duplicatedIcons.map((partner, index) => {
              const IconComponent = partner.iconType;
              return (
                <div
                  key={index}
                  className="flex-shrink-0 mx-6 flex items-center justify-center hover:scale-110 transition-transform duration-300"
                >
                  <IconComponent className="w-10 h-10 text-pink-500" />
                  <span className="ml-3 text-gray-600 font-medium">{partner.name}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="text-center py-16">
        <div className="transform transition-all duration-600 ease-out scale-100 opacity-100 animate-[scaleIn_0.6s_ease-out]">
          <h2 className="text-2xl font-bold text-pink-600 mb-6">Find Your Perfect Match</h2>
          <p className="text-gray-700 mb-8 max-w-xl mx-auto">
            Join thousands of women using TheGlamStreet to get science-backed product suggestions that fit *you* — your lifestyle, your skin, and your beauty goals.
          </p>
          <a
            href="/products?filter=skincare"
            className="inline-block bg-pink-600 text-white py-3 px-8 rounded-full text-lg font-medium hover:bg-pink-700 transition-all duration-300"
          >
            Start Your Beauty Journey
          </a>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;