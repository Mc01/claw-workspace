import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCreateChama } from '../hooks/useChamaFactory';
import { TOKEN_OPTIONS, getTokenAddress, type TokenSymbol } from '../config/contracts';
import { useAccount, useBalance, useChainId } from 'wagmi';
import { formatUnits } from 'viem';
import { Calendar, DollarSign, Users, PlusCircle, Loader2, CheckCircle, AlertTriangle, Info } from 'lucide-react';
import { FocusRing } from '../components/animations';
import { useToast } from '../components/Toast';

interface FormErrors {
  name?: string;
  targetAmount?: string;
  deadline?: string;
  minMembers?: string;
}

export function Create() {
  const navigate = useNavigate();
  const chainId = useChainId();
  const { createChama, isPending, isSuccess, isError, error } = useCreateChama();
  const { addToast } = useToast();
  const { address } = useAccount();

  const [formData, setFormData] = useState({
    name: '',
    token: 'cUSD' as TokenSymbol,
    targetAmount: '',
    deadline: '',
    minMembers: '2',
  });
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [focused, setFocused] = useState<Record<string, boolean>>({});

  const handleFocus = (field: string) => {
    setFocused((prev) => ({ ...prev, [field]: true }));
  };

  const handleFocusBlur = (field: string) => {
    setFocused((prev) => ({ ...prev, [field]: false }));
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  // Validation — matches contract requirements:
  //   name.length > 0, asset != address(0), minMembers >= 2, targetCapital >= 200e18
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
      const now = new Date();
      if (deadlineDate <= now) {
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



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setTouched({
      name: true,
      targetAmount: true,
      deadline: true,
      minMembers: true,
    });
    setFocused({});

    if (!isValid) return;

    addToast('Creating Chama... Confirm in your wallet', 'pending', 0);

    try {
      const tokenAddress = getTokenAddress(chainId, formData.token);
      // deadline: 0 means no deadline, otherwise unix timestamp
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
    <motion.div 
      className="max-w-2xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {/* Header */}
      <motion.div 
        className="flex items-center gap-3 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <motion.div 
          className="w-10 h-10 rounded-xl bg-lime/15 flex items-center justify-center border border-mint/20"
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ duration: 0.3 }}
        >
          <PlusCircle className="w-5 h-5 text-lime" />
        </motion.div>
        <div>
          <h1 className="text-2xl font-bold text-cream">Create New Chama</h1>
          <p className="text-sand/50 text-sm">Set up a community savings circle</p>
        </div>
      </motion.div>

      <motion.form 
        onSubmit={handleSubmit} 
        className="glass-card p-6 md:p-8 space-y-6 relative overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {/* Success overlay */}
        <AnimatePresence>
          {isSuccess && (
            <motion.div 
              className="absolute inset-0 bg-surface/95 backdrop-blur-xl z-20 flex items-center justify-center rounded-2xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="text-center"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <motion.div
                  className="w-20 h-20 rounded-full bg-lime/20 border border-lime/30 flex items-center justify-center mx-auto mb-4"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 15, delay: 0.1 }}
                >
                  <CheckCircle className="w-10 h-10 text-lime" />
                </motion.div>
                <h3 className="text-xl font-bold text-cream mb-2">Chama Created!</h3>
                <p className="text-sand/60">Redirecting to discover...</p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Name */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <FormField label="Chama Name" error={errors.name}>
            <FocusRing isFocused={!!focused.name} hasError={!!errors.name}>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                onFocus={() => handleFocus('name')}
                onBlur={() => handleFocusBlur('name')}
                className="input-dark"
                placeholder="e.g., Friends Savings 2024"
              />
            </FocusRing>
          </FormField>
        </motion.div>

        {/* Token Selection */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.35 }}
        >
          <label className="block text-sm font-medium text-sand/70 mb-3">
            Savings Asset
          </label>
          <div className="grid grid-cols-3 gap-3">
            {TOKEN_OPTIONS.map((token, index) => (
              <motion.button
                key={token.symbol}
                type="button"
                onClick={() => setFormData({ ...formData, token: token.symbol })}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.4 + index * 0.05 }}
                className={`p-3 rounded-xl border text-center transition-all duration-200 relative overflow-hidden ${
                  formData.token === token.symbol
                    ? 'bg-lime/15 text-mint border-mint/40 shadow-[0_0_20px_rgba(196,232,106,0.15)]'
                    : 'bg-white/[0.03] text-sand/70 border-sand/10 hover:border-sand/20 hover:bg-white/[0.05]'
                }`}
              >
                {formData.token === token.symbol && (
                  <motion.div
                    className="absolute inset-0 bg-mint/5"
                    layoutId="tokenSelection"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <div className="font-semibold text-sm relative z-10">{token.symbol}</div>
                <div className="text-xs opacity-50 mt-0.5 relative z-10">{token.name}</div>
              </motion.button>
            ))}
          </div>
          <TokenBalance address={address} chainId={chainId} token={formData.token} />
        </motion.div>

        {/* Target Amount */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          <FormField
            label={`Target Capital (${formData.token})`}
            error={errors.targetAmount}
            icon={<DollarSign className="w-4 h-4 text-sand/50" />}
            hint="Minimum 200 (contract requirement)"
          >
            <FocusRing isFocused={!!focused.targetAmount} hasError={!!errors.targetAmount}>
              <input
                type="number"
                required
                min="200"
                step="0.01"
                value={formData.targetAmount}
                onChange={(e) => setFormData({ ...formData, targetAmount: e.target.value })}
                onFocus={() => handleFocus('targetAmount')}
                onBlur={() => handleFocusBlur('targetAmount')}
                className="input-dark"
                placeholder="e.g., 1000"
              />
            </FocusRing>
          </FormField>
        </motion.div>

        {/* Min Members */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.45 }}
        >
          <FormField
            label="Minimum Members"
            error={errors.minMembers}
            icon={<Users className="w-4 h-4 text-sand/50" />}
            hint="2–100 members. Chama activates when this many members join."
          >
            <FocusRing isFocused={!!focused.minMembers} hasError={!!errors.minMembers}>
              <input
                type="number"
                required
                min="2"
                max="100"
                value={formData.minMembers}
                onChange={(e) => setFormData({ ...formData, minMembers: e.target.value })}
                onFocus={() => handleFocus('minMembers')}
                onBlur={() => handleFocusBlur('minMembers')}
                className="input-dark"
              />
            </FocusRing>
          </FormField>
        </motion.div>

        {/* Deadline */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
        >
          <FormField
            label="Deadline"
            error={errors.deadline}
            icon={<Calendar className="w-4 h-4 text-sand/50" />}
            hint="Optional — leave empty for no deadline"
          >
            <FocusRing isFocused={!!focused.deadline} hasError={!!errors.deadline}>
              <input
                type="datetime-local"
                value={formData.deadline}
                onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                onFocus={() => handleFocus('deadline')}
                onBlur={() => handleFocusBlur('deadline')}
                className="input-dark [color-scheme:dark]"
              />
            </FocusRing>
          </FormField>
        </motion.div>

        {/* Error Message */}
        <AnimatePresence>
          {isError && (
            <motion.div 
              className="flex items-center gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20"
              initial={{ opacity: 0, y: -10, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, y: -10, height: 0 }}
            >
              <AlertTriangle className="w-5 h-5 text-red-400 shrink-0" />
              <p className="text-sm text-red-400">
                {error?.message?.includes('User rejected')
                  ? 'Transaction was rejected in wallet'
                  : error?.message || 'Failed to create Chama'}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Submit Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.55 }}
        >
          <motion.button
            type="submit"
            disabled={isPending || isSuccess}
            whileHover={!isPending && !isSuccess ? { scale: 1.01, y: -1 } : {}}
            whileTap={!isPending && !isSuccess ? { scale: 0.99 } : {}}
            className="w-full btn-primary py-4 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden"
          >
            {/* Shimmer effect */}
            {!isPending && !isSuccess && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.6 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-2">
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
            </span>
          </motion.button>
        </motion.div>
      </motion.form>
    </motion.div>
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
      <label className="flex items-center gap-2 text-sm font-medium text-sand/70 mb-2">
        {icon}
        {label}
      </label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p 
            className="mt-1.5 text-xs text-red-400 flex items-center gap-1"
            initial={{ opacity: 0, y: -5, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -5, height: 0 }}
          >
            <AlertTriangle className="w-3 h-3" />
            {error}
          </motion.p>
        )}
      </AnimatePresence>
      {!error && hint && (
        <p className="mt-1.5 text-xs text-sand/40 flex items-center gap-1">
          <Info className="w-3 h-3" />
          {hint}
        </p>
      )}
    </div>
  );
}

function TokenBalance({
  address,
  chainId,
  token,
}: {
  address: `0x${string}` | undefined;
  chainId: number;
  token: TokenSymbol;
}) {
  const tokenAddress = getTokenAddress(chainId, token);

  const { data: balance, isLoading } = useBalance({
    address,
    token: tokenAddress !== '0x0000000000000000000000000000000000000000' ? tokenAddress : undefined,
    query: { enabled: !!address },
  });

  if (!address) return null;

  return (
    <motion.p
      key={token}
      className="mt-2 text-xs text-sand/50 flex items-center gap-1"
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      {isLoading ? (
        <span className="animate-pulse">Loading balance...</span>
      ) : balance ? (
        <>Balance: <span className="text-mint font-medium">{parseFloat(formatUnits(balance.value, balance.decimals)).toFixed(2)} {token}</span></>
      ) : (
        <span>Balance: — {token}</span>
      )}
    </motion.p>
  );
}
