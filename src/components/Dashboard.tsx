import React from 'react';
import { Compass, TrendingUp, Award, Lock, CheckCircle2, Coins, Sparkles, Map, Zap } from 'lucide-react';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { motion } from 'motion/react';
import { UserProfile, Screen } from '../App';

type DashboardProps = {
  userProfile: UserProfile;
  onNavigate: (screen: Screen, challengeId?: string) => void;
};

const levelTopics = {
  Student: [
    { id: 'budgeting-student', title: 'Budgeting Bay', icon: '💰', description: 'Master student finances', difficulty: 1, position: { x: 20, y: 30 } },
    { id: 'credit-student', title: 'Credit Cove', icon: '💳', description: 'Build credit wisely', difficulty: 1, position: { x: 45, y: 20 } },
    { id: 'loans-student', title: 'Loan Lagoon', icon: '🎓', description: 'Navigate student debt', difficulty: 2, position: { x: 70, y: 35 } },
    { id: 'taxes-student', title: 'Tax Territory', icon: '📋', description: 'File with confidence', difficulty: 2, position: { x: 50, y: 60 } },
    { id: 'investing-student', title: 'Investment Isle', icon: '📈', description: 'Start your portfolio', difficulty: 3, position: { x: 25, y: 75 } },
  ],
  Adult: [
    { id: 'budgeting-adult', title: 'Budget Bastion', icon: '💰', description: 'Family finance fortress', difficulty: 1, position: { x: 25, y: 25 } },
    { id: 'insurance-adult', title: 'Insurance Inlet', icon: '🛡️', description: 'Protection harbor', difficulty: 2, position: { x: 55, y: 15 } },
    { id: 'mortgage-adult', title: 'Mortgage Mountains', icon: '🏠', description: 'Home ownership peaks', difficulty: 2, position: { x: 75, y: 40 } },
    { id: 'car-adult', title: 'Auto Atoll', icon: '🚗', description: 'Vehicle finance waters', difficulty: 2, position: { x: 40, y: 55 } },
    { id: 'retirement-adult', title: 'Retirement Realm', icon: '🌴', description: 'Future paradise', difficulty: 3, position: { x: 20, y: 80 } },
  ],
  Expert: [
    { id: 'portfolio-expert', title: 'Portfolio Peaks', icon: '📊', description: 'Investment mastery', difficulty: 2, position: { x: 30, y: 20 } },
    { id: 'tax-expert', title: 'Tax Summit', icon: '📋', description: 'Optimization heights', difficulty: 3, position: { x: 60, y: 30 } },
    { id: 'estate-expert', title: 'Estate Enclave', icon: '📜', description: 'Legacy lands', difficulty: 3, position: { x: 75, y: 55 } },
    { id: 'real-estate-expert', title: 'Property Plains', icon: '🏢', description: 'Real estate realm', difficulty: 3, position: { x: 45, y: 70 } },
    { id: 'wealth-expert', title: 'Wealth Wonderland', icon: '💎', description: 'Ultimate treasure', difficulty: 4, position: { x: 25, y: 85 } },
  ],
};

const explorerRanks = [
  { min: 0, max: 20, name: 'Novice Explorer', color: 'text-gray-400' },
  { min: 21, max: 40, name: 'Scout', color: 'text-blue-400' },
  { min: 41, max: 60, name: 'Navigator', color: 'text-teal-400' },
  { min: 61, max: 80, name: 'Pathfinder', color: 'text-green-400' },
  { min: 81, max: 100, name: 'Master Explorer', color: 'text-yellow-400' },
];

export default function Dashboard({ userProfile, onNavigate }: DashboardProps) {
  const topics = levelTopics[userProfile.level];
  const unlockedCount = userProfile.completedChallenges.length + 1;
  const currentRank = explorerRanks.find(r => userProfile.financialIQ >= r.min && userProfile.financialIQ <= r.max) || explorerRanks[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-teal-900 to-slate-800 pb-20">
      {/* Header - Navigator's Hub */}
      <div className="bg-gradient-to-r from-teal-600 via-green-600 to-teal-700 text-white p-6 rounded-b-3xl shadow-2xl relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
          <Map className="w-full h-full" />
        </div>

        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Compass className="w-5 h-5 text-teal-200" />
                <span className="text-teal-100 text-sm">Navigator's Hub</span>
              </div>
              <h1 className="text-white">{userProfile.level} Sector</h1>
              <p className={`text-sm ${currentRank.color}`}>Rank: {currentRank.name}</p>
            </div>
            <button
              onClick={() => onNavigate('progress')}
              className="w-14 h-14 bg-white/20 backdrop-blur-xl rounded-2xl flex items-center justify-center border-2 border-white/30"
            >
              <Award className="w-7 h-7" />
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white/20 backdrop-blur-xl rounded-xl p-3 text-center border border-white/30"
            >
              <div className="flex items-center justify-center gap-1 mb-1">
                <Sparkles className="w-4 h-4 text-yellow-300" />
              </div>
              <div className="text-white">{userProfile.financialIQ}</div>
              <span className="text-xs text-teal-100">IQ</span>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white/20 backdrop-blur-xl rounded-xl p-3 text-center border border-white/30"
            >
              <div className="flex items-center justify-center gap-1 mb-1">
                <Coins className="w-4 h-4 text-yellow-300" />
              </div>
              <div className="text-white">{userProfile.coins}</div>
              <span className="text-xs text-teal-100">Coins</span>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white/20 backdrop-blur-xl rounded-xl p-3 text-center border border-white/30"
            >
              <div className="flex items-center justify-center gap-1 mb-1">
                <Award className="w-4 h-4 text-yellow-300" />
              </div>
              <div className="text-white">{userProfile.badges.length}</div>
              <span className="text-xs text-teal-100">Badges</span>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white/20 backdrop-blur-xl rounded-xl p-3 text-center border border-white/30"
            >
              <div className="flex items-center justify-center gap-1 mb-1">
                <Zap className="w-4 h-4 text-orange-300" />
              </div>
              <div className="text-white">{userProfile.streak}</div>
              <span className="text-xs text-teal-100">Streak</span>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Decision Compass Banner */}
      <div className="p-6">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onNavigate('wallet')}
          className="w-full bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 text-white p-5 rounded-2xl shadow-2xl relative overflow-hidden border-2 border-green-400/30"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
          <div className="flex items-center gap-4 relative z-10">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-xl rounded-2xl flex items-center justify-center border-2 border-white/30">
              <Compass className="w-8 h-8" />
            </div>
            <div className="flex-1 text-left">
              <h3 className="text-white">Decision Compass</h3>
              <p className="text-green-100 text-sm">Navigate your financial future</p>
            </div>
            <TrendingUp className="w-6 h-6" />
          </div>
        </motion.button>
      </div>

      {/* Interactive Map */}
      <div className="px-6">
        <div className="flex items-center gap-2 mb-4">
          <Map className="w-5 h-5 text-teal-400" />
          <h2 className="text-teal-200">Financial Frontier Map</h2>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-xl rounded-3xl p-6 border-2 border-teal-500/30 shadow-2xl relative overflow-hidden" style={{ minHeight: '400px' }}>
          {/* Map Background Pattern */}
          <svg className="absolute inset-0 w-full h-full opacity-5" viewBox="0 0 100 100">
            <defs>
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-teal-400"/>
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#grid)" />
          </svg>

          {/* Path Lines */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            {topics.map((topic, index) => {
              if (index === topics.length - 1) return null;
              const nextTopic = topics[index + 1];
              const isUnlocked = index < unlockedCount - 1;
              return (
                <motion.path
                  key={`path-${topic.id}`}
                  d={`M ${topic.position.x} ${topic.position.y} Q ${(topic.position.x + nextTopic.position.x) / 2} ${(topic.position.y + nextTopic.position.y) / 2 - 5} ${nextTopic.position.x} ${nextTopic.position.y}`}
                  stroke={isUnlocked ? '#14b8a6' : '#475569'}
                  strokeWidth="0.3"
                  fill="none"
                  strokeDasharray={isUnlocked ? '0' : '2,2'}
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: isUnlocked ? 1 : 0.3 }}
                  transition={{ duration: 1, delay: index * 0.2 }}
                />
              );
            })}
          </svg>

          {/* Waypoints */}
          {topics.map((topic, index) => {
            const isUnlocked = index < unlockedCount;
            const isCompleted = userProfile.completedChallenges.includes(topic.id);
            const isCurrent = index === unlockedCount - 1 && !isCompleted;

            return (
              <motion.div
                key={topic.id}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.15, type: 'spring' }}
                className="absolute"
                style={{
                  left: `${topic.position.x}%`,
                  top: `${topic.position.y}%`,
                  transform: 'translate(-50%, -50%)',
                }}
              >
                <div className="relative">
                  {/* Glow Effect for Current */}
                  {isCurrent && (
                    <motion.div
                      animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute inset-0 bg-teal-400 rounded-full blur-xl"
                    />
                  )}

                  {/* Waypoint Button */}
                  <motion.button
                    onClick={() => isUnlocked && !isCompleted && onNavigate('lesson', topic.id)}
                    disabled={!isUnlocked || isCompleted}
                    whileHover={isUnlocked && !isCompleted ? { scale: 1.1 } : {}}
                    whileTap={isUnlocked && !isCompleted ? { scale: 0.95 } : {}}
                    className={`relative w-16 h-16 rounded-2xl flex items-center justify-center text-2xl transition-all ${
                      isCompleted
                        ? 'bg-gradient-to-br from-green-500 to-emerald-600 border-2 border-green-300 shadow-lg shadow-green-500/50'
                        : isCurrent
                        ? 'bg-gradient-to-br from-teal-500 to-blue-600 border-2 border-teal-300 shadow-xl shadow-teal-500/60 animate-pulse'
                        : isUnlocked
                        ? 'bg-gradient-to-br from-slate-600 to-slate-700 border-2 border-teal-500/50 shadow-lg'
                        : 'bg-gradient-to-br from-slate-800 to-slate-900 border-2 border-slate-600 opacity-50'
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="w-8 h-8 text-white" />
                    ) : !isUnlocked ? (
                      <Lock className="w-6 h-6 text-slate-500" />
                    ) : (
                      <span>{topic.icon}</span>
                    )}

                    {/* Completion Badge */}
                    {isCompleted && (
                      <div className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-400 rounded-full border-2 border-white flex items-center justify-center">
                        <span className="text-xs">✓</span>
                      </div>
                    )}
                  </motion.button>

                  {/* Waypoint Label */}
                  <div className={`absolute top-full mt-2 left-1/2 transform -translate-x-1/2 whitespace-nowrap text-center ${
                    isUnlocked ? '' : 'opacity-50'
                  }`}>
                    <div className={`px-3 py-1 rounded-lg backdrop-blur-xl text-xs ${
                      isCompleted
                        ? 'bg-green-900/80 text-green-200 border border-green-500/50'
                        : isCurrent
                        ? 'bg-teal-900/80 text-teal-200 border border-teal-500/50'
                        : isUnlocked
                        ? 'bg-slate-800/80 text-teal-300 border border-slate-600'
                        : 'bg-slate-900/80 text-slate-500 border border-slate-700'
                    }`}>
                      {topic.title}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Financial IQ Growth */}
      <div className="p-6 mt-4">
        <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-5 border-2 border-purple-500/30 shadow-xl">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-400" />
              <h3 className="text-purple-300">Financial IQ Growth</h3>
            </div>
            <span className="text-purple-200">{userProfile.financialIQ}/100</span>
          </div>
          <Progress value={(userProfile.financialIQ / 100) * 100} className="h-4 mb-2 bg-slate-700" />
          <p className="text-teal-400 text-sm">{100 - userProfile.financialIQ} points to Master Explorer!</p>
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 3s infinite;
        }
      `}</style>
    </div>
  );
}
