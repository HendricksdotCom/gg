import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Swords, Users, Timer, Target, Sparkles } from 'lucide-react';

const iconMap: any = {
  Swords,
  Users,
  Timer,
  Target
};

export function Challenges() {
  const [challenges, setChallenges] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    fetchChallenges();
  }, []);

  const fetchChallenges = async () => {
    try {
      const res = await fetch('/api/challenges/active');
      const data = await res.json();
      setChallenges(data);
    } catch (error) {
      console.error('Error fetching challenges:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateNewChallenge = async () => {
    setGenerating(true);
    try {
      const res = await fetch('/api/challenges/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          skill: 'Diamond II',
          games: ['Valorant', 'Apex Legends', 'Elden Ring']
        })
      });
      const newChallenge = await res.json();
      
      // Add some UI fields that the AI might not return
      const enhancedChallenge = {
        ...newChallenge,
        id: Date.now(),
        icon: 'Sparkles',
        color: 'from-purple-500/20 to-pink-500/20',
        border: 'border-pink-500/30',
        text: 'text-pink-400'
      };
      
      setChallenges([enhancedChallenge, ...challenges]);
    } catch (error) {
      console.error('Error generating challenge:', error);
    } finally {
      setGenerating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#FFD700]"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
            AI Challenges <Sparkles className="w-6 h-6 text-[#FFD700]" />
          </h1>
          <p className="text-white/50">Adaptive AI opponents generated based on your playstyle.</p>
        </div>
        <button 
          onClick={generateNewChallenge}
          disabled={generating}
          className="bg-gradient-to-r from-[#8A2BE2] to-[#FFD700] text-black font-bold px-6 py-2.5 rounded-xl shadow-[0_0_20px_rgba(255,215,0,0.3)] hover:scale-105 transition-transform w-full md:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {generating ? 'Generating...' : 'Generate New'}
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {challenges.map((challenge, i) => {
          const Icon = iconMap[challenge.icon] || Sparkles;
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
