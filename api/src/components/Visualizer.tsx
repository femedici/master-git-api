import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Folder,
  FileText,
  GitCommit,
  Zap,
  Cloud,
  GitBranch,
} from "lucide-react";

interface VisualizerProps {
  moduleId: number;
  stepIndex: number;
  isCompleted: boolean;
  isTransitioning?: boolean;
}

const Visualizer: React.FC<VisualizerProps> = ({
  moduleId,
  stepIndex,
  isCompleted,
  isTransitioning = false,
}) => {
  // Screen clearing animation
  const ScreenClearOverlay = () => (
    <AnimatePresence>
      {isTransitioning && (
        <motion.div
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          exit={{ scaleY: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0 bg-git-dark z-50 origin-top flex items-center justify-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="text-git-orange"
          >
            <Zap size={48} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  // Module 1: Basic Git Commands - Simplified & Polished
  const renderModule1 = () => {
    return (
      <div className="relative w-full h-full flex flex-col items-center justify-center p-8">
        {/* Step 0: Intro */}
        {stepIndex === 0 && (
          <motion.div
            key="intro"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="flex flex-col items-center space-y-8"
          >
            <div className="w-32 h-32 bg-git-orange/20 rounded-full flex items-center justify-center border-4 border-git-orange relative">
              <GitBranch size={64} className="text-git-orange" />
              <motion.div
                className="absolute inset-0 border-4 border-white rounded-full opacity-20"
                animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0, 0.2] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
            <div className="text-center max-w-md">
              <h3 className="text-2xl font-bold text-white mb-4">
                Git Version Control
              </h3>
              <p className="text-gray-400">
                Rastreie histórico, colabore em equipe e gerencie versões do seu
                código com segurança.
              </p>
            </div>
          </motion.div>
        )}

        {/* Step 1: git clone */}
        {stepIndex === 1 && (
          <motion.div
            key="clone"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="flex flex-col items-center space-y-8"
          >
            <div className="flex items-center space-x-16">
              {/* Remote */}
              <div className="flex flex-col items-center space-y-4">
                <div className="w-24 h-24 bg-blue-900/30 rounded-full flex items-center justify-center border-2 border-blue-500/50">
                  <Cloud size={48} className="text-blue-400" />
                </div>
                <span className="text-sm text-blue-400 font-bold">Remoto</span>
              </div>

              {/* Animation */}
              <div className="relative w-32 h-2 bg-gray-700 rounded-full overflow-hidden">
                {isCompleted && (
                  <motion.div
                    className="absolute inset-0 bg-git-orange"
                    initial={{ x: "-100%" }}
                    animate={{ x: "100%" }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                )}
              </div>

              {/* Local */}
              <div className="flex flex-col items-center space-y-4">
                <div className="w-24 h-24 bg-gray-800 rounded-xl flex items-center justify-center border-2 border-gray-600">
                  <AnimatePresence>
                    {isCompleted ? (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="flex flex-col items-center"
                      >
                        <Folder size={48} className="text-git-orange" />
                        <span className="text-xs text-git-orange mt-2">
                          repo
                        </span>
                      </motion.div>
                    ) : (
                      <div className="w-12 h-12 border-2 border-dashed border-gray-600 rounded-lg" />
                    )}
                  </AnimatePresence>
                </div>
                <span className="text-sm text-gray-400 font-bold">Local</span>
              </div>
            </div>

            <div className="text-center mt-8">
              <p className="text-gray-400">
                {isCompleted ? (
                  <span className="text-git-orange font-bold">
                    Repositório clonado com sucesso!
                  </span>
                ) : (
                  "Baixando arquivos do servidor remoto..."
                )}
              </p>
            </div>
          </motion.div>
        )}

        {/* Zones Container for Steps 2, 3, 4 */}
        {stepIndex > 1 && (
          <div className="flex items-end justify-center space-x-12 mb-12">
            {/* Working Directory Zone */}
            <div className="flex flex-col items-center space-y-4">
              <div className="w-32 h-48 border-2 border-dashed border-gray-600 rounded-xl flex items-center justify-center relative bg-gray-800/30">
                <span className="absolute -top-8 text-gray-500 text-xs uppercase tracking-widest font-bold text-center w-full">
                  Diretório de
                  <br />
                  Trabalho
                </span>

                {/* File in Working Dir */}
                <AnimatePresence>
                  {stepIndex === 3 && !isCompleted && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      className="flex flex-col items-center"
                    >
                      <FileText size={40} className="text-blue-400" />
                      <span className="text-xs text-gray-400 mt-2">
                        arquivo.txt
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Staging Area Zone */}
            <div className="flex flex-col items-center space-y-4">
              <div className="w-32 h-48 border-2 border-dashed border-gray-600 rounded-xl flex items-center justify-center relative bg-gray-800/30">
                <span className="absolute -top-8 text-gray-500 text-xs uppercase tracking-widest font-bold text-center w-full">
                  Área de
                  <br />
                  Preparação
                </span>

                {/* File in Staging */}
                <AnimatePresence>
                  {(stepIndex === 3 && isCompleted) ||
                  (stepIndex === 4 && !isCompleted) ? (
                    <motion.div
                      layoutId="file-icon"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ scale: 0, opacity: 0 }}
                      className="flex flex-col items-center"
                    >
                      <FileText size={40} className="text-green-400" />
                      <span className="text-xs text-green-400 mt-2">
                        arquivo.txt
                      </span>
                      <span className="text-[10px] bg-green-900/50 text-green-400 px-2 py-0.5 rounded-full mt-1">
                        Staged
                      </span>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            </div>

            {/* Repository Zone */}
            <div className="flex flex-col items-center space-y-4">
              <div
                className={`w-32 h-48 border-2 ${
                  stepIndex >= 2 ? "border-git-orange" : "border-gray-700"
                } rounded-xl flex items-center justify-center relative bg-gray-800/30 transition-colors duration-500`}
              >
                <span className="absolute -top-8 text-gray-500 text-xs uppercase tracking-widest font-bold">
                  Repositório
                </span>

                {/* .git folder indicator */}
                {stepIndex >= 2 && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-2 right-2"
                  >
                    <Folder size={16} className="text-git-orange" />
                  </motion.div>
                )}

                {/* Commit in Repo */}
                <AnimatePresence>
                  {stepIndex === 4 && isCompleted && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="flex flex-col items-center"
                    >
                      <div className="w-12 h-12 rounded-full bg-git-orange flex items-center justify-center shadow-lg shadow-orange-900/50">
                        <GitCommit size={24} className="text-white" />
                      </div>
                      <span className="text-xs text-git-orange mt-2">
                        Commit
                      </span>
                      <span className="text-[10px] text-gray-500 mt-1">
                        v1.0
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        )}

        {/* Status Text */}
        <div className="h-12 text-center">
          <AnimatePresence mode="wait">
            {stepIndex === 2 && (
              <motion.p
                key="step2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-gray-400"
              >
                {isCompleted ? (
                  <span className="text-git-orange font-bold">
                    Repositório inicializado!
                  </span>
                ) : (
                  "Aguardando inicialização..."
                )}
              </motion.p>
            )}
            {stepIndex === 3 && (
              <motion.p
                key="step3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-gray-400"
              >
                {isCompleted ? (
                  <span className="text-green-400 font-bold">
                    Arquivo adicionado ao Staging!
                  </span>
                ) : (
                  "Mova o arquivo para a Área de Preparação"
                )}
              </motion.p>
            )}
            {stepIndex === 4 && (
              <motion.p
                key="step4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-gray-400"
              >
                {isCompleted ? (
                  <span className="text-git-orange font-bold">
                    Commit realizado com sucesso!
                  </span>
                ) : (
                  "Crie um commit com os arquivos do Staging"
                )}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>
    );
  };

  // Module 2: Branches
  const renderModule2 = () => {
    // Logic for active branch highlighting
    // Step 0 (Create): Before complete: main. After complete: feature.
    // Step 1 (Commit): feature.
    // Step 2 (Switch main): Before complete: feature. After complete: main.
    // Step 3 (Switch feature): Before complete: main. After complete: feature.

    const isFeatureActive =
      (stepIndex === 0 && isCompleted) ||
      stepIndex === 1 ||
      (stepIndex === 2 && !isCompleted) ||
      (stepIndex === 3 && isCompleted);

    const isMainActive = !isFeatureActive;

    // Logic for commit visibility
    // Only show commit if step 1 is completed OR we are past step 1
    const showCommit = (stepIndex === 1 && isCompleted) || stepIndex > 1;

    // Logic for branch visibility (drawing animation)
    // Show branch if step 0 is completed OR we are past step 0
    const showBranch = (stepIndex === 0 && isCompleted) || stepIndex > 0;

    return (
      <div className="relative w-full h-full flex flex-col items-center justify-center p-8">
        {/* Mini App Preview Screen */}
        <motion.div
          animate={{
            borderColor:
              isFeatureActive && showCommit
                ? "rgba(240, 80, 51, 0.8)"
                : "rgba(75, 85, 99, 1)",
            boxShadow:
              isFeatureActive && showCommit
                ? "0 0 15px rgba(240, 80, 51, 0.3)"
                : "0 0 0 rgba(0,0,0,0)",
            scale: [1, 1.05, 1],
          }}
          key={isFeatureActive ? "feature" : "main"}
          transition={{ duration: 0.4 }}
          className="absolute top-8 right-8 w-48 bg-gray-800 rounded-lg border border-gray-700 shadow-xl overflow-hidden"
        >
          <div className="bg-gray-900 px-3 py-2 border-b border-gray-700 flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-red-500" />
            <div className="w-2 h-2 rounded-full bg-yellow-500" />
            <div className="w-2 h-2 rounded-full bg-green-500" />
            <span className="text-[10px] text-gray-500 ml-2">Meu App</span>
          </div>
          <div className="p-4 space-y-2">
            <div className="h-2 w-3/4 bg-gray-700 rounded" />
            <div className="h-2 w-1/2 bg-gray-700 rounded" />

            {/* Feature Content */}
            <AnimatePresence mode="wait">
              {isFeatureActive && showCommit && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="mt-4 p-2 bg-git-orange/20 border border-git-orange/50 rounded"
                >
                  <div className="h-2 w-full bg-git-orange/50 rounded mb-1" />
                  <span className="text-[8px] text-git-orange block">
                    Nova Feature!
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Visualization Container */}
        <div className="relative w-full max-w-2xl h-64">
          {/* Main Branch Line (SVG) */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {/* Main Line */}
            <line
              x1="0%"
              y1="50%"
              x2="100%"
              y2="50%"
              stroke="#374151"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <motion.line
              x1="0%"
              y1="50%"
              x2="100%"
              y2="50%"
              stroke="#3b82f6"
              strokeWidth="4"
              strokeLinecap="round"
              animate={{ opacity: isMainActive ? 1 : 0.3 }}
            />
          </svg>

          {/* Main Branch Label */}
          <motion.div
            className="absolute left-4 top-1/2 -translate-y-8 font-bold text-sm"
            animate={{ color: isMainActive ? "#3b82f6" : "#4b5563" }}
          >
            main
          </motion.div>

          {/* Feature Branch Line (SVG Path) */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
            viewBox="0 0 400 200"
            preserveAspectRatio="none"
          >
            <motion.path
              d="M 100 100 Q 100 160 140 160 L 360 160"
              fill="none"
              stroke="#f05033"
              strokeWidth="4"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{
                pathLength: showBranch ? 1 : 0,
                opacity: showBranch ? (isFeatureActive ? 1 : 0.3) : 0,
              }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
          </svg>

          {/* Feature Branch Label */}
          <motion.div
            className="absolute right-10 top-[80%] translate-y-2 font-bold text-sm"
            initial={{ opacity: 0 }}
            animate={{
              opacity: showBranch ? (isFeatureActive ? 1 : 0.5) : 0,
              color: isFeatureActive ? "#f05033" : "#4b5563",
            }}
          >
            feature-nova
          </motion.div>

          {/* Commit Node on Feature Branch */}
          <AnimatePresence>
            {showCommit && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute"
                style={{ left: "75%", top: "calc(80% - 12px)" }}
              >
                <div className="w-6 h-6 bg-git-orange rounded-full border-4 border-gray-900 z-10 relative shadow-[0_0_15px_rgba(240,80,51,0.5)]">
                  <div className="absolute top-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs text-gray-400 bg-gray-900/80 px-2 py-1 rounded">
                    Commit: "Adiciona feature"
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Active Indicator (User position) */}
          <motion.div
            className="absolute w-8 h-8 bg-white rounded-full border-4 border-gray-900 shadow-xl z-20 flex items-center justify-center"
            animate={{
              top: isFeatureActive ? "calc(80% - 16px)" : "calc(50% - 16px)",
              left: isFeatureActive ? "75%" : "50%",
            }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          >
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          </motion.div>
        </div>

        {/* Status Text */}
        <div className="mt-12 text-center h-16">
          <AnimatePresence mode="wait">
            <motion.p
              key={stepIndex + (isCompleted ? "-done" : "-pending")}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-xl text-gray-300"
            >
              {stepIndex === 0 &&
                (isCompleted
                  ? "Branch criada e ativa!"
                  : "Criando nova linha de desenvolvimento...")}
              {stepIndex === 1 &&
                (isCompleted
                  ? "Commit salvo na branch!"
                  : "Trabalhando na feature...")}
              {stepIndex === 2 &&
                (isCompleted
                  ? "De volta à main (sem feature)"
                  : "Alternando para main...")}
              {stepIndex === 3 &&
                (isCompleted
                  ? "De volta à feature (com feature)"
                  : "Retornando para feature...")}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    if (moduleId === 1) {
      return renderModule1();
    }
    if (moduleId === 2) {
      return renderModule2();
    }
    return (
      <div className="flex items-center justify-center h-full text-gray-500">
        Módulo {moduleId} em desenvolvimento
      </div>
    );
  };

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-gray-900 to-gray-800">
      <AnimatePresence mode="wait">{renderContent()}</AnimatePresence>
      <ScreenClearOverlay />
    </div>
  );
};

export default Visualizer;
