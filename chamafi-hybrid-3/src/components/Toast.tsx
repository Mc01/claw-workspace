import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
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
  success: <CheckCircle className="w-5 h-5 text-lime shrink-0" />,
  error:   <AlertCircle  className="w-5 h-5 text-red-400 shrink-0" />,
  pending: <Loader2      className="w-5 h-5 text-amber-400 shrink-0 animate-spin" />,
  info:    <AlertCircle  className="w-5 h-5 text-blue-400 shrink-0" />,
};

const styles: Record<ToastType, string> = {
  success: 'border-lime/30   shadow-[0_0_20px_rgba(122,191,66,0.15)]',
  error:   'border-red-500/30 shadow-[0_0_20px_rgba(239,68,68,0.15)]',
  pending: 'border-amber-500/30 shadow-[0_0_20px_rgba(245,166,35,0.15)]',
  info:    'border-blue-500/30 shadow-[0_0_20px_rgba(59,130,246,0.15)]',
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
        prev.map((t) => (t.id === id ? { ...t, message, type: type ?? t.type } : t))
      );
    },
    []
  );

  return (
    <ToastContext.Provider value={{ addToast, removeToast, updateToast }}>
      {children}

      {/* Toast container */}
      <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3 max-w-sm pointer-events-none">
        <AnimatePresence mode="sync">
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              layout
              initial={{ opacity: 0, x: 120, scale: 0.88 }}
              animate={{ opacity: 1, x: 0,   scale: 1    }}
              exit={{    opacity: 0, x: 120, scale: 0.88 }}
              transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              className={`
                pointer-events-auto
                glass-card ${styles[toast.type]}
                px-4 py-3 flex items-center gap-3
                relative overflow-hidden
              `}
            >
              {/* Type-coloured top edge */}
              <div
                className={`absolute top-0 left-0 right-0 h-[2px] ${
                  toast.type === 'success' ? 'bg-lime/60' :
                  toast.type === 'error'   ? 'bg-red-400/60' :
                  toast.type === 'pending' ? 'bg-amber-400/60' :
                                             'bg-blue-400/60'
                }`}
              />

              {icons[toast.type]}

              <span className="text-sm text-white/80 flex-1 leading-snug">
                {toast.message}
              </span>

              <motion.button
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => removeToast(toast.id)}
                className="text-white/30 hover:text-white/70 transition-colors ml-1 shrink-0"
              >
                <X className="w-4 h-4" />
              </motion.button>

              {/* Auto-dismiss progress line */}
              {toast.duration && toast.duration > 0 && (
                <motion.div
                  className={`absolute bottom-0 left-0 h-[2px] ${
                    toast.type === 'success' ? 'bg-lime/40' :
                    toast.type === 'error'   ? 'bg-red-400/40' :
                    toast.type === 'pending' ? 'bg-amber-400/40' :
                                               'bg-blue-400/40'
                  }`}
                  initial={{ width: '100%' }}
                  animate={{ width: '0%' }}
                  transition={{ duration: toast.duration / 1000, ease: 'linear' }}
                />
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}
