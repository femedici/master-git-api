import { useState, useEffect } from 'react';
import styled from 'styled-components';
import dataService from '../../services/dataService';
import { User, Test, Question, TestResult } from '../../types';

const Content = styled.div`
  flex: 1;
  padding: 32px;
  background: #0f1c29;
`;

const TestHeader = styled.div`
  background: #1a2332;
  padding: 32px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  border: 1px solid #2d3748;
  margin-bottom: 32px;
`;

const TestTitle = styled.h2`
  font-size: 28px;
  color: #ffffff;
  margin-bottom: 8px;
`;

const TestInfo = styled.p`
  color: #e2e8f0;
  font-size: 16px;
  line-height: 1.6;
`;

const QuestionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const QuestionCard = styled.div`
  background: #1a2332;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  border: 1px solid #2d3748;
`;

const QuestionNumber = styled.div`
  color: #ff6742;
  font-weight: 600;
  margin-bottom: 8px;
`;

const QuestionText = styled.h3`
  font-size: 18px;
  color: #ffffff;
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
  border: 2px solid #2d3748;
  border-radius: 8px;
  cursor: pointer;
  transition: border-color 0.2s;
  color: #e2e8f0;

  &:hover {
    border-color: #ff6742;
    background: #2d3748;
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
  background: #0f1c29;
  color: #e2e8f0;
  padding: 8px 12px;
  border-radius: 4px 0 0 4px;
  border: 2px solid #2d3748;
  border-right: none;
`;

const CodeInput = styled.input`
  padding: 8px 12px;
  border: 2px solid #2d3748;
  border-left: none;
  border-radius: 0 4px 4px 0;
  font-family: 'Courier New', monospace;
  font-size: 16px;
  min-width: 200px;
  background: #0f1c29;
  color: #e2e8f0;

  &:focus {
    outline: none;
    border-color: #ff6742;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  min-height: 120px;
  padding: 12px;
  border: 2px solid #2d3748;
  border-radius: 8px;
  font-size: 16px;
  resize: vertical;
  background: #0f1c29;
  color: #e2e8f0;

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

interface TestContentProps {
  moduleId: string | undefined;
  user: User | null;
  onShowCompletionModal?: () => void;
}

const TestContent: React.FC<TestContentProps> = ({ moduleId, user, onShowCompletionModal }) => {
  const [test, setTest] = useState<Test | null>(null);
  const [answers, setAnswers] = useState<{ [questionId: number]: string }>({});
  const [result, setResult] = useState<TestResult | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (moduleId) {
      const testData = dataService.getTest(parseInt(moduleId));
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
      
      // Check if course is completed after test submission
      if (testResult.passed && dataService.isCourseCompleted() && !localStorage.getItem('mastergit-completion-shown') && onShowCompletionModal) {
        setTimeout(() => {
          onShowCompletionModal();
          localStorage.setItem('mastergit-completion-shown', 'true');
        }, 2000); // Show modal after 2 seconds to let user see the test result first
      }
    } catch (error) {
      console.error('Erro ao submeter teste:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackClick = () => {
    if (result?.passed) {
      window.history.pushState(null, '', '/home');
      window.dispatchEvent(new PopStateEvent('popstate'));
    } else {
      window.history.pushState(null, '', `/module/${moduleId}`);
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  };

  if (!user || !test) {
    return <div style={{ color: '#ffffff', padding: '32px' }}>Carregando...</div>;
  }

  if (result) {
    return (
      <Content>
        <ResultContainer $passed={result.passed}>
          <ResultTitle>
            {result.passed ? 'Parabéns! Você foi aprovado!' : 'Você não foi aprovado'}
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
    );
  }

  const isFormValid = test.questions.every(q => answers[q.id]?.trim());

  return (
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
  );
};

export default TestContent;