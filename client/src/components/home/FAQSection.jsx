import React, { useState } from 'react';
import SectionHeader from '../common/SectionHeader';

/**
 * Single FAQ Accordion Item
 */
const FAQItem = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className="border-b border-gray-100 last:border-0 overflow-hidden">
      <button
        onClick={onClick}
        className="w-full py-6 flex items-center text-left gap-4 group transition-colors duration-500"
      >
        <span className={`transition-transform duration-500 flex-shrink-0 ${isOpen ? 'rotate-180 text-[#7c3aed]' : 'text-gray-400'}`}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </span>
        <span className={`text-lg font-medium transition-colors duration-500 ${isOpen ? 'text-[#7c3aed]' : 'text-gray-700 group-hover:text-gray-900'}`}>
          {question}
        </span>
      </button>

      <div
        className={`grid transition-all duration-500 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100 pb-6' : 'grid-rows-[0fr] opacity-0 pb-0'}`}
      >
        <div className="overflow-hidden">
          <p className="text-gray-500 leading-relaxed max-w-4xl pl-9">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
};

/**
 * FAQ section with multiple accordions
 */
const FAQSection = ({ faqs }) => {
  const [openIndex, setOpenIndex] = useState(0);

  if (!faqs || faqs.length === 0) return null;

  return (
    <section className="mb-24 px-4 max-w-5xl mx-auto">
      <SectionHeader title="F.A.Q" centered />

      <div className="bg-white rounded-3xl p-4 md:p-8 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] border border-gray-50">
        {faqs.map((faq, index) => (
          <FAQItem
            key={index}
            question={faq.question}
            answer={faq.answer}
            isOpen={openIndex === index}
            onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
          />
        ))}
      </div>
    </section>
  );
};

export default FAQSection;

