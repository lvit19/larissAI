import { HfInference } from "@huggingface/inference"; // Importa a biblioteca Hugging Face

// Inicializa o cliente da API do Hugging Face
const client = new HfInference("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"); // Substitua pelo seu token

// Seletores do DOM
const chatbox = document.getElementById("chatbox");
const userInput = document.getElementById("userInput");

// Função para adicionar mensagens ao chatbox
function addMessage(role, content) {
  const message = document.createElement("div");
  message.textContent = `${role}: ${content}`;
  chatbox.appendChild(message);
  chatbox.scrollTop = chatbox.scrollHeight; // Scroll automático
}

// Função para obter resposta da IA
async function getAIResponse(userMessage) {
  try {
    const response = await client.chatCompletion({
      model: "microsoft/phi-4",
      messages: [{ role: "user", content: userMessage }],
      max_tokens: 500,
    });

    return response.choices[0].message.content; // Resposta da IA
  } catch (error) {
    console.error("Erro ao acessar o modelo:", error);
    return "Desculpe, ocorreu um erro ao processar sua mensagem.";
  }
}

// Event Listener para capturar input do usuário
userInput.addEventListener("keydown", async (event) => {
  if (event.key === "Enter" && userInput.value.trim() !== "") {
    const userMessage = userInput.value.trim();
    addMessage("Usuário", userMessage);

    // Limpa o input
    userInput.value = "";

    // Obtém e exibe a resposta da IA
    const aiResponse = await getAIResponse(userMessage);
    addMessage("Assistente", aiResponse);
  }
});
