import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Home, BookOpen, Terminal, Settings } from 'lucide-react';

const SidebarContainer = styled.div`
  width: 280px;
  height: 100vh;
  background: linear-gradient(180deg, #4a5568 0%, #2d3748 100%);
  color: white;
  padding: 24px;
  box-sizing: border-box;
  position: fixed;
  left: 0;
  top: 0;
  overflow-y: auto;
`;

const Logo = styled.div`
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 32px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
`;

const LogoImage = styled.img`
  width: 32px;
  height: 32px;
  filter: brightness(0) invert(1);
`;

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const NavItem = styled.div<{ $isActive?: boolean; $isLocked?: boolean }>`
  display: flex;
  align-items: center;
  padding: 12px 16px;
  border-radius: 8px;
  color: white;
  cursor: ${props => props.$isLocked ? 'not-allowed' : 'pointer'};
  background: ${props => props.$isActive ? 'rgba(255, 255, 255, 0.2)' : 'transparent'};
  opacity: ${props => props.$isLocked ? '0.5' : '1'};
  pointer-events: ${props => props.$isLocked ? 'none' : 'auto'};
  transition: background-color 0.2s;

  &:hover {
    background: ${props => props.$isLocked ? 'transparent' : 'rgba(255, 255, 255, 0.1)'};
  }
`;

const NavIcon = styled.span`
  margin-right: 12px;
  font-size: 18px;
`;

interface SidebarProps {
  currentModule?: number;
  completedModules?: number[];
}

const Sidebar = ({ currentModule, completedModules = [] }: SidebarProps) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login');
  };

  const handleNavigation = (path: string, isLocked = false) => {
    if (!isLocked) {
      navigate(path);
    }
  };

  return (
    <SidebarContainer>
      <Logo>
        <LogoImage src="/git-icon.svg" alt="Git Logo" />
        MasterGit
      </Logo>
      <Nav>
        <NavItem 
          $isActive={window.location.pathname === '/home'}
          onClick={() => handleNavigation('/home')}
        >
          <NavIcon><Home size={18} /></NavIcon>
          Dashboard
        </NavItem>
        
        <NavItem 
          $isActive={currentModule === 1}
          $isLocked={false}
          onClick={() => handleNavigation('/module/1')}
        >
          <NavIcon><BookOpen size={18} /></NavIcon>
          Módulo 1 - O que é Git?
        </NavItem>
        
        <NavItem 
          $isActive={currentModule === 2}
          $isLocked={!completedModules.includes(1)}
          onClick={() => handleNavigation('/module/2', !completedModules.includes(1))}
        >
          <NavIcon><Terminal size={18} /></NavIcon>
          Módulo 2 - Como usar Git
        </NavItem>
        
        <NavItem 
          $isActive={currentModule === 3}
          $isLocked={!completedModules.includes(2)}
          onClick={() => handleNavigation('/module/3', !completedModules.includes(2))}
        >
          <NavIcon><Settings size={18} /></NavIcon>
          Módulo 3 - Masterizando Git
        </NavItem>
      </Nav>
      
      <div style={{ marginTop: 'auto', paddingTop: '32px' }}>
        <button 
          onClick={handleLogout}
          style={{ 
            width: '100%', 
            background: 'rgba(255, 255, 255, 0.2)', 
            border: 'none',
            color: 'white',
            padding: '12px',
            borderRadius: '8px',
            cursor: 'pointer'
          }}
        >
          Sair
        </button>
      </div>
    </SidebarContainer>
  );
};

export default Sidebar;