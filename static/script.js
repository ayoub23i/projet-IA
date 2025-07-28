const chatForm = document.getElementById("chat-form");
const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");
const history = [];

chatForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const message = userInput.value.trim();
  if (!message) return;

  appendMessage("user", message);
  history.push({ role: "user", content: message });
  userInput.value = "";

  const res = await fetch("/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      message,
      model: "Quiz",
      subject: "Python",
      history
    })
  });

  const data = await res.json();
  appendMessage("assistant", data.reply);
  history.push({ role: "assistant", content: data.reply });
});

function appendMessage(role, content) {
  const div = document.createElement("div");
  div.className = `message ${role}`;
  div.textContent = `${role}: ${content}`;
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
}