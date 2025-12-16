import React from 'react';
import { motion } from 'framer-motion';
import { GitGraph } from 'lucide-react';

interface GitLogoProgressProps {
  progress: number; // 0 to 3
}

const GitLogoProgress: React.FC<GitLogoProgressProps> = ({ progress }) => {
  // Calculate fill percentage based on progress (0 -> 30%, 1 -> 50%, 2 -> 75%, 3 -> 100%)
  // Or simply 0 -> 0%, 1 -> 33%, 2 -> 66%, 3 -> 100% for the fill height
  const fillHeight = (progress / 3) * 100;

  return (
    <div className="relative w-64 h-64 flex items-center justify-center">
      {/* Progress Ring */}
      <svg className="absolute w-full h-full transform -rotate-90">
        <circle
          cx="128"
          cy="128"
          r="120"
          stroke="#333"
          strokeWidth="8"
          fill="transparent"
        />
        {/* Segment 1 */}
        <motion.circle
          cx="128"
          cy="128"
          r="120"
          stroke="#F05032"
          strokeWidth="8"
          fill="transparent"
          strokeDasharray="251.2 753.6" // approx 1/3 of circumference (2 * pi * 120 = 753.9)
          strokeDashoffset={progress >= 1 ? 0 : 251.2}
          className="transition-all duration-1000 ease-out"
        />
        {/* Segment 2 */}
        <motion.circle
          cx="128"
          cy="128"
          r="120"
          stroke="#F05032"
          strokeWidth="8"
          fill="transparent"
          strokeDasharray="251.2 753.6"
          strokeDashoffset={progress >= 2 ? -251.2 : 0} // Offset to start after first segment? No, simpler to just rotate or use multiple paths.
          // Let's simplify: Just use one circle and animate strokeDashoffset based on total progress
          initial={{ strokeDashoffset: 754 }}
          animate={{ strokeDashoffset: 754 - (754 * progress) / 3 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          style={{ display: 'none' }} // Hiding this attempt, using the simpler one below
        />
      </svg>
      
      {/* Better Ring Implementation */}
      <svg className="absolute w-full h-full transform -rotate-90">
         <circle cx="128" cy="128" r="120" stroke="#333" strokeWidth="4" fill="transparent" />
         <motion.circle
            cx="128"
            cy="128"
            r="120"
            stroke="#F05032"
            strokeWidth="8"
            fill="transparent"
            strokeDasharray="754"
            initial={{ strokeDashoffset: 754 }}
            animate={{ strokeDashoffset: 754 - (754 * progress) / 3 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            strokeLinecap="round"
         />
      </svg>

      {/* Central Git Icon with Fill Effect */}
      <div className="relative w-32 h-32">
        {/* Background Icon (Low Opacity) */}
        <GitGraph className="w-full h-full text-git-orange opacity-30 absolute top-0 left-0" />
        
        {/* Foreground Icon (Masked for Fill Effect) */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden transition-all duration-1000 ease-in-out"
             style={{ height: `${fillHeight}%` }}>
           <GitGraph className="w-32 h-32 text-git-orange absolute bottom-0 left-0" />
        </div>
      </div>
      
      {/* Lock/Unlock Indicator for Final Test */}
      {progress === 3 && (
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -bottom-4 bg-git-orange text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg"
        >
          TESTE FINAL LIBERADO
        </motion.div>
      )}
    </div>
  );
};

export default GitLogoProgress;
