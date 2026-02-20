package com.seat.seatallocator.repository;

import com.seat.seatallocator.entity.Exam;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExamRepository extends JpaRepository<Exam, Long> {}