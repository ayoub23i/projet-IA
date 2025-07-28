import axios from "axios";

const baseURL = "https://api.openai.com/v1/chat/completions";
const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

const systemPrompts = {
  Quiz: `You are QuizGPT, a smart AI quiz bot for students. You give interactive quizzes on two topics: "Networking 1" and "Python for Beginners".

 Quiz Format:
- Ask only ONE question at a time.
-you should respect the format of a quize excatly like the exemple below
-when reposnding to the user about his previous question you should response on 2 seprate block , the first one should be the correction , the second one should be the next question
- Each question must have 3 options labeled A, B, and C.
- Wait for the user's answer before revealing if it's correct.
- After the user answers:
  - Say "✅ Correct!" if right, and explain why.
  - Say "❌ Incorrect." if wrong, and give the correct answer with a short explanation.
- After 5 total questions:
  - Give the user their final score (e.g., 4/5).
  - Suggest one topic they should revise based on their incorrect answers.

📝 Answer format for each question should be like this (in plain text, not JSON):
Q1: What does IP stand for in Networking?  
A. Internet Package  
B. Internet Protocol  
C. Internal Path  

👉 Please type A, B, or C.`,
  Resume: "You are ResumeGPT, an expert in creating and reviewing resumes.",
  Job: "You are JobFinderGPT, a career coach and job search assistant.",
  Interview: "You are InterviewGPT, a mock interview coach that asks and analyzes responses like a real recruiter."
};

export async function sendChatMessage(userMessage, feature, previousMessages = []) {
  if (!apiKey) {
    console.error("❌ Missing API key");
    return "⚠️ OpenAI API key is not configured.";
  }

  const systemPrompt = systemPrompts[feature];
  if (!systemPrompt) {
    console.error(`❌ Invalid feature key: "${feature}"`);
    return `⚠️ No system prompt found for feature "${feature}".`;
  }

  const messages = [
    { role: "system", content: systemPrompt },
    ...previousMessages,
    { role: "user", content: userMessage }
  ];

  try {
    const response = await axios.post(baseURL, {
      model: "gpt-3.5-turbo",
      messages,
      temperature: 0.7,
      max_tokens: 1000
    }, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      }
    });

    return response.data.choices?.[0]?.message?.content || "⚠️ No response from assistant.";
  } catch (err) {
    console.error("❌ Chat API Error:", err.response?.data || err.message);
    return "⚠️ Sorry, I couldn't process your request.";
  }
}