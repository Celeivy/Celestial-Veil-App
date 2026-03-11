import { useState } from "react";
import { motion } from "motion/react";
import { Sparkles, Heart, Cloud, Zap, Sun } from "lucide-react";
import { StarCluster, SparkleAccent, CurlyArrow } from "../components/Decorations";

const moods = [
  { id: "overwhelmed", label: "Overwhelmed", icon: Cloud, color: "#B9A7FF" },
  { id: "anxious", label: "Anxious", icon: Zap, color: "#B9A7FF" },
  { id: "confused", label: "Confused", icon: Cloud, color: "#B9A7FF" },
  { id: "hopeful", label: "Hopeful", icon: Sun, color: "#F5D38E" },
  { id: "calm", label: "Calm", icon: Heart, color: "#F5D38E" },
];

const suggestions = {
  overwhelmed: [
    { title: "Vagus Reset", duration: "5 min", type: "Regulation" },
    { title: "Emotional Flooding Support", duration: "8 min", type: "Support" },
  ],
  anxious: [
    { title: "Intuition vs Anxiety", duration: "10 min", type: "Discernment" },
    { title: "Relax Facial Muscles", duration: "3 min", type: "Regulation" },
  ],
  confused: [
    { title: "Compass of Discernment", duration: "12 min", type: "Clarity" },
    { title: "Daily Oracle Card", duration: "2 min", type: "Reflection" },
  ],
  hopeful: [
    { title: "Daily Oracle Card", duration: "2 min", type: "Reflection" },
    { title: "Gratitude Reflection", duration: "5 min", type: "Integration" },
  ],
  calm: [
    { title: "Shadow Work Reflection", duration: "15 min", type: "Depth" },
    { title: "Daily Oracle Card", duration: "2 min", type: "Reflection" },
  ],
};

export function Home() {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const currentHour = new Date().getHours();
  const greeting =
    currentHour < 12
      ? "Good morning"
      : currentHour < 18
      ? "Good afternoon"
      : "Good evening";

  return (
    <div className="min-h-screen px-6 py-8 max-w-2xl mx-auto relative">
      {/* Decorative stars */}
      <StarCluster className="absolute top-4 right-4 text-[#B9A7FF]" />

      {/* Header with cosmic greeting */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12 relative"
      >
        <div className="inline-flex items-center gap-2 mb-4">
          <SparkleAccent className="text-[#F5D38E]" />
          <h1 className="text-3xl font-serif italic text-[#E8DFF5]">
            {greeting}, sweetheart
          </h1>
        </div>
        <p className="text-[#E8DFF5]/80 text-base max-w-md mx-auto leading-relaxed">
          {selectedMood ? (
            <>
              Your inner compass is waiting.{" "}
              <span className="italic font-serif">Here are practices aligned with how you feel.</span>
            </>
          ) : (
            <>
              <span className="italic font-serif">Healing isn't performance.</span>
              <br />
              It's the soft return to yourself.
            </>
          )}
        </p>
      </motion.div>

      {/* Mood check-in */}
      {!selectedMood ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-center mb-6 text-[#E8DFF5]/90 font-serif">
            How are you feeling <span className="italic">today</span>?
          </h2>

          <div className="space-y-3">
            {moods.map((mood, index) => (
              <motion.button
                key={mood.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
                onClick={() => setSelectedMood(mood.id)}
                className="w-full bg-[#3C2245]/50 backdrop-blur-sm border border-[#B9A7FF]/20 rounded-3xl p-5 flex items-center gap-4 hover:bg-[#3C2245]/70 hover:border-[#B9A7FF]/40 transition-all active:scale-[0.98]"
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{
                    background: `linear-gradient(135deg, ${mood.color}20, ${mood.color}10)`,
                    border: `1px solid ${mood.color}40`,
                  }}
                >
                  <mood.icon className="w-6 h-6" style={{ color: mood.color }} />
                </div>
                <span className="text-[#E8DFF5] font-sans">{mood.label}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6 relative"
        >
          {/* Decorative arrow */}
          <CurlyArrow className="absolute -right-4 -top-12 text-[#F5D38E] opacity-50" />

          {/* Selected mood display */}
          <div className="bg-gradient-to-br from-[#3C2245]/60 to-[#3C2245]/30 backdrop-blur-sm border border-[#F5D38E]/30 rounded-3xl p-6 text-center">
            <div className="inline-flex items-center gap-3 mb-2">
              {moods.find((m) => m.id === selectedMood) && (
                <>
                  {(() => {
                    const MoodIcon = moods.find((m) => m.id === selectedMood)!
                      .icon;
                    return (
                      <MoodIcon className="w-6 h-6 text-[#F5D38E]" />
                    );
                  })()}
                  <p className="text-[#E8DFF5] font-sans">
                    You're feeling{" "}
                    <span className="text-[#F5D38E] font-serif italic">
                      {moods.find((m) => m.id === selectedMood)?.label.toLowerCase()}
                    </span>
                  </p>
                </>
              )}
            </div>
            <p className="text-[#E8DFF5]/70 text-sm italic font-serif">
              That's okay. You're exactly where you need to be.
            </p>
          </div>

          {/* Suggested practices */}
          <div>
            <h3 className="mb-4 text-[#E8DFF5]/90 font-serif text-center">
              Suggested <span className="italic">practices</span>
            </h3>
            <div className="space-y-3">
              {suggestions[selectedMood as keyof typeof suggestions]?.map(
                (practice, index) => (
                  <motion.button
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="w-full bg-[#3C2245] backdrop-blur-sm border border-[#B9A7FF]/30 rounded-full py-4 px-6 hover:bg-[#3C2245]/80 hover:border-[#B9A7FF]/50 hover:shadow-[0_0_20px_rgba(185,167,255,0.2)] transition-all text-left group active:scale-[0.98]"
                  >
                    <div className="flex justify-between items-center mb-1">
                      <h4 className="text-[#E8DFF5] font-sans group-hover:text-[#F5D38E] transition-colors">
                        {practice.title}
                      </h4>
                      <span className="text-[#B9A7FF] text-sm font-sans">
                        {practice.duration}
                      </span>
                    </div>
                    <span className="text-[#B9A7FF]/70 text-xs font-sans uppercase tracking-wide">
                      {practice.type}
                    </span>
                  </motion.button>
                )
              )}
            </div>
          </div>

          {/* Change mood button */}
          <button
            onClick={() => setSelectedMood(null)}
            className="w-full text-center text-[#E8DFF5]/60 text-sm py-4 hover:text-[#E8DFF5] transition-colors font-sans"
          >
            Change how you're feeling
          </button>
        </motion.div>
      )}

      {/* Daily wisdom */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-12 bg-gradient-to-br from-[#F5D38E]/10 to-[#B9A7FF]/10 backdrop-blur-sm border border-[#F5D38E]/20 rounded-3xl p-8 text-center relative overflow-hidden"
      >
        {/* Decorative sparkle */}
        <SparkleAccent className="absolute top-3 right-3 text-[#F5D38E] opacity-30" />
        
        <p className="text-[#E8DFF5]/90 leading-relaxed font-serif">
          <span className="italic">
            "Everyone can <span className="text-[#B9A7FF]">GROW</span> and{" "}
            <span className="text-[#F5D38E]">HEAL</span> if they want to.
          </span>
          <br />
          <span className="text-sm text-[#E8DFF5]/70 font-sans">
            Guiding & tools gives you quicker results.
          </span>
        </p>
      </motion.div>
    </div>
  );
}
