import { ReactNode } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

const ParentLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="p-4">{children}</main>
      </div>
    </div>
  );
};

export default ParentLayout;
