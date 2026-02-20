package com.seat.seatallocator.service;

import com.seat.seatallocator.entity.Exam;
import com.seat.seatallocator.repository.ExamRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.*;

@Service
@RequiredArgsConstructor
public class ExamService {

    private final ExamRepository examRepository;

    // Waitlist queue per exam
    private final Map<Long, Queue<String>> waitlists = new HashMap<>();

    public Exam addExam(Exam exam) {
        if (exam.getTotalSeats() <= 0) {
            throw new IllegalArgumentException("totalSeats must be > 0");
        }

        // if app didn't send seatsAvailable, default to totalSeats
        if (exam.getAvailableSeats() <= 0) {
            exam.setAvailableSeats(exam.getTotalSeats());
        }

        exam.setNextSeatNumber(1);
        return examRepository.save(exam);
    }

    public List<Exam> getAllExams() {
        return examRepository.findAll();
    }

    // Heap: upcoming exams sorted by nearest date first
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

    // Register student: allocate seat and decrement available seats
    public String registerStudent(Long examId, String studentName) {

        Exam exam = examRepository.findById(examId)
                .orElseThrow(() -> new RuntimeException("Exam not found"));

        if (exam.getAvailableSeats() > 0) {
            int seatNumber = exam.getNextSeatNumber();
            exam.setNextSeatNumber(seatNumber + 1);
            exam.setAvailableSeats(exam.getAvailableSeats() - 1);
            examRepository.save(exam);
            return "Seat Allocated: " + seatNumber;
        }

        waitlists.computeIfAbsent(examId, k -> new LinkedList<>()).offer(studentName);
        return "Seats Full. Added to Waitlist.";
    }

    public Queue<String> getWaitlist(Long examId) {
        return waitlists.getOrDefault(examId, new LinkedList<>());
    }
}