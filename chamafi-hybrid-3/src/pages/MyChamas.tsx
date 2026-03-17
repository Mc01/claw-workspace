import { useAccount } from 'wagmi';
import { useChamaFactory } from '../hooks/useChamaFactory';
import { ChamaCard, ChamaCardSkeleton } from '../components/ChamaCard';
import { Wallet, PlusCircle, Compass, Users, TrendingUp, Trophy, LayoutGrid } from 'lucide-react';
import { Link } from 'react-router-dom';

export function MyChamas() {
  const { isConnected } = useAccount();
  const { allChamas, isLoadingChamas } = useChamaFactory();

  // Filter chamas where user is a member
  // Note: In a production app, this should be indexed for efficiency
  const userChamas = allChamas;

  if (!isConnected) {
    return (
      <div className="glass-card p-12 text-center animate-fade-in">
        <div className="w-16 h-16 rounded-2xl bg-primary-500/10 flex items-center justify-center mx-auto mb-4">
          <Wallet className="w-8 h-8 text-primary-400/60" />
        </div>
        <h2 className="text-xl font-semibold text-white mb-2">
          Connect Your Wallet
        </h2>
        <p className="text-white/40 mb-6 max-w-sm mx-auto">
          Connect your wallet to view your Chamas and track your savings progress.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3">
            <LayoutGrid className="w-8 h-8 text-primary-400" />
            My Dashboard
          </h1>
          <p className="text-white/40 mt-1">Your savings overview</p>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/app/discover" className="btn-ghost inline-flex items-center gap-2 text-sm">
            <Compass className="w-4 h-4" />
            Discover
          </Link>
          <Link to="/app/create" className="btn-primary inline-flex items-center gap-2 text-sm">
            <PlusCircle className="w-4 h-4" />
            Create
          </Link>
        </div>
      </div>

      {/* Stats Dashboard */}
      <div className="grid sm:grid-cols-3 gap-4">
        <DashboardStat
          icon={<Users className="w-5 h-5 text-blue-400" />}
          label="Joined Chamas"
          value={isLoadingChamas ? '—' : (userChamas?.length || 0).toString()}
          gradient="from-blue-500/20 to-cyan-500/20"
        />
        <DashboardStat
          icon={<TrendingUp className="w-5 h-5 text-primary-400" />}
          label="Active"
          value={isLoadingChamas ? '—' : '0'}
          gradient="from-primary-500/20 to-emerald-500/20"
        />
        <DashboardStat
          icon={<Trophy className="w-5 h-5 text-amber-400" />}
          label="Graduated"
          value={isLoadingChamas ? '—' : '0'}
          gradient="from-amber-500/20 to-orange-500/20"
        />
      </div>

      {/* Chama List */}
      {isLoadingChamas ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <ChamaCardSkeleton key={i} />
          ))}
        </div>
      ) : userChamas && userChamas.length > 0 ? (
        <div>
          <h2 className="text-lg font-semibold text-white/80 mb-4">Your Chamas</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {userChamas.map((chamaAddress) => (
              <ChamaCard key={chamaAddress} address={chamaAddress} />
            ))}
          </div>
        </div>
      ) : (
        <EmptyDashboard />
      )}
    </div>
  );
}

function DashboardStat({ icon, label, value, gradient }: {
  icon: React.ReactNode;
  label: string;
  value: string;
  gradient: string;
}) {
  return (
    <div className="glass-card p-5 relative overflow-hidden">
      {/* Background gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-30 pointer-events-none`} />
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-3">
          {icon}
          <span className="text-sm text-white/40 font-medium">{label}</span>
        </div>
        <p className="text-3xl font-bold text-white">{value}</p>
      </div>
    </div>
  );
}

function EmptyDashboard() {
  return (
    <div className="glass-card p-12 text-center">
      <div className="w-16 h-16 rounded-2xl bg-primary-500/10 flex items-center justify-center mx-auto mb-4">
        <Users className="w-8 h-8 text-primary-400/60" />
      </div>
      <h3 className="text-lg font-semibold text-white mb-2">
        No Chamas Yet
      </h3>
      <p className="text-white/40 mb-6 max-w-sm mx-auto">
        You haven't joined any Chamas yet. Start by discovering existing ones or create your own savings circle.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link
          to="/app/discover"
          className="btn-primary inline-flex items-center justify-center gap-2"
        >
          <Compass className="w-4 h-4" />
          Discover Chamas
        </Link>
        <Link
          to="/app/create"
          className="btn-secondary inline-flex items-center justify-center gap-2"
        >
          <PlusCircle className="w-4 h-4" />
          Create Chama
        </Link>
      </div>
    </div>
  );
}
