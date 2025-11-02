import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const RoleSwitch = () => {
  const { user, switchRole } = useContext(AuthContext);

  if (!user) return null;

  return (
    <div className="flex items-center gap-2">
      <span>Role:</span>
      <select
        value={user.role}
        onChange={(e) => switchRole(e.target.value as "parent" | "admin")}
        className="border p-1 rounded"
      >
        <option value="parent">Parent</option>
        <option value="admin">Admin</option>
      </select>
    </div>
  );
};

export default RoleSwitch;
