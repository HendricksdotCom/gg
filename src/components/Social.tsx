import { motion } from 'motion/react';
import { Heart, MessageSquare, Share2, Users, Twitter, MessageCircle, Trophy, Swords, Gamepad2 } from 'lucide-react';

const feedItems = [
  {
    id: 1,
    user: { name: 'Alex_Pro', avatar: 'https://i.pravatar.cc/150?u=1' },
    action: 'unlocked an achievement',
    target: 'First Blood in Apex Legends',
    time: '2 hours ago',
    likes: 12,
    comments: 3,
    type: 'achievement',
    icon: Trophy,
    color: 'text-[#FFD700]',
    bgColor: 'bg-[#FFD700]/20'
  },
  {
    id: 2,
    user: { name: 'SarahSniper', avatar: 'https://i.pravatar.cc/150?u=2' },
    action: 'completed an AI Challenge',
    target: 'Mirror Match (Hard)',
    time: '5 hours ago',
    likes: 24,
    comments: 5,
    type: 'challenge',
    icon: Swords,
    color: 'text-[#8A2BE2]',
    bgColor: 'bg-[#8A2BE2]/20'
  },
  {
    id: 3,
    user: { name: 'Ghost_Rider', avatar: 'https://i.pravatar.cc/150?u=3' },
    action: 'started playing',
    target: 'Cyberpunk 2077',
    time: '8 hours ago',
    likes: 8,
    comments: 1,
    type: 'game',
    icon: Gamepad2,
    color: 'text-green-400',
    bgColor: 'bg-green-400/20'
  }
];

const activeParties = [
  { id: 1, game: 'Helldivers 2', members: 3, max: 4, leader: 'Alex_Pro' },
  { id: 2, game: 'Valorant', members: 4, max: 5, leader: 'SarahSniper' },
];

export function Social() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold mb-2">Social Feed</h1>
        <p className="text-white/50">See what your friends are playing and share your victories.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Activity Feed */}
        <div className="lg:col-span-2 space-y-6">
          {/* Create Post */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-4 backdrop-blur-md flex gap-4 items-center">
            <img src="https://i.pravatar.cc/150?u=me" alt="Me" className="w-10 h-10 rounded-full border border-[#8A2BE2]" />
            <input 
              type="text" 
              placeholder="Share your latest gaming moment..." 
              className="bg-transparent border-none outline-none flex-1 text-sm text-white placeholder:text-white/30"
            />
            <button className="bg-[#8A2BE2] hover:bg-[#8A2BE2]/80 text-white px-6 py-2.5 rounded-xl text-sm font-bold transition-colors shadow-[0_0_15px_rgba(138,43,226,0.3)]">
              Post
            </button>
          </div>

          {/* Feed Items */}
          <div className="space-y-4">
            {feedItems.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div 
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-md"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <img src={item.user.avatar} alt={item.user.name} className="w-12 h-12 rounded-full border border-white/10" />
                      <div>
                        <p className="text-sm">
                          <span className="font-bold text-white">{item.user.name}</span>{' '}
                          <span className="text-white/60">{item.action}</span>{' '}
                          <span className="font-semibold text-[#FFD700]">{item.target}</span>
                        </p>
                        <p className="text-xs text-white/40 mt-0.5">{item.time}</p>
                      </div>
                    </div>
                    <div className={`w-10 h-10 rounded-xl ${item.bgColor} flex items-center justify-center`}>
                      <Icon className={`w-5 h-5 ${item.color}`} />
                    </div>
                  </div>

                  <div className="flex items-center gap-6 mt-6 pt-4 border-t border-white/5">
                    <button className="flex items-center gap-2 text-white/50 hover:text-pink-500 transition-colors text-sm group">
                      <Heart className="w-4 h-4 group-hover:fill-pink-500" /> {item.likes}
                    </button>
                    <button className="flex items-center gap-2 text-white/50 hover:text-blue-400 transition-colors text-sm group">
                      <MessageSquare className="w-4 h-4 group-hover:fill-blue-400" /> {item.comments}
                    </button>
                    <button className="flex items-center gap-2 text-white/50 hover:text-green-400 transition-colors text-sm ml-auto">
                      <Share2 className="w-4 h-4" /> Share
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Sidebar / Widgets */}
        <div className="space-y-6">
          {/* Active Parties */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-md">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Users className="w-5 h-5 text-[#FFD700]" /> Active Parties
            </h2>
            <div className="space-y-3">
              {activeParties.map(party => (
                <div key={party.id} className="bg-black/40 border border-white/5 rounded-2xl p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-sm">{party.game}</h3>
                    <span className="text-xs bg-white/10 px-2 py-1 rounded-md text-white/70">
                      {party.members}/{party.max}
                    </span>
                  </div>
                  <p className="text-xs text-white/50 mb-3">Leader: {party.leader}</p>
                  <button className="w-full bg-white/10 hover:bg-white/20 text-white text-xs font-bold py-2 rounded-xl transition-colors">
                    Join Party
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Link Socials */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-md">
            <h2 className="text-lg font-bold mb-4">Link Socials</h2>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-between bg-[#5865F2]/20 hover:bg-[#5865F2]/30 border border-[#5865F2]/50 p-3 rounded-2xl transition-colors group">
                <div className="flex items-center gap-3">
                  <MessageCircle className="w-5 h-5 text-[#5865F2]" />
                  <span className="font-semibold text-sm">Discord</span>
                </div>
                <span className="text-xs text-[#5865F2] group-hover:text-white transition-colors">Connect</span>
              </button>
              <button className="w-full flex items-center justify-between bg-[#1DA1F2]/20 hover:bg-[#1DA1F2]/30 border border-[#1DA1F2]/50 p-3 rounded-2xl transition-colors group">
                <div className="flex items-center gap-3">
                  <Twitter className="w-5 h-5 text-[#1DA1F2]" />
                  <span className="font-semibold text-sm">Twitter</span>
                </div>
                <span className="text-xs text-[#1DA1F2] group-hover:text-white transition-colors">Connect</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
