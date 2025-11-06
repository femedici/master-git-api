import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import dataService from '../services/dataService';
import { User, Module, Session } from '../types';

const PageContainer = styled.div`
  display: flex;
  min-height: 100vh;
`;

const MainContent = styled.div`
  margin-left: 280px;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

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
`;

const SessionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const SessionTitle = styled.h3`
  font-size: 20px;
  color: #ffffff;
`;

const SessionStatus = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Checkbox = styled.input`
  width: 20px;
  height: 20px;
  cursor: pointer;
`;

const SessionContent = styled.div`
  color: #e2e8f0;
  line-height: 1.6;
  margin-bottom: 16px;
  white-space: pre-wrap;
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

const ModulesPage = () => {
  const { moduleId } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [module, setModule] = useState<Module | null>(null);

  useEffect(() => {
    if (moduleId) {
      const currentUser = dataService.getCurrentUser();
      const moduleData = dataService.getModule(parseInt(moduleId));
      setUser(currentUser);
      setModule(moduleData || null);
    }
  }, [moduleId]);

  const handleSessionToggle = (sessionId: number, isCompleted: boolean) => {
    if (isCompleted && moduleId) {
      dataService.completeSession(parseInt(moduleId), sessionId);
      // Refresh data
      const updatedUser = dataService.getCurrentUser();
      const updatedModule = dataService.getModule(parseInt(moduleId));
      setUser(updatedUser);
      setModule(updatedModule || null);
    }
  };

  const handleTestClick = () => {
    if (moduleId && module && dataService.isModuleReadyForTest(module.id)) {
      navigate(`/test/${moduleId}`);
    }
  };

  if (!user || !module) {
    return <div>Carregando...</div>;
  }

  const isReadyForTest = dataService.isModuleReadyForTest(module.id);
  const completedSessions = user.progress.sessionProgress[module.id]?.length || 0;

  return (
    <PageContainer>
      <Sidebar 
        currentModule={user.progress.currentModule}
        completedModules={user.progress.completedModules}
      />
      <MainContent>
        <Header title={module.title} userName={user.name} />
        <Content>
          <ModuleHeader>
            <ModuleTitle>{module.title}</ModuleTitle>
            <ModuleDescription>{module.description}</ModuleDescription>
            <div style={{ marginTop: '16px', color: '#e2e8f0' }}>
              Progresso: {completedSessions} de {module.sessions.length} sessões concluídas
            </div>
          </ModuleHeader>

          <SessionsContainer>
            {module.sessions.map((session: Session) => (
              <SessionCard key={session.id} $isCompleted={session.isCompleted}>
                <SessionHeader>
                  <SessionTitle>{session.title}</SessionTitle>
                  <SessionStatus>
                    <span>Concluída</span>
                    <Checkbox
                      type="checkbox"
                      checked={session.isCompleted}
                      onChange={(e) => handleSessionToggle(session.id, e.target.checked)}
                    />
                  </SessionStatus>
                </SessionHeader>
                
                <SessionContent>{session.content}</SessionContent>
                
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
              </SessionCard>
            ))}
          </SessionsContainer>

          <TestButton 
            $isEnabled={isReadyForTest}
            onClick={handleTestClick}
          >
            {isReadyForTest ? 'Fazer Teste do Módulo' : `Complete todas as sessões para fazer o teste (${completedSessions}/${module.sessions.length})`}
          </TestButton>
        </Content>
      </MainContent>
    </PageContainer>
  );
};

export default ModulesPage;