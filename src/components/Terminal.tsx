import React, { useState, useEffect, useRef } from 'react';
import { Terminal as TerminalIcon } from 'lucide-react';

interface TerminalProps {
  onCommand: (command: string) => void;
  history: { type: 'input' | 'output'; content: string }[];
  currentStepCommand: string;
}

const Terminal: React.FC<TerminalProps> = ({ onCommand, history, currentStepCommand }) => {
  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    onCommand(input);
    setInput('');
  };

  return (
    <div className="flex flex-col h-full bg-git-dark border-t border-gray-700 font-mono text-sm">
      <div className="flex items-center px-4 py-2 bg-gray-800 border-b border-gray-700 text-gray-400">
        <TerminalIcon size={14} className="mr-2" />
        <span>Terminal</span>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-2 text-gray-300">
        {history.map((entry, i) => (
          <div key={i} className={`${entry.type === 'input' ? 'text-white' : 'text-gray-400'}`}>
            {entry.type === 'input' ? (
              <span className="flex">
                <span className="text-green-500 mr-2">$</span>
                {entry.content}
              </span>
            ) : (
              <div className="ml-4">{entry.content}</div>
            )}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <form onSubmit={handleSubmit} className="p-2 bg-gray-900 flex items-center">
        <span className="text-green-500 mr-2">$</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 bg-transparent border-none outline-none text-white placeholder-gray-600"
          placeholder={`Digite '${currentStepCommand}'...`}
          autoFocus
        />
      </form>
    </div>
  );
};

export default Terminal;
