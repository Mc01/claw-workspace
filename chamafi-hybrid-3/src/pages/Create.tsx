import { useState, useMemo, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCreateChama } from '../hooks/useChamaFactory';
import { TOKEN_OPTIONS, getTokenAddress, type TokenSymbol } from '../config/contracts';
import { useChainId } from 'wagmi';
import {
  Calendar, DollarSign, Users, PlusCircle, Loader2,
  CheckCircle, AlertTriangle, Info, Sparkles, ArrowRight,
} from 'lucide-react';
import { useToast } from '../components/Toast';

/* ─────────────────────────────────────────────────────────────────────────────
   Confetti particle
───────────────────────────────────────────────────────────────────────────── */
interface ConfettiParticle {
  id: number;
  x: number;
  color: string;
  size: number;
  delay: number;
  duration: number;
  rotate: number;
}

function ConfettiBlast({ active }: { active: boolean }) {
  const [particles, setParticles] = useState<ConfettiParticle[]>([]);

  useEffect(() => {
    if (!active) return;
    const colors = ['#C4E86A', '#7ABF42', '#F5A623', '#4A8025', '#C4A47C', '#ffffff'];
    setParticles(
      Array.from({ length: 48 }, (_, i) => ({
        id: i,
        x: 10 + Math.random() * 80,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: 4 + Math.random() * 6,
        delay: Math.random() * 0.5,
        duration: 1.2 + Math.random() * 1,
        rotate: Math.random() * 360,
      })),
    );
  }, [active]);

  if (!active || particles.length === 0) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute top-0 rounded-sm"
          style={{
            left: `${p.x}%`,
            width: p.size,
            height: p.size * 1.4,
            backgroundColor: p.color,
            transform: `rotate(${p.rotate}deg)`,
            animation: `confettiFall ${p.duration}s ease-in ${p.delay}s both`,
          }}
        />
      ))}
      <style>{`
        @keyframes confettiFall {
          0%   { transform: translateY(-20px) rotate(0deg); opacity: 1; }
          80%  { opacity: 1; }
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   Step tracker bar
───────────────────────────────────────────────────────────────────────────── */
interface StepConfig {
  id: number;
  label: string;
  icon: React.ReactNode;
}

const STEPS: StepConfig[] = [
  { id: 1, label: 'Basic Info', icon: <PlusCircle className="w-3.5 h-3.5" /> },
  { id: 2, label: 'Asset', icon: <DollarSign className="w-3.5 h-3.5" /> },
  { id: 3, label: 'Rules', icon: <Users className="w-3.5 h-3.5" /> },
  { id: 4, label: 'Review', icon: <CheckCircle className="w-3.5 h-3.5" /> },
];

function StepBar({ current }: { current: number }) {
  return (
    <div className="flex items-center gap-0 mb-8 select-none" aria-label="Form steps">
      {STEPS.map((step, idx) => (
        <div key={step.id} className="flex items-center" style={{ flex: idx < STEPS.length - 1 ? 1 : 'none' }}>
          <div
            className={`flex items-center justify-center w-8 h-8 rounded-full border-2 font-semibold text-xs transition-all duration-500 shrink-0
              ${current >= step.id
                ? 'bg-lime/20 border-mint/60 text-mint shadow-[0_0_14px_rgba(196,232,106,0.35)]'
                : 'bg-white/[0.03] border-sand/20 text-sand/40'
              }`}
          >
            {current > step.id ? (
              <CheckCircle className="w-3.5 h-3.5 text-mint" />
            ) : (
              step.icon
            )}
          </div>
          {idx < STEPS.length - 1 && (
            <div className="hidden sm:flex items-center gap-1 flex-1 mx-1">
              <span className={`text-xs whitespace-nowrap mr-1 transition-colors duration-300 ${current >= step.id ? 'text-sand/70' : 'text-sand/30'}`}>
                {step.label}
              </span>
              <div className={`h-px flex-1 transition-all duration-500 ${current > step.id ? 'bg-mint/40' : 'bg-sand/10'}`} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   Token card with glass styling
───────────────────────────────────────────────────────────────────────────── */
interface TokenCardProps {
  symbol: string;
  name: string;
  selected: boolean;
  onClick: () => void;
  index: number;
  visible: boolean;
}

function TokenCard({ symbol, name, selected, onClick, index, visible }: TokenCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative p-4 rounded-2xl border text-left transition-all duration-300 overflow-hidden
        focus:outline-none focus-visible:ring-2 focus-visible:ring-mint/50
        ${selected
          ? 'bg-lime/10 border-mint/50 shadow-[0_0_24px_rgba(196,232,106,0.2),inset_0_0_0_1px_rgba(196,232,106,0.12)]'
          : 'bg-white/[0.03] border-sand/10 hover:border-sand/25 hover:bg-white/[0.06]'
        }
      `}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(12px)',
        transition: `opacity 0.4s ease ${index * 80}ms, transform 0.4s ease ${index * 80}ms, background 0.3s, border-color 0.3s, box-shadow 0.3s`,
      }}
    >
      {selected && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
          <div className="absolute -inset-full top-0 h-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/[0.04] to-transparent animate-shimmer" />
        </div>
      )}
      <div className={`w-2 h-2 rounded-full mb-2 transition-all duration-300 ${selected ? 'bg-mint shadow-[0_0_8px_#C4E86A]' : 'bg-sand/20'}`} />
      <div className={`font-bold text-base transition-colors duration-200 ${selected ? 'text-mint' : 'text-cream'}`}>
        {symbol}
      </div>
      <div className={`text-xs mt-0.5 transition-colors duration-200 ${selected ? 'text-sand/70' : 'text-sand/40'}`}>
        {name}
      </div>
    </button>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   Enhanced FormField with glow focus ring
───────────────────────────────────────────────────────────────────────────── */
interface FormFieldProps {
  label: string;
  error?: string;
  hint?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  visible?: boolean;
  delay?: number;
}

function FormField({ label, error, hint, icon, children, visible = true, delay = 0 }: FormFieldProps) {
  return (
    <div
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(12px)',
        transition: `opacity 0.45s ease ${delay}ms, transform 0.45s ease ${delay}ms`,
      }}
    >
      <label className="flex items-center gap-2 text-sm font-medium text-sand/70 mb-2">
        {icon}
        {label}
      </label>
      <div className="relative group">
        <div className={`
          absolute -inset-px rounded-xl pointer-events-none transition-all duration-300
          opacity-0 group-focus-within:opacity-100
          ${error
            ? 'shadow-[0_0_0_2px_rgba(239,68,68,0.4),0_0_20px_rgba(239,68,68,0.15)]'
            : 'shadow-[0_0_0_2px_rgba(196,232,106,0.35),0_0_20px_rgba(196,232,106,0.12)]'
          }
        `} />
        {children}
      </div>
      {error && (
        <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1 animate-[fadeIn_0.2s_ease-out]">
          <AlertTriangle className="w-3 h-3 shrink-0" />
          {error}
        </p>
      )}
      {hint && !error && (
        <p className="mt-1.5 text-xs text-sand/40 flex items-center gap-1">
          <Info className="w-3 h-3 shrink-0" />
          {hint}
        </p>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   Submit Button with shimmer loading state
───────────────────────────────────────────────────────────────────────────── */
interface SubmitButtonProps {
  isPending: boolean;
  isSuccess: boolean;
  disabled: boolean;
}

function SubmitButton({ isPending, isSuccess, disabled }: SubmitButtonProps) {
  return (
    <button
      type="submit"
      disabled={disabled}
      className={`
        relative w-full py-4 rounded-xl font-bold text-base
        flex items-center justify-center gap-2
        overflow-hidden transition-all duration-300
        focus:outline-none focus-visible:ring-2 focus-visible:ring-mint/50
        ${isSuccess
          ? 'bg-lime/20 text-mint border border-mint/40 shadow-[0_0_28px_rgba(196,232,106,0.25)]'
          : 'btn-primary text-surface'
        }
        ${disabled && !isPending && !isSuccess ? 'opacity-50 cursor-not-allowed' : ''}
        ${!disabled && !isSuccess ? 'hover:-translate-y-0.5 active:translate-y-0.5' : ''}
      `}
    >
      {isPending && (
        <span className="absolute inset-0 pointer-events-none">
          <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
        </span>
      )}
      {isPending ? (
        <>
          <Loader2 className="w-5 h-5 animate-spin" />
          <span>Confirm in Wallet…</span>
        </>
      ) : isSuccess ? (
        <>
          <CheckCircle className="w-5 h-5" />
          <span>Chama Created!</span>
        </>
      ) : (
        <>
          <Sparkles className="w-4 h-4" />
          <span>Create Chama</span>
          <ArrowRight className="w-4 h-4" />
        </>
      )}
    </button>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   Derive current step
───────────────────────────────────────────────────────────────────────────── */
function deriveStep(name: string, token: string, targetAmount: string, minMembers: string): number {
  if (!name || name.trim().length < 3) return 1;
  if (!token) return 2;
  if (!targetAmount || parseFloat(targetAmount) < 200) return 3;
  if (!minMembers || parseInt(minMembers) < 2) return 3;
  return 4;
}

interface FormErrors {
  name?: string;
  targetAmount?: string;
  deadline?: string;
  minMembers?: string;
}

/* ─────────────────────────────────────────────────────────────────────────────
   Main Create page
───────────────────────────────────────────────────────────────────────────── */
export function Create() {
  const navigate = useNavigate();
  const chainId = useChainId();
  const { createChama, isPending, isSuccess, isError, error } = useCreateChama();
  const { addToast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    token: 'cUSD' as TokenSymbol,
    targetAmount: '',
    deadline: '',
    minMembers: '2',
  });
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [confetti, setConfetti] = useState(false);
  const [tokenVisible, setTokenVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setMounted(true), 50);
    const t2 = setTimeout(() => setTokenVisible(true), 320);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  const errors = useMemo((): FormErrors => {
    const errs: FormErrors = {};
    if (touched.name && !formData.name.trim()) {
      errs.name = 'Chama name is required';
    } else if (touched.name && formData.name.trim().length < 3) {
      errs.name = 'Name must be at least 3 characters';
    }
    if (touched.targetAmount) {
      const target = parseFloat(formData.targetAmount);
      if (!formData.targetAmount || isNaN(target)) {
        errs.targetAmount = 'Target amount is required';
      } else if (target < 200) {
        errs.targetAmount = 'Minimum target is 200 (contract requirement)';
      }
    }
    if (touched.deadline && formData.deadline) {
      const deadlineDate = new Date(formData.deadline);
      if (deadlineDate <= new Date()) {
        errs.deadline = 'Deadline must be in the future';
      }
    }
    if (touched.minMembers) {
      const min = parseInt(formData.minMembers);
      if (isNaN(min) || min < 2) {
        errs.minMembers = 'At least 2 members required (contract minimum)';
      } else if (min > 100) {
        errs.minMembers = 'Maximum 100 members per Chama';
      }
    }
    return errs;
  }, [formData, touched]);

  const isValid =
    formData.name.trim().length >= 3 &&
    parseFloat(formData.targetAmount) >= 200 &&
    parseInt(formData.minMembers) >= 2 &&
    Object.keys(errors).length === 0;

  const currentStep = deriveStep(formData.name, formData.token, formData.targetAmount, formData.minMembers);

  const handleBlur = (field: string) => setTouched((prev) => ({ ...prev, [field]: true }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ name: true, targetAmount: true, deadline: true, minMembers: true });
    if (!isValid) return;
    addToast('Creating Chama… Confirm in your wallet', 'pending', 0);
    try {
      const tokenAddress = getTokenAddress(chainId, formData.token);
      const deadlineTimestamp = formData.deadline
        ? Math.floor(new Date(formData.deadline).getTime() / 1000)
        : 0;
      await createChama(
        formData.name,
        tokenAddress,
        formData.targetAmount,
        formData.token,
        parseInt(formData.minMembers),
        deadlineTimestamp,
      );
      setConfetti(true);
      addToast('Chama created successfully!', 'success');
    } catch {
      addToast('Failed to create Chama', 'error');
    }
  };

  if (isSuccess) {
    setTimeout(() => navigate('/app/discover'), 2000);
  }

  const revealStyle = (delay: number) => ({
    opacity: mounted ? 1 : 0,
    transform: mounted ? 'translateY(0)' : 'translateY(16px)',
    transition: `opacity 0.45s ease ${delay}ms, transform 0.45s ease ${delay}ms`,
  });

  return (
    <>
      <ConfettiBlast active={confetti} />

      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8" style={revealStyle(0)}>
          <div className="w-10 h-10 rounded-xl bg-lime/15 flex items-center justify-center border border-mint/20 shadow-[0_0_20px_rgba(196,232,106,0.15)]">
            <PlusCircle className="w-5 h-5 text-lime" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-cream">Create New Chama</h1>
            <p className="text-sand/50 text-sm">Set up a community savings circle on Celo</p>
          </div>
        </div>

        {/* Step bar */}
        <div style={revealStyle(80)}>
          <StepBar current={currentStep} />
        </div>

        {/* Form card */}
        <div className="glass-card p-6 md:p-8" style={revealStyle(160)}>
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">

            {/* 1. Chama Name */}
            <FormField label="Chama Name" error={errors.name} visible={mounted} delay={200}>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                onBlur={() => handleBlur('name')}
                className={`input-dark ${errors.name ? 'border-red-500/40 focus:ring-red-400/30 focus:border-red-400/40' : ''}`}
                placeholder="e.g., Friends Savings 2024"
              />
            </FormField>

            {/* 2. Token Selector */}
            <div style={{
              opacity: tokenVisible ? 1 : 0,
              transform: tokenVisible ? 'translateY(0)' : 'translateY(12px)',
              transition: 'opacity 0.45s ease 80ms, transform 0.45s ease 80ms',
            }}>
              <label className="block text-sm font-medium text-sand/70 mb-3">
                Savings Asset
              </label>
              <div className="grid grid-cols-3 gap-3">
                {TOKEN_OPTIONS.map((token, i) => (
                  <TokenCard
                    key={token.symbol}
                    symbol={token.symbol}
                    name={token.name}
                    selected={formData.token === token.symbol}
                    onClick={() => setFormData({ ...formData, token: token.symbol })}
                    index={i}
                    visible={tokenVisible}
                  />
                ))}
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-transparent via-sand/10 to-transparent" style={revealStyle(320)} />

            {/* 3. Target Amount */}
            <FormField
              label={`Target Capital (${formData.token})`}
              error={errors.targetAmount}
              icon={<DollarSign className="w-4 h-4 text-sand/50" />}
              hint="Minimum 200 (contract requirement)"
              visible={mounted}
              delay={360}
            >
              <input
                type="number"
                required
                min="200"
                step="0.01"
                value={formData.targetAmount}
                onChange={(e) => setFormData({ ...formData, targetAmount: e.target.value })}
                onBlur={() => handleBlur('targetAmount')}
                className={`input-dark ${errors.targetAmount ? 'border-red-500/40 focus:ring-red-400/30 focus:border-red-400/40' : ''}`}
                placeholder="e.g., 1000"
              />
            </FormField>

            {/* 4. Min Members */}
            <FormField
              label="Minimum Members"
              error={errors.minMembers}
              icon={<Users className="w-4 h-4 text-sand/50" />}
              hint="2–100 members. Chama activates when this many join."
              visible={mounted}
              delay={440}
            >
              <input
                type="number"
                required
                min="2"
                max="100"
                value={formData.minMembers}
                onChange={(e) => setFormData({ ...formData, minMembers: e.target.value })}
                onBlur={() => handleBlur('minMembers')}
                className={`input-dark ${errors.minMembers ? 'border-red-500/40 focus:ring-red-400/30 focus:border-red-400/40' : ''}`}
              />
            </FormField>

            {/* 5. Deadline */}
            <FormField
              label="Deadline"
              error={errors.deadline}
              icon={<Calendar className="w-4 h-4 text-sand/50" />}
              hint="Optional — leave empty for no deadline"
              visible={mounted}
              delay={520}
            >
              <input
                type="datetime-local"
                value={formData.deadline}
                onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                onBlur={() => handleBlur('deadline')}
                className={`input-dark [color-scheme:dark] ${errors.deadline ? 'border-red-500/40 focus:ring-red-400/30 focus:border-red-400/40' : ''}`}
              />
            </FormField>

            {/* Error state */}
            {isError && (
              <div className="flex items-start gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20 animate-[fadeIn_0.3s_ease-out]">
                <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                <p className="text-sm text-red-400">
                  {error?.message?.includes('User rejected')
                    ? 'Transaction was rejected in wallet'
                    : error?.message || 'Failed to create Chama'}
                </p>
              </div>
            )}

            {/* Success banner */}
            {isSuccess && (
              <div className="flex items-center gap-3 p-4 rounded-xl bg-lime/10 border border-lime/30 shadow-[0_0_24px_rgba(196,232,106,0.15)] animate-[fadeIn_0.4s_ease-out]">
                <CheckCircle className="w-5 h-5 text-lime shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-lime">Chama created successfully!</p>
                  <p className="text-xs text-sand/60 mt-0.5">Redirecting to discover…</p>
                </div>
              </div>
            )}

            {/* Submit button */}
            <div style={revealStyle(600)}>
              <SubmitButton isPending={isPending} isSuccess={isSuccess} disabled={isPending || isSuccess} />
            </div>

            {/* Validation hint */}
            {!isValid && Object.values(touched).some(Boolean) && (
              <p className="text-xs text-center text-sand/40 -mt-2 animate-[fadeIn_0.2s_ease-out]">
                Please fix the fields above before submitting
              </p>
            )}
          </form>
        </div>

        {/* Footer note */}
        <p className="text-center text-xs text-sand/30 mt-4" style={revealStyle(700)}>
          Your Chama is deployed as an immutable smart contract on Celo.
        </p>
      </div>
    </>
  );
}
