import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCreateChama } from '../hooks/useChamaFactory';
import { TOKEN_OPTIONS, getTokenAddress, type TokenSymbol } from '../config/contracts';
import { useChainId } from 'wagmi';
import { Calendar, DollarSign, Users } from 'lucide-react';

export function Create() {
  const navigate = useNavigate();
  const chainId = useChainId();
  const { createChama, isPending, isSuccess, isError, error } = useCreateChama();

  const [formData, setFormData] = useState({
    name: '',
    token: 'cUSD' as TokenSymbol,
    targetAmount: '',
    deadline: '',
    minContribution: '',
    maxMembers: '50',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
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
  };

  // Redirect on success
  if (isSuccess) {
    setTimeout(() => navigate('/discover'), 2000);
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Create New Chama</h1>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 p-6 space-y-6">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Chama Name
          </label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="e.g., Friends Savings 2024"
          />
        </div>

        {/* Token Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Savings Asset
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {TOKEN_OPTIONS.map((token) => (
              <button
                key={token.symbol}
                type="button"
                onClick={() => setFormData({ ...formData, token: token.symbol })}
                className={`p-3 rounded-lg border text-center transition-colors ${
                  formData.token === token.symbol
                    ? 'border-primary-500 bg-primary-50 text-primary-700'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <div className="font-medium">{token.symbol}</div>
                <div className="text-xs text-gray-500">{token.name}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Target Amount */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <span className="flex items-center gap-2">
              <DollarSign className="w-4 h-4" />
              Target Amount ({formData.token})
            </span>
          </label>
          <input
            type="number"
            required
            min="1"
            step="0.01"
            value={formData.targetAmount}
            onChange={(e) => setFormData({ ...formData, targetAmount: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="e.g., 1000"
          />
        </div>

        {/* Min Contribution */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Minimum Contribution ({formData.token})
          </label>
          <input
            type="number"
            min="0.01"
            step="0.01"
            value={formData.minContribution}
            onChange={(e) => setFormData({ ...formData, minContribution: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="e.g., 10"
          />
        </div>

        {/* Deadline */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <span className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Deadline
            </span>
          </label>
          <input
            type="datetime-local"
            required
            value={formData.deadline}
            onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>

        {/* Max Members */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <span className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Maximum Members
            </span>
          </label>
          <input
            type="number"
            required
            min="2"
            max="1000"
            value={formData.maxMembers}
            onChange={(e) => setFormData({ ...formData, maxMembers: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>

        {/* Error Message */}
        {isError && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
            {error?.message || 'Failed to create Chama'}
          </div>
        )}

        {/* Success Message */}
        {isSuccess && (
          <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-700">
            Chama created successfully! Redirecting...
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isPending}
          className="w-full py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isPending ? 'Creating...' : 'Create Chama'}
        </button>
      </form>
    </div>
  );
}
