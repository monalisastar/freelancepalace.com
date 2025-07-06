'use client';

import { useState } from 'react';
import type { ReactNode } from 'react';
import {
  Bot,
  Sparkles,
  X,
  Code2,
  Leaf,
  FileText,
  Loader2,
} from 'lucide-react';
import { Rnd } from 'react-rnd';
import { motion } from 'framer-motion';

interface Persona {
  name: string;
  icon: ReactNode;
  intro: string;
  replyStyle: (input: string) => string;
}

const personas: Persona[] = [
  {
    name: 'Tech Bot',
    icon: <Code2 size={16} />,
    intro: "👨‍💻 I'm Tech Bot — ask me anything code-related.",
    replyStyle: (input) =>
      `Let's break down "${input}":\n\nUse proper hooks, error handling, and async flow.`,
  },
  {
    name: 'Carbon Coach',
    icon: <Leaf size={16} />,
    intro: '🌿 I’m your Carbon Coach — ask about GHG, credits, or net-zero.',
    replyStyle: (input) =>
      `To approach "${input}", look at ISO 14064 and use project-based methodologies.`,
  },
  {
    name: 'Pitch Pro',
    icon: <FileText size={16} />,
    intro: '💼 I write powerful short pitches and summaries.',
    replyStyle: (input) =>
      `Here’s a pitch:\n\n“I specialize in ${input}. Expect speed, clarity, and aligned outcomes.”`,
  },
];

export default function FLRAssistant() {
  const [visible, setVisible] = useState(false);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [persona, setPersona] = useState<Persona>(personas[0]);

  const handleAsk = () => {
    if (!input.trim()) return;
    setHistory((prev) => [...prev, `🧍 You: ${input}`]);
    setLoading(true);

    setTimeout(() => {
      const reply = persona.replyStyle(input);
      setHistory((prev) => [...prev, `🤖 ${persona.name}: ${reply}`]);
      setInput('');
      setLoading(false);
    }, 1000);
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setVisible(true)}
        className="fixed bottom-4 right-4 z-50 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg"
      >
        <Bot />
      </button>

      {/* Assistant Panel */}
      {visible && (
        <Rnd
          default={{
            x: window.innerWidth - 400,
            y: window.innerHeight - 500,
            width: 350,
            height: 460,
          }}
          minWidth={300}
          minHeight={400}
          bounds="window"
          dragHandleClassName="handle"
          className="z-50 fixed"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full h-full bg-white/10 dark:bg-white/5 backdrop-blur-xl border border-white/10 p-4 rounded-xl text-white shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="handle flex justify-between items-center mb-3 cursor-move">
              <div className="flex items-center gap-2">
                <Sparkles className="text-blue-400" />
                <h2 className="font-bold text-white text-lg">FLR Assistant</h2>
              </div>
              <button onClick={() => setVisible(false)} className="text-white hover:text-red-400">
                <X size={20} />
              </button>
            </div>

            {/* Personas */}
            <div className="flex items-center gap-2 mb-3 text-xs overflow-x-auto">
              {personas.map((p) => (
                <button
                  key={p.name}
                  onClick={() => setPersona(p)}
                  className={`px-2 py-1 rounded-full border ${
                    persona.name === p.name
                      ? 'bg-blue-600 text-white'
                      : 'bg-white/10 hover:bg-white/20 text-white'
                  }`}
                >
                  {p.icon} {p.name}
                </button>
              ))}
            </div>

            <p className="text-xs text-gray-300 mb-2">{persona.intro}</p>

            {/* History */}
            <div className="flex-1 overflow-y-auto mb-2 space-y-2 text-sm pr-1">
              {history.map((line, i) => (
                <div
                  key={i}
                  className={`p-2 rounded-md whitespace-pre-line ${
                    line.startsWith('🧍')
                      ? 'bg-white/5 text-white'
                      : 'bg-blue-800/20 text-blue-100'
                  }`}
                >
                  {line}
                </div>
              ))}
            </div>

            {/* Input */}
            <textarea
              rows={2}
              className="w-full bg-black/30 border border-white/10 text-sm rounded-md p-2 placeholder:text-gray-400 resize-none"
              placeholder="Ask something..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />

            <button
              onClick={handleAsk}
              disabled={loading}
              className="mt-2 w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 rounded-md"
            >
              {loading ? (
                <span className="flex items-center gap-1 justify-center">
                  <Loader2 size={16} className="animate-spin" />
                  Thinking...
                </span>
              ) : (
                'Ask'
              )}
            </button>
          </motion.div>
        </Rnd>
      )}
    </>
  );
}

