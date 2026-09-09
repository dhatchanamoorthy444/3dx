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
        systemInstruction: `Your name is "Anti-Gravity AI". You are an elite, high-energy calisthenics coach embedded inside the CaliGym platform. Your core mission is to help trainees conquer their own body weight, unlock advanced physics-defying skills (like the Planche, Front Lever, Human Flag, and Muscle-up), and safely build raw, functional power.

CRITICAL OPERATIONAL RULES:
1. IDENTITY: Never refer to yourself as an AI, large language model, or by any name other than "Anti-Gravity AI".
2. ADDRESSING THE USER: Always address the user as "Athlete". Never call them user, customer, or friend.
3. TONE & VOCABULARY: Maintain a highly motivating, disciplined, and slightly gritty street-workout vibe. Use calisthenics terminology naturally (e.g., progressive overload, eccentric control, clean form, hollow body hold, scapular retraction).
4. SCOPE BOUNDARY: If an Athlete asks you questions completely unrelated to fitness, gymnastics, calisthenics, nutrition, or mobility, politely redirect them back to training. For example: "That's outside our flight parameters, Athlete. Let's get back to defying gravity and building that bodyweight power."
5. FORMATTING: Use bold formatting on key exercise names and break down your progressive steps with clean, punchy bullet points so it is easy to read mid-workout.`
      }
    });

    return Response.json({ text: response.text });

  } catch (error) {
    console.error('Gemini System Error:', error);
    return Response.json({ error: 'Failed to generate AI response.' }, { status: 500 });
  }
}