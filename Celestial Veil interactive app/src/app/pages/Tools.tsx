import { motion } from "motion/react";
import { Heart, Wind, Compass, Flame, Shield, Sparkles } from "lucide-react";
import { StarCluster, SparkleAccent } from "../components/Decorations";

const tools = [
  {
    title: "Vagus Stimulation",
    description: "Gentle nervous system reset",
    duration: "5 min",
    icon: Wind,
    category: "Regulation",
  },
  {
    title: "Compass of Discernment",
    description: "Navigate inner truth vs external noise",
    duration: "10 min",
    icon: Compass,
    category: "Clarity",
  },
  {
    title: "Anger Alchemy",
    description: "Transform anger into insight",
    duration: "12 min",
    icon: Flame,
    category: "Shadow Work",
  },
  {
    title: "Emotional Flooding Support",
    description: "Ground yourself when overwhelmed",
    duration: "8 min",
    icon: Heart,
    category: "Support",
  },
  {
    title: "Relax Facial Muscles",
    description: "Release tension held in your face",
    duration: "3 min",
    icon: Sparkles,
    category: "Regulation",
  },
  {
    title: "Boundary Setting",
    description: "Clarify and hold your boundaries",
    duration: "15 min",
    icon: Shield,
    category: "Empowerment",
  },
];

const categories = ["All", "Regulation", "Clarity", "Shadow Work", "Support", "Empowerment"];

export function Tools() {
  return (
    <div className="min-h-screen px-6 py-8 max-w-2xl mx-auto relative">
      {/* Decorative stars */}
      <StarCluster className="absolute top-4 right-4 text-[#B9A7FF]" />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 text-center"
      >
        <h1 className="text-3xl font-serif italic text-[#E8DFF5] mb-3">
          Shameless Healing{" "}
          <span className="not-italic">TOOLS</span>
        </h1>
        <p className="text-[#E8DFF5]/70 text-sm font-serif italic max-w-md mx-auto leading-relaxed">
          Atomic practices woven from shadow work, nervous system wisdom, and spiritual insight.
        </p>
      </motion.div>

      {/* Category filter */}
      <div className="mb-6 overflow-x-auto pb-2 -mx-6 px-6">
        <div className="flex gap-2 min-w-max">
          {categories.map((category, index) => (
            <motion.button
              key={category}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * index }}
              className={`px-5 py-2 rounded-full text-sm border transition-all font-sans ${
                category === "All"
                  ? "bg-[#3C2245] border-[#B9A7FF]/50 text-[#E8DFF5] shadow-[0_0_15px_rgba(185,167,255,0.2)]"
                  : "bg-[#3C2245]/30 border-[#B9A7FF]/20 text-[#E8DFF5]/60 hover:border-[#B9A7FF]/40 hover:bg-[#3C2245]/50"
              }`}
            >
              {category}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Tools grid */}
      <div className="space-y-4">
        {tools.map((tool, index) => (
          <motion.button
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
            className="w-full bg-[#3C2245]/40 backdrop-blur-sm border border-[#B9A7FF]/20 rounded-3xl p-6 hover:bg-[#3C2245]/60 hover:border-[#B9A7FF]/40 hover:shadow-[0_0_25px_rgba(185,167,255,0.15)] transition-all text-left group active:scale-[0.99] relative overflow-hidden"
          >
            {/* Subtle decorative element */}
            {index % 3 === 0 && (
              <SparkleAccent className="absolute top-4 right-4 text-[#F5D38E] opacity-20" />
            )}

            <div className="flex gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#B9A7FF]/20 to-[#F5D38E]/10 border border-[#B9A7FF]/30 flex items-center justify-center flex-shrink-0 group-hover:shadow-[0_0_20px_rgba(185,167,255,0.3)] transition-shadow">
                <tool.icon className="w-7 h-7 text-[#B9A7FF]" />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-[#E8DFF5] font-serif group-hover:text-[#F5D38E] transition-colors">
                    {tool.title}
                  </h3>
                  <span className="text-[#B9A7FF] text-sm ml-2 flex-shrink-0 font-sans">
                    {tool.duration}
                  </span>
                </div>
                
                <p className="text-[#E8DFF5]/60 text-sm mb-3 font-sans italic">
                  {tool.description}
                </p>
                
                <span className="inline-block px-3 py-1 bg-[#B9A7FF]/10 border border-[#B9A7FF]/20 rounded-full text-[#B9A7FF] text-xs font-sans uppercase tracking-wide">
                  {tool.category}
                </span>
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Bottom message */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-12 text-center"
      >
        <p className="text-[#E8DFF5]/60 text-sm font-serif italic leading-relaxed">
          Crafted for deep transformation.
        </p>
      </motion.div>
    </div>
  );
}
