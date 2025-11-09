// Configuration for connecting to the Financial Frontier backend
const BASE_URL = 'http://localhost:3000/api';

// NOTE: This token is TEMPORARY and matches the bypass token in your backend's auth.js.
// It allows us to test the full stack without setting up full client-side Firebase Auth yet.
const AUTH_TOKEN: string = 'TEST-TOKEN-PASS'; 

// Define a type for the quiz results payload
export interface QuizResults {
  financialTendency: string;
  weaknesses: string[];
  primaryGoal: string;
}

// Define a type for the successful onboarding response
export interface OnboardingResponse {
  message: string;
  userId: string;
  startingRank: string;
  startingSector: string;
}

// Define a type for the core game statistics response
export interface GameStats {
  explorerRank: string;
  financialIQ: number;
  coins: number;
  currentSector: string;
}

/**
 * Handles all secure communication with the Financial Frontier backend API.
 */
export const apiClient = {
  
  /**
   * POST /api/users/onboarding: Creates the user profile and generates the AI path.
   */
  completeOnboarding: async (quizResults: QuizResults, email: string): Promise<OnboardingResponse> => {
    const url = `${BASE_URL}/users/onboarding`;
    const payload = { quizResults, email };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${AUTH_TOKEN}`, 
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        const errorMessage = (data as { error?: string }).error || `Server responded with status ${response.status}`;
        console.error('API Error:', errorMessage);
        throw new Error(errorMessage);
      }
      
      return data as OnboardingResponse;

    } catch (error) {
      console.error('Network or Parsing Error:', error);
      throw new Error(`Connection Error: Failed to complete onboarding.`);
    }
  },

  /**
   * GET /api/game/stats: Retrieves core user stats. Requires authentication.
   */
  getGameStats: async (): Promise<GameStats> => {
    const url = `${BASE_URL}/game/stats`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${AUTH_TOKEN}`, // Crucial for passing the requireAuth middleware
      },
    });

    const data = await response.json();

    if (!response.ok) {
        const errorMessage = (data as { error?: string }).error || `Server responded with status ${response.status}`;
        console.error('API Error:', errorMessage);
        throw new Error(errorMessage);
    }
    
    return data as GameStats;
  }
};