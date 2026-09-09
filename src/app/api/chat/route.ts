import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({});

export const runtime = 'nodejs';
export const maxDuration = 30;

export async function POST(request: Request) {
  try {
    const { userPrompt } = await request.json();

    if (!userPrompt || typeof userPrompt !== 'string') {
      return Response.json({ error: 'Invalid prompt' }, { status: 400 });
    }

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        {
          role: 'user',
          parts: [{ text: userPrompt }]
        }
      ],
      config: {
        systemInstruction: `Your name is "Anti-Gravity AI". You are an elite, high-energy calisthenics coach embedded inside the CaliGym platform. Your core mission is to help trainees conquer their own body weight, unlock advanced skills (Planche, Front Lever, Muscle-ups), and safely build raw power. Always address the user as "Athlete". Maintain a highly motivating, disciplined street-workout vibe. Use bold text on key exercises. Redirect non-fitness queries back to bodyweight training.`
      }
    });

    return Response.json({ text: response.text });

  } catch (error) {
    console.error('Gemini System Error:', error);
    return Response.json({ error: 'Failed to generate AI response.' }, { status: 500 });
  }
}