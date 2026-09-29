import React, { useState, useRef, useEffect } from 'react';
import { useCyber } from '../context/CyberContext';
import { askMirrorAI, N8N_CHATBOT_WEBHOOK_URL } from '../services/aiService';
import { ChatMessage, PageView } from '../types/cyber';
import { 
  Bot, 
  Send, 
  Sparkles, 
  ShieldCheck, 
  AlertTriangle, 
  Terminal, 
  ArrowRight, 
  RotateCcw, 
  Languages, 
  Search, 
  Copy, 
  Check, 
  HelpCircle,
  Lock,
  Workflow,
  ExternalLink
} from 'lucide-react';

export const MirrorAI: React.FC = () => {
  const { navigateTo } = useCyber();
  const [useN8nWorkflow, setUseN8nWorkflow] = useState(true);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: `Hello! I am **MirrorAI**, your dedicated defensive cybersecurity advisor.\n\nNow equipped with your **n8n Chatbot Workflow** integration:\n\`${N8N_CHATBOT_WEBHOOK_URL}\`\n\nI can help you evaluate suspicious messages, explain cyber threats, understand how attacks unfold, and harden your accounts against unauthorized access.\n\n*Note: I also speak fluent Telugu / Telenglish! (ఉదా: "Phishing ante enti?", "Instagram ela secure cheyyali?")*`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      suggestedPrompts: [
        'Is this phishing?',
        'Explain ransomware in simple terms',
        'How do I secure my Instagram account?',
        'Why is MFA important even with strong passwords?',
        'Phishing ante enti? (Telugu)'
      ]
    }
  ]);

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [phishingModalOpen, setPhishingModalOpen] = useState(false);
  const [suspiciousText, setSuspiciousText] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query || isLoading) return;

    const userMsg: ChatMessage = {
      id: 'u-' + Date.now(),
      role: 'user',
      content: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const result = await askMirrorAI(query, useN8nWorkflow);
      const assistantMsg: ChatMessage = {
        id: 'a-' + Date.now(),
        role: 'assistant',
        content: result.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestedPrompts: [
          'How do I set up a password manager?',
          'What happens if I lose my 2FA phone?',
          'How to identify fake SMS delivery messages?'
        ]
      };
      setMessages(prev => [...prev, assistantMsg]);
    } catch {
      const fallbackMsg: ChatMessage = {
        id: 'err-' + Date.now(),
        role: 'assistant',
        content: 'I encountered an unexpected glitch processing that request. Please remember to never transmit actual passwords, OTPs, or private API keys.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleAnalyzePhishing = () => {
    if (!suspiciousText.trim()) return;
    const prompt = `Please evaluate if this message looks like phishing:\n\n"""\n${suspiciousText}\n"""\n\nAnalyze the red flags and tell me what defensive steps to take.`;
    setPhishingModalOpen(false);
    setSuspiciousText('');
    handleSend(prompt);
  };

  return (
    <div className="min-h-screen cyber-grid py-10 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-6">
      
      {/* Header and Guardrail Guarantee */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-cyan-950/70 border border-cyan-500/30 text-xs font-mono text-cyan-300 uppercase mb-2">
              <Bot className="w-3.5 h-3.5 text-cyan-400" />
              <span>DEFENSIVE AI ASSISTANT · SOC-COCKPIT</span>
            </div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
              MirrorAI
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 font-normal">
                English & Telugu Ready
              </span>
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setUseN8nWorkflow(!useN8nWorkflow)}
              className={`px-3 py-1.5 rounded-lg border text-xs font-mono flex items-center gap-1.5 transition-all ${
                useN8nWorkflow 
                  ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-300 shadow-sm shadow-emerald-500/20' 
                  : 'bg-slate-900 border-slate-700 text-slate-400 hover:text-slate-200'
              }`}
              title="Toggle n8n Webhook Chatbot workflow"
            >
              <Workflow className="w-3.5 h-3.5 text-emerald-400" />
              <span>n8n Workflow: {useN8nWorkflow ? 'Connected (Active)' : 'Local Engine'}</span>
            </button>

            <button
              onClick={() => setPhishingModalOpen(true)}
              className="px-3 py-1.5 rounded-lg bg-cyan-500/15 border border-cyan-500/40 text-cyan-300 hover:bg-cyan-500/25 text-xs font-mono flex items-center gap-1.5 transition-colors"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Analyze Suspicious Message</span>
            </button>

            <button
              onClick={() => setMessages([messages[0]])}
              className="p-1.5 rounded-lg border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              title="Clear Chat"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* n8n Webhook Notice Banner */}
        <div className="p-3 rounded-xl bg-gradient-to-r from-slate-900 via-cyan-950/30 to-slate-900 border border-cyan-500/30 text-xs text-slate-300 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Workflow className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>
              <strong>n8n Webhook:</strong> <code className="text-cyan-300 font-mono text-[11px] bg-slate-950 px-1.5 py-0.5 rounded border border-slate-800 break-all">{N8N_CHATBOT_WEBHOOK_URL}</code>
            </span>
          </div>
          <span className="text-[11px] text-emerald-300 flex items-center gap-1 shrink-0 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Live Cloud Webhook
          </span>
        </div>

        {/* Safety Disclaimer Banner */}
        <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-400 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>
              <strong>Defensive Guardrail Active:</strong> Never submit real passwords, OTPs, PINs, or financial secrets. MirrorAI will never provide malicious exploit tools or attack scripts.
            </span>
          </div>
        </div>
      </div>

      {/* Main Chat Window */}
      <div className="glass-panel rounded-2xl border border-cyan-500/25 flex flex-col h-[600px] overflow-hidden shadow-2xl">
        
        {/* Chat Messages Scroll Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
          {messages.map((msg) => {
            const isUser = msg.role === 'user';
            return (
              <div
                key={msg.id}
                className={`flex gap-3 max-w-[88%] ${isUser ? 'ml-auto flex-row-reverse' : 'mr-auto'}`}
              >
                {/* Avatar */}
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border text-xs font-mono ${
                  isUser 
                    ? 'bg-cyan-500 text-slate-950 border-cyan-400 font-bold' 
                    : 'bg-slate-900 text-cyan-400 border-cyan-500/30'
                }`}>
                  {isUser ? 'YOU' : <Bot className="w-4 h-4" />}
                </div>

                {/* Message Bubble */}
                <div className="space-y-2">
                  <div className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed border ${
                    isUser
                      ? 'bg-cyan-600 text-white border-cyan-400 rounded-tr-none'
                      : 'bg-slate-900/85 text-slate-200 border-slate-800 rounded-tl-none'
                  }`}>
                    {/* Render message with line breaks and markdown boldness */}
                    <div className="whitespace-pre-line space-y-1">
                      {msg.content}
                    </div>

                    <div className="flex items-center justify-between pt-2 mt-2 border-t border-slate-800/60 text-[10px] text-slate-400 font-mono">
                      <span>{msg.timestamp}</span>
                      {!isUser && (
                        <button
                          onClick={() => handleCopy(msg.id, msg.content)}
                          className="hover:text-white flex items-center gap-1 transition-colors"
                        >
                          {copiedId === msg.id ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-400" />
                              <span className="text-emerald-400">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>Copy</span>
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Suggested Prompts if any */}
                  {msg.suggestedPrompts && msg.suggestedPrompts.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {msg.suggestedPrompts.map((prompt, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSend(prompt)}
                          className="px-2.5 py-1 rounded-md bg-slate-900/60 hover:bg-cyan-950/70 border border-slate-800 hover:border-cyan-500/40 text-[11px] text-slate-300 hover:text-cyan-300 transition-colors"
                        >
                          {prompt}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {/* Loading indicator */}
          {isLoading && (
            <div className="flex gap-3 max-w-[85%] mr-auto items-center">
              <div className="w-8 h-8 rounded-lg bg-slate-900 text-cyan-400 border border-cyan-500/30 flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4 animate-spin" />
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs text-cyan-300 font-mono flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                <span>MirrorAI analyzing defensive context...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-4 border-t border-slate-800 bg-[#070c18] space-y-2">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Ask about phishing, ransomware, passkeys, Telugu queries, or defensive practices..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 px-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
            />

            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="px-4 py-2.5 rounded-xl bg-cyan-500 text-slate-950 hover:bg-cyan-400 disabled:opacity-40 disabled:cursor-not-allowed font-semibold text-xs transition-colors flex items-center gap-1.5 shrink-0"
            >
              <span>Send</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>

          <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono px-1">
            <span>LLM / Defensive Knowledge Base Hybrid</span>
            <span>Refuses malware generation & credential requests</span>
          </div>
        </div>
      </div>

      {/* Phishing Analyzer Tool Modal */}
      {phishingModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="relative w-full max-w-lg rounded-2xl bg-[#090f1d] border border-cyan-500/40 p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2 text-cyan-300 font-bold text-sm">
                <Search className="w-4 h-4 text-cyan-400" />
                <span>Suspicious Message & Phishing Inspector</span>
              </div>
              <button
                onClick={() => setPhishingModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-300">
              Paste the text or sender info of an email, SMS, or DM you received. MirrorAI will scan for psychological urgency triggers, lookalike domains, and deception techniques.
            </p>

            <textarea
              rows={5}
              placeholder="e.g. 'URGENT: Your Netflix account is suspended. Update payment within 12 hours at netflix-verify-account.info or your files will be deleted.'"
              value={suspiciousText}
              onChange={(e) => setSuspiciousText(e.target.value)}
              className="w-full p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-mono"
            />

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setPhishingModalOpen(false)}
                className="px-4 py-2 rounded-lg border border-slate-700 text-xs text-slate-300 hover:bg-slate-800"
              >
                Cancel
              </button>
              <button
                onClick={handleAnalyzePhishing}
                disabled={!suspiciousText.trim()}
                className="px-4 py-2 rounded-lg bg-cyan-500 text-slate-950 hover:bg-cyan-400 text-xs font-bold disabled:opacity-40"
              >
                Analyze with MirrorAI
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
