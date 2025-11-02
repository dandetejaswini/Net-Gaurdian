interface Report {
  id: number;
  user: string;
  action: string;
  date: string;
  status: string;
}

interface ReportsTableProps {
  data: Report[];
}

const ReportsTable = ({ data }: ReportsTableProps) => (
  <div className="overflow-x-auto">
    <table className="w-full table-auto border-collapse border border-gray-300">
      <thead>
        <tr className="bg-gray-100">
          <th className="border px-4 py-2">ID</th>
          <th className="border px-4 py-2">User</th>
          <th className="border px-4 py-2">Action</th>
          <th className="border px-4 py-2">Date</th>
          <th className="border px-4 py-2">Status</th>
        </tr>
      </thead>
      <tbody>
        {data.map((report) => (
          <tr key={report.id} className="hover:bg-gray-50">
            <td className="border px-4 py-2">{report.id}</td>
            <td className="border px-4 py-2">{report.user}</td>
            <td className="border px-4 py-2">{report.action}</td>
            <td className="border px-4 py-2">{new Date(report.date).toLocaleString()}</td>
            <td className="border px-4 py-2">{report.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default ReportsTable;
