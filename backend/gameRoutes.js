const express = require('express');
const router = express.Router();
const { db } = require('./server'); // Import database instance

/**
 * GET /api/game/stats
 * Retrieves core game stats for the currently authenticated user.
 * Authentication is applied by the middleware in server.js, guaranteeing req.user exists.
 */
router.get('/stats', async (req, res) => {
    // The user ID is guaranteed to be available from the auth middleware
    const userId = req.user.uid; 
    
    try {
        const app_id = 'financial-frontier'; // Use the consistent App ID
        
        // Reference to the user profile document
        const userRef = db.collection('artifacts').doc(app_id).collection('users').doc(userId);
        const doc = await userRef.get();

        if (!doc.exists) {
            return res.status(404).send({ error: 'User profile not found.' });
        }
        
        // Extract relevant stats
        const stats = {
            explorerRank: doc.data().explorerRank,
            financialIQ: doc.data().financialIQ,
            coins: doc.data().coins,
            currentSector: doc.data().currentSector
            // Add other game stats as needed
        };

        res.status(200).json(stats);

    } catch (error) {
        console.error('Error fetching game stats:', error);
        res.status(500).send({ error: 'Failed to fetch game stats.' });
    }
});

// IMPORTANT: Export the router instance so server.js can use it
module.exports = router;