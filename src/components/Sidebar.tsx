import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const SidebarContainer = styled.div`
  width: 280px;
  height: 100vh;
  background: linear-gradient(180deg, #ff6742 0%, #ff8565 100%);
  color: white;
  padding: 24px;
  box-sizing: border-box;
  position: fixed;
  left: 0;
  top: 0;
  overflow-y: auto;
`;

const Logo = styled.h1`
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 32px;
  text-align: center;
`;

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const NavItem = styled(Link)<{ $isActive?: boolean; $isLocked?: boolean }>`
  display: flex;
  align-items: center;
  padding: 12px 16px;
  border-radius: 8px;
  color: white;
  text-decoration: none;
  background: ${props => props.$isActive ? 'rgba(255, 255, 255, 0.2)' : 'transparent'};
  opacity: ${props => props.$isLocked ? '0.5' : '1'};
  pointer-events: ${props => props.$isLocked ? 'none' : 'auto'};
  transition: background-color 0.2s;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
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

  return (
    <SidebarContainer>
      <Logo>🎓 MasterGit</Logo>
      <Nav>
        <NavItem to="/home" $isActive={true}>
          <NavIcon>🏠</NavIcon>
          Dashboard
        </NavItem>
        
        <NavItem 
          to="/module/1" 
          $isActive={currentModule === 1}
          $isLocked={false}
        >
          <NavIcon>📘</NavIcon>
          Módulo 1 - O que é Git?
        </NavItem>
        
        <NavItem 
          to="/module/2" 
          $isActive={currentModule === 2}
          $isLocked={!completedModules.includes(1)}
        >
          <NavIcon>💻</NavIcon>
          Módulo 2 - Como usar Git
        </NavItem>
        
        <NavItem 
          to="/module/3" 
          $isActive={currentModule === 3}
          $isLocked={!completedModules.includes(2)}
        >
          <NavIcon>⚙️</NavIcon>
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