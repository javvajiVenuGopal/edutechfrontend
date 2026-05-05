import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CheckCircle,
  XCircle,
  Clock,
  ArrowLeft,
  AlertCircle,
  Loader2,
  GraduationCap,
  BookOpen,
  Calendar,
  User,
  Briefcase,
  Mail,
  Phone,
  MapPin,
  Award
} from "lucide-react";
import toast from "react-hot-toast";
import {
  getGuideApplicationStatus,
  getGuideProfile
} from "../../../Apiroute";

function GuideStatus() {

  const navigate = useNavigate();

  const [status, setStatus] = useState(null);
  const [guide, setGuide] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGuideData();
  }, []);

  const fetchGuideData = async () => {
    try {

      const statusRes = await getGuideApplicationStatus();
      const profileRes = await getGuideProfile();

      console.log("STATUS:", statusRes.data);
      console.log("PROFILE:", profileRes.data);

      setStatus(statusRes.data.status);
      setGuide(profileRes.data);

    } catch (err) {
      toast.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center" style={{ backgroundColor: "#fffbed" }}>
        <div className="relative">
          <div className="w-16 h-16 border-4 border-t-[#ff6b35] border-r-[#ff6b35] border-b-transparent border-l-transparent rounded-full animate-spin" />
          <div className="absolute inset-0 w-16 h-16 border-4 border-[#ff6b35]/20 rounded-full" />
        </div>
        <p className="mt-4 text-sm font-medium" style={{ color: "#545454" }}>Loading application status...</p>
      </div>
    );

  if (!guide)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center" style={{ backgroundColor: "#fffbed" }}>
        <div className="w-20 h-20 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: "#ffebdd" }}>
          <AlertCircle size={40} style={{ color: "#ff6b35" }} />
        </div>
        <p className="text-xl font-semibold mb-2" style={{ color: "#545454" }}>No Guide Profile Found</p>
        <p className="text-sm mb-6" style={{ color: "#545454/60" }}>You haven't applied to become a guide yet</p>
        <button
          onClick={() => navigate("/become-guide")}
          className="px-6 py-2.5 rounded-xl text-white font-medium transition-all hover:shadow-lg"
          style={{ background: "linear-gradient(135deg, #ff6b35, #e55a2b)" }}
        >
          Become a Guide
        </button>
      </div>
    );

  // STATUS UI
  const getStatusUI = () => {
    if (status === "ACTIVE")
      return {
        icon: <CheckCircle size={28} />,
        text: "Approved",
        color: "#10b981",
        bg: "#d1fae5",
        border: "#a7f3d0",
        message: "Congratulations! Your application has been approved. You can now start guiding students.",
        step: 3
      };
    if (status === "REJECTED")
      return {
        icon: <XCircle size={28} />,
        text: "Rejected",
        color: "#ef4444",
        bg: "#fee2e2",
        border: "#fecaca",
        message: "Your application has been rejected. Please review the requirements and reapply with valid information.",
        step: 1
      };
    return {
      icon: <Clock size={28} />,
      text: "Pending Review",
      color: "#f59e0b",
      bg: "#fef3c7",
      border: "#fde68a",
      message: "Your application is under review by our team. You will be notified once a decision is made.",
      step: 2
    };
  };

  const statusUI = getStatusUI();

  // Application steps
  const steps = [
    { id: 1, title: "Application Submitted", completed: status === "PENDING" || status === "ACTIVE" || status === "REJECTED" },
    { id: 2, title: "Under Review", completed: status === "ACTIVE" },
    { id: 3, title: "Approved", completed: status === "ACTIVE" }
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#fffbed" }}>
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ backgroundColor: "#ff6b35" }} />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse delay-1000" style={{ backgroundColor: "#545454" }} />
      </div>

      <div className="relative max-w-5xl mx-auto pt-20 pb-12 px-6">
        
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 mb-8 px-4 py-2 rounded-xl transition-all hover:shadow-md group bg-white"
          style={{ color: "#545454", border: "1px solid #ffebdd" }}
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium">Back</span>
        </button>

        {/* Header Section */}
        <div className="mb-10">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-bold" style={{ color: "#545454" }}>Application Status</h1>
              <p className="text-sm mt-1" style={{ color: "#545454/60" }}>Track your guide application progress</p>
              <div className="w-20 h-1 bg-gradient-to-r from-[#ff6b35] to-[#ff6b35]/70 rounded-full mt-3"></div>
            </div>
            <div className="px-4 py-2 rounded-xl bg-white shadow-sm" style={{ border: "1px solid #ffebdd" }}>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: statusUI.color }} />
                <span className="text-xs font-medium" style={{ color: statusUI.color }}>{statusUI.text}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Status Timeline */}
        <div className="bg-white rounded-2xl shadow-xl border border-[#fffbed] p-6 mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, idx) => (
              <div key={step.id} className="flex-1 relative">
                <div className="flex flex-col items-center">
                  <div 
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                      step.completed 
                        ? "bg-gradient-to-r from-[#ff6b35] to-[#e55a2b] shadow-lg" 
                        : "bg-gray-100"
                    }`}
                  >
                    {step.completed ? (
                      <CheckCircle size={18} className="text-white" />
                    ) : (
                      <span className="text-sm font-medium" style={{ color: "#545454/40" }}>{step.id}</span>
                    )}
                  </div>
                  <p className={`text-xs font-medium mt-2 text-center ${step.completed ? "text-[#ff6b35]" : "text-[#545454/40]"}`}>
                    {step.title}
                  </p>
                </div>
                {idx < steps.length - 1 && (
                  <div 
                    className={`absolute top-5 left-1/2 w-full h-0.5 -translate-y-1/2 ${
                      step.completed && steps[idx + 1].completed ? "bg-[#ff6b35]" : "bg-gray-200"
                    }`}
                    style={{ left: "calc(50% + 20px)", width: "calc(100% - 40px)" }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Status Message Card */}
        <div 
          className="bg-white rounded-2xl shadow-xl overflow-hidden border mb-8 transition-all hover:shadow-2xl"
          style={{ borderColor: statusUI.border }}
        >
          <div className="px-6 py-5" style={{ backgroundColor: statusUI.bg }}>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-white shadow-sm">
                <span style={{ color: statusUI.color }}>{statusUI.icon}</span>
              </div>
              <div>
                <h2 className="font-semibold" style={{ color: "#545454" }}>Current Status</h2>
                <p className="text-2xl font-bold mt-1" style={{ color: statusUI.color }}>{statusUI.text}</p>
              </div>
            </div>
          </div>
          <div className="p-6">
            <div className="flex items-start gap-3 p-4 rounded-xl" style={{ backgroundColor: `${statusUI.color}08`, borderLeft: `4px solid ${statusUI.color}` }}>
              <AlertCircle size={20} style={{ color: statusUI.color }} />
              <p className="text-sm leading-relaxed" style={{ color: "#545454" }}>{statusUI.message}</p>
            </div>
          </div>
        </div>

        {/* Profile Information Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-[#fffbed]">
          <div className="px-6 py-4" style={{ background: "linear-gradient(135deg, #ff6b35, #e55a2b)" }}>
            <div className="flex items-center gap-2">
              <User className="text-white" size={20} />
              <h3 className="font-semibold text-white">Profile Information</h3>
            </div>
            <p className="text-orange-100 text-xs mt-1">Your submitted application details</p>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* College Information */}
              <div className="space-y-4">
                <div className="flex items-start gap-3 pb-3 border-b border-[#ffebdd]">
                  <div className="p-2 rounded-lg" style={{ backgroundColor: "#fffbed" }}>
                    <GraduationCap size={18} style={{ color: "#ff6b35" }} />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs uppercase tracking-wide" style={{ color: "#545454/50" }}>College Name</p>
                    <p className="font-medium mt-0.5" style={{ color: "#545454" }}>{guide.college_name || "Not provided"}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 pb-3 border-b border-[#ffebdd]">
                  <div className="p-2 rounded-lg" style={{ backgroundColor: "#fffbed" }}>
                    <BookOpen size={18} style={{ color: "#ff6b35" }} />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs uppercase tracking-wide" style={{ color: "#545454/50" }}>Branch / Department</p>
                    <p className="font-medium mt-0.5" style={{ color: "#545454" }}>{guide.branch || "Not provided"}</p>
                  </div>
                </div>
              </div>

              {/* Academic Information */}
              <div className="space-y-4">
                <div className="flex items-start gap-3 pb-3 border-b border-[#ffebdd]">
                  <div className="p-2 rounded-lg" style={{ backgroundColor: "#fffbed" }}>
                    <Calendar size={18} style={{ color: "#ff6b35" }} />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs uppercase tracking-wide" style={{ color: "#545454/50" }}>Year of Study</p>
                    <p className="font-medium mt-0.5" style={{ color: "#545454" }}>{guide.year_of_study || "Not provided"}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg" style={{ backgroundColor: "#fffbed" }}>
                    <Award size={18} style={{ color: "#ff6b35" }} />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs uppercase tracking-wide" style={{ color: "#545454/50" }}>Application ID</p>
                    <p className="font-mono text-sm font-medium mt-0.5" style={{ color: "#ff6b35" }}>
                      {guide.id || guide._id || "APP-" + Math.random().toString(36).substr(2, 8).toUpperCase()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Help Section */}
        <div className="mt-8 p-5 rounded-xl text-center" style={{ backgroundColor: "#fffbed", border: "1px solid #ffebdd" }}>
          <p className="text-sm" style={{ color: "#545454/60" }}>
            Need assistance? Contact our support team at{" "}
            <a href="mailto:support@careerguide.com" className="font-medium hover:underline" style={{ color: "#ff6b35" }}>
              support@careerguide.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default GuideStatus;