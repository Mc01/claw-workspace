import { useAccount } from 'wagmi';
import { useChamaFactory, useUserChamas } from '../hooks/useChamaFactory';
import { ChamaCard, ChamaCardSkeleton } from '../components/ChamaCard';
import { Wallet, PlusCircle, Compass, Users, TrendingUp, Trophy, LayoutGrid } from 'lucide-react';
import { Link } from 'react-router-dom';

export function MyChamas() {
  const { isConnected, address: userAddress } = useAccount();
  const { allChamas, isLoadingChamas } = useChamaFactory();
  
  // Filter chamas where user is a member
  const { userChamas, isLoading: isLoadingUserChamas } = useUserChamas(
    allChamas,
    userAddress
  );

  // Calculate stats
  const activeCount = userChamas?.length || 0;
  const graduatedCount = 0; // TODO: fetch graduation status for each chama

  if (!isConnected) {
    return (
      <div className="glass-card p-12 text-center animate-fade-in">
        <div className="w-16 h-16 rounded-2xl bg-lime/10 flex items-center justify-center mx-auto mb-4 border border-mint/10">
          <Wallet className="w-8 h-8 text-lime/60" />
        </div>
        <h2 className="text-xl font-semibold text-cream mb-2">
          Connect Your Wallet
        </h2>
        <p className="text-sand/50 mb-6 max-w-sm mx-auto">
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
          <h1 className="text-2xl md:text-3xl font-bold text-cream flex items-center gap-3">
            <LayoutGrid className="w-8 h-8 text-lime" />
            My Dashboard
          </h1>
          <p className="text-sand/60 mt-1">Your savings overview</p>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/app/discover" className="btn-secondary inline-flex items-center gap-2 text-sm">
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
          icon={<Users className="w-5 h-5 text-clay" />}
          label="Joined Chamas"
          value={isLoadingChamas || isLoadingUserChamas ? '—' : (userChamas?.length || 0).toString()}
          gradient="from-clay/30 to-soil/30"
          borderColor="border-clay/20"
        />
        <DashboardStat
          icon={<TrendingUp className="w-5 h-5 text-lime" />}
          label="Active"
          value={isLoadingChamas || isLoadingUserChamas ? '—' : activeCount.toString()}
          gradient="from-lime/20 to-forest/20"
          borderColor="border-lime/20"
          accentColor="text-mint"
        />
        <DashboardStat
          icon={<Trophy className="w-5 h-5 text-sun-gold" />}
          label="Graduated"
          value={isLoadingChamas || isLoadingUserChamas ? '—' : graduatedCount.toString()}
          gradient="from-sun-gold/20 to-ochre/20"
          borderColor="border-sun-gold/20"
          accentColor="text-sun-gold"
        />
      </div>

      {/* Chama List */}
      {isLoadingChamas || isLoadingUserChamas ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <ChamaCardSkeleton key={i} />
          ))}
        </div>
      ) : userChamas && userChamas.length > 0 ? (
        <div>
          <h2 className="text-lg font-semibold text-sand/80 mb-4">Your Chamas</h2>
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

function DashboardStat({ 
  icon, 
  label, 
  value, 
  gradient,
  borderColor = "border-sand/10",
  accentColor = "text-cream"
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  gradient: string;
  borderColor?: string;
  accentColor?: string;
}) {
  return (
    <div className={`glass-card p-5 relative overflow-hidden border ${borderColor}`}>
      {/* Background gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-40 pointer-events-none`} />
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-3">
          {icon}
          <span className="text-sm text-sand/50 font-medium">{label}</span>
        </div>
        <p className={`text-3xl font-bold ${accentColor}`}>{value}</p>
      </div>
    </div>
  );
}

function EmptyDashboard() {
  return (
    <div className="glass-card p-12 text-center">
      <div className="w-16 h-16 rounded-2xl bg-lime/10 flex items-center justify-center mx-auto mb-4 border border-mint/10">
        <Users className="w-8 h-8 text-lime/60" />
      </div>
      <h3 className="text-lg font-semibold text-cream mb-2">
        No Chamas Yet
      </h3>
      <p className="text-sand/50 mb-6 max-w-sm mx-auto">
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
