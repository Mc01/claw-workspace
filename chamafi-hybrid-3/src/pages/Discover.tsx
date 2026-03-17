import { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { useChamaFactory } from '../hooks/useChamaFactory';
import { ChamaCard } from '../components/ChamaCard';

type FilterType = 'all' | 'open' | 'graduated';

export function Discover() {
  const { allChamas, isLoadingChamas } = useChamaFactory();
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<FilterType>('all');

  // Filter chamas based on status and search
  const filteredChamas = allChamas?.filter((chamaAddress) => {
    // Note: In a real app, we'd have the name stored on-chain or indexed
    // For now, we just filter by address contains
    if (searchTerm && !chamaAddress.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Discover Chamas</h1>
        
        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by address..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          
          <div className="flex items-center gap-2 bg-white border border-gray-300 rounded-lg p-1">
            <Filter className="w-4 h-4 text-gray-400 ml-2" />
            {(['all', 'open', 'graduated'] as FilterType[]).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  filter === f
                    ? 'bg-primary-100 text-primary-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Chama Grid */}
      {isLoadingChamas ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-200 p-6 animate-pulse">
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-4" />
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-6" />
              <div className="h-3 bg-gray-200 rounded w-full" />
            </div>
          ))}
        </div>
      ) : filteredChamas && filteredChamas.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredChamas.map((chamaAddress) => (
            <ChamaCard key={chamaAddress} address={chamaAddress} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500">
            {searchTerm ? 'No Chamas match your search' : 'No Chamas found. Be the first to create one!'}
          </p>
        </div>
      )}
    </div>
  );
}
