import { Routes, Route } from "react-router-dom";
import "./App.css";

import Navbar from "./components/Navbar";
import Footer from "./Footer";

import RoleProtectedRoute from "./components/RoleProtectedRoute";

/* HOME */
import Home from "./components/Home/Home";
import RegistrationForm from "./components/Pages/Register";
import EmailOTP from "./components/Pages/EmailOtp";
import LoginForm from "./components/Pages/Login";

/* SEEKER */
import SeekerDashboard from "./components/Pages/SeekerDhashboard/SeekerDhashboard";
import GuideList from "./components/Pages/SeekerDhashboard/GuideList";
import BookingPage from "./components/Pages/SeekerDhashboard/Booking";
import Confirmation from "./components/Pages/SeekerDhashboard/Confirmation";
import Payment from "./components/Pages/SeekerDhashboard/Payment";
import DownloadReport from "./components/Pages/SeekerDhashboard/Report";
import SubmitRating from "./components/Pages/SeekerDhashboard/Rating";
import SlotSelection from "./components/Pages/SeekerDhashboard/SeekerSlot";
import MyBookings from "./components/Pages/SeekerDhashboard/MyBookings";
import SeekerCallPage from "./components/Pages/SeekerDhashboard/seekercallpage";
import SeniorGuideProfile from "./components/Pages/seniorguide/Seniorprofile";
/* GUIDE */
import SeniorGuideForm from "./components/Pages/seniorguide/Senoirform";
import SeniorGuideDashboard from "./components/Pages/seniorguide/SeniorDashboard";
import GuideTest from "./components/Pages/seniorguide/Test";
import PendingApproval from "./components/Pages/seniorguide/Aprovel";
import TestPending from "./components/Pages/seniorguide/Testpending";
import TimeSlots from "./components/Pages/seniorguide/SlotList";
import GuideStatus from "./components/Pages/seniorguide/ApplicationStatus";
import Slots from "./components/Pages/seniorguide/SeniorSlot";
import WalletPage from "./components/Pages/seniorguide/SeniorWallet";
import Withdraw from "./components/Pages/seniorguide/Withdrawelrequest";
import Referral from "./components/Pages/seniorguide/Referal";
import Feedback from "./components/Pages/seniorguide/Collagefeedback";
import CallHistory from "./components/Pages/seniorguide/CallHistory";
import UpcomingCalls from "./components/Pages/seniorguide/Upcomingcalls";
import GuideCallPage from "./components/Pages/seniorguide/guidecallpage";
import TestResult from "./components/Pages/seniorguide/Testresult";

/* ADMIN */
import AdminLogin from "./components/Pages/Admin/Admin";
import AdminDashboard from "./components/Pages/Admin/AdminDashboard";

/* STATIC */
import ViewGuide from "./components/Home/ViewGuides";
import AboutUs from "./components/Home/About";
import FAQ from "./components/Home/FAQ";
import ContactUs from "./components/Home/Contactus";
import PrivacyPolicy from "./components/Home/pravicy";
import Rules from "./components/Home/Term";
import RefundPolicy from "./components/Home/Help";
import MyProfile from "./components/Home/Myprofie";
import AdminRegister from "./components/Pages/Admin/AdminRegister";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import SeekerNotifications from "./components/Pages/SeekerDhashboard/Sekeernofication";
import { connectIncomingCallSocket } from "./Service/callSocket";
import { useNavigate } from "react-router-dom";
import {
  connectNotificationSocket,
  closeNotificationSocket
} from "./Service/notificationsocket";
import NotFound from "./components/Pages/NotFound";
import axiosInstance from "./baseapi";
function App() {
  const navigate = useNavigate();
  useEffect(() => {

  const token = localStorage.getItem("token");

  if (!token) return;

  const interval = setInterval(() => {
    axiosInstance.post("/auth/ping");
  }, 60000);

  return () => clearInterval(interval);

}, []);
  
 useEffect(() => {

  const token = localStorage.getItem("token");

  if (!token) return;

  const socket = connectNotificationSocket((data) => {

    console.log("🔔 Notification:", data);

  });

  return () => closeNotificationSocket();

}, []);



useEffect(() => {

const token = localStorage.getItem("token");
const userId = localStorage.getItem("user_id");

if (!token || !userId) return;

const socket = connectIncomingCallSocket(
userId,
(data) => {

if (data.type === "incoming_call") {

setTimeout(() => {   navigate(`/seeker-call/${data.booking_id}`); }, 500);

}

}
);

return () => socket?.close();

}, []);


 
  return (
    <>
    <Toaster position="top-right" reverseOrder={false} />
      <Navbar />
      <hr className="text-white" />

      <Routes>

        {/* PUBLIC */}
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/emailotp" element={<EmailOTP />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/admin-login" element={<AdminLogin />} />
<Route
  path="/notifications"
  element={<SeekerNotifications />}
/>
        {/* SEEKER */}
        <Route path="/seeker" element={
          <RoleProtectedRoute allowedRoles={["seeker"]}>
            <SeekerDashboard />
          </RoleProtectedRoute>
        } />

        <Route path="/guides" element={
          <RoleProtectedRoute allowedRoles={["seeker"]}>
            <GuideList />
          </RoleProtectedRoute>
        } />

        <Route path="/bookings" element={
          <RoleProtectedRoute allowedRoles={["seeker"]}>
            <BookingPage />
          </RoleProtectedRoute>
        } />
        <Route
  path="/guide-profile/:guide_id"
  element={
    <RoleProtectedRoute allowedRoles={["senior_guide", "seeker", "SUPERADMIN"]}>
      <SeniorGuideProfile />
    </RoleProtectedRoute>
  }
/>

        <Route path="/confirmation/:bookingId" element={
          <RoleProtectedRoute allowedRoles={["seeker"]}>
            <Confirmation />
          </RoleProtectedRoute>
        } />

        <Route path="/payment" element={
          <RoleProtectedRoute allowedRoles={["seeker"]}>
            <Payment />
          </RoleProtectedRoute>
        } />

        <Route path="/download-report/:bookingId" element={
          <RoleProtectedRoute allowedRoles={["seeker"]}>
            <DownloadReport />
          </RoleProtectedRoute>
        } />

        <Route path="/rating/:bookingId" element={
          <RoleProtectedRoute allowedRoles={["seeker"]}>
            <SubmitRating />
          </RoleProtectedRoute>
        } />

        <Route path="/SlotSelection/:guide_id" element={
          <RoleProtectedRoute allowedRoles={["seeker"]}>
            <SlotSelection />
          </RoleProtectedRoute>
        } />

        <Route path="/my-bookings" element={
          <RoleProtectedRoute allowedRoles={["seeker"]}>
            <MyBookings />
          </RoleProtectedRoute>
        } />

        <Route path="/seeker-call/:booking_id" element={
          <RoleProtectedRoute allowedRoles={["seeker"]}>
            <SeekerCallPage />
          </RoleProtectedRoute>
        } />

        {/* GUIDE */}

        <Route path="/guide-dashboard" element={
          <RoleProtectedRoute allowedRoles={["senior_guide"]}>
            <SeniorGuideDashboard />
          </RoleProtectedRoute>
        } />
        <Route
  path="/upcoming-calls"
  element={
    <RoleProtectedRoute allowedRoles={["senior_guide"]}>
      <UpcomingCalls />
    </RoleProtectedRoute>
  }
/>
<Route
  path="/call-history"
  element={
    <RoleProtectedRoute allowedRoles={["senior_guide"]}>
      <CallHistory />
    </RoleProtectedRoute>
  }
/>
<Route
  path="/feedback/:bookingId"
  element={
    <RoleProtectedRoute allowedRoles={["senior_guide"]}>
      <Feedback />
    </RoleProtectedRoute>
  }
/>

        <Route path="/wallet" element={
          <RoleProtectedRoute allowedRoles={["senior_guide"]}>
            <WalletPage />
          </RoleProtectedRoute>
        } />

        <Route path="/withdraw" element={
          <RoleProtectedRoute allowedRoles={["senior_guide"]}>
            <Withdraw />
          </RoleProtectedRoute>
        } />

        <Route path="/referral" element={
          <RoleProtectedRoute allowedRoles={["senior_guide"]}>
            <Referral />
          </RoleProtectedRoute>
        } />

        <Route path="/guide-status" element={
          <RoleProtectedRoute allowedRoles={["senior_guide"]}>
            <GuideStatus />
          </RoleProtectedRoute>
        } />

        <Route path="/slots" element={
          <RoleProtectedRoute allowedRoles={["senior_guide"]}>
            <Slots />
          </RoleProtectedRoute>
        } />
        <Route
  path="/become-guide"
  element={
    <RoleProtectedRoute allowedRoles={["seeker"]}>
      <SeniorGuideForm />
    </RoleProtectedRoute>
  }
/>

<Route
  path="/pending-approval"
  element={
   <RoleProtectedRoute allowedRoles={["seeker"]}>
    <PendingApproval />
     </RoleProtectedRoute>
  }
/>
<Route path="/guide-test" element={
<RoleProtectedRoute allowedRoles={["seeker"]}>
  
  <GuideTest />   
  </RoleProtectedRoute>}
   />
<Route path="/test-result" element={<TestResult />} />
<Route path="/test-pending" element=
{<RoleProtectedRoute allowedRoles={["seeker"]}><TestPending />
</RoleProtectedRoute>} />

        <Route path="/guide-call/:booking_id" element={
          <RoleProtectedRoute allowedRoles={["senior_guide"]}>
            <GuideCallPage />
          </RoleProtectedRoute>
        } />

        {/* ADMIN */}

        <Route path="/admin-dashboard" element={
          <RoleProtectedRoute allowedRoles={[
            "SUPERADMIN",
            "ADMIN",
            "SUPPORT_ADMIN",
            "FINANCIAL_ADMIN",
            "CONTENT_ADMIN"
          ]}>
            <AdminDashboard />
          </RoleProtectedRoute>
        } />
        <Route path="/admin-register" element={<RoleProtectedRoute allowedRoles={[
            "SUPERADMIN"
          ]}><AdminRegister /></RoleProtectedRoute>} />

        {/* STATIC */}

        <Route path="/view-guide" element={<ViewGuide />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/myprofile" element={<MyProfile />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<Rules />} />
        <Route path="/help" element={<RefundPolicy />} />
        <Route path="*" element={<NotFound />} />

      </Routes>

      <Footer />
    </>
  );
}

export default App;
