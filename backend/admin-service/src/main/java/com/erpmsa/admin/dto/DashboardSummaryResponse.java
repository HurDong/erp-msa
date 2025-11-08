package com.erpmsa.admin.dto;

import java.util.List;

public record DashboardSummaryResponse(
        List<OverviewCard> overviewCards,
        List<PerformancePoint> performanceOverview,
        List<Activity> recentActivities
) {

    public record OverviewCard(
            String id,
            String title,
            double value,
            String prefix,
            String suffix,
            String change,
            String trend,
            String description,
            String gradient,
            String color,
            List<Double> chartData,
            String chartType,
            String icon
    ) {}

    public record PerformancePoint(
            String month,
            double revenue,
            double trend
    ) {}

    public record Activity(
            String id,
            String user,
            String action,
            String target,
            String time,
            String initials,
            String color,
            String type,
            boolean isNew
    ) {}
}

