import { useEffect, useState } from "react";
import {
  LayoutDashboard,
  Users,
  Calendar,
  DollarSign,
  FileText,
  LogOut,
  Search,
  RefreshCw,
  CheckCircle,
  XCircle,
  Clock,
  Wallet,
  TrendingUp,
  UserCheck,
  UserX,
  Award,
  RotateCcw,
  Zap,
  Phone,
  BookOpen,
  CreditCard,
  AlertCircle,
  Menu,
  ChevronLeft,
  MoreVertical,
  Filter,
  Download,
  Eye
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  getPendingGuides,
  approveGuideDocs,
  rejectGuide,
  suspendGuide,
  passGuideTest,
  resetGuideAttempts,
  forceActivateGuide,
  getAllBookings,
  getAllCalls,
  getAllWithdrawRequests,
  approveWithdraw,
  rejectWithdraw,
  getRefundRequests,
  processRefund,
  suspendUser,
  activateUser,
  getAdminAnalytics,
  getAdminDashboard,
  getRevenueSummary,getAllUsers,deleteUser,
  getGuideDocuments ,
  updateQuestion,
  createQuestion,
  deleteQuestion,
  getAllQuestions
} from "../../../Apiroute";
import toast from "react-hot-toast";
import { HelpCircle } from "lucide-react";

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [applications, setApplications] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [calls, setCalls] = useState([]);
  const [withdraws, setWithdraws] = useState([]);
  const [refunds, setRefunds] = useState([]);
  const [users, setUsers] = useState([]);
  const [dashboardStats, setDashboardStats] = useState({});
  const [analyticsStats, setAnalyticsStats] = useState({});
  const [revenueStats, setRevenueStats] = useState({});
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedGuide, setSelectedGuide] = useState(null);
const [showGuideModal, setShowGuideModal] = useState(false);
  const [questions, setQuestions] = useState([]);
const [questionText, setQuestionText] = useState("");
const [answerText, setAnswerText] = useState("");
const [editingId, setEditingId] = useState(null);
  
  // ADD BELOW YOUR EXISTING STATES
const navigate = useNavigate();
// pagination state
const [page, setPage] = useState(1);
const rowsPerPage = 8;

// pagination helper
const paginate = (data) => {
  const start = (page - 1) * rowsPerPage;
  return data.slice(start, start + rowsPerPage);
};

  // ================= LOAD DATA =================
  const loadData = async () => {
    try {
      setIsLoading(true);
      if (activeTab === "dashboard") {
        const [dashboardRes, revenueRes, analyticsRes, callsRes, withdrawRes] =
          await Promise.all([
            getAdminDashboard(),
            getRevenueSummary(),
            getAdminAnalytics(),
            getAllCalls(),
            getAllWithdrawRequests()
          ]);
        console.log(dashboardRes.data);
console.log(analyticsRes.data);
console.log(revenueRes.data);
          console.log("dashboard response:",dashboardRes);
console.log("callresponse=",callsRes);
console.log("withdraw response=",withdrawRes.data.length);
console.log("refund response=",refunds);
        console.log(dashboardRes.data);
console.log(analyticsRes.data);
console.log(revenueRes.data);
        setDashboardStats(dashboardRes.data || {});
        setRevenueStats(revenueRes.data || {});
        setAnalyticsStats(analyticsRes.data || {});
        setCalls(callsRes.data || []);
        setWithdraws(withdrawRes.data || []);
        
        
        
      }
      if (activeTab === "approvals") {
        const res = await getPendingGuides();
        console.log(res.data);
        setApplications(res.data || []);
      }
      if (activeTab === "bookings") {
        const res = await getAllBookings();
        console.log(res.data)
        setBookings(res.data || []);
      }
      if (activeTab === "calls") {
        const res = await getAllCalls();
        console.log(res)
        setCalls(res.data || []);
      }
      if (activeTab === "withdraws") {
        const res = await getAllWithdrawRequests();
        console
        setWithdraws(res.data || []);
      }
      if (activeTab === "refunds") {
        const res = await getRefundRequests();
        console.log(res.data)
        setRefunds(res.data || []);
      }
   if (activeTab === "users") {
  const res = await getAllUsers(); // create this API
  setUsers(res.data || []);
}
      if (activeTab === "questions") {
  const res = await getAllQuestions();
  setQuestions(res.data || []);
}
    } catch (err) {
      console.error("Admin dashboard error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setPage(1);
    loadData();
  }, [activeTab]);
  const handleDeleteUser = async (guideId) => {
  await deleteUser(guideId);
  toast.success("User deleted successfully ");
  loadData();
};

  // ================= GUIDE ACTIONS =================
  const handleStatus = async (guideId, status) => {
    console.log(guideId)
    if (status === "Approved") {
      await approveGuideDocs(guideId);
toast.success("Guide approved successfully ✅");
loadData();}

    else {await rejectGuide(guideId);
toast.error("Guide rejected ❌");
loadData();}
  };
  const handleSuspendGuide = async (id) => {
    await suspendGuide(id);
toast("Guide suspended 🚫");
loadData();
  };
  const handlePassGuide = async (id) => {
    await passGuideTest(id);
toast.success("Guide test passed ");
loadData();
  };
  const handleResetAttempts = async (id) => {
    await resetGuideAttempts(id);
toast("Attempts reset successfully ");
loadData();
  };
  const handleForceActivate = async (id) => {
    await forceActivateGuide(id);
toast.success("Guide activated ");
loadData();
  };
  const viewDocuments = async (guideId) => {
  try {
    const res = await getGuideDocuments(guideId);

    const docs = res.data;

    window.open(`/admin/documents/${docs.aadhaar}`, "_blank");
    window.open(`/admin/documents/${docs.college_id}`, "_blank");
    window.open(`/admin/documents/${docs.hall_ticket}`, "_blank");

  } catch (err) {
    console.error("Document load failed", err);
  }
};
  const viewGuideDetails = async (guideId) => {
  try {
    const res = await getGuideDocuments(guideId);

    setSelectedGuide(res.data);
    setShowGuideModal(true);

  } catch (err) {
    console.error("Guide details load failed", err);
  }
};

  // ================= WITHDRAW =================
  const handleWithdrawApprove = async (id) => {
   await approveWithdraw(id);
toast.success("Withdraw approved ");
loadData();
  };
  const handleWithdrawReject = async (id) => {
   await rejectWithdraw(id);
toast.error("Withdraw rejected ❌");
loadData();
  };

  // ================= REFUND =================
  const handleRefund = async (bookingId, action) => {
  try {
    await processRefund(bookingId, action);

    toast.success(
      action === "APPROVED"
        ? "Refund approved successfully "
        : "Refund rejected successfully "
    );

    loadData();
  } catch (err) {
    console.error(err);
    toast.error("Refund action failed ");
  }
};

  // ================= USERS =================
const handleSuspendUser = async (id) => {

  if (!id) {
    toast.error("Invalid user id");
    return;
  }

  try {
    await suspendUser(id);
    toast.error("User suspended 🚫");
    loadData();
  } catch (err) {
    console.error(err);
    toast.error("Suspend failed");
  }
};
  const handleActivateUser = async (id) => {
    await activateUser(id);
toast.success("User activated ");
loadData();
  };
  //===============Questions====================
  const handleSaveQuestion = async () => {
  if (!questionText || !answerText)
    return toast.error("Fill all fields");

  if (editingId) {
    await updateQuestion(editingId, {
      question: questionText,
      answer: answerText,
    });

    toast.success("Question updated ");
  } else {
    await createQuestion({
      question: questionText,
      answer: answerText,
    });

    toast.success("Question created ");
  }

  setQuestionText("");
  setAnswerText("");
  setEditingId(null);

  loadData();
};

  const handleDeleteQuestion = async (id) => {
  await deleteQuestion(id);

  toast.success("Deleted successfully ");

  loadData();
};

  // ================= LOGOUT =================
  const handleLogout = () => {
    localStorage.clear();
    toast.success("successfully logout ")
    window.location.href = "/admin-login";
  };

  // ================= DASHBOARD STATS =================
  const stats = [
    { title: "Total Users", value: analyticsStats.total_users || 0, icon: <Users size={20} />, change: "+12%", color: "from-blue-500 to-blue-600" },
    { title: "Total Guides", value: analyticsStats.total_guides || 0, icon: <FileText size={20} />, change: "+8%", color: "from-emerald-500 to-emerald-600" },
    { title: "Total Bookings", value:dashboardStats.bookings || 0, icon: <Calendar size={20} />, change: "+23%", color: "from-purple-500 to-purple-600" },
    { title: "Revenue", value: `₹${revenueStats.platform_revenue || 0}`, icon: <DollarSign size={20} />, change: "+18%", color: "from-amber-500 to-amber-600" },
    { title: "Withdraw Requests", value: dashboardStats.withdraws || 0, icon: <Wallet size={20} />, change: "-5%", color: "from-rose-500 to-rose-600" },
    { title: "Active Calls", value: calls.length, icon: <TrendingUp size={20} />, change: "+15%", color: "from-indigo-500 to-indigo-600" }
  ];

  const filteredApps = applications.filter((app) =>
    app.college_name?.toLowerCase().includes(search.toLowerCase())
  );
  const filteredBookings = bookings.filter(
  (b) =>
    b.seeker_name?.toLowerCase().includes(search.toLowerCase()) ||
    b.guide_name?.toLowerCase().includes(search.toLowerCase())
);

const filteredCalls = calls.filter(
  (c) =>
    c.seeker_name?.toLowerCase().includes(search.toLowerCase()) ||
    c.guide_name?.toLowerCase().includes(search.toLowerCase())
);

const filteredWithdraws = withdraws.filter(
  (w) =>
    w.guide_name?.toLowerCase().includes(search.toLowerCase())
);

const filteredRefunds = refunds.filter(
  (r) =>
    r.user_name?.toLowerCase().includes(search.toLowerCase())
);

const filteredUsers = users.filter(
  (u) =>
    u.name?.toLowerCase().includes(search.toLowerCase()) ||
    u.email?.toLowerCase().includes(search.toLowerCase())
);

  const getStatusBadge = (status) => {
    const statusMap = {
      pending: { color: "bg-amber-50 text-amber-700 border-amber-200", icon: <Clock size={12} /> },
      approved: { color: "bg-emerald-50 text-emerald-700 border-emerald-200", icon: <CheckCircle size={12} /> },
      rejected: { color: "bg-rose-50 text-rose-700 border-rose-200", icon: <XCircle size={12} /> },
      completed: { color: "bg-sky-50 text-sky-700 border-sky-200", icon: <CheckCircle size={12} /> },
      cancelled: { color: "bg-gray-50 text-gray-700 border-gray-200", icon: <XCircle size={12} /> },
      active: { color: "bg-emerald-50 text-emerald-700 border-emerald-200", icon: <CheckCircle size={12} /> },
      suspended: { color: "bg-rose-50 text-rose-700 border-rose-200", icon: <XCircle size={12} /> },
      processed: { color: "bg-emerald-50 text-emerald-700 border-emerald-200", icon: <CheckCircle size={12} /> }
    };
    const matched = statusMap[status?.toLowerCase()] || statusMap.pending;
    return (
      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium border ${matched.color}`}>
        {matched.icon}
        {status}
      </span>
    );
  };

  const sidebarItems = [
    { id: "dashboard", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
    { id: "approvals", label: "Approvals", icon: <UserCheck size={18} /> },
    { id: "bookings", label: "Bookings", icon: <BookOpen size={18} /> },
    { id: "calls", label: "Calls", icon: <Phone size={18} /> },
    { id: "withdraws", label: "Withdrawals", icon: <CreditCard size={18} /> },
    { id: "refunds", label: "Refunds", icon: <RotateCcw size={18} /> },
    { id: "users", label: "Users", icon: <Users size={18} /> },
    { id: "questions", label: "Questions", icon: <HelpCircle size={18} /> }
  ];

  return (
    <div className="min-h-screen mt-10 bg-gradient-to-br from-slate-50 to-slate-100 font-sans antialiased">
      {/* SIDEBAR - Premium Dark Theme */}
      <aside className={`fixed left-0 top-0 h-full bg-slate-900 shadow-2xl z-20 transition-all duration-300 ${sidebarCollapsed ? 'w-20' : 'w-72'}`}>
        <div className="flex flex-col h-full">
          <div className={`p-6 border-b border-slate-800 ${sidebarCollapsed ? 'px-4' : ''}`}>
            {!sidebarCollapsed ? (
              <>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-[#ff6b35] to-orange-400 bg-clip-text text-transparent">AdminPanel</h1>
                <p className="text-slate-400 text-xs mt-1">Control Center</p>
              </>
            ) : (
              <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-[#ff6b35] to-orange-500 flex items-center justify-center">
                <span className="text-white font-bold text-lg">A</span>
              </div>
            )}
          </div>
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="absolute -right-3 top-20 bg-slate-800 rounded-full p-1.5 text-slate-400 hover:text-white transition-all"
          >
            <ChevronLeft size={14} className={`transition-transform ${sidebarCollapsed ? 'rotate-180' : ''}`} />
          </button>
          <nav className="flex-1 p-4 space-y-1.5">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-sm font-medium ${
                  activeTab === item.id
                    ? "bg-gradient-to-r from-[#ff6b35]/20 to-orange-500/10 text-[#ff6b35] shadow-lg"
                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
                } ${sidebarCollapsed ? 'justify-center px-2' : ''}`}
              >
                {item.icon}
                {!sidebarCollapsed && <span className="capitalize">{item.label}</span>}
              </button>
            ))}
          </nav>
          <div className="p-4 border-t border-slate-800">
            <button
              onClick={handleLogout}
              className={`w-full flex items-center gap-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 px-4 py-2.5 rounded-xl transition-all duration-200 text-sm font-medium ${sidebarCollapsed ? 'justify-center' : ''}`}
            >
              <LogOut size={16} />
              {!sidebarCollapsed && "Logout"}
            </button>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <div className={`transition-all duration-300 ${sidebarCollapsed ? 'ml-20' : 'ml-72'}`}>
        {/* Top Navigation Bar */}
        <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm">
          <div className="px-8 py-4">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-slate-800 capitalize tracking-tight">{activeTab}</h2>
                <p className="text-sm text-slate-500 mt-0.5">Manage and monitor platform activities</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  <input
                    placeholder={activeTab === "approvals" ? "Search college..." : "Search..."}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-9 pr-4 py-2 w-80 border border-slate-200 rounded-xl bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#ff6b35]/30 focus:bg-white transition-all text-sm"
                  />
                </div>
                <button
                  onClick={loadData}
                  disabled={isLoading}
                  className="flex items-center gap-2 bg-gradient-to-r from-[#ff6b35] to-orange-500 hover:from-[#e55a2b] hover:to-orange-600 text-white px-4 py-2 rounded-xl transition-all duration-200 text-sm font-medium shadow-md disabled:opacity-70"
                >
                  <RefreshCw size={16} className={isLoading ? "animate-spin" : ""} />
                  Refresh
                </button>
                 <button
  onClick={() => navigate("/admin-register")}
  className="flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white px-4 py-2 rounded-xl shadow-md text-sm font-medium"
>
  + Add New Admin
</button>
              </div>
            </div>
          </div>
        </div>

        <div className="p-8">
          {/* Loading Overlay */}
          {isLoading && activeTab !== "dashboard" && (
            <div className="flex justify-center py-20">
              <div className="relative">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#ff6b35]"></div>
                <div className="absolute inset-0 rounded-full h-12 w-12 border-t-2 border-orange-200 animate-pulse"></div>
              </div>
            </div>
          )}

          {/* DASHBOARD CARDS */}
          {activeTab === "dashboard" && (
            <div className="space-y-8">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {stats.map((s, i) => (
                  <div key={i} className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden">
                    <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${s.color} opacity-5 rounded-bl-full`}></div>
                    <div className="p-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-slate-500 text-sm font-medium">{s.title}</p>
                          <h3 className="text-3xl font-bold text-slate-800 mt-2">{s.value}</h3>
                          <div className="flex items-center gap-1 mt-3">
                            <span className={`text-xs font-medium ${s.change?.startsWith('+') ? 'text-emerald-600' : 'text-rose-600'}`}>{s.change}</span>
                            <span className="text-xs text-slate-400">vs last month</span>
                          </div>
                        </div>
                        <div className={`p-3 rounded-xl bg-gradient-to-br ${s.color} shadow-lg`}>
                          <div className="text-white">{s.icon}</div>
                        </div>
                      </div>
                    </div>
                    <div className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${s.color} w-0 group-hover:w-full transition-all duration-500`}></div>
                  </div>
                ))}
              </div>

              {/* Recent Activity Section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl shadow-sm p-6">
                  <h3 className="text-lg font-semibold text-slate-800 mb-4">Recent Withdrawals</h3>
                  <div className="space-y-3">
                    {withdraws.slice(0, 5).map((wd) => (
                      <div key={wd.id} className="flex justify-between items-center p-3 bg-slate-50 rounded-xl">
                        <div>
                          <p className="font-medium text-slate-800">{wd.guide_name || 'Guide'}</p>
                          <p className="text-xs text-slate-500">{new Date(wd.createdAt).toLocaleDateString()}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-slate-800">₹{wd.amount}</p>
                          {getStatusBadge(wd.status)}
                        </div>
                      </div>
                    ))}
                    {withdraws.length === 0 && <p className="text-slate-400 text-center py-4">No withdrawals</p>}
                  </div>
                </div>
                <div className="bg-white rounded-2xl shadow-sm p-6">
                  <h3 className="text-lg font-semibold text-slate-800 mb-4">Recent Bookings</h3>
                  <div className="space-y-3">
                    {bookings.slice(0, 5).map((booking) => (
                      <div key={booking.id} className="flex justify-between items-center p-3 bg-slate-50 rounded-xl">
                        <div>
                          <p className="font-medium text-slate-800">{booking.user_name || 'User'}</p>
                          <p className="text-xs text-slate-500">{new Date(booking.date).toLocaleDateString()}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-slate-800">₹{booking.amount}</p>
                          {getStatusBadge(booking.status)}
                        </div>
                      </div>
                    ))}
                    {bookings.length === 0 && <p className="text-slate-400 text-center py-4">No bookings</p>}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* APPROVALS TABLE */}
          {activeTab === "approvals" && !isLoading && (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-200 bg-slate-50/50">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-slate-800">Guide Applications</h3>
                  <span className="text-sm text-slate-500">{filteredApps.length} applications</span>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">College</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Guide Name</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Email</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredApps.map((app) => (
                      <tr key={app.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="px-6 py-4 text-sm font-medium text-slate-800">{app.college_name}</td>
                        <td className="px-6 py-4 text-sm text-slate-700">{app.full_name}</td>
                        <td className="px-6 py-4 text-sm text-slate-500">{app.email}</td>
                        <td className="px-6 py-4">{getStatusBadge(app.status)}</td>
                        <td className="px-6 py-4">
                          <div className="flex flex-wrap gap-2">
                            <button onClick={() => handleStatus(app.id, "Approved")} className="px-3 py-1.5 text-xs font-medium rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-all">Approve</button>
                            <button onClick={() => handleStatus(app.id, "Rejected")} className="px-3 py-1.5 text-xs font-medium rounded-lg bg-rose-50 text-rose-700 hover:bg-rose-100 transition-all">Reject</button>
                            <button onClick={() => handlePassGuide(app.id)} className="px-3 py-1.5 text-xs font-medium rounded-lg bg-sky-50 text-sky-700 hover:bg-sky-100 transition-all">Pass Test</button>
                            <button onClick={() => handleResetAttempts(app.id)} className="px-3 py-1.5 text-xs font-medium rounded-lg bg-amber-50 text-amber-700 hover:bg-amber-100 transition-all">Reset</button>
                            <button onClick={() => handleForceActivate(app.id)} className="px-3 py-1.5 text-xs font-medium rounded-lg bg-purple-50 text-purple-700 hover:bg-purple-100 transition-all">Activate</button>
                            <button onClick={() => handleSuspendGuide(app.id)} className="px-3 py-1.5 text-xs font-medium rounded-lg bg-orange-50 text-orange-700 hover:bg-orange-100 transition-all">Suspend</button>
                            <button
  onClick={() => viewGuideDetails(app.id)}
  className="px-3 py-1.5 text-xs rounded-lg bg-indigo-50 text-indigo-700 hover:bg-indigo-100"
>
  View Details
</button>

<button
  onClick={() => viewDocuments(app.id)}
  className="px-3 py-1.5 text-xs rounded-lg bg-slate-50 text-slate-700 hover:bg-slate-100"
>
  View Docs
</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* BOOKINGS TABLE */}
          {activeTab === "bookings" && !isLoading && (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-200 bg-slate-50/50">
                <h3 className="font-semibold text-slate-800">All Bookings</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase">seeker</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase">Guide</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase">Date</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase">Amount</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {paginate(filteredBookings).map((booking) => (
                      <tr key={booking.id} className="hover:bg-slate-50/80 transition-colors">
                       <td className="px-6 py-4 text-sm text-slate-700">
        {booking.seeker_name || booking.seeker_id || "N/A"}
      </td>
                       {/* GUIDE */}
      <td className="px-6 py-4 text-sm text-slate-700">
        {booking.guide_name || booking.guide_id || "N/A"}
      </td>

      {/* DATE */}
      <td className="px-6 py-4 text-sm text-slate-500">
        {booking.time_slot
          ? new Date(booking.time_slot).toLocaleString()
          : "Invalid Date"}
      </td>

      {/* AMOUNT */}
      <td className="px-6 py-4 text-sm font-semibold text-slate-800">
        ₹{booking.amount ?? 0}
      </td>

      {/* STATUS */}
      <td className="px-6 py-4">
        {getStatusBadge(booking.status)}
      </td>

                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* CALLS TABLE */}
          {activeTab === "calls" && !isLoading && (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-200 bg-slate-50/50">
                <h3 className="font-semibold text-slate-800">Call History</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase">seeker</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase">Guide</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase">Duration</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredCalls.map((call) => (
                      <tr key={call.id} className="hover:bg-slate-50/80 transition-colors">
                        {/* USER */}
      <td className="px-6 py-4 text-sm text-slate-700">
        {call.seeker_name || call.seeker_id || "N/A"}
      </td>

      {/* GUIDE */}
      <td className="px-6 py-4 text-sm text-slate-700">
        {call.guide_name || call.guide_id || "N/A"}
      </td>

      {/* DURATION */}
      <td className="px-6 py-4 text-sm text-slate-500">
        {call.duration_minutes
          ? `${call.duration_minutes} min`
          : "—"}
      </td>

      {/* STATUS */}
      <td className="px-6 py-4">
        {getStatusBadge(call.status)}
      </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* WITHDRAWALS TABLE */}
          {activeTab === "withdraws" && !isLoading && (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-200 bg-slate-50/50">
                <h3 className="font-semibold text-slate-800">Withdrawal Requests</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase">Guide</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase">Amount</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase">Requested On</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase">Status</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredWithdraws.map((wd) => (
                      <tr key={wd.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="px-6 py-4 text-sm text-slate-700">{wd.guide_name ||
wd.guide?.name ||
wd.guideId?.name ||
'N/A'}</td>
                        <td className="px-6 py-4 text-sm font-semibold text-slate-800">₹{wd.amount}</td>
                        <td className="px-6 py-4 text-sm text-slate-500">{wd.created_at
  ? new Date(wd.created_at).toLocaleDateString()
  : "Invalid Date"}</td>
                        <td className="px-6 py-4">{getStatusBadge(wd.status)}</td>
                        <td className="px-6 py-4">
  {wd.status === "PENDING" ? (
    <div className="flex gap-2">
      <button
        onClick={() => handleWithdrawApprove(wd.id)}
        className="px-3 py-1.5 text-xs font-medium rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
      >
        Approve
      </button>

      <button
        onClick={() => handleWithdrawReject(wd.id)}
        className="px-3 py-1.5 text-xs font-medium rounded-lg bg-rose-50 text-rose-700 hover:bg-rose-100"
      >
        Reject
      </button>
    </div>
  ) : (
    <span className="text-xs text-slate-400">No actions</span>
  )}
</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* REFUNDS TABLE */}
          {activeTab === "refunds" && !isLoading && (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-200 bg-slate-50/50">
                <h3 className="font-semibold text-slate-800">Refund Requests</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase">Booking ID</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase">User</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase">Amount</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase">Reason</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase">Status</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                  
  {filteredRefunds.map((ref) => (
    <tr
      key={ref.id}
      className="hover:bg-slate-50/80 transition-colors"
    >
      <td className="px-6 py-4 text-sm font-mono text-slate-500">
        {ref.booking_id}
      </td>

      <td className="px-6 py-4 text-sm text-slate-700">
        {ref.user_name || "N/A"}
      </td>

      <td className="px-6 py-4 text-sm font-semibold text-slate-800">
        ₹{ref.amount || "—"}
      </td>

      <td className="px-6 py-4 text-sm text-slate-500">
        {ref.reason || "—"}
      </td>

      <td className="px-6 py-4">
        {getStatusBadge(ref.status)}
      </td>

      <td className="px-6 py-4">
                {ref.status === "PENDING" ? (
                <div className="flex gap-2">
  <button
    onClick={() => handleRefund(ref.booking_id, "APPROVED")}
    className="px-3 py-1.5 text-xs font-medium rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
  >
    Approve
  </button>

  <button
    onClick={() => handleRefund(ref.booking_id, "REJECTED")}
    className="px-3 py-1.5 text-xs font-medium rounded-lg bg-rose-50 text-rose-700 hover:bg-rose-100"
  >
    Reject
  </button>
</div>
                ) : (
                  <span className="text-xs text-slate-400">
                    No actions
                  </span>
                )}
              </td>
            </tr>
          ))}

                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* USERS TABLE */}
          {activeTab === "users" && !isLoading && (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-200 bg-slate-50/50">
                <h3 className="font-semibold text-slate-800">User Management</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase">Name</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase">Email</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase">Role</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase">Status</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredUsers.map((user) => (
                      <tr key={user.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="px-6 py-4 text-sm font-medium text-slate-800">{user.name}</td>
                        <td className="px-6 py-4 text-sm text-slate-500">{user.email}</td>
                        <td className="px-6 py-4">
                          <span className="px-2 py-1 rounded-lg bg-slate-100 text-slate-600 text-xs font-medium capitalize">{user.role}</span>
                        </td>
                        <td className="px-6 py-4">{getStatusBadge(user.status)}</td>
                        <td className="px-6 py-4">
                          {user.status === 'suspended' ? (
                            <button onClick={() => handleActivateUser(user.id)} className="px-3 py-1.5 text-xs font-medium rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-all flex items-center gap-1"><UserCheck size={12} /> Activate</button>
                          ) : (
                            <button onClick={() => handleSuspendUser(user.id)} className="px-3 py-1.5 text-xs font-medium rounded-lg bg-rose-50 text-rose-700 hover:bg-rose-100 transition-all flex items-center gap-1"><UserX size={12} /> Suspend</button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          {activeTab === "questions" && !isLoading && (
  <div className="bg-white rounded-2xl shadow-sm border p-6">

    <h3 className="text-lg font-semibold mb-4">
      Manage Eligibility Questions
    </h3>

    {/* FORM */}
    <div className="flex gap-4 mb-6">

      <input
        placeholder="Enter question"
        value={questionText}
        onChange={(e) => setQuestionText(e.target.value)}
        className="border px-4 py-2 rounded-lg w-full"
      />

      <input
        placeholder="Correct answer"
        value={answerText}
        onChange={(e) => setAnswerText(e.target.value)}
        className="border px-4 py-2 rounded-lg w-full"
      />

      <button
        onClick={handleSaveQuestion}
        className="bg-[#ff6b35] text-white px-6 rounded-lg"
      >
        {editingId ? "Update" : "Create"}
      </button>

    </div>

    {/* QUESTIONS TABLE */}

    <table className="min-w-full divide-y divide-slate-200">

      <thead>
        <tr>
          <th className="px-4 py-2 text-left">Question</th>
          <th className="px-4 py-2 text-left">Answer</th>
          <th className="px-4 py-2 text-left">Actions</th>
        </tr>
      </thead>

      <tbody>
        {questions.map((q) => (
          <tr key={q.id}>

            <td className="px-4 py-2">
              {q.question}
            </td>

            <td className="px-4 py-2">
              {q.correct_answer}
            </td>

            <td className="px-4 py-2 flex gap-2">

              <button
                onClick={() => {
                  setEditingId(q.id);
                  setQuestionText(q.question);
                  setAnswerText(q.correct_answer);
                }}
                className="bg-sky-50 text-sky-700 px-3 py-1 rounded"
              >
                Edit
              </button>

              <button
                onClick={() => handleDeleteQuestion(q.id)}
                className="bg-rose-50 text-rose-700 px-3 py-1 rounded"
              >
                Delete
              </button>

            </td>

          </tr>
        ))}
      </tbody>

    </table>

  </div>
)}

          {/* Empty States */}
          {!isLoading && activeTab !== "dashboard" && (
            <>
              {activeTab === "approvals" && filteredApps.length === 0 && (
                <div className="bg-white rounded-2xl shadow-sm p-16 text-center">
                  <div className="w-20 h-20 mx-auto bg-slate-100 rounded-2xl flex items-center justify-center mb-4">
                    <UserCheck className="h-10 w-10 text-slate-400" />
                  </div>
                  <p className="text-slate-500 font-medium">No pending approvals</p>
                  <p className="text-slate-400 text-sm mt-1">All guide applications have been processed</p>
                </div>
              )}
              {activeTab === "bookings" && bookings.length === 0 && (
                <div className="bg-white rounded-2xl shadow-sm p-16 text-center">
                  <div className="w-20 h-20 mx-auto bg-slate-100 rounded-2xl flex items-center justify-center mb-4">
                    <BookOpen className="h-10 w-10 text-slate-400" />
                  </div>
                  <p className="text-slate-500 font-medium">No bookings found</p>
                  <p className="text-slate-400 text-sm mt-1">Bookings will appear here once created</p>
                </div>
              )}
              {activeTab === "calls" && calls.length === 0 && (
                <div className="bg-white rounded-2xl shadow-sm p-16 text-center">
                  <div className="w-20 h-20 mx-auto bg-slate-100 rounded-2xl flex items-center justify-center mb-4">
                    <Phone className="h-10 w-10 text-slate-400" />
                  </div>
                  <p className="text-slate-500 font-medium">No calls recorded</p>
                  <p className="text-slate-400 text-sm mt-1">Call history will appear here</p>
                </div>
              )}
              {activeTab === "withdraws" && withdraws.length === 0 && (
                <div className="bg-white rounded-2xl shadow-sm p-16 text-center">
                  <div className="w-20 h-20 mx-auto bg-slate-100 rounded-2xl flex items-center justify-center mb-4">
                    <CreditCard className="h-10 w-10 text-slate-400" />
                  </div>
                  <p className="text-slate-500 font-medium">No withdrawal requests</p>
                  <p className="text-slate-400 text-sm mt-1">Pending withdrawals will appear here</p>
                </div>
              )}
              {activeTab === "refunds" && refunds.length === 0 && (
                <div className="bg-white rounded-2xl shadow-sm p-16 text-center">
                  <div className="w-20 h-20 mx-auto bg-slate-100 rounded-2xl flex items-center justify-center mb-4">
                    <RotateCcw className="h-10 w-10 text-slate-400" />
                  </div>
                  <p className="text-slate-500 font-medium">No refund requests</p>
                  <p className="text-slate-400 text-sm mt-1">Refund requests will appear here</p>
                </div>
              )}
              {activeTab === "users" && users.length === 0 && (
                <div className="bg-white rounded-2xl shadow-sm p-16 text-center">
                  <div className="w-20 h-20 mx-auto bg-slate-100 rounded-2xl flex items-center justify-center mb-4">
                    <Users className="h-10 w-10 text-slate-400" />
                  </div>
                  <p className="text-slate-500 font-medium">No users found</p>
                  <p className="text-slate-400 text-sm mt-1">Users will appear here once registered</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
      {showGuideModal && selectedGuide && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
    <div className="bg-white rounded-2xl shadow-xl w-[420px] p-6 relative">

      <h2 className="text-lg font-semibold mb-4">
        Guide Details
      </h2>

      <div className="space-y-2 text-sm">

        <p><strong>College:</strong> {selectedGuide.college}</p>

        <p><strong>Branch:</strong> {selectedGuide.branch}</p>

        <p><strong>Wallet:</strong> ₹{selectedGuide.wallet}</p>

        <p><strong>Attempts:</strong> {selectedGuide.attempts}</p>

        <p><strong>Status:</strong> {selectedGuide.status}</p>

        <p><strong>Verified By:</strong> {selectedGuide.verified_by || "—"}</p>

        <p>
          <strong>Verified At:</strong>{" "}
          {selectedGuide.verified_at
            ? new Date(selectedGuide.verified_at).toLocaleString()
            : "—"}
        </p>

      </div>

      <div className="flex justify-end mt-6">
        <button
          onClick={() => setShowGuideModal(false)}
          className="px-4 py-2 text-sm bg-slate-200 rounded-lg hover:bg-slate-300"
        >
          Close
        </button>
      </div>

    </div>
  </div>
)}
    </div>
  );
}

export default AdminDashboard;
