import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
 import { applySeniorGuide } from "../../../Apiroute";
 import toast from "react-hot-toast";
 import { getGuideApplicationStatus } from "../../../Apiroute";
function SeniorGuideForm() {
  const navigate = useNavigate();
 const [referralCode, setReferralCode] = useState("");
  const [form, setForm] = useState({
    college_name: "",
    branch: "",
    year_of_study: "",
    aadhaar_number: "",
    aadhaar_file: null,
    college_id_file: null,
    hall_ticket_file: null,
  });

  const [fileName, setFileName] = useState({
    aadhaar_file: "",
    college_id_file: "",
    hall_ticket_file: "",
  });
useEffect(() => {

  const checkGuideStatus = async () => {

    try {

      const res = await getGuideApplicationStatus();

      const status = res.data.status;

      console.log("Guide status:", status);

          if (!status && location.pathname !== "/become-guide") {
  navigate("/become-guide");
  return;
}

if (status === "PENDING_VERIFICATION" && location.pathname !== "/pending-approval") {
  navigate("/pending-approval");
  return;
}

if (status === "ELIGIBLE_TEST" && location.pathname !== "/guide-test") {
  navigate("/guide-test");
  return;
}

if (status === "TEST_PENDING" && location.pathname !== "/test-pending") {
  navigate("/test-pending");
  return;
}

if (status === "ACTIVE" && location.pathname !== "/guide-dashboard") {
  navigate("/guide-dashboard");
  return;
}


      if (status === "REJECTED") {
  toast.error("Application rejected. Please reapply.");
  return;
}

    } catch (err) {

      console.log("Guide status not found → show become guide");

      navigate("/become-guide");

    }

  };

  checkGuideStatus();

}, []);
  const handleChange = (e) => {
    const { name, files, value } = e.target;

    if (files) {
      setForm((prev) => ({ ...prev, [name]: files[0] }));
      setFileName((prev) => ({
        ...prev,
        [name]: files[0]?.name || "",
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };
  

  




const handleSubmit = async (e) => {

  e.preventDefault();

  if (!/^\d{12}$/.test(form.aadhaar_number)) {
    toast.error("Aadhaar must be 12 digits");
    return;
  }

  try {

    const formData = new FormData();

    formData.append("college_name", form.college_name);
formData.append("branch", form.branch);
formData.append("year_of_study", form.year_of_study);
formData.append("aadhaar_number", form.aadhaar_number);
formData.append("aadhaar", form.aadhaar_file);
formData.append("college_id", form.college_id_file);
formData.append("hall_ticket", form.hall_ticket_file);
   console.log(form)
    if (referralCode) {
      console.log(referralCode)
      formData.append("referral_code", referralCode);
    } 
    console.log(formData)

    await applySeniorGuide(formData);

    toast.success("Application submitted successfully ✅");

    navigate("/pending-approval");

  } catch (err) {

    console.error(err);
    toast.error("Submission failed ❌");

  }
};

  return (
    <div
      className="min-h-screen py-12 px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: "#fffbed" }}
    >
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="text-center mb-8">
          <h2
            className="text-3xl font-extrabold sm:text-4xl"
            style={{ color: "#545454" }}
          >
            Senior Guide Registration
          </h2>
          <p className="mt-2 text-md" style={{ color: "#545454" }}>
            Join our mentorship program and guide the next generation of leaders
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
        >
          <div className="px-6 py-8 sm:p-10">

            {/* Personal Info */}
            <div className="mb-8">
              <h3
                className="text-lg font-semibold mb-4"
                style={{ color: "#545454" }}
              >
                Personal Information
              </h3>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

                {/* College */}
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium mb-1">
                    College Name *
                  </label>
                  <input
                    name="college_name"
                    placeholder="Enter your college name"
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300"
                  />
                </div>
<div>
  <label className="block text-sm font-medium mb-1">
    Branch *
  </label>
  <input
    type="text"
    name="branch"
    placeholder="Enter your branch (e.g., CSE)"
    onChange={handleChange}
    required
    className="w-full px-4 py-2.5 rounded-lg border border-gray-300"
  />
</div>

                {/* Year of Study (UPDATED INPUT FIELD) */}
               <div>
  <label className="block text-sm font-medium mb-1">
    Year of Study *
  </label>
  <input
    type="text"
    name="year_of_study"
    placeholder="Enter your year (e.g., 1st Year)"
    onChange={handleChange}
    required
    className="w-full px-4 py-2.5 rounded-lg border border-gray-300"
  />
</div>

              </div>
            </div>

            {/* Document Verification */}
            <div className="mb-8">
              <h3
                className="text-lg font-semibold mb-4"
                style={{ color: "#545454" }}
              >
                Document Verification
              </h3>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

                {/* Aadhaar */}
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium mb-1">
                    Aadhaar Number *
                  </label>
                  <input
                    name="aadhaar_number"
                    placeholder="12-digit Aadhaar number"
                    maxLength="12"
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300"
                  />
                </div>

               <div>
  <label className="block text-sm font-medium mb-1">
    Referral Code (optional)
  </label>
  <input
    placeholder="Enter referral code"
    value={referralCode}
    onChange={(e)=>setReferralCode(e.target.value)}
    className="w-full px-4 py-2.5 rounded-lg border border-gray-300"
  />
</div>

              </div>
            </div>

            {/* Upload Files */}
           <div className="mb-8">
  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2" style={{ color: "#545454" }}>
    <svg className="w-5 h-5" style={{ color: "#ff6b35" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
    </svg>
    Upload Documents
  </h3>

  <div className="space-y-4">
    {/* Aadhaar Upload */}
    <div>
      <label className="block text-sm font-medium mb-1" style={{ color: "#545454" }}>
        Aadhaar Card <span style={{ color: "#ff6b35" }}>*</span>
      </label>
      <label className="relative cursor-pointer group">
        <input
          type="file"
          name="aadhaar_file"
          onChange={handleChange}
          required
          className="hidden"
        />
        <div 
          className="border-2 border-dashed rounded-xl p-4 transition-all duration-200 group-hover:border-opacity-100"
          style={{ 
            borderColor: fileName.aadhaar_file ? "#ff6b35" : "#d1d5db",
            backgroundColor: fileName.aadhaar_file ? "#fff0e8" : "#fafafa"
          }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div 
                className="w-10 h-10 rounded-lg flex items-center justify-center transition-colors"
                style={{ backgroundColor: fileName.aadhaar_file ? "#ff6b35" : "#f3f4f6" }}
              >
                {fileName.aadhaar_file ? (
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" style={{ color: "#9ca3af" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                )}
              </div>
              <div>
                <p className="text-sm font-medium" style={{ color: "#545454" }}>
                  {fileName.aadhaar_file || "Click to upload Aadhaar card"}
                </p>
                <p className="text-xs" style={{ color: "#9ca3af" }}>
                  PDF, JPG, PNG up to 5MB
                </p>
              </div>
            </div>
            {!fileName.aadhaar_file && (
              <div 
                className="px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
                style={{ backgroundColor: "#fff0e8", color: "#ff6b35" }}
              >
                Browse
              </div>
            )}
            {fileName.aadhaar_file && (
              <button
                type="button"
                onClick={() => {
                  setForm(prev => ({ ...prev, aadhaar_file: null }));
                  setFileName(prev => ({ ...prev, aadhaar_file: "" }));
                }}
                className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                style={{ color: "#9ca3af" }}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </label>
    </div>

    {/* College ID Upload */}
    <div>
      <label className="block text-sm font-medium mb-1" style={{ color: "#545454" }}>
        College ID Card <span style={{ color: "#ff6b35" }}>*</span>
      </label>
      <label className="relative cursor-pointer group">
        <input
          type="file"
          name="college_id_file"
          onChange={handleChange}
          required
          className="hidden"
        />
        <div 
          className="border-2 border-dashed rounded-xl p-4 transition-all duration-200 group-hover:border-opacity-100"
          style={{ 
            borderColor: fileName.college_id_file ? "#ff6b35" : "#d1d5db",
            backgroundColor: fileName.college_id_file ? "#fff0e8" : "#fafafa"
          }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div 
                className="w-10 h-10 rounded-lg flex items-center justify-center transition-colors"
                style={{ backgroundColor: fileName.college_id_file ? "#ff6b35" : "#f3f4f6" }}
              >
                {fileName.college_id_file ? (
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" style={{ color: "#9ca3af" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                )}
              </div>
              <div>
                <p className="text-sm font-medium" style={{ color: "#545454" }}>
                  {fileName.college_id_file || "Click to upload College ID card"}
                </p>
                <p className="text-xs" style={{ color: "#9ca3af" }}>
                  PDF, JPG, PNG up to 5MB
                </p>
              </div>
            </div>
            {!fileName.college_id_file && (
              <div 
                className="px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
                style={{ backgroundColor: "#fff0e8", color: "#ff6b35" }}
              >
                Browse
              </div>
            )}
            {fileName.college_id_file && (
              <button
                type="button"
                onClick={() => {
                  setForm(prev => ({ ...prev, college_id_file: null }));
                  setFileName(prev => ({ ...prev, college_id_file: "" }));
                }}
                className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                style={{ color: "#9ca3af" }}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </label>
    </div>

    {/* Hall Ticket Upload */}
    <div>
      <label className="block text-sm font-medium mb-1" style={{ color: "#545454" }}>
        Hall Ticket <span style={{ color: "#ff6b35" }}>*</span>
      </label>
      <label className="relative cursor-pointer group">
        <input
          type="file"
          name="hall_ticket_file"
          onChange={handleChange}
          required
          className="hidden"
        />
        <div 
          className="border-2 border-dashed rounded-xl p-4 transition-all duration-200 group-hover:border-opacity-100"
          style={{ 
            borderColor: fileName.hall_ticket_file ? "#ff6b35" : "#d1d5db",
            backgroundColor: fileName.hall_ticket_file ? "#fff0e8" : "#fafafa"
          }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div 
                className="w-10 h-10 rounded-lg flex items-center justify-center transition-colors"
                style={{ backgroundColor: fileName.hall_ticket_file ? "#ff6b35" : "#f3f4f6" }}
              >
                {fileName.hall_ticket_file ? (
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" style={{ color: "#9ca3af" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                )}
              </div>
              <div>
                <p className="text-sm font-medium" style={{ color: "#545454" }}>
                  {fileName.hall_ticket_file || "Click to upload Hall Ticket"}
                </p>
                <p className="text-xs" style={{ color: "#9ca3af" }}>
                  PDF, JPG, PNG up to 5MB
                </p>
              </div>
            </div>
            {!fileName.hall_ticket_file && (
              <div 
                className="px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
                style={{ backgroundColor: "#fff0e8", color: "#ff6b35" }}
              >
                Browse
              </div>
            )}
            {fileName.hall_ticket_file && (
              <button
                type="button"
                onClick={() => {
                  setForm(prev => ({ ...prev, hall_ticket_file: null }));
                  setFileName(prev => ({ ...prev, hall_ticket_file: "" }));
                }}
                className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                style={{ color: "#9ca3af" }}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </label>
    </div>
  </div>
</div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full font-semibold py-3 rounded-xl"
              style={{
                backgroundColor: "#ff6b35",
                color: "white",
              }}
            >
              Register as Senior Guide
            </button>

          </div>
        </form>
      </div>
    </div>
  );
}

export default SeniorGuideForm;
