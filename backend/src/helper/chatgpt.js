const { OpenAI } = require("openai");

const openai = new OpenAI({
  apiKey: process.env.CHATGPT_KEY,
});
const assistantId = process.env.CHATGPT_ASSISTANT_ID;

// Function to interact with ChatGPT and get a short response
async function getChatGPTResponse(comment) {
  const prompt = `User Comment: ${comment}`;
  console.log(prompt);
  try {
    const response = await openai.completions.create({
      model: "gpt-3.5-turbo-instruct",
      prompt,
      max_tokens: 50, // adjust this value as needed
    });

    if (response && response.choices && response.choices.length > 0) {
      //   console.log(response.choices[0].text.trim());
      return response.choices[0].text.trim();
    } else if (!response || !response.choices) {
      console.error("Invalid response format from OpenAI API");
      return "Error: Invalid response format";
    } else {
      console.error("Error calling OpenAI API:", error);
      return `Error: ${error.message}`;
    }
  } catch (error) {
    console.error("Error calling OpenAI API:", error);
    return `Error: ${error.message}`;
  }
}

async function assistantResponse(userComment) {
  try {
    // Retrieve the assistant
    console.log(userComment);
    const assistant = await openai.beta.assistants.create(
      {
        name: "Math Tutor",
        instructions: "You are a personal math tutor. Write and run code to answer math questions.",
        tools: [{ type: "code_interpreter" }],
        model: "gpt-4-turbo-preview"
      }
    );

    // Create a thread
    const threadResponse = await openai.beta.threads.create();

    // Add user comment to the thread
    await openai.beta.threads.messages.create(threadResponse.id, {
      role: "user",
      content: userComment,
    });

    // Run the assistant in the thread
    const run = await openai.beta.threads.runs.create(threadResponse.id, {
      assistant_id: assistantId,
    });

    // Poll for run completion
    let runStatus = await openai.beta.threads.runs.retrieve(
      threadResponse.id,
      run.id
    );
    while (runStatus.status !== "completed") {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait for 1 second
      runStatus = await openai.beta.threads.runs.retrieve(
        threadResponse.id,
        run.id
      );
    }

    // Retrieve the assistant's response
    const messagesResponse = await openai.beta.threads.messages.list(
      threadResponse.id
    );
    const aiMessages = messagesResponse.data.filter(
      (msg) => msg.role === "assistant"
    );
    const assistantResponse =
      aiMessages[aiMessages.length - 1].content[0].text.value;

    return assistantResponse;
  } catch (error) {
    console.error("Error:", error);
    throw error; // Re-throw to allow for further handling
  }
}

async function sentimentAnalysis(userComment) {
  try {
    const id = process.env.CHATGPT_ASSISTANT_SENTIMENT_ANALYSIS;
    // Retrieve the assistant
    console.log(userComment);
    const assistant = await openai.beta.assistants.retrieve(id);

    // Create a thread
    const threadResponse = await openai.beta.threads.create();

    // Add user comment to the thread
    await openai.beta.threads.messages.create(threadResponse.id, {
      role: "user",
      content: userComment,
    });

    // Run the assistant in the thread
    const run = await openai.beta.threads.runs.create(threadResponse.id, {
      assistant_id: assistantId,
    });

    // Poll for run completion
    let runStatus = await openai.beta.threads.runs.retrieve(
      threadResponse.id,
      run.id
    );
    while (runStatus.status !== "completed") {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait for 1 second
      runStatus = await openai.beta.threads.runs.retrieve(
        threadResponse.id,
        run.id
      );
    }

    // Retrieve the assistant's response
    const messagesResponse = await openai.beta.threads.messages.list(
      threadResponse.id
    );
    const aiMessages = messagesResponse.data.filter(
      (msg) => msg.role === "assistant"
    );
    const assistantResponse =
      aiMessages[aiMessages.length - 1].content[0].text.value;

    return assistantResponse;
  } catch (error) {
    console.error("Error:", error);
    throw error; // Re-throw to allow for further handling
  }
}

module.exports = { getChatGPTResponse, assistantResponse, sentimentAnalysis };
