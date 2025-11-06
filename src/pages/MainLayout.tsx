import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import CompletionModal from '../components/CompletionModal';
import dataService from '../services/dataService';
import { User } from '../types';

// Import content components
import HomeContent from './content/HomeContent';
import ModuleContent from './content/ModuleContent';
import TestContent from './content/TestContent';

const PageContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background: #0f1c29;
`;

const MainContent = styled.div`
  margin-left: 280px;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const ContentWrapper = styled.div`
  flex: 1;
  transition: opacity 0.3s ease-in-out;
`;

const MainLayout = () => {
  const location = useLocation();
  const params = useParams();
  const [user, setUser] = useState<User | null>(null);
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');

  useEffect(() => {
    const currentUser = dataService.getCurrentUser();
    setUser(currentUser);

    // Check if course is completed and show modal
    if (dataService.isCourseCompleted() && !localStorage.getItem('mastergit-completion-shown')) {
      setShowCompletionModal(true);
      localStorage.setItem('mastergit-completion-shown', 'true');
    }
  }, []);

  useEffect(() => {
    // Determine current page based on URL
    const path = location.pathname;
    if (path === '/home') {
      setCurrentPage('home');
    } else if (path.startsWith('/module')) {
      setCurrentPage('module');
    } else if (path.startsWith('/test')) {
      setCurrentPage('test');
    }
  }, [location]);

  const getPageTitle = () => {
    switch (currentPage) {
      case 'home':
        return 'Dashboard';
      case 'module':
        const module = dataService.getModule(parseInt(params.moduleId || '1'));
        return module?.title || 'Módulo';
      case 'test':
        const test = dataService.getTest(parseInt(params.moduleId || '1'));
        return test?.title || 'Teste';
      default:
        return 'MasterGit';
    }
  };

  const renderContent = () => {
    switch (currentPage) {
      case 'home':
        return <HomeContent user={user} onShowCompletionModal={() => setShowCompletionModal(true)} />;
      case 'module':
        return <ModuleContent moduleId={params.moduleId} user={user} />;
      case 'test':
        return <TestContent moduleId={params.moduleId} user={user} onShowCompletionModal={() => setShowCompletionModal(true)} />;
      default:
        return <HomeContent user={user} onShowCompletionModal={() => setShowCompletionModal(true)} />;
    }
  };

  const handleCloseCompletionModal = () => {
    setShowCompletionModal(false);
  };

  if (!user) {
    return (
      <PageContainer>
        <div style={{ color: '#ffffff', padding: '32px' }}>Carregando...</div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <Sidebar 
        currentModule={user.progress.currentModule}
        completedModules={user.progress.completedModules}
      />
      <MainContent>
        <Header title={getPageTitle()} userName={user.name} />
        <ContentWrapper>
          {renderContent()}
        </ContentWrapper>
      </MainContent>
      
      {showCompletionModal && (
        <CompletionModal 
          onClose={handleCloseCompletionModal} 
          userName={user.name} 
        />
      )}
    </PageContainer>
  );
};

export default MainLayout;