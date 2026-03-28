import { Router } from 'express';
import { GoogleGenAI } from "@google/genai";

const router = Router();

// Initialize Gemini
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

// Mock challenges for fallback
const mockChallenges = [
  { id: 1, type: '1v1 Duel', title: 'Mirror Match', game: 'Valorant', difficulty: 'Hard', icon: 'Swords', color: 'from-red-500/20 to-orange-500/20', border: 'border-orange-500/30', text: 'text-orange-400' },
  { id: 2, type: '2v2 Team', title: 'Tactical Breach', game: 'Rainbow Six', difficulty: 'Medium', icon: 'Users', color: 'from-blue-500/20 to-cyan-500/20', border: 'border-cyan-500/30', text: 'text-cyan-400' },
  { id: 3, type: 'Speed Run', title: 'Any% Glitchless', game: 'Elden Ring', difficulty: 'Extreme', icon: 'Timer', color: 'from-[#8A2BE2]/20 to-purple-500/20', border: 'border-[#8A2BE2]/30', text: 'text-[#8A2BE2]' },
  { id: 4, type: 'AI Quest', title: 'Perfect Accuracy', game: 'Apex Legends', difficulty: 'Easy', icon: 'Target', color: 'from-[#FFD700]/20 to-yellow-500/20', border: 'border-[#FFD700]/30', text: 'text-[#FFD700]' },
];

router.get('/active', (req, res) => {
  res.json(mockChallenges);
});

router.post('/generate', async (req, res) => {
  try {
    const { skill, games } = req.body;
    
    // Use Gemini to generate a unique challenge
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Generate a unique gaming challenge for a player with ${skill} skill level who plays ${games.join(', ')}. 
      Return the challenge as a JSON object with fields: type, title, game, difficulty, description.`,
      config: {
        responseMimeType: "application/json"
      }
    });

    const challenge = JSON.parse(response.text || '{}');
    res.json(challenge);
  } catch (error) {
    console.error('Gemini Challenge Generation Error:', error);
    res.status(500).json({ error: 'Failed to generate challenge' });
  }
});

export default router;
