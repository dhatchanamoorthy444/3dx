'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCalisthenics } from '../../context/CalisthenicsContext';
import { WorkoutExerciseLog, WorkoutExerciseLogSet } from '../../types/calisthenics';
import { EXERCISES_DATABASE } from '../../data/exercises';
import { 
  Play, 
  CheckCircle2, 
  RotateCcw, 
  Plus, 
  Minus, 
  Clock, 
  Trophy, 
  Sparkles, 
  Check, 
  Flame, 
  AlertTriangle,
  Info,
  ChevronRight,
  Zap
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function WorkoutPage() {
  const router = useRouter();
  const { generateTodayWorkout, completeWorkout, profile } = useCalisthenics();

  const workoutPlan = generateTodayWorkout();

  // Initialize interactive state for exercises
  const [logs, setLogs] = useState<WorkoutExerciseLog[]>(() => {
    return workoutPlan.exercises.map(ex => {
      const sets: WorkoutExerciseLogSet[] = Array.from({ length: ex.sets }).map((_, i) => ({
        setNumber: i + 1,
        repsOrHold: ex.repsOrHold,
        completed: false,
        targetRepsOrHold: ex.repsOrHold
      }));
      return {
        exerciseId: ex.exerciseId,
        exerciseName: ex.name,
        sets
      };
    });
  });

  const [activeExerciseIndex, setActiveExerciseIndex] = useState(0);
  const [fatigueRating, setFatigueRating] = useState<'low' | 'moderate' | 'high'>('low');

  // Rest Timer State
  const [timerSeconds, setTimerSeconds] = useState(90);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [initialTimer, setInitialTimer] = useState(90);

  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds(s => s - 1);
      }, 1000);
    } else if (timerSeconds === 0 && isTimerRunning) {
      setIsTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timerSeconds]);

  const startRestTimer = (secs: number = 90) => {
    setInitialTimer(secs);
    setTimerSeconds(secs);
    setIsTimerRunning(true);
  };

  const toggleSetCompletion = (exerciseIdx: number, setIdx: number) => {
    setLogs(prev => {
      const copy = [...prev];
      const exLog = { ...copy[exerciseIdx] };
      const sets = [...exLog.sets];
      const targetSet = { ...sets[setIdx] };

      targetSet.completed = !targetSet.completed;
      sets[setIdx] = targetSet;
      exLog.sets = sets;
      copy[exerciseIdx] = exLog;
      return copy;
    });

    // Start rest timer automatically when completing a set
    if (!logs[exerciseIdx].sets[setIdx].completed) {
      startRestTimer(90);
    }
  };

  const updateSetReps = (exerciseIdx: number, setIdx: number, delta: number) => {
    setLogs(prev => {
      const copy = [...prev];
      const exLog = { ...copy[exerciseIdx] };
      const sets = [...exLog.sets];
      const targetSet = { ...sets[setIdx] };

      targetSet.repsOrHold = Math.max(1, targetSet.repsOrHold + delta);
      sets[setIdx] = targetSet;
      exLog.sets = sets;
      copy[exerciseIdx] = exLog;
      return copy;
    });
  };

  // Progress Calculation
  const totalSets = logs.reduce((acc, ex) => acc + ex.sets.length, 0);
  const completedSets = logs.reduce((acc, ex) => acc + ex.sets.filter(s => s.completed).length, 0);
  const progressPercent = Math.round((completedSets / totalSets) * 100);

  const handleFinishWorkout = () => {
    const xpEarned = 150 + completedSets * 10;
    completeWorkout({
      title: workoutPlan.title,
      category: workoutPlan.category,
      durationMinutes: workoutPlan.estimatedDurationMins,
      exercises: logs,
      xpEarned,
      fatigueRating
    });

    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 }
    });

    router.push('/');
  };

  const activeExDetail = EXERCISES_DATABASE.find(e => e.id === logs[activeExerciseIndex]?.exerciseId);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-8 px-4 sm:px-6 lg:px-8 pb-32">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
              <Zap className="w-4 h-4" /> Live Session Logger
            </div>
            <h1 className="text-2xl sm:text-3xl font-black">{workoutPlan.title}</h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Focus: {workoutPlan.category} • Est. {workoutPlan.estimatedDurationMins} Mins
            </p>
          </div>

          {/* Progress bar pill */}
          <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl text-right min-w-[180px]">
            <div className="text-xs text-slate-400 uppercase font-semibold mb-1">
              Session Progress: <span className="text-amber-400 font-extrabold">{progressPercent}%</span>
            </div>
            <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden border border-slate-800">
              <div className="bg-gradient-to-r from-amber-500 to-emerald-400 h-full transition-all duration-300" style={{ width: `${progressPercent}%` }} />
            </div>
          </div>
        </div>

        {/* Exercise Switcher Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {logs.map((exLog, idx) => {
            const isCompleted = exLog.sets.every(s => s.completed);
            const isActive = activeExerciseIndex === idx;
            return (
              <button
                key={exLog.exerciseId}
                onClick={() => setActiveExerciseIndex(idx)}
                className={`flex items-center gap-2 px-4 py-3 rounded-xl border text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-lg shadow-amber-500/20'
                    : isCompleted
                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                    : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <span>{idx + 1}. {exLog.exerciseName}</span>
                {isCompleted && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
              </button>
            );
          })}
        </div>

        {/* Active Exercise Logger Card */}
        {logs[activeExerciseIndex] && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
            
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-wider text-amber-400">
                  Exercise {activeExerciseIndex + 1} of {logs.length}
                </span>
                <h2 className="text-2xl font-extrabold text-white mt-1">
                  {logs[activeExerciseIndex].exerciseName}
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  {workoutPlan.exercises[activeExerciseIndex]?.notes}
                </p>
              </div>

              {activeExDetail && (
                <div className="bg-slate-950 border border-slate-800 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-300">
                  Target: {activeExDetail.primaryMuscles.slice(0, 2).join(', ')}
                </div>
              )}
            </div>

            {/* Set Tracker Table */}
            <div className="space-y-3">
              {logs[activeExerciseIndex].sets.map((setLog, setIdx) => (
                <div
                  key={setIdx}
                  className={`flex items-center justify-between p-4 rounded-xl border transition-colors ${
                    setLog.completed
                      ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                      : 'bg-slate-950 border-slate-800 text-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center font-bold text-xs">
                      S{setLog.setNumber}
                    </span>
                    <span className="text-xs font-semibold text-slate-400">
                      Target: {setLog.targetRepsOrHold} {activeExDetail?.type === 'hold' ? 'sec' : 'reps'}
                    </span>
                  </div>

                  {/* Counter Adjuster */}
                  <div className="flex items-center gap-3">
                    <div className="flex items-center bg-slate-900 border border-slate-800 rounded-lg p-1">
                      <button
                        onClick={() => updateSetReps(activeExerciseIndex, setIdx, -1)}
                        className="p-1 text-slate-400 hover:text-white"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-12 text-center font-extrabold text-amber-400 text-sm">
                        {setLog.repsOrHold}
                      </span>
                      <button
                        onClick={() => updateSetReps(activeExerciseIndex, setIdx, 1)}
                        className="p-1 text-slate-400 hover:text-white"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    <button
                      onClick={() => toggleSetCompletion(activeExerciseIndex, setIdx)}
                      className={`flex items-center gap-1.5 px-4 py-2 rounded-lg font-bold text-xs transition-all ${
                        setLog.completed
                          ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                          : 'bg-amber-500 text-slate-950 hover:bg-amber-400'
                      }`}
                    >
                      {setLog.completed ? <Check className="w-4 h-4" /> : 'Log Set'}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Exercise Instructions accordion */}
            {activeExDetail && (
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-2">
                <div className="flex items-center gap-2 font-bold text-slate-300">
                  <Info className="w-4 h-4 text-amber-400" /> Coaching Cues & Form Notes:
                </div>
                <ul className="list-disc list-inside text-slate-400 space-y-1 pl-1">
                  {activeExDetail.instructions.slice(0, 3).map((inst, i) => (
                    <li key={i}>{inst}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Next Exercise button */}
            <div className="flex justify-end pt-2">
              {activeExerciseIndex < logs.length - 1 ? (
                <button
                  onClick={() => setActiveExerciseIndex(i => i + 1)}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 font-bold text-sm text-slate-200"
                >
                  <span>Next Exercise</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <span className="text-xs text-emerald-400 font-bold">All Exercises Reached!</span>
              )}
            </div>

          </div>
        )}

        {/* Fatigue Rating & Finish Session Section */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
          <h3 className="text-base font-bold text-slate-200">Session Fatigue Self-Assessment</h3>
          <div className="grid grid-cols-3 gap-3">
            {(['low', 'moderate', 'high'] as const).map(f => (
              <button
                key={f}
                onClick={() => setFatigueRating(f)}
                className={`py-3 rounded-xl border text-xs font-bold uppercase tracking-wider transition-all ${
                  fatigueRating === f
                    ? f === 'high'
                      ? 'bg-rose-500/20 border-rose-500 text-rose-400'
                      : f === 'moderate'
                      ? 'bg-amber-500/20 border-amber-500 text-amber-400'
                      : 'bg-emerald-500/20 border-emerald-500 text-emerald-400'
                    : 'bg-slate-950 border-slate-800 text-slate-400'
                }`}
              >
                {f} Fatigue
              </button>
            ))}
          </div>

          <button
            onClick={handleFinishWorkout}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-slate-950 font-black text-base tracking-wide hover:opacity-95 transition-opacity shadow-xl shadow-amber-500/25 flex items-center justify-center gap-2"
          >
            <Trophy className="w-5 h-5" />
            <span>Complete & Log Workout (+150 XP)</span>
          </button>
        </div>

      </div>

      {/* Floating Rest Timer Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-slate-900/95 backdrop-blur-md border-t border-slate-800 p-4 shadow-2xl">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] text-slate-400 uppercase font-extrabold tracking-wider">Rest Timer</div>
              <div className="text-xl font-black text-white font-mono">
                {Math.floor(timerSeconds / 60)}:{(timerSeconds % 60).toString().padStart(2, '0')}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setTimerSeconds(s => Math.max(0, s - 15))}
              className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs font-bold text-slate-300 hover:bg-slate-800"
            >
              -15s
            </button>
            <button
              onClick={() => setTimerSeconds(s => s + 15)}
              className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs font-bold text-slate-300 hover:bg-slate-800"
            >
              +15s
            </button>
            <button
              onClick={() => setIsTimerRunning(!isTimerRunning)}
              className={`px-4 py-2 rounded-lg font-bold text-xs flex items-center gap-1.5 ${
                isTimerRunning
                  ? 'bg-rose-500 text-slate-950'
                  : 'bg-amber-500 text-slate-950 hover:bg-amber-400'
              }`}
            >
              {isTimerRunning ? 'Pause' : 'Start Timer'}
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}
