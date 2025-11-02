import AdminLayout from "../layouts/AdminLayout";
import { useFetch } from "../hooks/useFetch";

interface User {
  id: number;
  name: string;
  role: string;
}

const AdminPage = () => {
  // Call your hook with the endpoint (no fetchData needed)
  const { data: users, loading, error } = useFetch("users");

  return (
    <AdminLayout>
      <h2 className="text-xl font-bold mb-4">Admin Dashboard</h2>

      {loading ? (
        <p>Loading users...</p>
      ) : error ? (
        <p className="text-red-500">Error loading users</p>
      ) : (
        <div>
          <h3 className="font-semibold mb-2">Users</h3>
          <ul className="space-y-1">
            {users.map((user: User) => (
              <li key={user.id}>
                {user.name} — <span className="text-sm text-gray-500">{user.role}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminPage;
