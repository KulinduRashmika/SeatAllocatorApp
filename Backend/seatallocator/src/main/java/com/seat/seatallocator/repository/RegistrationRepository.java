package com.seat.seatallocator.repository;

import com.seat.seatallocator.entity.Registration;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RegistrationRepository extends JpaRepository<Registration, Long> {
}