import { Exercise, LevelInfo } from '../types/calisthenics';

export const LEVEL_DEFINITIONS: LevelInfo[] = [
  {
    level: 1,
    title: 'Absolute Beginner',
    badgeColor: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    description: 'Build baseline anatomical strength, joint tolerance, and initial coordination.',
    exampleSkills: ['Wall Push-up', 'Assisted Squat', 'Dead Hang', 'Scapular Pulls']
  },
  {
    level: 2,
    title: 'Foundation',
    badgeColor: 'bg-green-500/20 text-green-400 border-green-500/30',
    description: 'Master bodyweight basics with clean form and core stability.',
    exampleSkills: ['Standard Push-up', 'Australian Row', 'Plank (60s)', 'Support Hold']
  },
  {
    level: 3,
    title: 'Beginner',
    badgeColor: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
    description: 'Transition to bodyweight pulling & pushing over parallel bars.',
    exampleSkills: ['Pull-up', 'Bar Dips', 'Knee L-Sit', 'Wall Handstand']
  },
  {
    level: 4,
    title: 'Intermediate',
    badgeColor: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    description: 'Develop unilateral power and inverted balance control.',
    exampleSkills: ['Diamond Push-up', 'Pistol Squat', 'Freestanding Handstand', 'Archer Rows']
  },
  {
    level: 5,
    title: 'Advanced Beginner',
    badgeColor: 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30',
    description: 'Explosive pulling, transition strength, and straight-arm levers.',
    exampleSkills: ['Chest-to-Bar Pull-up', 'High Dips', 'Tuck L-Sit', 'Tuck Planche Hold']
  },
  {
    level: 6,
    title: 'Advanced',
    badgeColor: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    description: 'Elite dynamic combinations and full body leverage skills.',
    exampleSkills: ['Bar Muscle-Up', 'Handstand Push-up (Wall)', 'Tuck Front Lever', 'Full L-Sit']
  },
  {
    level: 7,
    title: 'Elite',
    badgeColor: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    description: 'Mastery of body leverage, extreme straight-arm & unilateral power.',
    exampleSkills: ['One-Arm Pull-up', 'Full Front Lever', 'Straddle Planche', 'Freestanding HSPU']
  },
  {
    level: 8,
    title: 'Master',
    badgeColor: 'bg-rose-500/20 text-rose-400 border-rose-500/30',
    description: 'Peak bodyweight strength and complex freestyle flow.',
    exampleSkills: ['Full Planche', 'One-Arm Handstand', 'Manna', 'Victorian Cross']
  }
];

export const EXERCISES_DATABASE: Exercise[] = [
  // --- PUSH EXERCISES ---
  {
    id: 'wall_pushup',
    name: 'Wall Push-up',
    category: 'push',
    level: 1,
    equipment: ['wall'],
    primaryMuscles: ['Pectorals', 'Anterior Deltoids'],
    secondaryMuscles: ['Triceps', 'Core'],
    type: 'reps',
    defaultSets: 3,
    defaultRepsOrHold: 15,
    description: 'Low-impact pressing progression against a vertical surface to build movement patterns.',
    instructions: [
      'Stand facing a wall at arm length distance.',
      'Place hands on wall slightly wider than shoulder-width.',
      'Lower your chest towards the wall keeping your torso stiff.',
      'Push back out until arms are straight without locking elbows violently.'
    ],
    commonMistakes: [
      'Flaring elbows out horizontally at 90 degrees.',
      'Arching lower back.',
      'Bending at hips.'
    ],
    safetyNotes: ['Keep wrists aligned and core braced.'],
    progressionId: 'incline_pushup',
    prerequisites: []
  },
  {
    id: 'incline_pushup',
    name: 'Incline Push-up',
    category: 'push',
    level: 1,
    equipment: ['none'],
    primaryMuscles: ['Pectorals', 'Triceps'],
    secondaryMuscles: ['Anterior Deltoids', 'Core'],
    type: 'reps',
    defaultSets: 3,
    defaultRepsOrHold: 12,
    description: 'Elevated surface push-up reducing loaded bodyweight percentage.',
    instructions: [
      'Place hands on a bench, chair, or sturdy elevated surface.',
      'Step feet back into a straight line plank.',
      'Lower chest to touch the edge, keeping elbows at 45 degrees.',
      'Press firmly back up.'
    ],
    commonMistakes: ['Sagging hips', 'Incomplete range of motion'],
    progressionId: 'knee_pushup',
    regressionId: 'wall_pushup',
    prerequisites: [{ exerciseId: 'wall_pushup', targetValue: 15, unit: 'reps' }]
  },
  {
    id: 'knee_pushup',
    name: 'Knee Push-up',
    category: 'push',
    level: 1,
    equipment: ['none'],
    primaryMuscles: ['Pectorals', 'Triceps', 'Deltoids'],
    secondaryMuscles: ['Core'],
    type: 'reps',
    defaultSets: 3,
    defaultRepsOrHold: 10,
    description: 'Floor-based push-up with knees grounded to lower resistance.',
    instructions: [
      'Kneel on the mat with knees hip-width apart.',
      'Walk hands forward into a modified plank with straight line from head to knees.',
      'Lower chest until 1 inch off the ground, press up smoothly.'
    ],
    commonMistakes: ['Hips stuck up in air', 'Dropping head first'],
    progressionId: 'standard_pushup',
    regressionId: 'incline_pushup',
    prerequisites: [{ exerciseId: 'incline_pushup', targetValue: 12, unit: 'reps' }]
  },
  {
    id: 'standard_pushup',
    name: 'Standard Push-up',
    category: 'push',
    level: 2,
    equipment: ['none'],
    primaryMuscles: ['Pectorals', 'Triceps', 'Anterior Deltoids'],
    secondaryMuscles: ['Core', 'Serratus Anterior'],
    type: 'reps',
    defaultSets: 4,
    defaultRepsOrHold: 10,
    description: 'The classic chest and arm bodyweight pushing baseline.',
    instructions: [
      'Place hands slightly wider than shoulder-width on the floor.',
      'Form a rigid plank from shoulders to heels.',
      'Lower full body controlled until chest lightly touches floor.',
      'Press up while keeping glutes locked.'
    ],
    commonMistakes: ['Flaring elbows to 90 degrees', 'Hips drooping', 'Half reps'],
    progressionId: 'diamond_pushup',
    regressionId: 'knee_pushup',
    prerequisites: [{ exerciseId: 'knee_pushup', targetValue: 12, unit: 'reps' }]
  },
  {
    id: 'parallel_dips_assisted',
    name: 'Assisted Parallel Bar Dips',
    category: 'push',
    level: 2,
    equipment: ['parallel_bars', 'resistance_bands'],
    primaryMuscles: ['Triceps', 'Lower Pectorals'],
    secondaryMuscles: ['Anterior Deltoids', 'Core'],
    type: 'reps',
    defaultSets: 3,
    defaultRepsOrHold: 8,
    description: 'Vertical pushing using resistance bands over dip handles.',
    instructions: [
      'Loop resistance band across dip handles.',
      'Place knees or feet in band loop.',
      'Lower body until elbows reach 90 degrees.',
      'Drive upwards through palms.'
    ],
    commonMistakes: ['Shrugging shoulders near ears', 'Diving forward too far'],
    progressionId: 'standard_dips',
    prerequisites: [{ exerciseId: 'standard_pushup', targetValue: 10, unit: 'reps' }]
  },
  {
    id: 'standard_dips',
    name: 'Parallel Bar Dips',
    category: 'push',
    level: 3,
    equipment: ['parallel_bars'],
    primaryMuscles: ['Triceps', 'Lower Chest', 'Anterior Deltoids'],
    secondaryMuscles: ['Core'],
    type: 'reps',
    defaultSets: 3,
    defaultRepsOrHold: 8,
    description: 'Full vertical pushing pressing whole bodyweight.',
    instructions: [
      'Grasp bars, jump up into straight-arm support hold.',
      'Depress scapula (push shoulders down).',
      'Bend elbows leaning torso slightly forward to 90 degrees depth.',
      'Lock out arms smoothly.'
    ],
    commonMistakes: ['Bouncing at the bottom', 'Shoulder internal collapse'],
    progressionId: 'diamond_pushup',
    regressionId: 'parallel_dips_assisted',
    prerequisites: [{ exerciseId: 'standard_pushup', targetValue: 15, unit: 'reps' }]
  },
  {
    id: 'diamond_pushup',
    name: 'Diamond Push-up',
    category: 'push',
    level: 3,
    equipment: ['none'],
    primaryMuscles: ['Triceps', 'Inner Chest'],
    secondaryMuscles: ['Anterior Deltoids'],
    type: 'reps',
    defaultSets: 3,
    defaultRepsOrHold: 10,
    description: 'Close-grip push-up targeting high triceps tension.',
    instructions: [
      'Bring hands together beneath chest forming a diamond shape with thumbs and index fingers.',
      'Maintain tight plank.',
      'Lower chest towards hands, keeping elbows tucked close to ribcage.',
      'Push up.'
    ],
    commonMistakes: ['Elbows flaring wide', 'Sagging belly'],
    progressionId: 'archer_pushup',
    regressionId: 'standard_pushup',
    prerequisites: [{ exerciseId: 'standard_pushup', targetValue: 15, unit: 'reps' }]
  },
  {
    id: 'archer_pushup',
    name: 'Archer Push-up',
    category: 'push',
    level: 4,
    equipment: ['none'],
    primaryMuscles: ['Pectorals', 'Triceps'],
    secondaryMuscles: ['Core', 'Shoulders'],
    type: 'reps',
    defaultSets: 3,
    defaultRepsOrHold: 6,
    description: 'Unilateral pushing progression extending one arm out straight.',
    instructions: [
      'Set hands very wide in push-up stance.',
      'Lower body over to right side, bending right arm while keeping left arm extended straight.',
      'Press back to center, then switch sides.'
    ],
    commonMistakes: ['Bending assistance arm', 'Twisting hips off-center'],
    progressionId: 'one_arm_pushup',
    regressionId: 'diamond_pushup',
    prerequisites: [{ exerciseId: 'diamond_pushup', targetValue: 12, unit: 'reps' }]
  },
  {
    id: 'pike_pushup',
    name: 'Pike Push-up',
    category: 'push',
    level: 4,
    equipment: ['none'],
    primaryMuscles: ['Anterior Deltoids', 'Triceps'],
    secondaryMuscles: ['Upper Chest', 'Core'],
    type: 'reps',
    defaultSets: 3,
    defaultRepsOrHold: 8,
    description: 'Vertical overhead pressing progression angled with hips high.',
    instructions: [
      'Start in downward dog position with hips elevated into a V-shape.',
      'Look towards feet.',
      'Lower crown of head forward creating a tripod triangle with hands.',
      'Push back up into pike.'
    ],
    commonMistakes: ['Lowering head straight down between hands instead of forward tripod'],
    progressionId: 'handstand_pushup_wall',
    prerequisites: [{ exerciseId: 'standard_pushup', targetValue: 15, unit: 'reps' }]
  },
  {
    id: 'one_arm_pushup',
    name: 'One-Arm Push-up',
    category: 'push',
    level: 7,
    equipment: ['none'],
    primaryMuscles: ['Pectorals', 'Triceps', 'Core Obliques'],
    secondaryMuscles: ['Deltoids', 'Glutes'],
    type: 'reps',
    defaultSets: 3,
    defaultRepsOrHold: 4,
    description: 'Elite unilateral pushing mastery demanding intense anti-rotational core strength.',
    instructions: [
      'Feet wide for base stability, place one hand behind back.',
      'Center working hand beneath sternum.',
      'Lower chest down smoothly without twisting hips.',
      'Explosively press up.'
    ],
    commonMistakes: ['Excessive side twisting', 'Resting hips'],
    regressionId: 'archer_pushup',
    prerequisites: [{ exerciseId: 'archer_pushup', targetValue: 10, unit: 'reps' }]
  },
  {
    id: 'handstand_pushup_wall',
    name: 'Wall Handstand Push-up',
    category: 'push',
    level: 6,
    equipment: ['wall'],
    primaryMuscles: ['Anterior & Lateral Deltoids', 'Triceps'],
    secondaryMuscles: ['Upper Chest', 'Traps', 'Core'],
    type: 'reps',
    defaultSets: 3,
    defaultRepsOrHold: 5,
    description: 'Full vertical overhead pressing matching whole body weight against wall support.',
    instructions: [
      'Kick up into chest-to-wall handstand.',
      'Maintain hollow body shape.',
      'Lower head forward until forehead/head lightly touches mat.',
      'Press vertically to full arm extension.'
    ],
    commonMistakes: ['Arched banana spine', 'Elbows flaring 90 degrees'],
    regressionId: 'pike_pushup',
    prerequisites: [{ exerciseId: 'pike_pushup', targetValue: 12, unit: 'reps' }]
  },

  // --- GYM SPECIFIC EXERCISES ---
  {
    id: 'lat_pulldown_gym',
    name: 'Lat Pulldown (Gym)',
    category: 'pull',
    level: 2,
    equipment: ['lat_pulldown'],
    locationRequirement: 'gym_only',
    primaryMuscles: ['Latissimus Dorsi', 'Biceps'],
    secondaryMuscles: ['Rear Deltoids', 'Rhomboids'],
    type: 'reps',
    defaultSets: 3,
    defaultRepsOrHold: 10,
    description: 'Gym cable vertical pull ideal for building base strength for pull-ups.',
    instructions: [
      'Sit on lat pulldown station with thighs secured under pads.',
      'Grasp bar slightly wider than shoulder-width.',
      'Pull bar smoothly down to upper chest while depressing shoulder blades.',
      'Return with control.'
    ],
    commonMistakes: ['Leaning back too far', 'Pulling bar behind neck'],
    prerequisites: []
  },
  {
    id: 'incline_dumbbell_press_gym',
    name: 'Incline Dumbbell Press (Gym)',
    category: 'push',
    level: 3,
    equipment: ['dumbbells', 'bench'],
    locationRequirement: 'gym_only',
    primaryMuscles: ['Upper Pectorals', 'Anterior Deltoids', 'Triceps'],
    secondaryMuscles: ['Core'],
    type: 'reps',
    defaultSets: 3,
    defaultRepsOrHold: 10,
    description: 'Unilateral free-weight overhead pushing for chest and shoulder hyper-activation.',
    instructions: [
      'Set incline bench to 30 degrees.',
      'Sit back holding dumbbells at shoulder level.',
      'Press dumbbells straight up above upper chest.',
      'Lower controlled.'
    ],
    commonMistakes: ['Excessive arching', 'Collapsing weights together at top'],
    prerequisites: []
  },
  {
    id: 'barbell_squat_gym',
    name: 'Barbell Back Squat (Gym)',
    category: 'legs',
    level: 3,
    equipment: ['barbell'],
    locationRequirement: 'gym_only',
    primaryMuscles: ['Quadriceps', 'Glutes', 'Adductors'],
    secondaryMuscles: ['Spinal Erectors', 'Hamstrings'],
    type: 'reps',
    defaultSets: 4,
    defaultRepsOrHold: 8,
    description: 'Heavy compound leg building standard to supplement bodyweight pistols.',
    instructions: [
      'Rest barbell across upper traps.',
      'Step out, feet shoulder-width.',
      'Squat below parallel keeping knees tracking over toes.',
      'Drive back up.'
    ],
    commonMistakes: ['Knee collapse', 'Winking hips'],
    prerequisites: []
  },

  // --- PULL EXERCISES ---
  {
    id: 'dead_hang',
    name: 'Dead Hang',
    category: 'pull',
    level: 1,
    equipment: ['pull_up_bar'],
    primaryMuscles: ['Forearm Flexors', 'Grip Strength'],
    secondaryMuscles: ['Lats', 'Shoulder Capsules'],
    type: 'hold',
    defaultSets: 3,
    defaultRepsOrHold: 30,
    description: 'Passive hanging from a bar to condition grip, tendon strength, and shoulder decompression.',
    instructions: [
      'Grasp pull-up bar with overhand grip shoulder-width apart.',
      'Allow body to hang freely, letting shoulders stretch upward naturally.',
      'Hold position breathing steadily.'
    ],
    commonMistakes: ['Holding breath', 'Swinging legs'],
    progressionId: 'scapular_pulls',
    prerequisites: []
  },
  {
    id: 'scapular_pulls',
    name: 'Scapular Pull-up',
    category: 'pull',
    level: 1,
    equipment: ['pull_up_bar'],
    primaryMuscles: ['Lower Traps', 'Rhomboids', 'Lats'],
    secondaryMuscles: ['Grip'],
    type: 'reps',
    defaultSets: 3,
    defaultRepsOrHold: 10,
    description: 'Isolating shoulder blade depression to trigger proper pulling activation.',
    instructions: [
      'Start in a dead hang with straight arms.',
      'Without bending elbows, pull shoulder blades down and back.',
      'Chest lifts slightly upward.',
      'Pause for 1 second, then release back to hang.'
    ],
    commonMistakes: ['Bending elbows to cheat height', 'Kicking legs'],
    progressionId: 'australian_row',
    regressionId: 'dead_hang',
    prerequisites: [{ exerciseId: 'dead_hang', targetValue: 30, unit: 'seconds' }]
  },
  {
    id: 'australian_row',
    name: 'Australian Row (Inverted Row)',
    category: 'pull',
    level: 2,
    equipment: ['parallel_bars', 'pull_up_bar'],
    primaryMuscles: ['Rhomboids', 'Rear Deltoids', 'Lats'],
    secondaryMuscles: ['Biceps', 'Core'],
    type: 'reps',
    defaultSets: 3,
    defaultRepsOrHold: 10,
    description: 'Horizontal pulling exercise adjusting body angle to build upper back base.',
    instructions: [
      'Hang underneath a waist-high bar with heels on floor and body straight.',
      'Pull chest up to touch the bar while driving elbows back.',
      'Squeeze shoulder blades together at top.',
      'Lower with full control.'
    ],
    commonMistakes: ['Sagging hips', 'Not touching bar with chest'],
    progressionId: 'assisted_pullup',
    regressionId: 'scapular_pulls',
    prerequisites: [{ exerciseId: 'scapular_pulls', targetValue: 10, unit: 'reps' }]
  },
  {
    id: 'assisted_pullup',
    name: 'Band Assisted Pull-up',
    category: 'pull',
    level: 2,
    equipment: ['pull_up_bar', 'resistance_bands'],
    primaryMuscles: ['Latissimus Dorsi', 'Biceps'],
    secondaryMuscles: ['Rear Deltoids', 'Core'],
    type: 'reps',
    defaultSets: 3,
    defaultRepsOrHold: 8,
    description: 'Vertical pulling assisted by elastic resistance band.',
    instructions: [
      'Attach band to pull-up bar, step foot into loop.',
      'Hang with full arm extension.',
      'Pull chin cleanly over bar.',
      'Lower slowly under control.'
    ],
    commonMistakes: ['Using band momentum to bounce', 'Half reps'],
    progressionId: 'negative_pullup',
    regressionId: 'australian_row',
    prerequisites: [{ exerciseId: 'australian_row', targetValue: 10, unit: 'reps' }]
  },
  {
    id: 'negative_pullup',
    name: 'Negative Pull-up',
    category: 'pull',
    level: 3,
    equipment: ['pull_up_bar'],
    primaryMuscles: ['Latissimus Dorsi', 'Biceps', 'Brachialis'],
    secondaryMuscles: ['Core'],
    type: 'reps',
    defaultSets: 3,
    defaultRepsOrHold: 5,
    description: 'Slow eccentric lowering from top chin-over-bar position to overload pulling capacity.',
    instructions: [
      'Jump or use a box to get chin over bar.',
      'Pause at top for 1 second.',
      'Lower body as slowly as possible (targeting 3-5 seconds lowering phase) until arms are extended.'
    ],
    commonMistakes: ['Dropping fast midway', 'Not completing full arm hang at bottom'],
    progressionId: 'standard_pullup',
    regressionId: 'assisted_pullup',
    prerequisites: [{ exerciseId: 'assisted_pullup', targetValue: 8, unit: 'reps' }]
  },
  {
    id: 'standard_pullup',
    name: 'Standard Pull-up',
    category: 'pull',
    level: 3,
    equipment: ['pull_up_bar'],
    primaryMuscles: ['Latissimus Dorsi', 'Biceps', 'Teres Major'],
    secondaryMuscles: ['Upper Back', 'Abs'],
    type: 'reps',
    defaultSets: 4,
    defaultRepsOrHold: 6,
    description: 'The golden standard of upper body pulling strength.',
    instructions: [
      'Grasp bar overhand slightly wider than shoulders.',
      'Depress scapula, then pull chest towards bar.',
      'Pull until chin clears bar cleanly.',
      'Lower under total control back to dead hang.'
    ],
    commonMistakes: ['Kipping legs', 'Reaching chin up without moving chest up'],
    progressionId: 'chest_to_bar_pullup',
    regressionId: 'negative_pullup',
    prerequisites: [{ exerciseId: 'negative_pullup', targetValue: 5, unit: 'reps' }]
  },
  {
    id: 'chest_to_bar_pullup',
    name: 'Chest-to-Bar Pull-up',
    category: 'pull',
    level: 5,
    equipment: ['pull_up_bar'],
    primaryMuscles: ['Lats', 'Upper Traps', 'Biceps'],
    secondaryMuscles: ['Rear Delts', 'Core'],
    type: 'reps',
    defaultSets: 3,
    defaultRepsOrHold: 6,
    description: 'High pull-up driving sternum to contact bar, crucial prerequisite for muscle-ups.',
    instructions: [
      'Initiate pull-up with powerful scapular drive.',
      'Pull aggressively aiming clavicle/upper chest directly onto bar.',
      'Squeeze lats hard at top before lowering.'
    ],
    commonMistakes: ['Stopping at chin level', 'Leaning back excessively'],
    progressionId: 'explosive_pullup',
    regressionId: 'standard_pullup',
    prerequisites: [{ exerciseId: 'standard_pullup', targetValue: 10, unit: 'reps' }]
  },
  {
    id: 'explosive_pullup',
    name: 'Explosive High Pull-up',
    category: 'pull',
    level: 5,
    equipment: ['pull_up_bar'],
    primaryMuscles: ['Latissimus Dorsi', 'Explosive Pulling Power'],
    secondaryMuscles: ['Forearms', 'Core'],
    type: 'reps',
    defaultSets: 3,
    defaultRepsOrHold: 5,
    description: 'Fast pulling power elevating body until waist approaches bar height.',
    instructions: [
      'Hollow body tension at start.',
      'Pull with maximum acceleration driving elbows behind ribs.',
      'Aim to get lower ribs to bar height.'
    ],
    commonMistakes: ['Kipping wildly', 'Pulling slowly'],
    progressionId: 'bar_muscle_up',
    regressionId: 'chest_to_bar_pullup',
    prerequisites: [{ exerciseId: 'chest_to_bar_pullup', targetValue: 8, unit: 'reps' }]
  },
  {
    id: 'bar_muscle_up',
    name: 'Bar Muscle-Up',
    category: 'pull',
    level: 6,
    equipment: ['pull_up_bar'],
    primaryMuscles: ['Lats', 'Triceps', 'Chest', 'Explosive Chain'],
    secondaryMuscles: ['Shoulders', 'Grip', 'Core'],
    type: 'reps',
    defaultSets: 3,
    defaultRepsOrHold: 3,
    description: 'Combined explosive pull and rapid dip transition to climb above bar.',
    instructions: [
      'Slight hollow pull-back swinging into explosive pull.',
      'Pull bar down towards waist while driving chest forward over bar in arc.',
      'Transition hands over bar top into dip position, press to lockout.'
    ],
    commonMistakes: ['Chicken winging (one elbow first)', 'Insufficient pull height'],
    regressionId: 'explosive_pullup',
    prerequisites: [
      { exerciseId: 'standard_pullup', targetValue: 10, unit: 'reps' },
      { exerciseId: 'standard_dips', targetValue: 12, unit: 'reps' },
      { exerciseId: 'chest_to_bar_pullup', targetValue: 8, unit: 'reps' }
    ]
  },
  {
    id: 'one_arm_pullup',
    name: 'One-Arm Pull-Up',
    category: 'pull',
    level: 7,
    equipment: ['pull_up_bar'],
    primaryMuscles: ['Unilateral Lats', 'Biceps', 'Brachialis', 'Grip'],
    secondaryMuscles: ['Core', 'Obliques'],
    type: 'reps',
    defaultSets: 3,
    defaultRepsOrHold: 2,
    description: 'Elite pulling milestone lifting total bodyweight with single arm.',
    instructions: [
      'Grasp bar single handed with supinated or neutral grip.',
      'Engage scapula, pull chin above bar keeping body tight.',
      'Lower controlled.'
    ],
    commonMistakes: ['Spinning uncontrollably', 'Partial ROM'],
    regressionId: 'chest_to_bar_pullup',
    prerequisites: [{ exerciseId: 'standard_pullup', targetValue: 20, unit: 'reps' }]
  },

  // --- CORE EXERCISES ---
  {
    id: 'knee_tucks',
    name: 'Seated Knee Tucks',
    category: 'core',
    level: 1,
    equipment: ['none'],
    primaryMuscles: ['Rectus Abdominis', 'Hip Flexors'],
    secondaryMuscles: ['Lower Back'],
    type: 'reps',
    defaultSets: 3,
    defaultRepsOrHold: 15,
    description: 'Introductory core crunch movement seated on floor edge.',
    instructions: [
      'Sit on floor leaning slightly back with hands resting behind hips.',
      'Extend legs out without touching floor.',
      'Pull knees tightly towards chest contracting abs.'
    ],
    commonMistakes: ['Using momentum', 'Rounding neck'],
    progressionId: 'plank_hold',
    prerequisites: []
  },
  {
    id: 'plank_hold',
    name: 'Forearm Plank',
    category: 'core',
    level: 2,
    equipment: ['none'],
    primaryMuscles: ['Transverse Abdominis', 'Rectus Abdominis'],
    secondaryMuscles: ['Glutes', 'Quadriceps', 'Shoulders'],
    type: 'hold',
    defaultSets: 3,
    defaultRepsOrHold: 45,
    description: 'Isometric anti-extension core pillar hold.',
    instructions: [
      'Rest on forearms with elbows directly beneath shoulders.',
      'Tuck pelvis into posterior tilt (squeeze glutes and draw belly button to spine).',
      'Maintain rigid flat body line.'
    ],
    commonMistakes: ['Sagging lumbar spine', 'Piking hips into mountain shape'],
    progressionId: 'hollow_body_hold',
    regressionId: 'knee_tucks',
    prerequisites: [{ exerciseId: 'knee_tucks', targetValue: 15, unit: 'reps' }]
  },
  {
    id: 'hollow_body_hold',
    name: 'Hollow Body Hold',
    category: 'core',
    level: 3,
    equipment: ['none'],
    primaryMuscles: ['Rectus Abdominis', 'Deep Core Stabilizers'],
    secondaryMuscles: ['Hip Flexors', 'Quads'],
    type: 'hold',
    defaultSets: 3,
    defaultRepsOrHold: 30,
    description: 'The foundation of gymnastics hollow position pressing lower back flat to floor.',
    instructions: [
      'Lie flat on back.',
      'Press lower back into floor eliminating any gap beneath lumbar curve.',
      'Lift shoulder blades and legs off ground overhead arms extended.'
    ],
    commonMistakes: ['Lower back arching off floor'],
    progressionId: 'hanging_knee_raises',
    regressionId: 'plank_hold',
    prerequisites: [{ exerciseId: 'plank_hold', targetValue: 45, unit: 'seconds' }]
  },
  {
    id: 'hanging_knee_raises',
    name: 'Hanging Knee Raise',
    category: 'core',
    level: 3,
    equipment: ['pull_up_bar'],
    primaryMuscles: ['Lower Abs', 'Hip Flexors'],
    secondaryMuscles: ['Forearm Grip', 'Lats'],
    type: 'reps',
    defaultSets: 3,
    defaultRepsOrHold: 10,
    description: 'Dynamic core flexion suspended from pull-up bar.',
    instructions: [
      'Hang from bar without swinging.',
      'Flex hips and pull knees up to touch chest.',
      'Lower legs slowly without swinging.'
    ],
    commonMistakes: ['Swinging like a pendulum', 'Using momentum'],
    progressionId: 'tuck_lsit',
    regressionId: 'hollow_body_hold',
    prerequisites: [{ exerciseId: 'hollow_body_hold', targetValue: 30, unit: 'seconds' }]
  },
  {
    id: 'tuck_lsit',
    name: 'Tuck L-Sit Hold',
    category: 'core',
    level: 4,
    equipment: ['parallel_bars'],
    primaryMuscles: ['Abs', 'Hip Flexors', 'Triceps'],
    secondaryMuscles: ['Scapular Depressors', 'Quads'],
    type: 'hold',
    defaultSets: 3,
    defaultRepsOrHold: 15,
    description: 'Support hold lifting knees tucked at 90 degrees.',
    instructions: [
      'Press up on dip bars or floor pararettes pushing shoulders down away from ears.',
      'Lift bent knees up until thighs are parallel to ground.',
      'Hold position.'
    ],
    commonMistakes: ['Shoulders elevated into ears', 'Dropping knees'],
    progressionId: 'full_lsit',
    regressionId: 'hanging_knee_raises',
    prerequisites: [{ exerciseId: 'hanging_knee_raises', targetValue: 10, unit: 'reps' }]
  },
  {
    id: 'full_lsit',
    name: 'Full L-Sit Hold',
    category: 'core',
    level: 5,
    equipment: ['parallel_bars'],
    primaryMuscles: ['Abs', 'Hip Flexors', 'Quadriceps'],
    secondaryMuscles: ['Triceps', 'Lats'],
    type: 'hold',
    defaultSets: 3,
    defaultRepsOrHold: 15,
    description: 'Classic gymnastics core & hip flexor strength with legs locked straight.',
    instructions: [
      'Press down hard through palms on bars or floor.',
      'Extend legs straight out parallel to ground creating crisp 90-degree L shape.',
      'Lock knees completely and point toes.'
    ],
    commonMistakes: ['Bending knees', 'Hips falling behind hands'],
    progressionId: 'dragon_flag',
    regressionId: 'tuck_lsit',
    prerequisites: [{ exerciseId: 'tuck_lsit', targetValue: 15, unit: 'seconds' }]
  },
  {
    id: 'dragon_flag',
    name: 'Dragon Flag (Bruce Lee)',
    category: 'core',
    level: 6,
    equipment: ['none'],
    primaryMuscles: ['Full Abdominal Wall', 'Lats', 'Glutes'],
    secondaryMuscles: ['Lower Back', 'Hamstrings'],
    type: 'reps',
    defaultSets: 3,
    defaultRepsOrHold: 5,
    description: 'Legendary full body lever raising entire torso supported only on upper back.',
    instructions: [
      'Lie on bench grabbing edge behind head.',
      'Lift entire body vertically into straight line resting on upper upper shoulders.',
      'Lower entire rigid body straight down until inches off bench.',
      'Press back up.'
    ],
    commonMistakes: ['Bending at waist hips', 'Sagging torso'],
    regressionId: 'full_lsit',
    prerequisites: [{ exerciseId: 'full_lsit', targetValue: 15, unit: 'seconds' }]
  },

  // --- LEGS EXERCISES ---
  {
    id: 'air_squat',
    name: 'Bodyweight Air Squat',
    category: 'legs',
    level: 1,
    equipment: ['none'],
    primaryMuscles: ['Quadriceps', 'Gluteus Maximus'],
    secondaryMuscles: ['Hamstrings', 'Calves', 'Core'],
    type: 'reps',
    defaultSets: 3,
    defaultRepsOrHold: 15,
    description: 'Fundamental lower body pattern building knee & hip alignment.',
    instructions: [
      'Feet shoulder-width apart, toes turned slightly out.',
      'Initiate squat by pushing hips back and bending knees.',
      'Descend until thighs break parallel.',
      'Drive through heels back to top standing tall.'
    ],
    commonMistakes: ['Knees caving inwards (valgus)', 'Heels lifting off floor'],
    progressionId: 'bulgarian_split_squat',
    prerequisites: []
  },
  {
    id: 'bulgarian_split_squat',
    name: 'Bulgarian Split Squat',
    category: 'legs',
    level: 2,
    equipment: ['none'],
    primaryMuscles: ['Quadriceps', 'Glutes'],
    secondaryMuscles: ['Hamstrings', 'Adductors', 'Balance'],
    type: 'reps',
    defaultSets: 3,
    defaultRepsOrHold: 10,
    description: 'Unilateral leg strength building knee stability and hip flexibility.',
    instructions: [
      'Place rear foot top onto bench/chair behind.',
      'Step front foot out.',
      'Lower hips straight down until back knee almost touches floor.',
      'Push through front heel to return.'
    ],
    commonMistakes: ['Front heel coming off ground', 'Leaning excessively forward'],
    progressionId: 'pistol_squat_assisted',
    regressionId: 'air_squat',
    prerequisites: [{ exerciseId: 'air_squat', targetValue: 15, unit: 'reps' }]
  },
  {
    id: 'pistol_squat_assisted',
    name: 'Assisted Pistol Squat',
    category: 'legs',
    level: 3,
    equipment: ['pull_up_bar'],
    primaryMuscles: ['Quadriceps', 'Glutes', 'Ankle Mobility'],
    secondaryMuscles: ['Core', 'Calves'],
    type: 'reps',
    defaultSets: 3,
    defaultRepsOrHold: 6,
    description: 'Single leg deep squat using band or pole for balance support.',
    instructions: [
      'Stand on one leg holding band or pole.',
      'Extend non-working leg straight forward off ground.',
      'Squat deep down into ankle crease on standing leg.',
      'Drive back up.'
    ],
    commonMistakes: ['Curling working heel up', 'Rounding spine violently'],
    progressionId: 'pistol_squat',
    regressionId: 'bulgarian_split_squat',
    prerequisites: [{ exerciseId: 'bulgarian_split_squat', targetValue: 12, unit: 'reps' }]
  },
  {
    id: 'pistol_squat',
    name: 'Full Pistol Squat',
    category: 'legs',
    level: 4,
    equipment: ['none'],
    primaryMuscles: ['Quadriceps', 'Gluteus Maximus', 'Hip Flexors'],
    secondaryMuscles: ['Ankle Dorsiflexors', 'Core'],
    type: 'reps',
    defaultSets: 3,
    defaultRepsOrHold: 5,
    description: 'Complete unassisted single-leg strength and ankle mobility milestone.',
    instructions: [
      'Balance single-legged with arms outstretched.',
      'Extend opposing leg straight in front.',
      'Squat smoothly down into full bottom position.',
      'Explode upward to standing without letting non-working foot touch floor.'
    ],
    commonMistakes: ['Falling backward at bottom', 'Knee caving inward'],
    regressionId: 'pistol_squat_assisted',
    prerequisites: [{ exerciseId: 'pistol_squat_assisted', targetValue: 8, unit: 'reps' }]
  },

  // --- SKILLS & BALANCE ---
  {
    id: 'crow_pose',
    name: 'Crow Pose (Bakasana)',
    category: 'skill',
    level: 2,
    equipment: ['none'],
    primaryMuscles: ['Wrists', 'Anterior Deltoids', 'Core'],
    secondaryMuscles: ['Triceps'],
    type: 'hold',
    defaultSets: 3,
    defaultRepsOrHold: 20,
    description: 'Entry-level balance skill transferring weight onto hands.',
    instructions: [
      'Squat down, place palms flat on floor shoulder-width.',
      'Rest knees against backs of upper triceps.',
      'Lean weight forward until feet float off floor.',
      'Balance on hands gazing forward.'
    ],
    commonMistakes: ['Looking straight down back at feet', 'Jumping feet up'],
    progressionId: 'wall_handstand',
    prerequisites: []
  },
  {
    id: 'wall_handstand',
    name: 'Chest-to-Wall Handstand Hold',
    category: 'skill',
    level: 3,
    equipment: ['wall'],
    primaryMuscles: ['Deltoids', 'Trapezius', 'Wrist Flexors'],
    secondaryMuscles: ['Core Hollow Body', 'Glutes'],
    type: 'hold',
    defaultSets: 3,
    defaultRepsOrHold: 30,
    description: 'Perfecting straight line alignment and shoulder overhead lock out against wall.',
    instructions: [
      'Place hands on floor near wall and wall-walk feet up into handstand.',
      'Walk hands in close until chest and toes lightly touch wall.',
      'Tuck chin looking at wall, push shoulders UP towards ceiling.',
      'Squeeze glutes and thighs.'
    ],
    commonMistakes: ['Arched back (banana shape)', 'Bending elbows'],
    progressionId: 'freestanding_handstand',
    regressionId: 'crow_pose',
    prerequisites: [
      { exerciseId: 'crow_pose', targetValue: 20, unit: 'seconds' },
      { exerciseId: 'standard_pushup', targetValue: 12, unit: 'reps' }
    ]
  },
  {
    id: 'freestanding_handstand',
    name: 'Freestanding Handstand',
    category: 'skill',
    level: 4,
    equipment: ['none'],
    primaryMuscles: ['Wrist Adjustment Flexors', 'Deltoids', 'Traps'],
    secondaryMuscles: ['Core', 'Glutes', 'Lats'],
    type: 'hold',
    defaultSets: 4,
    defaultRepsOrHold: 15,
    description: 'Balance upside down without wall contact using micro-wrist pressure.',
    instructions: [
      'Grip floor with fingertips spread wide.',
      'Kick up smoothly into stacked shoulder/hip/ankle line.',
      'Fingertips press to pull back if overbalancing; heel of hand presses if underbalancing.'
    ],
    commonMistakes: ['Overkicking', 'Underkicking', 'Bending arms'],
    progressionId: 'press_handstand',
    regressionId: 'wall_handstand',
    prerequisites: [{ exerciseId: 'wall_handstand', targetValue: 45, unit: 'seconds' }]
  },
  {
    id: 'tuck_front_lever',
    name: 'Tuck Front Lever Hold',
    category: 'skill',
    level: 5,
    equipment: ['pull_up_bar'],
    primaryMuscles: ['Lats', 'Teres Major', 'Core'],
    secondaryMuscles: ['Triceps Long Head', 'Rear Delts'],
    type: 'hold',
    defaultSets: 3,
    defaultRepsOrHold: 15,
    description: 'Straight-arm pulling lever horizontal to ground with knees tucked.',
    instructions: [
      'Hang from bar with straight arms.',
      'Pull straight arms down through lats bringing knees into chest tuck.',
      'Raise hips until back is completely horizontal to ground.'
    ],
    commonMistakes: ['Bending elbows', 'Hips sagging below bar line'],
    progressionId: 'full_front_lever',
    prerequisites: [
      { exerciseId: 'standard_pullup', targetValue: 12, unit: 'reps' },
      { exerciseId: 'hollow_body_hold', targetValue: 45, unit: 'seconds' }
    ]
  },
  {
    id: 'tuck_planche',
    name: 'Tuck Planche Hold',
    category: 'skill',
    level: 5,
    equipment: ['parallel_bars'],
    primaryMuscles: ['Anterior Deltoids', 'Biceps Tendons', 'Protracted Scapula'],
    secondaryMuscles: ['Core', 'Wrist Flexors'],
    type: 'hold',
    defaultSets: 3,
    defaultRepsOrHold: 10,
    description: 'Straight-arm pushing lever suspended on hands with knees tucked under chest.',
    instructions: [
      'Set hands on floor or parallettes.',
      'Lock elbows straight and protract scapula (push upper back up round like a turtle shell).',
      'Lean body weight forward until knees float off floor horizontal to ground.'
    ],
    commonMistakes: ['Bending elbows', 'Retracting shoulder blades'],
    progressionId: 'full_planche',
    prerequisites: [
      { exerciseId: 'standard_dips', targetValue: 15, unit: 'reps' },
      { exerciseId: 'crow_pose', targetValue: 30, unit: 'seconds' }
    ]
  },
  {
    id: 'full_front_lever',
    name: 'Full Front Lever',
    category: 'skill',
    level: 7,
    equipment: ['pull_up_bar'],
    primaryMuscles: ['Straight Arm Lats', 'Full Core Wall', 'Scapular Depressors'],
    secondaryMuscles: ['Triceps', 'Posterior Chain'],
    type: 'hold',
    defaultSets: 3,
    defaultRepsOrHold: 5,
    description: 'Horizontal body straight-arm pulling hold suspended from bar.',
    instructions: [
      'Grasp bar, lock arms straight.',
      'Depress scapula, pull straight arms down extending legs straight out.',
      'Hold body perfectly parallel to floor.'
    ],
    commonMistakes: ['Bending knees', 'Piking hips'],
    regressionId: 'tuck_front_lever',
    prerequisites: [{ exerciseId: 'tuck_front_lever', targetValue: 20, unit: 'seconds' }]
  },
  {
    id: 'full_planche',
    name: 'Full Planche',
    category: 'skill',
    level: 8,
    equipment: ['parallel_bars'],
    primaryMuscles: ['Extreme Anterior Delts', 'Straight Arm Biceps', 'Scapular Protraction'],
    secondaryMuscles: ['Glutes', 'Lower Back', 'Wrist Flexors'],
    type: 'hold',
    defaultSets: 3,
    defaultRepsOrHold: 3,
    description: 'The pinnacle of static bodyweight pressing leverage.',
    instructions: [
      'Place hands on parallettes or floor pointing outwards.',
      'Lock arms totally straight with hard scapular protraction.',
      'Lean forward until feet lift off ground into completely horizontal straight body plane.'
    ],
    commonMistakes: ['Arm bend', 'Hips sagging'],
    regressionId: 'tuck_planche',
    prerequisites: [
      { exerciseId: 'tuck_planche', targetValue: 20, unit: 'seconds' },
      { exerciseId: 'handstand_pushup_wall', targetValue: 10, unit: 'reps' }
    ]
  }
];
