const admin = require('firebase-admin');

// --- TEMPORARY TEST TOKEN ---
const TEST_UID = "test-user-onboarding-12345";
const TEST_TOKEN = "TEST-TOKEN-PASS";
// ---------------------------

/**
 * Middleware that attempts to authenticate the user and attaches req.user if successful.
 * If authentication fails, it DOES NOT automatically send a 401 response, 
 * allowing routes like /onboarding to handle the lack of user ID gracefully.
 */
async function attachUser(req, res, next) {
    const authHeader = req.headers.authorization;
    
    // Default to an empty user object
    req.user = null; 

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        // No token provided, simply move to the next middleware/route handler
        return next();
    }

    const idToken = authHeader.split(' ')[1];

    // --- TEMPORARY AUTH BYPASS LOGIC ---
    if (idToken === TEST_TOKEN) {
        console.log(`Bypassing auth for test user: ${TEST_UID}`);
        // Attach the mock user data to the request
        req.user = { uid: TEST_UID, email: "test.onboarding@example.com" };
        return next();
    }
    // --- END TEMPORARY AUTH BYPASS LOGIC ---

    // Original Firebase verification logic:
    try {
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        req.user = decodedToken;
    } catch (error) {
        console.warn('Token verification failed, proceeding without user attached:', error.message);
        // We still call next() even on failure, so routes can decide if req.user is mandatory
    }
    
    next();
}

/**
 * Middleware that strictly requires a user to be authenticated.
 */
function requireAuth(req, res, next) {
    if (!req.user || !req.user.uid) {
        // If attachUser failed to attach a user, block the request here
        return res.status(401).send({ error: 'Unauthorized. Token missing or invalid.' });
    }
    next();
}

module.exports = { attachUser, requireAuth };