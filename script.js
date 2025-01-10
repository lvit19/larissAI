import { HfInference } from "@huggingface/inference";

const client = new HfInference("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");

const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

sendBtn.addEventListener('click', async () => {
  const message = userInput.value.trim();
  if (message) {
    addMessage('User', message);
    userInput.value = '';

    try {
      const chatCompletion = await client.chatCompletion({
        model: "microsoft/phi-4",
        messages: [
          {
            role: "user",
            content: message
          }
        ],
        max_tokens: 500
      });

      const botReply = chatCompletion.choices[0].message.content || 'Sorry, I did not understand that.';
      addMessage('Bot', botReply);
    } catch (error) {
      console.error('Error fetching response:', error);
      addMessage('Bot', 'An error occurred while connecting to the AI service. Please try again later.');
    }
  }
});

function addMessage(sender, text) {
  const messageElement = document.createElement('div');
  messageElement.classList.add('message', sender.toLowerCase());
  messageElement.textContent = `${sender}: ${text}`;
  chatBox.appendChild(messageElement);
  chatBox.scrollTop = chatBox.scrollHeight;
}
