const express = require('express');
const router = express.Router();
const { db } = require('./server'); 
const { generateLearningPath } = require('./aiService');
const admin = require('firebase-admin'); // Needed for serverTimestamp

// Map raw topic IDs to friendly, display titles
const topicTitlesMap = {
    'budgeting': 'Budgeting Bay',
    'saving': 'Saving Spire',
    'credit': 'Credit Canyon',
    'debt': 'Debt Deep',
    'investing': 'Investment Island',
};

/**
 * POST /api/users/onboarding
 * Creates the initial user profile, determines their rank, and sets a UNIQUE 
 * learning path based on the AI's prioritized list.
 * Body: { quizResults: { financialTendency, weaknesses: [], primaryGoal }, email: string }
 */
router.post('/onboarding', async (req, res) => {
    
    // Check if the user ID was successfully attached by the 'attachUser' middleware
    // We are no longer using the explicit auth middleware here, but we still must have a user ID.
    if (!req.user || !req.user.uid) {
        // If the token was not present or invalid, this is where we block.
        // This check is necessary even though 'attachUser' runs, as attachUser is permissive.
        return res.status(401).send({ error: 'Authentication required for onboarding.' });
    }
    
    const userId = req.user.uid; 
    const { 
        quizResults, 
        email
    } = req.body;

    // References to the documents using the required data structure:
    const app_id = 'financial-frontier'; 
    const userRef = db.collection('artifacts').doc(app_id).collection('users').doc(userId);
    const progressionRef = db.collection('artifacts').doc(app_id).collection('users').doc(userId).collection('progression').doc('main');
    
    // Simple initial stats setup
    const rankName = 'Novice Explorer';
    const startingIQ = 100;
    const startingCoins = 50;

    // --- AI Logic: Generate Personalized Path ---
    let prioritizedTopics = [];
    try {
        // Generate the prioritized list (e.g., ['credit', 'debt', 'budgeting', ...])
        prioritizedTopics = await generateLearningPath(quizResults);
    } catch (error) {
        console.error('Failed to get AI-generated path, using default.');
        prioritizedTopics = ['budgeting', 'saving', 'credit', 'debt', 'investing'];
    }

    // 1. --- Prepare Initial Progression Data ---
    const initialProgression = prioritizedTopics.map((topicId, index) => ({
        topicId: topicId,
        topicTitle: topicTitlesMap[topicId] || topicId, 
        // Example: Only unlock the first topic in the AI's prioritized list
        isUnlocked: index === 0, 
        waypoints: [], // Waypoints (challenges) will be populated later or on first access
    }));

    // 2. --- Transactionally Create Documents ---
    try {
        await db.runTransaction(async t => {
            // Guard clause to ensure onboarding only runs once
            const userDoc = await t.get(userRef);
            if (userDoc.exists) {
                // If it exists, this means the user is trying to re-onboard
                return res.status(409).send({ error: 'User already completed onboarding.', userId: userId });
            }

            // A. Create the User Profile document
            t.set(userRef, {
                userId,
                email: email.toLowerCase(),
                explorerRank: rankName,
                financialIQ: startingIQ,
                coins: startingCoins,
                onboardingStatus: quizResults,
                // The current sector is the first one the AI prioritized
                currentSector: prioritizedTopics[0], 
                createdAt: admin.firestore.FieldValue.serverTimestamp(),
            });

            // B. Create the Progression Document with the AI-generated path
            t.set(progressionRef, {
                topics: initialProgression,
                lastUpdated: admin.firestore.FieldValue.serverTimestamp(),
            });
        });
        
        // 3. Success Response
        res.status(201).send({ 
            message: 'Onboarding complete. Unique path generated.', 
            userId: userId,
            startingRank: rankName,
            startingSector: prioritizedTopics[0]
        });

    } catch (error) {
        // Log the error and return a generic 500 error
        console.error('FATAL: Onboarding Transaction Failed:', error);
        res.status(500).send({ error: 'Failed to complete onboarding due to a server error.' });
    }
});

module.exports = router;