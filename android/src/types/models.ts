export type PriorityLevel = "High" | "Normal" | "Low";
export type ExamType = "Exam" | "Batch Repeat" | "Special Repeat";

export type Exam = {
  id: string;
  name: string;
  type: ExamType;
  priority: PriorityLevel;
  closing: string; // YYYY-MM-DD
  seatsAvailable: number;
  fee?: number; // only for repeats
};

export type RegistrationStatus =
  | "Submitted"
  | "PaymentCompleted"
  | "UnderReview"
  | "SeatAllocated";

export type StudentRegistration = {
  id: string;
  examId: string;
  examName: string;
  studentName: string;
  regNo: string;
  email: string;
  examType: ExamType;
  paid: boolean;
  status: RegistrationStatus;
  seatNumber?: string;
};
