import React, { useState } from 'react';
import { ArrowLeft, BookOpen, Lightbulb, CheckCircle2, ChevronRight, Zap, Target, TrendingUp } from 'lucide-react';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { motion } from 'motion/react';

type LessonProps = {
  challengeId: string;
  onComplete: () => void;
  onBack: () => void;
};

const lessonContent: Record<string, {
  title: string;
  icon: string;
  color: string;
  slides: Array<{
    title: string;
    content: string;
    visual?: string;
    tips?: string[];
    interactive?: {
      question: string;
      options: string[];
      correctAnswer: number;
      feedback: string;
    };
  }>;
}> = {
  'budgeting-student': {
    title: 'Smart Budgeting',
    icon: '💰',
    color: 'blue',
    slides: [
      {
        title: 'What is a Budget?',
        content: 'A budget is your money game plan! It helps you track where your money comes from and where it goes. Think of it as a financial GPS - it keeps you on track to your goals!',
        visual: '📊',
        tips: [
          'A budget = Income - Expenses',
          'It helps you save for goals',
          'Prevents overspending',
        ],
      },
      {
        title: 'The 50/30/20 Rule',
        content: 'This simple rule makes budgeting easy! Split your income into three buckets:',
        visual: '🎯',
        tips: [
          '50% for Needs (rent, food, bills)',
          '30% for Wants (fun, entertainment)',
          '20% for Savings (emergency fund, goals)',
        ],
      },
      {
        title: 'Quick Check!',
        content: 'Let\'s test your understanding!',
        visual: '🎮',
        interactive: {
          question: 'You earn $1,000/month. Using the 50/30/20 rule, how much should you save?',
          options: ['$100', '$200', '$300', '$500'],
          correctAnswer: 1,
          feedback: 'Exactly! 20% of $1,000 = $200. This goes to your savings and future goals!',
        },
      },
      {
        title: 'Emergency Funds',
        content: 'Life throws curveballs! An emergency fund is your financial safety net. Aim to save 3-6 months of expenses for unexpected costs like car repairs or medical bills.',
        visual: '🛡️',
        tips: [
          'Start with $500-$1,000',
          'Keep it in a savings account',
          'Only use for real emergencies',
        ],
      },
    ],
  },
  'credit-student': {
    title: 'Credit 101',
    icon: '💳',
    color: 'blue',
    slides: [
      {
        title: 'What is Credit?',
        content: 'Credit is borrowed money you promise to pay back. Your credit score (300-850) shows lenders how trustworthy you are with money. Higher score = better rates!',
        visual: '📈',
        tips: [
          'Good credit: 700+',
          'Built over time with responsible use',
          'Affects loans, apartments, jobs',
        ],
      },
      {
        title: 'Credit Utilization',
        content: 'This is how much credit you\'re using vs. your limit. Keep it under 30% for a healthy score!',
        visual: '🎯',
        tips: [
          'Card limit: $1,000 → Use max $300',
          'Lower is better',
          'Pay off monthly for best results',
        ],
      },
      {
        title: 'Quick Check!',
        content: 'Test your knowledge!',
        visual: '🎮',
        interactive: {
          question: 'Your credit card limit is $2,000. What\'s the max you should spend to keep good credit?',
          options: ['$200', '$600', '$1,000', '$2,000'],
          correctAnswer: 1,
          feedback: 'Perfect! $600 is 30% of $2,000. Staying under 30% helps build a strong credit score!',
        },
      },
      {
        title: 'Payment Strategy',
        content: 'Always pay your FULL balance each month! This avoids interest charges (which can be 20%+) and builds excellent credit history.',
        visual: '💪',
        tips: [
          'Set up autopay to never miss',
          'Minimum payment = interest trap',
          'Full payment = free credit building',
        ],
      },
    ],
  },
};

export default function Lesson({ challengeId, onComplete, onBack }: LessonProps) {
  const lesson = lessonContent[challengeId] || lessonContent['budgeting-student'];
  const [currentSlide, setCurrentSlide] = useState(0);
  const [interactiveAnswer, setInteractiveAnswer] = useState<number | null>(null);
  const [showInteractiveFeedback, setShowInteractiveFeedback] = useState(false);

  const slide = lesson.slides[currentSlide];
  const progress = ((currentSlide + 1) / lesson.slides.length) * 100;

  const handleNext = () => {
    if (currentSlide < lesson.slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
      setInteractiveAnswer(null);
      setShowInteractiveFeedback(false);
    } else {
      onComplete();
    }
  };

  const handleInteractiveSubmit = () => {
    if (interactiveAnswer !== null) {
      setShowInteractiveFeedback(true);
    }
  };

  const isCorrect = interactiveAnswer === slide.interactive?.correctAnswer;

  const getColorClasses = () => {
    switch (lesson.color) {
      case 'blue':
        return {
          gradient: 'from-blue-400 to-cyan-400',
          bg: 'bg-blue-50',
          border: 'border-blue-200',
          text: 'text-blue-600',
          light: 'bg-blue-100',
        };
      case 'purple':
        return {
          gradient: 'from-blue-400 to-green-400',
          bg: 'bg-green-50',
          border: 'border-blue-200',
          text: 'text-blue-600',
          light: 'bg-green-100',
        };
      default:
        return {
          gradient: 'from-blue-400 to-green-400',
          bg: 'bg-blue-50',
          border: 'border-blue-200',
          text: 'text-blue-600',
          light: 'bg-blue-100',
        };
    }
  };

  const colors = getColorClasses();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-teal-900 to-slate-800">
      {/* Header */}
      <div className={`bg-gradient-to-r ${colors.gradient} text-white p-6 rounded-b-3xl shadow-lg`}>
        <button
          onClick={onBack}
          className="w-10 h-10 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center mb-4"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center text-2xl">
            {lesson.icon}
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <BookOpen className="w-5 h-5" />
              <span className="text-white text-sm">Lesson</span>
            </div>
            <h1 className="text-white">{lesson.title}</h1>
          </div>
        </div>
        <Progress value={progress} className="h-2 bg-white/20" />
      </div>

      <div className="p-6 space-y-6">
        {/* Visual Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', duration: 0.6 }}
          className="flex justify-center"
        >
          <div className={`w-24 h-24 ${colors.light} rounded-3xl flex items-center justify-center text-5xl shadow-lg`}>
            {slide.visual}
          </div>
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-center text-gray-800 mb-2">{slide.title}</h2>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl p-6 border-2 border-purple-100"
        >
          <p className="text-gray-700 leading-relaxed">{slide.content}</p>
        </motion.div>

        {/* Tips */}
        {slide.tips && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className={`${colors.bg} border-2 ${colors.border} rounded-2xl p-5 space-y-3`}
          >
            <div className="flex items-center gap-2 mb-3">
              <Lightbulb className={`w-5 h-5 ${colors.text}`} />
              <h3 className={colors.text}>Key Points</h3>
            </div>
            {slide.tips.map((tip, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="flex items-start gap-3"
              >
                <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle2 className={`w-4 h-4 ${colors.text}`} />
                </div>
                <p className="text-gray-700">{tip}</p>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Interactive Quiz */}
        {slide.interactive && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-200 rounded-2xl p-5"
          >
            <div className="flex items-center gap-2 mb-4">
              <Target className="w-5 h-5 text-orange-600" />
              <h3 className="text-orange-700">Practice Time!</h3>
            </div>
            <p className="text-gray-800 mb-4">{slide.interactive.question}</p>
            
            <div className="space-y-2 mb-4">
              {slide.interactive.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => !showInteractiveFeedback && setInteractiveAnswer(index)}
                  disabled={showInteractiveFeedback}
                  className={`w-full p-3 rounded-xl border-2 transition-all ${
                    showInteractiveFeedback && index === slide.interactive?.correctAnswer
                      ? 'border-green-400 bg-green-50'
                      : interactiveAnswer === index
                      ? showInteractiveFeedback
                        ? 'border-red-400 bg-red-50'
                        : 'border-orange-400 bg-orange-50'
                      : 'border-gray-200 bg-white hover:border-orange-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-gray-800">{option}</span>
                    {showInteractiveFeedback && index === slide.interactive?.correctAnswer && (
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                    )}
                  </div>
                </button>
              ))}
            </div>

            {!showInteractiveFeedback ? (
              <Button
                onClick={handleInteractiveSubmit}
                disabled={interactiveAnswer === null}
                className="w-full h-12 bg-gradient-to-r from-orange-400 to-yellow-400 hover:from-orange-500 hover:to-yellow-500 text-white rounded-xl"
              >
                Check Answer
              </Button>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`p-4 rounded-xl ${isCorrect ? 'bg-green-100' : 'bg-blue-100'}`}
              >
                <div className="flex items-start gap-3">
                  {isCorrect ? (
                    <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0" />
                  ) : (
                    <Lightbulb className="w-6 h-6 text-blue-600 flex-shrink-0" />
                  )}
                  <div>
                    <h4 className={isCorrect ? 'text-green-800' : 'text-blue-800'}>
                      {isCorrect ? 'Perfect! 🎉' : 'Let\'s learn!'}
                    </h4>
                    <p className={`text-sm mt-1 ${isCorrect ? 'text-green-700' : 'text-blue-700'}`}>
                      {slide.interactive.feedback}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* Navigation */}
        <div className="flex gap-3 pt-4">
          {currentSlide > 0 && (
            <Button
              onClick={() => setCurrentSlide(currentSlide - 1)}
              variant="outline"
              className="w-20 h-12 rounded-xl border-2"
            >
              Back
            </Button>
          )}
          <Button
            onClick={handleNext}
            disabled={slide.interactive && !showInteractiveFeedback}
            className={`flex-1 h-12 bg-gradient-to-r ${colors.gradient} text-white rounded-xl disabled:opacity-50`}
          >
            {currentSlide === lesson.slides.length - 1 ? 'Start Challenge! 🎮' : 'Next'}
            <ChevronRight className="w-5 h-5 ml-2" />
          </Button>
        </div>

        {/* Progress Indicator */}
        <div className="flex justify-center gap-2">
          {lesson.slides.map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all ${
                index === currentSlide
                  ? `w-8 ${colors.light}`
                  : index < currentSlide
                  ? 'w-2 bg-green-300'
                  : 'w-2 bg-gray-200'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
