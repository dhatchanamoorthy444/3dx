'use client';

import React, { useState } from 'react';
import { useCalisthenics } from '../../context/CalisthenicsContext';
import { Exercise, FoodItem } from '../../types/calisthenics';
import { 
  ShieldCheck, 
  Plus, 
  Trash2, 
  Lock, 
  Users, 
  BookOpen, 
  GitFork, 
  Utensils, 
  AlertTriangle,
  X
} from 'lucide-react';

export default function AdminPage() {
  const { 
    profile, 
    exercises, 
    skills, 
    foods, 
    toggleUserRole,
    addExercise,
    deleteExercise,
    addFood,
    deleteFood
  } = useCalisthenics();

  const [activeTab, setActiveTab] = useState<'overview' | 'exercises' | 'skills' | 'foods'>('overview');

  // Exercise Form Modal State
  const [showAddExModal, setShowAddExModal] = useState(false);
  const [newEx, setNewEx] = useState<Partial<Exercise>>({
    name: '',
    category: 'push',
    level: 1,
    equipment: ['none'],
    primaryMuscles: ['Pectorals'],
    secondaryMuscles: ['Triceps'],
    type: 'reps',
    defaultSets: 3,
    defaultRepsOrHold: 10,
    description: '',
    instructions: ['Perform cleanly.'],
    commonMistakes: ['Sagging hips.'],
    prerequisites: []
  });

  // Food Form Modal State
  const [showAddFoodModal, setShowAddFoodModal] = useState(false);
  const [newFoodItem, setNewFoodItem] = useState<Partial<FoodItem>>({
    name: '',
    category: 'breakfast',
    calories: 300,
    proteinG: 20,
    carbsG: 30,
    fatG: 10,
    dietType: 'vegetarian',
    cuisine: 'indian'
  });

  if (profile.role !== 'admin') {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4">
        <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl max-w-md text-center space-y-4">
          <div className="p-3 rounded-full bg-rose-500/10 text-rose-400 w-fit mx-auto border border-rose-500/20">
            <Lock className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-black text-white">Admin Authorization Required</h1>
          <p className="text-xs text-slate-400 leading-relaxed">
            You are currently browsing with role <span className="text-amber-400 font-bold uppercase">{profile.role}</span>. Administrator privileges are required to edit official exercise, skill, and food content.
          </p>
          <button
            onClick={toggleUserRole}
            className="w-full py-3 rounded-xl bg-amber-500 text-slate-950 font-extrabold text-sm hover:bg-amber-400 transition-colors shadow-lg shadow-amber-500/20"
          >
            Switch Role to Admin (Demo Mode)
          </button>
        </div>
      </div>
    );
  }

  const handleCreateExercise = () => {
    if (!newEx.name) return;
    const created: Exercise = {
      id: 'ex_custom_' + Date.now(),
      name: newEx.name,
      category: newEx.category || 'push',
      level: newEx.level || 1,
      equipment: newEx.equipment || ['none'],
      primaryMuscles: newEx.primaryMuscles || ['Chest'],
      secondaryMuscles: newEx.secondaryMuscles || ['Triceps'],
      type: newEx.type || 'reps',
      defaultSets: newEx.defaultSets || 3,
      defaultRepsOrHold: newEx.defaultRepsOrHold || 10,
      description: newEx.description || 'Custom admin exercise',
      instructions: newEx.instructions || ['Form focused execution.'],
      commonMistakes: newEx.commonMistakes || ['Swinging.'],
      prerequisites: []
    };
    addExercise(created);
    setShowAddExModal(false);
  };

  const handleCreateFood = () => {
    if (!newFoodItem.name) return;
    const created: FoodItem = {
      id: 'food_custom_' + Date.now(),
      name: newFoodItem.name,
      category: newFoodItem.category || 'breakfast',
      calories: newFoodItem.calories || 300,
      proteinG: newFoodItem.proteinG || 20,
      carbsG: newFoodItem.carbsG || 30,
      fatG: newFoodItem.fatG || 10,
      dietType: newFoodItem.dietType || 'vegetarian',
      cuisine: newFoodItem.cuisine || 'indian'
    };
    addFood(created);
    setShowAddFoodModal(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-8 px-4 sm:px-6 lg:px-8 space-y-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Admin Header */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-black">Official Admin Console</h1>
              <p className="text-xs text-slate-400">System content management & security control panel</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
              Role: ADMIN ACTIVE
            </span>
          </div>
        </div>

        {/* Security Warning Banner */}
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-300 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-extrabold uppercase block text-amber-400">Production Security Notice</span>
            Do not deploy hardcoded admin passwords in production environments. Passwords must be securely hashed with Argon2/bcrypt and changed immediately after initial setup.
          </div>
        </div>

        {/* Admin Section Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
          {(['overview', 'exercises', 'skills', 'foods'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-xl font-bold text-xs sm:text-sm capitalize transition-all ${
                activeTab === tab
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-2">
              <BookOpen className="w-6 h-6 text-amber-400" />
              <div className="text-2xl font-black text-white">{exercises.length}</div>
              <div className="text-xs text-slate-400 uppercase font-semibold">Official Exercises</div>
            </div>
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-2">
              <GitFork className="w-6 h-6 text-indigo-400" />
              <div className="text-2xl font-black text-white">{skills.length}</div>
              <div className="text-xs text-slate-400 uppercase font-semibold">Skill Tree Nodes</div>
            </div>
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-2">
              <Utensils className="w-6 h-6 text-emerald-400" />
              <div className="text-2xl font-black text-white">{foods.length}</div>
              <div className="text-xs text-slate-400 uppercase font-semibold">Food Items</div>
            </div>
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-2">
              <Users className="w-6 h-6 text-rose-400" />
              <div className="text-2xl font-black text-white">1</div>
              <div className="text-xs text-slate-400 uppercase font-semibold">Active Session Profile</div>
            </div>
          </div>
        )}

        {/* Exercises Management Tab */}
        {activeTab === 'exercises' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-black">Exercise Vault ({exercises.length})</h2>
              <button
                onClick={() => setShowAddExModal(true)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-400"
              >
                <Plus className="w-4 h-4" /> Add Exercise
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {exercises.map(ex => (
                <div key={ex.id} className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-extrabold uppercase text-amber-400 px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">
                      Lvl {ex.level} • {ex.category}
                    </span>
                    <h3 className="text-base font-black text-white mt-1">{ex.name}</h3>
                  </div>
                  <button
                    onClick={() => deleteExercise(ex.id)}
                    className="p-2 rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 border border-rose-500/30"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Foods Management Tab */}
        {activeTab === 'foods' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-black">Food Database ({foods.length})</h2>
              <button
                onClick={() => setShowAddFoodModal(true)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-400"
              >
                <Plus className="w-4 h-4" /> Add Food Item
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {foods.map(food => (
                <div key={food.id} className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-extrabold uppercase text-emerald-400 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                      {food.category} • {food.dietType}
                    </span>
                    <h3 className="text-base font-black text-white mt-1">{food.name}</h3>
                    <div className="text-xs text-slate-400 font-mono">{food.calories} kcal • P: {food.proteinG}g</div>
                  </div>
                  <button
                    onClick={() => deleteFood(food.id)}
                    className="p-2 rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 border border-rose-500/30"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Add Exercise Modal */}
        {showAddExModal && (
          <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-slate-800 w-full max-w-lg rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-black text-white">Add New Exercise</h3>
                <button onClick={() => setShowAddExModal(false)}><X className="w-5 h-5" /></button>
              </div>

              <input
                type="text"
                placeholder="Exercise Name (e.g. Archer Dips)"
                value={newEx.name}
                onChange={e => setNewEx({ ...newEx, name: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm"
              />

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-slate-400">Category</label>
                  <select
                    value={newEx.category}
                    onChange={e => setNewEx({ ...newEx, category: e.target.value as Exercise['category'] })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs"
                  >
                    <option value="push">Push</option>
                    <option value="pull">Pull</option>
                    <option value="core">Core</option>
                    <option value="legs">Legs</option>
                    <option value="skill">Skill</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs text-slate-400">Level (1-8)</label>
                  <input
                    type="number"
                    value={newEx.level}
                    onChange={e => setNewEx({ ...newEx, level: Number(e.target.value) as Exercise['level'] })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button onClick={() => setShowAddExModal(false)} className="px-4 py-2 text-xs font-bold">Cancel</button>
                <button onClick={handleCreateExercise} className="px-5 py-2 bg-amber-500 text-slate-950 rounded-xl text-xs font-bold">Save Exercise</button>
              </div>
            </div>
          </div>
        )}

        {/* Add Food Modal */}
        {showAddFoodModal && (
          <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-slate-800 w-full max-w-lg rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-black text-white">Add New Food Item</h3>
                <button onClick={() => setShowAddFoodModal(false)}><X className="w-5 h-5" /></button>
              </div>

              <input
                type="text"
                placeholder="Food Item Name (e.g. Paneer Bhurji)"
                value={newFoodItem.name}
                onChange={e => setNewFoodItem({ ...newFoodItem, name: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm"
              />

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-slate-400">Calories (kcal)</label>
                  <input
                    type="number"
                    value={newFoodItem.calories}
                    onChange={e => setNewFoodItem({ ...newFoodItem, calories: Number(e.target.value) })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs"
                  />
                </div>

                <div>
                  <label className="text-xs text-slate-400">Protein (g)</label>
                  <input
                    type="number"
                    value={newFoodItem.proteinG}
                    onChange={e => setNewFoodItem({ ...newFoodItem, proteinG: Number(e.target.value) })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button onClick={() => setShowAddFoodModal(false)} className="px-4 py-2 text-xs font-bold">Cancel</button>
                <button onClick={handleCreateFood} className="px-5 py-2 bg-amber-500 text-slate-950 rounded-xl text-xs font-bold">Save Food</button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
