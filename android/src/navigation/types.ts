import type { Exam } from "../types/models";

export type RootStackParamList = {
  Splash: undefined;
  Dashboard: undefined;
  ExamDetails: { exam: Exam };
  Register: { exam: Exam };
  Payment: { exam: Exam; registrationId: string };
  Status: { registrationId: string };
  SeatResult: { registrationId: string };
};
