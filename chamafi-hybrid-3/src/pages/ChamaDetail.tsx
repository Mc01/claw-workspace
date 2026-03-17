import { useParams, Link } from 'react-router-dom';
import { useAccount } from 'wagmi';
import { ArrowLeft, Users, Clock, User, ExternalLink } from 'lucide-react';
import { useChama, useJoinChama, useContribute, useRefund } from '../hooks/useChama';
import { ProgressBar } from '../components/ProgressBar';
import { formatAddress, formatAmount, formatDateTime, isExpired, getDaysRemaining } from '../lib/utils';
import { useState } from 'react';
import { cn } from '../lib/utils';

export function ChamaDetail() {
  const { address } = useParams<{ address: string }>();
  const { address: userAddress } = useAccount();
  const [contributionAmount, setContributionAmount] = useState('');

  const { 
    params, 
    progress, 
    graduated, 
    memberCount, 
    members, 
    isMember, 
    userContribution, 
    creator,
    isLoading 
  } = useChama(address || null);

  const { join, isPending: isJoining } = useJoinChama(address || null);
  const { contribute, isPending: isContributing } = useContribute(address || null);
  const { refund, isPending: isRefunding } = useRefund(address || null);

  const expired = isExpired(params?.deadline);
  const daysLeft = getDaysRemaining(params?.deadline);

  // Check if user has contributed
  const hasContributed = userContribution !== undefined && userContribution > BigInt(0);

  const handleContribute = async () => {
    if (!contributionAmount) return;
    await contribute(contributionAmount, 18);
    setContributionAmount('');
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/3" />
          <div className="h-64 bg-gray-200 rounded" />
        </div>
      </div>
    );
  }

  if (!address || !params) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Chama not found</p>
        <Link to="/discover" className="text-primary-600 hover:underline mt-2 inline-block">
          Back to Discover
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Back Link */}
      <Link 
        to="/discover" 
        className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Discover
      </Link>

      {/* Header */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Chama #{address.slice(-6)}
            </h1>
            <p className="text-sm text-gray-500 font-mono">
              {formatAddress(address)}
            </p>
          </div>
          <span className={cn(
            "px-4 py-2 rounded-full text-sm font-medium self-start",
            graduated
              ? "bg-green-100 text-green-700"
              : expired
              ? "bg-red-100 text-red-700"
              : "bg-primary-100 text-primary-700"
          )}>
            {graduated ? 'Graduated' : expired ? 'Expired' : 'Active'}
          </span>
        </div>

        <ProgressBar
          current={progress?.current}
          target={progress?.target}
          percentage={progress?.percentage}
          className="mt-6"
        />
      </div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center gap-2 text-gray-500 mb-1">
            <Users className="w-4 h-4" />
            <span className="text-sm">Members</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{memberCount ? memberCount.toString() : '0'}</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center gap-2 text-gray-500 mb-1">
            <Clock className="w-4 h-4" />
            <span className="text-sm">{expired ? 'Ended' : 'Time Left'}</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">
            {expired ? 'Ended' : `${daysLeft} days`}
          </p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center gap-2 text-gray-500 mb-1">
            <span className="text-sm">Target</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">
            {formatAmount(progress?.target, 18)}
          </p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center gap-2 text-gray-500 mb-1">
            <span className="text-sm">Raised</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">
            {formatAmount(progress?.current, 18)}
          </p>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Left Column - Actions */}
        <div className="space-y-6">
          {/* Join Section */}
          {!isMember && !graduated && !expired && (
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="font-semibold text-lg text-gray-900 mb-4">Join Chama</h3>
              <p className="text-gray-600 mb-4">
                Join this savings group to start contributing towards the goal.
              </p>
              <button
                onClick={() => join()}
                disabled={isJoining}
                className="w-full py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 disabled:opacity-50 transition-colors"
              >
                {isJoining ? 'Joining...' : 'Join Chama'}
              </button>
            </div>
          )}

          {/* Contribute Section */}
          {isMember && !graduated && !expired && (
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="font-semibold text-lg text-gray-900 mb-4">Contribute</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Amount ({formatAddress(params.tokenAddress)})
                  </label>
                  <input
                    type="number"
                    value={contributionAmount}
                    onChange={(e) => setContributionAmount(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    placeholder="Enter amount"
                    min="0.01"
                    step="0.01"
                  />
                </div>
                <button
                  onClick={handleContribute}
                  disabled={isContributing || !contributionAmount}
                  className="w-full py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 disabled:opacity-50 transition-colors"
                >
                  {isContributing ? 'Contributing...' : 'Contribute'}
                </button>
              </div>
            </div>
          )}

          {/* Refund Section */}
          {isMember && expired && !graduated && hasContributed && (
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="font-semibold text-lg text-gray-900 mb-4">Claim Refund</h3>
              <p className="text-gray-600 mb-4">
                This Chama did not reach its target. Claim your contribution back.
              </p>
              <button
                onClick={() => refund()}
                disabled={isRefunding}
                className="w-full py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 disabled:opacity-50 transition-colors"
              >
                {isRefunding ? 'Processing...' : 'Claim Refund'}
              </button>
            </div>
          )}

          {/* Your Contribution */}
          {isMember && (
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="font-semibold text-lg text-gray-900 mb-4">Your Contribution</h3>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Total Contributed</span>
                <span className="text-2xl font-bold text-primary-600">
                  {formatAmount(userContribution, 18)}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Right Column - Details */}
        <div className="space-y-6">
          {/* Chama Info */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="font-semibold text-lg text-gray-900 mb-4">Chama Details</h3>
            <div className="space-y-3">
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600">Creator</span>
                <span className="font-mono text-sm">{formatAddress(creator)}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600">Min Contribution</span>
                <span>{formatAmount(params.minContribution, 18)}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600">Token</span>
                <span className="font-mono text-sm">{formatAddress(params.tokenAddress)}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600">Deadline</span>
                <span>{formatDateTime(params.deadline)}</span>
              </div>
            </div>
          </div>

          {/* Members List */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="font-semibold text-lg text-gray-900 mb-4">
              Members ({memberCount ? memberCount.toString() : '0'})
            </h3>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {members?.map((member) => (
                <div 
                  key={member}
                  className="flex items-center gap-2 py-2 px-3 bg-gray-50 rounded-lg"
                >
                  <User className="w-4 h-4 text-gray-400" />
                  <span className="font-mono text-sm flex-1">{formatAddress(member)}</span>
                  {member === creator && (
                    <span className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded">
                      Creator
                    </span>
                  )}
                  {member === userAddress && (
                    <span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded">
                      You
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* View on Explorer */}
          <a
            href={`https://celoscan.io/address/${address}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-3 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors"
          >
            View on Celo Explorer
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
