import axios from "axios";

const baseURL = "https://api.openai.com/v1/chat/completions";

// i have moved this to env like you teached us in the course 
const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
const systemPrompts = {
  Quiz: "You are QuizGPT, a helpful quiz generator and explainer.",
  Resume: "You are ResumeGPT, an expert in creating and reviewing resumes.",
  Job: "You are JobFinderGPT, a career coach and job search assistant.",
  Interview: "You are InterviewGPT, a mock interview coach that asks and analyzes responses like a real recruiter."
};

export async function sendChatMessage(userMessage, feature) {
  const systemPrompt = systemPrompts[feature] || "You are a helpful AI assistant.";

  try {
    const response = await axios.post(baseURL, {
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userMessage }
      ],
      temperature: 0.7
    }, {
    headers: {
  Authorization: `Bearer ${apiKey}`,
  "Content-Type": "application/json"
}
    });

    return response.data.choices[0].message.content;
  } catch (err) {
    console.error("❌ Chat API Error:", err.response?.data || err.message);
    return "⚠️ Sorry, I couldn't process your request. Please try again.";
  }
}

