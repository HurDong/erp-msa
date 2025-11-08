package com.erpmsa.hr.config;

import com.erpmsa.hr.domain.Department;
import com.erpmsa.hr.domain.Employee;
import com.erpmsa.hr.domain.EmploymentStatus;
import com.erpmsa.hr.repository.DepartmentRepository;
import com.erpmsa.hr.repository.EmployeeRepository;
import java.time.LocalDate;
import java.util.Locale;
import java.util.Map;
import java.util.Random;
import java.util.stream.IntStream;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
public class EmployeeDataInitializer implements CommandLineRunner {

    private static final Logger log = LoggerFactory.getLogger(EmployeeDataInitializer.class);

    private final EmployeeRepository employeeRepository;
    private final DepartmentRepository departmentRepository;

    private final Random random = new Random();

    public EmployeeDataInitializer(EmployeeRepository employeeRepository, DepartmentRepository departmentRepository) {
        this.employeeRepository = employeeRepository;
        this.departmentRepository = departmentRepository;
    }

    @Override
    @Transactional
    public void run(String... args) {
        if (employeeRepository.count() > 0) {
            log.info("Employee data already present. Skipping initialization.");
            return;
        }

        Map<String, Integer> departmentTargets = Map.of(
                "DEV", 85,
                "SALES", 45,
                "MARKETING", 32,
                "OPERATIONS", 28,
                "FINANCE", 22,
                "HR", 18,
                "LEGAL", 12,
                "OTHER", 6);

        departmentTargets.forEach((code, count) -> {
            Department department = departmentRepository.findByCode(code)
                    .orElseGet(() -> departmentRepository.save(createDepartment(code)));

            IntStream.range(0, count)
                    .mapToObj(index -> buildEmployee(department, index))
                    .forEach(employeeRepository::save);
        });

        log.info("Generated {} employees across {} departments.", employeeRepository.count(),
                departmentRepository.count());
    }

    private Department createDepartment(String code) {
        return switch (code) {
            case "DEV" -> new Department(code, "개발팀", "제품 개발 및 플랫폼 유지보수");
            case "SALES" -> new Department(code, "영업팀", "매출 확대와 고객 대응");
            case "MARKETING" -> new Department(code, "마케팅팀", "브랜드 캠페인과 리드 제너레이션");
            case "OPERATIONS" -> new Department(code, "운영팀", "운영 프로세스 및 지원");
            case "FINANCE" -> new Department(code, "재무팀", "재무 관리와 회계");
            case "HR" -> new Department(code, "인사팀", "채용 및 인사 전략");
            case "LEGAL" -> new Department(code, "법무팀", "법률 자문 및 컴플라이언스");
            default -> new Department(code, "기타", "프로젝트 기반 협업팀");
        };
    }

    private Employee buildEmployee(Department department, int index) {
        String firstName = SAMPLE_FIRST_NAMES[random.nextInt(SAMPLE_FIRST_NAMES.length)];
        String lastName = SAMPLE_LAST_NAMES[random.nextInt(SAMPLE_LAST_NAMES.length)];
        String email = generateEmail(firstName, lastName, department.getCode(), index);

        LocalDate hireDate = LocalDate.now()
                .minusYears(random.nextInt(8))
                .minusMonths(random.nextInt(12))
                .minusDays(random.nextInt(28));

        EmploymentStatus status = random.nextDouble() < 0.9 ? EmploymentStatus.ACTIVE : EmploymentStatus.ON_LEAVE;

        String position = switch (department.getCode()) {
            case "DEV" -> randomPick(SOFTWARE_POSITIONS);
            case "SALES" -> randomPick(SALES_POSITIONS);
            case "MARKETING" -> randomPick(MARKETING_POSITIONS);
            case "FINANCE" -> randomPick(FINANCE_POSITIONS);
            case "HR" -> randomPick(HR_POSITIONS);
            case "LEGAL" -> randomPick(LEGAL_POSITIONS);
            case "OPERATIONS" -> randomPick(OPERATIONS_POSITIONS);
            default -> "Specialist";
        };

        return new Employee(
                firstName,
                lastName,
                email,
                position,
                department,
                hireDate,
                status);
    }

    private String randomPick(String[] values) {
        return values[random.nextInt(values.length)];
    }

    private String generateEmail(String firstName, String lastName, String departmentCode, int index) {
        String sanitizedFirst = firstName.toLowerCase(Locale.KOREAN).replaceAll("[^a-z0-9]", "");
        String sanitizedLast = lastName.toLowerCase(Locale.KOREAN).replaceAll("[^a-z0-9]", "");
        return sanitizedFirst + "." + sanitizedLast + "-" + departmentCode.toLowerCase(Locale.ROOT) + index
                + "@erpmsa.local";
    }

    private static final String[] SAMPLE_FIRST_NAMES = {
            "서현", "민수", "지은", "태양", "수빈", "지호", "하린", "도윤", "예린", "주원",
            "서준", "하늘", "민준", "하윤", "지원", "윤호", "소윤", "가은", "현우", "다인"
    };

    private static final String[] SAMPLE_LAST_NAMES = {
            "김", "이", "박", "최", "정", "한", "조", "강", "윤", "임"
    };

    private static final String[] SOFTWARE_POSITIONS = {
            "백엔드 엔지니어", "프론트엔드 엔지니어", "풀스택 개발자", "QA 엔지니어", "DevOps 엔지니어", "스마트팩토리 엔지니어"
    };
    private static final String[] SALES_POSITIONS = {
            "영업 매니저", "어카운트 매니저", "세일즈 리드", "파트너십 매니저"
    };
    private static final String[] MARKETING_POSITIONS = {
            "콘텐츠 마케터", "디지털 마케터", "브랜드 매니저", "퍼포먼스 마케터"
    };
    private static final String[] OPERATIONS_POSITIONS = {
            "운영 매니저", "프로세스 분석가", "프로젝트 코디네이터"
    };
    private static final String[] FINANCE_POSITIONS = {
            "재무 분석가", "회계사", "세무 전문가", "재무 기획 매니저"
    };
    private static final String[] HR_POSITIONS = {
            "HR 매니저", "리크루터", "조직문화 담당자", "교육 담당자"
    };
    private static final String[] LEGAL_POSITIONS = {
            "법무 담당자", "컴플라이언스 오피서", "계약 관리자"
    };
}
