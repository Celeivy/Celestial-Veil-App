import { motion } from "motion/react";
import { MapPin, Mountain, Moon, Flame, Trees, Crown } from "lucide-react";
import { StarCluster, CurlyArrow, SparkleAccent } from "../components/Decorations";

const journeys = [
  {
    title: "Drama Loop Detox",
    description: "Break free from recurring relationship patterns",
    progress: 0,
    totalSteps: 8,
    icon: MapPin,
    gradient: "from-[#B9A7FF]/30 to-[#3C2245]/30",
  },
  {
    title: "Garden of Death",
    description: "Explore grief, endings, and transformation",
    progress: 3,
    totalSteps: 10,
    icon: Moon,
    gradient: "from-[#3C2245]/30 to-[#B9A7FF]/20",
  },
  {
    title: "Intuition vs Anxiety",
    description: "Learn to distinguish your inner voice from fear",
    progress: 5,
    totalSteps: 6,
    icon: Mountain,
    gradient: "from-[#F5D38E]/20 to-[#B9A7FF]/20",
  },
  {
    title: "Masculine Fire",
    description: "Reconnect with healthy masculine energy",
    progress: 0,
    totalSteps: 12,
    icon: Flame,
    gradient: "from-[#F5D38E]/30 to-[#3C2245]/20",
  },
  {
    title: "Neverland of Shame",
    description: "Heal the parts that feel 'too much' or 'not enough'",
    progress: 0,
    totalSteps: 9,
    icon: Trees,
    gradient: "from-[#B9A7FF]/20 to-[#3C2245]/30",
  },
  {
    title: "Sovereign Self",
    description: "Reclaim your power and autonomy",
    progress: 0,
    totalSteps: 7,
    icon: Crown,
    gradient: "from-[#F5D38E]/30 to-[#B9A7FF]/30",
  },
];

export function Journeys() {
  const inProgress = journeys.filter((j) => j.progress > 0);
  const notStarted = journeys.filter((j) => j.progress === 0);

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
          Personal Structured{" "}
          <span className="not-italic">JOURNEY</span>
        </h1>
        <p className="text-[#E8DFF5]/70 text-sm font-serif italic max-w-md mx-auto leading-relaxed">
          A constellation of meditations, rituals, and reflections for those ready to return to themselves.
        </p>
      </motion.div>

      {/* Continue section */}
      {inProgress.length > 0 && (
        <div className="mb-8 relative">
          <CurlyArrow className="absolute -right-2 -top-8 text-[#F5D38E] opacity-40" />
          
          <h2 className="text-xs text-[#B9A7FF] mb-4 uppercase tracking-widest font-sans flex items-center gap-2">
            <SparkleAccent className="w-4 h-4" />
            Continue Your Journey
          </h2>
          <div className="space-y-4">
            {inProgress.map((journey, index) => (
              <JourneyCard key={index} journey={journey} index={index} />
            ))}
          </div>
        </div>
      )}

      {/* All journeys */}
      <div>
        <h2 className="text-xs text-[#B9A7FF] mb-4 uppercase tracking-widest font-sans">
          {inProgress.length > 0 ? "Start New Journey" : "All Journeys"}
        </h2>
        <div className="space-y-4">
          {notStarted.map((journey, index) => (
            <JourneyCard key={index} journey={journey} index={index} />
          ))}
        </div>
      </div>

      {/* Bottom message */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-12 bg-gradient-to-br from-[#F5D38E]/10 to-[#B9A7FF]/10 backdrop-blur-sm border border-[#F5D38E]/20 rounded-3xl p-8 text-center"
      >
        <p className="text-[#E8DFF5]/90 leading-relaxed font-serif">
          <span className="italic">
            "A space where the{" "}
            <span className="text-[#B9A7FF]">'Garden of Death'</span> archetype becomes{" "}
            <span className="text-[#F5D38E]">fertile ground</span> for rebirth."
          </span>
        </p>
      </motion.div>
    </div>
  );
}

function JourneyCard({ journey, index }: { journey: any; index: number }) {
  const progressPercent = (journey.progress / journey.totalSteps) * 100;

  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 * index }}
      className="w-full bg-[#3C2245]/40 backdrop-blur-sm border border-[#B9A7FF]/20 rounded-3xl p-6 hover:bg-[#3C2245]/60 hover:border-[#B9A7FF]/40 hover:shadow-[0_0_25px_rgba(185,167,255,0.15)] transition-all text-left group overflow-hidden relative active:scale-[0.99]"
    >
      {/* Gradient overlay */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${journey.gradient} opacity-50 group-hover:opacity-70 transition-opacity`}
      />

      <div className="relative z-10">
        <div className="flex gap-4 mb-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#B9A7FF]/30 to-[#F5D38E]/20 border border-[#B9A7FF]/30 flex items-center justify-center flex-shrink-0 group-hover:shadow-[0_0_20px_rgba(185,167,255,0.3)] transition-shadow">
            <journey.icon className="w-8 h-8 text-[#B9A7FF]" />
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="text-[#E8DFF5] mb-2 font-serif group-hover:text-[#F5D38E] transition-colors">
              {journey.title}
            </h3>
            <p className="text-[#E8DFF5]/60 text-sm font-sans italic">
              {journey.description}
            </p>
          </div>
        </div>

        {/* Progress bar */}
        {journey.progress > 0 ? (
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-sans">
              <span className="text-[#B9A7FF]">
                Step {journey.progress} of {journey.totalSteps}
              </span>
              <span className="text-[#E8DFF5]/60">
                {Math.round(progressPercent)}%
              </span>
            </div>
            <div className="h-2 bg-[#3C2245]/60 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ delay: 0.2 + 0.1 * index, duration: 0.6 }}
                className="h-full bg-gradient-to-r from-[#B9A7FF] to-[#F5D38E] rounded-full"
              />
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2 text-[#E8DFF5]/60 text-sm font-sans">
            <span>{journey.totalSteps} steps</span>
            <span>•</span>
            <span className="italic">Start anytime</span>
          </div>
        )}
      </div>
    </motion.button>
  );
}
