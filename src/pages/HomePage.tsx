import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { BookOpen, Laptop, Settings } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import CompletionModal from '../components/CompletionModal';
import dataService from '../services/dataService';
import { User, Module } from '../types';

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

const WelcomeSection = styled.div`
  background: #1a2332;
  padding: 32px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  margin-bottom: 32px;
  border: 1px solid #2d3748;
`;

const WelcomeTitle = styled.h2`
  font-size: 28px;
  color: #ffffff;
  margin-bottom: 8px;
`;

const WelcomeText = styled.p`
  color: #e2e8f0;
  font-size: 16px;
  line-height: 1.6;
`;

const ProgressSection = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 32px;
  margin-bottom: 32px;
`;

const ProgressCard = styled.div`
  background: #1a2332;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  border: 1px solid #2d3748;
`;

const CardTitle = styled.h3`
  font-size: 20px;
  color: #ffffff;
  margin-bottom: 16px;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background: #2d3748;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 16px;
`;

const ProgressFill = styled.div<{ $progress: number }>`
  width: ${props => props.$progress}%;
  height: 100%;
  background: #ff6742;
  transition: width 0.3s ease;
`;

const ModulesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
`;

const ModuleCard = styled.div<{ $isLocked: boolean }>`
  background: #1a2332;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  border: 1px solid #2d3748;
  cursor: ${props => props.$isLocked ? 'not-allowed' : 'pointer'};
  opacity: ${props => props.$isLocked ? '0.6' : '1'};
  transition: transform 0.2s, opacity 0.2s;

  &:hover {
    transform: ${props => props.$isLocked ? 'none' : 'translateY(-4px)'};
    border-color: ${props => props.$isLocked ? '#2d3748' : '#ff6742'};
  }
`;

const ModuleIcon = styled.div`
  font-size: 24px;
  margin-bottom: 16px;
`;

const ModuleTitle = styled.h4`
  font-size: 18px;
  color: #ffffff;
  margin-bottom: 8px;
`;

const ModuleDescription = styled.p`
  color: #e2e8f0;
  margin-bottom: 16px;
  font-size: 14px;
`;

const ModuleProgress = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StatusBadge = styled.span<{ $status: 'completed' | 'current' | 'locked' }>`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  background: ${props => {
    switch (props.$status) {
      case 'completed': return '#22543d';
      case 'current': return '#c05621';
      case 'locked': return '#2d3748';
      default: return '#2d3748';
    }
  }};
  color: ${props => {
    switch (props.$status) {
      case 'completed': return '#c6f6d5';
      case 'current': return '#fef5e7';
      case 'locked': return '#a0aec0';
      default: return '#a0aec0';
    }
  }};
`;

const HomePage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [modules, setModules] = useState<Module[]>([]);
  const [showCompletionModal, setShowCompletionModal] = useState(false);

  useEffect(() => {
    const currentUser = dataService.getCurrentUser();
    const allModules = dataService.getAllModules();
    setUser(currentUser);
    setModules(allModules);

    // Check if course is completed and show modal
    if (dataService.isCourseCompleted() && !localStorage.getItem('mastergit-completion-shown')) {
      setShowCompletionModal(true);
      localStorage.setItem('mastergit-completion-shown', 'true');
    }
  }, []);

  if (!user) {
    return <div>Carregando...</div>;
  }

  const totalModules = modules.length;
  const completedModules = user.progress.completedModules.length;
  const overallProgress = totalModules > 0 ? (completedModules / totalModules) * 100 : 0;

  const getModuleStatus = (module: Module) => {
    if (user.progress.completedModules.includes(module.id)) {
      return 'completed';
    }
    if (module.id === user.progress.currentModule) {
      return 'current';
    }
    return 'locked';
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return 'Concluído';
      case 'current': return 'Em progresso';
      case 'locked': return 'Bloqueado';
      default: return 'Bloqueado';
    }
  };

  const handleCloseCompletionModal = () => {
    setShowCompletionModal(false);
  };

  return (
    <PageContainer>
      <Sidebar 
        currentModule={user.progress.currentModule}
        completedModules={user.progress.completedModules}
      />
      <MainContent>
        <Header title="Dashboard" userName={user.name} />
        <Content>
          <WelcomeSection>
            <WelcomeTitle>Bem-vindo ao MasterGit, {user.name}!</WelcomeTitle>
            <WelcomeText>
              Continue sua jornada de aprendizado do Git. Você está progredindo muito bem! 
              Complete as sessões de cada módulo e faça os testes para desbloquear novos conteúdos.
            </WelcomeText>
          </WelcomeSection>

          <ProgressSection>
            <ProgressCard>
              <CardTitle>Seu Progresso Geral</CardTitle>
              <ProgressBar>
                <ProgressFill $progress={overallProgress} />
              </ProgressBar>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: '#e2e8f0' }}>
                <span>{completedModules} de {totalModules} módulos concluídos</span>
                <span>{Math.round(overallProgress)}%</span>
              </div>
            </ProgressCard>

            <ProgressCard>
              <CardTitle>Próximo Objetivo</CardTitle>
              <p style={{ color: '#e2e8f0', margin: 0 }}>
                {user.progress.currentModule <= totalModules ? 
                  `Concluir Módulo ${user.progress.currentModule}` : 
                  'Todos os módulos concluídos! 🎉'
                }
              </p>
            </ProgressCard>
          </ProgressSection>

          <CardTitle>Módulos do Curso</CardTitle>
          <ModulesGrid>
            {modules.map(module => {
              const status = getModuleStatus(module);
              const completedSessions = user.progress.sessionProgress[module.id]?.length || 0;
              const totalSessions = module.sessions.length;
              const moduleProgress = totalSessions > 0 ? (completedSessions / totalSessions) * 100 : 0;

              return (
                <ModuleCard 
                  key={module.id} 
                  $isLocked={module.isLocked}
                  onClick={() => !module.isLocked && (window.location.href = `/module/${module.id}`)}
                >
                  <ModuleIcon>
                    {module.id === 1 ? <BookOpen size={22} /> : module.id === 2 ? <Laptop size={22} /> : <Settings size={22} />}
                  </ModuleIcon>
                  <ModuleTitle>{module.title}</ModuleTitle>
                  <ModuleDescription>{module.description}</ModuleDescription>
                  
                  <div style={{ marginBottom: '12px' }}>
                    <ProgressBar>
                      <ProgressFill $progress={moduleProgress} />
                    </ProgressBar>
                    <div style={{ fontSize: '12px', color: '#e2e8f0' }}>
                      {completedSessions} de {totalSessions} sessões
                    </div>
                  </div>

                  <ModuleProgress>
                    <StatusBadge $status={status as any}>
                      {getStatusText(status)}
                    </StatusBadge>
                  </ModuleProgress>
                </ModuleCard>
              );
            })}
          </ModulesGrid>
        </Content>
      </MainContent>
      
      {showCompletionModal && (
        <CompletionModal 
          onClose={handleCloseCompletionModal} 
          userName={user?.name || 'Usuário'} 
        />
      )}
    </PageContainer>
  );
};

export default HomePage;