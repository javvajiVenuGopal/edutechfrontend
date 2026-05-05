import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { FileDown, Download, ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";
import { downloadReport,generateReport } from "../../../Apiroute";

function DownloadReport() {

  const { bookingId } = useParams();

  const navigate = useNavigate();

  const [isDownloading, setIsDownloading] = useState(false);


  // ✅ Download real report from backend

 const handleDownload = async () => {

  if (!bookingId) {
    toast.error("Invalid booking ID");
    return;
  }

  try {

    setIsDownloading(true);

    // STEP 1: generate report first
    await generateReport(bookingId);

    // STEP 2: download report
    const res = await downloadReport(bookingId);

    const blob = new Blob(
      [res.data],
      { type: "application/pdf" }
    );

    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;

    a.download = `session-report-${bookingId}.pdf`;

    document.body.appendChild(a);

    a.click();

    a.remove();

    window.URL.revokeObjectURL(url);

    toast.success("Report downloaded successfully 📄");

    navigate("/seeker");

  } catch (error) {

    console.log(error);

    toast.error("Report not ready yet. Complete rating & feedback first ❌");

  } finally {

    setIsDownloading(false);

  }

};


  return (

    <div className="min-h-screen bg-[#fffbed] flex flex-col items-center justify-center px-6">

      {/* Back button */}

      <motion.button
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        onClick={() => navigate(-1)}
        className="absolute top-6 left-6 flex items-center gap-2 text-gray-500 hover:text-orange-500"
      >
        <ArrowLeft size={20} />
        Back
      </motion.button>


      {/* Card */}

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white shadow-xl rounded-2xl p-8 text-center max-w-md w-full"
      >

        <div className="flex justify-center mb-4">

          <div className="p-4 rounded-full bg-orange-500">

            <FileDown className="text-white" size={30} />

          </div>

        </div>


        <h2 className="text-2xl font-bold mb-2">

          Download Session Report

        </h2>

        <p className="text-gray-500 mb-6">

          Your personalized guidance report is ready.

        </p>


        <button
          onClick={handleDownload}
          disabled={isDownloading}
          className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl w-full flex items-center justify-center gap-2"
        >

          {isDownloading ? (

            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Downloading...
            </>

          ) : (

            <>
              <Download size={18} />
              Download Report
            </>

          )}

        </button>

      </motion.div>

    </div>

  );

}

export default DownloadReport;