import React, { useState } from 'react';
// Fix: Explicitly adding .tsx extension for component imports
import Login from './components/Login';
import OnboardingQuiz from './components/OnboardingQuiz';
import Dashboard from './components/Dashboard';
import WhatIfWallet from './components/WhatIfWallet';
import Challenge from './components/Challenge';
import ProgressView from './components/ProgressView';
import Lesson from './components/Lesson';

// Import the API client and types from the project's root src file (no explicit extension)
import { apiClient, QuizResults, GameStats, OnboardingResponse } from './apiClient';

// 2. REVISED USER PROFILE TYPE
// Merge the core stats returned by the backend (GameStats) with client-side state.
export type UserProfile = GameStats & {
  // Client-side state managed locally
  badges: string[];
  completedChallenges: string[];
  streak: number;
};

export type Screen = 'login' | 'quiz' | 'dashboard' | 'wallet' | 'challenge' | 'progress' | 'lesson';

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('login');
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [currentChallenge, setCurrentChallenge] = useState<string | null>(null);
  const [loading, setLoading] = useState(false); // New state for loading indicator
  const [error, setError] = useState<string | null>(null);   // New state for errors

  const handleLogin = () => {
    setCurrentScreen('quiz');
  };

  /**
   * API INTEGRATION: This function now calls the backend API to complete onboarding
   * and receive the user's starting stats and path.
   * @param quizData The structured data from the quiz (QuizResults type).
   * @param email The user's mock email/identifier (needed for the API call).
   */
  const handleQuizComplete = async (quizData: QuizResults, email: string) => {
    setLoading(true);
    setError(null);

    try {
      // 1. CALL BACKEND: Complete onboarding and generate path
      const onboardResult: OnboardingResponse = await apiClient.completeOnboarding(quizData, email);
      
      // 2. CONSTRUCT INITIAL PROFILE: Map backend data to local state
      const initialProfile: UserProfile = {
        explorerRank: onboardResult.startingRank,
        financialIQ: 100, // Default start values
        coins: 50,        // Default start values
        currentSector: onboardResult.startingSector,
        badges: [],
        completedChallenges: [],
        streak: 0,
      };

      // 3. UPDATE STATE AND NAVIGATE
      setUserProfile(initialProfile);
      setCurrentScreen('dashboard');
    } catch (e) {
      console.error("Onboarding Failed:", e);
      setError(`Failed to set up profile: ${e instanceof Error ? e.message : 'Unknown Error'}`);
      setCurrentScreen('quiz'); // Keep them on the quiz screen to retry or view error
    } finally {
      setLoading(false);
    }
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
      
      // Award badges (client-side logic for now)
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

  // Display error message
  if (error) {
    return (
        <div className="min-h-screen bg-red-900 flex items-center justify-center p-8 text-white">
            <div className="p-8 bg-red-700 rounded-lg shadow-xl max-w-md">
                <h1 className="text-3xl font-bold mb-4">API Connection Error</h1>
                <p className="mb-4">{error}</p>
                <button 
                    onClick={() => { setError(null); setCurrentScreen('quiz'); }}
                    className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded font-semibold"
                >
                    Try Quiz Again
                </button>
            </div>
        </div>
    );
  }

  // Display loading screen while waiting for AI response
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4 text-white">
          <svg className="animate-spin h-10 w-10 text-indigo-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="mt-4 text-xl font-semibold">Generating Your Personalized Financial Path...</p>
          <p className="text-sm text-gray-400 mt-2">This may take a few moments as the AI processes your quiz results.</p>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-linear-to-b from-primary to-accent">
      {currentScreen === 'login' && <Login onLogin={handleLogin} />}
      {currentScreen === 'quiz' && (
        <OnboardingQuiz
          onComplete={(profile) => {
            // Adapter: OnboardingQuiz provides a single profile object. Call the existing
            // handleQuizComplete which expects (quizData, email). Use a mock email for now.
            void handleQuizComplete(profile as unknown as QuizResults, 'guest@example.com');
          }}
        />
      )}
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