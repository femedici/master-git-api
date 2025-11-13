import { User } from '../../types';

export const mockUser: User = {
  id: '1',
  name: 'Felipe Medici',
  email: 'fe@gmail.com',
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