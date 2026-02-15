import type { Exam } from "../types/models";

export type RootStackParamList = {
  Splash: undefined;

  Dashboard: undefined;

  ExamDetails: {
    exam: {
      name: string;
      type: string;
      priority: string;
      closing: string;
      date: string;
      time: string;
      seatsAvailable: number;
      fee?: number;
    };
  };

  Register: {
    exam: Exam;
  };

  Payment: {
    registrationId: string;
    exam: Exam;
  };

  Status: {
    registrationId: string;
    exam: Exam;
  };

  SeatResult: {
    registrationId: string;
    hall: string;
    seat: string;
    exam: Exam;
  };
};
