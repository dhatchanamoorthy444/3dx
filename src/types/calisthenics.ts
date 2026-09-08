export type LevelCategory = 'push' | 'pull' | 'core' | 'legs' | 'skill' | 'mobility';

export type LevelNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export interface LevelInfo {
  level: LevelNumber;
  title: string;
  badgeColor: string;
  description: string;
  exampleSkills: string[];
}

export type Equipment = 
  | 'none'
  | 'pull_up_bar'
  | 'parallel_bars'
  | 'gymnastic_rings'
  | 'resistance_bands'
  | 'wall'
  | 'dip_station'
  | 'parallettes'
  | 'dumbbells'
  | 'barbell'
  | 'lat_pulldown'
  | 'cable_machine'
  | 'bench';

export type TrainingLocation = 'home' | 'gym';
export type UserRole = 'user' | 'admin';

export type DietPreference = 'vegetarian' | 'non_vegetarian' | 'vegan' | 'eggetarian';
export type FoodCuisine = 'indian' | 'south_indian' | 'north_indian' | 'mixed';
export type BudgetLevel = 'low' | 'medium' | 'high';

export interface FoodItem {
  id: string;
  name: string;
  category: 'breakfast' | 'lunch' | 'snack' | 'dinner';
  calories: number;
  proteinG: number;
  carbsG: number;
  fatG: number;
  dietType: DietPreference;
  cuisine: FoodCuisine;
  imageUrl?: string;
}

export interface MealLogItem {
  foodId: string;
  foodName: string;
  category: 'breakfast' | 'lunch' | 'snack' | 'dinner';
  calories: number;
  proteinG: number;
  carbsG: number;
  fatG: number;
  eaten: boolean;
}

export interface DailyNutritionLog {
  date: string;
  targetCalories: number;
  targetProteinG: number;
  targetCarbsG: number;
  targetFatG: number;
  consumedCalories: number;
  consumedProteinG: number;
  consumedCarbsG: number;
  consumedFatG: number;
  meals: MealLogItem[];
}

export interface ExerciseRequirement {
  exerciseId: string;
  targetValue: number;
  unit: 'reps' | 'seconds';
}

export interface Exercise {
  id: string;
  name: string;
  category: LevelCategory;
  level: LevelNumber;
  equipment: Equipment[];
  locationRequirement?: 'home_or_gym' | 'gym_only';
  primaryMuscles: string[];
  secondaryMuscles: string[];
  type: 'reps' | 'hold';
  defaultSets: number;
  defaultRepsOrHold: number;
  description: string;
  instructions: string[];
  commonMistakes: string[];
  safetyNotes?: string[];
  progressionId?: string;
  regressionId?: string;
  prerequisites: ExerciseRequirement[];
  videoThumbnail?: string;
  embedVideoUrl?: string;
}

export interface SkillNode {
  id: string;
  name: string;
  category: LevelCategory;
  level: LevelNumber;
  description: string;
  iconName: string;
  prerequisiteSkillIds: string[];
  exerciseRequirements: ExerciseRequirement[];
  unlocked: boolean;
  progressPercent: number;
  unlockedAt?: string;
  benefits: string[];
}

export interface DailyMissionItem {
  id: string;
  title: string;
  category: 'main' | 'strength' | 'skill' | 'nutrition' | 'recovery' | 'streak';
  xpReward: number;
  completed: boolean;
  description: string;
}

export interface AchievementBadge {
  id: string;
  title: string;
  description: string;
  icon: string;
  xpReward: number;
  unlocked: boolean;
  unlockedAt?: string;
}

export interface DailyCheckIn {
  date: string;
  energy: 'sleepy' | 'neutral' | 'good' | 'energetic' | 'fire';
  soreness: 'fresh' | 'mild' | 'sore';
  motivation: 'low' | 'neutral' | 'high' | 'fire';
}

export interface FriendUser {
  id: string;
  username: string;
  name: string;
  streak: number;
  xp: number;
  avatarUrl?: string;
}

export interface ConsistencyChallenge {
  id: string;
  friendId: string;
  friendName: string;
  title: string;
  daysDuration: number;
  myProgress: number;
  friendProgress: number;
  completed: boolean;
}

export interface UserAssessment {
  completed: boolean;
  age?: number;
  weightKg?: number;
  heightCm?: number;
  experienceYears?: number;
  availableDays: number;
  sessionDurationMins: number;
  trainingLocation: TrainingLocation;
  equipment: Equipment[];
  primaryGoal: 'master_skills' | 'build_muscle' | 'build_strength' | 'fat_loss' | 'general_fitness';
  
  dietPreference: DietPreference;
  cuisine: FoodCuisine;
  mealsPerDay: number;
  budget: BudgetLevel;

  maxPushups: number;
  maxPullups: number;
  maxDips: number;
  maxPlankSec: number;
  maxDeadHangSec: number;
  handstandSec: number;
}

export interface UserLevels {
  overall: LevelNumber;
  push: LevelNumber;
  pull: LevelNumber;
  core: LevelNumber;
  legs: LevelNumber;
  skill: LevelNumber;
  mobility: LevelNumber;
}

export interface PersonalRecord {
  exerciseId: string;
  exerciseName: string;
  recordValue: number;
  unit: 'reps' | 'seconds';
  date: string;
}

export interface WorkoutExerciseLogSet {
  setNumber: number;
  repsOrHold: number;
  completed: boolean;
  targetRepsOrHold: number;
}

export interface WorkoutExerciseLog {
  exerciseId: string;
  exerciseName: string;
  sets: WorkoutExerciseLogSet[];
  notes?: string;
}

export interface WorkoutLog {
  id: string;
  date: string;
  title: string;
  category: string;
  durationMinutes: number;
  exercises: WorkoutExerciseLog[];
  xpEarned: number;
  fatigueRating: 'low' | 'moderate' | 'high';
  notes?: string;
}

export interface UserProfile {
  id: string;
  username: string;
  email: string;
  name: string;
  role: UserRole;
  avatarUrl?: string;
  xp: number;
  streak: number;
  lastWorkoutDate?: string;
  assessment: UserAssessment;
  levels: UserLevels;
  unlockedSkillIds: string[];
  personalRecords: Record<string, PersonalRecord>;
  workoutHistory: WorkoutLog[];
  nutritionHistory: DailyNutritionLog[];
  fatigueLevel: 'low' | 'moderate' | 'high';
  dailyCheckIn?: DailyCheckIn;
}
