interface SummaryCardProps {
  title: string;
  value: string | number;
  loading?: boolean;
}

const SummaryCard = ({ title, value, loading }: SummaryCardProps) => (
  <div className="bg-white shadow rounded p-4 flex flex-col items-center">
    <h3 className="text-gray-500">{title}</h3>
    {loading ? (
      <p className="text-lg font-bold animate-pulse">Loading...</p>
    ) : (
      <p className="text-2xl font-bold">{value}</p>
    )}
  </div>
);

export default SummaryCard;
