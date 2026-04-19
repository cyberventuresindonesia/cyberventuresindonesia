/**
 * Database Layer for Cyber Ventures
 * Supports both PostgreSQL (Prisma) and JSON file fallback
 * Uses localStorage as client-side cache
 */

import { prisma } from './prisma';

// Types
export interface CandidateData {
  id?: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  countryCode: string;
  telegramUsername: string;
  position: string;
  yearsExperience: number;
  coverLetter: string;
  cvFileName?: string;
  cvFileData?: string;
  cvSummary?: string;
  currentGate?: number;
  status?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

export interface QuizData {
  candidateId: string;
  score: number;
  total: number;
  percentage: number;
  passed: boolean;
  answers?: Record<string, any>;
  timeSpent?: number;
}

export interface ChallengeData {
  candidateId: string;
  solved: number[];
  totalScore: number;
  flags?: Record<string, string>;
}

export interface LiveDefenseData {
  candidateId: string;
  preferredDate: string;
  preferredTime: string;
  timezone: string;
  notes?: string;
  googleMeetLink?: string;
  status?: string;
}

// Check if we're in browser environment
const isBrowser = typeof window !== 'undefined';

/**
 * Candidate Operations
 */
export const CandidateDB = {
  // Create new candidate
  async create(data: CandidateData): Promise<{ success: boolean; data?: CandidateData; error?: string }> {
    try {
      // Try Prisma first (server-side)
      if (!isBrowser && prisma) {
        const candidate = await prisma.candidate.create({
          data: {
            fullName: data.fullName,
            email: data.email,
            phoneNumber: data.phoneNumber,
            countryCode: data.countryCode,
            telegramUsername: data.telegramUsername,
            position: data.position,
            yearsExperience: data.yearsExperience,
            coverLetter: data.coverLetter,
            cvFileName: data.cvFileName,
            cvFileData: data.cvFileData,
            cvSummary: data.cvSummary,
            currentGate: 1,
            status: 'IN_PROGRESS',
          },
        });
        
        // Also save to localStorage for client-side access
        if (isBrowser) {
          localStorage.setItem('applicationData', JSON.stringify({
            ...data,
            id: candidate.id,
            submittedAt: Date.now(),
          }));
          localStorage.setItem('currentGate', '1');
        }
        
        return { success: true, data: candidate as CandidateData };
      }
      
      // Fallback to localStorage (client-side)
      if (isBrowser) {
        const id = Date.now().toString();
        const candidate: CandidateData = {
          ...data,
          id,
          currentGate: 1,
          status: 'IN_PROGRESS',
          createdAt: new Date().toISOString(),
        };
        
        // Save to applications array
        const existing = JSON.parse(localStorage.getItem('applications') || '[]');
        existing.push(candidate);
        localStorage.setItem('applications', JSON.stringify(existing));
        
        // Save current application
        localStorage.setItem('applicationData', JSON.stringify({
          ...data,
          id,
          submittedAt: Date.now(),
        }));
        localStorage.setItem('currentGate', '1');
        
        return { success: true, data: candidate };
      }
      
      return { success: false, error: 'No storage available' };
    } catch (error) {
      console.error('Error creating candidate:', error);
      return { success: false, error: String(error) };
    }
  },

  // Get candidate by email
  async getByEmail(email: string): Promise<CandidateData | null> {
    try {
      if (!isBrowser && prisma) {
        const candidate = await prisma.candidate.findUnique({
          where: { email },
          include: {
            quizResult: true,
            challengeProgress: true,
            liveDefense: true,
          },
        });
        return candidate as CandidateData | null;
      }
      
      if (isBrowser) {
        const applications = JSON.parse(localStorage.getItem('applications') || '[]');
        return applications.find((c: CandidateData) => c.email === email) || null;
      }
      
      return null;
    } catch (error) {
      console.error('Error getting candidate:', error);
      return null;
    }
  },

  // Get all candidates
  async getAll(): Promise<CandidateData[]> {
    try {
      if (!isBrowser && prisma) {
        const candidates = await prisma.candidate.findMany({
          include: {
            quizResult: true,
            challengeProgress: true,
            liveDefense: true,
          },
          orderBy: { createdAt: 'desc' },
        });
        return candidates as CandidateData[];
      }
      
      if (isBrowser) {
        return JSON.parse(localStorage.getItem('applications') || '[]');
      }
      
      return [];
    } catch (error) {
      console.error('Error getting candidates:', error);
      return [];
    }
  },

  // Update candidate
  async update(id: string, data: Partial<CandidateData>): Promise<boolean> {
    try {
      if (!isBrowser && prisma) {
        await prisma.candidate.update({
          where: { id },
          data,
        });
        return true;
      }
      
      if (isBrowser) {
        const applications = JSON.parse(localStorage.getItem('applications') || '[]');
        const index = applications.findIndex((c: CandidateData) => c.id === id);
        if (index >= 0) {
          applications[index] = { ...applications[index], ...data };
          localStorage.setItem('applications', JSON.stringify(applications));
          return true;
        }
      }
      
      return false;
    } catch (error) {
      console.error('Error updating candidate:', error);
      return false;
    }
  },
};

/**
 * Quiz Operations
 */
export const QuizDB = {
  async saveResult(data: QuizData): Promise<boolean> {
    try {
      if (!isBrowser && prisma) {
        await prisma.quizResult.create({
          data: {
            candidateId: data.candidateId,
            score: data.score,
            total: data.total,
            percentage: data.percentage,
            passed: data.passed,
            answers: data.answers || {},
            timeSpent: data.timeSpent,
          },
        });
        
        // Update candidate status
        await prisma.candidate.update({
          where: { id: data.candidateId },
          data: {
            currentGate: 2,
            status: data.passed ? 'QUIZ_PASSED' : 'IN_PROGRESS',
          },
        });
        
        return true;
      }
      
      if (isBrowser) {
        // Save to localStorage
        localStorage.setItem('quizScore', data.score.toString());
        localStorage.setItem('quizPercentage', data.percentage.toString());
        localStorage.setItem('quizPassed', data.passed.toString());
        localStorage.setItem('currentGate', '2');
        
        // Add to quiz results array
        const results = JSON.parse(localStorage.getItem('quizResults') || '[]');
        results.push({
          ...data,
          id: Date.now().toString(),
          completedAt: new Date().toISOString(),
        });
        localStorage.setItem('quizResults', JSON.stringify(results));
        
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Error saving quiz result:', error);
      return false;
    }
  },
};

/**
 * Challenge Operations
 */
export const ChallengeDB = {
  async saveProgress(data: ChallengeData): Promise<boolean> {
    try {
      if (!isBrowser && prisma) {
        await prisma.challengeProgress.upsert({
          where: { candidateId: data.candidateId },
          update: {
            solved: data.solved,
            totalScore: data.totalScore,
            flags: data.flags || {},
          },
          create: {
            candidateId: data.candidateId,
            solved: data.solved,
            totalScore: data.totalScore,
            flags: data.flags || {},
          },
        });
        
        // Update candidate gate if 3+ challenges solved
        if (data.solved.length >= 3) {
          await prisma.candidate.update({
            where: { id: data.candidateId },
            data: {
              currentGate: 3,
              status: 'CHALLENGES_PASSED',
            },
          });
        }
        
        return true;
      }
      
      if (isBrowser) {
        localStorage.setItem('challengeProgress', JSON.stringify({
          solved: data.solved,
          totalScore: data.totalScore,
          flags: data.flags,
          updatedAt: new Date().toISOString(),
        }));
        
        if (data.solved.length >= 3) {
          localStorage.setItem('currentGate', '3');
          localStorage.setItem('challengesPassed', 'true');
        }
        
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Error saving challenge progress:', error);
      return false;
    }
  },
};

/**
 * Live Defense Operations
 */
export const LiveDefenseDB = {
  async schedule(data: LiveDefenseData): Promise<boolean> {
    try {
      if (!isBrowser && prisma) {
        await prisma.liveDefenseSchedule.create({
          data: {
            candidateId: data.candidateId,
            preferredDate: data.preferredDate,
            preferredTime: data.preferredTime,
            timezone: data.timezone,
            notes: data.notes,
            googleMeetLink: data.googleMeetLink || 'https://meet.google.com/cyber-ventures-live',
            status: 'SCHEDULED',
          },
        });
        
        // Update candidate
        await prisma.candidate.update({
          where: { id: data.candidateId },
          data: {
            currentGate: 4,
            status: 'LIVE_DEFENSE_SCHEDULED',
          },
        });
        
        return true;
      }
      
      if (isBrowser) {
        localStorage.setItem('liveDefenseSchedule', JSON.stringify({
          ...data,
          scheduledAt: new Date().toISOString(),
        }));
        localStorage.setItem('currentGate', '4');
        localStorage.setItem('liveDefenseScheduled', 'true');
        
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Error scheduling live defense:', error);
      return false;
    }
  },
};

// Export all
export default {
  Candidate: CandidateDB,
  Quiz: QuizDB,
  Challenge: ChallengeDB,
  LiveDefense: LiveDefenseDB,
};
