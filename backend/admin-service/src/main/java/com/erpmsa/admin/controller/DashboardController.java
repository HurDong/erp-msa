package com.erpmsa.admin.controller;

import com.erpmsa.admin.dto.DashboardSummaryResponse;
import com.erpmsa.admin.dto.DashboardSummaryResponse.Activity;
import com.erpmsa.admin.dto.DashboardSummaryResponse.OverviewCard;
import com.erpmsa.admin.dto.DashboardSummaryResponse.PerformancePoint;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin")
public class DashboardController {

    @GetMapping("/dashboard")
    public DashboardSummaryResponse getDashboardSummary() {
        return new DashboardSummaryResponse(
                overviewCards(),
                performanceOverview(),
                recentActivities()
        );
    }

    private List<OverviewCard> overviewCards() {
        return List.of(
                new OverviewCard(
                        "employees",
                        "전체 직원",
                        248,
                        "",
                        "명",
                        "+12%",
                        "up",
                        "활동 중인 직원",
                        "from-[#A8C5FF]/20 to-[#A8C5FF]/10",
                        "#A8C5FF",
                        List.of(220d, 225d, 230d, 235d, 242d, 248d),
                        "line",
                        "users"
                ),
                new OverviewCard(
                        "inventoryValue",
                        "재고 가치",
                        1.2,
                        "$",
                        "M",
                        "+8%",
                        "up",
                        "총 재고 가치",
                        "from-[#AEE2D2]/20 to-[#AEE2D2]/10",
                        "#AEE2D2",
                        List.of(0.9, 1.0, 1.05, 1.15, 1.18, 1.2),
                        "bar",
                        "package"
                ),
                new OverviewCard(
                        "monthlyRevenue",
                        "월 매출",
                        485,
                        "$",
                        "K",
                        "+23%",
                        "up",
                        "이번 달",
                        "from-[#C9BAFF]/20 to-[#C9BAFF]/10",
                        "#C9BAFF",
                        List.of(350d, 380d, 410d, 430d, 460d, 485d),
                        "area",
                        "dollar-sign"
                ),
                new OverviewCard(
                        "operatingCost",
                        "운영 비용",
                        312,
                        "$",
                        "K",
                        "-5%",
                        "down",
                        "이번 달",
                        "from-[#FFD3B4]/20 to-[#FFD3B4]/10",
                        "#FFD3B4",
                        List.of(330d, 328d, 325d, 320d, 315d, 312d),
                        "dual",
                        "trending-down"
                )
        );
    }

    private List<PerformancePoint> performanceOverview() {
        return List.of(
                new PerformancePoint("1월", 320, 310),
                new PerformancePoint("2월", 350, 340),
                new PerformancePoint("3월", 380, 375),
                new PerformancePoint("4월", 410, 405),
                new PerformancePoint("5월", 450, 440),
                new PerformancePoint("6월", 485, 475)
        );
    }

    private List<Activity> recentActivities() {
        return List.of(
                new Activity("activity-1", "김서현", "새로운 직원을 추가했습니다", "이준호", "2시간 전", "김", "#A8C5FF", "employee", true),
                new Activity("activity-2", "박민수", "재고를 업데이트했습니다", "제품 SKU-1234", "4시간 전", "박", "#AEE2D2", "inventory", false),
                new Activity("activity-3", "이지은", "인보이스를 생성했습니다", "INV-2024-001", "6시간 전", "이", "#C9BAFF", "invoice", false),
                new Activity("activity-4", "정태양", "지출을 승인했습니다", "$1,250.00", "8시간 전", "정", "#FFD3B4", "expense", false),
                new Activity("activity-5", "최수빈", "급여를 업데이트했습니다", "2024년 3월", "10시간 전", "최", "#FFA8C5", "payroll", false)
        );
    }
}

