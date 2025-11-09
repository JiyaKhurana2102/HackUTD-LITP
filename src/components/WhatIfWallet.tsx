import React, { useState, useMemo } from 'react';
import { ArrowLeft, TrendingUp, TrendingDown, DollarSign, Calendar, AlertCircle, Compass, PiggyBank, LineChart } from 'lucide-react';
import { Button } from './ui/button';
import { Slider } from './ui/slider';
import { motion } from 'motion/react';
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { UserProfile } from '../App';

type WhatIfWalletProps = {
  userProfile: UserProfile;
  onBack: () => void;
  onUpdateProfile: (updates: Partial<UserProfile>) => void;
};

export default function WhatIfWallet({ userProfile, onBack, onUpdateProfile }: WhatIfWalletProps) {
  const [scenario, setScenario] = useState<'spending' | 'saving' | 'investing'>('spending');
  const [monthlyIncome] = useState(3000);
  const [monthlySpending, setMonthlySpending] = useState(2000);
  const [monthlySaving, setMonthlySaving] = useState(500);
  const [monthlyInvesting, setMonthlyInvesting] = useState(300);
  const [timeframe, setTimeframe] = useState(12); // months

  const calculateBalance = () => {
    const netMonthly = monthlyIncome - monthlySpending - monthlySaving - monthlyInvesting;
    const totalBalance = netMonthly * timeframe;
    const savings = monthlySaving * timeframe;
    const investments = monthlyInvesting * timeframe * 1.07; // 7% annual return
    return {
      netMonthly,
      totalBalance,
      savings,
      investments,
      total: totalBalance + savings + investments,
    };
  };

  const balance = calculateBalance();
  const isPositive = balance.netMonthly >= 0;

  // Generate chart data for visualization
  const chartData = useMemo(() => {
    const data = [];
    for (let month = 0; month <= timeframe; month++) {
      const cash = (monthlyIncome - monthlySpending - monthlySaving - monthlyInvesting) * month;
      const savings = monthlySaving * month;
      const investments = monthlyInvesting * month * (1 + (0.07 * month / 12));
      data.push({
        month,
        cash: Math.max(0, cash),
        savings,
        investments,
        total: cash + savings + investments,
      });
    }
    return data;
  }, [monthlyIncome, monthlySpending, monthlySaving, monthlyInvesting, timeframe]);

  const scenarios = [
    {
      id: 'emergency-fund',
      title: 'Build Emergency Fund',
      description: 'Save 3-6 months of expenses',
      recommended: { spending: 1800, saving: 900, investing: 300 },
    },
    {
      id: 'debt-payoff',
      title: 'Pay Off Debt Fast',
      description: 'Aggressive debt reduction',
      recommended: { spending: 1500, saving: 200, investing: 100 },
    },
    {
      id: 'investment-growth',
      title: 'Maximize Investments',
      description: 'Long-term wealth building',
      recommended: { spending: 2000, saving: 400, investing: 600 },
    },
  ];

  const applyScenario = (scenario: typeof scenarios[0]) => {
    setMonthlySpending(scenario.recommended.spending);
    setMonthlySaving(scenario.recommended.saving);
    setMonthlyInvesting(scenario.recommended.investing);
  };

  const runSimulation = () => {
    // Award coins for running simulation
    const earnedCoins = 25;
    onUpdateProfile({
      coins: userProfile.coins + earnedCoins,
      financialIQ: userProfile.financialIQ + 2,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-teal-900 to-slate-800">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 text-white p-6 rounded-b-3xl shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
          <Compass className="w-full h-full" />
        </div>
        
        <button
          onClick={onBack}
          className="w-10 h-10 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center mb-4 border-2 border-white/30"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-white/20 backdrop-blur-xl rounded-2xl flex items-center justify-center border-2 border-white/30">
            <Compass className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-white mb-1">Decision Compass</h1>
            <p className="text-green-100 text-sm">Chart your financial trajectory</p>
          </div>
        </div>
      </div>

      {/* Balance Display & Chart */}
      <div className="p-6 space-y-4">
        {/* Current Balance Card */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-6 border-2 border-teal-500/30 shadow-2xl"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
              isPositive 
                ? 'bg-gradient-to-br from-green-500 to-emerald-600' 
                : 'bg-gradient-to-br from-red-500 to-orange-600'
            }`}>
              {isPositive ? (
                <TrendingUp className="w-7 h-7 text-white" />
              ) : (
                <TrendingDown className="w-7 h-7 text-white" />
              )}
            </div>
            <div>
              <p className="text-teal-300 text-sm">Wealth Trajectory</p>
              <h2 className={isPositive ? 'text-green-400' : 'text-red-400'}>
                ${balance.total.toFixed(0)}
              </h2>
              <p className="text-teal-400 text-xs">After {timeframe} months</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="text-center p-3 bg-blue-900/30 backdrop-blur rounded-xl border border-blue-500/30">
              <p className="text-blue-300 text-sm mb-1">💵 Cash</p>
              <p className="text-blue-100">${balance.totalBalance.toFixed(0)}</p>
            </div>
            <div className="text-center p-3 bg-purple-900/30 backdrop-blur rounded-xl border border-purple-500/30">
              <p className="text-purple-300 text-sm mb-1">🐷 Savings</p>
              <p className="text-purple-100">${balance.savings.toFixed(0)}</p>
            </div>
            <div className="text-center p-3 bg-green-900/30 backdrop-blur rounded-xl border border-green-500/30">
              <p className="text-green-300 text-sm mb-1">📈 Invested</p>
              <p className="text-green-100">${balance.investments.toFixed(0)}</p>
            </div>
          </div>
        </motion.div>

        {/* Interactive Chart */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-5 border-2 border-purple-500/30 shadow-2xl"
        >
          <div className="flex items-center gap-2 mb-4">
            <LineChart className="w-5 h-5 text-purple-400" />
            <h3 className="text-purple-300">Future Wealth Trajectory</h3>
          </div>
          
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#14b8a6" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorSavings" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.6}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
              <XAxis 
                dataKey="month" 
                stroke="#94a3b8" 
                tick={{ fill: '#94a3b8', fontSize: 12 }}
                label={{ value: 'Months', position: 'insideBottom', offset: -5, fill: '#94a3b8' }}
              />
              <YAxis 
                stroke="#94a3b8" 
                tick={{ fill: '#94a3b8', fontSize: 12 }}
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1e293b', 
                  border: '1px solid #14b8a6',
                  borderRadius: '8px',
                  color: '#e2e8f0'
                }}
                formatter={(value: number) => [`$${value.toFixed(0)}`, '']}
              />
              <Area 
                type="monotone" 
                dataKey="total" 
                stroke="#14b8a6" 
                strokeWidth={3}
                fill="url(#colorTotal)" 
              />
              <Area 
                type="monotone" 
                dataKey="savings" 
                stroke="#10b981" 
                strokeWidth={2}
                fill="url(#colorSavings)"
                opacity={0.5}
              />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Controls */}
      <div className="px-6 space-y-4">
        {/* Income Display */}
        <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-4 border-2 border-blue-500/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-blue-300 text-sm">Monthly Income</p>
                <p className="text-blue-100 text-lg">${monthlyIncome}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Spending Slider */}
        <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-5 border-2 border-orange-500/30">
          <div className="flex items-center justify-between mb-3">
            <label className="text-orange-300">💸 Monthly Spending</label>
            <span className="text-orange-400 text-lg">${monthlySpending}</span>
          </div>
          <Slider
            value={[monthlySpending]}
            onValueChange={(value) => setMonthlySpending(value[0])}
            min={500}
            max={monthlyIncome}
            step={100}
            className="mb-2"
          />
          <p className="text-orange-200/60 text-sm">Your regular expenses</p>
        </div>

        {/* Saving Slider */}
        <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-5 border-2 border-green-500/30">
          <div className="flex items-center justify-between mb-3">
            <label className="text-green-300">🐷 Monthly Savings</label>
            <span className="text-green-400 text-lg">${monthlySaving}</span>
          </div>
          <Slider
            value={[monthlySaving]}
            onValueChange={(value) => setMonthlySaving(value[0])}
            min={0}
            max={monthlyIncome - monthlySpending}
            step={50}
            className="mb-2"
          />
          <p className="text-green-200/60 text-sm">Emergency fund & short-term goals</p>
        </div>

        {/* Investing Slider */}
        <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-5 border-2 border-purple-500/30">
          <div className="flex items-center justify-between mb-3">
            <label className="text-purple-300">📈 Monthly Investing</label>
            <span className="text-purple-400 text-lg">${monthlyInvesting}</span>
          </div>
          <Slider
            value={[monthlyInvesting]}
            onValueChange={(value) => setMonthlyInvesting(value[0])}
            min={0}
            max={monthlyIncome - monthlySpending - monthlySaving}
            step={50}
            className="mb-2"
          />
          <p className="text-purple-200/60 text-sm">Long-term growth (7% annual return)</p>
        </div>

        {/* Timeframe */}
        <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-5 border-2 border-teal-500/30">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-teal-400" />
              <label className="text-teal-300">⏱️ Timeframe</label>
            </div>
            <span className="text-teal-400 text-lg">{timeframe} months</span>
          </div>
          <Slider
            value={[timeframe]}
            onValueChange={(value) => setTimeframe(value[0])}
            min={1}
            max={60}
            step={1}
            className="mb-2"
          />
        </div>

        {/* Preset Scenarios */}
        <div className="space-y-3">
          <h3 className="text-teal-300">📍 Preset Waypoints</h3>
          {scenarios.map((s) => (
            <motion.button
              key={s.id}
              onClick={() => applyScenario(s)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full p-4 bg-slate-800/50 backdrop-blur-xl rounded-xl border-2 border-teal-500/30 hover:border-teal-400/60 hover:shadow-lg transition-all text-left"
            >
              <h4 className="text-teal-200 mb-1">{s.title}</h4>
              <p className="text-teal-300/60 text-sm">{s.description}</p>
            </motion.button>
          ))}
        </div>

        {/* Warning */}
        {balance.netMonthly < 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-900/30 border-2 border-red-500/50 backdrop-blur-xl rounded-xl p-4 flex items-start gap-3"
          >
            <AlertCircle className="w-6 h-6 text-red-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-red-300">⚠️ Course Correction Needed!</p>
              <p className="text-red-200/80 text-sm">You're spending more than you earn. Adjust your compass.</p>
            </div>
          </motion.div>
        )}

        {/* Action Button */}
        <Button
          onClick={runSimulation}
          className="w-full h-14 bg-gradient-to-r from-green-500 via-teal-500 to-green-600 hover:from-green-600 hover:via-teal-600 hover:to-green-700 text-white rounded-xl shadow-lg relative overflow-hidden group"
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            <Compass className="w-5 h-5" />
            Save Navigation (+25 coins)
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
        </Button>
      </div>

      <div className="h-20" />
    </div>
  );
}
