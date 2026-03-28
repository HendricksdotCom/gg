import { Router } from 'express';

const router = Router();

// Mock data for library aggregation
const mockLibrary = [
  { id: 1, title: 'Cyberpunk 2077', platform: 'Steam', playtime: '124h', image: 'https://images.unsplash.com/photo-1605901309584-818e25960b8f?auto=format&fit=crop&q=80&w=400&h=400', type: 'Single' },
  { id: 2, title: 'Helldivers 2', platform: 'PS5', playtime: '45h', image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=400&h=400', type: 'Co-op' },
  { id: 3, title: 'Valorant', platform: 'Epic', playtime: '312h', image: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&q=80&w=400&h=400', type: 'Multi' },
  { id: 4, title: 'Baldur\'s Gate 3', platform: 'GOG', playtime: '89h', image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=400&h=400', type: 'Co-op' },
  { id: 5, title: 'Elden Ring', platform: 'Steam', playtime: '210h', image: 'https://images.unsplash.com/photo-1605901302633-8b1b115998a1?auto=format&fit=crop&q=80&w=400&h=400', type: 'Single' },
  { id: 6, title: 'Apex Legends', platform: 'EA', playtime: '540h', image: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?auto=format&fit=crop&q=80&w=400&h=400', type: 'Multi' },
];

router.get('/library', (req, res) => {
  // In a real app, this would aggregate from all connected stores
  res.json(mockLibrary);
});

// --- GAME STORE APIs ---

// Steam API Integration
router.get('/steam', async (req, res) => {
  try {
    const apiKey = process.env.STEAM_API_KEY;
    if (!apiKey) return res.json({ status: 'mock', data: mockLibrary.filter(g => g.platform === 'Steam') });
    // Example real call: fetch(`http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${apiKey}&steamid=${req.query.steamId}&format=json`)
    res.json({ status: 'success', data: mockLibrary.filter(g => g.platform === 'Steam') });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch Steam data' });
  }
});

// Epic Games API Integration
router.get('/epic', async (req, res) => {
  try {
    const apiKey = process.env.EPIC_GAMES_API_KEY;
    if (!apiKey) return res.json({ status: 'mock', data: mockLibrary.filter(g => g.platform === 'Epic') });
    res.json({ status: 'success', data: mockLibrary.filter(g => g.platform === 'Epic') });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch Epic Games data' });
  }
});

// GOG API Integration
router.get('/gog', async (req, res) => {
  try {
    const apiKey = process.env.GOG_API_KEY;
    if (!apiKey) return res.json({ status: 'mock', data: mockLibrary.filter(g => g.platform === 'GOG') });
    res.json({ status: 'success', data: mockLibrary.filter(g => g.platform === 'GOG') });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch GOG data' });
  }
});

// Xbox API Integration
router.get('/xbox', async (req, res) => {
  try {
    const apiKey = process.env.XBOX_API_KEY;
    if (!apiKey) return res.json({ status: 'mock', data: mockLibrary.filter(g => g.platform === 'Xbox') });
    res.json({ status: 'success', data: mockLibrary.filter(g => g.platform === 'Xbox') });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch Xbox data' });
  }
});

// PlayStation API Integration
router.get('/playstation', async (req, res) => {
  try {
    const apiKey = process.env.PLAYSTATION_API_KEY;
    if (!apiKey) return res.json({ status: 'mock', data: mockLibrary.filter(g => g.platform === 'PS5') });
    res.json({ status: 'success', data: mockLibrary.filter(g => g.platform === 'PS5') });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch PlayStation data' });
  }
});

router.get('/stats', (req, res) => {
  res.json({
    weeklyPlaytime: '24.5 hrs',
    skillRating: 'Diamond II',
    achievementsUnlocked: 154,
    totalGames: 42
  });
});

export default router;
