'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useCalisthenics } from '../../context/CalisthenicsContext';
import { FoodItem, DietPreference } from '../../types/calisthenics';
import { 
  Utensils, 
  Check, 
  Plus, 
  Search, 
  Flame, 
  Apple, 
  Bot, 
  Sparkles, 
  CheckCircle2, 
  ChevronRight,
  ShieldAlert
} from 'lucide-react';

export default function NutritionPage() {
  const { currentNutrition, toggleMealEaten, profile, foods } = useCalisthenics();
  const [activeTab, setActiveTab] = useState<'daily' | 'database'>('daily');
  const [searchFood, setSearchFood] = useState('');
  const [dietFilter, setDietFilter] = useState<DietPreference | 'all'>('all');

  const filteredFoods = foods.filter(f => {
    const matchesSearch = f.name.toLowerCase().includes(searchFood.toLowerCase());
    const matchesDiet = dietFilter === 'all' || f.dietType === dietFilter;
    return matchesSearch && matchesDiet;
  });

  const caloriesPercent = Math.min(100, Math.round((currentNutrition.consumedCalories / currentNutrition.targetCalories) * 100));
  const proteinPercent = Math.min(100, Math.round((currentNutrition.consumedProteinG / currentNutrition.targetProteinG) * 100));

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-8 px-4 sm:px-6 lg:px-8 space-y-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
              <Utensils className="w-4 h-4" /> Calisthenics Fueling Engine
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold">Personalized Nutrition & Meal Tracker</h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Diet Preference: <span className="text-amber-400 font-bold capitalize">{profile.assessment.dietPreference}</span> • Cuisine: <span className="text-amber-400 font-bold capitalize">{profile.assessment.cuisine}</span>
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/ai-coach"
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 font-bold text-xs hover:bg-amber-500/20 transition-colors"
            >
              <Bot className="w-4 h-4" />
              <span>Ask AI Substitutions</span>
            </Link>
          </div>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
          <button
            onClick={() => setActiveTab('daily')}
            className={`px-4 py-2 rounded-xl font-bold text-xs sm:text-sm transition-all ${
              activeTab === 'daily'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Today's Fuel Log
          </button>
          <button
            onClick={() => setActiveTab('database')}
            className={`px-4 py-2 rounded-xl font-bold text-xs sm:text-sm transition-all ${
              activeTab === 'database'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Food Database ({foods.length})
          </button>
        </div>

        {activeTab === 'daily' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Today's Macro Dashboard */}
            <div className="lg:col-span-1 bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-6 shadow-xl h-fit">
              <h2 className="text-xl font-black text-white flex items-center gap-2">
                <Flame className="w-5 h-5 text-amber-400" /> Daily Target Progress
              </h2>

              {/* Calories Gauge */}
              <div className="space-y-2 bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-slate-400">Total Calories</span>
                  <span className="text-amber-400 font-mono text-sm">
                    {currentNutrition.consumedCalories} / {currentNutrition.targetCalories} kcal
                  </span>
                </div>
                <div className="w-full bg-slate-900 rounded-full h-3 overflow-hidden border border-slate-800">
                  <div className="bg-gradient-to-r from-amber-500 to-orange-500 h-full transition-all duration-300" style={{ width: `${caloriesPercent}%` }} />
                </div>
              </div>

              {/* Protein, Carbs, Fat Breakdown */}
              <div className="space-y-3">
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-slate-400">Protein</span>
                    <span className="text-indigo-400 font-mono">
                      {currentNutrition.consumedProteinG}g / {currentNutrition.targetProteinG}g
                    </span>
                  </div>
                  <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800">
                    <div className="bg-indigo-500 h-full transition-all duration-300" style={{ width: `${proteinPercent}%` }} />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-slate-400">Carbohydrates</span>
                    <span className="text-emerald-400 font-mono">
                      {currentNutrition.consumedCarbsG}g / {currentNutrition.targetCarbsG}g
                    </span>
                  </div>
                  <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800">
                    <div className="bg-emerald-500 h-full transition-all duration-300" style={{ width: `${Math.min(100, (currentNutrition.consumedCarbsG / currentNutrition.targetCarbsG) * 100)}%` }} />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-slate-400">Fats</span>
                    <span className="text-amber-400 font-mono">
                      {currentNutrition.consumedFatG}g / {currentNutrition.targetFatG}g
                    </span>
                  </div>
                  <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800">
                    <div className="bg-amber-400 h-full transition-all duration-300" style={{ width: `${Math.min(100, (currentNutrition.consumedFatG / currentNutrition.targetFatG) * 100)}%` }} />
                  </div>
                </div>
              </div>

              {/* Safety/Disclaimer Note */}
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-[11px] text-slate-400 leading-relaxed flex items-start gap-2">
                <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>Nutritional targets are estimates. Consult a registered dietitian for medical dietary needs.</span>
              </div>

            </div>

            {/* Meal Plan Checklist */}
            <div className="lg:col-span-2 space-y-4">
              <h2 className="text-xl font-black text-white">Recommended Meal Plan</h2>

              <div className="space-y-3">
                {currentNutrition.meals.map(meal => (
                  <div
                    key={meal.foodId}
                    className={`p-5 rounded-2xl border transition-all flex items-center justify-between gap-4 ${
                      meal.eaten
                        ? 'bg-emerald-500/10 border-emerald-500/30 text-slate-300'
                        : 'bg-slate-900 border-slate-800 text-slate-100'
                    }`}
                  >
                    <div>
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-400 px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">
                        {meal.category}
                      </span>
                      <h3 className="text-base font-black text-white mt-1">{meal.foodName}</h3>
                      <div className="text-xs text-slate-400 font-mono mt-1">
                        {meal.calories} kcal • {meal.proteinG}g Protein • {meal.carbsG}g Carbs • {meal.fatG}g Fat
                      </div>
                    </div>

                    <button
                      onClick={() => toggleMealEaten(meal.foodId)}
                      className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all ${
                        meal.eaten
                          ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                          : 'bg-amber-500 text-slate-950 hover:bg-amber-400'
                      }`}
                    >
                      {meal.eaten ? <Check className="w-4 h-4" /> : null}
                      <span>{meal.eaten ? 'Eaten ✓' : 'MARK EATEN'}</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* Food Database Tab */}
        {activeTab === 'database' && (
          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="w-5 h-5 text-slate-500 absolute left-4 top-3.5" />
                <input
                  type="text"
                  placeholder="Search food by name..."
                  value={searchFood}
                  onChange={e => setSearchFood(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-12 pr-4 py-3 text-sm text-slate-200 focus:border-amber-500 focus:outline-none"
                />
              </div>

              <select
                value={dietFilter}
                onChange={e => setDietFilter(e.target.value as any)}
                className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-slate-300 font-bold focus:border-amber-500 focus:outline-none"
              >
                <option value="all">All Diet Types</option>
                <option value="vegetarian">Vegetarian</option>
                <option value="non_vegetarian">Non-Vegetarian</option>
                <option value="vegan">Vegan</option>
                <option value="eggetarian">Eggetarian</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredFoods.map(food => (
                <div key={food.id} className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-400 px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">
                      {food.category} • {food.dietType}
                    </span>
                    <span className="text-xs font-mono font-bold text-slate-400">{food.calories} kcal</span>
                  </div>
                  <h3 className="text-base font-black text-white">{food.name}</h3>
                  <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono pt-2 border-t border-slate-800/80">
                    <div className="p-2 rounded bg-slate-950 border border-slate-800">
                      <span className="text-indigo-400 font-bold block">{food.proteinG}g</span>
                      <span className="text-[10px] text-slate-500 uppercase">Protein</span>
                    </div>
                    <div className="p-2 rounded bg-slate-950 border border-slate-800">
                      <span className="text-emerald-400 font-bold block">{food.carbsG}g</span>
                      <span className="text-[10px] text-slate-500 uppercase">Carbs</span>
                    </div>
                    <div className="p-2 rounded bg-slate-950 border border-slate-800">
                      <span className="text-amber-400 font-bold block">{food.fatG}g</span>
                      <span className="text-[10px] text-slate-500 uppercase">Fat</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
