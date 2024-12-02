import React, { useEffect, useState, useRef } from "react";
import * as tf from "@tensorflow/tfjs";
import * as use from "@tensorflow-models/universal-sentence-encoder";
import { Send, Loader2, User, Bot, ThumbsUp, ThumbsDown } from "lucide-react";

import { ResponseGenerator } from "../content/ResponseGenerator";

// Typing Indicator Component
const TypingIndicator = () => (
  <div className="flex items-center space-x-1">
    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-100"></div>
    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-200"></div>
  </div>
);

const AIChatbot = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [model, setModel] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isGeneratingResponse, setIsGeneratingResponse] = useState(false);
  const [dynamicIntents, setDynamicIntents] = useState([]);
  const chatBoxRef = useRef(null);
  const chatResponseGenerator = useRef(new ResponseGenerator());

  // Scroll to bottom when messages change
  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    const loadModel = async () => {
      try {
        await tf.setBackend("webgl");
        await tf.ready();
        const loadedModel = await use.load();
        setModel(loadedModel);
        setIsLoading(false);

        // Add initial suggested questions
        setMessages([
          {
            role: "assistant",
            content:
              "Hello! I'm your AI assistant. Here are some things you can ask me:",
            suggestions: [
              "What can you do?",
              "Tell me a joke.",
              "How are you today?",
            ],
          },
        ]);
      } catch (error) {
        console.error("Error initializing TensorFlow.js:", error);
        setIsLoading(false);
      }
    };

    loadModel();
  }, []);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!userInput.trim() || isGeneratingResponse) return;

    const newUserMessage = { role: "user", content: userInput };
    setMessages((prevMessages) => [...prevMessages, newUserMessage]);
    setUserInput("");
    setIsGeneratingResponse(true);

    try {
      if (model) {
        const response = await generateResponse(userInput);
        setMessages((prevMessages) => [
          ...prevMessages,
          { role: "assistant", content: response, feedback: null },
        ]);
      } else {
        setMessages((prevMessages) => [
          ...prevMessages,
          { role: "assistant", content: "Model is still loading..." },
        ]);
      }
    } catch (error) {
      console.error("Error generating response:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: "assistant", content: "Sorry, something went wrong." },
      ]);
    } finally {
      setIsGeneratingResponse(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setUserInput(suggestion);
  };

  const generateResponse = async (input) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return chatResponseGenerator.current.findBestMatch(input, dynamicIntents);
  };

  const handleFeedback = (messageIndex, feedback) => {
    setMessages((prevMessages) =>
      prevMessages.map((msg, idx) =>
        idx === messageIndex ? { ...msg, feedback } : msg
      )
    );
  };

  const addDynamicIntent = (input, response) => {
    setDynamicIntents((prev) => [
      ...prev,
      { patterns: [input.toLowerCase()], responses: [response] },
    ]);
  };

  return (
    <div className="bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-blue-500 text-white p-4 text-center">
          <h2 className="text-xl font-semibold">AI Assistant</h2>
        </div>

        <div
          ref={chatBoxRef}
          className="h-96 overflow-y-auto p-4 space-y-3 bg-gray-100"
        >
          {isLoading ? (
            <div className="flex justify-center items-center h-full">
              <Loader2 className="animate-spin text-blue-500" size={48} />
            </div>
          ) : (
            <>
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex items-center ${
                    msg.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {msg.role === "assistant" && (
                    <Bot className="mr-2 text-gray-500" size={24} />
                  )}
                  <div
                    className={`max-w-[80%] px-4 py-2 rounded-xl whitespace-pre-wrap ${
                      msg.role === "user"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-black"
                    }`}
                  >
                    {msg.content}
                    {msg.suggestions && (
                      <div className="mt-2">
                        {msg.suggestions.map((suggestion, i) => (
                          <button
                            key={i}
                            onClick={() => handleSuggestionClick(suggestion)}
                            className="mb-2 bg-gray-300 text-gray-700 px-2 py-1 rounded-lg mr-2 hover:bg-gray-400"
                          >
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  {msg.role === "user" && (
                    <User className="ml-2 text-gray-500" size={24} />
                  )}
                  {msg.feedback === null && msg.role === "assistant" && (
                    <div className="ml-2 flex items-center space-x-1">
                      <button
                        onClick={() => handleFeedback(idx, "positive")}
                        className="text-green-500"
                      >
                        <ThumbsUp size={20} />
                      </button>
                      <button
                        onClick={() => handleFeedback(idx, "negative")}
                        className="text-red-500"
                      >
                        <ThumbsDown size={20} />
                      </button>
                    </div>
                  )}
                </div>
              ))}
              {isGeneratingResponse && (
                <div className="flex items-center justify-start">
                  <Bot className="mr-2 text-gray-500" size={24} />
                  <div className="bg-gray-200 px-4 py-2 rounded-xl">
                    <TypingIndicator />
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        <form
          onSubmit={handleSendMessage}
          className="flex items-center p-4 bg-white border-t"
        >
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            className="flex-grow mr-2 p-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Type a message..."
            disabled={isLoading || isGeneratingResponse}
          />
          <button
            type="submit"
            className={`bg-blue-500 text-white p-2 rounded-full transition-all ${
              !userInput.trim() || isLoading || isGeneratingResponse
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-blue-600"
            }`}
            disabled={!userInput.trim() || isLoading || isGeneratingResponse}
          >
            {isGeneratingResponse ? (
              <Loader2 className="animate-spin" size={24} />
            ) : (
              <Send size={24} />
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AIChatbot;
