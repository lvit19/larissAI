const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

const API_URL = 'https://api-inference.huggingface.co/models/microsoft/phi-4';
const API_TOKEN = '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';

sendBtn.addEventListener('click', async () => {
  const message = userInput.value.trim();
  if (message) {
    addMessage('User', message);
    userInput.value = '';
    
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ inputs: message })
    });

    const result = await response.json();
    const botReply = result.generated_text || 'Sorry, I did not understand that.';
    addMessage('Bot', botReply);
  }
});

function addMessage(sender, text) {
  const messageElement = document.createElement('div');
  messageElement.classList.add('message', sender.toLowerCase());
  messageElement.textContent = `${sender}: ${text}`;
  chatBox.appendChild(messageElement);
  chatBox.scrollTop = chatBox.scrollHeight;
}
