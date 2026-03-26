import { motion } from 'motion/react';
import { Home, Gamepad2, Swords, Trophy, Settings, LogOut, Users } from 'lucide-react';

const navItems = [
  { id: 'dashboard', icon: Home, label: 'Home' },
  { id: 'social', icon: Users, label: 'Social Feed' },
  { id: 'platforms', icon: Gamepad2, label: 'Platforms' },
  { id: 'challenges', icon: Swords, label: 'AI Challenges' },
  { id: 'achievements', icon: Trophy, label: 'Achievements' },
  { id: 'settings', icon: Settings, label: 'Settings' },
];

export function Sidebar({ activeTab, setActiveTab }: { activeTab: string, setActiveTab: (id: string) => void }) {
  return (
    <aside className="w-20 lg:w-64 border-r border-white/5 bg-black/20 backdrop-blur-xl flex flex-col justify-between py-8 z-20">
      <div>
        <div className="flex items-center justify-center lg:justify-start lg:px-8 mb-12">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#8A2BE2] to-[#FFD700] flex items-center justify-center shadow-[0_0_20px_rgba(138,43,226,0.4)]">
            <Swords className="w-6 h-6 text-white" />
          </div>
          <span className="hidden lg:block ml-3 font-bold text-xl tracking-tight">NEXUS</span>
        </div>

        <nav className="flex flex-col gap-2 px-4">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`relative flex items-center p-3 rounded-2xl transition-all duration-300 group ${
                  isActive ? 'text-white' : 'text-white/40 hover:text-white hover:bg-white/5'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-gradient-to-r from-[#8A2BE2]/20 to-transparent rounded-2xl border-l-2 border-[#8A2BE2]"
                    initial={false}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
                <Icon className={`w-6 h-6 relative z-10 ${isActive ? 'text-[#FFD700]' : 'group-hover:text-[#FFD700]/70 transition-colors'}`} />
                <span className="hidden lg:block ml-4 font-medium relative z-10">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      <div className="px-4">
        <button className="flex items-center p-3 rounded-2xl text-white/40 hover:text-white hover:bg-white/5 transition-all duration-300 w-full group">
          <LogOut className="w-6 h-6 group-hover:text-red-400 transition-colors" />
          <span className="hidden lg:block ml-4 font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
}
