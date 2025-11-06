import { User } from '../../types';

export const mockUser: User = {
  id: '1',
  name: 'João Silva',
  email: 'joao@email.com',
  progress: {
    currentModule: 1,
    completedModules: [],
    sessionProgress: {
      1: [], // no sessions completed in module 1
      2: [],
      3: []
    }
  }
};