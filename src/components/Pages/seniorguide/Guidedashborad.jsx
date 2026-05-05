import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { XCircle } from "lucide-react";

function SeniorGuideDashboard() {

  const navigate = useNavigate();

  const [data, setData] = useState(null);


  useEffect(() => {

    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    // 🚨 if not logged in
    if (!token) {

      navigate("/login");
      return;

    }

    // 🚨 if wrong role
    if (role !== "senior_guide") {

      navigate("/");
      return;

    }

    // ✅ temporary dashboard session data
    // later replace with API call
    setData({
      name: "Senior Guide",
      status: "Passed"
    });

  }, [navigate]);


  // ⏳ loading state

  if (!data) {

    return (
      <div className="min-h-screen flex items-center justify-center text-lg">
        Loading dashboard...
      </div>
    );

  }


  // ❌ block access if test not passed

  if (data.status !== "Passed") {

    return (

      <div className="min-h-screen flex items-center justify-center">

        <div className="bg-white p-6 rounded-xl shadow-lg text-center">

          <XCircle size={40} />

          <h2 className="mt-4 text-xl font-semibold">
            Application Status: {data.status}
          </h2>

          <button
            onClick={() => navigate(-1)}
            className="mt-4 bg-[#ff6b35] text-white px-4 py-2 rounded"
          >
            Go Back
          </button>

        </div>

      </div>

    );

  }


  // ✅ dashboard menu items

  const menu = [

    { title: "Application Status", path: "/guide-status" },

    { title: "Availability Slots", path: "/slots" },

    { title: "Upcoming Calls", path: "/upcoming-calls" },

    { title: "Call History", path: "/call-history" },

    { title: "College Feedback", path: "/Feedback" },

    { title: "Wallet", path: "/wallet" },

    { title: "Withdraw Request", path: "/withdraw" },

    { title: "Referral", path: "/referral" }

  ];


  return (

    <div className="min-h-screen bg-[#fffbed] p-6">

      {/* HEADER */}

      <h1 className="text-2xl font-bold mb-6">

        Welcome back, {data.name}

      </h1>


      {/* MENU GRID */}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

        {menu.map((item, index) => (

          <button

            key={index}

            onClick={() => navigate(item.path)}

            className="bg-white shadow hover:shadow-lg p-4 rounded-lg transition"

          >

            {item.title}

          </button>

        ))}

      </div>

    </div>

  );

}

export default SeniorGuideDashboard;