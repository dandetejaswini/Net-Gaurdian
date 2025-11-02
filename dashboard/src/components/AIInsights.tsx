import { useFetch } from "../hooks/useFetch";

const AIInsights = () => {
  const { data, loading, error } = useFetch("ai-insights");

  return (
    <div className="bg-white shadow rounded p-4">
      <h3 className="font-semibold mb-2">AI Insights</h3>
      {loading ? (
        <p>Loading insights...</p>
      ) : error ? (
        <p className="text-red-500">Failed to load insights</p>
      ) : data?.length ? (
        <ul className="list-disc list-inside">
          {data.map((insight: any, idx: number) => (
            <li key={idx}>{insight}</li>
          ))}
        </ul>
      ) : (
        <p>No insights available</p>
      )}
    </div>
  );
};

export default AIInsights;
