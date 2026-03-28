import { Router } from 'express';

const router = Router();

// Mock data for social feed
let mockFeed = [
  {
    id: 1,
    user: { name: 'Alex_Pro', avatar: 'https://i.pravatar.cc/150?u=1' },
    action: 'unlocked an achievement',
    target: 'First Blood in Apex Legends',
    time: '2 hours ago',
    likes: 12,
    comments: 3,
    type: 'achievement',
    icon: 'Trophy',
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
    icon: 'Swords',
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
    icon: 'Gamepad2',
    color: 'text-green-400',
    bgColor: 'bg-green-400/20'
  }
];

const mockParties = [
  { id: 1, game: 'Helldivers 2', members: 3, max: 4, leader: 'Alex_Pro' },
  { id: 2, game: 'Valorant', members: 4, max: 5, leader: 'SarahSniper' },
];

const mockFriendsPlaying = [
  { id: 1, name: 'Alex_Pro', avatar: 'https://i.pravatar.cc/150?u=1', game: 'Helldivers 2', platform: 'PS5', status: 'In Mission' },
  { id: 2, name: 'SarahSniper', avatar: 'https://i.pravatar.cc/150?u=2', game: 'Valorant', platform: 'PC', status: 'Ranked - Match Point' },
  { id: 3, name: 'Ghost_Rider', avatar: 'https://i.pravatar.cc/150?u=3', game: 'Cyberpunk 2077', platform: 'PC', status: 'Exploring Night City' },
];

router.get('/feed', (req, res) => {
  res.json(mockFeed);
});

router.post('/posts', (req, res) => {
  const { content } = req.body;
  
  if (!content) {
    return res.status(400).json({ error: 'Content is required' });
  }

  const newPost = {
    id: Date.now(),
    user: { name: 'Player One', avatar: 'https://i.pravatar.cc/150?u=me' },
    action: 'shared a thought',
    target: content,
    time: 'Just now',
    likes: 0,
    comments: 0,
    type: 'post',
    icon: 'MessageSquare',
    color: 'text-blue-400',
    bgColor: 'bg-blue-400/20'
  };

  mockFeed = [newPost, ...mockFeed];
  res.status(201).json(newPost);
});

router.get('/parties', (req, res) => {
  res.json(mockParties);
});

router.post('/parties/join', (req, res) => {
  const { partyId } = req.body;
  res.json({ success: true, message: `Joined party ${partyId}` });
});

router.get('/friends/playing', (req, res) => {
  res.json(mockFriendsPlaying);
});

export default router;
