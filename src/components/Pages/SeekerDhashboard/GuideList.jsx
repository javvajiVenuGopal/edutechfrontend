import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { searchGuides } from "../../../Apiroute";
import { 
  Search, 
  Filter, 
  User, 
  GraduationCap, 
  MapPin, 
  Star, 
  Phone, 
  Mail, 
  ChevronRight,
  Briefcase,
  Clock,
  Award,
  BookOpen,
  Users,
  Loader2
} from "lucide-react";

function GuideList() {

  const [guides, setGuides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  
  const [selectedBranch, setSelectedBranch] = useState("");
 
  const [branches, setBranches] = useState([]);

  // Optional filters (later dynamic ga set cheyyachu)
  // const [college] = useState("");
  const [branch] = useState("");



  
  useEffect(() => {
  fetchGuides();
}, [selectedBranch]);

  // Filter guides based on search and filters
  const fetchGuides = async () => {
  try {
    const response = await searchGuides(selectedBranch);

    setGuides(response.data);

    const uniqueBranches = [
      ...new Set(response.data.map(g => g.branch).filter(Boolean))
    ];

    setBranches(uniqueBranches);

    setLoading(false);

  } catch (error) {
    console.log(error);
    setLoading(false);
  }
};
  const filteredGuides = guides.filter(guide => {
  const matchesSearch =
    searchTerm === "" ||
    guide.guide_unique_id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    guide.college_name?.toLowerCase().includes(searchTerm.toLowerCase());

  const matchesBranch =
    selectedBranch === "" ||
    guide.branch === selectedBranch;

  return matchesSearch && matchesBranch;
});

  // Function to get rating stars
  const getRatingStars = (rating) => {
    if (!rating) return null;
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    return (
      <div className="flex items-center gap-0.5">
        {[...Array(5)].map((_, i) => (
          <Star key={i} size={14} className={`${i < fullStars ? 'text-amber-400 fill-amber-400' : (i === fullStars && hasHalfStar ? 'text-amber-400 fill-amber-400' : 'text-gray-300')}`} />
        ))}
        <span className="text-xs font-medium text-[#545454] ml-1">({rating})</span>
      </div>
    );
  };

  return (

    <div className="min-h-screen bg-[#fffbed] pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-7xl">
        
        {/* Header Section */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-[#545454] mb-2">Expert Guides</h1>
          <p className="text-[#545454]/60 text-lg">Connect with experienced academic mentors</p>
          <div className="w-20 h-1 bg-gradient-to-r from-[#ff6b35] to-[#ff6b35]/70 rounded-full mx-auto mt-4"></div>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-[#fffbed]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#545454]/40" size={18} />
              <input
                type="text"
                placeholder="Search by name, ID, or college..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ff6b35]/30 focus:border-[#ff6b35] transition-all bg-[#fffbed]/50"
              />
            </div>
            
            
            
            {/* Branch Filter */}
            <div className="relative">
              <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 text-[#545454]/40" size={18} />
              <select
                value={selectedBranch}
                onChange={(e) => setSelectedBranch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ff6b35]/30 focus:border-[#ff6b35] transition-all bg-[#fffbed]/50 appearance-none cursor-pointer text-[#545454]"
              >
                <option value="">All Branches</option>
                {branches.map((br, idx) => (
                  <option key={idx} value={br}>{br}</option>
                ))}
              </select>
            </div>
          </div>
          
          {/* Results Count */}
          <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
            <p className="text-sm text-[#545454]/60">
              Found <span className="font-semibold text-[#ff6b35]">{filteredGuides.length}</span> guides
            </p>
            <button 
              onClick={() => {
                setSearchTerm("");
               
                setSelectedBranch("");
              }}
              className="text-sm text-[#ff6b35] hover:text-[#e55a2b] transition-colors"
            >
              Clear filters
            </button>
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-12 h-12 text-[#ff6b35] animate-spin mb-4" />
            <p className="text-[#545454]/60 text-lg">Loading guides...</p>
          </div>
        ) : filteredGuides.length === 0 ? (
          /* Empty State */
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center border border-[#fffbed]">
            <div className="w-24 h-24 bg-[#fffbed] rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-12 h-12 text-[#545454]/30" />
            </div>
            <p className="text-[#545454] text-lg font-medium mb-2">No guides available</p>
            <p className="text-[#545454]/40">Check back later for new mentors</p>
          </div>
        ) : (
          /* Guides Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGuides.map((guide) => (
              <div
                key={guide.id}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-[#fffbed] hover:border-[#ff6b35]/30"
              >
                {/* Card Header with Gradient */}
                <div className="relative bg-gradient-to-r from-[#ff6b35] to-[#ff6b35]/80 px-6 py-4">
                  <div className="absolute top-3 right-3">
                    <div className="bg-white/20 backdrop-blur-sm rounded-full px-2 py-1">
                      <span className="text-white text-xs font-mono">{guide.guide_unique_id}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                      <User className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-lg">{guide.guide_unique_id || "Senior Guide"}</h3>
                      <div className="text-xs mt-1">
  {guide.online ? (
    <span className="text-green-300">● Online</span>
  ) : (
    <span className="text-gray-200">● Offline</span>
  )}
</div>
                      <p className="text-orange-100 text-sm capitalize">{guide.role || "Academic Guide"}</p>
                    </div>
                  </div>
                </div>
                
                {/* Card Body */}
                <div className="p-5">
                  {/* College & Branch */}
                  <div className="space-y-2 mb-4">
                    {guide.college_name && (
                      <div className="flex items-center gap-2 text-[#545454]">
                        <GraduationCap size={16} className="text-[#ff6b35]" />
                        <span className="text-sm">{guide.college_name}</span>
                      </div>
                    )}
                    {guide.branch && (
                      <div className="flex items-center gap-2 text-[#545454]">
                        <BookOpen size={16} className="text-[#ff6b35]" />
                        <span className="text-sm">{guide.branch}</span>
                      </div>
                    )}
                    {guide.experience && (
                      <div className="flex items-center gap-2 text-[#545454]">
                        <Briefcase size={16} className="text-[#ff6b35]" />
                        <span className="text-sm">{guide.experience} years experience</span>
                      </div>
                    )}
                  </div>
                  
                  {/* Rating */}
                  {guide.rating && getRatingStars(guide.rating)}
                  
                  {/* Price/Info */}
                  {guide.price && (
                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Clock size={14} className="text-[#545454]/40" />
                        <span className="text-xs text-[#545454]/60">Response: &lt; 24h</span>
                      </div>
                      <div className="text-right">
                        <p className="text-[#ff6b35] font-bold">₹{guide.price}/hour</p>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Card Footer with Button */}
                <div className="px-5 pb-5">
                  <Link to={`/guide-profile/${guide.id}`}>
                    <button className="w-full bg-gradient-to-r from-[#ff6b35] to-[#ff6b35]/80 hover:from-[#e55a2b] hover:to-[#e55a2b] text-white py-2.5 rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg">
                      View Profile
                      <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>

  );

}

export default GuideList;
