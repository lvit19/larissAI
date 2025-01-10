import { HfInference } from "@huggingface/inference";

const client = new HfInference("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");

document.getElementById("sendButton").addEventListener("click", async () => {
    const userInput = document.getElementById("userInput").value;
    if (!userInput) {
        alert("Vamos, insira uma pergunta.");
        return;
    }

    const responseContainer = document.getElementById("responseContainer");
    responseContainer.textContent = "Carregando...";

    try {
        const chatCompletion = await client.chatCompletion({
            model: "microsoft/phi-4",
            messages: [
                {
                    role: "user",
                    content: userInput
                }
            ],
            max_tokens: 500
        });

        responseContainer.textContent = chatCompletion.choices[0].message.content;
    } catch (error) {
        console.error(error);
        responseContainer.textContent = "Ocorreu um erro ao obter a resposta. Tente novamente mais tarde.";
    }
});
