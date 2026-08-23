import React, { useState, useRef, useEffect } from "react";
import {
  Bot,
  Send,
  Sparkles,
  RefreshCw,
  User,
  Trash2,
  X,
  CheckCircle2,
  HelpCircle,
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
  "How do I prevent black mold on stored onions?",
  "Is an onion safe to eat if outer layers have purple spots?",
  "What is the best curing temperature and humidity for onions?",
  "How can I treat tomato late blight with organic bio-fungicides?",
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
        ? `Hello! I'm Dr. Flora, your AI Agronomist & Vegetable Doctor. I see you've scanned a **${diagnosisContext.vegetableName}** diagnosed with **${diagnosisContext.primaryIssue}**.\n\nHow can I help you manage this disease, protect your stored crop, or verify cooking safety?`
        : "Hello! I am **Dr. Flora**, your AI Agronomist & Vegetable Health Specialist. Ask me anything about identifying vegetable diseases, onion and garlic storage management, natural and chemical crop remedies, or food safety questions.",
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
        content: "Chat history cleared. How can I assist you with your vegetable crops or storage today?",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ]);
  };

  const containerContent = (
    <div className="flex flex-col h-full bg-[#151D16] border border-white/10 font-mono shadow-xl">
      {/* Chat Header */}
      <div className="p-4 bg-[#0F1410] border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 border border-green-500/40 bg-green-500/10 flex items-center justify-center text-green-400">
            <Bot className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="font-bold text-xs uppercase tracking-[0.2em] text-white">Dr. Flora AI Agronomist</h2>
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            </div>
            <p className="text-[10px] text-slate-400">
              {diagnosisContext
                ? `Active Specimen: ${diagnosisContext.vegetableName} (${diagnosisContext.primaryIssue})`
                : "Vegetable Pathology & Crop Advisory Specialist"}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handleClearChat}
            className="p-1.5 bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white border border-white/10 text-xs transition-colors"
            title="Clear Chat"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
          {isModal && onClose && (
            <button
              onClick={onClose}
              className="p-1.5 bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white border border-white/10 transition-colors"
              title="Close"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 bg-[#0F1410]/60">
        {messages.map((msg) => {
          const isUser = msg.role === "user";
          return (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${isUser ? "flex-row-reverse" : "flex-row"}`}
            >
              <div
                className={`w-7 h-7 flex items-center justify-center shrink-0 text-xs font-bold border ${
                  isUser
                    ? "bg-white/10 border-white/20 text-white"
                    : "bg-green-500/10 border-green-500/40 text-green-400"
                }`}
              >
                {isUser ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
              </div>

              <div
                className={`max-w-[85%] sm:max-w-[75%] p-3 text-xs leading-relaxed border ${
                  isUser
                    ? "bg-white/5 text-slate-200 border-white/20"
                    : "bg-[#121813] text-slate-200 border-white/10"
                }`}
              >
                <div className="whitespace-pre-wrap">{msg.content}</div>
                <div className="text-[9px] text-slate-400 mt-1.5 text-right font-mono uppercase tracking-wider">
                  {msg.timestamp}
                </div>
              </div>
            </div>
          );
        })}

        {isLoading && (
          <div className="flex items-start gap-3">
            <div className="w-7 h-7 bg-green-500/10 border border-green-500/40 text-green-400 flex items-center justify-center shrink-0">
              <Bot className="w-3.5 h-3.5" />
            </div>
            <div className="bg-[#121813] border border-white/10 p-3 text-xs text-green-400 flex items-center gap-2">
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              <span className="text-[11px] uppercase tracking-wider">Analyzing crop telemetry &amp; pathogen records...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Quick Questions */}
      {messages.length <= 2 && (
        <div className="px-4 py-2 bg-[#0F1410] border-t border-white/10 flex items-center gap-2 overflow-x-auto">
          <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-400 shrink-0 flex items-center gap-1">
            <Lightbulb className="w-3 h-3 text-yellow-400" /> Queries:
          </span>
          {SAMPLE_PROMPTS.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(prompt)}
              className="text-[10px] uppercase tracking-wider px-2.5 py-1 bg-[#121813] hover:bg-white/10 text-slate-300 border border-white/10 shrink-0 transition-colors"
            >
              {prompt}
            </button>
          ))}
        </div>
      )}

      {/* Input Area */}
      <div className="p-3 bg-[#0F1410] border-t border-white/10">
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
            placeholder="Ask Dr. Flora regarding curing, sprays, bio-controls or culinary safety..."
            className="flex-1 bg-[#151D16] border border-white/10 px-3.5 py-2 text-xs text-white focus:outline-none focus:border-green-500 transition-colors placeholder:text-slate-600 font-mono"
          />
          <button
            id="btn-send-chat"
            type="submit"
            disabled={!inputVal.trim() || isLoading}
            className="px-3 py-2 border border-green-500 bg-green-500 text-black font-bold text-xs uppercase tracking-wider hover:bg-green-400 disabled:opacity-40 transition-colors flex items-center gap-1"
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
      <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
        <div className="w-full max-w-2xl h-[600px] max-h-[90vh]">
          {containerContent}
        </div>
      </div>
    );
  }

  return <div className="h-[650px]">{containerContent}</div>;
};
