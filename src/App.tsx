import React, { useState } from 'react';
import Login from './components/Login';
import OnboardingQuiz from './components/OnboardingQuiz';
import Dashboard from './components/Dashboard';
import WhatIfWallet from './components/WhatIfWallet';
import Challenge from './components/Challenge';
import ProgressView from './components/ProgressView';
import Lesson from './components/Lesson';

export type UserProfile = {
  age: string;
  level: 'Student' | 'Adult' | 'Expert';
  financialComfort: string;
  struggles: string[];
  strengths: string[];
  financialIQ: number;
  coins: number;
  badges: string[];
  completedChallenges: string[];
  streak: number;
};

export type Screen = 'login' | 'quiz' | 'dashboard' | 'wallet' | 'challenge' | 'progress' | 'lesson';

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('login');
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [currentChallenge, setCurrentChallenge] = useState<string | null>(null);

  const handleLogin = () => {
    setCurrentScreen('quiz');
  };

  const handleQuizComplete = (profile: UserProfile) => {
    setUserProfile(profile);
    setCurrentScreen('dashboard');
  };

  const handleNavigate = (screen: Screen, challengeId?: string) => {
    if (challengeId) {
      setCurrentChallenge(challengeId);
    }
    setCurrentScreen(screen);
  };

  const handleLessonComplete = () => {
    setCurrentScreen('challenge');
  };

  const handleChallengeComplete = (earnedCoins: number, perfectScore: boolean) => {
    if (userProfile && currentChallenge) {
      const newBadges = [...userProfile.badges];
      const newStreak = perfectScore ? userProfile.streak + 1 : 0;
      
      // Award badges
      if (userProfile.completedChallenges.length === 0) {
        newBadges.push('first-steps');
      }
      if (perfectScore) {
        newBadges.push('perfect-score');
      }
      
      setUserProfile({
        ...userProfile,
        coins: userProfile.coins + earnedCoins,
        financialIQ: userProfile.financialIQ + 5,
        completedChallenges: [...userProfile.completedChallenges, currentChallenge],
        badges: newBadges,
        streak: newStreak,
      });
    }
    setCurrentScreen('dashboard');
  };

  const handleUpdateProfile = (updates: Partial<UserProfile>) => {
    if (userProfile) {
      setUserProfile({ ...userProfile, ...updates });
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-primary to-accent">
      {currentScreen === 'login' && <Login onLogin={handleLogin} />}
      {currentScreen === 'quiz' && <OnboardingQuiz onComplete={handleQuizComplete} />}
      {currentScreen === 'dashboard' && userProfile && (
        <Dashboard 
          userProfile={userProfile} 
          onNavigate={handleNavigate}
        />
      )}
      {currentScreen === 'lesson' && currentChallenge && (
        <Lesson
          challengeId={currentChallenge}
          onComplete={handleLessonComplete}
          onBack={() => handleNavigate('dashboard')}
        />
      )}
      {currentScreen === 'wallet' && userProfile && (
        <WhatIfWallet 
          userProfile={userProfile} 
          onBack={() => handleNavigate('dashboard')}
          onUpdateProfile={handleUpdateProfile}
        />
      )}
      {currentScreen === 'challenge' && userProfile && currentChallenge && (
        <Challenge
          challengeId={currentChallenge}
          userProfile={userProfile}
          onComplete={handleChallengeComplete}
          onBack={() => handleNavigate('dashboard')}
        />
      )}
      {currentScreen === 'progress' && userProfile && (
        <ProgressView
          userProfile={userProfile}
          onBack={() => handleNavigate('dashboard')}
        />
      )}
    </div>
  );
}

export default App;
