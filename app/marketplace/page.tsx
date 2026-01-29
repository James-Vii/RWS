"use client";
import { useState } from "react";
import { Sidebar } from "@/components/sidebar";

export default function DashboardPage() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      <main
        className={`flex-1 overflow-y-auto transition-all duration-300 p-2 ${
          collapsed ? "ml-[80px]" : "ml-[260px]"
        }`}
      >
        <div className="flex justify-center items-center h-full">
          Marketplace
        </div>
      </main>
    </div>
  );
}
