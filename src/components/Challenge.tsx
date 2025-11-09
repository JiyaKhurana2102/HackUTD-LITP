import React, { useState } from 'react';
import { ArrowLeft, CheckCircle2, XCircle, Lightbulb, Coins, Zap, TrendingUp, Star, Trophy, BookOpen, Target } from 'lucide-react';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { motion, AnimatePresence } from 'motion/react';
import { UserProfile } from '../App';

type ChallengeProps = {
  challengeId: string;
  userProfile: UserProfile;
  onComplete: (earnedCoins: number, perfectScore: boolean) => void;
  onBack: () => void;
};

const challengeData: Record<string, {
  title: string;
  icon: string;
  questions: Array<{
    question: string;
    scenario?: string;
    teaching?: string;
    options: Array<{
      text: string;
      isCorrect: boolean;
      explanation: string;
      lesson?: string;
    }>;
  }>;
}> = {
  'budgeting-student': {
    title: 'Smart Budgeting',
    icon: '💰',
    questions: [
      {
        question: "You receive your first paycheck of $500. What's the smartest first step?",
        scenario: "You just started your first part-time job!",
        teaching: "Remember the 50/30/20 rule: 50% needs, 30% wants, 20% savings. This helps you balance enjoying life now while preparing for the future!",
        options: [
          {
            text: 'Spend it all on something you want',
            isCorrect: false,
            explanation: 'While treating yourself is fine, spending everything leaves you unprepared for emergencies.',
            lesson: 'It\'s important to pay yourself first by saving before spending. Think of savings as a bill you pay to your future self!',
          },
          {
            text: 'Save at least 20% before spending',
            isCorrect: true,
            explanation: 'Perfect! The 50/30/20 rule suggests saving 20% of income. This builds financial security while still letting you enjoy your money.',
            lesson: 'You\'re building a habit that will make you financially secure. Even small amounts saved regularly add up to big results!',
          },
          {
            text: 'Put it all in investments',
            isCorrect: false,
            explanation: 'Investing everything is risky. Keep some for immediate needs and emergency savings first.',
            lesson: 'Build your emergency fund (3-6 months expenses) first, THEN invest extra money. This creates a safety net before taking risks.',
          },
          {
            text: 'Give it to friends',
            isCorrect: false,
            explanation: 'Generosity is admirable, but you need to secure your own financial foundation first.',
            lesson: 'Like the airplane oxygen mask rule: help yourself first so you can help others better later. Financial stability lets you be more generous!',
          },
        ],
      },
      {
        question: 'Your monthly expenses are $400, and you earn $500. How should you budget the remaining $100?',
        teaching: "Having extra money is great! But it's also when lifestyle inflation can creep in. Use this as an opportunity to build good habits.",
        options: [
          {
            text: 'Spend it all on entertainment',
            isCorrect: false,
            explanation: 'Entertainment is important, but not using all your extra income for it.',
            lesson: 'Balance is key! Try the 70/30 split: 70% save, 30% fun. This way you enjoy life AND build your future.',
          },
          {
            text: 'Split between savings and fun',
            isCorrect: true,
            explanation: 'Excellent! Balance is key. Save some for the future while enjoying the present. Maybe $70 save, $30 fun?',
            lesson: 'This balanced approach prevents burnout and builds lasting financial habits. You\'re thinking like a pro!',
          },
          {
            text: 'Add it to next month\'s budget',
            isCorrect: false,
            explanation: 'This might lead to lifestyle inflation. Better to save or invest extra funds.',
            lesson: 'Lifestyle inflation is when your spending grows with your income. Instead, keep expenses stable and save the difference!',
          },
        ],
      },
      {
        question: 'Unexpected $200 car repair! You have $150 saved. What do you do?',
        scenario: 'Emergency situation!',
        teaching: 'This is exactly why emergency funds exist! They prevent small problems from becoming financial disasters.',
        options: [
          {
            text: 'Use savings + credit card for rest',
            isCorrect: true,
            explanation: 'Smart! Use savings first (that\'s what they\'re for!), then carefully use credit for the gap. Pay it off quickly to avoid interest.',
            lesson: 'You handled this emergency perfectly! Now focus on rebuilding that emergency fund to $500-1000 for next time.',
          },
          {
            text: 'Skip the repair',
            isCorrect: false,
            explanation: 'Delaying necessary repairs can lead to bigger, more expensive problems later.',
            lesson: 'Small repairs ignored become big expensive problems. A $200 fix now prevents a $2,000 breakdown later!',
          },
          {
            text: 'Put it all on credit card',
            isCorrect: false,
            explanation: 'Use your savings first! That\'s exactly what emergency funds are for.',
            lesson: 'Emergency funds should be used for... emergencies! Using them prevents credit card debt and interest charges.',
          },
        ],
      },
    ],
  },
  'credit-student': {
    title: 'Credit 101',
    icon: '💳',
    questions: [
      {
        question: 'You get your first credit card with a $1,000 limit. How much should you spend monthly?',
        scenario: 'Building credit for the first time',
        teaching: 'Credit utilization (how much you use vs. your limit) makes up 30% of your credit score. Keep it under 30% for best results!',
        options: [
          {
            text: 'Up to $1,000 (the full limit)',
            isCorrect: false,
            explanation: 'Maxing out your card hurts your credit score. Keep utilization under 30%.',
            lesson: 'Using 100% of your limit signals you might be struggling financially. Lenders see this as risky behavior!',
          },
          {
            text: 'Under $300 (30% of limit)',
            isCorrect: true,
            explanation: 'Excellent! Keeping utilization under 30% helps build a strong credit score. Even better if you can stay under 10%!',
            lesson: 'You\'re building credit the smart way! Low utilization shows you don\'t need all your available credit - very attractive to lenders.',
          },
          {
            text: 'Don\'t use it at all',
            isCorrect: false,
            explanation: 'You need to use credit to build credit history. Use it wisely and pay in full.',
            lesson: 'Think of credit cards as a tool to build history, not as free money. Use them for normal purchases, then pay off immediately!',
          },
        ],
      },
      {
        question: 'Your credit card bill is $200. You have $250. What should you pay?',
        teaching: 'This is where many people make a costly mistake. The "minimum payment" trap costs Americans billions in interest!',
        options: [
          {
            text: 'Minimum payment ($25)',
            isCorrect: false,
            explanation: 'Paying only the minimum leads to expensive interest charges over time.',
            lesson: 'A $200 balance at 20% APR with minimum payments takes 2+ years and $70+ in interest! Always pay full if possible.',
          },
          {
            text: 'Full balance ($200)',
            isCorrect: true,
            explanation: 'Perfect! Always pay the full balance to avoid interest and build good credit. This is the #1 rule of credit cards!',
            lesson: 'By paying in full, you use credit cards for convenience and rewards, never paying a penny in interest. That\'s winning!',
          },
          {
            text: 'Half ($100)',
            isCorrect: false,
            explanation: 'Partial payments still accrue interest. Pay the full balance when possible.',
            lesson: 'Even paying half means interest on the remaining $100. At 20% APR, that\'s $1.67/month in wasted money!',
          },
        ],
      },
    ],
  },
};

export default function Challenge({ challengeId, userProfile, onComplete, onBack }: ChallengeProps) {
  const challenge = challengeData[challengeId] || challengeData['budgeting-student'];
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);

  const question = challenge.questions[currentQuestion];
  const progress = ((currentQuestion + 1) / challenge.questions.length) * 100;

  const handleSelectAnswer = (index: number) => {
    if (showExplanation) return;
    setSelectedAnswer(index);
  };

  const handleSubmit = () => {
    if (selectedAnswer === null) return;
    const isCorrect = question.options[selectedAnswer].isCorrect;
    if (isCorrect) {
      setCorrectAnswers(correctAnswers + 1);
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 1500);
    }
    setShowExplanation(true);
  };

  const handleNext = () => {
    if (currentQuestion < challenge.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      // Challenge complete
      const perfectScore = correctAnswers + 1 === challenge.questions.length;
      const baseCoins = correctAnswers * 20;
      const bonusCoins = perfectScore ? 50 : 0;
      const streakBonus = userProfile.streak >= 3 ? 30 : 0;
      const earnedCoins = baseCoins + bonusCoins + streakBonus;
      onComplete(earnedCoins, perfectScore);
    }
  };

  const isCorrect = selectedAnswer !== null && question.options[selectedAnswer].isCorrect;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-teal-900 to-slate-800 relative overflow-hidden">
      {/* Celebration Confetti Effect */}
      <AnimatePresence>
        {showCelebration && (
          <>
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ 
                  opacity: 1, 
                  y: -20, 
                  x: Math.random() * window.innerWidth,
                  rotate: Math.random() * 360,
                }}
                animate={{ 
                  opacity: 0, 
                  y: window.innerHeight,
                  rotate: Math.random() * 360 + 720,
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 2, delay: Math.random() * 0.2 }}
                className="absolute w-3 h-3 rounded-full pointer-events-none"
                style={{ 
                  backgroundColor: ['#FFD700', '#FF69B4', '#00CED1', '#FF6347', '#9370DB'][i % 5],
                  left: `${Math.random() * 100}%`,
                }}
              />
            ))}
          </>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="bg-gradient-to-r from-teal-600 via-green-600 to-teal-700 text-white p-6 rounded-b-3xl relative z-10 shadow-2xl">
        <button
          onClick={onBack}
          className="w-10 h-10 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center mb-4 border-2 border-white/30"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="text-3xl">{challenge.icon}</div>
            <div>
              <h1 className="text-white">{challenge.title}</h1>
              <p className="text-blue-100 text-sm">Question {currentQuestion + 1} of {challenge.questions.length}</p>
            </div>
          </div>
          
          {/* Combo Streak */}
          {userProfile.streak > 0 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="bg-yellow-400 text-yellow-900 px-3 py-2 rounded-xl flex items-center gap-2"
            >
              <Zap className="w-4 h-4" />
              <span className="text-sm">{userProfile.streak}🔥</span>
            </motion.div>
          )}
        </div>
        
        <Progress value={progress} className="h-2 bg-white/20" />
        
        {/* Score */}
        <div className="flex items-center gap-4 mt-3">
          <div className="flex items-center gap-2 bg-white/20 backdrop-blur px-3 py-1 rounded-lg">
            <Star className="w-4 h-4 text-yellow-300" />
            <span className="text-sm">{correctAnswers}/{challenge.questions.length}</span>
          </div>
          <div className="flex items-center gap-2 bg-white/20 backdrop-blur px-3 py-1 rounded-lg">
            <Coins className="w-4 h-4 text-yellow-300" />
            <span className="text-sm">{correctAnswers * 20}</span>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Teaching Moment */}
        {question.teaching && !showExplanation && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-blue-100 to-purple-100 border-2 border-blue-200 rounded-2xl p-4 flex items-start gap-3"
          >
            <BookOpen className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-blue-800 mb-1">Quick Reminder!</h3>
              <p className="text-blue-700 text-sm">{question.teaching}</p>
            </div>
          </motion.div>
        )}

        {/* Scenario Badge */}
        {question.scenario && (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-3 flex items-center gap-2"
          >
            <Target className="w-5 h-5 text-yellow-600" />
            <p className="text-yellow-800 text-sm">{question.scenario}</p>
          </motion.div>
        )}

        {/* Question */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-6 border-2 border-purple-100 shadow-lg"
        >
          <h2 className="text-gray-800 mb-6">{question.question}</h2>

          <div className="space-y-3">
            {question.options.map((option, index) => {
              const isSelected = selectedAnswer === index;
              const showResult = showExplanation && isSelected;

              return (
                <motion.button
                  key={index}
                  onClick={() => handleSelectAnswer(index)}
                  disabled={showExplanation}
                  whileHover={!showExplanation ? { scale: 1.02 } : {}}
                  whileTap={!showExplanation ? { scale: 0.98 } : {}}
                  className={`w-full p-4 rounded-xl border-2 transition-all text-left relative overflow-hidden ${
                    showResult
                      ? option.isCorrect
                        ? 'border-green-400 bg-green-50 shadow-lg'
                        : 'border-red-400 bg-red-50'
                      : isSelected
                      ? 'border-purple-400 bg-purple-50 shadow-md'
                      : 'border-gray-200 bg-white hover:border-purple-200'
                  }`}
                >
                  {showResult && option.isCorrect && (
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: '100%' }}
                      className="absolute top-0 left-0 h-1 bg-green-400"
                    />
                  )}
                  <div className="flex items-center justify-between">
                    <span className={showResult ? (option.isCorrect ? 'text-green-800' : 'text-red-800') : 'text-gray-800'}>
                      {option.text}
                    </span>
                    {showResult && (
                      option.isCorrect ? (
                        <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0" />
                      ) : (
                        <XCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
                      )
                    )}
                  </div>
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Explanation */}
        <AnimatePresence>
          {showExplanation && selectedAnswer !== null && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20 }}
              className={`rounded-2xl p-5 border-2 ${
                isCorrect
                  ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 shadow-lg'
                  : 'bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200 shadow-lg'
              }`}
            >
              <div className="flex items-start gap-3 mb-4">
                {isCorrect ? (
                  <>
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', duration: 0.5 }}
                    >
                      <CheckCircle2 className="w-7 h-7 text-green-600 flex-shrink-0" />
                    </motion.div>
                    <div className="flex-1">
                      <h3 className="text-green-800">Awesome! 🎉</h3>
                      <p className="text-sm mt-1 text-green-700">
                        {question.options[selectedAnswer].explanation}
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <Lightbulb className="w-7 h-7 text-blue-600 flex-shrink-0" />
                    <div className="flex-1">
                      <h3 className="text-blue-800">Let's Learn Together! 📚</h3>
                      <p className="text-sm mt-1 text-blue-700">
                        {question.options[selectedAnswer].explanation}
                      </p>
                    </div>
                  </>
                )}
              </div>

              {/* Deep Learning Section */}
              {question.options[selectedAnswer].lesson && (
                <div className="bg-white/60 backdrop-blur rounded-xl p-4 border border-purple-200">
                  <div className="flex items-start gap-2">
                    <TrendingUp className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-purple-700">Pro Tip:</h4>
                      <p className="text-purple-600 text-sm mt-1">
                        {question.options[selectedAnswer].lesson}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Coin Reward */}
              {isCorrect && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex items-center gap-2 bg-yellow-100 rounded-xl p-3 mt-4"
                >
                  <Coins className="w-5 h-5 text-yellow-600" />
                  <span className="text-yellow-700">+20 coins earned!</span>
                  {userProfile.streak >= 3 && (
                    <span className="ml-auto bg-orange-200 text-orange-700 px-3 py-1 rounded-lg text-sm">
                      🔥 Streak bonus!
                    </span>
                  )}
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action Button */}
        {!showExplanation ? (
          <Button
            onClick={handleSubmit}
            disabled={selectedAnswer === null}
            className="w-full h-14 bg-gradient-to-r from-blue-400 to-purple-400 hover:from-blue-500 hover:to-purple-500 text-white rounded-xl disabled:opacity-50 shadow-lg"
          >
            Submit Answer 🎯
          </Button>
        ) : (
          <Button
            onClick={handleNext}
            className="w-full h-14 bg-gradient-to-r from-green-400 to-blue-400 hover:from-green-500 hover:to-blue-500 text-white rounded-xl shadow-lg"
          >
            {currentQuestion < challenge.questions.length - 1 ? (
              <>Next Question ➡️</>
            ) : (
              <>Complete Challenge 🏆</>
            )}
          </Button>
        )}

        {/* Encouragement */}
        {!showExplanation && currentQuestion > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center"
          >
            <p className="text-purple-600 text-sm">
              {correctAnswers === currentQuestion 
                ? `Perfect so far! Keep it up! 🌟`
                : `You're learning and growing! 💪`
              }
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
