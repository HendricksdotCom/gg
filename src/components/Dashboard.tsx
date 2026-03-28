import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Play, Clock, Activity, Zap, Swords, Trophy, MoreVertical, UserPlus, LogIn } from 'lucide-react';

export function Dashboard() {
  const [recentGames, setRecentGames] = useState<any[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [friendsPlaying, setFriendsPlaying] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeMenu, setActiveMenu] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [gamesRes, statsRes, friendsRes] = await Promise.all([
          fetch('/api/games/library'),
          fetch('/api/games/stats'),
          fetch('/api/social/friends/playing')
        ]);
        const gamesData = await gamesRes.json();
        const statsData = await statsRes.json();
        const friendsData = await friendsRes.json();
        setRecentGames(gamesData);
        setStats(statsData);
        setFriendsPlaying(friendsData);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#8A2BE2]"></div>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="text-4xl font-bold tracking-tight mb-2">Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8A2BE2] to-[#FFD700]">Player One</span></h1>
          <p className="text-white/50">Your AI gaming hub is ready. You have 2 pending challenges.</p>
        </div>
        <div className="flex gap-4 w-full md:w-auto">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center gap-4 backdrop-blur-md flex-1 md:flex-none">
            <div className="p-2 bg-[#8A2BE2]/20 rounded-xl">
              <Activity className="w-5 h-5 text-[#8A2BE2]" />
            </div>
            <div>
              <p className="text-[10px] text-white/50 uppercase font-semibold tracking-wider">Weekly Playtime</p>
              <p className="text-lg font-bold">{stats?.weeklyPlaytime || '0 hrs'}</p>
            </div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center gap-4 backdrop-blur-md flex-1 md:flex-none">
            <div className="p-2 bg-[#FFD700]/20 rounded-xl">
              <Zap className="w-5 h-5 text-[#FFD700]" />
            </div>
            <div>
              <p className="text-[10px] text-white/50 uppercase font-semibold tracking-wider">AI Skill Rating</p>
              <p className="text-lg font-bold">{stats?.skillRating || 'Unranked'}</p>
            </div>
          </div>
        </div>
      </header>

      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Friends Currently Playing</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {friendsPlaying.map((friend, i) => (
            <motion.div
              key={friend.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white/5 border border-white/10 rounded-3xl p-4 backdrop-blur-md flex items-center gap-4 relative"
            >
              <div className="relative">
                <img src={friend.avatar} alt={friend.name} className="w-12 h-12 rounded-full border border-white/10" />
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-[#121212] rounded-full"></span>
              </div>
              
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-sm truncate">{friend.name}</h3>
                <p className="text-xs text-[#FFD700] truncate">{friend.game}</p>
                <p className="text-[10px] text-white/50 truncate">{friend.status} • {friend.platform}</p>
              </div>

              <div className="relative">
                <button 
                  onClick={() => setActiveMenu(activeMenu === friend.id ? null : friend.id)}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors"
                >
                  <MoreVertical className="w-5 h-5 text-white/70" />
                </button>
                
                {activeMenu === friend.id && (
                  <div className="absolute right-0 mt-2 w-36 bg-[#1a1a2e] border border-white/10 rounded-xl shadow-xl z-10 overflow-hidden">
                    <button 
                      onClick={() => { alert(`Invited ${friend.name}`); setActiveMenu(null); }}
                      className="w-full flex items-center gap-2 px-4 py-2.5 text-sm hover:bg-white/10 transition-colors text-left"
                    >
                      <UserPlus className="w-4 h-4" /> Invite
                    </button>
                    <button 
                      onClick={() => { alert(`Joining ${friend.name}`); setActiveMenu(null); }}
                      className="w-full flex items-center gap-2 px-4 py-2.5 text-sm hover:bg-white/10 transition-colors text-left"
                    >
                      <LogIn className="w-4 h-4" /> Join Game
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Jump Back In</h2>
          <button className="text-sm text-[#FFD700] hover:text-[#FFD700]/80 transition-colors">View Library</button>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {recentGames.map((game, i) => (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="group relative aspect-square rounded-3xl overflow-hidden cursor-pointer bg-white/5 border border-white/10"
            >
              <img src={game.image} alt={game.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-60 group-hover:opacity-100" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
              
              <div className="absolute inset-0 p-4 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <span className="text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/10">
                    {game.platform}
                  </span>
                  <span className={`w-2 h-2 rounded-full ${game.type === 'Multi' ? 'bg-[#FFD700]' : game.type === 'Co-op' ? 'bg-[#8A2BE2]' : 'bg-white/50'}`} />
                </div>
                
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="font-bold leading-tight mb-1 truncate">{game.title}</h3>
                  <div className="flex items-center gap-2 text-xs text-white/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                    <Clock className="w-3 h-3" />
                    <span>{game.playtime}</span>
                  </div>
                </div>
              </div>

              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-12 h-12 rounded-full bg-[#8A2BE2]/80 backdrop-blur-md flex items-center justify-center translate-y-4 group-hover:translate-y-0 transition-transform duration-300 shadow-[0_0_20px_rgba(138,43,226,0.5)]">
                  <Play className="w-5 h-5 text-white ml-1" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-md relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#FFD700]/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/4" />
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Swords className="w-5 h-5 text-[#FFD700]" />
            Active AI Quest
          </h2>
          <div className="bg-black/40 rounded-2xl p-5 border border-white/5">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-bold text-lg text-[#FFD700]">The Flawless Run</h3>
                <p className="text-sm text-white/50">Complete 3 matches without dying</p>
              </div>
              <span className="text-xs font-bold px-2 py-1 bg-[#8A2BE2]/20 text-[#8A2BE2] rounded-lg">HARD</span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-2 mb-2 overflow-hidden">
              <div className="bg-gradient-to-r from-[#8A2BE2] to-[#FFD700] h-2 rounded-full w-2/3 shadow-[0_0_10px_rgba(255,215,0,0.5)]" />
            </div>
            <div className="flex justify-between text-xs text-white/50">
              <span>Progress: 2/3</span>
              <span>Ends in 12h</span>
            </div>
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-md relative overflow-hidden">
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#8A2BE2]/10 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/4" />
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Trophy className="w-5 h-5 text-[#8A2BE2]" />
            Recent Achievements
          </h2>
          <div className="space-y-3">
            {[
              { title: 'Sharpshooter', game: 'Valorant', rarity: 'Epic', color: 'text-[#8A2BE2]' },
              { title: 'First Blood', game: 'Apex Legends', rarity: 'Rare', color: 'text-blue-400' },
            ].map((ach, i) => (
              <div key={i} className="flex items-center gap-4 bg-black/20 p-3 rounded-2xl border border-white/5 hover:bg-white/5 transition-colors cursor-pointer">
                <div className={`w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 ${ach.color}`}>
                  <Trophy className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-sm">{ach.title}</h4>
                  <p className="text-xs text-white/50">{ach.game}</p>
                </div>
                <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded-md bg-white/5 ${ach.color}`}>
                  {ach.rarity}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
