import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, PlusCircle, Compass } from 'lucide-react';
import { useChamaFactory } from '../hooks/useChamaFactory';
import { ChamaCard, ChamaCardSkeleton } from '../components/ChamaCard';
import { useChamaDetailsBatch } from '../hooks/useChama';
import { StaggerContainer, StaggerItem, StaggerGrid, StaggerGridItem } from '../components/animations';
import type { Address } from 'viem';

type FilterType = 'all' | 'open' | 'graduated';

interface ChamaInfo {
  address: Address;
  name?: string;
  graduated?: boolean;
}

// Gradient Orb Component
function GradientOrb({ className }: { className?: string }) {
  return (
    <motion.div
      className={`absolute rounded-full blur-[100px] pointer-events-none ${className}`}
      animate={{
        scale: [1, 1.1, 1],
        opacity: [0.3, 0.5, 0.3],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  );
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
    <div className="relative space-y-8 min-h-screen">
      {/* Gradient Orb Background Effects */}
      <GradientOrb className="w-[500px] h-[500px] bg-mint/20 -top-32 -left-32" />
      <GradientOrb className="w-[400px] h-[400px] bg-lime/15 top-1/4 -right-32" />
      <GradientOrb className="w-[300px] h-[300px] bg-sand/10 bottom-1/4 left-1/4" />

      <motion.div 
        className="relative z-10 space-y-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {/* Page Header */}
        <motion.div 
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div>
            <motion.h1 
              className="text-2xl md:text-3xl font-bold text-cream flex items-center gap-3 font-sans"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              >
                <Compass className="w-8 h-8 text-mint" />
              </motion.div>
              Discover Chamas
            </motion.h1>
            <motion.p 
              className="text-sand mt-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Find and join community savings groups
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Link
              to="/app/create"
              className="inline-flex items-center gap-2 px-6 py-3 bg-leaf text-white font-semibold border-2 border-cream/20 shadow-[4px_4px_0px_rgba(245,236,215,0.2)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_rgba(245,236,215,0.25)] active:translate-x-[0px] active:translate-y-[0px] active:shadow-none transition-all duration-150 self-start rounded-lg relative overflow-hidden group"
            >
              {/* Shimmer effect on hover */}
              <div className="absolute inset-0 overflow-hidden rounded-lg pointer-events-none">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.6 }}
                />
              </div>
              <PlusCircle className="w-4 h-4 relative z-10" />
              <span className="relative z-10">Create Chama</span>
            </Link>
          </motion.div>
        </motion.div>

        {/* Search and Filters */}
        <motion.div 
          className="flex flex-col sm:flex-row gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-sand/50" />
            <input
              type="text"
              placeholder="Search by name or address..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-white/[0.04] backdrop-blur-xl border border-white/[0.1] rounded-xl text-cream placeholder-sand/40 focus:outline-none focus:ring-2 focus:ring-mint/50 focus:border-mint/50 transition-all duration-200 hover:bg-white/[0.06] hover:border-white/[0.15]"
            />
          </div>

          <div className="flex items-center gap-1 bg-white/[0.04] backdrop-blur-xl border border-white/[0.1] rounded-xl p-1">
            <Filter className="w-4 h-4 text-sand/50 ml-3 mr-1" />
            <AnimatePresence mode="wait">
              {(['all', 'open', 'graduated'] as FilterType[]).map((f, index) => (
                <motion.button
                  key={f}
                  onClick={() => setFilter(f)}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2, delay: 0.5 + index * 0.05 }}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    filter === f
                      ? 'bg-mint/20 text-mint border border-mint/30 shadow-[0_0_15px_rgba(196,232,106,0.1)]'
                      : 'text-sand/60 hover:text-cream hover:bg-white/[0.06]'
                  }`}
                >
                  {f.charAt(0).toUpperCase() + f.slice(1)}
                </motion.button>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Chama Grid */}
        <AnimatePresence mode="wait">
          {isLoading ? (
            <StaggerContainer 
              key="loading"
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" 
              staggerDelay={0.1}
            >
              {[...Array(6)].map((_, i) => (
                <StaggerItem key={i}>
                  <ChamaCardSkeleton />
                </StaggerItem>
              ))}
            </StaggerContainer>
          ) : filteredChamas && filteredChamas.length > 0 ? (
            <motion.div key="grid">
              {/* Results count indicator */}
              <motion.p
                className="text-sm text-sand/40 mb-4 flex items-center gap-1.5"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.35, delay: 0.1 }}
              >
                <motion.span
                  className="font-semibold text-sand/60"
                  key={filteredChamas.length}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                >
                  {filteredChamas.length}
                </motion.span>
                {filteredChamas.length === 1 ? 'chama found' : 'chamas found'}
              </motion.p>
              <StaggerGrid className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={0.07}>
                {filteredChamas.map((chamaAddress) => (
                  <StaggerGridItem key={chamaAddress}>
                    <ChamaCard address={chamaAddress} />
                  </StaggerGridItem>
                ))}
              </StaggerGrid>
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <EmptyState searchTerm={searchTerm} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

function EmptyState({ searchTerm }: { searchTerm: string }) {
  return (
    <div className="bg-white/[0.04] backdrop-blur-xl border border-white/[0.1] rounded-2xl p-12 text-center shadow-[0_4px_24px_rgba(0,0,0,0.2)]">
      <motion.div 
        className="w-16 h-16 rounded-2xl bg-mint/10 border border-mint/20 flex items-center justify-center mx-auto mb-4"
        animate={{ 
          y: [0, -4, 0],
          rotate: [0, 5, -5, 0],
        }}
        transition={{ 
          duration: 4, 
          repeat: Infinity, 
          ease: 'easeInOut' 
        }}
      >
        <Compass className="w-8 h-8 text-mint/60" />
      </motion.div>
      <h3 className="text-lg font-semibold text-cream mb-2 font-sans">
        {searchTerm ? 'No Chamas Found' : 'No Chamas Yet'}
      </h3>
      <p className="text-sand/60 mb-6 max-w-sm mx-auto">
        {searchTerm
          ? 'No Chamas match your search. Try a different name or address.'
          : 'Be the first to create a savings circle for your community.'}
      </p>
      {!searchTerm && (
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Link 
            to="/app/create" 
            className="inline-flex items-center gap-2 px-6 py-3 bg-leaf text-white font-semibold border-2 border-cream/20 shadow-[4px_4px_0px_rgba(245,236,215,0.2)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_rgba(245,236,215,0.25)] active:translate-x-[0px] active:translate-y-[0px] active:shadow-none transition-all duration-150 rounded-lg"
          >
            <PlusCircle className="w-4 h-4" />
            Create First Chama
          </Link>
        </motion.div>
      )}
    </div>
  );
}
