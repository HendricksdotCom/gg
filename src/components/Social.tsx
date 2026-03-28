import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Heart, MessageSquare, Share2, Users, Twitter, MessageCircle, Trophy, Swords, Gamepad2, Image as ImageIcon, Smile, FileVideo } from 'lucide-react';

const iconMap: any = {
  Trophy,
  Swords,
  Gamepad2,
  MessageSquare
};

export function Social() {
  const [feedItems, setFeedItems] = useState<any[]>([]);
  const [activeParties, setActiveParties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [postContent, setPostContent] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [feedRes, partiesRes] = await Promise.all([
        fetch('/api/social/feed'),
        fetch('/api/social/parties')
      ]);
      const feedData = await feedRes.json();
      const partiesData = await partiesRes.json();
      setFeedItems(feedData);
      setActiveParties(partiesData);
    } catch (error) {
      console.error('Error fetching social data:', error);
    } finally {
      setLoading(false);
    }
  };

  const joinParty = async (partyId: number) => {
    try {
      await fetch('/api/social/parties/join', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ partyId })
      });
      alert('Joined party successfully!');
    } catch (error) {
      console.error('Error joining party:', error);
    }
  };

  const handleCreatePost = async () => {
    if (!postContent.trim()) return;

    try {
      const res = await fetch('/api/social/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: postContent })
      });
      
      if (res.ok) {
        setPostContent('');
        fetchData(); // Refresh feed
      }
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#8A2BE2]"></div>
      </div>
    );
  }

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
          <div className="bg-white/5 border border-white/10 rounded-3xl p-5 backdrop-blur-md">
            <div className="flex gap-4 items-start mb-4">
              <img src="https://i.pravatar.cc/150?u=me" alt="Me" className="w-12 h-12 rounded-full border border-[#8A2BE2]" />
              <textarea 
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
                placeholder="Share your thoughts, memes, or gaming moments..." 
                className="bg-transparent border-none outline-none flex-1 text-sm text-white placeholder:text-white/30 resize-none min-h-[80px] pt-2"
              />
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-white/10">
              <div className="flex gap-2">
                <button className="p-2 text-[#8A2BE2] hover:bg-[#8A2BE2]/20 rounded-full transition-colors" title="Add Image">
                  <ImageIcon className="w-5 h-5" />
                </button>
                <button className="p-2 text-[#FFD700] hover:bg-[#FFD700]/20 rounded-full transition-colors" title="Add GIF">
                  <FileVideo className="w-5 h-5" />
                </button>
                <button className="p-2 text-pink-500 hover:bg-pink-500/20 rounded-full transition-colors" title="Add Emoji">
                  <Smile className="w-5 h-5" />
                </button>
              </div>
              <button 
                onClick={handleCreatePost}
                disabled={!postContent.trim()}
                className="bg-[#8A2BE2] hover:bg-[#8A2BE2]/80 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-2 rounded-xl text-sm font-bold transition-colors shadow-[0_0_15px_rgba(138,43,226,0.3)]"
              >
                Post
              </button>
            </div>
          </div>

          {/* Feed Items */}
          <div className="space-y-4">
            {feedItems.map((item, i) => {
              const Icon = iconMap[item.icon] || Gamepad2;
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
                        </p>
                        <p className="text-xs text-white/40 mt-0.5">{item.time}</p>
                      </div>
                    </div>
                    <div className={`w-10 h-10 rounded-xl ${item.bgColor} flex items-center justify-center`}>
                      <Icon className={`w-5 h-5 ${item.color}`} />
                    </div>
                  </div>

                  {/* Post Content / Target */}
                  <div className="mt-2 text-sm text-white/90">
                    {item.type === 'post' ? (
                      <p className="whitespace-pre-wrap">{item.target}</p>
                    ) : (
                      <span className="font-semibold text-[#FFD700]">{item.target}</span>
                    )}
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
                  <button 
                    onClick={() => joinParty(party.id)}
                    className="w-full bg-white/10 hover:bg-white/20 text-white text-xs font-bold py-2 rounded-xl transition-colors"
                  >
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
