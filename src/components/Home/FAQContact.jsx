import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const FAQContact = ({ faqs, formData, openIndex, toggle, handleInputChange, handleSubmit }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  // Show only first 4 FAQs
  const displayFaqs = faqs.slice(0, 4);

  return (
    <section ref={ref} className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12">
        
        {/* FAQ Section - Compact */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
        >
          <h2 className="text-3xl font-serif text-slate-900 mb-6">
            Quick Answers
          </h2>
          <div className="space-y-3">
            {displayFaqs.map((faq, index) => (
              <div key={index} className="border-b border-slate-200 pb-3">
                <button
                  onClick={() => toggle(index)}
                  className="w-full flex justify-between items-center text-left py-2"
                >
                  <span className="font-medium text-slate-800 text-sm pr-4">
                    {faq.question}
                  </span>
                  <svg
                    className={`w-4 h-4 text-pink-600 transition-transform flex-shrink-0 ${openIndex === index ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openIndex === index && (
                  <p className="text-gray-600 text-sm mt-2 leading-relaxed">
                    {faq.answer}
                  </p>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Contact Form - Compact */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          className="bg-pink-50 rounded-2xl p-8"
        >
          <h2 className="text-3xl font-serif text-pink-700 mb-6">
            Get in Touch
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-pink-500"
              placeholder="Your Name"
              required
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-pink-500"
              placeholder="Email Address"
              required
            />
            <textarea
              name="message"
              rows="3"
              value={formData.message}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-pink-500 resize-none"
              placeholder="Your Message"
              required
            />
            <button
              type="submit"
              className="w-full py-3 bg-pink-600 hover:bg-pink-700 text-white font-medium rounded-lg transition-colors"
            >
              Send Message
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQContact;