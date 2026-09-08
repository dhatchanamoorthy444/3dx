'use client';

import React, { useState } from 'react';
import { useCalisthenics } from '../../context/CalisthenicsContext';
import { Users, Flame, Award, Trophy, UserPlus, Shield, Swords, CheckCircle2 } from 'lucide-react';

export default function FriendsPage() {
  const { friends, challenges } = useCalisthenics();
  const [addFriendInput, setAddFriendInput] = useState('');
  const [friendList, setFriendList] = useState(friends);

  const handleAddFriend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!addFriendInput.trim()) return;
    const newFriend = {
      id: 'fr_' + Date.now(),
      username: addFriendInput.toLowerCase().replace(/\s+/g, '_'),
      name: addFriendInput,
      streak: 1,
      xp: 150
    };
    setFriendList(prev => [...prev, newFriend]);
    setAddFriendInput('');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-8 px-4 sm:px-6 lg:px-8 space-y-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
              <Users className="w-4 h-4" /> Social Consistency Network
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold">Friends & Consistency Challenges</h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Compete on workout consistency & streaks. Body weight and sensitive nutrition logs stay 100% private.
            </p>
          </div>

          <form onSubmit={handleAddFriend} className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Friend's username..."
              value={addFriendInput}
              onChange={e => setAddFriendInput(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-xs font-medium text-slate-200 focus:border-amber-500 focus:outline-none"
            />
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-400 flex items-center gap-1"
            >
              <UserPlus className="w-4 h-4" /> Add
            </button>
          </form>
        </div>

        {/* Consistency Challenges Section */}
        <div className="space-y-4">
          <h2 className="text-xl font-black text-white flex items-center gap-2">
            <Swords className="w-5 h-5 text-amber-400" /> Active Consistency Challenges
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {challenges.map(ch => (
              <div key={ch.id} className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-4 shadow-xl">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold uppercase text-amber-400 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20">
                    {ch.title}
                  </span>
                  <span className="text-xs font-mono font-bold text-slate-400">
                    ⏱️ {ch.daysDuration} Days Left
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-bold">
                    <span>You ({ch.myProgress} Days Active)</span>
                    <span>{ch.friendName} ({ch.friendProgress} Days Active)</span>
                  </div>
                  <div className="w-full bg-slate-950 rounded-full h-3 overflow-hidden border border-slate-800 flex">
                    <div className="bg-amber-500 h-full transition-all" style={{ width: `${(ch.myProgress / (ch.myProgress + ch.friendProgress)) * 100}%` }} />
                    <div className="bg-indigo-500 h-full transition-all" style={{ width: `${(ch.friendProgress / (ch.myProgress + ch.friendProgress)) * 100}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Friends Leaderboard Grid */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
          <h2 className="text-xl font-black text-white flex items-center gap-2">
            <Flame className="w-5 h-5 text-orange-500" /> Streak & Consistency Leaderboard
          </h2>

          <div className="space-y-3">
            {friendList.map((fr, idx) => (
              <div key={fr.id} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 font-extrabold text-amber-400 text-xs flex items-center justify-center">
                    #{idx + 1}
                  </span>
                  <div>
                    <h3 className="font-extrabold text-white text-sm">{fr.name}</h3>
                    <div className="text-xs text-slate-400">@{fr.username}</div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1 text-orange-400 font-extrabold text-xs">
                    <Flame className="w-4 h-4 fill-orange-500/30" />
                    <span>{fr.streak} Days</span>
                  </div>
                  <div className="flex items-center gap-1 text-indigo-300 font-extrabold text-xs">
                    <Award className="w-4 h-4 text-indigo-400" />
                    <span>{fr.xp} XP</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
