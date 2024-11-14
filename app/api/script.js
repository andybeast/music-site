(async () => {
    let session = null;
  
    // Check if the browser supports the Prompt API and set up error messaging
    if (!self.ai || !self.ai.languageModel) {
      const errorMessage = document.getElementById("error-message");
      errorMessage.style.display = "block";
      errorMessage.innerHTML = `Your browser doesn't support the Prompt API. If you're on Chrome, join the <a href="https://developer.chrome.com/docs/ai/built-in#get_an_early_preview">Early Preview Program</a> to enable it.`;
      return;
    }
  
    // Function to send a prompt and receive a response
    const promptModel = async () => {
      const promptInput = document.getElementById("prompt-input");
      const responseArea = document.getElementById("response-area");
  
      const prompt = promptInput.value.trim();
      if (!prompt) return;
      responseArea.style.display = "block";
      const responseElement = document.createElement("p");
      responseElement.textContent = "Generating response...";
      responseArea.append(responseElement);
  
      let fullResponse = "";
  
      try {
        // Initialize a session if not already active
        if (!session) {
          await updateSession();
        }
        // Send the prompt and stream the response
        const stream = await session.promptStreaming(prompt);
        for await (const chunk of stream) {
          fullResponse = chunk.trim();
          responseElement.textContent = fullResponse;
        }
      } catch (error) {
        responseElement.textContent = `Error: ${error.message}`;
      }
    };
  
    // Set up a session with the desired parameters
    const updateSession = async () => {
      session = await self.ai.languageModel.create({
        temperature: Number(document.getElementById("session-temperature").value),
        topK: Number(document.getElementById("session-top-k").value),
      });
    };
  
    // Initialize the session if not already set
    if (!session) {
      const { defaultTopK, defaultTemperature } = await self.ai.languageModel.capabilities();
      document.getElementById("session-temperature").value = defaultTemperature;
      document.getElementById("session-top-k").value = defaultTopK;
      await updateSession();
    }
  
    // Form submission handling
    document.querySelector("form").addEventListener("submit", async (e) => {
      e.preventDefault();
      await promptModel();
    });
  })();
  