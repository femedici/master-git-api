import React from "react";
import { Lock, Check, Play } from "lucide-react";
import { motion } from "framer-motion";

interface ModuleCardProps {
  id: number;
  title: string;
  description: string;
  status: "locked" | "unlocked" | "completed";
  onClick: () => void;
}

const ModuleCard: React.FC<ModuleCardProps> = ({
  id,
  title,
  description,
  status,
  onClick,
}) => {
  const isLocked = status === "locked";
  const isCompleted = status === "completed";

  return (
    <motion.div
      whileTap={!isLocked ? { scale: 0.95 } : {}}
      onClick={!isLocked ? onClick : undefined}
      className={`
        relative w-64 p-6 rounded-xl border transition-all duration-300 cursor-pointer
        ${
          isLocked
            ? "bg-gray-800/50 border-gray-700 opacity-60 cursor-not-allowed"
            : "bg-gray-800 border-gray-600 hover:border-git-orange hover:shadow-lg hover:shadow-orange-900/20"
        }
        ${isCompleted ? "border-green-500/50" : ""}
      `}
    >
      <div className="flex justify-between items-start mb-4">
        <div
          className={`
          w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold
          ${
            isLocked
              ? "bg-gray-700"
              : isCompleted
              ? "bg-green-500"
              : "bg-git-orange"
          }
        `}
        >
          {isCompleted ? <Check size={20} /> : id}
        </div>
        {isLocked && <Lock size={20} className="text-gray-500" />}
      </div>

      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-sm text-gray-400 mb-4">{description}</p>

      {!isLocked && (
        <div
          className={`text-xs font-bold uppercase tracking-wider flex items-center ${
            isCompleted ? "text-green-400" : "text-git-orange"
          }`}
        >
          {isCompleted ? (
            "Concluído"
          ) : (
            <>
              Iniciar <Play size={12} className="ml-1 fill-current" />
            </>
          )}
        </div>
      )}
    </motion.div>
  );
};

export default ModuleCard;
