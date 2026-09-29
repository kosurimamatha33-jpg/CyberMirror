import React, { useState, useRef, useEffect } from 'react';
import { askN8nChatbot, N8N_CHATBOT_WEBHOOK_URL } from '../services/aiService';
import { 
  Bot, 
  Send, 
  Sparkles, 
  X, 
  Minimize2, 
  Maximize2, 
  RotateCcw, 
  ExternalLink, 
  ShieldCheck, 
  AlertCircle,
  HelpCircle,
  Copy,
  Check
} from 'lucide-react';

interface WidgetMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  source?: 'n8n' | 'cybermirror-engine' | 'gemini';
  isWorkflowInactive?: boolean;
}

export const N8nChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showWebhookInfo, setShowWebhookInfo] = useState(false);

  const [messages, setMessages] = useState<WidgetMessage[]>([
    {
      id: 'init-1',
      role: 'assistant',
      content: `👋 Hello! I am your **n8n Cyber Assistant**.\n\nI am connected to your n8n cloud workflow:\n\`${N8N_CHATBOT_WEBHOOK_URL}\`\n\nAsk me about cybersecurity defenses, suspicious links, credential security, or emergency steps! (Telugu queries supported!)`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      source: 'n8n'
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isLoading]);

  const handleSend = async (customPrompt?: string) => {
    const text = (customPrompt || input).trim();
    if (!text || isLoading) return;

    const userMsg: WidgetMessage = {
      id: 'u-' + Date.now(),
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await askN8nChatbot(text);
      const assistantMsg: WidgetMessage = {
        id: 'a-' + Date.now(),
        role: 'assistant',
        content: response.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        source: response.source,
        isWorkflowInactive: response.isWorkflowInactive
      };
      setMessages(prev => [...prev, assistantMsg]);
    } catch {
      const errorMsg: WidgetMessage = {
        id: 'err-' + Date.now(),
        role: 'assistant',
        content: '⚠️ Unable to complete request. Please verify your connection or n8n workflow.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        source: 'cybermirror-engine'
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleClear = () => {
    setMessages([
      {
        id: 'init-reset',
        role: 'assistant',
        content: 'Conversation cleared. How can I assist your digital defenses today?',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        source: 'n8n'
      }
    ]);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {/* Floating Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white rounded-full shadow-2xl shadow-cyan-900/50 hover:shadow-cyan-500/50 border border-cyan-400/40 transition-all duration-300 transform hover:scale-105"
          title="Chat with n8n AI Assistant"
          aria-label="Open n8n Cyber Chatbot"
        >
          <div className="relative">
            <Bot className="w-6 h-6 text-white group-hover:rotate-12 transition-transform" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full animate-ping" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full" />
          </div>
          <div className="text-left hidden sm:block">
            <div className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 text-cyan-200">
              <span>n8n Chatbot</span>
              <span className="px-1.5 py-0.2 bg-emerald-500/30 text-emerald-300 text-[10px] rounded-full font-mono">Live</span>
            </div>
            <div className="text-[11px] text-slate-200 font-medium">Cyber AI Advisor</div>
          </div>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div 
          className={`flex flex-col bg-[#0b1120]/95 backdrop-blur-xl border border-cyan-500/30 rounded-2xl shadow-2xl shadow-black/80 transition-all duration-300 overflow-hidden ${
            isExpanded 
              ? 'w-[92vw] sm:w-[680px] h-[82vh] max-h-[800px]' 
              : 'w-[92vw] sm:w-[410px] h-[580px] max-h-[85vh]'
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3.5 bg-gradient-to-r from-slate-900 via-[#0e172a] to-slate-900 border-b border-cyan-500/20">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-md shadow-cyan-500/30">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-sm text-slate-100">n8n Cyber Advisor</span>
                  <span className="flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-mono border border-emerald-500/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Webhook
                  </span>
                </div>
                <div className="text-[11px] text-slate-400 truncate max-w-[210px] sm:max-w-[260px]">
                  mamathavalli.app.n8n.cloud
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setShowWebhookInfo(!showWebhookInfo)}
                className="p-1.5 text-slate-400 hover:text-cyan-300 hover:bg-slate-800 rounded-lg transition-colors"
                title="Webhook connection info"
              >
                <HelpCircle className="w-4 h-4" />
              </button>
              <button
                onClick={handleClear}
                className="p-1.5 text-slate-400 hover:text-cyan-300 hover:bg-slate-800 rounded-lg transition-colors"
                title="Clear chat"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-1.5 text-slate-400 hover:text-cyan-300 hover:bg-slate-800 rounded-lg transition-colors hidden sm:block"
                title={isExpanded ? 'Collapse' : 'Expand'}
              >
                {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-lg transition-colors"
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Webhook Info Banner (Collapsible) */}
          {showWebhookInfo && (
            <div className="px-4 py-2.5 bg-cyan-950/40 border-b border-cyan-500/20 text-xs text-cyan-200 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
              <div className="flex-1 space-y-1">
                <p className="font-semibold text-cyan-300">Connected Endpoint:</p>
                <p className="font-mono text-[10px] text-slate-300 break-all bg-slate-900/80 p-1 rounded border border-slate-700">
                  {N8N_CHATBOT_WEBHOOK_URL}
                </p>
                <p className="text-[11px] text-slate-300">
                  Ensure the workflow in your <strong>n8n Cloud Canvas</strong> is switched to <strong>Active</strong>. If inactive, CyberMirror automatically answers with defensive insights.
                </p>
              </div>
            </div>
          )}

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent">
            {messages.map(msg => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[88%] rounded-2xl p-3 text-xs leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-tr-none shadow-md shadow-cyan-900/30'
                      : 'bg-slate-900/90 text-slate-200 border border-slate-800 rounded-tl-none shadow-md'
                  }`}
                >
                  <div className="whitespace-pre-wrap font-sans">
                    {msg.content}
                  </div>

                  {msg.role === 'assistant' && (
                    <div className="mt-2.5 pt-2 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-400">
                      <div className="flex items-center gap-1.5">
                        <span className="px-1.5 py-0.2 rounded bg-slate-800 text-cyan-300 font-mono text-[9px]">
                          {msg.source === 'n8n' ? 'n8n cloud' : 'cybermirror'}
                        </span>
                        <span>{msg.timestamp}</span>
                      </div>
                      <button
                        onClick={() => handleCopy(msg.id, msg.content)}
                        className="hover:text-cyan-300 flex items-center gap-1 transition-colors"
                        title="Copy message"
                      >
                        {copiedId === msg.id ? (
                          <Check className="w-3 h-3 text-emerald-400" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                        <span>{copiedId === msg.id ? 'Copied' : 'Copy'}</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex items-center gap-2 p-3 bg-slate-900/80 rounded-2xl rounded-tl-none border border-cyan-500/20 w-fit text-xs text-cyan-300">
                <Sparkles className="w-3.5 h-3.5 animate-spin text-cyan-400" />
                <span>Contacting n8n AI engine...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts */}
          <div className="px-3 py-2 bg-slate-950/60 border-t border-slate-800/80 flex gap-1.5 overflow-x-auto no-scrollbar">
            <button
              onClick={() => handleSend('Is this link suspicious?')}
              className="px-2.5 py-1 text-[11px] whitespace-nowrap bg-slate-900 hover:bg-cyan-950/60 text-slate-300 hover:text-cyan-300 rounded-lg border border-slate-800 hover:border-cyan-500/40 transition-colors"
            >
              🔍 Check link
            </button>
            <button
              onClick={() => handleSend('How do I set up Passkeys?')}
              className="px-2.5 py-1 text-[11px] whitespace-nowrap bg-slate-900 hover:bg-cyan-950/60 text-slate-300 hover:text-cyan-300 rounded-lg border border-slate-800 hover:border-cyan-500/40 transition-colors"
            >
              🔑 Setup Passkeys
            </button>
            <button
              onClick={() => handleSend('Phishing ante enti? (Telugu)')}
              className="px-2.5 py-1 text-[11px] whitespace-nowrap bg-slate-900 hover:bg-cyan-950/60 text-slate-300 hover:text-cyan-300 rounded-lg border border-slate-800 hover:border-cyan-500/40 transition-colors"
            >
              🇮🇳 Telugu Tips
            </button>
            <button
              onClick={() => handleSend('What should I do if my phone is lost?')}
              className="px-2.5 py-1 text-[11px] whitespace-nowrap bg-slate-900 hover:bg-cyan-950/60 text-slate-300 hover:text-cyan-300 rounded-lg border border-slate-800 hover:border-cyan-500/40 transition-colors"
            >
              📱 Lost Phone
            </button>
          </div>

          {/* Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-slate-950 border-t border-slate-800 flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask n8n Cyberbot... (e.g. 'How to spot phishing?')"
              className="flex-1 bg-slate-900/90 text-slate-100 placeholder-slate-500 text-xs px-3.5 py-2.5 rounded-xl border border-slate-800 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="p-2.5 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 disabled:opacity-40 disabled:hover:from-cyan-600 text-white rounded-xl transition-all shadow-md shadow-cyan-900/30"
              title="Send to n8n"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
