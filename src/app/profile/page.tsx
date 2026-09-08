'use client';

import React, { useState } from 'react';
import { useCalisthenics } from '../../context/CalisthenicsContext';
import { Camera, Lock, Eye, Flame, Award } from 'lucide-react';

export default function ProfilePage() {
  const { profile } = useCalisthenics();
  const [privatePhotos, setPrivatePhotos] = useState(true);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-8 px-4 sm:px-6 lg:px-8 space-y-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Profile Banner Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl relative overflow-hidden">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-amber-500 to-orange-600 p-1 flex items-center justify-center shadow-xl">
                <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center text-3xl font-black text-amber-400">
                  {profile.name.charAt(0)}
                </div>
              </div>
              <button className="absolute bottom-0 right-0 p-2 rounded-full bg-amber-500 text-slate-950 shadow-md">
                <Camera className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 text-center sm:text-left space-y-1">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <h1 className="text-2xl sm:text-3xl font-black text-white">{profile.name}</h1>
                <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase">
                  @{profile.username}
                </span>
                {profile.role === 'admin' && (
                  <span className="px-2.5 py-0.5 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-bold uppercase">
                    Admin
                  </span>
                )}
              </div>

              <p className="text-xs text-slate-400">
                Level {profile.levels.overall} Athlete • Location: <span className="capitalize text-slate-200">{profile.assessment.trainingLocation}</span> • Goal: <span className="capitalize text-slate-200">{profile.assessment.primaryGoal.replace('_', ' ')}</span>
              </p>
            </div>

            <div className="flex sm:flex-col items-center gap-2">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-bold">
                <Flame className="w-4 h-4 text-orange-500 fill-orange-500/30" />
                <span>{profile.streak} Days</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-bold">
                <Award className="w-4 h-4 text-indigo-400" />
                <span>{profile.xp} XP</span>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Photos & Privacy Settings */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-black text-white flex items-center gap-2">
              <Camera className="w-5 h-5 text-amber-400" /> Private Transformation Timeline
            </h2>

            <button
              onClick={() => setPrivatePhotos(!privatePhotos)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-bold text-slate-300"
            >
              {privatePhotos ? <Lock className="w-3.5 h-3.5 text-amber-400" /> : <Eye className="w-3.5 h-3.5 text-emerald-400" />}
              <span>{privatePhotos ? 'Private (Only You)' : 'Public to Friends'}</span>
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {['Week 1', 'Week 4', 'Week 8', 'Week 12'].map((w, idx) => (
              <div key={idx} className="bg-slate-950 border border-slate-800 rounded-2xl p-4 text-center space-y-2">
                <div className="w-full h-28 rounded-xl bg-slate-900 border border-dashed border-slate-800 flex items-center justify-center text-slate-600">
                  <Camera className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold text-slate-400 block">{w}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
