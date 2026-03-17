import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCreateChama } from '../hooks/useChamaFactory';
import { TOKEN_OPTIONS, getTokenAddress, type TokenSymbol } from '../config/contracts';
import { useChainId } from 'wagmi';
import { Calendar, DollarSign, Users, PlusCircle, Loader2, CheckCircle, AlertTriangle, Info } from 'lucide-react';
import { useToast } from '../components/Toast';

interface FormErrors {
  name?: string;
  targetAmount?: string;
  deadline?: string;
  minContribution?: string;
  maxMembers?: string;
}

export function Create() {
  const navigate = useNavigate();
  const chainId = useChainId();
  const { createChama, isPending, isSuccess, isError, error } = useCreateChama();
  const { addToast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    token: 'cUSD' as TokenSymbol,
    targetAmount: '',
    deadline: '',
    minContribution: '',
    maxMembers: '50',
  });
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  // Validation
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
      } else if (target <= 0) {
        errs.targetAmount = 'Must be greater than 0';
      }
    }

    if (touched.deadline) {
      if (!formData.deadline) {
        errs.deadline = 'Deadline is required';
      } else {
        const deadlineDate = new Date(formData.deadline);
        const now = new Date();
        if (deadlineDate <= now) {
          errs.deadline = 'Deadline must be in the future';
        }
      }
    }

    if (touched.minContribution && formData.minContribution) {
      const min = parseFloat(formData.minContribution);
      const target = parseFloat(formData.targetAmount);
      if (min <= 0) {
        errs.minContribution = 'Must be greater than 0';
      } else if (!isNaN(target) && min > target) {
        errs.minContribution = 'Cannot exceed target amount';
      }
    }

    if (touched.maxMembers) {
      const max = parseInt(formData.maxMembers);
      if (isNaN(max) || max < 2) {
        errs.maxMembers = 'At least 2 members required';
      } else if (max > 1000) {
        errs.maxMembers = 'Maximum 1000 members';
      }
    }

    return errs;
  }, [formData, touched]);

  const isValid = formData.name.trim().length >= 3 &&
    parseFloat(formData.targetAmount) > 0 &&
    formData.deadline &&
    new Date(formData.deadline) > new Date() &&
    parseInt(formData.maxMembers) >= 2 &&
    Object.keys(errors).length === 0;

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Mark all as touched
    setTouched({
      name: true,
      targetAmount: true,
      deadline: true,
      minContribution: true,
      maxMembers: true,
    });

    if (!isValid) return;

    const toastId = addToast('Creating Chama... Confirm in your wallet', 'pending', 0);

    try {
      const tokenAddress = getTokenAddress(chainId, formData.token);
      const deadlineTimestamp = Math.floor(new Date(formData.deadline).getTime() / 1000);

      await createChama(
        formData.name,
        tokenAddress,
        formData.targetAmount,
        deadlineTimestamp,
        formData.minContribution || '1',
        parseInt(formData.maxMembers)
      );

      addToast('Chama created successfully!', 'success');
    } catch {
      addToast('Failed to create Chama', 'error');
    }
  };

  // Redirect on success
  if (isSuccess) {
    setTimeout(() => navigate('/app/discover'), 2000);
  }

  return (
    <div className="max-w-2xl mx-auto animate-fade-in">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-xl bg-primary-500/15 flex items-center justify-center">
          <PlusCircle className="w-5 h-5 text-primary-400" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">Create New Chama</h1>
          <p className="text-white/40 text-sm">Set up a community savings circle</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="glass-card p-6 md:p-8 space-y-6">
        {/* Name */}
        <FormField label="Chama Name" error={errors.name}>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            onBlur={() => handleBlur('name')}
            className="input-dark"
            placeholder="e.g., Friends Savings 2024"
          />
        </FormField>

        {/* Token Selection */}
        <div>
          <label className="block text-sm font-medium text-white/60 mb-3">
            Savings Asset
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {TOKEN_OPTIONS.map((token) => (
              <button
                key={token.symbol}
                type="button"
                onClick={() => setFormData({ ...formData, token: token.symbol })}
                className={`p-3 rounded-xl border text-center transition-all duration-200 ${
                  formData.token === token.symbol
                    ? 'border-primary-500/50 bg-primary-500/10 text-primary-400 shadow-sm shadow-primary-500/10'
                    : 'border-white/[0.08] bg-white/[0.02] text-white/60 hover:border-white/[0.15] hover:bg-white/[0.04]'
                }`}
              >
                <div className="font-semibold text-sm">{token.symbol}</div>
                <div className="text-xs opacity-50 mt-0.5">{token.name}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Target Amount */}
        <FormField
          label={`Target Amount (${formData.token})`}
          error={errors.targetAmount}
          icon={<DollarSign className="w-4 h-4" />}
        >
          <input
            type="number"
            required
            min="1"
            step="0.01"
            value={formData.targetAmount}
            onChange={(e) => setFormData({ ...formData, targetAmount: e.target.value })}
            onBlur={() => handleBlur('targetAmount')}
            className="input-dark"
            placeholder="e.g., 1000"
          />
        </FormField>

        {/* Min Contribution */}
        <FormField
          label={`Minimum Contribution (${formData.token})`}
          error={errors.minContribution}
          hint="Optional - leave empty to allow any amount"
        >
          <input
            type="number"
            min="0.01"
            step="0.01"
            value={formData.minContribution}
            onChange={(e) => setFormData({ ...formData, minContribution: e.target.value })}
            onBlur={() => handleBlur('minContribution')}
            className="input-dark"
            placeholder="e.g., 10"
          />
        </FormField>

        {/* Deadline */}
        <FormField
          label="Deadline"
          error={errors.deadline}
          icon={<Calendar className="w-4 h-4" />}
        >
          <input
            type="datetime-local"
            required
            value={formData.deadline}
            onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
            onBlur={() => handleBlur('deadline')}
            className="input-dark [color-scheme:dark]"
          />
        </FormField>

        {/* Max Members */}
        <FormField
          label="Maximum Members"
          error={errors.maxMembers}
          icon={<Users className="w-4 h-4" />}
        >
          <input
            type="number"
            required
            min="2"
            max="1000"
            value={formData.maxMembers}
            onChange={(e) => setFormData({ ...formData, maxMembers: e.target.value })}
            onBlur={() => handleBlur('maxMembers')}
            className="input-dark"
          />
        </FormField>

        {/* Error Message */}
        {isError && (
          <div className="flex items-center gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20">
            <AlertTriangle className="w-5 h-5 text-red-400 shrink-0" />
            <p className="text-sm text-red-400">
              {error?.message?.includes('User rejected')
                ? 'Transaction was rejected in wallet'
                : error?.message || 'Failed to create Chama'}
            </p>
          </div>
        )}

        {/* Success Message */}
        {isSuccess && (
          <div className="flex items-center gap-3 p-4 rounded-xl bg-primary-500/10 border border-primary-500/20">
            <CheckCircle className="w-5 h-5 text-primary-400 shrink-0" />
            <p className="text-sm text-primary-400">
              Chama created successfully! Redirecting to discover...
            </p>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isPending || isSuccess}
          className="w-full btn-primary py-4 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Confirm in Wallet...
            </>
          ) : isSuccess ? (
            <>
              <CheckCircle className="w-5 h-5" />
              Created!
            </>
          ) : (
            'Create Chama'
          )}
        </button>
      </form>
    </div>
  );
}

function FormField({
  label,
  error,
  hint,
  icon,
  children,
}: {
  label: string;
  error?: string;
  hint?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="flex items-center gap-2 text-sm font-medium text-white/60 mb-2">
        {icon}
        {label}
      </label>
      {children}
      {error && (
        <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
          <AlertTriangle className="w-3 h-3" />
          {error}
        </p>
      )}
      {hint && !error && (
        <p className="mt-1.5 text-xs text-white/30 flex items-center gap-1">
          <Info className="w-3 h-3" />
          {hint}
        </p>
      )}
    </div>
  );
}
