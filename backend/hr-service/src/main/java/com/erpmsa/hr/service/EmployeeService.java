package com.erpmsa.hr.service;

import com.erpmsa.hr.domain.Department;
import com.erpmsa.hr.domain.Employee;
import com.erpmsa.hr.dto.DepartmentStatsResponse;
import com.erpmsa.hr.dto.EmployeeResponse;
import com.erpmsa.hr.repository.EmployeeRepository;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
public class EmployeeService {

    private final EmployeeRepository employeeRepository;

    public EmployeeService(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    public List<EmployeeResponse> findAllEmployees() {
        return employeeRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    public List<DepartmentStatsResponse> getDepartmentStats() {
        List<Employee> employees = employeeRepository.findAll();
        long total = employees.size();

        if (total == 0) {
            return List.of();
        }

        Map<Department, Long> grouped = employees.stream()
                .collect(Collectors.groupingBy(Employee::getDepartment, Collectors.counting()));

        return grouped.entrySet()
                .stream()
                .map(entry -> new DepartmentStatsResponse(
                        entry.getKey().getName(),
                        entry.getValue(),
                        Math.round((entry.getValue() * 1000.0 / total)) / 10.0
                ))
                .sorted((a, b) -> Long.compare(b.count(), a.count()))
                .toList();
    }

    private EmployeeResponse mapToResponse(Employee employee) {
        return new EmployeeResponse(
                employee.getId(),
                employee.getFullName(),
                employee.getEmail(),
                employee.getPosition(),
                employee.getDepartment().getName(),
                employee.getHireDate(),
                employee.getStatus().name()
        );
    }
}

