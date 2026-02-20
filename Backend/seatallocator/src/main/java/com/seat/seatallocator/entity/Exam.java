package com.seat.seatallocator.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Entity
@Data
public class Exam {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    // UI shows "exam.date" (string like 2026-03-01)
    private LocalDate date;

    // UI shows "exam.time" (store as simple string for now: "09:00 AM")
    private String time;

    // UI uses "exam.closing"
    @JsonProperty("closing")
    private LocalDate closingDate;

    // UI uses "exam.type" and "exam.priority"
    private String type;      // "Exam" | "Batch Repeat" | "Special Repeat"
    private String priority;  // "High" | "Normal" | "Low"

    private int totalSeats;

    // UI uses "seatsAvailable"
    @JsonProperty("seatsAvailable")
    private int availableSeats;

    private int nextSeatNumber = 1;
}