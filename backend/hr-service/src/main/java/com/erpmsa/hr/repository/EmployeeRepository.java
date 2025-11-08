package com.erpmsa.hr.repository;

import com.erpmsa.hr.domain.Department;
import com.erpmsa.hr.domain.Employee;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {

    List<Employee> findByDepartment(Department department);
}

