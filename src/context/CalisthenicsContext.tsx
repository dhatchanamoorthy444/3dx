'use client';

import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
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
  DailyMissionItem,
  AchievementBadge,
  DailyCheckIn,
  FriendUser,
  ConsistencyChallenge
} from '../types/calisthenics';
import { EXERCISES_DATABASE as INITIAL_EXERCISES } from '../data/exercises';
import { SKILL_TREE as INITIAL_SKILLS } from '../data/skills';
import { INITIAL_FOODS_DATABASE } from '../data/foods';
import { useAuth } from './AuthContext';
import { getSupabaseClient } from '@/lib/supabaseClient';
import confetti from 'canvas-confetti';

// Initialize nutrition state
function createInitialNutrition(): DailyNutritionLog {
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
}

interface CalisthenicsContextType {
  profile: UserProfile;
  exercises: Exercise[];
  skills: SkillNode[];
  foods: FoodItem[];
  currentNutrition: DailyNutritionLog;
  dailyMissions: DailyMissionItem[];
  achievements: AchievementBadge[];
  friends: FriendUser[];
  challenges: ConsistencyChallenge[];
  
  isLoggedIn: boolean;
  currentUser: { username: string; email: string; role: string } | null;
  login: (usernameOrEmail: string, password: string, preferredRole?: 'user' | 'admin') => { success: boolean; error?: string };
  logout: () => void;
  botDetected: boolean;
  setBotDetected: (value: boolean) => void;
  
  updateAssessment: (assessment: UserAssessment) => void;
  updateEquipment: (equipment: Equipment[]) => void;
  completeWorkout: (log: Omit<WorkoutLog, 'id' | 'date'>) => void;
  toggleMealEaten: (foodId: string) => void;
  toggleMissionCompleted: (missionId: string) => void;
  saveCheckIn: (checkIn: DailyCheckIn) => void;
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

const INITIAL_MISSIONS: DailyMissionItem[] = [
  { id: 'm_workout', title: 'Main Mission', category: 'main', xpReward: 100, completed: false, description: 'Complete today\'s recommended workout session.' },
  { id: 'm_pushups', title: 'Strength Mission', category: 'strength', xpReward: 75, completed: false, description: 'Complete 3 sets of unbroken push-up variations.' },
  { id: 'm_handstand', title: 'Skill Mission', category: 'skill', xpReward: 75, completed: false, description: 'Practice freestanding handstand or wall hold for 10 mins.' },
  { id: 'm_nutrition', title: 'Nutrition Mission', category: 'nutrition', xpReward: 50, completed: false, description: 'Hit your daily protein target (130g).' },
  { id: 'm_mobility', title: 'Recovery Mission', category: 'recovery', xpReward: 25, completed: false, description: 'Perform 5 minutes of wrist & shoulder decompression mobility.' },
  { id: 'm_streak', title: 'Streak Protection Mission', category: 'streak', xpReward: 100, completed: true, description: 'Maintain your active daily streak.' }
];

const INITIAL_ACHIEVEMENTS: AchievementBadge[] = [
  { id: 'ach_first_workout', title: 'First Step', description: 'Completed your first official workout session', icon: '🏆', xpReward: 100, unlocked: true },
  { id: 'ach_streak_7', title: 'On Fire 🔥', description: 'Maintained a 7-day streak', icon: '🔥', xpReward: 250, unlocked: false },
  { id: 'ach_streak_30', title: 'Unstoppable 🔥🔥', description: 'Maintained a 30-day streak', icon: '⚡', xpReward: 500, unlocked: false },
  { id: 'ach_100_workouts', title: 'Iron Athlete', description: 'Logged 100 total workout sessions', icon: '🦾', xpReward: 1000, unlocked: false },
  { id: 'ach_pull_master', title: 'Pull Master', description: 'Reached 10 unbroken pull-ups PR', icon: '🧗', xpReward: 300, unlocked: false },
  { id: 'ach_handstand', title: 'Handstand Balance', description: 'Held a freestanding handstand for 30s', icon: '🤸', xpReward: 400, unlocked: false },
  { id: 'ach_muscle_up', title: 'First Muscle-Up', description: 'Unlocked and logged your first muscle-up', icon: '💀', xpReward: 750, unlocked: false },
  { id: 'ach_elite', title: 'Elite Tier', description: 'Reached Level 7 Elite status', icon: '👑', xpReward: 1500, unlocked: false }
];

const INITIAL_FRIENDS: FriendUser[] = [
  { id: 'fr_1', username: 'sam_pulls', name: 'Sam Miller', streak: 14, xp: 3200 },
  { id: 'fr_2', username: 'rahul_cali', name: 'Rahul Sharma', streak: 21, xp: 4800 },
  { id: 'fr_3', username: 'chris_handstand', name: 'Chris Evans', streak: 8, xp: 1900 }
];

const INITIAL_CHALLENGES: ConsistencyChallenge[] = [
  { id: 'ch_1', friendId: 'fr_1', friendName: 'Sam Miller', title: '7-Day Consistency Challenge', daysDuration: 7, myProgress: 5, friendProgress: 4, completed: false }
];

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
  id: '',
  username: '',
  email: '',
  name: '',
  role: 'user',
  xp: 0,
  streak: 0,
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
  unlockedSkillIds: [],
  personalRecords: {},
  workoutHistory: [],
  nutritionHistory: [],
  fatigueLevel: 'low'
};

const STORAGE_KEY_PROFILE = 'cali_profile_v3';
const STORAGE_KEY_EXERCISES = 'cali_exercises_v3';
const STORAGE_KEY_SKILLS = 'cali_skills_v3';
const STORAGE_KEY_FOODS = 'cali_foods_v3';

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
  const { user: authUser, saveWorkout } = useAuth();
  const [profile, setProfile] = useState<UserProfile>(DEFAULT_PROFILE);
  const [exercises, setExercises] = useState<Exercise[]>(INITIAL_EXERCISES);
  const [skills, setSkills] = useState<SkillNode[]>(INITIAL_SKILLS);
  const [foods, setFoods] = useState<FoodItem[]>(INITIAL_FOODS_DATABASE);
  const [dailyMissions, setDailyMissions] = useState<DailyMissionItem[]>(INITIAL_MISSIONS);
  const [achievements] = useState<AchievementBadge[]>(INITIAL_ACHIEVEMENTS);
  const [friends, _setFriends] = useState<FriendUser[]>(INITIAL_FRIENDS);
  const [challenges, _setChallenges] = useState<ConsistencyChallenge[]>(INITIAL_CHALLENGES);

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<{ username: string; email: string; role: string } | null>(null);
  const [botDetected, setBotDetected] = useState(false);

  // Load full profile from Supabase when authUser changes
  useEffect(() => {
    if (authUser) {
      const loadProfile = async () => {
        try {
          const { data: profileData } = await getSupabaseClient()
            .from('profiles')
            .select('*')
            .eq('id', authUser.id)
            .single();
          
          if (profileData) {
            setProfile({
              id: profileData.id,
              username: profileData.username,
              email: profileData.email,
              name: profileData.name || profileData.username,
              role: profileData.role || 'user',
              xp: profileData.xp || 0,
              streak: profileData.streak || 0,
              lastWorkoutDate: profileData.last_workout_date,
              assessment: profileData.assessment || DEFAULT_ASSESSMENT,
              levels: profileData.levels || {
                overall: 1, push: 1, pull: 1, core: 1, legs: 1, skill: 1, mobility: 1
              },
              unlockedSkillIds: profileData.unlocked_skill_ids || [],
              personalRecords: profileData.personal_records || {},
              workoutHistory: profileData.workout_history || [],
              nutritionHistory: profileData.nutrition_history || [],
              fatigueLevel: profileData.fatigue_level || 'low'
            });
          }
        } catch (error) {
          console.error('Failed to load profile:', error);
          // Fallback to authUser data
          setProfile(prev => ({
            ...prev,
            role: authUser.role,
            id: authUser.id,
            username: authUser.username,
            email: authUser.email
          }));
        }
        
        setIsLoggedIn(true);
        setCurrentUser({ username: authUser.username, email: authUser.email, role: authUser.role });
      };
      
      loadProfile();
    } else {
      setProfile(DEFAULT_PROFILE);
      setIsLoggedIn(false);
      setCurrentUser(null);
    }
  }, [authUser]);

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

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_PROFILE, JSON.stringify(profile));
    } catch {}
  }, [profile]);
  useEffect(() => {
    try {
      const savedProf = localStorage.getItem(STORAGE_KEY_PROFILE);
      if (savedProf) setProfile(JSON.parse(savedProf));
    } catch {}
    try {
      const savedEx = localStorage.getItem(STORAGE_KEY_EXERCISES);
      if (savedEx) setExercises(JSON.parse(savedEx));
    } catch {}
    try {
      const savedSk = localStorage.getItem(STORAGE_KEY_SKILLS);
      if (savedSk) setSkills(JSON.parse(savedSk));
    } catch {}
    try {
      const savedFd = localStorage.getItem(STORAGE_KEY_FOODS);
      if (savedFd) setFoods(JSON.parse(savedFd));
    } catch {}
    try {
      const savedLogin = localStorage.getItem('cali_is_logged_in');
      if (savedLogin === 'true') setIsLoggedIn(true);
    } catch {}
    try {
      const savedUser = localStorage.getItem('cali_current_user');
      if (savedUser) setCurrentUser(JSON.parse(savedUser));
    } catch {}
  }, []);


  const computedSkills = useMemo(() => {
    return skills.map(skill => {
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
  }, [skills, profile.unlockedSkillIds, profile.personalRecords]);

  const toggleMissionCompleted = (missionId: string) => {
    setDailyMissions(prev => {
      return prev.map(m => {
        if (m.id === missionId && !m.completed) {
          setProfile(p => ({ ...p, xp: p.xp + m.xpReward }));
          confetti({ particleCount: 50, spread: 50, origin: { y: 0.7 } });
          return { ...m, completed: true };
        }
        return m;
      });
    });
  };

  const saveCheckIn = (checkIn: DailyCheckIn) => {
    let fatigue: 'low' | 'moderate' | 'high' = 'low';
    if (checkIn.soreness === 'sore' || checkIn.energy === 'sleepy') {
      fatigue = 'high';
    } else if (checkIn.soreness === 'mild') {
      fatigue = 'moderate';
    }

    setProfile(prev => ({
      ...prev,
      fatigueLevel: fatigue,
      dailyCheckIn: checkIn
    }));
  };

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

  const login = (usernameOrEmail: string, password: string, preferredRole?: 'user' | 'admin') => {
    setBotDetected(false);
    
    const trimmed = usernameOrEmail.trim().toLowerCase();
    const pw = password.trim();
    
    if (!trimmed || !pw) {
      return { success: false, error: 'Please enter both username/email and password.' };
    }

    const demoUsers = [
      { username: 'admin', email: 'admin@caligym.com', password: 'admin', role: 'admin' as const },
      { username: 'athlete123', email: 'athlete@caligym.com', password: 'password', role: 'user' as const }
    ];

    const user = demoUsers.find(u => 
      (u.username === trimmed || u.email === trimmed) && u.password === pw
    );

    if (user) {
      if (preferredRole && user.role !== preferredRole) {
        return { success: false, error: `Invalid credentials for ${preferredRole} login. Please use the ${user.role} demo account.` };
      }
      setIsLoggedIn(true);
      setCurrentUser({ username: user.username, email: user.email, role: user.role });
      setProfile(prev => ({ ...prev, role: user.role }));
      const maxAge = 60 * 60 * 24 * 7;
      if (typeof document !== 'undefined') {
        document.cookie = `cali_session=1; path=/; max-age=${maxAge}; SameSite=Lax`;
        document.cookie = `cali_role=${user.role}; path=/; max-age=${maxAge}; SameSite=Lax`;
      }
      localStorage.setItem('cali_is_logged_in', 'true');
      localStorage.setItem('cali_current_user', JSON.stringify({ username: user.username, email: user.email, role: user.role }));
      return { success: true };
    }

    return { success: false, error: 'Invalid username or password.' };
  };

  const logout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    setProfile(prev => ({ ...prev, role: 'admin' }));
    if (typeof document !== 'undefined') {
      document.cookie = 'cali_session=; path=/; max-age=0';
      document.cookie = 'cali_role=; path=/; max-age=0';
    }
    localStorage.removeItem('cali_is_logged_in');
    localStorage.removeItem('cali_current_user');
  };

  const resetAllData = () => {
    setProfile(DEFAULT_PROFILE);
    setExercises(INITIAL_EXERCISES);
    setSkills(INITIAL_SKILLS);
    setFoods(INITIAL_FOODS_DATABASE);
    localStorage.clear();
  };

  // Admin Actions
  const addExercise = (newEx: Exercise) => setExercises(prev => [...prev, newEx]);
  const editExercise = (updatedEx: Exercise) => setExercises(prev => prev.map(e => (e.id === updatedEx.id ? updatedEx : e)));
  const deleteExercise = (exId: string) => setExercises(prev => prev.filter(e => e.id !== exId));

  const addSkill = (newSk: SkillNode) => setSkills(prev => [...prev, newSk]);
  const editSkill = (updatedSk: SkillNode) => setSkills(prev => prev.map(s => (s.id === updatedSk.id ? updatedSk : s)));
  const deleteSkill = (skId: string) => setSkills(prev => prev.filter(s => s.id !== skId));

  const addFood = (newFd: FoodItem) => setFoods(prev => [...prev, newFd]);
  const editFood = (updatedFd: FoodItem) => setFoods(prev => prev.map(f => (f.id === updatedFd.id ? updatedFd : f)));
  const deleteFood = (fdId: string) => setFoods(prev => prev.filter(f => f.id !== fdId));

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

    // Auto complete main workout mission
    toggleMissionCompleted('m_workout');
    checkSkillUnlocks(updatedPRs);

    // Save to Supabase if user is logged in
    if (authUser) {
      saveWorkout(todayStr, {
        ...workoutData,
        id: newLog.id,
        xpEarned: totalXP,
        streak: newStreak
      }).catch((err: Error) => console.error('Failed to save workout to Supabase:', err));
    }
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
        skills: computedSkills,
        foods,
        currentNutrition,
        dailyMissions,
        achievements,
        friends,
        challenges,
        isLoggedIn,
        currentUser,
        login,
        logout,
        botDetected,
        setBotDetected,
        updateAssessment,
        updateEquipment,
        completeWorkout,
        toggleMealEaten,
        toggleMissionCompleted,
        saveCheckIn,
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
  if (!context) throw new Error('useCalisthenics must be used within a CalisthenicsProvider');
  return context;
};
