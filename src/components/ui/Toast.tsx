'use client';

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from 'lucide-react';

export interface Toast {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info' | 'xp' | 'achievement' | 'levelup' | 'streak' | 'pr';
  title: string;
  message?: string;
  duration?: number;
  action?: { label: string; onClick: () => void };
  dismissible?: boolean;
}

interface ToastContextType {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, 'id'>) => string;
  removeToast: (id: string) => void;
  clearToasts: () => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

const toastStore: { current: ToastContextType | null } = { current: null };

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((toast: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).substring(2, 9);
    const newToast = { ...toast, id, duration: toast.duration ?? 5000 };
    setToasts((prev) => [...prev, newToast]);
    return id;
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const clearToasts = useCallback(() => {
    setToasts([]);
  }, []);

  const contextValue: ToastContextType = { toasts, addToast, removeToast, clearToasts };
  toastStore.current = contextValue;

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </ToastContext.Provider>
  );
};

const ToastContainer: React.FC<{ toasts: Toast[]; onRemove: (id: string) => void }> = ({
  toasts,
  onRemove,
}) => {
  const icons = {
    success: <CheckCircle className="w-5 h-5 text-emerald-400" />,
    error: <AlertCircle className="w-5 h-5 text-rose-400" />,
    warning: <AlertTriangle className="w-5 h-5 text-amber-400" />,
    info: <Info className="w-5 h-5 text-sky-400" />,
    xp: <span className="w-5 h-5 text-amber-400 font-black text-xl">⚡</span>,
    achievement: <span className="w-5 h-5 text-amber-400 font-black text-xl">🏆</span>,
    levelup: <span className="w-5 h-5 text-amber-400 font-black text-xl">⚡</span>,
    streak: <span className="w-5 h-5 text-orange-400 font-black text-xl">🔥</span>,
    pr: <span className="w-5 h-5 text-rose-400 font-black text-xl">💪</span>,
  };

  const borderColors = {
    success: 'border-emerald-500/30 bg-emerald-500/10',
    error: 'border-rose-500/30 bg-rose-500/10',
    warning: 'border-amber-500/30 bg-amber-500/10',
    info: 'border-sky-500/30 bg-sky-500/10',
    xp: 'border-amber-500/30 bg-amber-500/10',
    achievement: 'border-amber-500/30 bg-amber-500/10',
    levelup: 'border-amber-500/30 bg-amber-500/10',
    streak: 'border-orange-500/30 bg-orange-500/10',
    pr: 'border-rose-500/30 bg-rose-500/10',
  };

  return (
    <div className="fixed bottom-4 right-4 z-[1000] flex flex-col gap-2 pointer-events-none">
      {toasts.map((toast) => (
        <ToastItem
          key={toast.id}
          toast={toast}
          icon={icons[toast.type]}
          borderClass={borderColors[toast.type]}
          onRemove={onRemove}
        />
      ))}
    </div>
  );
};

interface ToastItemProps {
  toast: Toast;
  icon: React.ReactNode;
  borderClass: string;
  onRemove: (id: string) => void;
}

const ToastItem: React.FC<ToastItemProps> = ({ toast, icon, borderClass, onRemove }) => {
  React.useEffect(() => {
    if (toast.duration && toast.duration > 0) {
      const timer = setTimeout(() => onRemove(toast.id), toast.duration);
      return () => clearTimeout(timer);
    }
  }, [toast.id, toast.duration, onRemove]);

  return (
    <div
      className={`card pointer-events-auto flex items-start gap-3 min-w-[300px] max-w-md animate-slide-in ${borderClass}`}
      style={{ animation: 'slideIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards' }}
    >
      <style jsx>{`
        @keyframes slideIn {
          0% { opacity: 0; transform: translateX(100%); }
          100% { opacity: 1; transform: translateX(0); }
        }
      `}</style>
      <div className="flex-shrink-0 mt-0.5">{icon}</div>
      <div className="flex-1 min-w-0">
        <div className="font-semibold text-white">{toast.title}</div>
        {toast.message && (
          <div className="text-sm text-slate-400 mt-0.5">{toast.message}</div>
        )}
        {toast.action && (
          <button
            onClick={() => {
              toast.action?.onClick();
              onRemove(toast.id);
            }}
            className="mt-2 text-xs font-bold text-amber-400 hover:text-amber-300 underline"
          >
            {toast.action.label}
          </button>
        )}
      </div>
      {toast.dismissible !== false && (
        <button
          onClick={() => onRemove(toast.id)}
          className="flex-shrink-0 p-1 text-slate-500 hover:text-white transition-colors"
          aria-label="Dismiss"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export const toast = {
  getState: () => {
    if (!toastStore.current) {
      throw new Error('Toast store not initialized. Make sure ToastProvider is mounted.');
    }
    return toastStore.current;
  },
  success: (title: string, message?: string, options?: Partial<Toast>) =>
    toast.getState().addToast({ type: 'success', title, message, ...options }),
  error: (title: string, message?: string, options?: Partial<Toast>) =>
    toast.getState().addToast({ type: 'error', title, message, ...options }),
  warning: (title: string, message?: string, options?: Partial<Toast>) =>
    toast.getState().addToast({ type: 'warning', title, message, ...options }),
  info: (title: string, message?: string, options?: Partial<Toast>) =>
    toast.getState().addToast({ type: 'info', title, message, ...options }),
  xp: (title: string, message?: string, options?: Partial<Toast>) =>
    toast.getState().addToast({ type: 'xp', title, message, ...options }),
  achievement: (title: string, message?: string, options?: Partial<Toast>) =>
    toast.getState().addToast({ type: 'achievement', title, message, ...options }),
  levelup: (title: string, message?: string, options?: Partial<Toast>) =>
    toast.getState().addToast({ type: 'levelup', title, message, ...options }),
  streak: (title: string, message?: string, options?: Partial<Toast>) =>
    toast.getState().addToast({ type: 'streak', title, message, ...options }),
  pr: (title: string, message?: string, options?: Partial<Toast>) =>
    toast.getState().addToast({ type: 'pr', title, message, ...options }),
};