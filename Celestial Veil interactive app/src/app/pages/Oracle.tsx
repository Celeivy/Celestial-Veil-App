import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, Star, Moon, Sun } from "lucide-react";
import { MoonStars, SparkleAccent } from "../components/Decorations";

const oracleCards = [
  {
    title: "The Mirror",
    message: "What you see in others is also within you.",
    reflection: "Notice what triggers you today. That's your teacher.",
  },
  {
    title: "The Pause",
    message: "Sometimes the answer is to stop asking.",
    reflection: "Rest in not knowing. Trust unfolds in stillness.",
  },
  {
    title: "The Truth",
    message: "A quiet truth is still a truth.",
    reflection: "Your intuition doesn't need to shout to be real.",
  },
  {
    title: "The Becoming",
    message: "You are not broken. You are unfolding.",
    reflection: "Every version of you was necessary.",
  },
  {
    title: "The Boundary",
    message: "Your 'no' is sacred. Your 'yes' is precious.",
    reflection: "Practice saying no to what drains you.",
  },
  {
    title: "The Shadow",
    message: "The parts you hide hold the most power.",
    reflection: "What if your 'too much' is your gift?",
  },
  {
    title: "The Return",
    message: "You keep returning to what needs healing.",
    reflection: "Repetition isn't failure. It's invitation.",
  },
  {
    title: "The Witness",
    message: "You can observe without becoming.",
    reflection: "Notice the feeling. You are not the feeling.",
  },
];

export function Oracle() {
  const [drawnCard, setDrawnCard] = useState<typeof oracleCards[0] | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  const drawCard = () => {
    setIsDrawing(true);
    
    setTimeout(() => {
      const randomCard = oracleCards[Math.floor(Math.random() * oracleCards.length)];
      setDrawnCard(randomCard);
      setIsDrawing(false);
    }, 1500);
  };

  const reset = () => {
    setDrawnCard(null);
  };

  return (
    <div className="min-h-screen px-6 py-8 max-w-2xl mx-auto relative">
      {/* Decorative moon and stars */}
      <MoonStars className="absolute top-4 right-4 text-[#B9A7FF] opacity-70" />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <div className="inline-flex items-center gap-2 mb-4">
          <SparkleAccent className="text-[#F5D38E]" />
          <h1 className="text-3xl font-serif italic text-[#E8DFF5]">
            Accurate Clarifying{" "}
            <span className="not-italic">READINGS</span>
          </h1>
        </div>
        <p className="text-[#E8DFF5]/70 text-sm font-serif italic max-w-md mx-auto leading-relaxed">
          Draw a card for reflection, insight, or gentle guidance
        </p>
      </motion.div>

      <AnimatePresence mode="wait">
        {!drawnCard && !isDrawing ? (
          <motion.div
            key="draw-state"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="flex flex-col items-center gap-8"
          >
            {/* Card back display */}
            <div className="relative">
              {/* Decorative glow */}
              <div className="absolute inset-0 bg-[#B9A7FF]/20 blur-3xl rounded-full" />
              
              {/* Card */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="relative w-64 h-96 bg-gradient-to-br from-[#3C2245] to-[#1C1A2B] border-2 border-[#B9A7FF]/40 rounded-3xl flex flex-col items-center justify-center shadow-[0_0_40px_rgba(185,167,255,0.2)]"
              >
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0ic3RhcnMiIHg9IjAiIHk9IjAiIHdpZHRoPSI1MCIgaGVpZ2h0PSI1MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9IiNCOUE3RkYiIG9wYWNpdHk9IjAuMyIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNzdGFycykiLz48L3N2Zz4=')] opacity-30 rounded-3xl" />
                
                <Star className="w-16 h-16 text-[#F5D38E] mb-4" />
                <Moon className="w-12 h-12 text-[#B9A7FF] mb-4" />
                <Sun className="w-12 h-12 text-[#F5D38E]" />
              </motion.div>
            </div>

            {/* Draw button - Deep purple pill style */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={drawCard}
              className="px-10 py-4 bg-[#3C2245] border-2 border-[#B9A7FF]/40 text-[#E8DFF5] rounded-full shadow-[0_0_30px_rgba(185,167,255,0.3)] hover:shadow-[0_0_40px_rgba(185,167,255,0.5)] hover:border-[#B9A7FF]/60 transition-all font-sans uppercase tracking-wide"
            >
              Draw Your Card
            </motion.button>
          </motion.div>
        ) : isDrawing ? (
          <motion.div
            key="drawing-state"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center gap-6"
          >
            <motion.div
              animate={{ 
                rotateY: [0, 180, 360],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 1.5,
                ease: "easeInOut"
              }}
              className="w-64 h-96 bg-gradient-to-br from-[#3C2245] to-[#1C1A2B] border-2 border-[#B9A7FF]/40 rounded-3xl flex items-center justify-center shadow-[0_0_40px_rgba(185,167,255,0.3)]"
            >
              <Sparkles className="w-16 h-16 text-[#F5D38E] animate-pulse" />
            </motion.div>
            <p className="text-[#E8DFF5]/70 text-sm font-serif italic">Drawing your card...</p>
          </motion.div>
        ) : (
          <motion.div
            key="card-state"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {/* Drawn card */}
            <motion.div
              initial={{ rotateY: 180, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="w-full bg-gradient-to-br from-[#3C2245]/60 to-[#1C1A2B]/40 backdrop-blur-sm border-2 border-[#F5D38E]/40 rounded-3xl p-8 text-center shadow-[0_0_40px_rgba(245,211,142,0.3)] relative overflow-hidden"
            >
              {/* Decorative sparkles */}
              <SparkleAccent className="absolute top-4 right-4 text-[#F5D38E] opacity-30" />
              <SparkleAccent className="absolute bottom-4 left-4 text-[#B9A7FF] opacity-30" />

              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring" }}
              >
                <Sparkles className="w-12 h-12 text-[#F5D38E] mx-auto mb-6" />
              </motion.div>

              <h2 className="text-3xl font-serif italic text-[#F5D38E] mb-6">
                {drawnCard?.title}
              </h2>

              <p className="text-[#E8DFF5] text-lg mb-6 leading-relaxed font-serif">
                {drawnCard?.message}
              </p>

              <div className="pt-6 border-t border-[#B9A7FF]/20">
                <p className="text-[#E8DFF5]/80 text-sm italic leading-relaxed font-serif">
                  {drawnCard?.reflection}
                </p>
              </div>
            </motion.div>

            {/* Action buttons */}
            <div className="flex gap-3">
              <button
                onClick={reset}
                className="flex-1 px-6 py-4 bg-[#3C2245]/60 border border-[#B9A7FF]/30 text-[#E8DFF5] rounded-full hover:bg-[#3C2245]/80 hover:border-[#B9A7FF]/50 transition-all font-sans active:scale-[0.98]"
              >
                Draw Again
              </button>
              <button className="flex-1 px-6 py-4 bg-[#3C2245] border-2 border-[#F5D38E]/40 text-[#E8DFF5] rounded-full hover:border-[#F5D38E]/60 hover:shadow-[0_0_20px_rgba(245,211,142,0.2)] transition-all font-sans active:scale-[0.98]">
                Save Reflection
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Oracle decks */}
      {!drawnCard && !isDrawing && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-16"
        >
          <h2 className="text-xs text-[#B9A7FF] mb-4 uppercase tracking-widest font-sans">
            Oracle Decks
          </h2>
          <div className="space-y-3">
            {["Storybook Love Oracle", "Symbols Oracle", "Messages Oracle"].map(
              (deck, index) => (
                <motion.button
                  key={deck}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + 0.1 * index }}
                  className="w-full bg-[#3C2245]/40 backdrop-blur-sm border border-[#B9A7FF]/20 rounded-full p-4 flex items-center gap-3 hover:bg-[#3C2245]/60 hover:border-[#B9A7FF]/40 transition-all font-sans active:scale-[0.99]"
                >
                  <Sparkles className="w-5 h-5 text-[#B9A7FF]" />
                  <span className="text-[#E8DFF5] font-serif">{deck}</span>
                  <span className="ml-auto text-[#E8DFF5]/40 text-sm italic">
                    Coming soon
                  </span>
                </motion.button>
              )
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
}
