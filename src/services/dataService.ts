import { Module, Test, User, TestResult } from '../types';
import { module1 } from './mockedData/module1';
import { module2 } from './mockedData/module2';
import { module3 } from './mockedData/module3';
import { testModule1 } from './mockedData/testModule1';
import { testModule2 } from './mockedData/testModule2';
import { testModule3 } from './mockedData/testModule3';
import { mockUser } from './mockedData/userData';

class DataService {
  private modules: Module[] = [module1, module2, module3];
  private tests: Test[] = [testModule1, testModule2, testModule3];
  private currentUser: User = { ...mockUser };

  constructor() {
    // Load progress from localStorage if available
    this.loadProgressFromStorage();
  }

  private saveProgressToStorage(): void {
    localStorage.setItem('mastergit-progress', JSON.stringify(this.currentUser.progress));
  }

  private loadProgressFromStorage(): void {
    const savedProgress = localStorage.getItem('mastergit-progress');
    if (savedProgress) {
      try {
        this.currentUser.progress = JSON.parse(savedProgress);
      } catch (error) {
        console.error('Error loading progress from storage:', error);
      }
    }
  }

  // User methods
  getCurrentUser(): User {
    return this.currentUser;
  }

  updateUser(user: User): void {
    this.currentUser = { ...user };
  }

  // Module methods
  getAllModules(): Module[] {
    return this.modules.map(module => ({
      ...module,
      isLocked: this.isModuleLocked(module.id)
    }));
  }

  getModule(moduleId: number): Module | undefined {
    const module = this.modules.find(m => m.id === moduleId);
    if (module) {
      return {
        ...module,
        isLocked: this.isModuleLocked(moduleId),
        sessions: module.sessions.map(session => ({
          ...session,
          isCompleted: this.isSessionCompleted(moduleId, session.id)
        }))
      };
    }
    return undefined;
  }

  private isModuleLocked(moduleId: number): boolean {
    if (moduleId === 1) return false; // First module is always unlocked
    return !this.currentUser.progress.completedModules.includes(moduleId - 1);
  }

  private isSessionCompleted(moduleId: number, sessionId: number): boolean {
    return this.currentUser.progress.sessionProgress[moduleId]?.includes(sessionId) || false;
  }

  completeSession(moduleId: number, sessionId: number): void {
    if (!this.currentUser.progress.sessionProgress[moduleId]) {
      this.currentUser.progress.sessionProgress[moduleId] = [];
    }
    
    if (!this.currentUser.progress.sessionProgress[moduleId].includes(sessionId)) {
      this.currentUser.progress.sessionProgress[moduleId].push(sessionId);
      this.saveProgressToStorage(); // Save progress after completing session
    }
  }

  uncompleteSession(moduleId: number, sessionId: number): void {
    if (this.currentUser.progress.sessionProgress[moduleId]) {
      this.currentUser.progress.sessionProgress[moduleId] = 
        this.currentUser.progress.sessionProgress[moduleId].filter(id => id !== sessionId);
      this.saveProgressToStorage(); // Save progress after uncompleting session
    }
  }

  isModuleReadyForTest(moduleId: number): boolean {
    const module = this.modules.find(m => m.id === moduleId);
    if (!module) return false;
    
    const completedSessions = this.currentUser.progress.sessionProgress[moduleId] || [];
    return completedSessions.length === module.sessions.length;
  }

  isCourseCompleted(): boolean {
    return this.currentUser.progress.completedModules.length === this.modules.length;
  }

  // Test methods
  getTest(moduleId: number): Test | undefined {
    return this.tests.find(t => t.moduleId === moduleId);
  }

  submitTest(testId: number, answers: { [questionId: number]: string }): TestResult {
    const test = this.tests.find(t => t.id === testId);
    if (!test) {
      throw new Error('Test not found');
    }

    let correctAnswers = 0;
    let totalQuestions = test.questions.length;
    let pendingValidation: number[] = [];

    test.questions.forEach(question => {
      const userAnswer = answers[question.id];
      if (question.type === 'descriptive') {
        pendingValidation.push(question.id);
        correctAnswers++; // Count descriptive as correct for percentage calculation
      } else if (userAnswer === question.correctAnswer) {
        correctAnswers++;
      }
    });

    const score = Math.round((correctAnswers / totalQuestions) * 100);
    const passed = score >= 60;

    const result: TestResult = {
      testId,
      score,
      passed,
      answers,
      pendingValidation
    };

    // If passed, unlock next module
    if (passed && test.moduleId) {
      if (!this.currentUser.progress.completedModules.includes(test.moduleId)) {
        this.currentUser.progress.completedModules.push(test.moduleId);
      }
      if (test.moduleId < 3) {
        this.currentUser.progress.currentModule = test.moduleId + 1;
      }
      this.saveProgressToStorage(); // Save progress after completing test
    }

    return result;
  }

  // Authentication (mock)
  login(email: string, password: string): Promise<User> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email && password) {
          resolve(this.currentUser);
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 1000);
    });
  }

  register(name: string, email: string, _password: string): Promise<User> {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.currentUser = {
          ...this.currentUser,
          name,
          email
        };
        resolve(this.currentUser);
      }, 1000);
    });
  }
}

export default new DataService();