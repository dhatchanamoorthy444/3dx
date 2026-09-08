'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  UserProfile, 
  UserAssessment, 
  WorkoutLog, 
  PersonalRecord, 
  Equipment,
  LevelNumber,
  SkillNode,
  Exercise,
  FoodItem,
  MealLogItem,
  DailyNutritionLog,
  UserRole
} from '../types/calisthenics';
import { EXERCISES_DATABASE as INITIAL_EXERCISES, LEVEL_DEFINITIONS } from '../data/exercises';
import { SKILL_TREE as INITIAL_SKILLS } from '../data/skills';
import { INITIAL_FOODS_DATABASE } from '../data/foods';
import confetti from 'canvas-confetti';

interface CalisthenicsContextType {
  profile: UserProfile;
  exercises: Exercise[];
  skills: SkillNode[];
  foods: FoodItem[];
  currentNutrition: DailyNutritionLog;
  updateAssessment: (assessment: UserAssessment) => void;
  updateEquipment: (equipment: Equipment[]) => void;
  completeWorkout: (log: Omit<WorkoutLog, 'id' | 'date'>) => void;
  toggleMealEaten: (foodId: string) => void;
  checkSkillUnlocks: (prs?: Record<string, PersonalRecord>) => void;
  updateFatigue: (fatigue: 'low' | 'moderate' | 'high') => void;
  toggleUserRole: () => void;
  resetAllData: () => void;
  
  // Admin Operations
  addExercise: (exercise: Exercise) => void;
  editExercise: (exercise: Exercise) => void;
  deleteExercise: (exerciseId: string) => void;
  addSkill: (skill: SkillNode) => void;
  editSkill: (skill: SkillNode) => void;
  deleteSkill: (skillId: string) => void;
  addFood: (food: FoodItem) => void;
  editFood: (food: FoodItem) => void;
  deleteFood: (foodId: string) => void;

  generateTodayWorkout: () => {
    title: string;
    category: string;
    estimatedDurationMins: number;
    exercises: {
      exerciseId: string;
      name: string;
      sets: number;
      repsOrHold: number;
      type: 'reps' | 'hold';
      notes?: string;
    }[];
  };
}

const DEFAULT_ASSESSMENT: UserAssessment = {
  completed: false,
  age: 24,
  weightKg: 70,
  heightCm: 175,
  experienceYears: 0,
  availableDays: 4,
  sessionDurationMins: 45,
  trainingLocation: 'home',
  equipment: ['none', 'pull_up_bar', 'parallel_bars'],
  primaryGoal: 'master_skills',
  dietPreference: 'vegetarian',
  cuisine: 'indian',
  mealsPerDay: 4,
  budget: 'medium',
  maxPushups: 0,
  maxPullups: 0,
  maxDips: 0,
  maxPlankSec: 0,
  maxDeadHangSec: 0,
  handstandSec: 0
};

const DEFAULT_PROFILE: UserProfile = {
  id: 'usr_demo_1',
  username: 'athlete123',
  email: 'athlete@caliroadmap.com',
  name: 'Athlete',
  role: 'admin', // Seeded demo account with admin capabilities enabled for testing
  xp: 250,
  streak: 2,
  lastWorkoutDate: undefined,
  assessment: DEFAULT_ASSESSMENT,
  levels: {
    overall: 1,
    push: 1,
    pull: 1,
    core: 1,
    legs: 1,
    skill: 1,
    mobility: 1
  },
  unlockedSkillIds: ['skill_pushup_mastery', 'skill_plank_foundation'],
  personalRecords: {
    standard_pushup: { exerciseId: 'standard_pushup', exerciseName: 'Standard Push-up', recordValue: 12, unit: 'reps', date: new Date().toISOString() },
    plank_hold: { exerciseId: 'plank_hold', exerciseName: 'Forearm Plank', recordValue: 50, unit: 'seconds', date: new Date().toISOString() }
  },
  workoutHistory: [],
  nutritionHistory: [],
  fatigueLevel: 'low'
};

const STORAGE_KEY_PROFILE = 'cali_profile_v2';
const STORAGE_KEY_EXERCISES = 'cali_exercises_v2';
const STORAGE_KEY_SKILLS = 'cali_skills_v2';
const STORAGE_KEY_FOODS = 'cali_foods_v2';

const CalisthenicsContext = createContext<CalisthenicsContextType | undefined>(undefined);

export function calculateLevelsFromAssessment(assessment: UserAssessment) {
  let pushLvl: LevelNumber = 1;
  if (assessment.maxPushups >= 25) pushLvl = 4;
  else if (assessment.maxPushups >= 15) pushLvl = 3;
  else if (assessment.maxPushups >= 8) pushLvl = 2;

  let pullLvl: LevelNumber = 1;
  if (assessment.maxPullups >= 12) pullLvl = 4;
  else if (assessment.maxPullups >= 6) pullLvl = 3;
  else if (assessment.maxPullups >= 2) pullLvl = 2;

  let coreLvl: LevelNumber = 1;
  if (assessment.maxPlankSec >= 90) coreLvl = 4;
  else if (assessment.maxPlankSec >= 60) coreLvl = 3;
  else if (assessment.maxPlankSec >= 30) coreLvl = 2;

  let skillLvl: LevelNumber = 1;
  if (assessment.handstandSec >= 20) skillLvl = 4;
  else if (assessment.handstandSec >= 5) skillLvl = 3;

  const overall = Math.max(1, Math.round((pushLvl + pullLvl + coreLvl + skillLvl) / 4)) as LevelNumber;

  return {
    overall,
    push: pushLvl,
    pull: pullLvl,
    core: coreLvl,
    legs: 2 as LevelNumber,
    skill: skillLvl,
    mobility: 1 as LevelNumber
  };
}

export const CalisthenicsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<UserProfile>(DEFAULT_PROFILE);
  const [exercises, setExercises] = useState<Exercise[]>(INITIAL_EXERCISES);
  const [skills, setSkills] = useState<SkillNode[]>(INITIAL_SKILLS);
  const [foods, setFoods] = useState<FoodItem[]>(INITIAL_FOODS_DATABASE);

  // Initialize today's nutrition log state
  const [currentNutrition, setCurrentNutrition] = useState<DailyNutritionLog>(() => {
    const todayStr = new Date().toISOString().split('T')[0];
    const initialMeals: MealLogItem[] = INITIAL_FOODS_DATABASE.slice(0, 5).map(f => ({
      foodId: f.id,
      foodName: f.name,
      category: f.category,
      calories: f.calories,
      proteinG: f.proteinG,
      carbsG: f.carbsG,
      fatG: f.fatG,
      eaten: false
    }));

    return {
      date: todayStr,
      targetCalories: 2300,
      targetProteinG: 130,
      targetCarbsG: 260,
      targetFatG: 70,
      consumedCalories: 0,
      consumedProteinG: 0,
      consumedCarbsG: 0,
      consumedFatG: 0,
      meals: initialMeals
    };
  });

  // Load local state on mount
  useEffect(() => {
    try {
      const savedProf = localStorage.getItem(STORAGE_KEY_PROFILE);
      if (savedProf) setProfile(JSON.parse(savedProf));

      const savedEx = localStorage.getItem(STORAGE_KEY_EXERCISES);
      if (savedEx) setExercises(JSON.parse(savedEx));

      const savedSk = localStorage.getItem(STORAGE_KEY_SKILLS);
      if (savedSk) setSkills(JSON.parse(savedSk));

      const savedFd = localStorage.getItem(STORAGE_KEY_FOODS);
      if (savedFd) setFoods(JSON.parse(savedFd));
    } catch (e) {
      console.error('Failed to load local state:', e);
    }
  }, []);

  // Save changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_PROFILE, JSON.stringify(profile));
    } catch (e) {}
  }, [profile]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_EXERCISES, JSON.stringify(exercises));
    } catch (e) {}
  }, [exercises]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_SKILLS, JSON.stringify(skills));
    } catch (e) {}
  }, [skills]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_FOODS, JSON.stringify(foods));
    } catch (e) {}
  }, [foods]);

  // Sync skill requirements completion
  useEffect(() => {
    const updatedSkills = skills.map(skill => {
      const isUnlocked = profile.unlockedSkillIds.includes(skill.id);
      let reqMetCount = 0;
      skill.exerciseRequirements.forEach(req => {
        const pr = profile.personalRecords[req.exerciseId];
        if (pr && pr.recordValue >= req.targetValue) reqMetCount++;
      });
      const percent = Math.min(100, Math.round((reqMetCount / Math.max(1, skill.exerciseRequirements.length)) * 100));

      return {
        ...skill,
        unlocked: isUnlocked || percent === 100,
        progressPercent: isUnlocked ? 100 : percent
      };
    });
    setSkills(updatedSkills);
  }, [profile.unlockedSkillIds, profile.personalRecords]);

  const toggleMealEaten = (foodId: string) => {
    setCurrentNutrition(prev => {
      const updatedMeals = prev.meals.map(m => {
        if (m.foodId === foodId) {
          return { ...m, eaten: !m.eaten };
        }
        return m;
      });

      const totals = updatedMeals.reduce(
        (acc, m) => {
          if (m.eaten) {
            acc.cals += m.calories;
            acc.p += m.proteinG;
            acc.c += m.carbsG;
            acc.f += m.fatG;
          }
          return acc;
        },
        { cals: 0, p: 0, c: 0, f: 0 }
      );

      return {
        ...prev,
        meals: updatedMeals,
        consumedCalories: totals.cals,
        consumedProteinG: totals.p,
        consumedCarbsG: totals.c,
        consumedFatG: totals.f
      };
    });
  };

  const updateAssessment = (assessment: UserAssessment) => {
    const newLevels = calculateLevelsFromAssessment(assessment);
    setProfile(prev => ({
      ...prev,
      assessment: { ...assessment, completed: true },
      levels: newLevels
    }));
  };

  const updateEquipment = (equipment: Equipment[]) => {
    setProfile(prev => ({
      ...prev,
      assessment: { ...prev.assessment, equipment }
    }));
  };

  const updateFatigue = (fatigue: 'low' | 'moderate' | 'high') => {
    setProfile(prev => ({ ...prev, fatigueLevel: fatigue }));
  };

  const toggleUserRole = () => {
    setProfile(prev => ({
      ...prev,
      role: prev.role === 'admin' ? 'user' : 'admin'
    }));
  };

  const resetAllData = () => {
    setProfile(DEFAULT_PROFILE);
    setExercises(INITIAL_EXERCISES);
    setSkills(INITIAL_SKILLS);
    setFoods(INITIAL_FOODS_DATABASE);
    localStorage.clear();
  };

  // Admin Actions
  const addExercise = (newEx: Exercise) => {
    setExercises(prev => [...prev, newEx]);
  };

  const editExercise = (updatedEx: Exercise) => {
    setExercises(prev => prev.map(e => (e.id === updatedEx.id ? updatedEx : e)));
  };

  const deleteExercise = (exId: string) => {
    setExercises(prev => prev.filter(e => e.id !== exId));
  };

  const addSkill = (newSk: SkillNode) => {
    setSkills(prev => [...prev, newSk]);
  };

  const editSkill = (updatedSk: SkillNode) => {
    setSkills(prev => prev.map(s => (s.id === updatedSk.id ? updatedSk : s)));
  };

  const deleteSkill = (skId: string) => {
    setSkills(prev => prev.filter(s => s.id !== skId));
  };

  const addFood = (newFd: FoodItem) => {
    setFoods(prev => [...prev, newFd]);
  };

  const editFood = (updatedFd: FoodItem) => {
    setFoods(prev => prev.map(f => (f.id === updatedFd.id ? updatedFd : f)));
  };

  const deleteFood = (fdId: string) => {
    setFoods(prev => prev.filter(f => f.id !== fdId));
  };

  const checkSkillUnlocks = (newPRs?: Record<string, PersonalRecord>) => {
    const currentPRs = newPRs || profile.personalRecords;
    const newlyUnlocked: string[] = [];

    skills.forEach(skill => {
      if (!profile.unlockedSkillIds.includes(skill.id)) {
        const allRequirementsMet = skill.exerciseRequirements.every(req => {
          const pr = currentPRs[req.exerciseId];
          return pr && pr.recordValue >= req.targetValue;
        });

        if (allRequirementsMet) {
          newlyUnlocked.push(skill.id);
        }
      }
    });

    if (newlyUnlocked.length > 0) {
      setProfile(prev => ({
        ...prev,
        unlockedSkillIds: [...prev.unlockedSkillIds, ...newlyUnlocked],
        xp: prev.xp + newlyUnlocked.length * 250
      }));

      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    }
  };

  const completeWorkout = (workoutData: Omit<WorkoutLog, 'id' | 'date'>) => {
    const todayStr = new Date().toISOString().split('T')[0];
    const newLog: WorkoutLog = {
      ...workoutData,
      id: 'log_' + Date.now(),
      date: new Date().toISOString()
    };

    let newStreak = profile.streak;
    if (profile.lastWorkoutDate) {
      const lastDate = new Date(profile.lastWorkoutDate);
      const currentDate = new Date(todayStr);
      const diffDays = Math.floor((currentDate.getTime() - lastDate.getTime()) / (1000 * 3600 * 24));
      if (diffDays === 1) newStreak += 1;
      else if (diffDays > 1) newStreak = 1;
    } else {
      newStreak = 1;
    }

    const updatedPRs = { ...profile.personalRecords };
    let prBonusXP = 0;

    workoutData.exercises.forEach(ex => {
      let maxSetVal = 0;
      ex.sets.forEach(s => {
        if (s.completed && s.repsOrHold > maxSetVal) maxSetVal = s.repsOrHold;
      });

      if (maxSetVal > 0) {
        const exDetail = exercises.find(e => e.id === ex.exerciseId);
        const existingPR = updatedPRs[ex.exerciseId];
        const unit = exDetail?.type === 'hold' ? 'seconds' : 'reps';

        if (!existingPR || maxSetVal > existingPR.recordValue) {
          updatedPRs[ex.exerciseId] = {
            exerciseId: ex.exerciseId,
            exerciseName: ex.exerciseName,
            recordValue: maxSetVal,
            unit,
            date: new Date().toISOString()
          };
          prBonusXP += 100;
        }
      }
    });

    const totalXP = workoutData.xpEarned + prBonusXP;

    setProfile(prev => ({
      ...prev,
      xp: prev.xp + totalXP,
      streak: newStreak,
      lastWorkoutDate: todayStr,
      personalRecords: updatedPRs,
      workoutHistory: [newLog, ...prev.workoutHistory],
      fatigueLevel: workoutData.fatigueRating
    }));

    checkSkillUnlocks(updatedPRs);
  };

  const generateTodayWorkout = () => {
    const userEquip = profile.assessment.equipment || ['none'];
    const pushLvl = profile.levels.push;
    const pullLvl = profile.levels.pull;
    const coreLvl = profile.levels.core;

    const availableExercises = exercises.filter(ex => {
      if (profile.assessment.trainingLocation === 'home' && ex.locationRequirement === 'gym_only') {
        return false;
      }
      return ex.equipment.every(eq => eq === 'none' || userEquip.includes(eq));
    });

    const pushEx = availableExercises.find(e => e.category === 'push' && e.level === pushLvl) || 
                   availableExercises.find(e => e.category === 'push') || 
                   exercises[3];

    const pullEx = availableExercises.find(e => e.category === 'pull' && e.level === pullLvl) || 
                   availableExercises.find(e => e.category === 'pull') || 
                   exercises[12];

    const coreEx = availableExercises.find(e => e.category === 'core' && e.level === coreLvl) || 
                   availableExercises.find(e => e.category === 'core') || 
                   exercises[20];

    const skillEx = availableExercises.find(e => e.category === 'skill') || exercises[25];
    const legEx = availableExercises.find(e => e.category === 'legs') || exercises[23];

    const fatigueFactor = profile.fatigueLevel === 'high' ? 0.7 : 1;

    return {
      title: `${profile.assessment.trainingLocation.toUpperCase()} • Level ${profile.levels.overall} Routine`,
      category: 'Push + Pull + Core',
      estimatedDurationMins: profile.assessment.sessionDurationMins || 45,
      exercises: [
        {
          exerciseId: skillEx.id,
          name: skillEx.name,
          sets: 3,
          repsOrHold: Math.max(5, Math.round(skillEx.defaultRepsOrHold * fatigueFactor)),
          type: skillEx.type,
          notes: 'Skill Balance Block'
        },
        {
          exerciseId: pushEx.id,
          name: pushEx.name,
          sets: pushEx.defaultSets,
          repsOrHold: Math.max(3, Math.round(pushEx.defaultRepsOrHold * fatigueFactor)),
          type: pushEx.type,
          notes: 'Pushing Strength Block'
        },
        {
          exerciseId: pullEx.id,
          name: pullEx.name,
          sets: pullEx.defaultSets,
          repsOrHold: Math.max(3, Math.round(pullEx.defaultRepsOrHold * fatigueFactor)),
          type: pullEx.type,
          notes: 'Pulling Strength Block'
        },
        {
          exerciseId: legEx.id,
          name: legEx.name,
          sets: legEx.defaultSets,
          repsOrHold: Math.max(5, Math.round(legEx.defaultRepsOrHold * fatigueFactor)),
          type: legEx.type,
          notes: 'Unilateral Leg Block'
        },
        {
          exerciseId: coreEx.id,
          name: coreEx.name,
          sets: coreEx.defaultSets,
          repsOrHold: Math.max(10, Math.round(coreEx.defaultRepsOrHold * fatigueFactor)),
          type: coreEx.type,
          notes: 'Core Isometric Finish'
        }
      ]
    };
  };

  return (
    <CalisthenicsContext.Provider
      value={{
        profile,
        exercises,
        skills,
        foods,
        currentNutrition,
        updateAssessment,
        updateEquipment,
        completeWorkout,
        toggleMealEaten,
        checkSkillUnlocks,
        updateFatigue,
        toggleUserRole,
        resetAllData,
        addExercise,
        editExercise,
        deleteExercise,
        addSkill,
        editSkill,
        deleteSkill,
        addFood,
        editFood,
        deleteFood,
        generateTodayWorkout
      }}
    >
      {children}
    </CalisthenicsContext.Provider>
  );
};

export const useCalisthenics = () => {
  const context = useContext(CalisthenicsContext);
  if (!context) {
    throw new Error('useCalisthenics must be used within a CalisthenicsProvider');
  }
  return context;
};
