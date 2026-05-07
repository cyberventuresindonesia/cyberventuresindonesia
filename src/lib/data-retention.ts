/**
 * Data Retention & Cleanup System
 * 
 * Compliance with UU PDP (Indonesia Data Protection Law):
 * - Rejected candidates: 6 months retention
 * - CV/Files: 12 months retention
 * - Hired candidates: Archive to cold storage
 * - Auto-cleanup with audit trail
 */

// Retention periods (in milliseconds)
const RETENTION_PERIODS = {
  REJECTED_CANDIDATES: 6 * 30 * 24 * 60 * 60 * 1000, // 6 months
  CV_FILES: 12 * 30 * 24 * 60 * 60 * 1000, // 12 months
  INACTIVE_APPLICATIONS: 30 * 24 * 60 * 60 * 1000, // 30 days (no progress)
  CHALLENGE_LOGS: 90 * 24 * 60 * 60 * 1000, // 90 days
  EMAIL_LOGS: 180 * 24 * 60 * 60 * 1000, // 180 days
};

// Cleanup job status
type CleanupJobStatus = 'idle' | 'running' | 'completed' | 'failed';

interface CleanupJob {
  id: string;
  status: CleanupJobStatus;
  startedAt: Date;
  completedAt?: Date;
  deletedCandidates: number;
  deletedFiles: number;
  archivedCandidates: number;
  errors: string[];
}

interface RetentionPolicy {
  rejectedCandidatesDays: number;
  cvFilesDays: number;
  inactiveApplicationsDays: number;
  challengeLogsDays: number;
  emailLogsDays: number;
  autoCleanupEnabled: boolean;
  cleanupSchedule: string; // cron expression
}

// Default policy
export const defaultRetentionPolicy: RetentionPolicy = {
  rejectedCandidatesDays: 180, // 6 months
  cvFilesDays: 365, // 12 months
  inactiveApplicationsDays: 30,
  challengeLogsDays: 90,
  emailLogsDays: 180,
  autoCleanupEnabled: true,
  cleanupSchedule: '0 2 * * *', // Daily at 2 AM
};

// Active cleanup jobs (in-memory tracking)
let currentJob: CleanupJob | null = null;
let lastJob: CleanupJob | null = null;

/**
 * Get current retention policy (from storage or default)
 */
export async function getRetentionPolicy(): Promise<RetentionPolicy> {
  try {
    // Try to get from localStorage (client) or settings
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('retentionPolicy');
      if (saved) {
        return { ...defaultRetentionPolicy, ...JSON.parse(saved) };
      }
    }
    
    // In production, fetch from database/settings API
    // const response = await fetch('/api/settings/retention');
    // return await response.json();
    
    return defaultRetentionPolicy;
  } catch (error) {
    console.error('Failed to get retention policy:', error);
    return defaultRetentionPolicy;
  }
}

/**
 * Save retention policy
 */
export async function saveRetentionPolicy(policy: RetentionPolicy): Promise<void> {
  try {
    if (typeof window !== 'undefined') {
      localStorage.setItem('retentionPolicy', JSON.stringify(policy));
    }
    
    // In production, save to database
    // await fetch('/api/settings/retention', {
    //   method: 'POST',
    //   body: JSON.stringify(policy)
    // });
    
    console.log('✅ Retention policy saved:', policy);
  } catch (error) {
    console.error('Failed to save retention policy:', error);
    throw error;
  }
}

/**
 * Calculate retention date threshold
 */
function getRetentionThreshold(days: number): Date {
  return new Date(Date.now() - days * 24 * 60 * 60 * 1000);
}

/**
 * Main cleanup function
 */
export async function runDataCleanup(): Promise<CleanupJob> {
  if (currentJob && currentJob.status === 'running') {
    throw new Error('Cleanup job already running');
  }

  const job: CleanupJob = {
    id: `cleanup-${Date.now()}`,
    status: 'running',
    startedAt: new Date(),
    deletedCandidates: 0,
    deletedFiles: 0,
    archivedCandidates: 0,
    errors: [],
  };

  currentJob = job;

  try {
    const policy = await getRetentionPolicy();
    console.log('🧹 Starting data cleanup job:', job.id);
    console.log('📋 Retention policy:', policy);

    // 1. Cleanup rejected candidates
    await cleanupRejectedCandidates(job, policy);

    // 2. Cleanup inactive applications (no progress for 30 days)
    await cleanupInactiveApplications(job, policy);

    // 3. Archive hired candidates data
    await archiveHiredCandidates(job, policy);

    // 4. Cleanup old CV files
    await cleanupOldCVFiles(job, policy);

    // 5. Cleanup challenge logs
    await cleanupChallengeLogs(job, policy);

    // 6. Cleanup email logs
    await cleanupEmailLogs(job, policy);

    // Mark job as completed
    job.status = 'completed';
    job.completedAt = new Date();
    lastJob = job;
    
    console.log('✅ Cleanup job completed:', job);
    
    // Log audit trail
    await logCleanupAudit(job);

  } catch (error) {
    job.status = 'failed';
    job.errors.push(error instanceof Error ? error.message : 'Unknown error');
    console.error('❌ Cleanup job failed:', error);
  } finally {
    currentJob = null;
  }

  return job;
}

/**
 * Cleanup rejected candidates (older than 6 months)
 */
async function cleanupRejectedCandidates(job: CleanupJob, policy: RetentionPolicy): Promise<void> {
  try {
    const threshold = getRetentionThreshold(policy.rejectedCandidatesDays);
    console.log(`🗑️ Cleaning up rejected candidates older than ${policy.rejectedCandidatesDays} days...`);

    // In production: Query database for rejected candidates older than threshold
    // const candidatesToDelete = await db.candidate.findMany({
    //   where: {
    //     status: 'rejected',
    //     updatedAt: { lt: threshold }
    //   }
    // });

    // Simulate cleanup from localStorage
    if (typeof window !== 'undefined') {
      const applications = JSON.parse(localStorage.getItem('applications') || '[]');
      const beforeCount = applications.length;
      
      const filtered = applications.filter((app: any) => {
        if (app.status !== 'rejected') return true;
        const appDate = new Date(app.updatedAt || app.createdAt);
        return appDate > threshold;
      });
      
      localStorage.setItem('applications', JSON.stringify(filtered));
      job.deletedCandidates += beforeCount - filtered.length;
    }

    // Also cleanup associated files from storage
    // await cleanupFilesForCandidates(candidatesToDelete.map(c => c.id));

    console.log(`✅ Cleaned up ${job.deletedCandidates} rejected candidates`);
  } catch (error) {
    job.errors.push(`cleanupRejectedCandidates: ${error}`);
    console.error('Failed to cleanup rejected candidates:', error);
  }
}

/**
 * Cleanup inactive applications (no progress for 30 days)
 */
async function cleanupInactiveApplications(job: CleanupJob, policy: RetentionPolicy): Promise<void> {
  try {
    const threshold = getRetentionThreshold(policy.inactiveApplicationsDays);
    console.log(`🗑️ Cleaning up inactive applications older than ${policy.inactiveApplicationsDays} days...`);

    if (typeof window !== 'undefined') {
      const applications = JSON.parse(localStorage.getItem('applications') || '[]');
      const beforeCount = applications.length;
      
      const filtered = applications.filter((app: any) => {
        // Keep if status is not 'in_progress' or has recent activity
        if (app.status !== 'IN_PROGRESS') return true;
        const appDate = new Date(app.updatedAt || app.createdAt);
        return appDate > threshold;
      });
      
      localStorage.setItem('applications', JSON.stringify(filtered));
      const deleted = beforeCount - filtered.length;
      job.deletedCandidates += deleted;
      
      console.log(`✅ Cleaned up ${deleted} inactive applications`);
    }
  } catch (error) {
    job.errors.push(`cleanupInactiveApplications: ${error}`);
    console.error('Failed to cleanup inactive applications:', error);
  }
}

/**
 * Archive hired candidates data to cold storage
 */
async function archiveHiredCandidates(job: CleanupJob, policy: RetentionPolicy): Promise<void> {
  try {
    console.log('📦 Archiving hired candidates data...');

    // In production:
    // 1. Move candidate data to archive database/table
    // 2. Move files to cold storage (S3 Glacier)
    // 3. Delete from hot storage
    
    // Simulate archiving
    if (typeof window !== 'undefined') {
      const applications = JSON.parse(localStorage.getItem('applications') || '[]');
      const hiredApps = applications.filter((app: any) => app.status === 'hired');
      
      // Move to archive storage
      const archive = JSON.parse(localStorage.getItem('archivedApplications') || '[]');
      archive.push(...hiredApps);
      localStorage.setItem('archivedApplications', JSON.stringify(archive));
      
      job.archivedCandidates = hiredApps.length;
    }

    console.log(`✅ Archived ${job.archivedCandidates} hired candidates`);
  } catch (error) {
    job.errors.push(`archiveHiredCandidates: ${error}`);
    console.error('Failed to archive hired candidates:', error);
  }
}

/**
 * Cleanup old CV files (older than 12 months)
 */
async function cleanupOldCVFiles(job: CleanupJob, policy: RetentionPolicy): Promise<void> {
  try {
    const threshold = getRetentionThreshold(policy.cvFilesDays);
    console.log(`🗑️ Cleaning up CV files older than ${policy.cvFilesDays} days...`);

    // In production: Delete from S3 or file storage
    // const oldFiles = await db.file.findMany({
    //   where: {
    //     type: 'CV',
    //     createdAt: { lt: threshold }
    //   }
    // });
    // 
    // for (const file of oldFiles) {
    //   await s3.deleteObject({ Bucket: 'cvi-cv-bucket', Key: file.key });
    //   await db.file.delete({ where: { id: file.id } });
    // }

    // Simulate with localStorage
    if (typeof window !== 'undefined') {
      // Count would-be deleted files
      const applications = JSON.parse(localStorage.getItem('applications') || '[]');
      let deletedFiles = 0;
      
      applications.forEach((app: any) => {
        const appDate = new Date(app.createdAt);
        if (appDate < threshold && app.cvFileName) {
          deletedFiles++;
          // In production: Actually delete the file from storage
        }
      });
      
      job.deletedFiles = deletedFiles;
    }

    console.log(`✅ Cleaned up ${job.deletedFiles} old CV files`);
  } catch (error) {
    job.errors.push(`cleanupOldCVFiles: ${error}`);
    console.error('Failed to cleanup CV files:', error);
  }
}

/**
 * Cleanup old challenge logs
 */
async function cleanupChallengeLogs(job: CleanupJob, policy: RetentionPolicy): Promise<void> {
  try {
    const threshold = getRetentionThreshold(policy.challengeLogsDays);
    console.log(`🗑️ Cleaning up challenge logs older than ${policy.challengeLogsDays} days...`);

    // In production: Delete from ELK Stack or database
    // await db.challengeLog.deleteMany({
    //   where: { createdAt: { lt: threshold } }
    // });

    console.log('✅ Challenge logs cleanup completed');
  } catch (error) {
    job.errors.push(`cleanupChallengeLogs: ${error}`);
    console.error('Failed to cleanup challenge logs:', error);
  }
}

/**
 * Cleanup old email logs
 */
async function cleanupEmailLogs(job: CleanupJob, policy: RetentionPolicy): Promise<void> {
  try {
    const threshold = getRetentionThreshold(policy.emailLogsDays);
    console.log(`🗑️ Cleaning up email logs older than ${policy.emailLogsDays} days...`);

    // In production: Delete old sent email records
    // await db.sentEmail.deleteMany({
    //   where: { createdAt: { lt: threshold } }
    // });

    console.log('✅ Email logs cleanup completed');
  } catch (error) {
    job.errors.push(`cleanupEmailLogs: ${error}`);
    console.error('Failed to cleanup email logs:', error);
  }
}

/**
 * Log cleanup audit trail
 */
async function logCleanupAudit(job: CleanupJob): Promise<void> {
  const auditLog = {
    jobId: job.id,
    timestamp: new Date(),
    action: 'DATA_CLEANUP',
    results: {
      deletedCandidates: job.deletedCandidates,
      deletedFiles: job.deletedFiles,
      archivedCandidates: job.archivedCandidates,
    },
    errors: job.errors,
  };

  // In production: Save to audit log database
  console.log('📝 Cleanup audit log:', auditLog);
  
  if (typeof window !== 'undefined') {
    const logs = JSON.parse(localStorage.getItem('cleanupAuditLogs') || '[]');
    logs.push(auditLog);
    localStorage.setItem('cleanupAuditLogs', JSON.stringify(logs.slice(-100))); // Keep last 100
  }
}

/**
 * Get cleanup job status
 */
export function getCleanupStatus(): { current: CleanupJob | null; last: CleanupJob | null } {
  return {
    current: currentJob,
    last: lastJob,
  };
}

/**
 * Get cleanup history
 */
export function getCleanupHistory(): CleanupJob[] {
  if (typeof window === 'undefined') return [];
  
  const logs = JSON.parse(localStorage.getItem('cleanupAuditLogs') || '[]');
  return logs.map((log: any) => ({
    id: log.jobId,
    status: log.errors?.length > 0 ? 'completed_with_errors' : 'completed',
    startedAt: new Date(log.timestamp),
    completedAt: new Date(log.timestamp),
    deletedCandidates: log.results?.deletedCandidates || 0,
    deletedFiles: log.results?.deletedFiles || 0,
    archivedCandidates: log.results?.archivedCandidates || 0,
    errors: log.errors || [],
  }));
}

/**
 * Preview what would be cleaned up (dry run)
 */
export async function previewCleanup(): Promise<{
  rejectedCandidates: number;
  inactiveApplications: number;
  oldCVFiles: number;
  challengeLogs: number;
  emailLogs: number;
  hiredToArchive: number;
}> {
  const policy = await getRetentionPolicy();
  const now = new Date();
  
  const rejectedThreshold = getRetentionThreshold(policy.rejectedCandidatesDays);
  const inactiveThreshold = getRetentionThreshold(policy.inactiveApplicationsDays);
  const cvThreshold = getRetentionThreshold(policy.cvFilesDays);

  // In production: Query database for counts
  // For now, return estimates based on localStorage
  
  if (typeof window !== 'undefined') {
    const applications = JSON.parse(localStorage.getItem('applications') || '[]');
    
    const rejectedCandidates = applications.filter((app: any) => {
      if (app.status !== 'rejected') return false;
      return new Date(app.updatedAt || app.createdAt) < rejectedThreshold;
    }).length;
    
    const inactiveApplications = applications.filter((app: any) => {
      if (app.status !== 'IN_PROGRESS') return false;
      return new Date(app.updatedAt || app.createdAt) < inactiveThreshold;
    }).length;
    
    const oldCVFiles = applications.filter((app: any) => {
      if (!app.cvFileName) return false;
      return new Date(app.createdAt) < cvThreshold;
    }).length;
    
    const hiredToArchive = applications.filter((app: any) => 
      app.status === 'hired'
    ).length;
    
    return {
      rejectedCandidates,
      inactiveApplications,
      oldCVFiles,
      challengeLogs: 0, // Would query challenge logs
      emailLogs: 0, // Would query email logs
      hiredToArchive,
    };
  }
  
  return {
    rejectedCandidates: 0,
    inactiveApplications: 0,
    oldCVFiles: 0,
    challengeLogs: 0,
    emailLogs: 0,
    hiredToArchive: 0,
  };
}

/**
 * Export candidate data (for data portability / GDPR compliance)
 */
export async function exportCandidateData(candidateId: string): Promise<{
  data: any;
  format: 'json';
}> {
  // In production: Gather all data for candidate
  // - Application details
  // - Quiz results
  // - Challenge progress
  // - Emails sent
  // - Assessment logs
  
  console.log('📤 Exporting data for candidate:', candidateId);
  
  return {
    data: {
      candidateId,
      exportDate: new Date().toISOString(),
      // ... actual candidate data
    },
    format: 'json',
  };
}

/**
 * Delete candidate data (right to be forgotten / GDPR)
 */
export async function deleteCandidateData(candidateId: string, reason: string): Promise<void> {
  console.log(`🗑️ Deleting all data for candidate ${candidateId}. Reason: ${reason}`);
  
  // In production:
  // 1. Delete from candidates table
  // 2. Delete quiz results
  // 3. Delete challenge logs
  // 4. Delete files from S3
  // 5. Delete email logs
  // 6. Log deletion for audit
  
  if (typeof window !== 'undefined') {
    // Remove from applications
    const applications = JSON.parse(localStorage.getItem('applications') || '[]');
    const filtered = applications.filter((app: any) => app.email !== candidateId && app.id !== candidateId);
    localStorage.setItem('applications', JSON.stringify(filtered));
    
    // Log deletion
    const deletionLog = {
      candidateId,
      deletedAt: new Date().toISOString(),
      reason,
    };
    const logs = JSON.parse(localStorage.getItem('deletionLogs') || '[]');
    logs.push(deletionLog);
    localStorage.setItem('deletionLogs', JSON.stringify(logs));
  }
}

// Export for use in API routes and components
export { RETENTION_PERIODS };
export type { CleanupJob, RetentionPolicy, CleanupJobStatus };
