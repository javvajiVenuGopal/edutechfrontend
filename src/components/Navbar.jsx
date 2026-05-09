import { useState, useEffect } from "react";
import { Menu, X, LogOut,Bell } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "./Home/assets/SENIOR GUIDE logo.svg";
  import { connectNotificationSocket } from "../Service/notificationsocket";
import { getUnreadCount } from "../Apiroute";
function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const [unreadCount, setUnreadCount] = useState(0);
  const role = localStorage.getItem("role");
  // 🔥 FIX: check token whenever route changes
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
    console.log(role);
  }, [location]);


useEffect(() => {

  const loadUnread = async () => {

    try {
 const token = localStorage.getItem("token");

      if (!token) return;
      const res = await getUnreadCount();

      setUnreadCount(res.data.unread);

    } catch (err) {

      console.log("Unread error:", err);

    }

  };

  loadUnread();

  // realtime socket connection
  const socket = connectNotificationSocket(() => {

    setUnreadCount(prev => prev + 1);

  });

  return () => socket?.close();

}, []);
useEffect(() => {

  const fetchUnread = async () => {

    try {

      const token = localStorage.getItem("token");

      if (!token) return;

      const res = await fetch(
        "http://seniorguide.exameets.com/notifications/unread-count",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const data = await res.json();

      setUnreadCount(data.unread);

    } catch (err) {

      console.log("Unread error:", err);

    }

  };

  fetchUnread();

}, []);
  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    navigate("/login");
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "ContactUs ", path: "/contact" },
    { name: "FAQ", path: "/faq" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* NAVBAR */}
      <nav className="w-full fixed top-0 bg-white shadow-sm  py-3 z-50">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">

          {/* LOGO */}
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="logo" className="lg:h-12 md:h-5 h-10" />
            <h1 className="font-bold text-xl">
              Senior<span className="text-[#ff6b35]">Guide</span>
            </h1>
          </Link>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center gap-3">

      
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`
                      lg:px-4 lg:py-2 md:px-2 md:py-0.5 text-sm  font-medium rounded-lg
                      ${isActive(link.path)
                        ? "text-[#ff6b35] bg-orange-50 "
                        : "text-gray-600 hover:text-[#ff6b35] hover:bg-gray-50"
                      }
                    `}
                  >
                    {link.name}
                  </Link>
                ))}
           

            {/* BEFORE LOGIN */}
            {!isLoggedIn && (
              <>

                <Link
                    to="/register"
                    className="lg:px-5  lg:py-2 md:px-2  md:py-1 rounded-lg lg:font-medium text-sm text-[#ff6b35] border border-[#ff6b35] hover:bg-[#ff6b35] hover:text-white"
                  >
                    Register
                  </Link>

              <Link
                    to="/login"
                    className="g:px-5  lg:py-2 md:px-3  md:py-1 rounded-lg lg:font-medium text-sm text-white bg-[#ff6b35] hover:bg-[#e55a2b]"
                  >
                    Login
                  </Link>
              </>
            )}

            {/* AFTER LOGIN */}
           {isLoggedIn && (
  <div className="flex items-center gap-4">

    {/* 🔔 Notification Bell */}
    <div
      className="relative cursor-pointer"
      onClick={() => navigate("/notifications")}
    >
      <Bell size={22} />

      {unreadCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 rounded-full">
          {unreadCount}
        </span>
      )}
    </div>
  {isLoggedIn &&
 !["ADMIN","SUPERADMIN","SUPPORT_ADMIN","FINANCIAL_ADMIN","CONTENT_ADMIN"].includes(role) && (
  <>
    <button
      onClick={() =>
        navigate(
          role === "senior_guide"
            ? "/guide-dashboard"
            : "/seeker"
        )
      }
      className="px-4 py-2 text-sm bg-[#ff6b35] text-white rounded-lg hover:bg-[#e55a2b]"
    >
      Dashboard
    </button>

    {role === "seeker" && (
      <button
        onClick={() => navigate("/become-guide")}
        className="px-4 py-2 text-sm border border-[#ff6b35] text-[#ff6b35] rounded-lg hover:bg-[#ff6b35] hover:text-white"
      >
        Become a Senior Guide
      </button>
    )}
  </>
)}

    {/* Logout button */}
    <button
      onClick={handleLogout}
      className="px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-1"
    >
      <LogOut size={14} />
      Logout
    </button>

  </div>
)}

          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden"
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      {isOpen && (
        <div className="fixed top-16 left-0 right-0 bg-white z-100 shadow-lg border-b border-gray-100 md:hidden">
<div className="flex flex-col p-4 space-y-2">

          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setIsOpen(false)}
               className={`
                  px-4 py-2 text-sm font-medium rounded-lg
                  ${isActive(link.path)
                    ? "text-[#ff6b35] bg-orange-50"
                    : "text-gray-600 hover:text-[#ff6b35] hover:bg-gray-50"
                  }
                `}
            >
              {link.name}
            </Link>
          ))}

          {!isLoggedIn ? (
            <>
              <Link to="/admin-login"   className="px-4 py-2 text-sm font-medium rounded-lg border border-gray-300 text-gray-500 text-center">Admin</Link>
              <Link to="/register"   className="px-4 py-2 text-sm font-medium text-center rounded-lg text-[#ff6b35] border border-[#ff6b35]">Register</Link>
              <Link to="/login"  className="px-4 py-2 text-sm font-medium text-center rounded-lg text-white bg-[#ff6b35]">Login</Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm font-medium rounded-lg text-red-600 hover:bg-red-50 flex items-center gap-2"
            >
              Logout
            </button>
          )}
</div>
        </div>
      )}

      {/* NAVBAR HEIGHT SPACER */}
      <div className="h-10"></div>
    </>
  );
}

export default Navbar;
