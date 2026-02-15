import type { Exam } from "../types/models";

export const mockExams: Exam[] = [
  {
    id: "E1",
    name: "Data Structures Mid",
    type: "Exam",
    priority: "High",
    closing: "2026-02-20",
    seatsAvailable: 20,
  },
  {
    id: "E2",
    name: "OOP Repeat",
    type: "Batch Repeat",
    priority: "Normal",
    closing: "2026-02-25",
    seatsAvailable: 5,
    fee: 500,
  },
  {
    id: "E3",
    name: "Database Special Repeat",
    type: "Special Repeat",
    priority: "High",
    closing: "2026-02-18",
    seatsAvailable: 0,
    fee: 750,
  },
];
