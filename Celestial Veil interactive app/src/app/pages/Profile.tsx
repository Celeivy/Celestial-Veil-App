import { motion } from "motion/react";
import { User, Heart, Calendar, Award, Settings, Moon } from "lucide-react";
import { StarCluster, SparkleAccent } from "../components/Decorations";

const stats = [
  { label: "Days of Presence", value: "12", icon: Calendar },
  { label: "Journeys Started", value: "3", icon: Award },
  { label: "Practices Completed", value: "28", icon: Heart },
];

const completedJourneys = [
  { name: "Intuition vs Anxiety", completedOn: "Feb 28, 2026" },
];

export function Profile() {
  return (
    <div className="min-h-screen px-6 py-8 max-w-2xl mx-auto relative">
      {/* Decorative stars */}
      <StarCluster className="absolute top-4 right-4 text-[#B9A7FF]" />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#B9A7FF]/30 to-[#F5D38E]/30 border-2 border-[#B9A7FF]/40 flex items-center justify-center shadow-[0_0_30px_rgba(185,167,255,0.2)]">
          <User className="w-12 h-12 text-[#B9A7FF]" />
        </div>
        <h1 className="text-3xl font-serif italic text-[#E8DFF5] mb-3">
          Your <span className="not-italic">JOURNEY</span>
        </h1>
        <p className="text-[#E8DFF5]/70 text-sm font-serif italic">
          Track your growth and reflection
        </p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-8">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 + 0.05 * index }}
            className="bg-[#3C2245]/40 backdrop-blur-sm border border-[#B9A7FF]/20 rounded-3xl p-4 text-center hover:border-[#B9A7FF]/40 transition-all"
          >
            <stat.icon className="w-6 h-6 text-[#B9A7FF] mx-auto mb-2" />
            <div className="text-2xl font-serif text-[#F5D38E] mb-1">{stat.value}</div>
            <div className="text-[#E8DFF5]/60 text-xs leading-tight font-sans">
              {stat.label}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Completed journeys */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mb-8"
      >
        <h2 className="text-xs text-[#B9A7FF] mb-4 uppercase tracking-widest font-sans flex items-center gap-2">
          <SparkleAccent className="w-4 h-4" />
          Completed Journeys
        </h2>
        <div className="space-y-3">
          {completedJourneys.map((journey, index) => (
            <div
              key={index}
              className="bg-[#3C2245]/40 backdrop-blur-sm border border-[#F5D38E]/30 rounded-3xl p-5"
            >
              <div className="flex items-center gap-3 mb-2">
                <Award className="w-5 h-5 text-[#F5D38E]" />
                <h3 className="text-[#E8DFF5] font-serif">{journey.name}</h3>
              </div>
              <p className="text-[#E8DFF5]/60 text-sm font-sans italic">
                Completed {journey.completedOn}
              </p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Favorites */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mb-8"
      >
        <h2 className="text-xs text-[#B9A7FF] mb-4 uppercase tracking-widest font-sans">
          Favorite Tools
        </h2>
        <div className="space-y-3">
          <button className="w-full bg-[#3C2245]/40 backdrop-blur-sm border border-[#B9A7FF]/20 rounded-full p-4 flex items-center justify-between hover:bg-[#3C2245]/60 hover:border-[#B9A7FF]/40 transition-all active:scale-[0.99]">
            <div className="flex items-center gap-3">
              <Heart className="w-5 h-5 text-[#B9A7FF]" />
              <span className="text-[#E8DFF5] font-sans">Vagus Stimulation</span>
            </div>
            <span className="text-[#E8DFF5]/40 text-sm font-sans italic">12 times</span>
          </button>
          <button className="w-full bg-[#3C2245]/40 backdrop-blur-sm border border-[#B9A7FF]/20 rounded-full p-4 flex items-center justify-between hover:bg-[#3C2245]/60 hover:border-[#B9A7FF]/40 transition-all active:scale-[0.99]">
            <div className="flex items-center gap-3">
              <Heart className="w-5 h-5 text-[#B9A7FF]" />
              <span className="text-[#E8DFF5] font-sans">Compass of Discernment</span>
            </div>
            <span className="text-[#E8DFF5]/40 text-sm font-sans italic">8 times</span>
          </button>
        </div>
      </motion.div>

      {/* Settings & preferences */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <h2 className="text-xs text-[#B9A7FF] mb-4 uppercase tracking-widest font-sans">
          Settings
        </h2>
        <div className="space-y-3">
          <button className="w-full bg-[#3C2245]/40 backdrop-blur-sm border border-[#B9A7FF]/20 rounded-full p-4 flex items-center gap-3 hover:bg-[#3C2245]/60 hover:border-[#B9A7FF]/40 transition-all text-left active:scale-[0.99]">
            <Moon className="w-5 h-5 text-[#B9A7FF]" />
            <span className="text-[#E8DFF5] font-sans">Notifications</span>
          </button>
          <button className="w-full bg-[#3C2245]/40 backdrop-blur-sm border border-[#B9A7FF]/20 rounded-full p-4 flex items-center gap-3 hover:bg-[#3C2245]/60 hover:border-[#B9A7FF]/40 transition-all text-left active:scale-[0.99]">
            <Settings className="w-5 h-5 text-[#B9A7FF]" />
            <span className="text-[#E8DFF5] font-sans">Preferences</span>
          </button>
        </div>
      </motion.div>

      {/* Daily wisdom */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-12 bg-gradient-to-br from-[#F5D38E]/10 to-[#B9A7FF]/10 backdrop-blur-sm border border-[#F5D38E]/20 rounded-3xl p-8 text-center relative overflow-hidden"
      >
        <SparkleAccent className="absolute top-4 right-4 text-[#F5D38E] opacity-30" />
        
        <p className="text-[#E8DFF5]/90 text-sm leading-relaxed font-serif italic">
          "Progress isn't linear. Every step, even the backwards ones, are part
          of your becoming."
        </p>
      </motion.div>
    </div>
  );
}
