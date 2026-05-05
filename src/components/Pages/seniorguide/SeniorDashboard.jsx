import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  XCircle, 
  LayoutDashboard, 
  FileText, 
  Clock, 
  Phone, 
  History, 
  MessageSquare, 
  Wallet, 
  IndianRupee, 
  Gift,
  ChevronRight,
  User,
  Calendar,
  TrendingUp,
  Bell,
  Sparkles,
  Search,
  Menu,
  X,
  GraduationCap,
  CheckCircle
} from "lucide-react";
import {
  getMyProfile,
  getGuideStats,
  getWalletBalance,
  getGuideReferralStats
} from "../../../Apiroute";
function SeniorGuideDashboard() {

  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  
  useEffect(() => {

  const loadDashboardData = async () => {

    try {

      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      // 1️⃣ Get profile
      const profileRes = await getMyProfile();

      if (profileRes.data.role !== "senior_guide") {
        navigate("/");
        return;
      }

      // 2️⃣ Get stats
      const statsRes = await getGuideStats();

      // 3️⃣ Get wallet balance
      const walletRes = await getWalletBalance();

      // 4️⃣ Get referral stats
      const referralRes = await getGuideReferralStats();

      // 5️⃣ Set dashboard data
      setData({
        name: profileRes.data.full_name || "Senior Guide",

        status:
          profileRes.data.role === "senior_guide"
            ? "Passed"
            : "Pending",

        total_sessions: statsRes.data.total_calls || 0,

        wallet_balance: walletRes.data.available_balance || 0,

        rating: statsRes.data.rating || 0,

        students: statsRes.data.students || 0,

        referrals: referralRes.data.total_referrals || 0
      });

    } catch (err) {

      console.error("Dashboard load failed:", err);
      navigate("/login");

    }

  };

  loadDashboardData();

}, [navigate]);

  
      
  // ⏳ loading state
  if (!data) {

    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#fffbed" }}>
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-t-[#ff6b35] border-r-[#ff6b35] border-b-transparent border-l-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-lg" style={{ color: "#545454" }}>Loading dashboard...</p>
        </div>
      </div>
    );

  }


  // ❌ block access if test not passed
  if (data.status !== "Passed") {

    return (

      <div className="min-h-screen flex items-center justify-center p-6" style={{ backgroundColor: "#fffbed" }}>
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center max-w-md" style={{ border: `1px solid #ffebdd` }}>
          <div className="w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: "#ffebdd" }}>
            <XCircle size={40} style={{ color: "#ff6b35" }} />
          </div>
          <h2 className="text-xl font-bold mb-2" style={{ color: "#545454" }}>
            Application Status: {data.status}
          </h2>
          <p className="text-sm mb-6" style={{ color: "#545454/70" }}>
            You will get dashboard access after passing the test
          </p>
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-2 rounded-lg font-medium transition-all"
            style={{ backgroundColor: "#ff6b35", color: "white" }}
          >
            Go Back
          </button>
        </div>
      </div>

    );

  }


  // ✅ dashboard menu items with icons
  const menu = [
    { title: "Application Status", icon: <FileText size={18} />, path: "/guide-status", desc: "Check your application status", color: "from-blue-500 to-blue-600" },
    { title: "Availability Slots", icon: <Clock size={18} />, path: "/slots", desc: "Set your available schedule", color: "from-green-500 to-green-600" },
    { title: "Upcoming Calls", icon: <Phone size={18} />, path: "/upcoming-calls", desc: "View scheduled sessions", color: "from-purple-500 to-purple-600" },
    { title: "Call History", icon: <History size={18} />, path: "/call-history", desc: "Past session records", color: "from-orange-500 to-orange-600" },
    { title: "Wallet", icon: <Wallet size={18} />, path: "/wallet", desc: "View your earnings", color: "from-teal-500 to-teal-600" },
    { title: "Withdraw Request", icon: <IndianRupee size={18} />, path: "/withdraw", desc: "Withdraw earnings", color: "from-red-500 to-red-600" },
    { title: "Referral", icon: <Gift size={18} />, path: "/referral", desc: "Invite and earn", color: "from-yellow-500 to-yellow-600" }
  ];

  const filteredMenu = menu.filter(item =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

const stats = [
  { label: "Total Sessions", value: data.total_sessions || 0 },
  { label: "Wallet Balance", value: `₹${data.wallet_balance || 0}` },
  { label: "Rating", value: data.rating || 0 },
  { label: "Students", value: data.students || 0 },
];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 300 } }
  };

  return (

    <div className="min-h-screen" style={{ backgroundColor: "#fffbed" }}>
      {/* Animated Background Pattern */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ backgroundColor: "#ff6b35" }} />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000" style={{ backgroundColor: "#545454" }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* ================= HEADER ================= */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
          className="backdrop-blur-xl bg-white/90 border border-white/40 rounded-2xl shadow-2xl p-6 mb-8 sticky top-4 z-40"
        >
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
            {/* Logo & Title */}
            <div className="flex items-center gap-3 w-full lg:w-auto">
              <div className="bg-gradient-to-r from-[#ff6b35] to-[#e55a2b] p-2.5 rounded-xl shadow-lg">
                <GraduationCap className="text-white" size={28} />
              </div>
              <div>
                <h1 className="text-2xl lg:text-3xl font-extrabold" style={{ color: "#545454" }}>
                  Senior Guide Dashboard
                </h1>
                <p className="text-sm hidden sm:block" style={{ color: "#545454/60" }}>
                  Welcome back, {data.name} • Manage your sessions and earnings
                </p>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg" style={{ backgroundColor: "#fffbed" }}
            >
              {mobileMenuOpen ? <X size={24} style={{ color: "#545454" }} /> : <Menu size={24} style={{ color: "#545454" }} />}
            </button>

            {/* Desktop Search & Notifications */}
            <div className="hidden lg:flex items-center gap-4 w-full lg:w-auto">
              <div className="relative flex-1 lg:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "#545454/40" }} size={18} />
                <input
                  type="text"
                  placeholder="Search dashboard features..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-[#fffbed]/50 focus:border-[#ff6b35] focus:ring-2 focus:ring-[#ff6b35]/20 transition-all duration-200"
                  style={{ color: "#545454" }}
                />
              </div>

              {/* Notification Bell */}
              
            </div>
          </div>

          {/* Mobile Search Bar */}
          <div className="lg:hidden mt-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "#545454/40" }} size={18} />
              <input
                type="text"
                placeholder="Search features..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-[#fffbed]/50 focus:border-[#ff6b35] transition-all"
                style={{ color: "#545454" }}
              />
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8"
        >
          {stats.map((stat, idx) => (
            <motion.div key={idx} variants={itemVariants}>
              <div className="bg-white rounded-xl shadow-md p-4" style={{ border: `1px solid #ffebdd` }}>
                <div className="flex items-center justify-between mb-2">
                  <div className="p-2 rounded-lg" style={{ backgroundColor: "#fffbed", color: "#ff6b35" }}>
                    {stat.icon}
                  </div>
                  <span className="text-xs font-medium" style={{ color: "#10b981" }}>{stat.change}</span>
                </div>
                <p className="text-2xl font-bold" style={{ color: "#545454" }}>{stat.value}</p>
                <p className="text-xs mt-1" style={{ color: "#9ca3af" }}>{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* MENU GRID */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5"
        >
          {filteredMenu.map((item, index) => (
            <motion.button
              key={index}
              variants={itemVariants}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate(item.path)}
              className="group bg-white p-5 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 text-left"
              style={{ border: `1px solid #ffebdd` }}
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2.5 rounded-xl bg-gradient-to-r ${item.color} shadow-md group-hover:scale-110 transition-transform duration-300`}>
                  <div className="text-white">
                    {item.icon}
                  </div>
                </div>
                <ChevronRight size={16} className="text-gray-300 group-hover:text-[#ff6b35] group-hover:translate-x-1 transition-all" />
              </div>
              <h3 className="font-semibold" style={{ color: "#545454" }}>{item.title}</h3>
              <p className="text-xs mt-1" style={{ color: "#9ca3af" }}>{item.desc}</p>
            </motion.button>
          ))}
        </motion.div>

        {/* No Results */}
        {filteredMenu.length === 0 && (
          <div className="text-center py-12 bg-white rounded-2xl shadow-md">
            <Search size={48} className="mx-auto mb-3" style={{ color: "#545454/30" }} />
            <p style={{ color: "#545454/60" }}>No matching features found</p>
          </div>
        )}




      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25 }}
            className="fixed inset-y-0 right-0 w-80 bg-white shadow-2xl z-50 lg:hidden"
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-bold text-xl" style={{ color: "#545454" }}>Menu</h2>
                <button onClick={() => setMobileMenuOpen(false)} className="p-2 rounded-lg" style={{ backgroundColor: "#fffbed" }}>
                  <X size={20} style={{ color: "#545454" }} />
                </button>
              </div>
              <div className="space-y-3">
                {menu.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      navigate(item.path);
                      setMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    <div className={`p-2 rounded-lg bg-gradient-to-r ${item.color} text-white`}>
                      {item.icon}
                    </div>
                    <span className="font-medium" style={{ color: "#545454" }}>{item.title}</span>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>

  );

}

export default SeniorGuideDashboard;
