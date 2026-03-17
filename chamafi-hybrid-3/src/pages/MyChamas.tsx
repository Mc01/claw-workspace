import { useAccount } from 'wagmi';
import { useChamaFactory } from '../hooks/useChamaFactory';
import { ChamaCard } from '../components/ChamaCard';
import { Wallet, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export function MyChamas() {
  const { isConnected } = useAccount();
  const { allChamas, isLoadingChamas } = useChamaFactory();

  // Filter chamas where user is a member
  // Note: In a production app, this should be indexed for efficiency
  const userChamas = allChamas;

  if (!isConnected) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Wallet className="w-8 h-8 text-gray-400" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Connect Your Wallet
        </h2>
        <p className="text-gray-600 mb-6">
          Connect your wallet to view your Chamas
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">My Chamas</h1>
        <Link
          to="/discover"
          className="text-primary-600 hover:text-primary-700 font-medium"
        >
          Discover more
        </Link>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-sm text-gray-600 mb-1">Joined Chamas</p>
          <p className="text-2xl font-bold text-gray-900">
            {isLoadingChamas ? '-' : userChamas?.length || 0}
          </p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-sm text-gray-600 mb-1">Active</p>
          <p className="text-2xl font-bold text-green-600">
            {isLoadingChamas ? '-' : '0'}
          </p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-sm text-gray-600 mb-1">Graduated</p>
          <p className="text-2xl font-bold text-primary-600">
            {isLoadingChamas ? '-' : '0'}
          </p>
        </div>
      </div>

      {/* Chama List */}
      {isLoadingChamas ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-200 p-6 animate-pulse">
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-4" />
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-6" />
              <div className="h-3 bg-gray-200 rounded w-full" />
            </div>
          ))}
        </div>
      ) : userChamas && userChamas.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {userChamas.map((chamaAddress) => (
            <ChamaCard key={chamaAddress} address={chamaAddress} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
          <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No Chamas yet
          </h3>
          <p className="text-gray-600 mb-6">
            You haven't joined any Chamas yet. Start by discovering existing ones or create your own.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/discover"
              className="inline-flex items-center justify-center px-6 py-2 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors"
            >
              Discover Chamas
            </Link>
            <Link
              to="/create"
              className="inline-flex items-center justify-center px-6 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
            >
              Create Chama
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
