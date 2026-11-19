export type UserRole = "peserta" | "instruktur" | "admin";

export type CommodityId = "semangka" | "cabai" | "tomat" | "timun" | "melon";

export interface UserProfile {
  id: string;
  name: string;
  role: UserRole;
  school: string;
  className: string;
  identifier: string; // NIS or NIP
  avatarUrl?: string;
  bioAuthEnabled: boolean;
  groupName?: string;
  expertise?: string;
  phone?: string;
  status?: "aktif" | "alumni" | "nonaktif";
}

export interface FieldLogEntry {
  id: string;
  userId: string;
  studentName: string;
  commodityId: CommodityId;
  date: string;
  hstOrPhase: string;
  activityTitle: string;
  jobId: number;
  plantHeightCm: number;
  leafCount: number;
  pestsObserved: string;
  notes: string;
  photoUrl?: string;
  photoStage?: "sebelum" | "proses" | "sesudah";
  status: "synced" | "pending_offline";
  timestamp: number;
  teacherVerified: boolean;
  teacherFeedback?: string;
}

export interface StepProgressState {
  [jobId: number]: {
    completedStepIds: number[];
    numeracyAnswered: boolean;
    studentNotes?: string;
    updatedAt: number;
  };
}

export type CommodityProgressMap = Record<CommodityId, StepProgressState>;

export interface AssessmentResult {
  userId: string;
  studentName: string;
  commodityId: CommodityId;
  quizScore: number; // 0 - 100
  quizAnswers: Record<number, string>;
  essayAnswers: Record<number, string>;
  essayScores: Record<number, number>; // 0 - 12 per item
  skillsScores: Record<number, number>; // 1 - 4 per aspect
  attitudeScores: Record<number, number>; // 1 - 4 per aspect
  finalKnowledgeScore: number; // 0 - 100
  finalSkillScore: number; // 0 - 100
  finalAttitudeScore: number; // 0 - 100
  compositeScore: number; // 0 - 100
  predicate: "A (Sangat Kompeten)" | "B (Kompeten)" | "C (Cukup Kompeten)" | "D (Belum Kompeten)";
  followUp: string;
  submittedAt: number;
  status: "draft" | "submitted" | "verified";
}

export type CommodityAssessmentMap = Record<CommodityId, AssessmentResult | null>;

export interface ChatMessage {
  id: string;
  sender: "user" | "instructor" | "system";
  senderName: string;
  role: string;
  text: string;
  timestamp: string;
  badge?: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: "jadwal" | "evaluasi" | "sinkron" | "sistem";
}

export type StepGradeScale = 1 | 2 | 3 | 4;

export interface StepGradeRecord {
  score: StepGradeScale;
  verified: boolean;
  notes?: string;
  gradedBy: string;
  gradedAt: number;
}

// studentId -> commodityId -> jobId -> stepId -> StepGradeRecord
export type StudentStepGradesMap = Record<
  string,
  Partial<Record<CommodityId, Record<number, Record<number, StepGradeRecord>>>>
>;

// studentId -> CommodityProgressMap
export type StudentProgressDirectory = Record<string, CommodityProgressMap>;

