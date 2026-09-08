'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCalisthenics, calculateLevelsFromAssessment } from '../../context/CalisthenicsContext';
import { UserAssessment, Equipment, DietPreference, FoodCuisine } from '../../types/calisthenics';
import { LEVEL_DEFINITIONS } from '../../data/exercises';
import { CheckCircle2, ChevronRight, ChevronLeft, Sparkles, Flame, Award, Home, Building2, Utensils } from 'lucide-react';

export default function AssessmentPage() {
  const router = useRouter();
  const { profile, updateAssessment } = useCalisthenics();
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState<UserAssessment>({
    completed: profile.assessment.completed || false,
    age: profile.assessment.age || 24,
    weightKg: profile.assessment.weightKg || 72,
    heightCm: profile.assessment.heightCm || 178,
    experienceYears: profile.assessment.experienceYears || 0,
    availableDays: profile.assessment.availableDays || 4,
    sessionDurationMins: profile.assessment.sessionDurationMins || 45,
    trainingLocation: profile.assessment.trainingLocation || 'home',
    equipment: profile.assessment.equipment.length ? profile.assessment.equipment : ['none', 'pull_up_bar'],
    primaryGoal: profile.assessment.primaryGoal || 'master_skills',
    dietPreference: profile.assessment.dietPreference || 'vegetarian',
    cuisine: profile.assessment.cuisine || 'indian',
    mealsPerDay: profile.assessment.mealsPerDay || 4,
    budget: profile.assessment.budget || 'medium',
    maxPushups: profile.assessment.maxPushups || 12,
    maxPullups: profile.assessment.maxPullups || 4,
    maxDips: profile.assessment.maxDips || 5,
    maxPlankSec: profile.assessment.maxPlankSec || 45,
    maxDeadHangSec: profile.assessment.maxDeadHangSec || 35,
    handstandSec: profile.assessment.handstandSec || 5
  });

  const equipmentOptions: { id: Equipment; label: string; icon: string }[] = [
    { id: 'none', label: 'No Equipment (Bodyweight)', icon: '🧘' },
    { id: 'pull_up_bar', label: 'Pull-Up Bar', icon: '🏋️' },
    { id: 'parallel_bars', label: 'Parallel / Dip Bars', icon: '🪜' },
    { id: 'gymnastic_rings', label: 'Gymnastic Rings', icon: '⭕' },
    { id: 'resistance_bands', label: 'Resistance Bands', icon: '🎗️' },
    { id: 'dumbbells', label: 'Dumbbells / Weights', icon: '🏋️♂️' },
    { id: 'barbell', label: 'Barbell & Plates (Gym)', icon: '🏋️♀️' },
    { id: 'lat_pulldown', label: 'Lat Pulldown Machine (Gym)', icon: '⚙️' }
  ];

  const handleEquipmentToggle = (eq: Equipment) => {
    setFormData(prev => {
      const exists = prev.equipment.includes(eq);
      if (exists) {
        if (prev.equipment.length === 1) return prev;
        return { ...prev, equipment: prev.equipment.filter(item => item !== eq) };
      } else {
        return { ...prev, equipment: [...prev.equipment, eq] };
      }
    });
  };

  const calculatedLevels = calculateLevelsFromAssessment(formData);
  const overallTier = LEVEL_DEFINITIONS.find(l => l.level === calculatedLevels.overall) || LEVEL_DEFINITIONS[0];

  const handleFinish = () => {
    updateAssessment(formData);
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-4 h-4" /> Comprehensive Onboarding Diagnostic
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Fitness & Nutrition Setup</h1>
          <p className="text-slate-400 mt-2 text-sm sm:text-base">
            Configure your environment, strength benchmarks, and dietary preferences.
          </p>
        </div>

        {/* Stepper Progress */}
        <div className="flex items-center justify-between mb-8 bg-slate-900/60 p-3 rounded-xl border border-slate-800">
          {[1, 2, 3].map(s => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${
                step === s 
                  ? 'bg-amber-500 text-slate-950 font-extrabold shadow-lg shadow-amber-500/30' 
                  : step > s 
                  ? 'bg-emerald-500 text-slate-950' 
                  : 'bg-slate-800 text-slate-400'
              }`}>
                {step > s ? <CheckCircle2 className="w-5 h-5" /> : s}
              </div>
              <span className={`text-xs font-semibold hidden sm:inline ${step === s ? 'text-white' : 'text-slate-500'}`}>
                {s === 1 ? 'Environment & Diet' : s === 2 ? 'Strength Baseline' : 'Roadmap Result'}
              </span>
            </div>
          ))}
        </div>

        {/* STEP 1: Training Location & Diet Preferences */}
        {step === 1 && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
            <h2 className="text-xl font-bold flex items-center gap-2 text-amber-400">
              <Home className="w-5 h-5" /> Step 1: Location & Nutrition Setup
            </h2>

            {/* Training Location Selection */}
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-2">Training Environment</label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, trainingLocation: 'home' })}
                  className={`p-4 rounded-2xl border flex flex-col items-center gap-2 transition-all ${
                    formData.trainingLocation === 'home'
                      ? 'bg-amber-500/15 border-amber-500 text-amber-300 shadow-md shadow-amber-500/10'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <Home className="w-8 h-8 text-amber-400" />
                  <span className="font-extrabold text-sm">🏠 Home Training</span>
                  <span className="text-[10px] text-slate-400 text-center">Bodyweight & Pull-up bar setup</span>
                </button>

                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, trainingLocation: 'gym' })}
                  className={`p-4 rounded-2xl border flex flex-col items-center gap-2 transition-all ${
                    formData.trainingLocation === 'gym'
                      ? 'bg-amber-500/15 border-amber-500 text-amber-300 shadow-md shadow-amber-500/10'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <Building2 className="w-8 h-8 text-amber-400" />
                  <span className="font-extrabold text-sm">🏋️ Commercial Gym</span>
                  <span className="text-[10px] text-slate-400 text-center">Calisthenics + Machines & Barbells</span>
                </button>
              </div>
            </div>

            {/* Available Equipment Checklist */}
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-2">Available Equipment</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {equipmentOptions.map(eq => {
                  const selected = formData.equipment.includes(eq.id);
                  return (
                    <button
                      key={eq.id}
                      type="button"
                      onClick={() => handleEquipmentToggle(eq.id)}
                      className={`flex items-center justify-between px-4 py-3 rounded-xl border text-sm font-medium transition-all ${
                        selected
                          ? 'bg-amber-500/10 border-amber-500/50 text-amber-300'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{eq.icon}</span>
                        <span>{eq.label}</span>
                      </div>
                      {selected && <CheckCircle2 className="w-5 h-5 text-amber-400" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Diet Preferences Section */}
            <div className="pt-2 border-t border-slate-800 space-y-4">
              <h3 className="text-sm font-extrabold text-slate-200 flex items-center gap-2">
                <Utensils className="w-4 h-4 text-amber-400" /> Diet & Food Preferences
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Dietary Preference</label>
                  <select
                    value={formData.dietPreference}
                    onChange={(e) => setFormData({ ...formData, dietPreference: e.target.value as DietPreference })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:border-amber-500 focus:outline-none"
                  >
                    <option value="vegetarian">Vegetarian</option>
                    <option value="non_vegetarian">Non-Vegetarian</option>
                    <option value="vegan">Vegan</option>
                    <option value="eggetarian">Eggetarian</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Cuisine Preference</label>
                  <select
                    value={formData.cuisine}
                    onChange={(e) => setFormData({ ...formData, cuisine: e.target.value as FoodCuisine })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:border-amber-500 focus:outline-none"
                  >
                    <option value="indian">Indian (General)</option>
                    <option value="south_indian">South Indian</option>
                    <option value="north_indian">North Indian</option>
                    <option value="mixed">Mixed / Global</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-500 text-slate-950 font-bold hover:bg-amber-400 transition-colors shadow-lg shadow-amber-500/20"
              >
                <span>Continue to Strength Diagnostic</span>
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Diagnostic Max Reps */}
        {step === 2 && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
            <h2 className="text-xl font-bold flex items-center gap-2 text-amber-400">
              <Flame className="w-5 h-5" /> Step 2: Strength Baseline Diagnostic
            </h2>

            <div className="space-y-4">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-sm text-slate-200">Max Push-ups (Unbroken)</h3>
                  <p className="text-xs text-slate-400">Standard chest-to-floor push-ups</p>
                </div>
                <input
                  type="number"
                  value={formData.maxPushups}
                  onChange={e => setFormData({ ...formData, maxPushups: Math.max(0, Number(e.target.value)) })}
                  className="w-20 bg-slate-900 border border-amber-500/30 rounded-lg px-3 py-2 text-center text-amber-400 font-extrabold text-lg"
                />
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-sm text-slate-200">Max Pull-ups (Unbroken)</h3>
                  <p className="text-xs text-slate-400">Full chin-over-bar pull-ups</p>
                </div>
                <input
                  type="number"
                  value={formData.maxPullups}
                  onChange={e => setFormData({ ...formData, maxPullups: Math.max(0, Number(e.target.value)) })}
                  className="w-20 bg-slate-900 border border-amber-500/30 rounded-lg px-3 py-2 text-center text-amber-400 font-extrabold text-lg"
                />
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-sm text-slate-200">Max Forearm Plank Hold</h3>
                  <p className="text-xs text-slate-400">Pelvic tilt core hold (seconds)</p>
                </div>
                <input
                  type="number"
                  value={formData.maxPlankSec}
                  onChange={e => setFormData({ ...formData, maxPlankSec: Math.max(0, Number(e.target.value)) })}
                  className="w-20 bg-slate-900 border border-amber-500/30 rounded-lg px-3 py-2 text-center text-amber-400 font-extrabold text-lg"
                />
              </div>
            </div>

            <div className="flex justify-between pt-4">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-800 text-slate-300 hover:bg-slate-950 font-semibold"
              >
                <ChevronLeft className="w-5 h-5" /> Back
              </button>
              <button
                type="button"
                onClick={() => setStep(3)}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-500 text-slate-950 font-bold hover:bg-amber-400 transition-colors shadow-lg shadow-amber-500/20"
              >
                <span>Calculate Level</span>
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Results & Setup Completion */}
        {step === 3 && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="text-center space-y-2">
              <div className="inline-flex items-center justify-center p-3 rounded-full bg-emerald-500/20 text-emerald-400 mb-1">
                <Award className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-black text-white">Setup Ready!</h2>
              <p className="text-sm text-slate-400">
                Your personalized training & diet engine is generated.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-r from-amber-500/10 via-slate-900 to-amber-500/5 border border-amber-500/30 text-center space-y-2">
              <div className="text-xs uppercase tracking-widest text-amber-400 font-bold">Assigned Rank</div>
              <div className="text-3xl font-extrabold text-white">
                Level {calculatedLevels.overall}: <span className="text-amber-400">{overallTier.title}</span>
              </div>
            </div>

            <div className="flex justify-between pt-4">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-800 text-slate-300 hover:bg-slate-950 font-semibold"
              >
                <ChevronLeft className="w-5 h-5" /> Back
              </button>
              <button
                type="button"
                onClick={handleFinish}
                className="flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black text-base hover:opacity-90 transition-opacity shadow-lg shadow-amber-500/25"
              >
                <span>Save & Launch Dashboard</span>
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}




