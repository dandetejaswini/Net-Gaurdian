import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import AdminLayout from "./layouts/AdminLayout";
import ParentLayout from "./layouts/ParentLayout";

export default function App() {
  const { pathname } = useLocation();

  if (pathname.startsWith("/admin")) return <AdminLayout><Outlet /></AdminLayout>;
  if (pathname.startsWith("/dashboard")) return <ParentLayout><Outlet /></ParentLayout>;
  return <Outlet />;
}
