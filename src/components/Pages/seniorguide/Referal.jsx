import { useEffect, useState } from "react";
import { Gift, Copy } from "lucide-react";

import {
  getReferralCode,
  getReferralStats
} from "../../../Apiroute";
import toast from "react-hot-toast";
function Referral() {

  const [code, setCode] = useState("");
  const [referrals, setReferrals] = useState(0);
  const [earnings, setEarnings] = useState(0);
  const [loading, setLoading] = useState(true);

  // ===============================
  // LOAD REFERRAL DATA
  // ===============================

  useEffect(() => {
    loadReferralData();
  }, []);

  const loadReferralData = async () => {

    try {

      // GET REFERRAL CODE
      const codeRes = await getReferralCode();

      console.log("Referral code response:", codeRes.data);

      // supports REF-SG-5 format backend
      const referralCode =
        codeRes.data.referral_code ||
        codeRes.data.code ||
        "";

      setCode(referralCode);


      // GET REFERRAL STATS
      const statsRes = await getReferralStats();

      console.log("Referral stats response:", statsRes.data);

      setReferrals(
        statsRes.data.total_referrals || 0
      );

      setEarnings(
        statsRes.data.total_earnings || 0
      );

    } catch (err) {

      console.error("Referral load failed:", err);

      toast.error("Failed to load referral data");

    } finally {

      setLoading(false);

    }

  };


  // ===============================
  // COPY REFERRAL CODE
  // ===============================

  const copyCode = () => {

    if (!code) {

      toast.error("Referral code not available");

      return;

    }

    navigator.clipboard.writeText(code);

    toast.success("Referral code copied ✅");

  };


  // ===============================
  // LOADING SCREEN
  // ===============================

  if (loading)
    return (
      <p className="text-center mt-40 text-lg">
        Loading referral details...
      </p>
    );


  return (

    <div className="min-h-screen bg-[#54545454] p-6">

      {/* HEADER */}

      <div className="bg-white p-6 rounded-xl shadow mb-6 flex items-center gap-2">

        <Gift className="text-[#ff6b35]" />

        <h1 className="text-2xl font-bold">
          Referral Program
        </h1>

      </div>


      {/* INVITE CARD */}

      <div className="bg-gradient-to-r from-[#ff6b35] to-[#ff8c42] text-white p-6 rounded-xl shadow mb-6 text-center">

        <h2 className="text-lg">
          Invite & Earn
        </h2>

        <p className="text-2xl font-bold mt-2">
          ₹25 per referral 🎉
        </p>

      </div>


      {/* REFERRAL CODE */}

      <div className="bg-white p-6 rounded-xl shadow mb-6 text-center">

        <p className="text-gray-500 mb-2">
          Your Referral Code
        </p>

        <div className="flex justify-center items-center gap-3">

          <span className="bg-gray-100 px-6 py-2 rounded-lg font-semibold text-lg">

            {code || "Not available"}

          </span>

          <button
            onClick={copyCode}
            className="bg-[#ff6b35] text-white px-4 py-2 rounded-lg hover:bg-[#e55a28]"
          >

            <Copy size={16} />

          </button>

        </div>

      </div>


      {/* STATS */}

      <div className="grid grid-cols-2 gap-4">

        <div className="bg-white p-5 rounded-xl shadow text-center">

          <p className="text-gray-500 text-sm">
            Total Referrals
          </p>

          <p className="text-2xl font-bold">
            {referrals}
          </p>

        </div>


        <div className="bg-white p-5 rounded-xl shadow text-center">

          <p className="text-gray-500 text-sm">
            Total Earnings
          </p>

          <p className="text-2xl font-bold text-green-600">
            ₹{earnings}
          </p>

        </div>

      </div>

    </div>

  );

}

export default Referral;