import React from 'react';
import styled from 'styled-components';
import { Trophy, Star, GitBranch } from 'lucide-react';

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

const Stats = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 24px 0;
  padding: 20px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  backdrop-filter: blur(10px);
  position: relative;
  z-index: 1;
`;

const StatItem = styled.div`
  text-align: center;
`;

const StatNumber = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: #ff6742;
  margin-bottom: 4px;
`;

const StatLabel = styled.div`
  font-size: 12px;
  color: #e2e8f0;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

interface CompletionModalProps {
  onClose: () => void;
  userName: string;
}

const CompletionModal: React.FC<CompletionModalProps> = ({ onClose, userName }) => {
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
          <br />
          Agora você domina o Git do básico ao avançado.
        </Subtitle>

        <Stats>
          <StatItem>
            <StatNumber>3</StatNumber>
            <StatLabel>Módulos</StatLabel>
          </StatItem>
          <StatItem>
            <StatNumber>100%</StatNumber>
            <StatLabel>Progresso</StatLabel>
          </StatItem>
          <StatItem>
            <StatNumber>✓</StatNumber>
            <StatLabel>Certificado</StatLabel>
          </StatItem>
        </Stats>

        <Button onClick={onClose}>
          Continuar Explorando
        </Button>
      </ModalContent>
    </ModalOverlay>
  );
};

export default CompletionModal;