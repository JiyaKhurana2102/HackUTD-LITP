const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); 
const dotenv = require('dotenv');
const fs = require('fs'); 

const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

// Load environment variables from .env file
dotenv.config(); 

// --- 1. FIREBASE ADMIN SETUP (Using FIREBASE_KEY_PATH) ---
if (!process.env.FIREBASE_KEY_PATH) {
    console.error("FATAL ERROR: FIREBASE_KEY_PATH is missing in .env. Server cannot start.");
    process.exit(1);
}

let serviceAccount;
try {
    const keyPath = process.env.FIREBASE_KEY_PATH;
    const keyFileContent = fs.readFileSync(keyPath, 'utf8');
    serviceAccount = JSON.parse(keyFileContent);
} catch (error) {
    console.error(`FATAL ERROR: Could not read or parse the Firebase Service Account Key at ${process.env.FIREBASE_KEY_PATH}.`);
    console.error("Details:", error.message);
    process.exit(1); 
}

const firebaseApp = initializeApp({
    credential: cert(serviceAccount),
    databaseURL: process.env.FIREBASE_DATABASE_URL
});
const db = getFirestore(firebaseApp);

// Export db so other modules can use it
module.exports = { db };


// --- 2. IMPORTING ROUTES AND MIDDLEWARE ---
const { attachUser, requireAuth } = require('./auth');
const gameRoutes = require('./gameRoutes'); 
const userRoutes = require('./userRoutes'); 

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// ----------------------------------------------------
// 🛑 CORS FIX: Explicitly Whitelisting Frontend Ports
// ----------------------------------------------------
const allowedOrigins = [
    'http://localhost:5173', 
    'http://127.0.0.1:5173',
    // Add other local frontend development ports here if necessary
]; 

const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true); // Allow the request
        } else {
            callback(new Error('Not allowed by CORS policy'), false); // Reject
        }
    },
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, // Important if you use cookies or auth headers
};

app.use(cors(corsOptions)); // Apply CORS middleware here

console.log(`CORS configured to allow: ${allowedOrigins.join(', ')}`);
// ----------------------------------------------------

// --- 3. APPLYING AUTHENTICATION AND ROUTES ---

// 1. GLOBAL: Run 'attachUser' on ALL /api routes. This attempts to parse the token
// and attach req.user, but it never fails the request (it's permissive).
app.use('/api', attachUser); 

// 2. SPECIFIC ROUTES: Apply 'requireAuth' ONLY where the user MUST be logged in.

// The /onboarding route handles its own mandatory check internally (in userRoutes.js)
app.use('/api/users', userRoutes); 

// All game routes require a logged-in user, so we use the strict middleware here.
app.use('/api/game', requireAuth, gameRoutes);

// Basic public route (Test 1: Server Health Check)
app.get('/', (req, res) => {
    res.send('Financial Frontier Backend Running');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});