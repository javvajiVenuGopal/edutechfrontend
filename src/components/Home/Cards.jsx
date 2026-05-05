import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Users, 
  GraduationCap, 
  ArrowRight, 
  Sparkles,
  Star,
  TrendingUp,
  Calendar
} from "lucide-react";

function AdviceCards() {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { x: -30, opacity: 0, rotateY: -10 },
    visible: {
      x: 0,
      opacity: 1,
      rotateY: 0,
      transition: { type: "spring", stiffness: 300, damping: 25 }
    }
  };

  const cardVariantsRight = {
    hidden: { x: 30, opacity: 0, rotateY: 10 },
    visible: {
      x: 0,
      opacity: 1,
      rotateY: 0,
      transition: { type: "spring", stiffness: 300, damping: 25 }
    }
  };

  const buttonVariants = {
    hover: { scale: 1.05, transition: { type: "spring", stiffness: 400 } },
    tap: { scale: 0.95 }
  };

  const floatingIconVariants = {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="w-full py-16 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: "#fffbed" }}>
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
       
        <h2 className="text-2xl sm:text-3xl font-extrabold" style={{ color: "#545454" }}>
          Your Journey Starts Here
        </h2>
        <div className="w-20 h-1 mx-auto mt-3 rounded-full" style={{ backgroundColor: "#ff6b35" }} />
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto"
      >
        {/* Left Card - Seek Advice */}
        <motion.div
          variants={cardVariants}
          whileHover={{ y: -8, transition: { duration: 0.3 } }}
          className="relative rounded-2xl overflow-hidden shadow-xl cursor-pointer group"
          style={{
            background: "linear-gradient(135deg, #ff6b35, #e55a2b)",
            boxShadow: "0 20px 40px -12px rgba(255, 107, 53, 0.3)"
          }}
        >
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
          
          {/* Floating Icons */}
          <motion.div
            variants={floatingIconVariants}
            animate="animate"
            className="absolute top-8 right-8 opacity-20"
          >
            <Users size={80} style={{ color: "white" }} />
          </motion.div>
          <motion.div
            variants={floatingIconVariants}
            animate="animate"
            transition={{ delay: 1.5 }}
            className="absolute bottom-8 left-8 opacity-20"
          >
            <Star size={60} style={{ color: "white" }} />
          </motion.div>

          <div className="relative p-8 md:p-10 text-white z-10">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-6" style={{ backgroundColor: "rgba(255,255,255,0.2)" }}>
              <GraduationCap size={14} />
              <span className="text-xs font-medium">For Students</span>
            </div>

            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Seeking College Advice?
            </h2>

            <div className="w-16 h-[2px] bg-white/50 mb-5" />

            <p className="text-sm md:text-base mb-8 text-white/90 leading-relaxed">
              Get personalized guidance from experienced seniors who've been exactly where you are. Book a 1:1 session and make informed decisions about your future.
            </p>

            {/* Features */}
            <div className="space-y-2 mb-8">
              <div className="flex items-center gap-2 text-sm text-white/80">
                <div className="w-1.5 h-1.5 rounded-full bg-white/60" />
                <span>100+ verified SeniorGuides</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-white/80">
                <div className="w-1.5 h-1.5 rounded-full bg-white/60" />
                <span>Affordable ₹99 sessions</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-white/80">
                <div className="w-1.5 h-1.5 rounded-full bg-white/60" />
                <span>Real campus insights</span>
              </div>
            </div>

            <Link to="/seeker">
              <motion.button
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                className="group flex items-center gap-2 bg-white text-[#ff6b35] px-6 py-3 rounded-xl font-semibold shadow-lg transition-all duration-300 hover:shadow-xl"
              >
                <span>Find a Guide</span>
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </Link>
          </div>
        </motion.div>

        {/* Right Card - Become a Guide */}
        <motion.div
          variants={cardVariantsRight}
          whileHover={{ y: -8, transition: { duration: 0.3 } }}
          className="relative rounded-2xl overflow-hidden shadow-xl cursor-pointer group"
          style={{
            background: "linear-gradient(135deg, #545454, #3d3d3d)",
            boxShadow: "0 20px 40px -12px rgba(84, 84, 84, 0.3)"
          }}
        >
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
          
          {/* Floating Icons */}
          <motion.div
            variants={floatingIconVariants}
            animate="animate"
            transition={{ delay: 0.8 }}
            className="absolute top-8 right-8 opacity-20"
          >
            <TrendingUp size={80} style={{ color: "white" }} />
          </motion.div>
          <motion.div
            variants={floatingIconVariants}
            animate="animate"
            transition={{ delay: 2 }}
            className="absolute bottom-8 left-8 opacity-20"
          >
            <Calendar size={60} style={{ color: "white" }} />
          </motion.div>

          <div className="relative p-8 md:p-10 text-white z-10">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-6" style={{ backgroundColor: "rgba(255,255,255,0.15)" }}>
              <Sparkles size={14} />
              <span className="text-xs font-medium">For Seniors</span>
            </div>

            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Become a SeniorGuide!
            </h2>

            <div className="w-16 h-[2px] bg-white/50 mb-5" />

            <p className="text-sm md:text-base mb-8 text-white/90 leading-relaxed">
              Share your college experience and earn while helping students make better decisions. Join our community of verified guides.
            </p>

            {/* Features */}
            <div className="space-y-2 mb-8">
              <div className="flex items-center gap-2 text-sm text-white/80">
                <div className="w-1.5 h-1.5 rounded-full bg-white/60" />
                <span>Earn up to ₹500 per session</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-white/80">
                <div className="w-1.5 h-1.5 rounded-full bg-white/60" />
                <span>Flexible schedule</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-white/80">
                <div className="w-1.5 h-1.5 rounded-full bg-white/60" />
                <span>Build your profile & reputation</span>
              </div>
            </div>

            <Link to="/register" >
              <motion.button
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                className="group  flex items-center gap-2 bg-transparent border-2 border-white/70 hover:bg-white hover:text-[#545454] px-6 py-3 rounded-xl font-semibold transition-all duration-300"
              >
                <span>Register Now</span>
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </motion.div>

     
    </div>
  );
}

export default AdviceCards;