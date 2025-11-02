import { Line } from "react-chartjs-2";
import { useFetch } from "../hooks/useFetch";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const ActivityChart = () => {
  const { data, loading, error } = useFetch("activity");

  const chartData = {
    labels: data?.map((d: any) => d.date) || [],
    datasets: [
      {
        label: "User Activity",
        data: data?.map((d: any) => d.count) || [],
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
      },
    ],
  };

  return (
    <div className="bg-white shadow rounded p-4">
      <h3 className="font-semibold mb-2">Activity</h3>
      {loading ? (
        <p>Loading chart...</p>
      ) : error ? (
        <p className="text-red-500">Failed to load chart</p>
      ) : (
        <Line data={chartData} />
      )}
    </div>
  );
};

export default ActivityChart;
