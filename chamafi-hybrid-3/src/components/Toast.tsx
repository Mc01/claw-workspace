import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import { X, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

type ToastType = 'success' | 'error' | 'pending' | 'info';

interface Toast {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
}

interface ToastContextType {
  addToast: (message: string, type?: ToastType, duration?: number) => string;
  removeToast: (id: string) => void;
  updateToast: (id: string, message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
}

const icons: Record<ToastType, ReactNode> = {
  success: <CheckCircle className="w-5 h-5 text-primary-400 shrink-0" />,
  error: <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />,
  pending: <Loader2 className="w-5 h-5 text-amber-400 shrink-0 animate-spin" />,
  info: <AlertCircle className="w-5 h-5 text-blue-400 shrink-0" />,
};

const borderColors: Record<ToastType, string> = {
  success: 'border-primary-500/30',
  error: 'border-red-500/30',
  pending: 'border-amber-500/30',
  info: 'border-blue-500/30',
};

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback(
    (message: string, type: ToastType = 'info', duration: number = 5000) => {
      const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2)}`;
      setToasts((prev) => [...prev, { id, message, type, duration }]);
      if (duration > 0) {
        setTimeout(() => removeToast(id), duration);
      }
      return id;
    },
    [removeToast]
  );

  const updateToast = useCallback(
    (id: string, message: string, type?: ToastType) => {
      setToasts((prev) =>
        prev.map((t) =>
          t.id === id
            ? { ...t, message, type: type || t.type }
            : t
        )
      );
    },
    []
  );

  return (
    <ToastContext.Provider value={{ addToast, removeToast, updateToast }}>
      {children}
      {/* Toast container */}
      <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3 max-w-sm">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`glass-card ${borderColors[toast.type]} px-4 py-3 flex items-center gap-3 animate-slide-up`}
          >
            {icons[toast.type]}
            <span className="text-sm text-white/80 flex-1">{toast.message}</span>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-white/30 hover:text-white/60 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
