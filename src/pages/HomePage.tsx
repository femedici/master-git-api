import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useProgress } from '../context/ProgressContext';
import { modulesData } from '../data/modulesData';
import GitLogoProgress from '../components/GitLogoProgress';
import ModuleCard from '../components/ModuleCard';
import { motion } from 'framer-motion';

const HomePage: React.FC = () => {
  const { currentLevel, isModuleUnlocked } = useProgress();
  const navigate = useNavigate();

  const getModuleStatus = (moduleId: number) => {
    if (currentLevel >= moduleId) return 'completed';
    if (isModuleUnlocked(moduleId)) return 'unlocked';
    return 'locked';
  };

  return (
    <div className="min-h-screen bg-git-dark text-white flex flex-col items-center justify-center p-8 overflow-hidden">
      <header className="absolute top-8 left-8">
        <h1 className="text-3xl font-bold tracking-tighter">
          Master<span className="text-git-orange">Git</span>
        </h1>
      </header>

      <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-6xl gap-12">
        
        {/* Left Side: Modules Staircase */}
        <div className="flex-1 relative h-[600px] w-full flex items-center justify-center">
           {/* Staircase Layout using absolute positioning or grid */}
           <div className="relative w-full h-full">
              {/* Module 1: Bottom Left */}
              <div className="absolute bottom-10 left-10 z-10">
                <ModuleCard 
                  {...modulesData[0]} 
                  status={getModuleStatus(1)}
                  onClick={() => navigate(`/module/1`)}
                />
              </div>

              {/* Module 2: Center Middle */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
                <ModuleCard 
                  {...modulesData[1]} 
                  status={getModuleStatus(2)}
                  onClick={() => navigate(`/module/2`)}
                />
              </div>

              {/* Module 3: Top Right */}
              <div className="absolute top-10 right-10 z-30">
                <ModuleCard 
                  {...modulesData[2]} 
                  status={getModuleStatus(3)}
                  onClick={() => navigate(`/module/3`)}
                />
              </div>

              {/* Connecting Lines (Optional decoration) */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
                <path d="M 200 500 C 300 500, 300 300, 500 300" stroke="#F05032" strokeWidth="4" fill="none" strokeDasharray="10 10" />
                <path d="M 650 300 C 750 300, 750 100, 850 100" stroke="#F05032" strokeWidth="4" fill="none" strokeDasharray="10 10" />
              </svg>
           </div>
        </div>

        {/* Right Side: Progress & Final Test */}
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold mb-2">Seu Progresso</h2>
            <p className="text-gray-400">Complete os módulos para liberar o teste final.</p>
          </div>
          
          <GitLogoProgress progress={currentLevel} />

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={currentLevel < 3}
            className={`
              mt-12 px-8 py-4 rounded-full font-bold text-lg shadow-xl transition-all
              ${currentLevel >= 3 
                ? 'bg-git-orange text-white hover:bg-orange-600 cursor-pointer' 
                : 'bg-gray-800 text-gray-500 cursor-not-allowed'
              }
            `}
            onClick={() => currentLevel >= 3 && alert("Teste Final Iniciado! (Feature em breve)")}
          >
            {currentLevel >= 3 ? "INICIAR TESTE FINAL" : "BLOQUEADO"}
          </motion.button>
        </div>

      </div>
    </div>
  );
};

export default HomePage;