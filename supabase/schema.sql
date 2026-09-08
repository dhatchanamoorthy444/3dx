-- CALISTHENICS ROADMAP & NUTRITION PLATFORM
-- Complete PostgreSQL Database Schema for Supabase

-- 1. PROFILES & ROLES
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE NOT NULL,
  email TEXT NOT NULL,
  name TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  avatar_url TEXT,
  xp INTEGER NOT NULL DEFAULT 0,
  streak INTEGER NOT NULL DEFAULT 0,
  last_workout_date DATE,
  fatigue_level TEXT DEFAULT 'low' CHECK (fatigue_level IN ('low', 'moderate', 'high')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. ASSESSMENTS
CREATE TABLE IF NOT EXISTS public.assessments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  completed BOOLEAN NOT NULL DEFAULT FALSE,
  age INTEGER,
  weight_kg NUMERIC(5,2),
  height_cm NUMERIC(5,2),
  experience_years NUMERIC(4,1),
  available_days INTEGER DEFAULT 4,
  session_duration_mins INTEGER DEFAULT 45,
  training_location TEXT DEFAULT 'home' CHECK (training_location IN ('home', 'gym')),
  primary_goal TEXT DEFAULT 'master_skills',
  diet_preference TEXT DEFAULT 'vegetarian',
  cuisine TEXT DEFAULT 'indian',
  meals_per_day INTEGER DEFAULT 4,
  budget TEXT DEFAULT 'medium',
  max_pushups INTEGER DEFAULT 0,
  max_pullups INTEGER DEFAULT 0,
  max_dips INTEGER DEFAULT 0,
  max_plank_sec INTEGER DEFAULT 0,
  max_dead_hang_sec INTEGER DEFAULT 0,
  handstand_sec INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. GOALS & PREFERENCES
CREATE TABLE IF NOT EXISTS public.goals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  goal_type TEXT NOT NULL,
  target_value NUMERIC(6,2),
  completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. EQUIPMENT
CREATE TABLE IF NOT EXISTS public.user_equipment (
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  equipment_item TEXT NOT NULL,
  PRIMARY KEY (user_id, equipment_item)
);

-- 5. EXERCISES
CREATE TABLE IF NOT EXISTS public.exercises (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  level INTEGER NOT NULL CHECK (level BETWEEN 1 AND 8),
  location_requirement TEXT DEFAULT 'home_or_gym',
  primary_muscles TEXT[] NOT NULL,
  secondary_muscles TEXT[],
  type TEXT NOT NULL CHECK (type IN ('reps', 'hold')),
  default_sets INTEGER DEFAULT 3,
  default_reps_or_hold INTEGER DEFAULT 10,
  description TEXT NOT NULL,
  instructions TEXT[] NOT NULL,
  common_mistakes TEXT[] NOT NULL,
  safety_notes TEXT[],
  progression_id TEXT REFERENCES public.exercises(id),
  regression_id TEXT REFERENCES public.exercises(id),
  video_thumbnail TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 6. EXERCISE PROGRESSIONS & PREREQUISITES
CREATE TABLE IF NOT EXISTS public.exercise_prerequisites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  exercise_id TEXT NOT NULL REFERENCES public.exercises(id) ON DELETE CASCADE,
  prerequisite_exercise_id TEXT NOT NULL REFERENCES public.exercises(id) ON DELETE CASCADE,
  target_value INTEGER NOT NULL,
  unit TEXT NOT NULL CHECK (unit IN ('reps', 'seconds'))
);

-- 7. SKILLS
CREATE TABLE IF NOT EXISTS public.skills (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  level INTEGER NOT NULL CHECK (level BETWEEN 1 AND 8),
  description TEXT NOT NULL,
  icon_name TEXT NOT NULL,
  benefits TEXT[] NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 8. SKILL PREREQUISITES
CREATE TABLE IF NOT EXISTS public.skill_prerequisites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  skill_id TEXT NOT NULL REFERENCES public.skills(id) ON DELETE CASCADE,
  exercise_id TEXT NOT NULL REFERENCES public.exercises(id) ON DELETE CASCADE,
  target_value INTEGER NOT NULL,
  unit TEXT NOT NULL CHECK (unit IN ('reps', 'seconds'))
);

-- 9. WORKOUT PROGRAMS
CREATE TABLE IF NOT EXISTS public.workout_programs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  location TEXT NOT NULL CHECK (location IN ('home', 'gym')),
  tier_level INTEGER NOT NULL CHECK (tier_level BETWEEN 1 AND 8),
  description TEXT NOT NULL
);

-- 10. WORKOUT DAYS
CREATE TABLE IF NOT EXISTS public.workout_days (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  program_id UUID NOT NULL REFERENCES public.workout_programs(id) ON DELETE CASCADE,
  day_number INTEGER NOT NULL,
  focus_title TEXT NOT NULL
);

-- 11. WORKOUT EXERCISES
CREATE TABLE IF NOT EXISTS public.workout_exercises (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workout_day_id UUID NOT NULL REFERENCES public.workout_days(id) ON DELETE CASCADE,
  exercise_id TEXT NOT NULL REFERENCES public.exercises(id),
  sets INTEGER NOT NULL,
  reps_or_hold INTEGER NOT NULL
);

-- 12. WORKOUT SESSIONS
CREATE TABLE IF NOT EXISTS public.workout_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  duration_minutes INTEGER NOT NULL,
  xp_earned INTEGER NOT NULL,
  fatigue_rating TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 13. WORKOUT SETS
CREATE TABLE IF NOT EXISTS public.workout_sets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID NOT NULL REFERENCES public.workout_sessions(id) ON DELETE CASCADE,
  exercise_id TEXT NOT NULL REFERENCES public.exercises(id),
  set_number INTEGER NOT NULL,
  reps_or_hold INTEGER NOT NULL,
  completed BOOLEAN NOT NULL DEFAULT FALSE
);

-- 14. PERSONAL RECORDS
CREATE TABLE IF NOT EXISTS public.personal_records (
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  exercise_id TEXT REFERENCES public.exercises(id) ON DELETE CASCADE,
  record_value INTEGER NOT NULL,
  unit TEXT NOT NULL,
  achieved_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (user_id, exercise_id)
);

-- 15. SKILL PROGRESS
CREATE TABLE IF NOT EXISTS public.skill_progress (
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  skill_id TEXT REFERENCES public.skills(id) ON DELETE CASCADE,
  unlocked BOOLEAN NOT NULL DEFAULT FALSE,
  unlocked_at TIMESTAMPTZ,
  PRIMARY KEY (user_id, skill_id)
);

-- 16. FOODS
CREATE TABLE IF NOT EXISTS public.foods (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('breakfast', 'lunch', 'snack', 'dinner')),
  calories INTEGER NOT NULL,
  protein_g NUMERIC(5,1) NOT NULL,
  carbs_g NUMERIC(5,1) NOT NULL,
  fat_g NUMERIC(5,1) NOT NULL,
  diet_type TEXT NOT NULL,
  cuisine TEXT NOT NULL,
  image_url TEXT
);

-- 17. MEALS & NUTRITION LOGS
CREATE TABLE IF NOT EXISTS public.daily_nutrition_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  log_date DATE NOT NULL DEFAULT CURRENT_DATE,
  consumed_calories INTEGER DEFAULT 0,
  consumed_protein_g NUMERIC(5,1) DEFAULT 0,
  consumed_carbs_g NUMERIC(5,1) DEFAULT 0,
  consumed_fat_g NUMERIC(5,1) DEFAULT 0,
  UNIQUE(user_id, log_date)
);

-- 18. MEAL LOG ITEMS
CREATE TABLE IF NOT EXISTS public.meal_log_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nutrition_log_id UUID NOT NULL REFERENCES public.daily_nutrition_logs(id) ON DELETE CASCADE,
  food_id TEXT NOT NULL REFERENCES public.foods(id),
  eaten BOOLEAN DEFAULT FALSE
);

-- 19. DAILY MISSIONS
CREATE TABLE IF NOT EXISTS public.daily_missions (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  xp_reward INTEGER NOT NULL,
  description TEXT NOT NULL
);

-- 20. USER MISSIONS
CREATE TABLE IF NOT EXISTS public.user_missions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  mission_id TEXT NOT NULL REFERENCES public.daily_missions(id),
  completed BOOLEAN DEFAULT FALSE,
  assigned_date DATE DEFAULT CURRENT_DATE
);

-- 21. ACHIEVEMENTS & BADGES
CREATE TABLE IF NOT EXISTS public.achievements (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL,
  xp_reward INTEGER NOT NULL
);

-- 22. USER ACHIEVEMENTS
CREATE TABLE IF NOT EXISTS public.user_achievements (
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  achievement_id TEXT REFERENCES public.achievements(id) ON DELETE CASCADE,
  unlocked_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (user_id, achievement_id)
);

-- 23. STREAKS
CREATE TABLE IF NOT EXISTS public.streaks (
  user_id UUID PRIMARY KEY REFERENCES public.profiles(id) ON DELETE CASCADE,
  current_streak INTEGER DEFAULT 0,
  longest_streak INTEGER DEFAULT 0,
  streak_protected BOOLEAN DEFAULT FALSE,
  last_active_date DATE
);

-- 24. FRIENDS & SOCIAL
CREATE TABLE IF NOT EXISTS public.friends (
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  friend_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'accepted' CHECK (status IN ('pending', 'accepted')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (user_id, friend_id)
);

-- 25. CONSISTENCY CHALLENGES
CREATE TABLE IF NOT EXISTS public.challenges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  creator_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  opponent_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  days_duration INTEGER DEFAULT 7,
  completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 26. NOTIFICATIONS
CREATE TABLE IF NOT EXISTS public.notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.personal_records ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public Profiles Read" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users Update Own Profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users Manage Own Assessment" ON public.assessments FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users Manage Own Personal Records" ON public.personal_records FOR ALL USING (auth.uid() = user_id);
