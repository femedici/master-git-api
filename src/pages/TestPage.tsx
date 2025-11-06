import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import dataService from '../services/dataService';
import { User, Test, Question, TestResult } from '../types';

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
  background: #f5faff;
`;

const TestHeader = styled.div`
  background: white;
  padding: 32px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 32px;
`;

const TestTitle = styled.h2`
  font-size: 28px;
  color: #1a202c;
  margin-bottom: 8px;
`;

const TestInfo = styled.p`
  color: #4a5568;
  font-size: 16px;
  line-height: 1.6;
`;

const QuestionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const QuestionCard = styled.div`
  background: white;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const QuestionNumber = styled.div`
  color: #ff6742;
  font-weight: 600;
  margin-bottom: 8px;
`;

const QuestionText = styled.h3`
  font-size: 18px;
  color: #1a202c;
  margin-bottom: 16px;
  line-height: 1.5;
`;

const OptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const OptionLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  cursor: pointer;
  transition: border-color 0.2s;

  &:hover {
    border-color: #ff6742;
  }
`;

const OptionRadio = styled.input`
  width: 16px;
  height: 16px;
`;

const CodeInputContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: 'Courier New', monospace;
  font-size: 16px;
`;

const CodePrefix = styled.span`
  background: #1a202c;
  color: #e2e8f0;
  padding: 8px 12px;
  border-radius: 4px 0 0 4px;
`;

const CodeInput = styled.input`
  padding: 8px 12px;
  border: 2px solid #e2e8f0;
  border-left: none;
  border-radius: 0 4px 4px 0;
  font-family: 'Courier New', monospace;
  font-size: 16px;
  min-width: 200px;

  &:focus {
    outline: none;
    border-color: #ff6742;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  min-height: 120px;
  padding: 12px;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 16px;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: #ff6742;
  }
`;

const SubmitButton = styled.button`
  background: #ff6742;
  color: white;
  border: none;
  padding: 16px 24px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
  margin-top: 32px;

  &:hover {
    background: #ff8565;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const ResultContainer = styled.div<{ $passed: boolean }>`
  background: ${props => props.$passed ? '#c6f6d5' : '#fed7d7'};
  color: ${props => props.$passed ? '#22543d' : '#c53030'};
  padding: 24px;
  border-radius: 12px;
  margin-top: 32px;
  text-align: center;
`;

const ResultTitle = styled.h3`
  font-size: 24px;
  margin-bottom: 16px;
`;

const ResultScore = styled.div`
  font-size: 48px;
  font-weight: bold;
  margin-bottom: 16px;
`;

const BackButton = styled.button`
  background: #4a5568;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 16px;

  &:hover {
    background: #2d3748;
  }
`;

const TestPage = () => {
  const { moduleId } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [test, setTest] = useState<Test | null>(null);
  const [answers, setAnswers] = useState<{ [questionId: number]: string }>({});
  const [result, setResult] = useState<TestResult | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (moduleId) {
      const currentUser = dataService.getCurrentUser();
      const testData = dataService.getTest(parseInt(moduleId));
      setUser(currentUser);
      setTest(testData || null);
    }
  }, [moduleId]);

  const handleAnswerChange = (questionId: number, answer: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleSubmit = async () => {
    if (!test) return;

    setIsSubmitting(true);
    try {
      const testResult = dataService.submitTest(test.id, answers);
      setResult(testResult);
    } catch (error) {
      console.error('Erro ao submeter teste:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackClick = () => {
    if (result?.passed) {
      navigate('/home');
    } else {
      navigate(`/module/${moduleId}`);
    }
  };

  if (!user || !test) {
    return <div>Carregando...</div>;
  }

  if (result) {
    return (
      <PageContainer>
        <Sidebar 
          currentModule={user.progress.currentModule}
          completedModules={user.progress.completedModules}
        />
        <MainContent>
          <Header title={test.title} userName={user.name} />
          <Content>
            <ResultContainer $passed={result.passed}>
              <ResultTitle>
                {result.passed ? '🎉 Parabéns! Você foi aprovado!' : '😔 Você não foi aprovado'}
              </ResultTitle>
              <ResultScore>{result.score}%</ResultScore>
              <div>
                {result.passed ? 
                  'Você atingiu a nota mínima de 60% e pode prosseguir para o próximo módulo!' :
                  'Você precisa de pelo menos 60% para ser aprovado. Revise o conteúdo e tente novamente.'
                }
              </div>
              {result.pendingValidation.length > 0 && (
                <div style={{ marginTop: '16px', fontSize: '14px' }}>
                  {result.pendingValidation.length} questão(ões) descritiva(s) em validação (considerada(s) correta(s) para o cálculo)
                </div>
              )}
              <BackButton onClick={handleBackClick}>
                {result.passed ? 'Voltar ao Dashboard' : 'Voltar ao Módulo'}
              </BackButton>
            </ResultContainer>
          </Content>
        </MainContent>
      </PageContainer>
    );
  }

  const isFormValid = test.questions.every(q => answers[q.id]?.trim());

  return (
    <PageContainer>
      <Sidebar 
        currentModule={user.progress.currentModule}
        completedModules={user.progress.completedModules}
      />
      <MainContent>
        <Header title={test.title} userName={user.name} />
        <Content>
          <TestHeader>
            <TestTitle>{test.title}</TestTitle>
            <TestInfo>
              Responda todas as questões com atenção. Você precisa de 60% ou mais para ser aprovado.
              Questões descritivas serão validadas posteriormente.
            </TestInfo>
          </TestHeader>

          <QuestionsContainer>
            {test.questions.map((question: Question, index: number) => (
              <QuestionCard key={question.id}>
                <QuestionNumber>Questão {index + 1}</QuestionNumber>
                <QuestionText>{question.question}</QuestionText>

                {question.type === 'multiple-choice' && (
                  <OptionsContainer>
                    {question.options?.map((option, optionIndex) => (
                      <OptionLabel key={optionIndex}>
                        <OptionRadio
                          type="radio"
                          name={`question-${question.id}`}
                          value={option}
                          onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                        />
                        <span>{option}</span>
                      </OptionLabel>
                    ))}
                  </OptionsContainer>
                )}

                {question.type === 'code-completion' && (
                  <CodeInputContainer>
                    <CodePrefix>{question.codePrefix}</CodePrefix>
                    <CodeInput
                      type="text"
                      placeholder="complete o comando..."
                      onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                    />
                  </CodeInputContainer>
                )}

                {question.type === 'descriptive' && (
                  <TextArea
                    placeholder="Digite sua resposta..."
                    onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                  />
                )}
              </QuestionCard>
            ))}
          </QuestionsContainer>

          <SubmitButton 
            onClick={handleSubmit}
            disabled={!isFormValid || isSubmitting}
          >
            {isSubmitting ? 'Enviando...' : 'Finalizar Teste'}
          </SubmitButton>
        </Content>
      </MainContent>
    </PageContainer>
  );
};

export default TestPage;