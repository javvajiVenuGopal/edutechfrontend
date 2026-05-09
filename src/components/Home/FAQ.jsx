import React, { useState } from "react";

const faqData = [
  {
    category: "For Students & Parents (Seekers)",
    questions: [
      {
        q: "Is my ₹99 safe if the Senior doesn't pick up?",
        a: "Yes, 100%. If the Senior doesn't join the call, your money stays safe. You can either book another Senior or request a full refund by emailing support@exameets.in.",
      },
      {
        q: "Can the Senior see my phone number or real name?",
        a: "No. Calls are connected privately. Your phone number and real name are never shown. You stay completely anonymous.",
      },
      {
        q: "How do I know the Senior is telling the truth?",
        a: "Every SeniorGuide is verified using their College ID. After each call, you can rate them. If anyone shares misleading information, they are removed from the platform.",
      },
      {
        q: "What should I ask during the 15-minute call?",
        a: "You can ask about placements, hostel food quality, faculty strictness, campus facilities like Wi-Fi, labs, and real student experiences.",
      },
      {
        q: "Can I record the call?",
        a: "No. Recording is not allowed for privacy reasons. Please keep a notebook ready to note important details.",
      },
    ],
  },
  {
    category: "For College Students (SeniorGuides)",
    questions: [
      {
        q: "When will I receive my ₹50 for the call?",
        a: "After the 15-minute session ends, earnings are added to your Exameets wallet. You can withdraw them to your UPI account once minimum balance is reached.",
      },
      {
        q: "Will my college find out that I am sharing 'Brutal Truths'?",
        a: "No. You use an Alias (nickname). As long as you don't reveal your identity during the call, your college will not know it is you.",
      },
      {
        q: "What if the Seeker is rude or asks for my personal Instagram/WhatsApp?",
        a: "You can end the call immediately and report the user. We follow a zero‑tolerance harassment policy. Never share personal contact details.",
      },
      {
        q: "Do I have to be 'Live' all day to get calls?",
        a: "No. You can switch your availability ON whenever you are free and receive calls only when convenient.",
      },
    ],
  },
  {
    category: "For Ambassadors",
    questions: [
      {
        q: "How do I track my ₹5 royalties?",
        a: "Your dashboard shows real‑time updates whenever a referred Senior completes a call and your ₹5 royalty is credited.",
      },
      {
        q: "Is there a limit to how many Seniors I can refer?",
        a: "No limit. The more Seniors you refer, the more passive income you earn monthly.",
      },
      {
        q: "What if a Senior I referred gets banned for lying?",
        a: "If a referred Senior is banned for violating rules, future royalties from their calls will stop. Always refer honest Seniors.",
      },
    ],
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  let counter = 0;

  return (
    <div className="min-h-screen mt-30 bg-gradient-to-br from-gray-50 via-white to-gray-100 px-6 py-12 animate-fade-in">
      <div className="max-w-4xl mx-auto">
        {/* Animated Header */}
        <div className="text-center mb-12 animate-slide-down">
          <div className="inline-block mb-4 animate-scale-in">
            <span className="bg-gradient-to-r from-orange-500 to-orange-600 text-white text-sm font-semibold px-4 py-1 rounded-full">
              Got Questions?
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
            Frequently Asked Questions
          </h1>
          <p className="text-gray-600 mt-2 animate-fade-in delay-200">
            Everything you need to know about Exameets
          </p>
        </div>

        {/* FAQ Sections */}
        <div>
          {faqData.map((section, sectionIndex) => (
            <div
              key={sectionIndex}
              className="mb-10 animate-slide-up"
              style={{ animationDelay: `${sectionIndex * 0.1}s` }}
            >
              <h2 className="text-2xl font-semibold text-gray-800 mb-5 pb-2 border-b-2 border-orange-500 inline-block transition-transform duration-300 hover:translate-x-2">
                {section.category}
              </h2>

              {section.questions.map((item, i) => {
                const index = counter++;
                const isOpen = openIndex === index;
                const isHovered = hoveredIndex === index;

                return (
                  <div
                    key={i}
                    className="mb-4 animate-fade-in-right"
                    style={{ animationDelay: `${i * 0.05}s` }}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    <div
                      className={`bg-white rounded-xl shadow-sm transition-all duration-300 ${
                        isHovered ? "shadow-lg shadow-orange-500/10" : ""
                      } ${isOpen ? "border-l-4 border-orange-500" : "border-l-4 border-transparent"}`}
                    >
                      <button
                        onClick={() => toggleFAQ(index)}
                        className="w-full text-left px-6 py-5 font-medium flex justify-between items-center gap-4 group"
                      >
                        <span className="text-gray-800 text-base md:text-lg flex-1 transition-colors duration-300 group-hover:text-orange-600">
                          {item.q}
                        </span>
                        <span
                          className={`text-orange-500 text-2xl font-bold min-w-[24px] transition-transform duration-300 ${
                            isOpen ? "rotate-180" : "rotate-0"
                          }`}
                        >
                          {isOpen ? "−" : "+"}
                        </span>
                      </button>

                      <div
                        className={`overflow-hidden transition-all duration-300 ease-in-out ${
                          isOpen ? "max-h-96" : "max-h-0"
                        }`}
                      >
                        <div className="px-6 pb-5 pt-2 text-gray-600 border-t border-gray-100">
                          <div className="flex gap-3 animate-slide-in">
                          
                            <p className="leading-relaxed">{item.a}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        {/* Animated CTA Section */}
        <div className="text-center mt-12 bg-gradient-to-r from-orange-50 to-white shadow-xl rounded-2xl p-8 border border-orange-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl animate-fade-in-up">
        
          <h3 className="text-2xl font-semibold text-gray-800 mb-2">
            Still have a question?
          </h3>
          <p className="text-gray-600 mb-4">
            We're here to help you 6 days a week
          </p>
          <a
            href="mailto:support@exameets.in"
            className="inline-flex items-center gap-2 bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:bg-orange-600 hover:scale-105 hover:shadow-lg active:scale-95"
          >
        
            support@exameets.in
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1 animate-pulse-x">
              →
            </span>
          </a>
          <p className="text-xs text-gray-500 mt-3">
            Mon–Sat, 9 AM to 9 PM • Response within 24 hours
          </p>
        </div>
      </div>

      {/* Add this style tag for custom Tailwind animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes scaleIn {
          from {
            transform: scale(0);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
        
        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes bounceSlow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes pulseX {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(5px); }
        }
        
        .animate-fade-in { animation: fadeIn 0.6s ease-out; }
        .animate-slide-down { animation: slideDown 0.6s ease-out; }
        .animate-slide-up { animation: slideUp 0.5s ease-out forwards; opacity: 0; }
        .animate-scale-in { animation: scaleIn 0.5s ease-out; }
        .animate-fade-in-right { animation: fadeInRight 0.4s ease-out forwards; opacity: 0; }
        .animate-slide-in { animation: slideIn 0.3s ease-out; }
        .animate-fade-in-up { animation: slideUp 0.5s ease-out 0.2s forwards; opacity: 0; }
        .animate-bounce-slow { animation: bounceSlow 2s ease-in-out infinite; }
        .animate-pulse-x { animation: pulseX 1.5s ease-in-out infinite; }
        
        .delay-200 { animation-delay: 0.2s; }
        
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </div>
  );
}
