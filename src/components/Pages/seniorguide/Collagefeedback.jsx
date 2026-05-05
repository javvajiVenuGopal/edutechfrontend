import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Star } from "lucide-react";
import toast from "react-hot-toast";

import {
  submitCollegeFeedback,
  getFeedbackStatus,
  getGuideFeedback
} from "../../../Apiroute";

function Collagefeedback() {

  const { bookingId } = useParams();
  const navigate = useNavigate();

  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [feedbacks, setFeedbacks] = useState([]);

  // ===============================
  // LOAD EXISTING FEEDBACKS
  // ===============================

  useEffect(() => {

    checkStatus();
    loadFeedback();

  }, []);

  const checkStatus = async () => {

    try {

      const res = await getFeedbackStatus(bookingId);

      setSubmitted(res.data.submitted);

    } catch (err) {

      console.log(err);

    }

  };

  const loadFeedback = async () => {

    try {

      const res = await getGuideFeedback();

      setFeedbacks(Array.isArray(res.data) ? res.data : []);

    } catch (err) {

      console.log(err);

      setFeedbacks([]);

    }

  };

  // ===============================
  // SUBMIT FEEDBACK
  // ===============================

  const handleSubmit = async () => {

    if (!rating) {

      toast.error("Select rating ⭐");

      return;

    }

    if (!message.trim()) {

      toast.error("Write feedback");

      return;

    }

    try {

      await submitCollegeFeedback(bookingId, {

        faculty_rating: rating,
        placement_rating: rating,
        infrastructure_rating: rating,

        hidden_fees: "Not specified",
        strict_attendance: "Not specified",
        ragging_situation: "Not specified",

        comments: message

      });

      toast.success("Feedback submitted successfully ✅");

      setRating(0);
      setMessage("");

      checkStatus();
      loadFeedback();

    } catch (err) {

      console.log(err);

      toast.error("Submission failed ❌");

    }

  };

  return (

    <div className="max-w-4xl mx-auto p-6">

      <button
        onClick={() => navigate(-1)}
        className="mb-4 text-blue-500"
      >
        ← Back
      </button>

      <h1 className="text-2xl font-bold mb-6">
        College Feedback
      </h1>

      {/* ===============================
         SUBMIT FEEDBACK CARD
      =============================== */}

      {!submitted && (

        <div className="bg-white shadow rounded-lg p-6 mb-6">

          <h2 className="mb-3 font-semibold">
            Give Feedback
          </h2>

          <div className="flex gap-2 mb-4">

            {[1,2,3,4,5].map(star => (

              <Star
                key={star}
                size={32}
                onClick={() => setRating(star)}
                className={`cursor-pointer ${
                  rating >= star
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"
                }`}
              />

            ))}

          </div>

          <textarea
            rows="4"
            value={message}
            onChange={(e)=>setMessage(e.target.value)}
            placeholder="Write feedback..."
            className="border w-full p-3 rounded mb-4"
          />

          <button
            onClick={handleSubmit}
            className="bg-orange-500 text-white px-5 py-2 rounded"
          >
            Submit Feedback
          </button>

        </div>

      )}

      {/* ===============================
         PREVIOUS FEEDBACK LIST
      =============================== */}

      <div className="bg-white shadow rounded-lg p-6">

        <h2 className="font-semibold mb-4">
          Previous Feedback
        </h2>

        {feedbacks.length === 0 ? (

          <p>No feedback available</p>

        ) : (

          feedbacks.map(item => (

            <div
              key={item.id}
              className="border p-3 mb-2 rounded"
            >

              <p>Faculty ⭐ {item.faculty_rating}</p>
              <p>Placement ⭐ {item.placement_rating}</p>
              <p>Infrastructure ⭐ {item.infrastructure_rating}</p>

              <p>Hidden Fees: {item.hidden_fees}</p>
              <p>Attendance: {item.strict_attendance}</p>
              <p>Ragging: {item.ragging_situation}</p>

              <p className="text-gray-600">
                {item.comments}
              </p>

            </div>

          ))

        )}

      </div>

    </div>

  );

}

export default Collagefeedback;