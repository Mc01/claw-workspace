import * as React from "react";
import { useAccount } from 'wagmi';
import { motion } from 'framer-motion';
import { useChamaFactory, useUserChamas } from '../hooks/useChamaFactory';
import { ChamaCard, ChamaCardSkeleton } from '../components/ChamaCard';
import { Wallet, PlusCircle, Compass, Users, TrendingUp, Trophy, LayoutGrid } from 'lucide-react';
import { Link } from 'react-router-dom';
import { StaggerContainer, StaggerItem, AnimatedNumber, StaggerGrid, StaggerGridItem, HoverCard } from '../components/animations';

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
      <motion.div 
        className="glass-card p-12 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <motion.div 
          className="w-16 h-16 rounded-2xl bg-lime/10 flex items-center justify-center mx-auto mb-4 border border-mint/20" style={{ boxShadow: '0 0 20px rgba(196,232,106,0.08)' }}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.1 }}
        >
          <Wallet className="w-8 h-8 text-lime" />
        </motion.div>
        <motion.h2 
          className="text-xl font-semibold text-cream mb-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          Connect Your Wallet
        </motion.h2>
        <motion.p 
          className="text-sand/60 mb-6 max-w-sm mx-auto"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          Connect your wallet to view your Chamas and track your savings progress.
        </motion.p>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="space-y-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {/* Page Header */}
      <motion.div 
        className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div>
          <motion.h1 
            className="text-2xl md:text-3xl font-bold text-cream flex items-center gap-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <motion.div
              whileHover={{ rotate: 10, scale: 1.1 }}
              transition={{ duration: 0.3 }}
            >
              <LayoutGrid className="w-8 h-8 text-lime" />
            </motion.div>
            My Dashboard
          </motion.h1>
          <motion.p 
            className="text-sand/60 mt-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Your savings overview
          </motion.p>
        </div>
        <motion.div 
          className="flex items-center gap-3"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Link to="/app/discover" className="btn-secondary inline-flex items-center gap-2 text-sm">
              <Compass className="w-4 h-4" />
              Discover
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Link to="/app/create" className="btn-primary inline-flex items-center gap-2 text-sm">
              <PlusCircle className="w-4 h-4" />
              Create
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Stats Dashboard */}
      <motion.div 
        className="grid sm:grid-cols-3 gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <StaggerContainer staggerDelay={0.1}>
          <StaggerItem>
            <DashboardStat
              icon={<Users className="w-5 h-5 text-clay" />}
              label="Joined Chamas"
              value={isLoadingChamas || isLoadingUserChamas ? '—' : (userChamas?.length || 0).toString()}
              gradient="from-clay/30 to-soil/30"
              borderColor="border-clay/20"
            />
          </StaggerItem>
          <StaggerItem>
            <DashboardStat
              icon={<TrendingUp className="w-5 h-5 text-lime" />}
              label="Active"
              value={isLoadingChamas || isLoadingUserChamas ? '—' : activeCount.toString()}
              gradient="from-lime/20 to-forest/20"
              borderColor="border-lime/20"
              accentColor="text-mint"
            />
          </StaggerItem>
          <StaggerItem>
            <DashboardStat
              icon={<Trophy className="w-5 h-5 text-sun-gold" />}
              label="Graduated"
              value={isLoadingChamas || isLoadingUserChamas ? '—' : graduatedCount.toString()}
              gradient="from-sun-gold/20 to-ochre/20"
              borderColor="border-sun-gold/20"
              accentColor="text-sun-gold"
            />
          </StaggerItem>
        </StaggerContainer>
      </motion.div>

      {/* Chama List */}
      {isLoadingChamas || isLoadingUserChamas ? (
        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={0.1}>
          {[...Array(3)].map((_, i) => (
            <StaggerItem key={i}>
              <ChamaCardSkeleton />
            </StaggerItem>
          ))}
        </StaggerContainer>
      ) : userChamas && userChamas.length > 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <motion.h2 
            className="text-lg font-semibold text-sand/80 mb-4"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            Your Chamas
          </motion.h2>
          <StaggerGrid className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={0.07}>
            {userChamas.map((chamaAddress) => (
              <StaggerGridItem key={chamaAddress}>
                <HoverCard>
                  <ChamaCard address={chamaAddress} />
                </HoverCard>
              </StaggerGridItem>
            ))}
          </StaggerGrid>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <EmptyDashboard />
        </motion.div>
      )}
    </motion.div>
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
    <motion.div 
      className={`glass-card p-5 relative overflow-hidden border ${borderColor}`}
      whileHover={{ 
        y: -4, 
        boxShadow: '0 8px 40px rgba(0,0,0,0.2), 0 0 20px rgba(196,232,106,0.05)',
        transition: { duration: 0.3 }
      }}
      transition={{ duration: 0.2 }}
    >
      {/* Background gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-40 pointer-events-none`} />
      
      {/* Hover glow */}
      <motion.div 
        className="absolute inset-0 bg-mint/5 opacity-0 pointer-events-none"
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
      
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-3">
          <motion.div whileHover={{ scale: 1.1, rotate: 5 }} transition={{ duration: 0.2 }}>
            {icon}
          </motion.div>
          <span className="text-sm text-sand/50 font-medium">{label}</span>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          {/^\d+$/.test(value) ? (
            <p className={`text-3xl font-bold ${accentColor}`}>
              <AnimatedNumber value={parseInt(value, 10)} duration={1.2} delay={0.3} />
            </p>
          ) : (
            <p className={`text-3xl font-bold ${accentColor}`}>{value}</p>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}

function EmptyDashboard() {
  return (
    <div className="glass-card p-12 text-center">
      <motion.div 
        className="w-16 h-16 rounded-2xl bg-lime/10 flex items-center justify-center mx-auto mb-4 border border-mint/20" style={{ boxShadow: '0 0 20px rgba(196,232,106,0.08)' }}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        <Users className="w-8 h-8 text-lime" />
      </motion.div>
      <motion.h3 
        className="text-lg font-semibold text-cream mb-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        No Chamas Yet
      </motion.h3>
      <motion.p 
        className="text-sand/60 mb-6 max-w-sm mx-auto"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        You haven't joined any Chamas yet. Start by discovering existing ones or create your own savings circle.
      </motion.p>
      <motion.div 
        className="flex flex-col sm:flex-row gap-3 justify-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Link
            to="/app/discover"
            className="btn-primary inline-flex items-center justify-center gap-2"
          >
            <Compass className="w-4 h-4" />
            Discover Chamas
          </Link>
        </motion.div>
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Link
            to="/app/create"
            className="btn-secondary inline-flex items-center justify-center gap-2"
          >
            <PlusCircle className="w-4 h-4" />
            Create Chama
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
