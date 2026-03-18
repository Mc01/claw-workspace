import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, PlusCircle, Compass } from 'lucide-react';
import { useChamaFactory } from '../hooks/useChamaFactory';
import { ChamaCard, ChamaCardSkeleton } from '../components/ChamaCard';
import { useChamaDetailsBatch } from '../hooks/useChama';
import type { Address } from 'viem';

type FilterType = 'all' | 'open' | 'graduated';

interface ChamaInfo {
  address: Address;
  name?: string;
  graduated?: boolean;
}

export function Discover() {
  const { allChamas, isLoadingChamas } = useChamaFactory();
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<FilterType>('all');

  // Fetch chama details (names and graduation status) for search and filtering
  const { chamaDetails, isLoading: isLoadingDetails } = useChamaDetailsBatch(allChamas);

  // Create a map for quick lookup
  const chamaInfoMap = useMemo(() => {
    const map = new Map<Address, ChamaInfo>();
    chamaDetails.forEach((info) => {
      map.set(info.address, info);
    });
    return map;
  }, [chamaDetails]);

  const filteredChamas = useMemo(() => {
    if (!allChamas) return [];

    return allChamas.filter((chamaAddress) => {
      const info = chamaInfoMap.get(chamaAddress);

      // Apply filter
      if (filter === 'graduated' && !info?.graduated) {
        return false;
      }
      if (filter === 'open' && info?.graduated) {
        return false;
      }

      // Apply search
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        const addressMatch = chamaAddress.toLowerCase().includes(searchLower);
        const nameMatch = info?.name?.toLowerCase().includes(searchLower);
        if (!addressMatch && !nameMatch) {
          return false;
        }
      }

      return true;
    });
  }, [allChamas, chamaInfoMap, filter, searchTerm]);

  const isLoading = isLoadingChamas || isLoadingDetails;

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-cream flex items-center gap-3 font-sans">
            <Compass className="w-8 h-8 text-mint" />
            Discover Chamas
          </h1>
          <p className="text-sand mt-1">Find and join community savings groups</p>
        </div>

        <Link
          to="/app/create"
          className="inline-flex items-center gap-2 px-6 py-3 bg-leaf text-white font-semibold border-2 border-cream/20 shadow-[4px_4px_0px_rgba(245,236,215,0.2)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_rgba(245,236,215,0.25)] active:translate-x-[0px] active:translate-y-[0px] active:shadow-none transition-all duration-150 self-start rounded-lg"
        >
          <PlusCircle className="w-4 h-4" />
          Create Chama
        </Link>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-sand/50" />
          <input
            type="text"
            placeholder="Search by name or address..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-white/[0.04] backdrop-blur-xl border border-white/[0.1] rounded-xl text-cream placeholder-sand/40 focus:outline-none focus:ring-2 focus:ring-mint/50 focus:border-mint/50 transition-all duration-200"
          />
        </div>

        <div className="flex items-center gap-1 bg-white/[0.04] backdrop-blur-xl border border-white/[0.1] rounded-xl p-1">
          <Filter className="w-4 h-4 text-sand/50 ml-3 mr-1" />
          {(['all', 'open', 'graduated'] as FilterType[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                filter === f
                  ? 'bg-mint/20 text-mint border border-mint/30'
                  : 'text-sand/60 hover:text-cream hover:bg-white/[0.06]'
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Chama Grid */}
      {isLoading ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <ChamaCardSkeleton key={i} />
          ))}
        </div>
      ) : filteredChamas && filteredChamas.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredChamas.map((chamaAddress) => (
            <ChamaCard key={chamaAddress} address={chamaAddress} />
          ))}
        </div>
      ) : (
        <EmptyState searchTerm={searchTerm} />
      )}
    </div>
  );
}

function EmptyState({ searchTerm }: { searchTerm: string }) {
  return (
    <div className="bg-white/[0.04] backdrop-blur-xl border border-white/[0.1] rounded-2xl p-12 text-center shadow-[0_4px_24px_rgba(0,0,0,0.2)]">
      <div className="w-16 h-16 rounded-2xl bg-mint/10 border border-mint/20 flex items-center justify-center mx-auto mb-4">
        <Compass className="w-8 h-8 text-mint/60" />
      </div>
      <h3 className="text-lg font-semibold text-cream mb-2 font-sans">
        {searchTerm ? 'No Chamas Found' : 'No Chamas Yet'}
      </h3>
      <p className="text-sand/60 mb-6 max-w-sm mx-auto">
        {searchTerm
          ? 'No Chamas match your search. Try a different name or address.'
          : 'Be the first to create a savings circle for your community.'}
      </p>
      {!searchTerm && (
        <Link 
          to="/app/create" 
          className="inline-flex items-center gap-2 px-6 py-3 bg-leaf text-white font-semibold border-2 border-cream/20 shadow-[4px_4px_0px_rgba(245,236,215,0.2)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_rgba(245,236,215,0.25)] active:translate-x-[0px] active:translate-y-[0px] active:shadow-none transition-all duration-150 rounded-lg"
        >
          <PlusCircle className="w-4 h-4" />
          Create First Chama
        </Link>
      )}
    </div>
  );
}
