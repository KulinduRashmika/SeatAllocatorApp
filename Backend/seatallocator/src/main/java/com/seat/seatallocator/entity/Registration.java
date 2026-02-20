package com.seat.seatallocator.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Registration {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long examId;

    private String studentName;
    private String regNo;
    private String email;

    private Integer seatNumber; // null if waitlisted

    private String status; // ALLOCATED or WAITLISTED

    private boolean paid = false;
}