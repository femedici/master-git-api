import { useState, useEffect } from 'react';
import styled from 'styled-components';
import dataService from '../services/dataService';
import { User, Module, Session } from '../types';

const Content = styled.div`
  flex: 1;
  padding: 32px;
  background: #0f1c29;
`;

const ModuleHeader = styled.div`
  background: #1a2332;
  padding: 32px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  border: 1px solid #2d3748;
  margin-bottom: 32px;
`;

const ModuleTitle = styled.h2`
  font-size: 28px;
  color: #ffffff;
  margin-bottom: 8px;
`;

const ModuleDescription = styled.p`
  color: #e2e8f0;
  font-size: 16px;
  line-height: 1.6;
`;

const SessionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const SessionCard = styled.div<{ $isCompleted: boolean }>`
  background: #1a2332;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  border: 1px solid #2d3748;
  border-left: 4px solid ${props => props.$isCompleted ? '#48bb78' : '#2d3748'};
  transition: all 0.3s ease;
  cursor: pointer;
  
  ${props => props.$isCompleted && `
    filter: grayscale(0.7) opacity(0.8);
    transform: scale(0.98);
  `}
`;

const SessionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  transition: all 0.2s ease;
  
  &:hover {
    color: #ff6742;
  }
`;

const SessionTitle = styled.h3`
  font-size: 20px;
  color: #ffffff;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const SessionStatus = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const CustomCheckbox = styled.div<{ $isCompleted: boolean }>`
  width: 24px;
  height: 24px;
  border: 2px solid ${props => props.$isCompleted ? '#48bb78' : '#4a5568'};
  border-radius: 50%;
  background: ${props => props.$isCompleted ? '#48bb78' : 'transparent'};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;

  &:hover {
    border-color: ${props => props.$isCompleted ? '#38a169' : '#ff6742'};
    transform: scale(1.1);
  }

  ${props => props.$isCompleted && `
    &::after {
      content: '✓';
      color: white;
      font-size: 14px;
      font-weight: bold;
    }
  `}
`;

const SessionContent = styled.div<{ $isVisible: boolean }>`
  color: #e2e8f0;
  line-height: 1.6;
  margin-bottom: 16px;
  white-space: pre-wrap;
  max-height: ${props => props.$isVisible ? '2000px' : '0'};
  overflow: hidden;
  transition: max-height 0.3s ease, opacity 0.3s ease;
  opacity: ${props => props.$isVisible ? '1' : '0'};
`;

const CollapsibleContent = styled.div<{ $isVisible: boolean }>`
  max-height: ${props => props.$isVisible ? '2000px' : '0'};
  overflow: hidden;
  transition: max-height 0.3s ease, opacity 0.3s ease;
  opacity: ${props => props.$isVisible ? '1' : '0'};
`;

const CodeBlock = styled.pre`
  background: #0f1c29;
  color: #e2e8f0;
  padding: 16px;
  border-radius: 8px;
  overflow-x: auto;
  margin: 16px 0;
  font-family: 'Courier New', monospace;
  border: 1px solid #2d3748;
`;

const TestButton = styled.button<{ $isEnabled: boolean }>`
  background: ${props => props.$isEnabled ? '#ff6742' : '#2d3748'};
  color: ${props => props.$isEnabled ? 'white' : '#718096'};
  border: none;
  padding: 16px 24px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: ${props => props.$isEnabled ? 'pointer' : 'not-allowed'};
  transition: background-color 0.2s;
  margin-top: 32px;

  &:hover {
    background: ${props => props.$isEnabled ? '#ff8565' : '#2d3748'};
  }
`;

interface ModulesPageProps {
  moduleId: string | undefined;
  user: User | null;
}

const ModulesPage: React.FC<ModulesPageProps> = ({ moduleId, user }) => {
  const [module, setModule] = useState<Module | null>(null);
  const [expandedSessions, setExpandedSessions] = useState<Set<number>>(new Set());

  useEffect(() => {
    if (moduleId) {
      const moduleData = dataService.getModule(parseInt(moduleId));
      setModule(moduleData || null);
      
      // Inicializar sessões expandidas (todas as não completadas ficam abertas)
      if (moduleData) {
        const openSessions = new Set(
          moduleData.sessions
            .filter(session => !session.isCompleted)
            .map(session => session.id)
        );
        setExpandedSessions(openSessions);
      }
    }
  }, [moduleId]);

  const toggleSessionExpansion = (sessionId: number) => {
    const newExpanded = new Set(expandedSessions);
    if (newExpanded.has(sessionId)) {
      newExpanded.delete(sessionId);
    } else {
      newExpanded.add(sessionId);
    }
    setExpandedSessions(newExpanded);
  };

  const handleSessionToggle = (sessionId: number, currentStatus: boolean) => {
    if (moduleId) {
      const newExpanded = new Set(expandedSessions);
      
      if (!currentStatus) {
        console.log('Completing session:', sessionId);
        dataService.completeSession(parseInt(moduleId), sessionId);
        
      
        newExpanded.delete(sessionId);
      } else {
        // Desmarcando a sessão (tornar incompleta)
        console.log('Uncompleting session:', sessionId);
        dataService.uncompleteSession(parseInt(moduleId), sessionId);
        
        // Expandir a sessão quando desmarcar
        newExpanded.add(sessionId);
      }
      
      setExpandedSessions(newExpanded);
      
      // Refresh data
      const updatedModule = dataService.getModule(parseInt(moduleId));
      setModule(updatedModule || null);
    }
  };

  const handleTestClick = () => {
    if (moduleId && module && dataService.isModuleReadyForTest(module.id)) {
      window.history.pushState(null, '', `/test/${moduleId}`);
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  };

  if (!user || !module) {
    return <div style={{ color: '#ffffff', padding: '32px' }}>Carregando...</div>;
  }

  const isReadyForTest = dataService.isModuleReadyForTest(module.id);
  const completedSessions = user.progress.sessionProgress[module.id]?.length || 0;

  return (
    <Content>
      <ModuleHeader>
        <ModuleTitle>{module.title}</ModuleTitle>
        <ModuleDescription>{module.description}</ModuleDescription>
        <div style={{ marginTop: '16px', color: '#e2e8f0' }}>
          Progresso: {completedSessions} de {module.sessions.length} sessões concluídas
        </div>
      </ModuleHeader>

      <SessionsContainer>
        {module.sessions.map((session: Session) => {
          const isExpanded = expandedSessions.has(session.id);
          
          return (
            <SessionCard 
              key={session.id} 
              $isCompleted={session.isCompleted}
              onClick={() => toggleSessionExpansion(session.id)}
            >
              <SessionHeader>
                <SessionTitle>
                  <span style={{ 
                    transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)',
                    transition: 'transform 0.2s ease',
                    fontSize: '14px',
                    color: '#a0aec0'
                  }}>
                    ▶
                  </span>
                  {session.title}
                </SessionTitle>
                <SessionStatus>
                  {!session.isCompleted && <span>Concluir</span>}
                  <CustomCheckbox
                    $isCompleted={session.isCompleted}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSessionToggle(session.id, session.isCompleted);
                    }}
                  />
                </SessionStatus>
              </SessionHeader>
              
              <CollapsibleContent $isVisible={isExpanded}>
                <SessionContent $isVisible={true}>{session.content}</SessionContent>
                
                {session.practicalExample && (
                  <div>
                    <strong>Exemplo prático:</strong>
                    <CodeBlock>{session.practicalExample}</CodeBlock>
                  </div>
                )}
                
                {session.practicalActivity && (
                  <div style={{ background: '#2d3748', padding: '16px', borderRadius: '8px', marginTop: '16px', border: '1px solid #4a5568' }}>
                    <strong style={{ color: '#fbbf24' }}>Atividade prática:</strong>
                    <div style={{ marginTop: '8px', color: '#e2e8f0' }}>{session.practicalActivity}</div>
                  </div>
                )}
              </CollapsibleContent>
            </SessionCard>
          );
        })}
      </SessionsContainer>

      <TestButton 
        $isEnabled={isReadyForTest}
        onClick={handleTestClick}
      >
        {isReadyForTest ? 'Fazer Teste do Módulo' : `Complete todas as sessões para fazer o teste (${completedSessions}/${module.sessions.length})`}
      </TestButton>
    </Content>
  );
};

export default ModulesPage;
