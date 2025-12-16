import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { modulesData } from '../data/modulesData';
import { useProgress } from '../context/ProgressContext';
import Terminal from '../components/Terminal';
import Visualizer from '../components/Visualizer';
import { ArrowLeft, CheckCircle, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const ModulePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { completeModule, currentLevel } = useProgress();
  
  const moduleId = parseInt(id || '1', 10);
  const module = modulesData.find(m => m.id === moduleId);

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [terminalHistory, setTerminalHistory] = useState<{ type: 'input' | 'output'; content: string }[]>([]);
  const [isStepCompleted, setIsStepCompleted] = useState(false);
  const instructionsEndRef = useRef<HTMLDivElement>(null);

  // Reset state when module changes
  useEffect(() => {
    setCurrentStepIndex(0);
    setTerminalHistory([]);
    setIsStepCompleted(false);
  }, [moduleId]);

  // Auto-scroll instructions
  useEffect(() => {
    if (instructionsEndRef.current) {
      instructionsEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [currentStepIndex]);

  if (!module) return <div>Módulo não encontrado</div>;

  const currentStep = module.steps[currentStepIndex];
  const isLastStep = currentStepIndex === module.steps.length - 1;

  const handleCommand = (cmd: string) => {
    const cleanCmd = cmd.trim().replace(/\s+/g, ' ');
    const expectedCmd = currentStep.command.trim().replace(/\s+/g, ' ');

    setTerminalHistory(prev => [...prev, { type: 'input', content: cmd }]);

    if (cleanCmd === expectedCmd) {
      setTerminalHistory(prev => [...prev, { type: 'output', content: currentStep.successMessage }]);
      setIsStepCompleted(true);

      // Auto advance after a short delay
      setTimeout(() => {
        if (isLastStep) {
          completeModule(moduleId);
          navigate('/');
        } else {
          setCurrentStepIndex(prev => prev + 1);
          setIsStepCompleted(false);
        }
      }, 2000);

    } else {
      setTerminalHistory(prev => [...prev, { type: 'output', content: `Comando incorreto. Tente: ${currentStep.command}` }]);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-git-dark text-white overflow-hidden">
      {/* Header */}
      <header className="h-16 bg-gray-900 border-b border-gray-800 flex items-center px-6 justify-between">
        <div className="flex items-center">
          <button onClick={() => navigate('/')} className="mr-4 p-2 hover:bg-gray-800 rounded-full transition-colors">
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="font-bold text-lg">{module.title}</h1>
            <div className="text-xs text-gray-400 flex items-center">
              Passo {currentStepIndex + 1} de {module.steps.length}
              <div className="ml-4 h-1 w-24 bg-gray-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-git-orange transition-all duration-500"
                  style={{ width: `${((currentStepIndex) / module.steps.length) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Left Panel: Instruction (30%) */}
        <div className="w-[30%] bg-gray-900/50 border-r border-gray-800 p-8 flex flex-col overflow-y-auto">
          <div className="flex-1 space-y-12">
            {module.steps.slice(0, currentStepIndex + 1).map((step, index) => {
              const isActive = index === currentStepIndex;
              return (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: isActive ? 1 : 0.5, y: 0 }}
                  className={`transition-opacity duration-500 ${isActive ? '' : 'filter grayscale'}`}
                >
                  <h2 className={`text-2xl font-bold mb-4 ${isActive ? 'text-git-orange' : 'text-gray-500'}`}>
                    {step.command}
                  </h2>
                  <div className="prose prose-invert prose-sm">
                    <p className="text-gray-300 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                  
                  {isActive && (
                    <div className="mt-6 p-4 bg-gray-800 rounded-lg border border-gray-700 animate-pulse">
                      <h3 className="text-xs font-bold uppercase text-gray-500 mb-2">Missão</h3>
                      <p className="text-sm">
                        Digite <code className="bg-black px-2 py-1 rounded text-green-400 font-mono">{step.command}</code> no terminal.
                      </p>
                    </div>
                  )}
                </motion.div>
              );
            })}
            <div ref={instructionsEndRef} />
          </div>
        </div>

        {/* Right Panel: Practice Area (70%) */}
        <div className="w-[70%] flex flex-col">
          {/* Top: Visualizer */}
          <div className="flex-1 bg-gray-900 relative border-b border-gray-800">
            <Visualizer moduleId={moduleId} stepIndex={currentStepIndex} isCompleted={isStepCompleted} />
          </div>

          {/* Bottom: Terminal */}
          <div className="h-[40%] min-h-[250px]">
            <Terminal 
              onCommand={handleCommand} 
              history={terminalHistory}
              currentStepCommand={currentStep.command}
            />
          </div>
        </div>

      </div>
    </div>
  );
};

export default ModulePage;
