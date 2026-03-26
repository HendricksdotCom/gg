import { motion } from 'motion/react';
import { CheckCircle2, Plus } from 'lucide-react';

const platforms = [
  { id: 'steam', name: 'Steam', connected: true, color: 'bg-[#171a21]', icon: 'https://upload.wikimedia.org/wikipedia/commons/8/83/Steam_icon_logo.svg' },
  { id: 'epic', name: 'Epic Games', connected: true, color: 'bg-[#313131]', icon: 'https://upload.wikimedia.org/wikipedia/commons/3/31/Epic_Games_logo.svg' },
  { id: 'xbox', name: 'Xbox Live', connected: false, color: 'bg-[#107C10]', icon: 'https://upload.wikimedia.org/wikipedia/commons/f/f9/Xbox_one_logo.svg' },
  { id: 'psn', name: 'PlayStation', connected: false, color: 'bg-[#003791]', icon: 'https://upload.wikimedia.org/wikipedia/commons/0/00/PlayStation_logo.svg' },
  { id: 'gog', name: 'GOG.com', connected: true, color: 'bg-[#5c2f80]', icon: 'https://upload.wikimedia.org/wikipedia/commons/2/2e/GOG.com_logo.svg' },
  { id: 'ea', name: 'EA App', connected: false, color: 'bg-[#FF4747]', icon: 'https://upload.wikimedia.org/wikipedia/commons/0/0d/Electronic-Arts-Logo.svg' },
];

export function Platforms() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold mb-2">Connected Platforms</h1>
        <p className="text-white/50">Manage your gaming accounts to sync libraries and stats.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {platforms.map((platform, i) => (
          <motion.div
            key={platform.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className={`p-6 rounded-3xl border ${platform.connected ? 'border-white/10 bg-white/5' : 'border-dashed border-white/20 bg-transparent'} flex flex-col items-center text-center relative overflow-hidden group`}
          >
            {platform.connected && (
              <div className="absolute top-4 right-4 text-green-400">
                <CheckCircle2 className="w-5 h-5" />
              </div>
            )}
            
            <div className={`w-16 h-16 rounded-2xl ${platform.color} flex items-center justify-center mb-4 p-3 shadow-lg`}>
              <img src={platform.icon} alt={platform.name} className="w-full h-full object-contain filter brightness-0 invert" />
            </div>
            
            <h3 className="font-bold text-lg mb-1">{platform.name}</h3>
            <p className="text-xs text-white/50 mb-6">
              {platform.connected ? 'Synced 2 hours ago' : 'Not connected'}
            </p>
            
            <button className={`w-full py-2.5 rounded-xl text-sm font-semibold transition-all ${
              platform.connected 
                ? 'bg-white/10 hover:bg-white/20 text-white' 
                : 'bg-[#8A2BE2] hover:bg-[#8A2BE2]/80 text-white shadow-[0_0_15px_rgba(138,43,226,0.4)]'
            }`}>
              {platform.connected ? 'Manage' : 'Connect Account'}
            </button>
          </motion.div>
        ))}
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: platforms.length * 0.05 }}
          className="p-6 rounded-3xl border border-dashed border-white/10 bg-white/5 hover:bg-white/10 transition-colors flex flex-col items-center justify-center text-center cursor-pointer min-h-[220px]"
        >
          <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-4">
            <Plus className="w-6 h-6 text-white/50" />
          </div>
          <h3 className="font-bold text-white/70">Add Custom Platform</h3>
        </motion.div>
      </div>
    </div>
  );
}
