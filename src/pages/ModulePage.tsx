import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { modulesData } from "../data/modulesData";
import { useProgress } from "../context/ProgressContext";
import Terminal from "../components/Terminal";
import Visualizer from "../components/Visualizer";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ModulePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { completeModule } = useProgress();

  const moduleId = parseInt(id || "1", 10);
  const module = modulesData.find((m) => m.id === moduleId);

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [terminalHistory, setTerminalHistory] = useState<
    { type: "input" | "output"; content: string }[]
  >([]);
  const [isStepCompleted, setIsStepCompleted] = useState(false);
  const [isModuleFinished, setIsModuleFinished] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const instructionsEndRef = useRef<HTMLDivElement>(null);

  // Reset state when module changes
  useEffect(() => {
    setCurrentStepIndex(0);
    setTerminalHistory([]);
    setIsStepCompleted(false);
    setIsModuleFinished(false);
    setShowHint(false);
  }, [moduleId]);

  // Reset hint when step changes
  useEffect(() => {
    setShowHint(false);
  }, [currentStepIndex]);

  // Auto-scroll instructions
  useEffect(() => {
    if (instructionsEndRef.current) {
      instructionsEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [currentStepIndex]);

  if (!module) return <div>Módulo não encontrado</div>;

  const currentStep = module.steps[currentStepIndex];
  const isLastStep = currentStepIndex === module.steps.length - 1;

  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleCommand = (cmd: string) => {
    const cleanCmd = cmd.trim().replace(/\s+/g, " ");

    if (cleanCmd === "clear") {
      setTerminalHistory([]);
      return;
    }

    const expectedCmd = currentStep.command.trim().replace(/\s+/g, " ");

    setTerminalHistory((prev) => [...prev, { type: "input", content: cmd }]);

    let isCorrect = false;
    if (currentStep.command.startsWith("git clone")) {
      // Allow any git clone command with a valid-looking URL
      // Matches: git clone <protocol>://<something>
      isCorrect = /^git clone https?:\/\/.+/.test(cleanCmd);
    } else if (currentStep.command.startsWith("git commit")) {
      // Allow any commit message in quotes
      isCorrect = /^git commit -m ["'].+["']$/.test(cleanCmd);
    } else {
      isCorrect = cleanCmd === expectedCmd;
    }

    if (isCorrect) {
      setTerminalHistory((prev) => [
        ...prev,
        { type: "output", content: currentStep.successMessage },
      ]);
      setIsStepCompleted(true);

      // Start screen clearing animation after success
      setTimeout(() => {
        if (!isLastStep) {
          setIsTransitioning(true);

          // Advance step without clearing terminal
          setTimeout(() => {
            // setTerminalHistory([]); // Keep history for continuity
            setCurrentStepIndex((prev) => prev + 1);
            setIsStepCompleted(false);
            setIsTransitioning(false);
          }, 1500); // Animation duration
        } else {
          setTimeout(() => {
            completeModule(moduleId);
            setIsModuleFinished(true);
          }, 1000);
        }
      }, 1500);
    } else {
      setTerminalHistory((prev) => [
        ...prev,
        {
          type: "output",
          content: "Comando incorreto.",
        },
      ]);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-git-dark text-white overflow-hidden">
      {/* Header */}
      <header className="h-16 bg-gray-900 border-b border-gray-800 flex items-center px-6 justify-between">
        <div className="flex items-center">
          <button
            onClick={() => navigate("/")}
            className="mr-4 p-2 hover:bg-gray-800 rounded-full transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="font-bold text-lg">{module.title}</h1>
            <div className="text-xs text-gray-400 flex items-center">
              Passo {currentStepIndex + 1} de {module.steps.length}
              <div className="ml-4 h-1 w-24 bg-gray-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-git-orange transition-all duration-500"
                  style={{
                    width: `${
                      isModuleFinished
                        ? 100
                        : (currentStepIndex / module.steps.length) * 100
                    }%`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {isModuleFinished && (
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => navigate("/")}
            className="bg-git-orange hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-bold text-sm transition-colors shadow-lg shadow-orange-900/20 flex items-center"
          >
            Voltar ao Início
          </motion.button>
        )}
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
                  className={`transition-opacity duration-500 ${
                    isActive ? "" : "filter grayscale"
                  }`}
                >
                  <h2
                    className={`text-2xl font-bold mb-4 ${
                      isActive ? "text-git-orange" : "text-gray-500"
                    }`}
                  >
                    {step.title}
                  </h2>
                  <div className="prose prose-invert prose-sm">
                    <p className="text-gray-300 leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  {isActive && (
                    <div className="mt-6">
                      <button
                        onClick={() => setShowHint(!showHint)}
                        className="flex items-center text-xs font-bold uppercase text-gray-500 mb-2 hover:text-git-orange transition-colors focus:outline-none"
                      >
                        {showHint ? (
                          <EyeOff size={14} className="mr-2" />
                        ) : (
                          <Eye size={14} className="mr-2" />
                        )}
                        {showHint ? "Ocultar Dica" : "Ver Dica"}
                      </button>

                      <AnimatePresence>
                        {showHint && (
                          <motion.div
                            initial={{
                              opacity: 0,
                              height: 0,
                              overflow: "hidden",
                            }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="p-4 bg-gray-800 rounded-lg border border-gray-700"
                          >
                            <h3 className="text-xs font-bold uppercase text-gray-500 mb-2">
                              Missão
                            </h3>
                            <p className="text-sm">
                              Digite{" "}
                              <code className="bg-black px-2 py-1 rounded text-green-400 font-mono">
                                {step.command}
                              </code>{" "}
                              no terminal.
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
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
            <Visualizer
              moduleId={moduleId}
              stepIndex={currentStepIndex}
              isCompleted={isStepCompleted}
              isTransitioning={isTransitioning}
            />
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
