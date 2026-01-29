"use client";
import { useState } from "react";
import { BellAlertIcon, Cog6ToothIcon } from "@heroicons/react/24/solid";
import { Sidebar } from "@/components/sidebar";
import DashboardCards from "@/components/DashboardCards";
import DigitalAssetsSection from "@/components/DigitalAsset";

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
        <div className="space-y-6 bg-gray-50 p-4">
          <div className="bg-white rounded-tr-2xl rounded-tl-2xl pb-6 font-inter">
            <div className="border-b flex items-center justify-between font-normal text-xl p-[12px_16px] rounded-tr-2xl rounded-tl-2xl ">
              <div>
                <h1 className="text-md font-semibold text-[#344054]">
                  Good Morning, Jimmy <span className="text-[#FFB030]">☀</span>
                </h1>
                <p className="text-sm text-[#8E8E93]">
                  It’s Monday, 12 October 2024
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 border border-[#E4E7EC] rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                  <BellAlertIcon className="w-[18px] h-[18px] text-[#667085]" />
                </div>
                <div className="h-6 w-px bg-[#E4E7EC]"></div>
                <div className="flex items-center justify-center gap-2 px-4 h-10 border border-[#E4E7EC] rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                  <Cog6ToothIcon className="w-[18px] h-[18px] text-[#667085]" />
                  <span className="text-[#667085] text-sm font-medium">
                    Settings
                  </span>
                </div>
              </div>
            </div>

            <DashboardCards />
            <DigitalAssetsSection />
          </div>
        </div>
      </main>
    </div>
  );
}
