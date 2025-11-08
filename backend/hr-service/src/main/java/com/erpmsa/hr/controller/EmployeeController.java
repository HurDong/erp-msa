package com.erpmsa.hr.controller;

import com.erpmsa.hr.dto.DepartmentStatsResponse;
import com.erpmsa.hr.dto.EmployeeResponse;
import com.erpmsa.hr.service.EmployeeService;
import java.util.List;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/hr")
public class EmployeeController {

    private final EmployeeService employeeService;

    public EmployeeController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    @PreAuthorize("hasAuthority('hr:read')")
    @GetMapping("/employees")
    public List<EmployeeResponse> getEmployees() {
        return employeeService.findAllEmployees();
    }

    @PreAuthorize("hasAuthority('hr:read')")
    @GetMapping("/departments/stats")
    public List<DepartmentStatsResponse> getDepartmentStats() {
        return employeeService.getDepartmentStats();
    }
}

