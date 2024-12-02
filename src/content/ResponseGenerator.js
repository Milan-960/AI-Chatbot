// Enhanced Response Generation System
export class ResponseGenerator {
  constructor() {
    this.intents = [
      {
        patterns: ["hi", "hello", "hey", "greetings"],
        responses: [
          "Hello there! I'm an AI assistant ready to help you with a wide range of tasks. What can I do for you today?",
          "Hi! It's great to meet you. I'm here to assist you with any questions or tasks you might have.",
          "Greetings! I'm your friendly AI companion. How can I make your day easier?",
        ],
      },
      {
        patterns: ["how are you", "how you doing", "what's up"],
        responses: [
          "I'm functioning perfectly and ready to help! As an AI, I'm always eager to assist. What can I do for you today?",
          "Great and fully operational! I'm here and ready to tackle any questions or tasks you might have.",
          "Doing excellent! My circuits are humming and I'm 100% ready to help you with anything you need.",
        ],
      },
      {
        patterns: ["what can you help", "your capabilities", "what do you do"],
        responses: [
          "I'm a versatile AI assistant capable of helping you with a wide variety of tasks! I can:\n" +
            "• Answer questions on numerous topics\n" +
            "• Help with writing and editing\n" +
            "• Provide explanations and breakdowns\n" +
            "• Assist with problem-solving\n" +
            "• Offer suggestions and brainstorm ideas\n" +
            "Is there something specific you'd like help with today?",

          "My capabilities are quite broad! I can:\n" +
            "• Explain complex concepts\n" +
            "• Help with research and information gathering\n" +
            "• Provide coding assistance\n" +
            "• Offer creative writing support\n" +
            "• Analyze text and provide insights\n" +
            "What area would you like me to assist you in?",

          "As an advanced AI, I'm equipped to handle a variety of tasks:\n" +
            "• Answering questions across different domains\n" +
            "• Breaking down complex topics\n" +
            "• Helping with language-related tasks\n" +
            "• Providing step-by-step guidance\n" +
            "• Offering creative solutions\n" +
            "Feel free to challenge me with anything you'd like!",
        ],
      },
      {
        patterns: ["goodbye", "bye", "see you later"],
        responses: [
          "It was great chatting with you! If you need anything else, feel free to come back anytime. Have a wonderful day!",
          "Goodbye for now! It was a pleasure assisting you. Take care and I'll see you next time you need help.",
          "See you later! It was a pleasure chatting with you. If you have any other questions or need assistance, don't hesitate to reach out.",
        ],
      },
      {
        patterns: ["thank you", "thanks", "appreciate it", "grateful"],
        responses: [
          "You're welcome! I'm always happy to help. Is there anything else I can assist you with?",
          "My pleasure! Helping you is what I'm designed to do. Do you need help with anything else?",
          "Glad I could be of assistance! Feel free to ask if you need further support.",
        ],
      },
      {
        patterns: ["tell me joke", "joke"],
        responses: [
          "Here's one: Why couldn't the bicycle stand up by itself?\n" +
            "Because it was two-tired!\n" +
            "Hope that made you smile!",
          "Why don't scientists trust atoms?\n" +
            "Because they make up everything!\n" +
            "Groan away!",
          "What do you call a fake noodle?\n" +
            "An impasta!\n" +
            "Hope that one made you giggle",
        ],
      },
    ];

    this.fallbackResponses = [
      "That's an interesting topic! I'm processing your request and will do my best to provide a helpful response.",
      "I'm intrigued by your query. Give me a moment to formulate a comprehensive answer.",
      "Hmm, let me think about that and provide you with the most accurate information I can.",
      "Great question! Let me dig into my knowledge base and craft a detailed response for you.",
      "I'm analyzing your input to provide the most relevant and helpful information possible.",
    ];
  }

  findBestMatch(input) {
    // Convert input to lowercase for case-insensitive matching
    const normalizedInput = input.toLowerCase().trim();

    // First, check for exact intent matches
    for (const intent of this.intents) {
      if (
        intent.patterns.some((pattern) => normalizedInput.includes(pattern))
      ) {
        return this.getRandomResponse(intent.responses);
      }
    }

    // If no match, return a fallback response
    return this.getRandomResponse(this.fallbackResponses);
  }

  getRandomResponse(responseArray) {
    return responseArray[Math.floor(Math.random() * responseArray.length)];
  }
}
