import { SkillNode } from '../types/calisthenics';

export const SKILL_TREE: SkillNode[] = [
  // --- PUSH SKILLS ---
  {
    id: 'skill_pushup_mastery',
    name: 'Push-Up Mastery',
    category: 'push',
    level: 2,
    description: 'Foundation for all horizontal pressing skills.',
    iconName: 'Flame',
    prerequisiteSkillIds: [],
    exerciseRequirements: [
      { exerciseId: 'standard_pushup', targetValue: 15, unit: 'reps' }
    ],
    unlocked: true,
    progressPercent: 100,
    benefits: ['Triceps & Pectoral activation', 'Scapular control', 'Core alignment']
  },
  {
    id: 'skill_dips_mastery',
    name: 'Bar Dips Mastery',
    category: 'push',
    level: 3,
    description: 'Vertical pressing power foundation required for muscle-ups and handstand work.',
    iconName: 'Shield',
    prerequisiteSkillIds: ['skill_pushup_mastery'],
    exerciseRequirements: [
      { exerciseId: 'standard_dips', targetValue: 10, unit: 'reps' }
    ],
    unlocked: false,
    progressPercent: 0,
    benefits: ['Chest dip power', 'Shoulder stability', 'Tricep lock out']
  },
  {
    id: 'skill_handstand_pushup',
    name: 'Handstand Push-Up',
    category: 'push',
    level: 6,
    description: 'Ultimate vertical pushing strength upside down against bodyweight.',
    iconName: 'ArrowUpCircle',
    prerequisiteSkillIds: ['skill_dips_mastery', 'skill_handstand'],
    exerciseRequirements: [
      { exerciseId: 'handstand_pushup_wall', targetValue: 5, unit: 'reps' },
      { exerciseId: 'pike_pushup', targetValue: 12, unit: 'reps' }
    ],
    unlocked: false,
    progressPercent: 0,
    benefits: ['Massive shoulder hypertrophy', 'Overhead strength', 'Inverted balance']
  },
  {
    id: 'skill_planche',
    name: 'Planche Progression',
    category: 'push',
    level: 8,
    description: 'The pinnacle bodyweight horizontal balance supported purely by hands.',
    iconName: 'Zap',
    prerequisiteSkillIds: ['skill_handstand_pushup'],
    exerciseRequirements: [
      { exerciseId: 'tuck_planche', targetValue: 15, unit: 'seconds' }
    ],
    unlocked: false,
    progressPercent: 0,
    benefits: ['Extreme anterior shoulder power', 'Bicep tendon strength', 'Core mastery']
  },

  // --- PULL SKILLS ---
  {
    id: 'skill_pullup_foundation',
    name: 'Pull-Up Foundation',
    category: 'pull',
    level: 3,
    description: 'The gateway to all advanced upper body back and arm skills.',
    iconName: 'Award',
    prerequisiteSkillIds: [],
    exerciseRequirements: [
      { exerciseId: 'standard_pullup', targetValue: 8, unit: 'reps' }
    ],
    unlocked: false,
    progressPercent: 0,
    benefits: ['V-Taper back development', 'Lat recruitment', 'Grip strength']
  },
  {
    id: 'skill_muscleup',
    name: 'Bar Muscle-Up',
    category: 'pull',
    level: 6,
    description: 'Iconic calisthenics skill combining explosive pull with rapid bar transition.',
    iconName: 'TrendingUp',
    prerequisiteSkillIds: ['skill_pullup_foundation', 'skill_dips_mastery'],
    exerciseRequirements: [
      { exerciseId: 'standard_pullup', targetValue: 10, unit: 'reps' },
      { exerciseId: 'standard_dips', targetValue: 12, unit: 'reps' },
      { exerciseId: 'chest_to_bar_pullup', targetValue: 6, unit: 'reps' }
    ],
    unlocked: false,
    progressPercent: 0,
    benefits: ['Explosive pulling velocity', 'Transition coordination', 'Freestyle entry']
  },
  {
    id: 'skill_front_lever',
    name: 'Front Lever',
    category: 'pull',
    level: 7,
    description: 'Straight-arm pulling horizontal lever suspended from bar.',
    iconName: 'Layers',
    prerequisiteSkillIds: ['skill_pullup_foundation', 'skill_lsit'],
    exerciseRequirements: [
      { exerciseId: 'tuck_front_lever', targetValue: 15, unit: 'seconds' },
      { exerciseId: 'standard_pullup', targetValue: 12, unit: 'reps' }
    ],
    unlocked: false,
    progressPercent: 0,
    benefits: ['Scapular depression', 'Straight-arm lats', 'Full posterior core']
  },
  {
    id: 'skill_one_arm_pullup',
    name: 'One-Arm Pull-Up',
    category: 'pull',
    level: 7,
    description: 'Elite unilateral pulling strength matching bodyweight on a single arm.',
    iconName: 'Target',
    prerequisiteSkillIds: ['skill_pullup_foundation'],
    exerciseRequirements: [
      { exerciseId: 'standard_pullup', targetValue: 20, unit: 'reps' }
    ],
    unlocked: false,
    progressPercent: 0,
    benefits: ['Unilateral lat symmetry', 'Iron grip', 'Brachialis power']
  },

  // --- CORE SKILLS ---
  {
    id: 'skill_plank_foundation',
    name: 'Core Stability',
    category: 'core',
    level: 2,
    description: 'Baseline pelvic control and transverse abdominal brace.',
    iconName: 'ShieldAlert',
    prerequisiteSkillIds: [],
    exerciseRequirements: [
      { exerciseId: 'plank_hold', targetValue: 60, unit: 'seconds' }
    ],
    unlocked: true,
    progressPercent: 100,
    benefits: ['Lower back safety', 'Anti-extension stability', 'Posture baseline']
  },
  {
    id: 'skill_lsit',
    name: 'L-Sit Hold',
    category: 'core',
    level: 5,
    description: 'Gymnastic straight-leg support hold testing hip flexors and abs.',
    iconName: 'Compass',
    prerequisiteSkillIds: ['skill_plank_foundation'],
    exerciseRequirements: [
      { exerciseId: 'full_lsit', targetValue: 10, unit: 'seconds' },
      { exerciseId: 'tuck_lsit', targetValue: 15, unit: 'seconds' }
    ],
    unlocked: false,
    progressPercent: 0,
    benefits: ['Hip flexor endurance', 'Depression support', 'Ab compression']
  },
  {
    id: 'skill_dragon_flag',
    name: 'Dragon Flag',
    category: 'core',
    level: 6,
    description: 'Bruce Lee lever maintaining rigid hollow straight line on shoulder blade pivot.',
    iconName: 'Flag',
    prerequisiteSkillIds: ['skill_lsit'],
    exerciseRequirements: [
      { exerciseId: 'dragon_flag', targetValue: 5, unit: 'reps' }
    ],
    unlocked: false,
    progressPercent: 0,
    benefits: ['Full anterior abdominal tension', 'Lat-core connection', 'Body control']
  },

  // --- SKILLS & BALANCE ---
  {
    id: 'skill_handstand',
    name: 'Freestanding Handstand',
    category: 'skill',
    level: 4,
    description: 'The foundation of all balance, shoulder alignment, and inverted control.',
    iconName: 'Crosshair',
    prerequisiteSkillIds: ['skill_pushup_mastery'],
    exerciseRequirements: [
      { exerciseId: 'wall_handstand', targetValue: 45, unit: 'seconds' },
      { exerciseId: 'crow_pose', targetValue: 20, unit: 'seconds' }
    ],
    unlocked: false,
    progressPercent: 0,
    benefits: ['Proprioception', 'Wrist conditioning', 'Overhead alignment']
  },
  {
    id: 'skill_pistol_squat',
    name: 'Pistol Squat Mastery',
    category: 'legs',
    level: 4,
    description: 'Complete unassisted single leg deep squat with ankle mobility.',
    iconName: 'Activity',
    prerequisiteSkillIds: [],
    exerciseRequirements: [
      { exerciseId: 'pistol_squat', targetValue: 5, unit: 'reps' }
    ],
    unlocked: false,
    progressPercent: 0,
    benefits: ['Single leg power', 'Ankle dorsiflexion', 'Knee joint resilience']
  }
];
