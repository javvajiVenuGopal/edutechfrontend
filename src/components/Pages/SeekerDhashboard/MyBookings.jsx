import { useEffect, useState, useRef } from "react";
import {
  getMyBookings,
  createBookingOrder,
  getCallStatus,
  refundBooking 
} from "../../../Apiroute";
import { connectIncomingCallSocket } from "../../../Service/callSocket";
import { 
  Calendar, 
  Clock, 
  CreditCard, 
  Phone, 
  Video, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  Loader2,
  User,
  DollarSign,
  PhoneCall,
  Bell,
  BookOpen,
  ChevronRight
} from "lucide-react";
import toast from "react-hot-toast";
function MyBookings() {

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processingPayment, setProcessingPayment] = useState(null);
  const [joiningCall, setJoiningCall] = useState(null);

  // 🔔 ringtone control
  const ringtoneRef = useRef(null);
  const ringtonePlayingRef = useRef(false);

  // ✅ Load bookings initially
  useEffect(() => {

    const fetchBookings = async () => {

      try {

        const res = await getMyBookings();

        setBookings(res.data || []);

      } catch (error) {

        console.error("Failed loading bookings", error);

      } finally {

        setLoading(false);

      }

    };

    fetchBookings();

  }, []);


  useEffect(() => {

    ringtoneRef.current = new Audio("/ringtone.mp3");

    const userId = localStorage.getItem("user_id");

    if (!userId) {
      console.log("❌ user_id missing. socket not started");
      return;
    }

    const socket = connectIncomingCallSocket(
      userId,
      (data) => {

        console.log("📩 Incoming socket:", data);

        if (data.type === "incoming_call") {

          // play ringtone once
          if (!ringtonePlayingRef.current) {

            ringtonePlayingRef.current = true;

            ringtoneRef.current.loop = true;

            ringtoneRef.current.play().catch(() => {});

          }

          // redirect AFTER 1 second (important)
          if (data.booking_id) {

            setTimeout(() => {

              window.location.href =
                `/seeker-call/${data.booking_id}`;

            }, 1000);

          }

        }

        if (data.type === "call_ended") {

          ringtoneRef.current.pause();

          ringtoneRef.current.currentTime = 0;

          ringtonePlayingRef.current = false;

        }

      }
    );

    return () => socket?.close();

  }, []);
  const handleRefund = async (bookingId) => {
  try {
    toast.loading("Processing refund...");

    // backend refund API call
    await refundBooking(bookingId);

    toast.dismiss();
    toast.success("Refund requested successfully");

    window.location.reload();
  } catch (err) {
    toast.dismiss();
    toast.error("Refund failed");
    console.error(err);
  }
};


  // ✅ Continue payment
  const handleContinuePayment = async (bookingId) => {

    try {

      setProcessingPayment(bookingId);

      const res = await createBookingOrder(bookingId);

      const order = res.data;

      const razorpay = new window.Razorpay({

        key: order.key,

        amount: order.amount,

        currency: order.currency,

        order_id: order.order_id,

        handler: () => {

          toast.success("Payment successful");

          window.location.reload();

        }

      });

      razorpay.open();

    } catch (err) {

      console.error("Payment error", err);
      toast.error("Payment failed. Please try again.");

    } finally {

      setProcessingPayment(null);

    }

  };
 const isRefundEligible = (timeSlot) => {
  const slotTime = new Date(timeSlot);

  const refundTime = new Date(
    slotTime.getTime() + 10 * 60000
  );

  return new Date() > refundTime;
};

  // ✅ Join call (STOP ringtone here)
  const handleJoinCall = async (bookingId) => {

    try {

      setJoiningCall(bookingId);

      const status = await getCallStatus(bookingId);

      if (status.data.call_status === "STARTED") {

        // 🔕 stop ringtone
        if (ringtoneRef.current) {

          ringtoneRef.current.pause();

          ringtoneRef.current.currentTime = 0;

          ringtonePlayingRef.current = false;

        }

        window.location.href = `/seeker-call/${bookingId}`;

      } else {

        toast.error("Guide hasn't started the call yet");

      }

    } catch (err) {

      console.error("Join call error:", err);

      toast.error("Unable to join call");

    } finally {

      setJoiningCall(null);

    }

  };

  // Helper function to get status badge
  const getStatusBadge = (status) => {
    const statusConfig = {
      CONFIRMED: { color: "bg-emerald-50 text-emerald-700 border-emerald-200", icon: <CheckCircle size={12} />, text: "Confirmed" },
      PENDING: { color: "bg-amber-50 text-amber-700 border-amber-200", icon: <AlertCircle size={12} />, text: "Pending" },
      COMPLETED: { color: "bg-blue-50 text-blue-700 border-blue-200", icon: <CheckCircle size={12} />, text: "Completed" },
      CANCELLED: { color: "bg-rose-50 text-rose-700 border-rose-200", icon: <XCircle size={12} />, text: "Cancelled" },
      IN_PROGRESS: { color: "bg-purple-50 text-purple-700 border-purple-200", icon: <PhoneCall size={12} />, text: "In Progress" }
    };
   
    
    const config = statusConfig[status] || statusConfig.PENDING;
    
    return (
      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium border ${config.color}`}>
        {config.icon}
        {config.text}
      </span>
    );
  };

  const getPaymentBadge = (paymentStatus) => {
    if (paymentStatus === "PAID") {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium border bg-emerald-50 text-emerald-700 border-emerald-200">
          <CheckCircle size={12} />
          Paid
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium border bg-amber-50 text-amber-700 border-amber-200">
        <AlertCircle size={12} />
        Pending
      </span>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fffbed] flex flex-col items-center justify-center">
        <Loader2 className="w-12 h-12 text-[#ff6b35] animate-spin mb-4" />
        <p className="text-[#545454]/60 text-lg">Loading your bookings...</p>
      </div>
    );
  }

  return (

    <div className="min-h-screen bg-[#fffbed] pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-5xl">
        
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-bold text-[#545454]">My Bookings</h1>
              <p className="text-[#545454]/60 mt-1">Manage your scheduled sessions</p>
              <div className="w-16 h-1 bg-gradient-to-r from-[#ff6b35] to-[#ff6b35]/70 rounded-full mt-3"></div>
            </div>
           
          </div>
        </div>

        {bookings.length === 0 ? (
          /* Empty State */
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center border border-[#fffbed]">
            <div className="w-24 h-24 bg-[#fffbed] rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-12 h-12 text-[#545454]/30" />
            </div>
            <p className="text-[#545454] text-lg font-medium mb-2">No bookings yet</p>
            <p className="text-[#545454]/40">Book a session with a guide to get started</p>
            <button 
              onClick={() => window.location.href = "/guides"}
              className="inline-block mt-6 px-6 py-2.5 bg-gradient-to-r from-[#ff6b35] to-[#ff6b35]/80 text-white rounded-xl font-medium hover:from-[#e55a2b] hover:to-[#e55a2b] transition-all"
            >
              Browse Guides
            </button>
          </div>
        ) : (
          /* Bookings List */
          <div className="space-y-5">
            {bookings.map((booking) => (
              <div
                key={booking.id}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-[#fffbed] hover:border-[#ff6b35]/20"
              >
                {/* Card Header */}
                <div className="bg-gradient-to-r from-[#ff6b35]/5 to-transparent px-6 py-4 border-b border-[#fffbed]">
                  <div className="flex flex-wrap justify-between items-center gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#ff6b35]/10 rounded-xl flex items-center justify-center">
                        <CreditCard className="w-5 h-5 text-[#ff6b35]" />
                      </div>
                      <div>
                        <p className="text-xs text-[#545454]/50">Booking ID</p>
                        <p className="text-sm font-mono text-[#545454] font-medium">{booking.id}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {getStatusBadge(booking.status)}
                      {getPaymentBadge(booking.payment_status)}
                    </div>
                  </div>
                </div>
                
                {/* Card Body */}
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Time Slot */}
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-[#ff6b35]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Clock className="w-4 h-4 text-[#ff6b35]" />
                      </div>
                      <div>
                        <p className="text-xs text-[#545454]/50">Time Slot</p>
                        <p className="text-sm text-[#545454] font-medium">{booking.time_slot}</p>
                      </div>
                    </div>
                    
                    {/* Guide Info */}
                    {booking.guide_name && (
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-[#ff6b35]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <User className="w-4 h-4 text-[#ff6b35]" />
                        </div>
                        <div>
                          <p className="text-xs text-[#545454]/50">Guide</p>
                          <p className="text-sm text-[#545454] font-medium">{booking.guide_name}</p>
                        </div>
                      </div>
                    )}
                    
                    {/* Amount */}
                    {booking.amount && (
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-[#ff6b35]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <DollarSign className="w-4 h-4 text-[#ff6b35]" />
                        </div>
                        <div>
                          <p className="text-xs text-[#545454]/50">Amount</p>
                          <p className="text-sm text-[#545454] font-medium">₹{booking.amount}</p>
                        </div>
                      </div>
                    )}
                    
                    {/* Date */}
                    {booking.date && (
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-[#ff6b35]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Calendar className="w-4 h-4 text-[#ff6b35]" />
                        </div>
                        <div>
                          <p className="text-xs text-[#545454]/50">Date</p>
                          <p className="text-sm text-[#545454] font-medium">{new Date(booking.date).toLocaleDateString()}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Card Footer with Actions */}
                <div className="px-6 pb-6">
                {booking.payment_status === "PENDING" &&
 booking.status !== "CANCELLED" && (
                    <button
                      onClick={() => handleContinuePayment(booking.id)}
                      disabled={processingPayment === booking.id}
                      className="w-full bg-gradient-to-r from-[#ff6b35] to-[#ff6b35]/80 hover:from-[#e55a2b] hover:to-[#e55a2b] text-white py-3 rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg disabled:opacity-70"
                    >
                      {processingPayment === booking.id ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <CreditCard className="w-5 h-5" />
                          Continue Payment
                        </>
                      )}
                    </button>
                  )}

{booking.status === "CONFIRMED" &&
 !booking.refund_flag &&
 !isRefundEligible(booking.time_slot) && (
                    <button
                      onClick={() => handleJoinCall(booking.id)}
                      disabled={joiningCall === booking.id}
                      className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white py-3 rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg disabled:opacity-70"
                    >
                      {joiningCall === booking.id ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Joining...
                        </>
                      ) : (
                        <>
                          <Video className="w-5 h-5" />
                          Join Call
                        </>
                      )}
                    </button>
                  )}
                  {booking.status === "CONFIRMED" &&
 booking.payment_status === "PAID" &&
 (booking.refund_flag || isRefundEligible(booking.time_slot)) && (
  <button
    onClick={() => handleRefund(booking.id)}
    className="w-full bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white py-3 rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-2 shadow-md"
  >
    Refund Amount
  </button>
)}

                  {booking.status === "COMPLETED" && (
                    <div className="flex items-center justify-center gap-2 py-3 bg-emerald-50 rounded-xl">
                      <CheckCircle className="w-5 h-5 text-emerald-600" />
                      <span className="text-emerald-700 font-semibold">Call Completed</span>
                    </div>
                  )}

                  {booking.status === "CANCELLED" && (
                    <div className="flex items-center justify-center gap-2 py-3 bg-rose-50 rounded-xl">
                      <XCircle className="w-5 h-5 text-rose-600" />
                      <span className="text-rose-700 font-semibold">Booking Cancelled</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>

  );

}

export default MyBookings;
