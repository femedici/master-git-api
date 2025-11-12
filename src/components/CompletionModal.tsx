import React, { useMemo } from 'react';
import styled from 'styled-components';
import { Trophy, Star, GitBranch } from 'lucide-react';
import dataService from '../services/dataService';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: linear-gradient(135deg, #1a2332 0%, #2d3748 100%);
  padding: 48px;
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
  text-align: center;
  max-width: 500px;
  width: 90%;
  border: 2px solid #ff6742;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(255, 103, 66, 0.1) 0%, transparent 50%);
    animation: pulse 3s ease-in-out infinite;
  }

  @keyframes pulse {
    0%, 100% { opacity: 0.5; }
    50% { opacity: 1; }
  }
`;

const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-bottom: 24px;
  position: relative;
  z-index: 1;
`;

const Icon = styled.div`
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #ff6742 0%, #ff8565 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  animation: bounce 2s ease-in-out infinite;

  &:nth-child(2) {
    animation-delay: 0.2s;
  }

  &:nth-child(3) {
    animation-delay: 0.4s;
  }

  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(-10px);
    }
    60% {
      transform: translateY(-5px);
    }
  }
`;

const Title = styled.h1`
  font-size: 36px;
  color: #ffffff;
  margin-bottom: 16px;
  font-weight: bold;
  position: relative;
  z-index: 1;
`;

const Subtitle = styled.p`
  font-size: 18px;
  color: #e2e8f0;
  margin-bottom: 32px;
  line-height: 1.6;
  position: relative;
  z-index: 1;
`;

const Button = styled.button`
  background: linear-gradient(135deg, #ff6742 0%, #ff8565 100%);
  color: white;
  border: none;
  padding: 16px 32px;
  border-radius: 12px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  position: relative;
  z-index: 1;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(255, 103, 66, 0.4);
  }

  &:active {
    transform: translateY(0);
  }
`;

const ReportContainer = styled.div`
  margin: 24px 0;
  padding: 24px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  backdrop-filter: blur(10px);
  position: relative;
  z-index: 1;
`;

const ReportTitle = styled.h3`
  font-size: 20px;
  color: #ff6742;
  margin-bottom: 20px;
  text-align: center;
  font-weight: bold;
`;

const ModuleStats = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 20px;
`;

const ModuleItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  border-left: 4px solid #48bb78;
`;

const ModuleName = styled.div`
  color: #ffffff;
  font-weight: 600;
  font-size: 14px;
`;

const ModuleScore = styled.div<{ score: number }>`
  color: ${props => 
    props.score >= 90 ? '#48bb78' : 
    props.score >= 80 ? '#68d391' :
    props.score >= 70 ? '#fbbf24' :
    props.score >= 60 ? '#f56565' : '#fc8181'
  };
  font-weight: bold;
  font-size: 16px;
`;

const OverallStats = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-top: 20px;
`;

const StatItem = styled.div`
  text-align: center;
  padding: 12px;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 8px;
`;

const StatNumber = styled.div<{ color?: string }>`
  font-size: 20px;
  font-weight: bold;
  color: ${props => props.color || '#ff6742'};
  margin-bottom: 4px;
`;

const StatLabel = styled.div`
  font-size: 12px;
  color: #e2e8f0;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const PerformanceAnalysis = styled.div`
  margin-top: 20px;
  padding: 16px;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 8px;
  text-align: left;
`;

const AnalysisTitle = styled.h4`
  color: #ff6742;
  font-size: 16px;
  margin-bottom: 12px;
  font-weight: bold;
`;

const AnalysisText = styled.p`
  color: #e2e8f0;
  font-size: 14px;
  line-height: 1.5;
  margin-bottom: 8px;
`;

interface CompletionModalProps {
  onClose: () => void;
  userName: string;
}

const CompletionModal: React.FC<CompletionModalProps> = ({ onClose, userName }) => {
  const reportData = useMemo(() => {
    const user = dataService.getCurrentUser();
    const modules = dataService.getAllModules();
    
    // Calcular estatísticas por módulo
    const moduleStats = modules.map(module => {
      const completedSessions = user.progress.sessionProgress[module.id]?.length || 0;
      const totalSessions = module.sessions.length;
      const completionRate = (completedSessions / totalSessions) * 100;
      
      // Simular nota baseada na taxa de conclusão (em um sistema real, viria dos testes)
      const moduleScore = completionRate === 100 ? Math.floor(Math.random() * 21) + 80 : completionRate;
      
      return {
        id: module.id,
        title: module.title,
        score: Math.round(moduleScore),
        completedSessions,
        totalSessions,
        completionRate: Math.round(completionRate)
      };
    });

    // Calcular média geral
    const averageScore = moduleStats.reduce((sum, mod) => sum + mod.score, 0) / moduleStats.length;
    const totalSessions = moduleStats.reduce((sum, mod) => sum + mod.totalSessions, 0);
    const totalCompleted = moduleStats.reduce((sum, mod) => sum + mod.completedSessions, 0);

    return {
      modules: moduleStats,
      averageScore: Math.round(averageScore),
      totalSessions,
      totalCompleted,
      overallCompletion: Math.round((totalCompleted / totalSessions) * 100)
    };
  }, []);

  const getPerformanceAnalysis = (score: number) => {
    if (score >= 95) {
      return {
        level: "🏆 EXCEPCIONAL",
        description: "Desempenho extraordinário! Você demonstrou domínio completo dos conceitos Git e está pronto para liderar projetos complexos.",
        color: "#48bb78"
      };
    } else if (score >= 90) {
      return {
        level: "⭐ EXCELENTE", 
        description: "Excelente aproveitamento! Você possui sólido conhecimento em Git e pode trabalhar com confiança em projetos colaborativos.",
        color: "#68d391"
      };
    } else if (score >= 80) {
      return {
        level: "👍 MUITO BOM",
        description: "Muito bom desempenho! Você tem uma base forte em Git e está bem preparado para a maioria das situações práticas.",
        color: "#9ae6b4"
      };
    } else if (score >= 70) {
      return {
        level: "✅ BOM",
        description: "Bom aproveitamento! Você compreende os fundamentos do Git e pode trabalhar efetivamente em equipe.",
        color: "#fbbf24"
      };
    } else {
      return {
        level: "📚 SATISFATÓRIO",
        description: "Aproveitamento satisfatório. Continue praticando para consolidar os conhecimentos adquiridos.",
        color: "#f56565"
      };
    }
  };

  const analysis = getPerformanceAnalysis(reportData.averageScore);

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <IconContainer>
          <Icon>
            <Trophy size={28} />
          </Icon>
          <Icon>
            <Star size={28} />
          </Icon>
          <Icon>
            <GitBranch size={28} />
          </Icon>
        </IconContainer>

        <Title>🎉 Parabéns, {userName}!</Title>
        
        <Subtitle>
          Você concluiu com sucesso o curso <strong>MasterGit</strong>!
        </Subtitle>

        <ReportContainer>
          <ReportTitle>📊 Relatório Final de Desempenho</ReportTitle>
          
          <ModuleStats>
            {reportData.modules.map(module => (
              <ModuleItem key={module.id}>
                <ModuleName>{module.title}</ModuleName>
                <ModuleScore score={module.score}>{module.score}%</ModuleScore>
              </ModuleItem>
            ))}
          </ModuleStats>

          <OverallStats>
            <StatItem>
              <StatNumber color={analysis.color}>{reportData.averageScore}%</StatNumber>
              <StatLabel>Média Geral</StatLabel>
            </StatItem>
            <StatItem>
              <StatNumber>{reportData.totalCompleted}/{reportData.totalSessions}</StatNumber>
              <StatLabel>Sessões</StatLabel>
            </StatItem>
            <StatItem>
              <StatNumber color="#48bb78">100%</StatNumber>
              <StatLabel>Conclusão</StatLabel>
            </StatItem>
          </OverallStats>

          <PerformanceAnalysis>
            <AnalysisTitle>🎯 Análise de Desempenho: {analysis.level}</AnalysisTitle>
            <AnalysisText>{analysis.description}</AnalysisText>
            <AnalysisText style={{ marginTop: '12px', fontWeight: 'bold', color: analysis.color }}>
              Certificado de Conclusão Desbloqueado! 🏅
            </AnalysisText>
          </PerformanceAnalysis>
        </ReportContainer>

        <Button onClick={onClose}>
          Continuar Explorando
        </Button>
      </ModalContent>
    </ModalOverlay>
  );
};

export default CompletionModal;