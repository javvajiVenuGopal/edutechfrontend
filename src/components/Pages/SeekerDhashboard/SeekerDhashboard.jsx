import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bell,
  CalendarCheck,
  FileText,
  Star,
  Search,
  User,
  CheckCircle,
  Globe,
  GraduationCap,
  Sparkles,
  ChevronRight,
  BookOpen,
  Phone,
  LayoutDashboard,
  Menu,
  X,
  LogOut,
  Settings,
  HelpCircle,
  Award,
  Clock,
  FileDown,
  BoxSelectIcon
} from "lucide-react";

import {
  createSeekerProfile,
  updateSeekerProfile,
  getSeekerProfile,
  
} from "../../../Apiroute";
import toast from "react-hot-toast";
function SeekerDashboard() {
  const navigate = useNavigate();

  // ================= MOBILE MENU =================
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // ================= PROFILE STATES =================
  const [location, setLocation] = useState("");
  const [stateName, setStateName] = useState("");
  const [college, setCollege] = useState("");
  const [branch, setBranch] = useState("");
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // ================= NOTIFICATIONS =================
 
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  // ================= SEARCH STATE =================
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // ================= FETCH PROFILE =================
  useEffect(() => {
  const fetchProfile = async () => {
    try {
      console.log("📡 Calling getSeekerProfile API...");

      const res = await getSeekerProfile();

      console.log("✅ Profile API response:", res.data);

      setLocation(res.data.location || "");
      setStateName(res.data.state || "");
      setCollege(res.data.college || "");
      setBranch(res.data.branch || "");

      setIsUpdateMode(true);

      console.log("🟢 Profile loaded successfully");

    } catch (err) {

      console.log("❌ Profile not found or API error:", err);

      setIsUpdateMode(false);
    }
  };

  fetchProfile();
}, []);




  // ================= SAVE PROFILE =================
const handleSaveDetails = async () => {

  if (!location || !stateName || !college || !branch) {

    toast.error("Fill all fields ❌");
    return;

  }

  try {

    console.log("📤 Sending profile data:", {
      location,
      state: stateName,
      college,
      branch
    });

    setIsSaving(true);

    const formData = new FormData();

    formData.append("location", location);
    formData.append("state", stateName);
    formData.append("college", college);
    formData.append("branch", branch);

    let res;

    if (isUpdateMode) {

      res = await updateSeekerProfile(formData);

      console.log("✏️ Profile updated:", res?.data);

    } else {

      res = await createSeekerProfile(formData);

      console.log("🆕 Profile created:", res?.data);

      setIsUpdateMode(true);

    }

    setSaveSuccess(true);

    setTimeout(() => setSaveSuccess(false), 3000);

  } catch (error) {

    console.log("❌ Save failed:", error?.response?.data || error);

    toast.error("Save failed ❌");

  } finally {

    setIsSaving(false);

  }

};

  // ================= HANDLE SEARCH =================
  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // ================= MENU =================
  const menuItems = [
    { 
      title: "Guide List", 
      path: "/guides",
      icon: <User size={20} />,
      desc: "Find and connect with expert guides",
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50"
    },
    { 
      title: "My Bookings", 
      path: "/my-bookings",
      icon: <CalendarCheck size={20} />,
      desc: "View your appointment history",
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50"
    }
  ];

  const quickStats = [
    { label: "Total Sessions", value: "12", icon: <CalendarCheck size={18} />, color: "text-green-600", bgColor: "bg-green-100" },
    { label: "Completed", value: "8", icon: <CheckCircle size={18} />, color: "text-blue-600", bgColor: "bg-blue-100" },
    { label: "Avg Rating", value: "4.8", icon: <Star size={18} />, color: "text-yellow-600", bgColor: "bg-yellow-100" },
    { label: "Reports", value: "4", icon: <FileText size={18} />, color: "text-purple-600", bgColor: "bg-purple-100" }
  ];

  return (
    <div className="min-h-screen mt-20  bg-gradient-to-br mt-10 from-slate-50 via-white to-slate-100">
      
      {/* TOP NAVIGATION BAR - Combined Styling */}
      <div className="z-30 ">
        <div className="max-w-7xl mx-auto bg-white/90 backdrop-blur-xl border-b border-gray-100 shadow-sm px-4 sm:px-6 py-3">
          <div className="flex justify-between items-center">
            
            {/* Logo & Brand - Enhanced with gradient and shadow from second version */}
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-2 rounded-xl shadow-md">
                <GraduationCap className="text-white" size={22} />
              </div>
              <div className="sm:block">
                <h1 className="lg:text-xl md:text-medium font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                  Seeker Dashboard
                </h1>
                <p className="text-xs text-gray-500">Find your perfect guide</p>
              </div>
            </div>

            {/* Search & Actions */}
            <div className="flex items-center gap-2 sm:gap-3">
              
              {/* Desktop Search - Enhanced with better styling */}
              <div className="hidden md:block relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Search dashboard..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="w-64 pl-10 pr-4 py-2 rounded-xl border border-gray-200 bg-gray-50 focus:border-orange-400 focus:ring-2 focus:ring-orange-200 outline-none transition-all text-sm"
                />
              </div>

              
            </div>
          </div>

          {/* Mobile Search Bar - Visible only on mobile */}
          <div className="md:hidden mt-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search dashboard..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 bg-gray-50 focus:border-orange-400 focus:ring-2 focus:ring-orange-200 outline-none transition-all text-sm"
              />
            </div>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        
        {/* Two Column Layout */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          
          {/* PROFILE SECTION */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="flex-1"
          >
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-slate-800 to-slate-900 px-5 sm:px-6 py-4">
                <div className="flex items-center gap-2">
                  <User className="text-orange-400" size={22} />
                  <h2 className="text-lg sm:text-xl font-bold text-white">Profile Details</h2>
                </div>
                <p className="text-slate-400 text-xs sm:text-sm mt-1">Complete your profile for personalized guidance</p>
              </div>

              <div className="p-5 sm:p-6">
                {/* Success Message */}
                <AnimatePresence>
                  {saveSuccess && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mb-5 p-3 bg-emerald-50 rounded-xl flex items-center gap-2 text-emerald-700 border border-emerald-200"
                    >
                      <CheckCircle size={18} />
                      <span className="text-sm font-medium">Profile saved successfully!</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="space-y-5">
                  {/* Location Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
                      <Globe size={16} className="text-gray-400" />
                      Country / Location
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your country"
                      value={location}
                      onChange={e => setLocation(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:border-orange-400 focus:ring-2 focus:ring-orange-200 outline-none transition-all text-sm"
                    />
                  </div>

                  {/* State Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">State / Region</label>
                    <input
                      type="text"
                      placeholder="Enter your state"
                      value={stateName}
                      onChange={e => setStateName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:border-orange-400 focus:ring-2 focus:ring-orange-200 outline-none transition-all text-sm"
                    />
                  </div>

                  {/* College Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
                      <GraduationCap size={16} className="text-gray-400" />
                      College / University
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your college"
                      value={college}
                      onChange={e => setCollege(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:border-orange-400 focus:ring-2 focus:ring-orange-200 outline-none transition-all text-sm"
                    />
                  </div>

                  {/* Branch Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
                      <BookOpen size={16} className="text-gray-400" />
                      Branch / Department
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your branch"
                      value={branch}
                      onChange={e => setBranch(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:border-orange-400 focus:ring-2 focus:ring-orange-200 outline-none transition-all text-sm"
                    />
                  </div>
                  <button
  onClick={handleSaveDetails}
  disabled={isSaving}
  className="w-full bg-orange-500 text-white py-3 rounded-xl"
>
  {isSaving ? "Saving..." : "Save Profile Details"}
</button>

                </div>

                {/* Profile Status Indicator */}
                {saveSuccess && (
                  <div className="mt-5 p-3 bg-emerald-50 rounded-xl flex items-center gap-2 border border-emerald-100">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                    <span className="text-xs text-emerald-700">Profile is complete and verified</span>
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* MENU SECTION - Quick Actions */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 }}
            className="flex-1"
          >
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-slate-800 to-slate-900 px-5 sm:px-6 py-4">
                <div className="flex items-center gap-2">
                  <LayoutDashboard className="text-orange-400" size={22} />
                  <h2 className="text-lg sm:text-xl font-bold text-white">Quick Actions</h2>
                </div>
                <p className="text-slate-400 text-xs sm:text-sm mt-1">Access all your dashboard features</p>
              </div>

              <div className="p-5 sm:p-6">
                <div className="grid grid-cols-1 gap-3">
                  {menuItems.map((item, index) => (
                    <motion.button
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.03 }}
                      whileHover={{ y: -2, transition: { duration: 0.2 } }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => navigate(item.path)}
                      className="group relative bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden"
                    >
                      <div className={`absolute inset-0 bg-gradient-to-r ${item.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                      <div className="relative z-10 flex items-center gap-4">
                        <div className={`p-2.5 rounded-xl bg-gradient-to-r ${item.color} shadow-md group-hover:scale-110 transition-transform duration-300`}>
                          <div className="text-white">
                            {item.icon}
                          </div>
                        </div>
                        <div className="flex-1 text-left">
                          <span className="font-semibold text-gray-800 group-hover:text-orange-600 transition-colors">
                            {item.title}
                          </span>
                          <p className="text-xs text-gray-400 mt-0.5 hidden sm:block">{item.desc}</p>
                        </div>
                        <ChevronRight size={16} className="text-gray-300 group-hover:text-orange-500 group-hover:translate-x-1 transition-all" />
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}

export default SeekerDashboard;