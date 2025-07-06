'use client';

import { useState, useEffect } from 'react';
import {
  Sparkles,
  FileText,
  Search,
  BarChart2,
  TerminalSquare,
  Lock,
  Clock,
  Brain,
} from 'lucide-react';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export default function AIChatAssistant() {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('aiSuggestions');
    const savedChat = localStorage.getItem('aiHistory');
    if (saved) setSuggestions(JSON.parse(saved));
    if (savedChat) setHistory(JSON.parse(savedChat));
  }, []);

  useEffect(() => {
    localStorage.setItem('aiHistory', JSON.stringify(history));
  }, [history]);

  const getMockResponse = (prompt: string): string => {
    const lower = prompt.toLowerCase();
    if (lower.includes('pitch'))
      return `Sure! Here's a quick pitch:\n\n"Hi, I'm a certified freelancer offering expert solutions in ${prompt.split(' ').slice(-3).join(' ')}. I ensure clear deliverables, timely delivery, and measurable outcomes."`;

    if (lower.includes('summarize'))
      return `Here’s a summary:\n- Extract key info\n- Simplify structure\n- Deliver insight in < 150 words.`;

    if (lower.includes('contract'))
      return `A contract clause usually defines terms, rights, and breach conditions. Need help drafting one?`;

    return `Interesting prompt! Here's what I might say:\n\n"${prompt.charAt(0).toUpperCase() + prompt.slice(1)}" is a great starting point. Let’s build on it with clear goals and an actionable outcome.`;
  };

  const handleAskAI = async () => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = {
      role: 'user',
      content: input,
      timestamp: new Date().toLocaleTimeString(),
    };

    setHistory((prev) => [...prev, userMessage]);
    setSuggestions((prev) => [...new Set([input, ...prev].slice(0, 5))]);
    localStorage.setItem('aiSuggestions', JSON.stringify(suggestions));
    setLoading(true);
    setInput('');

    // Simulate typing delay
    setTimeout(() => {
      const mockReply = getMockResponse(userMessage.content);
      const aiMessage: ChatMessage = {
        role: 'assistant',
        content: mockReply,
        timestamp: new Date().toLocaleTimeString(),
      };
      setHistory((prev) => [...prev, aiMessage]);
      setLoading(false);
    }, 1300);
  };

  return (
    <div className="rounded-xl p-6 bg-white/10 dark:bg-white/5 backdrop-blur-md border border-white/10 shadow-lg text-white transition">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Sparkles className="text-blue-400" />
          <h2 className="text-lg font-bold tracking-tight">AI Command Panel</h2>
        </div>
        <span className="bg-blue-600 px-2 py-1 text-xs rounded-full">Mock</span>
      </div>

      <div className="grid sm:grid-cols-2 gap-3 text-sm text-gray-300 mb-4">
        <div className="flex items-center gap-2"><FileText size={16} /> Draft replies</div>
        <div className="flex items-center gap-2"><Search size={16} /> Analyze job posts</div>
        <div className="flex items-center gap-2"><BarChart2 size={16} /> Market insights</div>
        <div className="flex items-center gap-2"><TerminalSquare size={16} /> Debug + code help</div>
        <div className="flex items-center gap-2"><Lock size={16} /> Private prompts (soon)</div>
      </div>

      {suggestions.length > 0 && (
        <div className="mb-4">
          <div className="flex items-center gap-2 text-sm text-blue-300 font-medium mb-1">
            <Brain size={16} /> Saved Ideas
          </div>
          <div className="flex flex-wrap gap-2">
            {suggestions.map((s, i) => (
              <button
                key={i}
                onClick={() => setInput(s)}
                className="text-xs px-3 py-1 bg-white/10 hover:bg-white/20 rounded border border-white/10"
              >
                {s.length > 30 ? s.slice(0, 28) + '...' : s}
              </button>
            ))}
          </div>
        </div>
      )}

      <textarea
        rows={3}
        className="w-full bg-black/30 border border-white/10 text-sm rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400"
        placeholder="e.g. Write a pitch, summarize a job post, explain a contract clause..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <button
        onClick={handleAskAI}
        disabled={loading}
        className="mt-3 w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 rounded-md transition"
      >
        {loading ? 'Thinking...' : 'Ask AI'}
      </button>

      {history.length > 0 && (
        <div className="mt-6">
          <h3 className="text-sm font-medium text-blue-200 mb-2 flex items-center gap-1">
            <Clock size={14} /> Chat History
          </h3>
          <div className="space-y-4 text-sm">
            {history.map((msg, i) => (
              <div
                key={i}
                className={`p-3 rounded-md border border-white/10 ${
                  msg.role === 'user'
                    ? 'bg-white/10 text-white'
                    : 'bg-blue-800/20 text-blue-100'
                }`}
              >
                <div className="text-xs text-gray-400 mb-1">
                  {msg.role === 'user' ? 'You' : 'AI'} · {msg.timestamp}
                </div>
                <div className="whitespace-pre-wrap">{msg.content}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}


