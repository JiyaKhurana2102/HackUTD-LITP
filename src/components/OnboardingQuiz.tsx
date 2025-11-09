import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, Compass } from 'lucide-react';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { motion } from 'motion/react';
import { UserProfile } from '../App';

type QuizProps = {
  onComplete: (profile: UserProfile) => void;
};

export default function OnboardingQuiz({ onComplete }: QuizProps) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({
    age: '',
    financialComfort: '',
    struggles: [] as string[],
    strengths: [] as string[],
  });

  const questions = [
    {
      id: 'age',
      question: "What's your current stage?",
      options: [
        { value: 'student', label: '🎓 Student', sublabel: 'In school or college' },
        { value: 'adult', label: '💼 Working Adult', sublabel: 'Established career' },
        { value: 'expert', label: '🌟 Advanced', sublabel: 'Experienced investor' },
      ],
    },
    {
      id: 'financialComfort',
      question: 'How comfortable are you with finances?',
      options: [
        { value: 'beginner', label: '🌱 Just Starting', sublabel: 'New to managing money' },
        { value: 'intermediate', label: '🌿 Getting There', sublabel: 'Know the basics' },
        { value: 'advanced', label: '🌳 Confident', sublabel: 'Comfortable with most concepts' },
      ],
    },
    {
      id: 'struggles',
      question: 'What do you struggle with? (Select all)',
      multiple: true,
      options: [
        { value: 'budgeting', label: '💰 Budgeting' },
        { value: 'credit', label: '💳 Credit & Loans' },
        { value: 'investing', label: '📈 Investing' },
        { value: 'taxes', label: '📋 Taxes' },
        { value: 'insurance', label: '🛡️ Insurance' },
      ],
    },
    {
      id: 'strengths',
      question: 'What are you good at? (Select all)',
      multiple: true,
      options: [
        { value: 'saving', label: '🐷 Saving Money' },
        { value: 'planning', label: '📅 Planning Ahead' },
        { value: 'research', label: '🔍 Research' },
        { value: 'discipline', label: '💪 Financial Discipline' },
      ],
    },
  ];

  const currentQuestion = questions[step];
  const progress = ((step + 1) / questions.length) * 100;

  const handleSelect = (value: string) => {
    const questionId = currentQuestion.id as keyof typeof answers;
    
    if (currentQuestion.multiple) {
      const currentValues = answers[questionId] as string[];
      const newValues = currentValues.includes(value)
        ? currentValues.filter(v => v !== value)
        : [...currentValues, value];
      setAnswers({ ...answers, [questionId]: newValues });
    } else {
      setAnswers({ ...answers, [questionId]: value });
    }
  };

  const isSelected = (value: string) => {
    const questionId = currentQuestion.id as keyof typeof answers;
    if (currentQuestion.multiple) {
      return (answers[questionId] as string[]).includes(value);
    }
    return answers[questionId] === value;
  };

  const canProceed = () => {
    const questionId = currentQuestion.id as keyof typeof answers;
    if (currentQuestion.multiple) {
      return (answers[questionId] as string[]).length > 0;
    }
    return answers[questionId] !== '';
  };

  const handleNext = () => {
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      // Complete quiz and create profile
      const level = answers.age === 'student' ? 'Student' : answers.age === 'expert' ? 'Expert' : 'Adult';
      const profile: UserProfile = {
        age: answers.age,
        level,
        financialComfort: answers.financialComfort,
        struggles: answers.struggles,
        strengths: answers.strengths,
        financialIQ: 0,
        coins: 100, // Starting coins
        badges: [],
        completedChallenges: [],
        streak: 0,
      };
      onComplete(profile);
    }
  };

  return (
    <div className="min-h-screen flex flex-col p-6 bg-gradient-to-br from-slate-900 via-teal-900 to-slate-800 relative overflow-hidden">
      {/* Compass Background */}
      <div className="absolute top-10 right-10 opacity-5">
        <Compass className="w-64 h-64 text-teal-300" />
      </div>

      {/* Progress - Compass Style */}
      <div className="mb-8 relative z-10">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-teal-400" />
            <span className="text-teal-300 text-sm">Expedition Briefing</span>
          </div>
          <span className="text-green-400">{Math.round(progress)}%</span>
        </div>
        <div className="relative">
          <Progress value={progress} className="h-3 bg-slate-700" />
          <motion.div
            animate={{ rotate: progress * 3.6 }}
            className="absolute -top-1 left-0 w-5 h-5"
            style={{ left: `${progress}%`, transform: 'translateX(-50%)' }}
          >
            <div className="w-5 h-5 bg-gradient-to-br from-teal-400 to-green-500 rounded-full shadow-lg" />
          </motion.div>
        </div>
      </div>

      {/* Question */}
      <div className="flex-1 flex flex-col">
        <motion.h2
          key={step}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-teal-200 mb-8"
        >
          {currentQuestion.question}
        </motion.h2>

        <div className="space-y-3 mb-8">
          {currentQuestion.options.map((option, index) => (
            <motion.button
              key={option.value}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => handleSelect(option.value)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full p-5 rounded-2xl border-2 transition-all text-left ${
                isSelected(option.value)
                  ? 'border-teal-400 bg-gradient-to-r from-teal-900/50 to-green-900/50 shadow-lg shadow-teal-500/20'
                  : 'border-slate-600 bg-slate-800/50 backdrop-blur hover:border-teal-500/50 hover:shadow-md'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-teal-100">{option.label}</div>
                  {option.sublabel && (
                    <div className="text-teal-300/60 text-sm mt-1">{option.sublabel}</div>
                  )}
                </div>
                {isSelected(option.value) && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-6 h-6 bg-gradient-to-br from-teal-400 to-green-500 rounded-full flex items-center justify-center shadow-lg"
                  >
                    <div className="w-2 h-2 bg-white rounded-full" />
                  </motion.div>
                )}
              </div>
            </motion.button>
          ))}
        </div>

        {/* Navigation */}
        <div className="flex gap-3 mt-auto">
          {step > 0 && (
            <Button
              onClick={() => setStep(step - 1)}
              variant="outline"
              className="w-20 h-12 rounded-xl border-2 border-teal-500 text-teal-300 hover:bg-teal-900/30"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
          )}
          <Button
            onClick={handleNext}
            disabled={!canProceed()}
            className="flex-1 h-12 bg-gradient-to-r from-teal-500 via-green-500 to-teal-600 hover:from-teal-600 hover:via-green-600 hover:to-teal-700 text-white rounded-xl disabled:opacity-50 shadow-lg"
          >
            {step === questions.length - 1 ? 'Begin Quest! 🗺️' : 'Next'}
            <ChevronRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}
