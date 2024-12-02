import React from "react";
import AIChatbot from "./components/AIChatbot";

const ChatbotPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          AI Chatbot
        </h1>
        <AIChatbot />
        <div className="mt-4 text-center text-gray-600">
          <p>Powered by Transformers.js and DistilGPT-2</p>
        </div>
      </div>
    </div>
  );
};

export default ChatbotPage;
