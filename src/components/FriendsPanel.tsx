import { motion } from 'motion/react';
import { MessageSquare, Gamepad2 } from 'lucide-react';

const friends = [
  { id: 1, name: 'Alex_Pro', status: 'Playing Valorant', state: 'online', avatar: 'https://i.pravatar.cc/150?u=1' },
  { id: 2, name: 'SarahSniper', status: 'In AI Challenge (1v1)', state: 'busy', avatar: 'https://i.pravatar.cc/150?u=2' },
  { id: 3, name: 'Ghost_Rider', status: 'Last seen 2h ago', state: 'offline', avatar: 'https://i.pravatar.cc/150?u=3' },
];

export function FriendsPanel() {
  return (
    <aside className="w-72 border-l border-white/5 bg-black/20 backdrop-blur-xl p-6 hidden xl:flex flex-col z-20">
      <div className="flex justify-between items-center mb-8">
        <h2 className="font-bold text-lg">Social</h2>
        <span className="text-xs bg-white/10 px-2 py-1 rounded-full text-white/60">3 Online</span>
      </div>

      <div className="space-y-4">
        {friends.map((friend, i) => (
          <motion.div 
            key={friend.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="group p-3 rounded-2xl hover:bg-white/5 border border-transparent hover:border-white/10 transition-all cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="relative">
                <img src={friend.avatar} alt={friend.name} className="w-10 h-10 rounded-full border border-white/10" />
                <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-[#0a0a0c] ${
                  friend.state === 'online' ? 'bg-green-500' : friend.state === 'busy' ? 'bg-[#8A2BE2]' : 'bg-gray-500'
                }`} />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-sm truncate">{friend.name}</h4>
                <p className={`text-xs truncate ${friend.state === 'busy' ? 'text-[#8A2BE2]' : 'text-white/50'}`}>
                  {friend.status}
                </p>
              </div>
            </div>
            
            <div className="mt-3 flex gap-2 opacity-0 h-0 overflow-hidden group-hover:opacity-100 group-hover:h-auto transition-all duration-300">
              <button className="flex-1 bg-white/10 hover:bg-white/20 text-xs py-1.5 rounded-lg flex items-center justify-center gap-1 transition-colors">
                <MessageSquare className="w-3 h-3" /> Chat
              </button>
              <button className="flex-1 bg-[#8A2BE2]/20 hover:bg-[#8A2BE2]/40 text-[#8A2BE2] text-xs py-1.5 rounded-lg flex items-center justify-center gap-1 transition-colors">
                <Gamepad2 className="w-3 h-3" /> Join
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-auto">
        <div className="bg-gradient-to-br from-[#8A2BE2]/20 to-[#FFD700]/10 border border-[#8A2BE2]/30 rounded-3xl p-5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#FFD700]/20 rounded-full blur-[30px] -translate-y-1/2 translate-x-1/2" />
          <h3 className="font-bold text-sm mb-1 text-white">Share to Twitter</h3>
          <p className="text-xs text-white/60 mb-3">Show off your latest AI Challenge victory!</p>
          <button className="w-full bg-white text-black font-bold text-xs py-2 rounded-xl hover:bg-gray-200 transition-colors">
            Share Now
          </button>
        </div>
      </div>
    </aside>
  );
}
