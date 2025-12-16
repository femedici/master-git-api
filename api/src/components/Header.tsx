import styled from 'styled-components';

const HeaderContainer = styled.header`
  height: 70px;
  background: #1a2332;
  border-bottom: 1px solid #2d3748;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 32px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
`;

const PageTitle = styled.h1`
  font-size: 24px;
  color: #ffffff;
  font-weight: 600;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const UserName = styled.span`
  color: #e2e8f0;
  font-weight: 500;
`;

const UserAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #ff6742;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
`;

interface HeaderProps {
  title: string;
  userName?: string;
}

const Header = ({ title, userName = 'Usuário' }: HeaderProps) => {
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <HeaderContainer>
      <PageTitle>{title}</PageTitle>
      <UserInfo>
        <UserName>{userName}</UserName>
        <UserAvatar>{getInitials(userName)}</UserAvatar>
      </UserInfo>
    </HeaderContainer>
  );
};

export default Header;