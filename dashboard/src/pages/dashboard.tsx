import { useEffect, useState } from "react";
import ParentLayout from "../layouts/ParentLayout";
import SummaryCard from "../components/SummaryCard";
import { useFetch } from "../hooks/useFetch";

interface SummaryData {
  totalReports: number;
  unsafeActions: number;
  aiInsights: string;
}

const DashboardPage = () => {
  const { data, loading, error } = useFetch("dashboard-summary");

  const summary: SummaryData = data || {
    totalReports: 0,
    unsafeActions: 0,
    aiInsights: "No insights yet",
  };

  return (
    <ParentLayout>
      <h2 className="text-xl font-bold mb-4">Parent Dashboard</h2>

      {loading ? (
        <p>Loading summary...</p>
      ) : error ? (
        <p className="text-red-500">Error fetching dashboard data</p>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          <SummaryCard title="Total Reports" value={summary.totalReports} />
          <SummaryCard title="Unsafe Actions" value={summary.unsafeActions} />
          <SummaryCard title="AI Insights" value={summary.aiInsights} />
        </div>
      )}
    </ParentLayout>
  );
};

export default DashboardPage;
