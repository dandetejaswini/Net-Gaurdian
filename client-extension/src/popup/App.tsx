import React, { useEffect, useState } from "react";
import { getSetting, setSetting } from "../utils/storage";

export default function App() {
  const [role, setRole] = useState("adult");

  useEffect(() => {
    getSetting("role").then(r => r && setRole(r));
  }, []);

  async function toggleRole() {
    const newRole = role === "child" ? "adult" : "child";
    await setSetting("role", newRole);
    setRole(newRole);
  }

  return (
    <div style={{ width: 300, padding: 12 }}>
      <h3>NetGuardian</h3>
      <p>Current mode: <b>{role}</b></p>
      <button onClick={toggleRole}>
        Switch to {role === "child" ? "Adult" : "Child"} Mode
      </button>
    </div>
  );
}
