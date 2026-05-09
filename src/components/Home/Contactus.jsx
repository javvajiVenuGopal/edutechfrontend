import React, { useState } from "react";

export default function ContactUs() {
  const [hoveredCard, setHoveredCard] = useState(null);

  const supportChannels = [
    {
      title: "Customer Support",
      description: "Help with ₹99 bookings, payment issues, or technical problems.",
      email: "support@exameets.in",
    },
    {
      title: "SeniorGuide & Ambassador Relations",
      description: "Student registrations, Ambassador program details, or College ID verification support.",
      email: "seniorguide.exameets@gmail.com",
    },
    {
      title: "General Inquiries",
      description: "Corporate partnerships, feedback, or general business communication.",
      email: "exameets@gmail.com",
    },
  ];

  return (
    <div className="min-h-screen mt-30 bg-gradient-to-br from-gray-50 via-white to-gray-100 px-6 py-12 animate-fade-in">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 animate-slide-down">
          <div className="inline-block mb-4 animate-scale-in">
            <span className="bg-gradient-to-r from-orange-500 to-orange-600 text-white text-sm font-semibold px-4 py-1 rounded-full tracking-wide">
              CONTACT US
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-4">
            Get in Touch with Exameets
          </h1>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto animate-fade-in delay-200">
            We are committed to supporting students, parents, and SeniorGuides.
            Reach out through the appropriate channel below for quick assistance.
          </p>
        </div>

        {/* Support Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {supportChannels.map((channel, index) => (
            <div
              key={index}
              className={`bg-white rounded-2xl p-6 shadow-sm transition-all duration-300 animate-slide-up
                ${hoveredCard === index ? 'shadow-2xl -translate-y-2' : 'hover:shadow-xl hover:-translate-y-1'}
                border-l-4 ${hoveredCard === index ? 'border-orange-500' : 'border-transparent'}`}
              style={{ animationDelay: `${index * 0.1}s` }}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="mb-3">
               
                <h2 className="text-xl  font-semibold text-orange-500">
                  {channel.title}
                </h2>
              </div>
              <p className="text-gray-600 mb-4 leading-relaxed text-sm">
                {channel.description}
              </p>
              <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a
                  href={`mailto:${channel.email}`}
                  className="font-medium text-gray-700 hover:text-orange-500 transition-colors duration-300 group inline-flex items-center gap-1 text-sm"
                >
                  {channel.email}
                  <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Operating Hours */}
        <div className="bg-white rounded-2xl p-8 shadow-sm mb-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 animate-slide-up delay-300">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-gray-800">
              Operating Hours
            </h2>
          </div>
          <div className="space-y-2 ml-2">
            <p className="text-gray-700 flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              Monday – Saturday: <span className="font-semibold">9:00 AM to 9:00 PM (IST)</span>
            </p>
            <p className="text-gray-700 flex items-center gap-2">
              <span className="w-2 h-2 bg-red-500 rounded-full"></span>
              Sunday: <span className="font-semibold">Closed</span>
            </p>
            <div className="mt-3 p-3 bg-orange-50 rounded-lg">
              <p className="text-gray-600 text-sm flex items-center gap-2">
                <span className="text-orange-500">●</span>
                We aim to respond within 2–4 business hours during working time.
              </p>
            </div>
          </div>
        </div>

        {/* Policies */}
        <div className="bg-white rounded-2xl p-8 shadow-sm mb-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 animate-slide-up delay-400">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h18M5 5v14a2 2 0 002 2h10a2 2 0 002-2V5" />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-gray-800">
              Support & Safety Policies
            </h2>
          </div>
          <div className="space-y-5 ml-2">
            <div className="group">
              <div className="flex items-start gap-3 p-3 rounded-lg transition-all duration-300 group-hover:bg-orange-50">
                <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-3 h-3 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">Payment Security</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    If there is any issue during your ₹99 UPI transaction, email support@exameets.in with your Transaction ID for quick resolution.
                  </p>
                </div>
              </div>
            </div>
            <div className="group">
              <div className="flex items-start gap-3 p-3 rounded-lg transition-all duration-300 group-hover:bg-orange-50">
                <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-3 h-3 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">Data Privacy</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Exameets never shares contact details between Seekers and SeniorGuides. All communication stays secure and anonymous.
                  </p>
                </div>
              </div>
            </div>
            <div className="group">
              <div className="flex items-start gap-3 p-3 rounded-lg transition-all duration-300 group-hover:bg-orange-50">
                <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-3 h-3 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">Verification</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Every SeniorGuide goes through manual College ID verification before being listed. Pending approvals are communicated via email.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Digital Presence */}
        <div className="bg-gradient-to-r from-gray-50 to-white rounded-2xl p-8 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 animate-slide-up delay-500 text-center">
          <div className="inline-block mb-4">
          
          </div>
          <h2 className="text-2xl font-semibold text-orange-500 mb-3">
            Digital Presence
          </h2>
          <p className="text-gray-600 mb-5">
            Stay updated with the latest announcements from Exameets.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#" className="group inline-flex items-center justify-center gap-3 px-6 py-3 bg-white rounded-xl shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451c.979 0 1.771-.773 1.771-1.729V1.729C24 .774 23.204 0 22.225 0z"/>
                </svg>
              </div>
              <div className="text-left">
                <p className="text-xs text-gray-500">LinkedIn</p>
                <p className="font-medium text-gray-800 group-hover:text-orange-500 transition-colors">
                  Exameets EduNexus
                </p>
              </div>
            </a>
            <a href="#" className="group inline-flex items-center justify-center gap-3 px-6 py-3 bg-white rounded-xl shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <div className="w-8 h-8 bg-pink-50 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-pink-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM12 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
              </div>
              <div className="text-left">
                <p className="text-xs text-gray-500">Instagram</p>
                <p className="font-medium text-gray-800 group-hover:text-orange-500 transition-colors">
                  @seniorguide.exameets
                </p>
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* CSS Animations */}
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
        
        .animate-fade-in { animation: fadeIn 0.6s ease-out; }
        .animate-slide-down { animation: slideDown 0.6s ease-out; }
        .animate-slide-up { animation: slideUp 0.5s ease-out forwards; opacity: 0; }
        .animate-scale-in { animation: scaleIn 0.5s ease-out; }
        
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-400 { animation-delay: 0.4s; }
        .delay-500 { animation-delay: 0.5s; }
        
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </div>
  );
}
