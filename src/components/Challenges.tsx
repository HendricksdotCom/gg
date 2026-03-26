import { motion } from 'motion/react';
import { Swords, Users, Timer, Target, Sparkles } from 'lucide-react';

const challenges = [
  { id: 1, type: '1v1 Duel', title: 'Mirror Match', game: 'Valorant', difficulty: 'Hard', icon: Swords, color: 'from-red-500/20 to-orange-500/20', border: 'border-orange-500/30', text: 'text-orange-400' },
  { id: 2, type: '2v2 Team', title: 'Tactical Breach', game: 'Rainbow Six', difficulty: 'Medium', icon: Users, color: 'from-blue-500/20 to-cyan-500/20', border: 'border-cyan-500/30', text: 'text-cyan-400' },
  { id: 3, type: 'Speed Run', title: 'Any% Glitchless', game: 'Elden Ring', difficulty: 'Extreme', icon: Timer, color: 'from-[#8A2BE2]/20 to-purple-500/20', border: 'border-[#8A2BE2]/30', text: 'text-[#8A2BE2]' },
  { id: 4, type: 'AI Quest', title: 'Perfect Accuracy', game: 'Apex Legends', difficulty: 'Easy', icon: Target, color: 'from-[#FFD700]/20 to-yellow-500/20', border: 'border-[#FFD700]/30', text: 'text-[#FFD700]' },
];

export function Challenges() {
  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
            AI Challenges <Sparkles className="w-6 h-6 text-[#FFD700]" />
          </h1>
          <p className="text-white/50">Adaptive AI opponents generated based on your playstyle.</p>
        </div>
        <button className="bg-gradient-to-r from-[#8A2BE2] to-[#FFD700] text-black font-bold px-6 py-2.5 rounded-xl shadow-[0_0_20px_rgba(255,215,0,0.3)] hover:scale-105 transition-transform w-full md:w-auto">
          Generate New
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {challenges.map((challenge, i) => {
          const Icon = challenge.icon;
          return (
            <motion.div
              key={challenge.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className={`bg-gradient-to-br ${challenge.color} border ${challenge.border} rounded-3xl p-6 relative overflow-hidden group cursor-pointer`}
            >
              <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity transform group-hover:scale-110 duration-500">
                <Icon className="w-32 h-32" />
              </div>
              
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-4">
                  <span className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-black/40 backdrop-blur-md ${challenge.text}`}>
                    {challenge.type}
                  </span>
                  <span className="text-xs text-white/50 bg-black/20 px-2 py-1 rounded-md">
                    {challenge.difficulty}
                  </span>
                </div>
                
                <h2 className="text-2xl font-bold mb-1">{challenge.title}</h2>
                <p className="text-white/70 mb-6">{challenge.game}</p>
                
                <div className="flex gap-3">
                  <button className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-xl text-sm font-semibold transition-colors flex-1">
                    View Details
                  </button>
                  <button className={`bg-black/40 hover:bg-black/60 backdrop-blur-md px-4 py-2 rounded-xl text-sm font-bold transition-colors flex-1 ${challenge.text} border border-transparent hover:${challenge.border}`}>
                    Accept
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
