import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  submitRating,
  getBookingDetails
} from "../../../Apiroute";
import toast from "react-hot-toast";
function SubmitRating() {

  const { bookingId } = useParams();
  const navigate = useNavigate();

  const [booking, setBooking] = useState(null);

  const [rating, setRating] = useState(0);
  const [honesty, setHonesty] = useState(0);
  const [recommend, setRecommend] = useState(0);
  const [comments, setComments] = useState("");

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);


  // 📦 Load booking details
  useEffect(() => {

    const fetchBooking = async () => {

      try {
        const res = await getBookingDetails(bookingId);
        setBooking(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }

    };

    fetchBooking();

  }, [bookingId]);


  // ⭐ reusable rating buttons
  const RatingSelector = ({ value, setValue }) => (

    <div className="flex gap-2 mt-2">

      {[1,2,3,4,5].map(star => (

        <button
          key={star}
          onClick={() => setValue(star)}
          className={`px-4 py-2 rounded-lg border transition ${
            value >= star
              ? "bg-orange-500 text-white"
              : "bg-gray-100 hover:bg-gray-200"
          }`}
        >
          {star} ⭐
        </button>

      ))}

    </div>
  );


  // 🚀 Submit rating
  const handleSubmit = async () => {

    if (!rating || !honesty || !recommend) {

      toast.error("Please select all ratings ⭐");

      return;

    }

    try {

      setSubmitting(true);

      await submitRating(bookingId, {

        rating: Number(rating),
        honesty: Number(honesty),
        recommend: Number(recommend),
        comments: comments || ""

      });

      toast.success("Rating submitted successfully ✅");

      navigate(`/download-report/${bookingId}`);

    } catch (error) {

      console.log(error.response?.data);

      toast.error("Rating submission failed ❌");

    } finally {

      setSubmitting(false);

    }

  };


  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-lg">
        Loading booking details...
      </div>
    );


  if (!booking)
    return (
      <div className="flex justify-center items-center h-screen text-lg">
        Booking not found
      </div>
    );


  return (

    <div className="min-h-screen bg-[#fff7ed] flex justify-center items-center">

      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-xl">

        <h2 className="text-2xl font-bold mb-4 text-center">
          ⭐ Rate Your Guide
        </h2>


        {/* Booking Info */}
        <div className="bg-gray-50 p-4 rounded-lg mb-6">

          <p className="font-semibold">
            Guide: {booking.guide_unique_id}
          </p>

          <p className="text-sm text-gray-600">
            Slot: {new Date(booking.time_slot).toLocaleString()}
          </p>

        </div>


        {/* Session Rating */}
        <label className="font-semibold">
          Session Rating
        </label>

        <RatingSelector
          value={rating}
          setValue={setRating}
        />


        {/* Honesty Rating */}
        <label className="font-semibold mt-4 block">
          Honesty
        </label>

        <RatingSelector
          value={honesty}
          setValue={setHonesty}
        />


        {/* Recommend Rating */}
        <label className="font-semibold mt-4 block">
          Would you recommend this guide?
        </label>

        <RatingSelector
          value={recommend}
          setValue={setRecommend}
        />


        {/* Comments */}
        <textarea
          placeholder="Write your experience..."
          value={comments}
          onChange={(e)=>setComments(e.target.value)}
          className="w-full border rounded-lg p-3 mt-5 focus:outline-none focus:ring-2 focus:ring-orange-400"
        />


        {/* Submit Button */}
        <button
          disabled={submitting}
          onClick={handleSubmit}
          className="w-full mt-6 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg transition"
        >
          {submitting ? "Submitting..." : "Submit Rating"}
        </button>

      </div>

    </div>

  );

}

export default SubmitRating;
