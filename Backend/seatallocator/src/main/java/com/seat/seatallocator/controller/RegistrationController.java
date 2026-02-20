package com.seat.seatallocator.controller;

import com.seat.seatallocator.entity.Registration;
import com.seat.seatallocator.repository.RegistrationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/registrations")
@RequiredArgsConstructor
@CrossOrigin(origins="*")
public class RegistrationController {

    private final RegistrationRepository registrationRepository;

    // ✅ Mark payment
    @PostMapping("/{id}/pay")
    public Map<String, Object> pay(@PathVariable Long id) {

        Registration r = registrationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Registration not found"));

        r.setPaid(true);
        registrationRepository.save(r);

        return Map.of(
                "message", "Payment successful",
                "paid", true
        );
    }

    // ✅ Get registration for Status page
    @GetMapping("/{id}")
    public Registration getOne(@PathVariable Long id) {
        return registrationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Registration not found"));
    }
}