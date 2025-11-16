package com.erpmsa.hr.controller;

import com.erpmsa.hr.dto.DepartmentStatsResponse;
import com.erpmsa.hr.dto.EmployeeResponse;
import com.erpmsa.hr.dto.ProductResponse;
import com.erpmsa.hr.service.EmployeeService;
import com.erpmsa.hr.service.InventoryClientService;
import java.util.List;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api/hr")
public class EmployeeController {

    private final EmployeeService employeeService;
    private final InventoryClientService inventoryClientService;

    public EmployeeController(EmployeeService employeeService, InventoryClientService inventoryClientService) {
        this.employeeService = employeeService;
        this.inventoryClientService = inventoryClientService;
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

    @PreAuthorize("hasAuthority('hr:read')")
    @GetMapping("/products")
    public Mono<List<ProductResponse>> getProducts() {
        return inventoryClientService.getProducts();
    }

    @PreAuthorize("hasAuthority('hr:read')")
    @GetMapping("/products/{id}")
    public Mono<ProductResponse> getProduct(@PathVariable Long id) {
        return inventoryClientService.getProduct(id);
    }
}

