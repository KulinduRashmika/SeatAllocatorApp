package com.seat.seatallocator.service;

import com.seat.seatallocator.entity.Exam;
import com.seat.seatallocator.entity.Registration;
import com.seat.seatallocator.repository.ExamRepository;
import com.seat.seatallocator.repository.RegistrationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.*;

@Service
@RequiredArgsConstructor
public class ExamService {

    private final ExamRepository examRepository;
    private final RegistrationRepository registrationRepository;

    // FIFO Waitlist per exam
    private final Map<Long, Queue<String>> waitlists = new HashMap<>();

    public Exam addExam(Exam exam) {
        if (exam.getTotalSeats() <= 0) {
            throw new IllegalArgumentException("totalSeats must be > 0");
        }

        if (exam.getAvailableSeats() <= 0) {
            exam.setAvailableSeats(exam.getTotalSeats());
        }

        exam.setNextSeatNumber(1);
        return examRepository.save(exam);
    }

    public List<Exam> getAllExams() {
        return examRepository.findAll();
    }

    // Heap sorting
    public List<Exam> getExamsSortedByDateHeap() {
        PriorityQueue<Exam> heap = new PriorityQueue<>(
                Comparator.comparing(Exam::getDate, Comparator.nullsLast(Comparator.naturalOrder()))
        );

        for (Exam e : examRepository.findAll()) {
            if (e.getDate() != null && !e.getDate().isBefore(LocalDate.now())) {
                heap.offer(e);
            }
        }

        List<Exam> out = new ArrayList<>();
        while (!heap.isEmpty()) out.add(heap.poll());
        return out;
    }

    // ✅ FULL REGISTER (FIFO)
    public Map<String, Object> registerStudent(
            Long examId,
            String studentName,
            String regNo,
            String email
    ) {

        Exam exam = examRepository.findById(examId)
                .orElseThrow(() -> new RuntimeException("Exam not found"));

        Registration r = new Registration();
        r.setExamId(examId);
        r.setStudentName(studentName);
        r.setRegNo(regNo);
        r.setEmail(email);

        if (exam.getAvailableSeats() > 0) {

            int seatNumber = exam.getNextSeatNumber();
            exam.setNextSeatNumber(seatNumber + 1);
            exam.setAvailableSeats(exam.getAvailableSeats() - 1);
            examRepository.save(exam);

            r.setSeatNumber(seatNumber);
            r.setStatus("ALLOCATED");
            registrationRepository.save(r);

            return Map.of(
                    "registrationId", r.getId(),
                    "message", "Seat Allocated: " + seatNumber,
                    "seatNumber", seatNumber,
                    "status", "ALLOCATED"
            );
        }

        // FIFO waitlist
        waitlists.computeIfAbsent(examId, k -> new LinkedList<>()).offer(studentName);

        r.setSeatNumber(null);
        r.setStatus("WAITLISTED");
        registrationRepository.save(r);

        return Map.of(
                "registrationId", r.getId(),
                "message", "Seats Full. Added to Waitlist.",
                "seatNumber", null,
                "status", "WAITLISTED"
        );
    }

    public Queue<String> getWaitlist(Long examId) {
        return waitlists.getOrDefault(examId, new LinkedList<>());
    }
}