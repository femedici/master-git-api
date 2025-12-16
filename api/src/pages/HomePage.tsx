import React from "react";
import { useNavigate } from "react-router-dom";
import { useProgress } from "../context/ProgressContext";
import { modulesData } from "../data/modulesData";
import GitLogoProgress from "../components/GitLogoProgress";
import ModuleCard from "../components/ModuleCard";
import { motion } from "framer-motion";

const HomePage: React.FC = () => {
  const { currentLevel, isModuleUnlocked } = useProgress();
  const navigate = useNavigate();

  const getModuleStatus = (moduleId: number) => {
    if (currentLevel >= moduleId) return "completed";
    if (isModuleUnlocked(moduleId)) return "unlocked";
    return "locked";
  };

  return (
    <div className="min-h-screen bg-git-dark text-white flex flex-col items-center justify-center p-8 overflow-hidden">
      <header className="absolute top-8 left-8">
        <h1 className="text-3xl font-bold tracking-tighter">
          Master<span className="text-git-orange">Git</span>
        </h1>
      </header>

      <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-6xl gap-12">
        {/* Animated Background Dots */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Multiple animated dot patterns */}
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-3 h-3 bg-git-orange rounded-full opacity-30"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0, 0.6, 0],
                scale: [0.5, 1.2, 0.5],
              }}
              transition={{
                duration: 4 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 4,
                ease: "easeInOut",
              }}
            />
          ))}

          {/* Branch-like connecting lines */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={`line-${i}`}
              className="absolute h-px bg-gradient-to-r from-transparent via-git-orange to-transparent"
              style={{
                left: `${10 + Math.random() * 80}%`,
                top: `${10 + Math.random() * 80}%`,
                width: `${50 + Math.random() * 200}px`,
                transformOrigin: "left center",
                rotate: `${Math.random() * 360}deg`,
              }}
              animate={{
                opacity: [0, 0.4, 0],
                scaleX: [0, 1, 0],
              }}
              transition={{
                duration: 5 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        {/* Left Side: Modules Progress List */}
        <div className="flex-1 flex items-center justify-center z-10">
          <div className="relative w-full max-w-2xl">
            {/* Progress Timeline */}
            <div className="space-y-12">
              {modulesData.map((module, index) => {
                const moduleNumber = index + 1;
                const status = getModuleStatus(moduleNumber);
                const isCompleted = currentLevel >= moduleNumber;

                return (
                  <div
                    key={moduleNumber}
                    className="relative flex items-center group"
                  >
                    {/* Module Card */}
                    <div className="flex-shrink-0 z-20">
                      <ModuleCard
                        {...module}
                        status={status}
                        onClick={() => navigate(`/module/${moduleNumber}`)}
                      />
                    </div>

                    {/* Connecting Dots Line */}
                    {index < modulesData.length - 1 && (
                      <div className="flex-1 flex items-center justify-center ml-8 mr-8">
                        {/* Animated Dots */}
                        <div className="flex items-center space-x-2">
                          {[...Array(8)].map((_, dotIndex) => (
                            <motion.div
                              key={dotIndex}
                              className={`w-2 h-2 rounded-full transition-all duration-500 ${
                                isCompleted ? "bg-git-orange" : "bg-gray-600"
                              }`}
                              animate={
                                isCompleted
                                  ? {
                                      opacity: [0.3, 1, 0.3],
                                      scale: [1, 1.2, 1],
                                    }
                                  : {}
                              }
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                delay: dotIndex * 0.2,
                                ease: "easeInOut",
                              }}
                            />
                          ))}
                        </div>

                        {/* Arrow at the end */}
                        <motion.div
                          className={`ml-2 transition-all duration-500 ${
                            isCompleted ? "text-git-orange" : "text-gray-600"
                          }`}
                          animate={
                            isCompleted
                              ? {
                                  x: [0, 5, 0],
                                }
                              : {}
                          }
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                        >
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                          >
                            <path d="M8.59 16.59L13.17 12L8.59 7.41L10 6l6 6-6 6-1.41-1.41z" />
                          </svg>
                        </motion.div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Vertical Progress Line (Background) */}
            <div className="absolute left-16 top-0 bottom-0 w-px bg-gray-800 z-0">
              <motion.div
                className="w-full bg-git-orange origin-top"
                initial={{ scaleY: 0 }}
                animate={{
                  scaleY: currentLevel / 3,
                }}
                transition={{
                  duration: 1.5,
                  ease: "easeOut",
                }}
              />
            </div>
          </div>
        </div>

        {/* Right Side: Progress & Git Logo Button */}
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="mb-20 text-center">
            <h2 className="text-3xl font-bold mb-4">Seu Progresso</h2>
            <p className="text-gray-400 text-lg">
              Complete os módulos para liberar o teste final.
            </p>
          </div>

          {/* Large Interactive Git Logo */}
          <div className="relative my-16">
            {currentLevel >= 3 ? (
              // Clickable Git Logo Button when completed
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="relative group focus:outline-none"
                onClick={() =>
                  alert("Teste Final Iniciado! (Feature em breve)")
                }
              >
                <div className="transform scale-150">
                  <GitLogoProgress progress={currentLevel} />
                </div>

                {/* Glowing effect when complete */}
                <div className="absolute inset-0 rounded-full bg-git-orange opacity-20 blur-xl animate-pulse group-hover:opacity-30 transition-opacity"></div>

                {/* Call to action text */}
                <motion.div
                  className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 text-center"
                  animate={{ y: [0, -5, 0] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <p className="text-git-orange font-bold text-lg">
                    Clique para iniciar
                  </p>
                  <p className="text-git-orange text-sm">TESTE FINAL</p>
                </motion.div>
              </motion.button>
            ) : (
              // Static larger Git Logo when not completed
              <div className="transform scale-150">
                <GitLogoProgress progress={currentLevel} />
              </div>
            )}
          </div>

          {/* Progress indicator text */}
          <div className="mt-24 text-center">
            <p className="text-gray-300 text-lg">
              {currentLevel === 3 ? (
                <span className="text-git-orange font-bold">
                  ✨ Todos os módulos completos! ✨
                </span>
              ) : (
                <span>Módulos completos: {currentLevel}/3</span>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
