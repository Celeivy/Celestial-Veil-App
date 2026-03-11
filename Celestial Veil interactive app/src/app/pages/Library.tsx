import { motion } from "motion/react";
import { Search, BookOpen, Headphones, Edit3, Sparkles } from "lucide-react";
import { StarCluster, SparkleAccent } from "../components/Decorations";

const categories = [
  { name: "Meditations", icon: Headphones, count: 24 },
  { name: "Rituals", icon: Sparkles, count: 18 },
  { name: "Shadow Exercises", icon: Edit3, count: 32 },
  { name: "Journaling Prompts", icon: Edit3, count: 45 },
];

const recentContent = [
  {
    title: "Release & Let Go Meditation",
    category: "Meditation",
    duration: "12 min",
    type: "audio",
  },
  {
    title: "New Moon Ritual",
    category: "Ritual",
    duration: "Read",
    type: "text",
  },
  {
    title: "Parts Work: The Protector",
    category: "Shadow Work",
    duration: "15 min",
    type: "text",
  },
  {
    title: "Where Do I Feel This Truth?",
    category: "Journaling",
    duration: "Prompt",
    type: "text",
  },
];

export function Library() {
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
          Your Sacred <span className="not-italic">LIBRARY</span>
        </h1>
        <p className="text-[#E8DFF5]/70 text-sm font-serif italic max-w-md mx-auto leading-relaxed">
          Your archive of meditations, rituals, and reflections
        </p>
      </motion.div>

      {/* Search */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="relative mb-8"
      >
        <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#E8DFF5]/40" />
        <input
          type="text"
          placeholder="Search library..."
          className="w-full bg-[#3C2245]/40 backdrop-blur-sm border border-[#B9A7FF]/20 rounded-full pl-14 pr-5 py-4 text-[#E8DFF5] placeholder:text-[#E8DFF5]/40 focus:outline-none focus:border-[#B9A7FF]/40 focus:bg-[#3C2245]/60 transition-all font-sans"
        />
      </motion.div>

      {/* Categories */}
      <div className="mb-8">
        <h2 className="text-xs text-[#B9A7FF] mb-4 uppercase tracking-widest font-sans">
          Browse by Type
        </h2>
        <div className="grid grid-cols-2 gap-3">
          {categories.map((category, index) => (
            <motion.button
              key={category.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + 0.05 * index }}
              className="bg-[#3C2245]/40 backdrop-blur-sm border border-[#B9A7FF]/20 rounded-3xl p-5 hover:bg-[#3C2245]/60 hover:border-[#B9A7FF]/40 hover:shadow-[0_0_20px_rgba(185,167,255,0.1)] transition-all group active:scale-[0.98]"
            >
              <category.icon className="w-8 h-8 text-[#B9A7FF] mb-3 group-hover:text-[#F5D38E] transition-colors" />
              <h3 className="text-[#E8DFF5] mb-1 font-serif">{category.name}</h3>
              <p className="text-[#E8DFF5]/60 text-sm font-sans">{category.count} items</p>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Recent content */}
      <div>
        <h2 className="text-xs text-[#B9A7FF] mb-4 uppercase tracking-widest font-sans">
          Recently Added
        </h2>
        <div className="space-y-3">
          {recentContent.map((item, index) => (
            <motion.button
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + 0.1 * index }}
              className="w-full bg-[#3C2245]/40 backdrop-blur-sm border border-[#B9A7FF]/20 rounded-3xl p-5 hover:bg-[#3C2245]/60 hover:border-[#B9A7FF]/40 hover:shadow-[0_0_20px_rgba(185,167,255,0.1)] transition-all text-left group active:scale-[0.99]"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#B9A7FF]/20 to-[#F5D38E]/10 border border-[#B9A7FF]/30 flex items-center justify-center flex-shrink-0">
                  {item.type === "audio" ? (
                    <Headphones className="w-6 h-6 text-[#B9A7FF]" />
                  ) : (
                    <BookOpen className="w-6 h-6 text-[#B9A7FF]" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="text-[#E8DFF5] mb-1 font-serif group-hover:text-[#F5D38E] transition-colors">
                    {item.title}
                  </h3>
                  <div className="flex items-center gap-2 text-[#E8DFF5]/60 text-sm font-sans">
                    <span className="italic">{item.category}</span>
                    <span>•</span>
                    <span>{item.duration}</span>
                  </div>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Saved for later */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mt-12 bg-gradient-to-br from-[#F5D38E]/10 to-[#B9A7FF]/10 backdrop-blur-sm border border-[#F5D38E]/20 rounded-3xl p-8 text-center relative overflow-hidden"
      >
        <SparkleAccent className="absolute top-4 right-4 text-[#F5D38E] opacity-30" />
        
        <BookOpen className="w-8 h-8 text-[#F5D38E] mx-auto mb-3" />
        <h3 className="text-[#E8DFF5] mb-2 font-serif">Your Personal Library</h3>
        <p className="text-[#E8DFF5]/70 text-sm leading-relaxed font-serif italic">
          Save practices, meditations, and reflections to revisit anytime
        </p>
      </motion.div>
    </div>
  );
}
