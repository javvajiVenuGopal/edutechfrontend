import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getGuideSlots,
  getBookedSlots
} from "../../../Apiroute";
import { 
  Calendar, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Loader2,
  ChevronRight,
  CalendarDays,
  AlertCircle,
  User,
  ArrowLeft
} from "lucide-react";
import toast from "react-hot-toast";

function SlotSelection() {

  const navigate = useNavigate();
  const { guide_id } = useParams();

  const [selectedDate, setSelectedDate] = useState("");
  const [allSlots, setAllSlots] = useState([]);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [bookedSlots, setBookedSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [loading, setLoading] = useState(true);


  // ✅ STEP 1: Load all guide slots immediately

  useEffect(() => {

    const fetchSlots = async () => {

      try {

        const res = await getGuideSlots(guide_id);

        console.log("Guide slots:", res.data);

        setAllSlots(res.data || []);

        // show all slots initially
        setAvailableSlots(res.data || []);

      } catch (error) {

        console.error("Failed to load guide slots:", error);

      } finally {

        setLoading(false);

      }

    };

    fetchSlots();

  }, [guide_id]);


  // ✅ STEP 2: Filter slots only if date selected

  useEffect(() => {

    if (!selectedDate) {

      setAvailableSlots(allSlots);

      return;

    }

    const filtered = allSlots.filter((slot) => {

      const slotDate = slot.start_time.split("T")[0];

      return slotDate === selectedDate;

    });

    setAvailableSlots(filtered);

  }, [selectedDate, allSlots]);


  // ✅ STEP 3: Load booked slots

  useEffect(() => {

    if (!selectedDate) return;

    const fetchBookedSlots = async () => {

      try {

        const res = await getBookedSlots(selectedDate);

        console.log("Booked slots:", res.data);

        setBookedSlots(res.data || []);

      } catch (error) {

        console.error("Failed to fetch booked slots:", error);

      }

    };

    fetchBookedSlots();

  }, [selectedDate]);


  // ✅ STEP 4: Continue to booking

  const handleContinue = () => {

   if (!selectedSlot || new Date(selectedSlot.start_time) < new Date()) {
  toast.error("This slot is no longer available");
  return;
}

    navigate("/bookings", {
      state: {
        guide_id,
        time_slot: selectedSlot.start_time
      }
    });

  };

  // Format time from ISO string
  const formatTime = (isoString) => {
    return isoString.split("T")[1].slice(0, 5);
  };

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  if (loading) {

    return (
      <div className="min-h-screen flex flex-col items-center justify-center" style={{ backgroundColor: "#fffbed" }}>
        <Loader2 className="w-12 h-12 animate-spin mb-4" style={{ color: "#ff6b35" }} />
        <p style={{ color: "#545454" }}>Loading available slots...</p>
      </div>
    );

  }

  return (

    <div className="min-h-screen" style={{ backgroundColor: "#fffbed" }}>
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ backgroundColor: "#ff6b35" }} />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse delay-1000" style={{ backgroundColor: "#545454" }} />
      </div>

      <div className="relative container mx-auto px-4 py-24 max-w-4xl">
        
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 mb-6 px-4 py-2 rounded-xl transition-all hover:shadow-md group"
          style={{ backgroundColor: "white", color: "#545454", border: "1px solid #ffebdd" }}
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          Back
        </button>

        {/* Header Section */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4" style={{ backgroundColor: "#ff6b35/10" }}>
            <CalendarDays className="w-8 h-8" style={{ color: "#ff6b35" }} />
          </div>
          <h1 className="text-3xl font-bold" style={{ color: "#545454" }}>Select Available Slot</h1>
          <p className="mt-2" style={{ color: "#545454/60" }}>Choose a convenient time for your session</p>
          <div className="w-20 h-1 bg-gradient-to-r from-[#ff6b35] to-[#ff6b35]/70 rounded-full mx-auto mt-4"></div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-[#fffbed]">
          
          {/* Date Selection Section */}
          <div className="p-6 border-b border-[#fffbed]" style={{ backgroundColor: "#fffbed" }}>
            <label className="block text-sm font-semibold mb-2 flex items-center gap-2" style={{ color: "#545454" }}>
              <Calendar className="w-4 h-4" style={{ color: "#ff6b35" }} />
              Select Date
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => {
                setSelectedDate(e.target.value);
                setSelectedSlot(null);
              }}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ff6b35]/30 focus:border-[#ff6b35] transition-all"
              style={{ backgroundColor: "#fffbed/50", color: "#545454" }}
            />
            {selectedDate && (
              <p className="text-xs mt-2 flex items-center gap-1" style={{ color: "#545454/50" }}>
                <Clock className="w-3 h-3" />
                Showing slots for {new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            )}
          </div>

          {/* Slots Grid Section */}
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold flex items-center gap-2" style={{ color: "#545454" }}>
                <Clock className="w-4 h-4" style={{ color: "#ff6b35" }} />
                Available Time Slots
                {selectedDate && (
                  <span className="text-xs font-normal ml-2" style={{ color: "#545454/50" }}>
                    ({availableSlots.length} slots available)
                  </span>
                )}
              </h3>
              {selectedSlot && (
                <span className="text-xs px-2 py-1 rounded-lg" style={{ backgroundColor: "#d1fae5", color: "#10b981" }}>
                  1 slot selected
                </span>
              )}
            </div>

            {availableSlots.length === 0 ? (
              <div className="text-center py-12 rounded-xl" style={{ backgroundColor: "#fffbed" }}>
                <AlertCircle className="w-12 h-12 mx-auto mb-3" style={{ color: "#545454/30" }} />
                <p style={{ color: "#545454/60" }}>No available slots</p>
                {selectedDate && (
                  <p className="text-xs mt-1" style={{ color: "#545454/40" }}>
                    Try selecting a different date
                  </p>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {availableSlots.map((slot) => {
                const now = new Date();

                const slotStartTime = new Date(slot.start_time);
                
                const isExpired = slotStartTime < now;

                  const isBooked = bookedSlots.some(
                    (booked) =>
                      booked.time_slot === slot.start_time
                  );

                  const isSelected = selectedSlot?.id === slot.id;

                  return (

                    <button
                      key={slot.id}
                      disabled={isBooked || isExpired}
                      onClick={() => setSelectedSlot(slot)}
                      className={`
                        relative p-4 rounded-xl border-2 transition-all duration-200 text-left
                        ${isBooked || isExpired 
                          ? "bg-gray-100 border-gray-200 cursor-not-allowed opacity-60" 
                          : isSelected
                          ? "border-[#ff6b35] shadow-md"
                          : "border-gray-200 hover:border-[#ff6b35]/50 hover:bg-[#fffbed]"
                        }
                      `}
                      style={isSelected ? { backgroundColor: "#ff6b35/5" } : { backgroundColor: "white" }}
                    >
                      {isSelected && (
                        <div className="absolute top-2 right-2">
                          <CheckCircle className="w-4 h-4" style={{ color: "#ff6b35" }} />
                        </div>
                      )}
                      
                      {/* Date */}
                      <div className="flex items-center gap-1 mb-2">
                        <Calendar className="w-3 h-3" style={{ color: "#545454/40" }} />
                        <span className="text-xs" style={{ color: "#545454/60" }}>
                          {formatDate(slot.start_time)}
                        </span>
                      </div>
                      
                      {/* Time Range */}
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" style={{ color: "#ff6b35" }} />
                        <span className={`font-medium ${isSelected ? "text-[#ff6b35]" : "text-[#545454]"}`}>
                          {formatTime(slot.start_time)}
                        </span>
                        <span style={{ color: "#545454/40" }}>—</span>
                        <span className={`text-sm ${isSelected ? "text-[#545454]" : "text-[#545454]/70"}`}>
                          {formatTime(slot.end_time)}
                        </span>
                      </div>

                      {/* Booked Badge */}
                      {isExpired && (
  <div className="mt-2 flex items-center gap-1">
    <XCircle className="w-3 h-3 text-gray-500" />
    <span className="text-xs text-gray-500">Expired</span>
  </div>
)}
                      
                    </button>

                  );

                })}
              </div>
            )}
          </div>

          {/* Continue Button */}
          <div className="p-6 border-t border-[#fffbed]" style={{ backgroundColor: "#fffbed/30" }}>
            <button
              onClick={handleContinue}
              disabled={!selectedSlot}
              className={`
                w-full py-3 rounded-xl font-semibold transition-all duration-200 
                flex items-center justify-center gap-2
                ${selectedSlot 
                  ? "text-white shadow-lg hover:shadow-xl" 
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }
              `}
              style={selectedSlot ? { background: "linear-gradient(135deg, #ff6b35, #e55a2b)" } : {}}
            >
              {selectedSlot ? (
                <>
                  Continue to Booking
                  <ChevronRight className="w-5 h-5" />
                </>
              ) : (
                <>
                  <AlertCircle className="w-5 h-5" />
                  Select a slot to continue
                </>
              )}
            </button>
            
            {!selectedSlot && selectedDate && availableSlots.length > 0 && (
              <p className="text-xs text-center mt-3" style={{ color: "#545454/50" }}>
                Please select a time slot from above
              </p>
            )}
          </div>
        </div>

        {/* Info Note */}
        <div className="mt-6 text-center">
          <p className="text-xs flex items-center justify-center gap-1" style={{ color: "#545454/40" }}>
            <User className="w-3 h-3" />
            Once booked, the guide will be notified of your session
          </p>
        </div>
      </div>
    </div>

  );

}

export default SlotSelection;
