import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getGuideTestQuestions,
  submitGuideTest,
  getGuideApplicationStatus
} from "../../../Apiroute";
import toast from "react-hot-toast";
function GuideTest() {

  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // ================= LOAD QUESTIONS =================
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

if (status === "REJECTED" && location.pathname !== "/become-guide") {
  navigate("/become-guide");
  return;
}

    } catch (err) {

      console.log("Guide status not found → show become guide");

      navigate("/become-guide");

    }

  };

  checkGuideStatus();

}, []);
  useEffect(() => {

    const loadQuestions = async () => {

      try {

        const res = await getGuideTestQuestions();

        setQuestions(res.data || []);

      } catch (err) {

        console.error("Failed to load questions", err);

      } finally {

        setLoading(false);

      }

    };

    loadQuestions();

  }, []);


  // ================= SAVE ANSWER =================

  const handleSelect = (qid, value) => {

    setAnswers(prev => ({
      ...prev,
      [qid]: value
    }));

  };


  // ================= SUBMIT TEST =================

  const handleSubmit = async () => {

    if (Object.keys(answers).length !== questions.length) {

      toast.success("⚠️ Please answer all questions");

      return;

    }

    try {

      setSubmitting(true);

      await submitGuideTest({
        q1: answers[1],
        q2: answers[2],
        q3: answers[3]
      });

      navigate("/test-pending");

    } catch (err) {

      console.error("Submission failed", err);

    } finally {

      setSubmitting(false);

    }

  };


  // ================= LOADING =================

  if (loading) {

    return (
      <div className="text-center mt-40">
        Loading questions...
      </div>
    );

  }


  const answeredCount = Object.keys(answers).length;

  const progressPercentage =
    (answeredCount / questions.length) * 100;


  return (

    <div className="min-h-screen py-12 px-4 bg-[#fffbed]">

      <div className="max-w-3xl mx-auto">

        {/* HEADER */}

        <div className="text-center mb-8">

          <h2 className="text-3xl font-bold text-[#545454]">
            Senior Guide Assessment
          </h2>

        </div>


        {/* PROGRESS */}

        <div className="mb-6">

          <div className="flex justify-between text-sm mb-2">

            <span>Progress</span>

            <span className="font-semibold text-[#ff6b35]">

              {answeredCount} / {questions.length}

            </span>

          </div>

          <div className="w-full bg-gray-200 rounded-full h-2">

            <div
              className="h-2 rounded-full transition-all duration-300"
              style={{
                width: `${progressPercentage}%`,
                backgroundColor: "#ff6b35"
              }}
            />

          </div>

        </div>


        {/* QUESTIONS */}

        <div className="bg-white rounded-2xl shadow-xl p-8">

          {questions.map((q, index) => (

            <div key={q.id} className="mb-6">

              <p className="font-semibold mb-2 text-[#545454]">

                {index + 1}. {q.question}

              </p>

              <textarea
                rows="4"
                placeholder="Type your answer here..."
                value={answers[q.id] || ""}
                onChange={(e) =>
                  handleSelect(q.id, e.target.value)
                }
                className="w-full border rounded-xl p-3 bg-[#fffbed]"
              />

            </div>

          ))}


          {/* SUBMIT BUTTON */}

          <button

            onClick={handleSubmit}

            disabled={
              submitting ||
              answeredCount !== questions.length
            }

            className="w-full py-3 rounded-xl text-white font-semibold"

            style={{
              backgroundColor:
                answeredCount === questions.length
                  ? "#ff6b35"
                  : "#d1d5db"
            }}

          >

            Submit Assessment

          </button>

        </div>

      </div>

    </div>

  );

}

export default GuideTest;
