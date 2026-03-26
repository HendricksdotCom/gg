/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { FriendsPanel } from './components/FriendsPanel';
import { Platforms } from './components/Platforms';
import { Challenges } from './components/Challenges';
import { Social } from './components/Social';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="flex h-screen bg-[#0a0a0c] text-white font-sans overflow-hidden selection:bg-purple-500/30">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-1 overflow-y-auto relative">
        {/* Ambient background glow */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#8A2BE2]/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#FFD700]/5 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="p-8 max-w-7xl mx-auto relative z-10">
          {activeTab === 'dashboard' && <Dashboard />}
          {activeTab === 'social' && <Social />}
          {activeTab === 'platforms' && <Platforms />}
          {activeTab === 'challenges' && <Challenges />}
          {activeTab === 'achievements' && (
            <div className="flex items-center justify-center h-64 text-white/50">
              Achievements coming soon...
            </div>
          )}
          {activeTab === 'settings' && (
            <div className="flex items-center justify-center h-64 text-white/50">
              Settings coming soon...
            </div>
          )}
        </div>
      </main>
      <FriendsPanel />
    </div>
  );
}
