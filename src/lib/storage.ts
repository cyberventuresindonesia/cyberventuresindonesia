/**
 * Multi-layer Storage System
 * A. LocalStorage (Browser persistence)
 * B. JSON File (Server backup)
 * C. PostgreSQL (Production database)
 */

// ==========================================
// OPTION A: LocalStorage (Client-side)
// ==========================================

export const LocalStorage = {
  // Applications
  saveApplication(data: any) {
    const existing = this.getApplications();
    const newApp = {
      id: Date.now().toString(),
      ...data,
      createdAt: new Date().toISOString(),
    };
    existing.push(newApp);
    localStorage.setItem('applications', JSON.stringify(existing));
    return newApp;
  },

  getApplications() {
    if (typeof window === 'undefined') return [];
    const saved = localStorage.getItem('applications');
    return saved ? JSON.parse(saved) : [];
  },

  // Quiz Results
  saveQuizResult(data: any) {
    const existing = this.getQuizResults();
    const newResult = {
      id: Date.now().toString(),
      ...data,
      completedAt: new Date().toISOString(),
    };
    existing.push(newResult);
    localStorage.setItem('quizResults', JSON.stringify(existing));
    return newResult;
  },

  getQuizResults() {
    if (typeof window === 'undefined') return [];
    const saved = localStorage.getItem('quizResults');
    return saved ? JSON.parse(saved) : [];
  },

  // Challenge Progress
  saveChallengeProgress(candidateId: string, data: any) {
    const key = `challenges_${candidateId}`;
    const existing = this.getChallengeProgress(candidateId);
    const updated = { ...existing, ...data, updatedAt: new Date().toISOString() };
    localStorage.setItem(key, JSON.stringify(updated));
    return updated;
  },

  getChallengeProgress(candidateId: string) {
    if (typeof window === 'undefined') return {};
    const key = `challenges_${candidateId}`;
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : { solved: [], score: 0 };
  },

  // Live Defense Schedule
  saveLiveDefenseSchedule(data: any) {
    localStorage.setItem('liveDefenseSchedule', JSON.stringify({
      ...data,
      scheduledAt: new Date().toISOString(),
    }));
    return data;
  },

  getLiveDefenseSchedule() {
    if (typeof window === 'undefined') return null;
    const saved = localStorage.getItem('liveDefenseSchedule');
    return saved ? JSON.parse(saved) : null;
  },

  // Current User
  setCurrentUser(user: any) {
    localStorage.setItem('currentUser', JSON.stringify(user));
  },

  getCurrentUser() {
    if (typeof window === 'undefined') return null;
    const saved = localStorage.getItem('currentUser');
    return saved ? JSON.parse(saved) : null;
  },

  // Clear all data (for logout)
  clearAll() {
    localStorage.removeItem('applications');
    localStorage.removeItem('quizResults');
    localStorage.removeItem('liveDefenseSchedule');
    localStorage.removeItem('currentUser');
    // Keep challenge progress per user
  },
};

// ==========================================
// OPTION B: JSON File Storage (Server-side)
// ==========================================

export const FileStorage = {
  // These functions call API routes
  async saveApplication(data: any) {
    const response = await fetch('/api/storage/application', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return response.json();
  },

  async getApplications() {
    const response = await fetch('/api/storage/applications');
    return response.json();
  },

  async saveQuizResult(data: any) {
    const response = await fetch('/api/storage/quiz', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return response.json();
  },

  async getQuizResults() {
    const response = await fetch('/api/storage/quiz-results');
    return response.json();
  },

  async saveChallengeProgress(data: any) {
    const response = await fetch('/api/storage/challenges', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return response.json();
  },

  async saveLiveDefense(data: any) {
    const response = await fetch('/api/storage/live-defense', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return response.json();
  },
};

// ==========================================
// OPTION C: PostgreSQL Database (Production)
// ==========================================

export const DatabaseStorage = {
  // These functions call API routes with Prisma
  async saveApplication(data: any) {
    const response = await fetch('/api/db/application', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return response.json();
  },

  async getApplications() {
    const response = await fetch('/api/db/applications');
    return response.json();
  },

  async saveQuizAttempt(data: any) {
    const response = await fetch('/api/db/quiz', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return response.json();
  },

  async getQuizAttempts(candidateId: string) {
    const response = await fetch(`/api/db/quiz?candidateId=${candidateId}`);
    return response.json();
  },

  async saveChallengeAttempt(data: any) {
    const response = await fetch('/api/db/challenge', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return response.json();
  },

  async getCandidateProgress(candidateId: string) {
    const response = await fetch(`/api/db/candidate-progress?candidateId=${candidateId}`);
    return response.json();
  },

  async saveLiveDefense(data: any) {
    const response = await fetch('/api/db/live-defense', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return response.json();
  },
};

// ==========================================
// UNIFIED STORAGE (Auto-select based on env)
// ==========================================

export const Storage = {
  // Automatically use appropriate storage
  async saveApplication(data: any) {
    // 1. Always save to LocalStorage first (immediate feedback)
    LocalStorage.saveApplication(data);
    
    // 2. Try PostgreSQL if available
    try {
      if (process.env.DATABASE_URL) {
        return await DatabaseStorage.saveApplication(data);
      }
    } catch (e) {
      console.log('DB not available, using fallback');
    }
    
    // 3. Fallback to JSON file
    try {
      return await FileStorage.saveApplication(data);
    } catch (e) {
      console.log('File storage failed, using LocalStorage only');
    }
    
    return { success: true, source: 'localStorage', data };
  },

  async saveQuizResult(data: any) {
    LocalStorage.saveQuizResult(data);
    
    try {
      if (process.env.DATABASE_URL) {
        return await DatabaseStorage.saveQuizAttempt(data);
      }
    } catch (e) {}
    
    try {
      return await FileStorage.saveQuizResult(data);
    } catch (e) {}
    
    return { success: true, source: 'localStorage', data };
  },

  async saveChallengeProgress(data: any) {
    LocalStorage.saveChallengeProgress(data.candidateId, data);
    
    try {
      if (process.env.DATABASE_URL) {
        return await DatabaseStorage.saveChallengeAttempt(data);
      }
    } catch (e) {}
    
    try {
      return await FileStorage.saveChallengeProgress(data);
    } catch (e) {}
    
    return { success: true, source: 'localStorage', data };
  },

  async saveLiveDefenseSchedule(data: any) {
    LocalStorage.saveLiveDefenseSchedule(data);
    
    try {
      if (process.env.DATABASE_URL) {
        return await DatabaseStorage.saveLiveDefense(data);
      }
    } catch (e) {}
    
    try {
      return await FileStorage.saveLiveDefense(data);
    } catch (e) {}
    
    return { success: true, source: 'localStorage', data };
  },

  // Get methods (try all sources)
  async getApplications() {
    // Return from LocalStorage immediately
    return LocalStorage.getApplications();
  },

  getQuizResults() {
    return LocalStorage.getQuizResults();
  },

  getChallengeProgress(candidateId: string) {
    return LocalStorage.getChallengeProgress(candidateId);
  },

  getLiveDefenseSchedule() {
    return LocalStorage.getLiveDefenseSchedule();
  },
};
