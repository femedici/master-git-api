import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface ProgressContextType {
  currentLevel: number; // 0, 1, 2, 3 (3 means all completed)
  completeModule: (moduleId: number) => void;
  isModuleUnlocked: (moduleId: number) => boolean;
  resetProgress: () => void;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export const ProgressProvider = ({ children }: { children: ReactNode }) => {
  const [currentLevel, setCurrentLevel] = useState<number>(() => {
    const saved = localStorage.getItem('mastergit_progress');
    return saved ? parseInt(saved, 10) : 0;
  });

  useEffect(() => {
    localStorage.setItem('mastergit_progress', currentLevel.toString());
  }, [currentLevel]);

  const completeModule = (moduleId: number) => {
    // Only advance if completing the current level's module
    if (moduleId === currentLevel + 1) {
      setCurrentLevel(prev => Math.min(prev + 1, 3));
    }
  };

  const isModuleUnlocked = (moduleId: number) => {
    // Module 1 is always unlocked.
    // Module 2 unlocks when level >= 1.
    // Module 3 unlocks when level >= 2.
    return moduleId <= currentLevel + 1;
  };

  const resetProgress = () => {
    setCurrentLevel(0);
  };

  return (
    <ProgressContext.Provider value={{ currentLevel, completeModule, isModuleUnlocked, resetProgress }}>
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (context === undefined) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
};
