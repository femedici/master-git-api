import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Folder, FileText, GitCommit, GitBranch, GitMerge, Archive } from 'lucide-react';

interface VisualizerProps {
  moduleId: number;
  stepIndex: number;
  isCompleted: boolean;
}

const Visualizer: React.FC<VisualizerProps> = ({ moduleId, stepIndex, isCompleted }) => {
  
  // Module 1: Basic Concepts
  const renderModule1 = () => {
    return (
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Step 0: git init - Show .git folder */}
        {(stepIndex >= 0 || (stepIndex === 0 && isCompleted)) && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="absolute top-10 left-10 flex flex-col items-center"
          >
            <Folder size={60} className="text-blue-400 mb-2" />
            <span className="text-xs text-gray-400">.git</span>
          </motion.div>
        )}

        {/* Step 1: git add . - Show file moving to staging */}
        <div className="flex items-center space-x-20">
          {/* Working Directory */}
          <div className="flex flex-col items-center">
             <span className="text-xs text-gray-500 mb-4 uppercase tracking-widest">Working Dir</span>
             <motion.div 
               animate={stepIndex >= 1 && isCompleted ? { opacity: 0.3 } : { opacity: 1 }}
             >
               <FileText size={48} className="text-gray-400" />
             </motion.div>
          </div>

          {/* Arrow */}
          <motion.div
             initial={{ opacity: 0, x: -20 }}
             animate={stepIndex >= 1 && isCompleted ? { opacity: 1, x: 0 } : { opacity: 0 }}
             className="text-gray-600"
          >
            →
          </motion.div>

          {/* Staging Area */}
          <div className="flex flex-col items-center">
             <span className="text-xs text-gray-500 mb-4 uppercase tracking-widest">Staging</span>
             <div className="w-24 h-24 border-2 border-dashed border-gray-700 rounded-lg flex items-center justify-center">
                {stepIndex >= 1 && isCompleted && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                  >
                    <FileText size={48} className="text-green-500" />
                  </motion.div>
                )}
             </div>
          </div>
        </div>

        {/* Step 2: git commit - Show timeline */}
        {stepIndex >= 2 && isCompleted && (
          <motion.div 
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="absolute bottom-10 w-full flex justify-center"
          >
             <div className="flex items-center bg-gray-800 px-6 py-3 rounded-full border border-gray-700">
                <div className="w-3 h-3 bg-gray-500 rounded-full mr-2"></div>
                <div className="w-20 h-1 bg-gray-600"></div>
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring" }}
                  className="w-4 h-4 bg-git-orange rounded-full mx-2 shadow-[0_0_10px_rgba(240,80,50,0.5)]"
                />
                <span className="text-xs text-gray-300 ml-2">first commit</span>
             </div>
          </motion.div>
        )}
      </div>
    );
  };

  // Module 2: Branches
  const renderModule2 = () => {
    return (
      <div className="relative w-full h-full flex items-center justify-center">
         <svg width="400" height="200" viewBox="0 0 400 200">
            {/* Main Branch Line */}
            <line x1="50" y1="100" x2="150" y2="100" stroke="#4b5563" strokeWidth="4" />
            <circle cx="150" cy="100" r="8" fill="#4b5563" />
            <text x="140" y="130" fill="#6b7280" fontSize="12">main</text>

            {/* Step 0: git branch feature */}
            {(stepIndex >= 0 && isCompleted) && (
              <>
                <motion.path
                  d="M 150 100 C 200 100, 200 50, 250 50"
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="4"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1 }}
                />
                <motion.circle 
                  cx="250" cy="50" r="8" fill="#3b82f6" 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1 }}
                />
                <motion.text 
                  x="260" y="55" fill="#3b82f6" fontSize="12" 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  transition={{ delay: 1.2 }}
                >
                  feature
                </motion.text>
              </>
            )}

            {/* Step 1: git checkout feature - Move HEAD */}
            <motion.g
               initial={{ x: 150, y: 100 }}
               animate={stepIndex >= 1 && isCompleted ? { x: 250, y: 50 } : { x: 150, y: 100 }}
               transition={{ type: "spring", stiffness: 50 }}
            >
               <rect x="-25" y="-35" width="50" height="20" rx="4" fill="#F05032" />
               <text x="0" y="-21" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">HEAD</text>
            </motion.g>
         </svg>
      </div>
    );
  };

  // Module 3: Advanced (Stash & Merge)
  const renderModule3 = () => {
    return (
      <div className="relative w-full h-full flex flex-col items-center justify-center space-y-10">
        
        {/* Step 0: git stash */}
        <div className="flex items-center space-x-8">
           <div className="flex flex-col items-center">
              <span className="text-xs text-gray-500 mb-2">Working Changes</span>
              <motion.div
                animate={stepIndex >= 0 && isCompleted ? { y: 100, opacity: 0, scale: 0.5 } : { y: 0, opacity: 1, scale: 1 }}
              >
                <FileText size={40} className="text-yellow-500" />
              </motion.div>
           </div>

           <div className="relative w-32 h-32 border-2 border-gray-700 border-t-0 rounded-b-lg flex items-end justify-center pb-4 overflow-hidden">
              <span className="absolute top-2 text-xs text-gray-600">STASH</span>
              {(stepIndex >= 0 && isCompleted) && (
                <motion.div
                  initial={{ y: -100 }}
                  animate={{ y: 0 }}
                  transition={{ type: "spring", bounce: 0.5 }}
                >
                  <Archive size={40} className="text-gray-400" />
                </motion.div>
              )}
           </div>
        </div>

        {/* Step 1: git merge feature */}
        {(stepIndex >= 1 && isCompleted) && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-gray-900 flex items-center justify-center"
          >
             <svg width="400" height="200" viewBox="0 0 400 200">
                {/* Main */}
                <line x1="50" y1="150" x2="200" y2="150" stroke="#4b5563" strokeWidth="4" />
                {/* Feature */}
                <path d="M 50 150 C 100 150, 100 50, 150 50 L 250 50" fill="none" stroke="#3b82f6" strokeWidth="4" />
                
                {/* Merge */}
                <motion.path
                  d="M 250 50 C 300 50, 300 150, 350 150"
                  fill="none"
                  stroke="#8b5cf6"
                  strokeWidth="4"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5 }}
                />
                <motion.circle 
                  cx="350" cy="150" r="10" fill="#8b5cf6"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1.5 }}
                />
                <motion.text x="340" y="180" fill="#8b5cf6" fontSize="12" initial={{opacity:0}} animate={{opacity:1}} transition={{delay:1.6}}>Merge Commit</motion.text>
             </svg>
          </motion.div>
        )}

      </div>
    );
  };

  return (
    <div className="h-full w-full bg-gray-900 relative overflow-hidden flex items-center justify-center p-8">
      <div className="absolute top-4 left-4 text-gray-500 text-xs uppercase tracking-widest">
        Visualizador Gráfico
      </div>

      {moduleId === 1 && renderModule1()}
      {moduleId === 2 && renderModule2()}
      {moduleId === 3 && renderModule3()}
    </div>
  );
};

export default Visualizer;
