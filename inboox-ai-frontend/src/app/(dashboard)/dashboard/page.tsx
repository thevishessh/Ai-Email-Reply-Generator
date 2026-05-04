"use client";

import { useState, useEffect, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  Copy,
  RefreshCw,
  Sparkles,
  MessageSquareQuote,
  Zap,
  Check
} from "lucide-react";
import { cn } from "@/lib/utils";
import api from "@/lib/api";
import { useSearchParams } from "next/navigation";

const tones = [
  { id: "professional", label: "Professional", icon: "💼" },
  { id: "friendly", label: "Friendly", icon: "😊" },
  { id: "urgent", label: "Urgent", icon: "🚀" },
  { id: "concise", label: "Concise", icon: "✂️" },
];

// Define some sample template content for quick lookup if needed
const templateContents: Record<string, string> = {
  "1": "Hi [Stakeholder Name],\n\nI wanted to provide a quick update on Project [Project Name]. We have successfully completed [Milestone] and are currently on track for [Next Deadline].\n\nKey achievements this week:\n- [Item 1]\n- [Item 2]\n\nPlease let me know if you have any questions.\n\nBest regards,\n[Your Name]",
  "2": "Hi [Name],\n\nI'd like to schedule a brief meeting to discuss [Topic]. Would you have 15-20 minutes available sometime this week?\n\nI'm free during these times:\n- [Time 1]\n- [Time 2]\n\nLooking forward to connecting.\n\nBest,\n[Your Name]",
  "3": "Hi [Name],\n\nGreat speaking with you earlier today! As discussed, here are the key takeaways from our call:\n\n1. [Point 1]\n2. [Point 2]\n\nNext steps:\n- [Action Item 1]\n- [Action Item 2]\n\nI'll follow up again by [Date].\n\nCheers,\n[Your Name]",
};

function DashboardContent() {
  const searchParams = useSearchParams();
  const [inputEmail, setInputEmail] = useState("");
  const [selectedTone, setSelectedTone] = useState("professional");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedReply, setGeneratedReply] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const [error, setError] = useState("");

  const [isSent, setIsSent] = useState(false);

  useEffect(() => {
    const templateId = searchParams.get("templateId");
    if (templateId && templateContents[templateId]) {
      setInputEmail(templateContents[templateId]);
    }
  }, [searchParams]);

  const handleGenerate = async () => {
    if (!inputEmail) return;

    setIsGenerating(true);
    setGeneratedReply("");
    setError("");
    setIsSent(false);

    try {
      const response = await api.post("/emails/generate", {
        emailContent: inputEmail,
        tone: selectedTone
      });
      setGeneratedReply(response.data);
    } catch (err: any) {
      setError("Failed to generate reply. Please ensure the backend is running and you are logged in.");
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedReply);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleSendDraft = () => {
    if (!generatedReply) return;

    // Copy to clipboard
    navigator.clipboard.writeText(generatedReply);

    // Open default email client with the content
    const mailtoUrl = `mailto:?body=${encodeURIComponent(generatedReply)}`;
    window.location.href = mailtoUrl;

    setIsSent(true);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
      setIsSent(false);
    }, 3000);
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-10">
        <h1 className="text-3xl font-bold mb-2">Effortless Mastery</h1>
        <p className="text-foreground/50">Drafting your perfect professional response in seconds.</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-6">
          <div className="bg-surface border border-border p-6 rounded-2xl">
            <div className="flex items-center space-x-2 mb-4 text-primary">
              <MessageSquareQuote className="w-5 h-5" />
              <h2 className="font-bold">Paste Incoming Email</h2>
            </div>
            <textarea
              value={inputEmail}
              onChange={(e) => setInputEmail(e.target.value)}
              placeholder="Paste the email you want to respond to here..."
              className="w-full h-64 bg-surface-light border border-border rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none font-sans text-sm leading-relaxed"
            />
          </div>

          <div className="bg-surface border border-border p-6 rounded-2xl">
            <h3 className="font-bold mb-4 text-sm uppercase tracking-wider text-foreground/40">Select Tone</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {tones.map((tone) => (
                <button
                  key={tone.id}
                  onClick={() => setSelectedTone(tone.id)}
                  className={cn(
                    "flex flex-col items-center justify-center p-3 rounded-xl border transition-all",
                    selectedTone === tone.id
                      ? "bg-primary/10 border-primary text-primary shadow-lg shadow-primary/10"
                      : "bg-surface-light border-border text-foreground/60 hover:border-primary/50"
                  )}
                >
                  <span className="text-2xl mb-1">{tone.icon}</span>
                  <span className="text-xs font-bold">{tone.label}</span>
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleGenerate}
            disabled={!inputEmail || isGenerating}
            className="w-full bg-ai-gradient text-white py-4 rounded-xl font-bold shadow-xl shadow-primary/20 flex items-center justify-center space-x-3 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:scale-100"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin" />
                <span>Generating Reply...</span>
              </>
            ) : (
              <>
                <Zap className="w-5 h-5 fill-current" />
                <span>Generate AI Reply</span>
              </>
            )}
          </button>

          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}
        </div>

        {/* Output Section */}
        <div className="relative">
          <AnimatePresence mode="wait">
            {!generatedReply && !isGenerating ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full border-2 border-dashed border-border rounded-2xl flex flex-col items-center justify-center p-8 text-center"
              >
                <div className="w-16 h-16 rounded-full bg-surface-light flex items-center justify-center mb-6">
                  <Sparkles className="w-8 h-8 text-foreground/20" />
                </div>
                <h3 className="font-bold text-lg mb-2">Ready when you are</h3>
                <p className="text-foreground/40 text-sm max-w-xs">
                  Configure the tone and hit generate to see the magic happen.
                </p>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-surface border border-primary/30 h-full rounded-2xl p-6 shadow-2xl shadow-primary/5 relative overflow-hidden"
              >
                <div className="flex items-center justify-between mb-6 border-b border-border pb-4">
                  <div className="flex items-center space-x-2 text-primary">
                    <Sparkles className="w-5 h-5" />
                    <span className="font-bold">AI Generated Response</span>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={handleCopy}
                      className="p-2 rounded-lg bg-surface-light hover:bg-border transition-colors text-foreground/60"
                      title="Copy to clipboard"
                    >
                      {isCopied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={handleGenerate}
                      className="p-2 rounded-lg bg-surface-light hover:bg-border transition-colors text-foreground/60"
                      title="Regenerate"
                    >
                      <RefreshCw className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="flex-1 min-h-[300px] flex flex-col">
                  {isGenerating ? (
                    <div className="space-y-4">
                      <div className="h-4 bg-surface-light rounded w-3/4 animate-pulse"></div>
                      <div className="h-4 bg-surface-light rounded w-full animate-pulse"></div>
                      <div className="h-4 bg-surface-light rounded w-5/6 animate-pulse"></div>
                      <div className="h-4 bg-surface-light rounded w-1/2 animate-pulse"></div>
                    </div>
                  ) : (
                    <textarea
                      value={generatedReply}
                      onChange={(e) => setGeneratedReply(e.target.value)}
                      className="w-full h-full min-h-[350px] bg-transparent border-none focus:outline-none text-foreground/90 font-sans leading-relaxed resize-none text-sm"
                      placeholder="AI will generate your reply here..."
                    />
                  )}
                </div>

                {!isGenerating && generatedReply && (
                  <div className="absolute bottom-6 right-6 z-50">
                    <button
                      onClick={handleSendDraft}
                      className={cn(
                        "px-6 py-2 rounded-lg text-sm font-bold flex items-center space-x-2 transition-all cursor-pointer",
                        isSent ? "bg-green-500 text-white" : "bg-primary text-white hover:bg-primary/90"
                      )}
                    >
                      {isSent ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>Draft Sent!</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Send Draft</span>
                        </>
                      )}
                    </button>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<div>Loading Dashboard...</div>}>
      <DashboardContent />
    </Suspense>
  );
}
