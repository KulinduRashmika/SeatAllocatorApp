package com.seat.seatallocator.controller;

import com.seat.seatallocator.entity.Exam;
import com.seat.seatallocator.service.ExamService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Queue;

@RestController
@RequestMapping("/api/exams")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class ExamController {

    private final ExamService examService;

    @PostMapping
    public Exam addExam(@RequestBody Exam exam) {
        return examService.addExam(exam);
    }

    @GetMapping
    public List<Exam> getAllExams() {
        return examService.getAllExams();
    }

    // ✅ heap sorted list
    @GetMapping("/sorted-heap")
    public List<Exam> sortedHeap() {
        return examService.getExamsSortedByDateHeap();
    }

    // ✅ register (availableSeats - 1)
    @PostMapping("/{id}/register")
    public String register(@PathVariable Long id, @RequestParam String name) {
        return examService.registerStudent(id, name);
    }

    @GetMapping("/{id}/waitlist")
    public Queue<String> waitlist(@PathVariable Long id) {
        return examService.getWaitlist(id);
    }
}