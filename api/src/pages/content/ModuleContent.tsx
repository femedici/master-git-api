import ModulesPage from '../ModulesPage';
import { User } from '../../types';

interface ModuleContentProps {
  moduleId: string | undefined;
  user: User | null;
}

const ModuleContent: React.FC<ModuleContentProps> = ({ moduleId, user }) => {
  return <ModulesPage moduleId={moduleId} user={user} />;
};

export default ModuleContent;