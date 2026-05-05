import { Link } from "react-router-dom";
import { Star, Phone, Calendar, ChevronRight, Shield, Users, Award, Sparkles, CheckCircle, TrendingUp, Clock, Video, MessageCircle } from "lucide-react";

const guides = [
  { 
    id: "SG-10234", 
    branch: "Computer Science", 
    year: "PhD Scholar", 
    rating: 4.9, 
    calls: 284, 
    college: "IIT Delhi", 
    experience: "8+ years", 
    price: 99,
    badge: "Top Rated",
    verified: true,
    languages: ["English", "Hindi"],
    responseTime: "< 1 hour"
  },
  { 
    id: "SG-10456", 
    branch: "Electronics Engineering", 
    year: "Research Scholar", 
    rating: 4.8, 
    calls: 342, 
    college: "NIT Trichy", 
    experience: "7+ years", 
    price: 99,
    badge: "Expert",
    verified: true,
    languages: ["English", "Tamil"],
    responseTime: "< 2 hours"
  },
  { 
    id: "SG-10789", 
    branch: "Mechanical Engineering", 
    year: "Final Year", 
    rating: 4.9, 
    calls: 412, 
    college: "BITS Pilani", 
    experience: "6+ years", 
    price: 99,
    badge: "Most Booked",
    verified: true,
    languages: ["English", "Hindi"],
    responseTime: "< 1 hour"
  },
];

function SeniorGuide() {
  return (
    <div className="py-24" style={{ backgroundColor: "#fffbed" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-5 shadow-sm" style={{ backgroundColor: "#ffebdd" }}>
            <Sparkles size={14} style={{ color: "#ff6b35" }} />
            <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: "#ff6b35" }}>Trusted by 5000+ Students</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: "#545454" }}>
            Learn from <span style={{ color: "#ff6b35", position: "relative" }}>Top College Seniors
              <svg className="absolute -bottom-2 left-0 w-full" height="4" viewBox="0 0 200 4" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 2 L200 2" stroke="#ff6b35" strokeWidth="3" strokeDasharray="6 4" fill="none"/>
              </svg>
            </span>
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg">
            Connect with verified guides who have successfully navigated the same path you're on
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-16">
          <div className="bg-white rounded-2xl p-5 text-center shadow-sm hover:shadow-md transition-all duration-300 group" style={{ border: "1px solid #ffebdd" }}>
            <div className="w-12 h-12 rounded-xl mx-auto mb-3 flex items-center justify-center transition-all duration-300 group-hover:scale-110" style={{ backgroundColor: "#ffebdd" }}>
              <Users size={22} style={{ color: "#ff6b35" }} />
            </div>
            <div className="text-2xl font-bold" style={{ color: "#545454" }}>5,000+</div>
            <div className="text-sm text-gray-400">Students Guided</div>
          </div>
          <div className="bg-white rounded-2xl p-5 text-center shadow-sm hover:shadow-md transition-all duration-300 group" style={{ border: "1px solid #ffebdd" }}>
            <div className="w-12 h-12 rounded-xl mx-auto mb-3 flex items-center justify-center transition-all duration-300 group-hover:scale-110" style={{ backgroundColor: "#ffebdd" }}>
              <Award size={22} style={{ color: "#ff6b35" }} />
            </div>
            <div className="text-2xl font-bold" style={{ color: "#545454" }}>200+</div>
            <div className="text-sm text-gray-400">Expert Guides</div>
          </div>
          <div className="bg-white rounded-2xl p-5 text-center shadow-sm hover:shadow-md transition-all duration-300 group" style={{ border: "1px solid #ffebdd" }}>
            <div className="w-12 h-12 rounded-xl mx-auto mb-3 flex items-center justify-center transition-all duration-300 group-hover:scale-110" style={{ backgroundColor: "#ffebdd" }}>
              <Star size={22} style={{ color: "#ff6b35" }} />
            </div>
            <div className="text-2xl font-bold" style={{ color: "#545454" }}>4.9</div>
            <div className="text-sm text-gray-400">Average Rating</div>
          </div>
          <div className="bg-white rounded-2xl p-5 text-center shadow-sm hover:shadow-md transition-all duration-300 group" style={{ border: "1px solid #ffebdd" }}>
            <div className="w-12 h-12 rounded-xl mx-auto mb-3 flex items-center justify-center transition-all duration-300 group-hover:scale-110" style={{ backgroundColor: "#ffebdd" }}>
              <TrendingUp size={22} style={{ color: "#ff6b35" }} />
            </div>
            <div className="text-2xl font-bold" style={{ color: "#545454" }}>10k+</div>
            <div className="text-sm text-gray-400">Sessions Completed</div>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {guides.map((guide, idx) => (
            <div
              key={idx}
              className="group bg-white rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
              style={{ boxShadow: "0 10px 40px rgba(0,0,0,0.08)" }}
            >
              {/* Card Header */}
              <div className="relative p-6" style={{ background: "linear-gradient(135deg, #ff6b35, #e55a2b)" }}>
                {/* Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-2 py-1 bg-white/20 backdrop-blur rounded-lg text-white text-xs font-semibold">
                    {guide.badge}
                  </span>
                </div>
                {/* Verified Badge */}
                {guide.verified && (
                  <div className="absolute top-4 right-4">
                    <div className="flex items-center gap-1 bg-white/20 backdrop-blur px-2 py-1 rounded-lg">
                      <CheckCircle size={12} className="text-white" />
                      <span className="text-white text-xs">Verified</span>
                    </div>
                  </div>
                )}
                {/* Avatar - Using first two chars of ID */}
                <div className="flex flex-col items-center pt-6">
                  <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-white text-xl font-bold border-4 border-white/30 shadow-lg transition-all duration-300 group-hover:scale-105">
                    {guide.id.slice(-2)}
                  </div>
                  <h3 className="text-white font-bold text-xl mt-4 font-mono">{guide.id}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <Star size={14} className="text-yellow-300 fill-yellow-300" />
                    <span className="text-white font-semibold">{guide.rating}</span>
                    <span className="text-white/70 text-sm">({guide.calls} sessions)</span>
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5">
                {/* College & Expertise */}
                <div className="text-center mb-5">
                  <p className="font-bold text-lg" style={{ color: "#545454" }}>{guide.college}</p>
                  <p className="text-sm text-gray-500 mt-1">{guide.branch} • {guide.year}</p>
                  <div className="flex items-center justify-center gap-2 mt-2">
                    <Clock size={12} style={{ color: "#ff6b35" }} />
                    <span className="text-xs text-gray-500">{guide.experience} experience</span>
                  </div>
                </div>

                {/* Languages & Response Time */}
                <div className="flex items-center justify-between py-3 px-3 rounded-xl mb-4" style={{ backgroundColor: "#fffbed" }}>
                  <div className="flex items-center gap-2">
                    <MessageCircle size={14} style={{ color: "#ff6b35" }} />
                    <span className="text-xs text-gray-600">{guide.languages.join(", ")}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={14} style={{ color: "#ff6b35" }} />
                    <span className="text-xs text-gray-600">Resp: {guide.responseTime}</span>
                  </div>
                </div>

                {/* Divider */}
                <div className="h-px my-3" style={{ backgroundColor: "#f0f0f0" }} />

                {/* Price & Action */}
                <div className="flex items-center justify-between mt-4">
                  <div>
                    <span className="text-xs text-gray-400 uppercase tracking-wide">Session Fee</span>
                    <p className="text-3xl font-bold" style={{ color: "#ff6b35" }}>₹{guide.price}</p>
                    <span className="text-xs text-gray-400">per 15 min session</span>
                  </div>
               
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Section */}
        <div className="text-center mt-14">
          <Link to="/guides" className=" inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-[#ff6b35] text-white hover:bg-white hover:text-orange-500  font-semibold transition-all duration-300  hover:gap-3 hover:shadow-lg" >
            <button >
              View More Guides → 
            </button>
          </Link>
          <p className="text-xs text-gray-400 mt-3">Join 5,000+ students who found their perfect guide</p>
        </div>

    
      </div>
    </div>
  );
}

export default SeniorGuide;