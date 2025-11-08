package com.erpmsa.hr.dto;

import java.time.LocalDate;

public record EmployeeResponse(
        Long id,
        String fullName,
        String email,
        String position,
        String department,
        LocalDate hireDate,
        String status
) {
}

