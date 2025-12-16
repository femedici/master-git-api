import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Folder, FileText, GitCommit, Zap, Cloud, GitBranch } from 'lucide-react';

interface VisualizerProps {
  moduleId: number;
  stepIndex: number;
  isCompleted: boolean;
  isTransitioning?: boolean;
}

const Visualizer: React.FC<VisualizerProps> = ({ moduleId, stepIndex, isCompleted, isTransitioning = false }) => {

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
              <h3 className="text-2xl font-bold text-white mb-4">Git Version Control</h3>
              <p className="text-gray-400">
                Rastreie histórico, colabore em equipe e gerencie versões do seu código com segurança.
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
                        <span className="text-xs text-git-orange mt-2">repo</span>
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
                {isCompleted ? <span className="text-git-orange font-bold">Repositório clonado com sucesso!</span> : "Baixando arquivos do servidor remoto..."}
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
                <span className="absolute -top-8 text-gray-500 text-xs uppercase tracking-widest font-bold text-center w-full">Diretório de<br/>Trabalho</span>
                
                {/* File in Working Dir */}
                <AnimatePresence>
                  {(stepIndex === 3 && !isCompleted) && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      className="flex flex-col items-center"
                    >
                      <FileText size={40} className="text-blue-400" />
                      <span className="text-xs text-gray-400 mt-2">arquivo.txt</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Staging Area Zone */}
            <div className="flex flex-col items-center space-y-4">
              <div className="w-32 h-48 border-2 border-dashed border-gray-600 rounded-xl flex items-center justify-center relative bg-gray-800/30">
                <span className="absolute -top-8 text-gray-500 text-xs uppercase tracking-widest font-bold text-center w-full">Área de<br/>Preparação</span>
                
                {/* File in Staging */}
                <AnimatePresence>
                  {(stepIndex === 3 && isCompleted) || (stepIndex === 4 && !isCompleted) ? (
                    <motion.div
                      layoutId="file-icon"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ scale: 0, opacity: 0 }}
                      className="flex flex-col items-center"
                    >
                      <FileText size={40} className="text-green-400" />
                      <span className="text-xs text-green-400 mt-2">arquivo.txt</span>
                      <span className="text-[10px] bg-green-900/50 text-green-400 px-2 py-0.5 rounded-full mt-1">Staged</span>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            </div>

            {/* Repository Zone */}
            <div className="flex flex-col items-center space-y-4">
              <div className={`w-32 h-48 border-2 ${stepIndex >= 2 ? 'border-git-orange' : 'border-gray-700'} rounded-xl flex items-center justify-center relative bg-gray-800/30 transition-colors duration-500`}>
                <span className="absolute -top-8 text-gray-500 text-xs uppercase tracking-widest font-bold">Repositório</span>
                
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
                      <span className="text-xs text-git-orange mt-2">Commit</span>
                      <span className="text-[10px] text-gray-500 mt-1">v1.0</span>
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
                {isCompleted ? <span className="text-git-orange font-bold">Repositório inicializado!</span> : "Aguardando inicialização..."}
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
                {isCompleted ? <span className="text-green-400 font-bold">Arquivo adicionado ao Staging!</span> : "Mova o arquivo para a Área de Preparação"}
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
                {isCompleted ? <span className="text-git-orange font-bold">Commit realizado com sucesso!</span> : "Crie um commit com os arquivos do Staging"}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

      </div>
    );
  };

  const renderContent = () => {
    if (moduleId === 1) {
      return renderModule1();
    }
    return (
      <div className="flex items-center justify-center h-full text-gray-500">
        Módulo {moduleId} em desenvolvimento
      </div>
    );
  };

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-gray-900 to-gray-800">
      <AnimatePresence mode="wait">
        {renderContent()}
      </AnimatePresence>
      <ScreenClearOverlay />
    </div>
  );
};

export default Visualizer;
