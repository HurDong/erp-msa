package com.erpmsa.hr.dto;

public record DepartmentStatsResponse(
        String department,
        long count,
        double ratio
) {
}

