import React from 'react';
import { Compass, Map, TrendingUp, Award } from 'lucide-react';
import { Button } from './ui/button';
import { motion } from 'motion/react';

type LoginProps = {
  onLogin: () => void;
};

export default function Login({ onLogin }: LoginProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden bg-gradient-to-br from-slate-900 via-teal-900 to-slate-800">
      {/* Animated Map Background */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" viewBox="0 0 800 600">
          <path d="M100,150 L200,100 L350,180 L500,120 L650,200" stroke="currentColor" strokeWidth="2" fill="none" className="text-teal-300" />
          <path d="M150,250 L300,200 L450,280 L600,240" stroke="currentColor" strokeWidth="2" fill="none" className="text-teal-400" />
          <path d="M50,350 L250,300 L400,380 L550,340 L700,400" stroke="currentColor" strokeWidth="2" fill="none" className="text-teal-300" />
          <circle cx="200" cy="100" r="8" fill="currentColor" className="text-teal-400" opacity="0.5" />
          <circle cx="350" cy="180" r="8" fill="currentColor" className="text-teal-400" opacity="0.5" />
          <circle cx="500" cy="120" r="8" fill="currentColor" className="text-teal-400" opacity="0.5" />
        </svg>
      </div>

      <div className="w-full max-w-md space-y-8 relative z-10">
        {/* Logo/Icon */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', duration: 1 }}
          className="flex justify-center"
        >
          <div className="relative">
            <div className="w-28 h-28 bg-gradient-to-br from-teal-500 to-blue-600 rounded-full flex items-center justify-center shadow-2xl border-4 border-teal-300/30">
              <Compass className="w-14 h-14 text-white" />
            </div>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 border-4 border-transparent border-t-gold-400 rounded-full"
            />
            <div className="absolute -top-2 -right-2 w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
              <Map className="w-5 h-5 text-white" />
            </div>
          </div>
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center space-y-2"
        >
          <h1 className="text-teal-300">Cash Quest</h1>
          <p className="text-teal-200">Embark on Your Financial Odyssey</p>
          <div className="flex items-center justify-center gap-2 text-teal-400 text-sm">
            <Map className="w-4 h-4" />
            <span>Explore • Learn • Conquer</span>
          </div>
        </motion.div>

        {/* Feature Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="space-y-3"
        >
          <div className="bg-slate-800/80 backdrop-blur-xl rounded-2xl p-4 border-2 border-teal-500/30 shadow-xl">
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                <Compass className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-teal-300">Your Expedition Briefing</h3>
                <p className="text-teal-100/70 text-sm">Personalized path based on your goals</p>
              </div>
            </div>
          </div>

          <div className="bg-slate-800/80 backdrop-blur-xl rounded-2xl p-4 border-2 border-green-500/30 shadow-xl">
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-green-300">Decision Compass</h3>
                <p className="text-green-100/70 text-sm">Navigate financial choices with confidence</p>
              </div>
            </div>
          </div>

          <div className="bg-slate-800/80 backdrop-blur-xl rounded-2xl p-4 border-2 border-yellow-500/30 shadow-xl">
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                <Award className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-yellow-300">Treasures & Glory</h3>
                <p className="text-yellow-100/70 text-sm">Collect badges and grow your Explorer Rank</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="space-y-3"
        >
          <Button
            onClick={onLogin}
            className="w-full h-16 bg-gradient-to-r from-teal-500 via-green-500 to-teal-600 hover:from-teal-600 hover:via-green-600 hover:to-teal-700 text-white rounded-2xl shadow-2xl text-lg relative overflow-hidden group"
          >
            <span className="relative z-10">Begin Your Quest</span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
          </Button>
          <p className="text-center text-teal-400 text-sm">Free • Interactive • Rewarding</p>
        </motion.div>
      </div>
    </div>
  );
}
