import type { Exam, StudentRegistration } from "../types/models";
import { PriorityQueue } from "./priorityQueue";
import { LinkedList } from "./linkedList";

// In-memory store (tool demo)
const registrations = new Map<string, StudentRegistration>();

// Queue per exam (FIFO)
const waitQueues = new Map<string, string[]>(); // examId -> registrationId[]
// Allocated seats list per exam (LinkedList)
const allocated = new Map<string, LinkedList<{ registrationId: string; seat: string }>>();

// Seat counters per exam
const seatCounter = new Map<string, number>();

function priorityValue(p: Exam["priority"]) {
  if (p === "High") return 3;
  if (p === "Normal") return 2;
  return 1;
}

function dateValue(yyyyMmDd: string) {
  // smaller date => earlier
  return new Date(yyyyMmDd + "T00:00:00").getTime();
}

// Build list sorted by: priority desc, closing asc
export function buildExamPriorityList(exams: Exam[]): Exam[] {
  const pq = new PriorityQueue<Exam>((a, b) => {
    // We want: HIGH priority first, earlier closing first.
    // PriorityQueue is min-heap (compare <0 means a before b).
    // So invert priority (higher priority => smaller compare result).
    const pr = priorityValue(b.priority) - priorityValue(a.priority);
    if (pr !== 0) return pr;
    return dateValue(a.closing) - dateValue(b.closing);
  });

  for (const e of exams) pq.push(e);
  return pq.toArraySorted();
}

export function createRegistration({ exam, studentName, regNo, email }: { exam: Exam; studentName: string; regNo: string; email: string }) {
  if (exam.seatsAvailable <= 0) {
    throw new Error("No seats available");
  }

  // 🔥 Reduce seat
  exam.seatsAvailable -= 1;

  const registration: StudentRegistration = {
    id: Date.now().toString(),
    examId: exam.id,
    examName: exam.name,
    examType: exam.type,
    studentName,
    regNo,
    email,
    status: "UnderReview",
    paid: false,
  };

  registrations.set(registration.id, registration);

  // enqueue to waiting queue
  const q = waitQueues.get(exam.id) ?? [];
  q.push(registration.id);
  waitQueues.set(exam.id, q);

  // init linked list
  if (!allocated.get(exam.id)) allocated.set(exam.id, new LinkedList());
  if (!seatCounter.get(exam.id)) seatCounter.set(exam.id, 0);

  return registration;
}

export function markPaid(registrationId: string) {
  const r = registrations.get(registrationId);
  if (!r) return;
  r.paid = true;
  r.status = "PaymentCompleted";
  registrations.set(registrationId, r);
}

export function getRegistration(id: string) {
  return registrations.get(id);
}

// Simulate: admin approves and allocates next seat
export function simulateAdminApproveAndAllocate(registrationId: string) {
  const r = registrations.get(registrationId);
  if (!r) return;

  // Must be paid for repeats
  if (r.examType !== "Exam" && !r.paid) return;

  r.status = "UnderReview";

  // Allocate seat from queue (FIFO)
  const q = waitQueues.get(r.examId) ?? [];
  const nextId = q.shift(); // dequeue
  waitQueues.set(r.examId, q);

  if (!nextId) return;

  const nextReg = registrations.get(nextId);
  if (!nextReg) return;

  // next seat number
  const current = seatCounter.get(r.examId) ?? 0;
  const nextSeatNum = current + 1;
  seatCounter.set(r.examId, nextSeatNum);

  const seat = `A-${nextSeatNum}`; // simple seat format

  nextReg.seatNumber = seat;
  nextReg.status = "SeatAllocated";
  registrations.set(nextId, nextReg);

  // store in linked list
  const list = allocated.get(r.examId)!;
  list.append({ registrationId: nextId, seat });
}
