import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import dataService from "../services/dataService";

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  background: #0f1c29;
`;

const ImageSection = styled.div`
  flex: 1;
  background: linear-gradient(135deg, #4a5568 0%, #2d3748 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="20" cy="20" r="2" fill="rgba(255,255,255,0.1)"/><circle cx="80" cy="40" r="3" fill="rgba(255,255,255,0.1)"/><circle cx="40" cy="80" r="2" fill="rgba(255,255,255,0.1)"/></svg>');
  }
`;

const Logo = styled.div`
  color: white;
  text-align: center;
  z-index: 1;
`;

const LogoTitle = styled.h1`
  font-size: 48px;
  font-weight: bold;
  margin-bottom: 16px;
`;

const LogoSubtitle = styled.p`
  font-size: 18px;
  opacity: 0.9;
  max-width: 300px;
`;

const LogoImage = styled.img`
  width: 120px;
  height: 120px;
  margin-bottom: 24px;
`;

const FormSection = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 32px;
  background: #0f1c29;
`;

const FormContainer = styled.div`
  width: 100%;
  max-width: 400px;
`;

const FormTitle = styled.h2`
  font-size: 32px;
  color: #ffffff;
  margin-bottom: 8px;
  text-align: center;
`;

const FormSubtitle = styled.p`
  color: #e2e8f0;
  margin-bottom: 32px;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  color: #ffffff;
  font-weight: 500;
`;

const Input = styled.input`
  padding: 12px 16px;
  border: 2px solid #2d3748;
  border-radius: 8px;
  font-size: 16px;
  background: #1a2332;
  color: #ffffff;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: #ff6742;
  }
`;

const Button = styled.button`
  background: #ff6742;
  color: white;
  border: none;
  padding: 14px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background: #ff8565;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const ToggleButton = styled.button`
  background: none;
  border: none;
  color: #ff6742;
  cursor: pointer;
  font-weight: 500;
  text-decoration: underline;

  &:hover {
    color: #ff8565;
  }
`;

const ErrorMessage = styled.div`
  background: #fed7d7;
  color: #c53030;
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 16px;
`;

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isLogin) {
        await dataService.login(formData.email, formData.password);
      } else {
        if (formData.password !== formData.confirmPassword) {
          setError("Senhas não coincidem");
          return;
        }
        await dataService.register(
          formData.name,
          formData.email,
          formData.password
        );
      }
      navigate("/home");
    } catch (err) {
      setError("Erro ao fazer login. Verifique suas credenciais.");
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setError("");
    setFormData({ name: "", email: "", password: "", confirmPassword: "" });
  };

  return (
    <Container>
      <ImageSection>
        <Logo>
          <LogoImage src="/git-icon.svg" alt="Git Logo" />
          <LogoTitle>MasterGit</LogoTitle>
          <LogoSubtitle>
            Domine o Git do básico ao avançado com nosso sistema de aprendizagem
            completo
          </LogoSubtitle>
        </Logo>
      </ImageSection>

      <FormSection>
        <FormContainer>
          <FormTitle>{isLogin ? "Entrar" : "Cadastrar"}</FormTitle>
          <FormSubtitle>
            {isLogin
              ? "Acesse sua conta para continuar aprendendo"
              : "Crie sua conta e comece sua jornada"}
          </FormSubtitle>

          {error && <ErrorMessage>{error}</ErrorMessage>}

          <Form onSubmit={handleSubmit}>
            {!isLogin && (
              <FormGroup>
                <Label htmlFor="name">Nome completo</Label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required={!isLogin}
                />
              </FormGroup>
            )}

            <FormGroup>
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="password">Senha</Label>
              <Input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </FormGroup>

            {!isLogin && (
              <FormGroup>
                <Label htmlFor="confirmPassword">Confirmar senha</Label>
                <Input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required={!isLogin}
                />
              </FormGroup>
            )}

            <Button type="submit" disabled={loading}>
              {loading ? "Carregando..." : isLogin ? "Entrar" : "Cadastrar"}
            </Button>
          </Form>

          <div style={{ textAlign: "center", marginTop: "24px", color: "#e2e8f0" }}>
            {isLogin ? "Não tem uma conta? " : "Já tem uma conta? "}
            <ToggleButton onClick={toggleMode}>
              {isLogin ? "Cadastre-se" : "Faça login"}
            </ToggleButton>
          </div>
        </FormContainer>
      </FormSection>
    </Container>
  );
};

export default LoginPage;
