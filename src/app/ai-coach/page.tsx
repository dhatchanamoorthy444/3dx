'use client';

import React, { useState } from 'react';
import { useCalisthenics } from '../../context/CalisthenicsContext';
import { Bot, Send, User } from 'lucide-react';

interface ChatMessage {
  sender: 'user' | 'ai';
  text: string;
}

export default function AICoachPage() {
  const { profile } = useCalisthenics();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      sender: 'ai',
      text: `Hello Athlete! I'm your AI Calisthenics & Nutrition Assistant. 
Currently configured for your Level ${profile.levels.overall} profile, ${profile.assessment.trainingLocation.toUpperCase()} training environment, and ${profile.assessment.dietPreference.toUpperCase()} diet. 
Ask me about exercise regressions, wrist prep, meal substitutions, or protein alternatives!`
    }
  ]);
  const [input, setInput] = useState('');

  const quickPrompts = [
    'I don\'t have paneer today. What can I eat instead?',
    'How do I overcome a pull-up plateau?',
    'High protein vegetarian meal options?',
    'My wrists hurt during handstands',
    'What exercises build a muscle-up transition?'
  ];

  const handleSend = (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg: ChatMessage = { sender: 'user', text: query };
    setMessages(prev => [...prev, userMsg]);
    setInput('');

    setTimeout(() => {
      let reply = '';
      const q = query.toLowerCase();

      if (q.includes('paneer') || q.includes('substitute') || q.includes('replace')) {
        reply = `Great nutrition question! Depending on your ${profile.assessment.dietPreference} preference, here are excellent substitutions:
1. Tofu (Firm or Soya Chunks): High protein, low fat.
2. Greek Yogurt / Curd (Dahi): Great for breakfast or snacks.
3. 3 Whole Eggs or Egg Whites (If eggetarian/non-veg).
4. Boiled Chickpeas (Chana) or Sprouted Moong Dal.`;
      } else if (q.includes('vegetarian') || q.includes('protein')) {
        reply = `Top Indian vegetarian protein sources for calisthenics recovery:
• Paneer & Tofu (18-22g protein per 100g)
• Roasted Chana & Peanut Chat (15g protein)
• Dal Makhani / Rajma with Quinoa or Brown Rice (18g protein)
• Soya Chunks Curry (52g protein per 100g dry weight!)`;
      } else if (q.includes('wrist') || q.includes('pain') || q.includes('hurt')) {
        reply = `Wrist preparation is essential for handstands and planche work! 
1. Perform 15 dynamic wrist rocks on knees (palms down, fingers forward & sideways).
2. Perform wrist turns (back of hands flat on floor).
3. If joint pain persists beyond muscle soreness, stop the aggravating movement and consult a medical or physical therapy professional.`;
      } else if (q.includes('pull-up') || q.includes('plateau')) {
        reply = `To break a pull-up plateau at Level ${profile.levels.pull}:
1. Incorporate 3-5 second slow eccentric negative pull-ups.
2. Focus on scapular pulls at the start of every rep.
3. Utilize resistance bands to increase volume while keeping form clean.`;
      } else if (q.includes('muscle-up') || q.includes('transition')) {
        reply = `The Muscle-Up requires explosive pulling height and rapid wrist transition:
1. Master Chest-to-Bar pull-ups (aim for 8 clean reps).
2. Build deep parallel bar dip strength (12+ reps).
3. Practice explosive high pull-ups aiming lower chest to the bar!`;
      } else {
        reply = `For optimal progress in calisthenics & nutrition: prioritize clean form over momentum, respect joint adaptation timelines, ensure adequate protein intake (1.6-2.0g per kg of bodyweight), and allow 48 hours rest between heavy pushing or pulling blocks.`;
      }

      setMessages(prev => [...prev, { sender: 'ai', text: reply }]);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold">AI Workout & Food Assistant</h1>
              <p className="text-xs text-slate-400">Custom recommendations for exercises, form, & meal substitutions</p>
            </div>
          </div>
          <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
            Online • Level {profile.levels.overall} Context
          </span>
        </div>

        {/* Quick Prompts */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {quickPrompts.map((qp, i) => (
            <button
              key={i}
              onClick={() => handleSend(qp)}
              className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-300 hover:border-amber-500/50 hover:text-amber-400 whitespace-nowrap transition-colors"
            >
              💬 {qp}
            </button>
          ))}
        </div>

        {/* Chat Window */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 h-[450px] flex flex-col justify-between shadow-xl">
          <div className="overflow-y-auto space-y-4 pr-2">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex gap-3 text-sm ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.sender === 'ai' && (
                  <div className="w-8 h-8 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center font-bold text-xs shrink-0">
                    AI
                  </div>
                )}
                <div className={`p-4 rounded-2xl max-w-lg leading-relaxed whitespace-pre-line text-xs sm:text-sm ${
                  m.sender === 'user'
                    ? 'bg-amber-500 text-slate-950 font-semibold rounded-tr-none'
                    : 'bg-slate-950 border border-slate-800 text-slate-200 rounded-tl-none'
                }`}>
                  {m.text}
                </div>
                {m.sender === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-slate-800 text-slate-300 flex items-center justify-center font-bold text-xs shrink-0">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Input Box */}
          <div className="flex items-center gap-2 pt-4 border-t border-slate-800">
            <input
              type="text"
              placeholder="Ask about workouts, form cues, or food substitutions..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
              className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-200 focus:border-amber-500 focus:outline-none"
            />
            <button
              onClick={() => handleSend()}
              className="p-3 rounded-xl bg-amber-500 text-slate-950 font-bold hover:bg-amber-400 transition-colors shadow-lg shadow-amber-500/20"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
