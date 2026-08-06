import React, { useState } from 'react';
import { Send, Sparkles, Bot } from 'lucide-react';
import PageHeader from '../../components/ui/PageHeader';
import Card from '../../components/ui/Card';

const initialMessages = [
  { role: 'assistant', text: "Hi! I'm your AI teaching assistant. Ask me to draft lesson plans, summarize student performance, or suggest interventions." },
];

const AITeachingAssistant = () => {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = { role: 'user', text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    // Placeholder response; wire this to POST /ai/teaching-assistant on your backend.
    setTimeout(() => {
      setMessages((prev) => [...prev, { role: 'assistant', text: 'This is a demo response. Connect this panel to your backend\'s AI endpoint to get real answers.' }]);
    }, 700);
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <PageHeader title="AI Teaching Assistant" description="Your co-pilot for lesson planning and student insights." />
      <Card noPadding className="flex flex-col h-[560px]">
        <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
          {messages.map((m, i) => (
            <div key={i} className={`flex gap-3 ${m.role === 'user' ? 'justify-end' : ''}`}>
              {m.role === 'assistant' && <div className="w-8 h-8 rounded-xl bg-[#284A50] text-white flex items-center justify-center shrink-0"><Bot size={16} /></div>}
              <div className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm font-medium ${m.role === 'user' ? 'bg-[#284A50] text-white' : 'bg-slate-100 text-slate-700'}`}>{m.text}</div>
            </div>
          ))}
        </div>
        <div className="p-4 border-t border-slate-100 flex gap-3">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask the AI assistant..."
            className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-semibold outline-none focus:ring-2 focus:ring-[#284A50]/50"
          />
          <button onClick={handleSend} className="p-2.5 rounded-xl bg-[#284A50] text-white"><Send size={18} /></button>
        </div>
      </Card>
    </div>
  );
};

export default AITeachingAssistant;
