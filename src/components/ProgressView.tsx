import React from 'react';
import { ArrowLeft, Award, TrendingUp, Target, Sparkles, Trophy, Star, Zap } from 'lucide-react';
import { Progress } from './ui/progress';
import { UserProfile } from '../App';

type ProgressViewProps = {
  userProfile: UserProfile;
  onBack: () => void;
};

const allBadges = [
  { id: 'first-steps', title: 'First Steps', icon: '👣', description: 'Complete your first challenge', requirement: 1 },
  { id: 'budget-boss', title: 'Budget Boss', icon: '💰', description: 'Master budgeting challenges', requirement: 2 },
  { id: 'credit-champ', title: 'Credit Champ', icon: '💳', description: 'Complete credit challenges', requirement: 2 },
  { id: 'saving-star', title: 'Saving Star', icon: '⭐', description: 'Reach 500 coins', requirement: 500 },
  { id: 'knowledge-seeker', title: 'Knowledge Seeker', icon: '📚', description: 'Reach 50 Financial IQ', requirement: 50 },
  { id: 'perfect-score', title: 'Perfect Score', icon: '🎯', description: 'Get 100% on a challenge', requirement: 1 },
];

const achievements = [
  { title: 'Challenges Completed', icon: Target, color: 'blue' },
  { title: 'Financial IQ Points', icon: Sparkles, color: 'purple' },
  { title: 'Coins Earned', icon: Trophy, color: 'yellow' },
  { title: 'Badges Unlocked', icon: Award, color: 'pink' },
];

export default function ProgressView({ userProfile, onBack }: ProgressViewProps) {
  const earnedBadges = allBadges.filter((badge) => {
    if (badge.id === 'first-steps') return userProfile.completedChallenges.length >= 1;
    if (badge.id === 'budget-boss') return userProfile.completedChallenges.filter(c => c.includes('budgeting')).length >= 2;
    if (badge.id === 'credit-champ') return userProfile.completedChallenges.filter(c => c.includes('credit')).length >= 2;
    if (badge.id === 'saving-star') return userProfile.coins >= 500;
    if (badge.id === 'knowledge-seeker') return userProfile.financialIQ >= 50;
    if (badge.id === 'perfect-score') return userProfile.completedChallenges.length >= 1;
    return false;
  });

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'blue': return 'bg-blue-100 text-blue-600';
      case 'purple': return 'bg-purple-100 text-purple-600';
      case 'yellow': return 'bg-yellow-100 text-yellow-600';
      case 'pink': return 'bg-pink-100 text-pink-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-teal-900 to-slate-800 text-white pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-600 to-green-500 text-white p-6 rounded-b-3xl shadow-2xl">
        <button
          onClick={onBack}
          className="w-10 h-10 bg-white/30 hover:bg-white/40 backdrop-blur rounded-xl flex items-center justify-center mb-4 transition"
        >
          <ArrowLeft className="w-5 h-5 text-gray-900" />
        </button>
        <div className="flex items-center gap-3 mb-2">
          <Trophy className="w-8 h-8 text-lime-200" />
          <h1 className="text-white">Your Progress</h1>
        </div>
        <p className="text-teal-100">Track your financial journey</p>
      </div>

      <div className="p-6 space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-slate-800/80 rounded-2xl p-5 border-2 text-center">
            <div className="w-12 h-12 bg-teal-800 rounded-2xl flex items-center justify-center mx-auto mb-3">
              <Target className="w-6 h-6 text-teal-400" />
            </div>
            <div className="text-2xl text-teal-400 mb-1">{userProfile.completedChallenges.length}</div>
            <p className="text-gray-400 text-sm">Challenges</p>
          </div>

          <div className="bg-slate-800/80 rounded-2xl p-5 border-2 border-lime-500 text-center">
            <div className="w-12 h-12 bg-lime-700 rounded-2xl flex items-center justify-center mx-auto mb-3">
              <Sparkles className="w-6 h-6 text-lime-100" />
            </div>
            <div className="text-2xl text-lime-400 mb-1">{userProfile.financialIQ}</div>
            <p className="text-gray-400 text-sm">Financial IQ</p>
          </div>

          <div className="bg-slate-800/80 rounded-2xl p-5 border-2 border-yellow-500 text-center">
            <div className="w-12 h-12 bg-yellow-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
              <Trophy className="w-6 h-6 text-yellow-400" />
            </div>
            <div className="text-2xl text-yellow-400 mb-1">{userProfile.coins}</div>
            <p className="text-gray-400 text-sm">Coins</p>
          </div>

          <div className="bg-slate-800/80 rounded-2xl p-5 border-2 border-cyan-500 text-center">
            <div className="w-12 h-12 bg-cyan-700 rounded-2xl flex items-center justify-center mx-auto mb-3">
              <Award className="w-6 h-6 text-cyan-100" />
            </div>
            <div className="text-2xl text-cyan-100 mb-1">{earnedBadges.length}</div>
            <p className="text-gray-400 text-sm">Badges</p>
          </div>
        </div>

        {/* Financial IQ Progress */}
        <div className="bg-slate-800/80 rounded-2xl p-6 border-2 border-lime-500">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-lime-600 to-teal-500 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-gray-900" />
              </div>
              <div>
                <h3 className="text-gray-200">Financial IQ Growth</h3>
                <p className="text-gray-400 text-sm">Level {Math.floor(userProfile.financialIQ / 20) + 1}</p>
              </div>
            </div>
            <div className="text-lime-400">{userProfile.financialIQ}/100</div>
          </div>
          <Progress value={(userProfile.financialIQ / 100) * 100} className="h-3" />
          <p className="text-gray-400 text-sm mt-2">
            {100 - userProfile.financialIQ} points to financial mastery!
          </p>
        </div>

        {/* Badges */}
        <div>
          <h2 className="text-gray-200 mb-4">Badges & Achievements</h2>
          <div className="grid grid-cols-2 gap-3">
            {allBadges.map((badge) => {
              const isEarned = earnedBadges.some(b => b.id === badge.id);
              return (
                <div
                  key={badge.id}
                  className={`p-4 rounded-2xl border-2 transition-all duration-300 ${
                    isEarned
                      ? 'bg-green-900 border-lime-400 shadow-lg'
                      : 'bg-gray-800 border-gray-700 opacity-60'
                  }`}
                >
                  <div className={`text-3xl mb-2 text-center ${isEarned ? 'text-lime-300' : 'text-gray-500'}`}>{badge.icon}</div>
                  <h4 className={`text-center mb-1 ${isEarned ? 'text-lime-200' : 'text-gray-400'}`}>
                    {badge.title}
                  </h4>
                  <p className={`text-center text-xs ${isEarned ? 'text-lime-400' : 'text-gray-500'}`}>
                    {badge.description}
                  </p>
                  {isEarned && (
                    <div className="flex items-center justify-center mt-2">
                      <div className="px-2 py-1 bg-lime-600/50 text-lime-200 rounded-lg text-xs font-medium">
                        Unlocked!
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Learning Path Summary */}
        <div className="bg-slate-800/80 rounded-2xl p-6 border-2 border-teal-500">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-teal-800 rounded-xl flex items-center justify-center">
              <Star className="w-5 h-5 text-teal-400" />
            </div>
            <div>
              <h3 className="text-gray-200">Learning Path</h3>
              <p className="text-gray-400 text-sm">{userProfile.level} Level</p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-teal-900 rounded-xl">
              <span className="text-teal-200">Strengths</span>
              <div className="flex gap-2">
                {userProfile.strengths.slice(0, 2).map((strength) => (
                  <span key={strength} className="px-3 py-1 bg-teal-700 text-teal-200 rounded-lg text-xs">
                    {strength}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-lime-900 rounded-xl">
              <span className="text-lime-200">Working On</span>
              <div className="flex gap-2">
                {userProfile.struggles.slice(0, 2).map((struggle) => (
                  <span key={struggle} className="px-3 py-1 bg-lime-700 text-lime-200 rounded-lg text-xs">
                    {struggle}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Motivational Card */}
        <div className="bg-gradient-to-r from-teal-600 to-green-500 text-white rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <Zap className="w-6 h-6 text-white" />
            <h3 className="text-white">Keep Going!</h3>
          </div>
          <p className="text-teal-100 text-sm mb-4">
            You're building financial confidence one challenge at a time. Every decision you make here prepares you for real-world success!
          </p>
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              <div className="w-8 h-8 bg-white/30 backdrop-blur rounded-full flex items-center justify-center text-sm">🎯</div>
              <div className="w-8 h-8 bg-white/30 backdrop-blur rounded-full flex items-center justify-center text-sm">💪</div>
              <div className="w-8 h-8 bg-white/30 backdrop-blur rounded-full flex items-center justify-center text-sm">🚀</div>
            </div>
            <span className="text-teal-100 text-sm">You're doing great!</span>
          </div>
        </div>
      </div>
    </div>
  );
}
