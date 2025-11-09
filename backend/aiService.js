const { OpenAI } = require('openai');

// Initialize OpenAI client with the API key from environment variables
// It assumes process.env.OPENAI_API_KEY is set in your .env file
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Calls OpenAI to generate a prioritized learning path based on quiz results.
 * This function is critical for the AI-driven personalized learning path.
 * @param {object} quizResults - The raw results from the user's onboarding quiz. 
 * Expected format: { financialTendency: string, weaknesses: Array<string>, primaryGoal: string }
 * @returns {Array<string>} A prioritized array of Topic IDs (e.g., ['credit', 'investing', 'budgeting']).
 */
async function generateLearningPath(quizResults) {
    const userPrompt = `
        Analyze the following user's financial assessment results from the onboarding quiz.
        The user has indicated they are primarily a ${quizResults.financialTendency} and scored poorly on topics like: ${quizResults.weaknesses.join(', ')}.
        Their main goal is to focus on ${quizResults.primaryGoal}.
        
        Based on this, generate a prioritized learning path consisting ONLY of the following topic IDs, ordered from most critical to least critical for their success:
        ['budgeting', 'saving', 'credit', 'debt', 'investing'].
        
        Respond with a single, comma-separated list of the topic IDs, with NO extra text, quotes, or formatting.
        Example response format: credit,debt,budgeting,saving,investing
    `.trim();

    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini", // Use the fast and capable model
            messages: [
                {
                    role: "system",
                    // Enforce the strict output format required for processing
                    content: "You are an expert financial education AI that only outputs a prioritized, comma-separated list of topic IDs. DO NOT include any explanatory text, quotation marks, or prefixes."
                },
                {
                    role: "user",
                    content: userPrompt
                }
            ],
            temperature: 0.1, // Low temperature for reliable list generation
        });

        const rawList = response.choices[0].message.content;
        // Process the response: trim whitespace and split into an array
        return rawList.split(',').map(topic => topic.trim().toLowerCase()).filter(topic => topic.length > 0);

    } catch (error) {
        console.error("OpenAI Error during Path Generation:", error);
        // Fallback: If AI fails, return a safe, general learning path
        return ['budgeting', 'saving', 'credit', 'debt', 'investing'];
    }
}

module.exports = { generateLearningPath };