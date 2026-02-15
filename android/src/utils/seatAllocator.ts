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

export function createRegistration(input: {
  exam: Exam;
  studentName: string;
  regNo: string;
  email: string;
}): StudentRegistration {
  const id = `R-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

  const reg: StudentRegistration = {
    id,
    examId: input.exam.id,
    examName: input.exam.name,
    studentName: input.studentName,
    regNo: input.regNo,
    email: input.email,
    examType: input.exam.type,
    paid: input.exam.type === "Exam", // exam => no payment
    status: "Submitted",
  };

  registrations.set(id, reg);

  // enqueue to waiting queue
  const q = waitQueues.get(input.exam.id) ?? [];
  q.push(id);
  waitQueues.set(input.exam.id, q);

  // init linked list
  if (!allocated.get(input.exam.id)) allocated.set(input.exam.id, new LinkedList());
  if (!seatCounter.get(input.exam.id)) seatCounter.set(input.exam.id, 0);

  return reg;
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
