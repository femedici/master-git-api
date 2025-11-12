import TestContent from './content/TestContent';
import { User } from '../types';

interface TestPageProps {
  moduleId: string | undefined;
  user: User | null;
  onShowCompletionModal?: () => void;
}

const TestPage: React.FC<TestPageProps> = ({ moduleId, user, onShowCompletionModal }) => {
  return <TestContent moduleId={moduleId} user={user} onShowCompletionModal={onShowCompletionModal} />;
};

export default TestPage;