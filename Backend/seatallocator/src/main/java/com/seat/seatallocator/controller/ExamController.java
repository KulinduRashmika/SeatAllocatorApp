package com.seat.seatallocator.controller;

import com.seat.seatallocator.entity.Exam;
import com.seat.seatallocator.service.ExamService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
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

    @GetMapping("/sorted-heap")
    public List<Exam> sortedHeap() {
        return examService.getExamsSortedByDateHeap();
    }

    // ✅ NEW REGISTER (JSON body)
    @PostMapping("/{id}/register")
    public Map<String, Object> register(
            @PathVariable Long id,
            @RequestBody Map<String, String> body
    ) {
        return examService.registerStudent(
                id,
                body.get("studentName"),
                body.get("regNo"),
                body.get("email")
        );
    }

    @GetMapping("/{id}/waitlist")
    public Queue<String> waitlist(@PathVariable Long id) {
        return examService.getWaitlist(id);
    }
}