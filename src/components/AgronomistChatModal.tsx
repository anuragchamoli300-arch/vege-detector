import React, { useState, useRef, useEffect } from "react";
import {
  Bot,
  Send,
  RefreshCw,
  User,
  Trash2,
  X,
  Lightbulb,
} from "lucide-react";
import { DiagnosticResult } from "../types";

interface ChatMessage {
  id: string;
  role: "user" | "model";
  content: string;
  timestamp: string;
}

interface AgronomistChatModalProps {
  diagnosisContext?: DiagnosticResult | null;
  onClose?: () => void;
  isModal?: boolean;
}

const SAMPLE_PROMPTS = [
  "How do I prevent black mold on onions?",
  "Is an onion safe to eat with small outer spots?",
  "What is the best storage humidity for onions?",
  "How do I treat tomato blight naturally?",
];

export const AgronomistChatModal: React.FC<AgronomistChatModalProps> = ({
  diagnosisContext,
  onClose,
  isModal = false,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    {
      id: "welcome-msg",
      role: "model",
      content: diagnosisContext
        ? `Hello! I'm Dr. Flora, your Vegetable Doctor. I see you've scanned a **${diagnosisContext.vegetableName}** with **${diagnosisContext.primaryIssue}**.\n\nHow can I help you treat this, store your crop safely, or check if it's edible?`
        : "Hello! I'm **Dr. Flora**, your Vegetable AI Specialist. Ask me anything about identifying plant diseases, proper onion/garlic storage, natural organic cures, or kitchen food safety.",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);

  const [inputVal, setInputVal] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputVal;
    if (!text.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: `usr-${Date.now()}`,
      role: "user",
      content: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputVal("");
    setIsLoading(true);

    try {
      // Build conversation payload
      const conversationHistory = [...messages, userMessage].map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const response = await fetch("/api/chat-advisor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: conversationHistory,
          diagnosisContext: diagnosisContext || null,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to receive advice from agronomist.");
      }

      const botMessage: ChatMessage = {
        id: `bot-${Date.now()}`,
        role: "model",
        content: data.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err: any) {
      console.error("Chat error:", err);
      const errorMessage: ChatMessage = {
        id: `err-${Date.now()}`,
        role: "model",
        content: `⚠️ ${err.message || "I encountered a communication issue. Please check your network and try again."}`,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: `msg-${Date.now()}`,
        role: "model",
        content: "Chat history cleared. How can I assist you with your vegetables today?",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ]);
  };

  const containerContent = (
    <div className="flex flex-col h-full bg-[#141d16] border border-emerald-900/30 rounded-2xl shadow-xl overflow-hidden">
      {/* Chat Header */}
      <div className="p-4 bg-[#0d130e] border-b border-emerald-900/30 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl border border-emerald-700/40 bg-emerald-950/60 flex items-center justify-center text-emerald-400">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="font-bold text-sm text-white">Dr. Flora AI</h2>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>
            <p className="text-xs text-slate-400">
              {diagnosisContext
                ? `Discussing: ${diagnosisContext.vegetableName} (${diagnosisContext.primaryIssue})`
                : "Vegetable Health & Care Assistant"}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handleClearChat}
            className="p-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-slate-400 hover:text-white transition-colors"
            title="Clear Chat"
          >
            <Trash2 className="w-4 h-4" />
          </button>
          {isModal && onClose && (
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-slate-400 hover:text-white transition-colors"
              title="Close"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 bg-[#0d130e]/80">
        {messages.map((msg) => {
          const isUser = msg.role === "user";
          return (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${isUser ? "flex-row-reverse" : "flex-row"}`}
            >
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-xs font-bold ${
                  isUser
                    ? "bg-emerald-600 text-white"
                    : "bg-emerald-950/60 border border-emerald-700/40 text-emerald-400"
                }`}
              >
                {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div
                className={`max-w-[85%] sm:max-w-[75%] p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-sm ${
                  isUser
                    ? "bg-emerald-700/30 text-slate-100 border border-emerald-600/30 rounded-tr-sm"
                    : "bg-[#141d16] text-slate-200 border border-emerald-900/30 rounded-tl-sm"
                }`}
              >
                <div className="whitespace-pre-wrap">{msg.content}</div>
                <div className="text-[10px] text-slate-400 mt-1.5 text-right">
                  {msg.timestamp}
                </div>
              </div>
            </div>
          );
        })}

        {isLoading && (
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-emerald-950/60 border border-emerald-700/40 text-emerald-400 flex items-center justify-center shrink-0">
              <Bot className="w-4 h-4" />
            </div>
            <div className="bg-[#141d16] border border-emerald-900/30 rounded-2xl rounded-tl-sm p-3.5 text-xs text-emerald-400 flex items-center gap-2">
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>Checking vegetable care solutions...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Quick Questions */}
      {messages.length <= 2 && (
        <div className="px-4 py-2 bg-[#0d130e] border-t border-emerald-900/30 flex items-center gap-2 overflow-x-auto">
          <span className="text-xs font-semibold text-slate-400 shrink-0 flex items-center gap-1">
            <Lightbulb className="w-3.5 h-3.5 text-amber-400" /> Suggestions:
          </span>
          {SAMPLE_PROMPTS.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(prompt)}
              className="text-xs px-3 py-1 rounded-full bg-[#141d16] hover:bg-[#1f2c22] text-slate-300 border border-emerald-900/40 shrink-0 transition-colors"
            >
              {prompt}
            </button>
          ))}
        </div>
      )}

      {/* Input Area */}
      <div className="p-3 bg-[#0d130e] border-t border-emerald-900/30">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2"
        >
          <input
            id="chat-advisor-input"
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Ask about storage, natural remedies, cooking safety..."
            className="flex-1 bg-[#141d16] border border-emerald-900/40 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors placeholder:text-slate-500"
          />
          <button
            id="btn-send-chat"
            type="submit"
            disabled={!inputVal.trim() || isLoading}
            className="px-4 py-2.5 rounded-xl bg-emerald-600 text-white font-semibold text-xs hover:bg-emerald-500 disabled:opacity-40 transition-all flex items-center gap-1.5 shadow-md shadow-emerald-950/40"
          >
            <Send className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Send</span>
          </button>
        </form>
      </div>
    </div>
  );

  if (isModal) {
    return (
      <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
        <div className="w-full max-w-2xl h-[600px] max-h-[90vh]">
          {containerContent}
        </div>
      </div>
    );
  }

  return <div className="h-[650px]">{containerContent}</div>;
};

