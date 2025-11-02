import ParentLayout from "../layouts/ParentLayout";
import ReportsTable from "../components/ReportsTable";
import { useFetch } from "../hooks/useFetch";

const ReportsPage = () => {
  const { data, loading, error } = useFetch("reports");

  return (
    <ParentLayout>
      <h2 className="text-xl font-bold mb-4">Reports</h2>

      {loading ? (
        <p>Loading reports...</p>
      ) : error ? (
        <p className="text-red-500">Error loading reports</p>
      ) : data?.length ? (
        <ReportsTable data={data} />
      ) : (
        <p>No reports found</p>
      )}
    </ParentLayout>
  );
};

export default ReportsPage;
