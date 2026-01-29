"use client";
import React, { useState } from "react";
import { EllipsisVerticalIcon, PlusIcon, Search } from "lucide-react";
import { Trash } from "iconsax-reactjs";
import AssetInformation from "@/app/dashboard/components/AssetInformation";
import LoanDetails from "@/app/dashboard/components/LoanDetails";
import RiskStatus from "@/app/dashboard/components/RiskStatus";
import ManagementAnalytics from "@/app/dashboard/components/ManagementAnalytics";

export default function DigitalAssetsSection() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("Asset Information");

  const tabs = [
    "Asset Information",
    "Loan Details",
    "Risk & Status",
    "Management & Analytics",
  ];

  return (
    <section className="bg-white border rounded-xl overflow-hidden mx-6 mb-10">
      <div className="flex items-center justify-between p-4">
        <h2 className="text-lg font-semibold">Digital Assets</h2>
        <div className="relative flex items-center w-72">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-sm border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <EllipsisVerticalIcon className="w-5 h-5 ml-2 text-gray-500 cursor-pointer" />
        </div>
      </div>

      <div className="flex items-center gap-2 bg-[#F9FAFB] p-4">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm rounded-md font-medium font-sf-pro transition-colors cursor-pointer ${
              activeTab === tab
                ? "bg-[#165BED] text-white"
                : "bg-white text-[#8E8E93] hover:bg-[#8BCEFF] hover:text-white"
            }`}
          >
            {tab}
          </button>
        ))}
        <div className="ml-auto flex items-center gap-2">
          <button className="p-2 border rounded-lg hover:bg-gray-100 cursor-pointer">
            <PlusIcon className="w-5 h-5 text-gray-600" />
          </button>
          <button className="p-2 border rounded-lg hover:bg-gray-100 cursor-pointer">
            <Trash className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      <div className="">
        {activeTab === "Asset Information" && (
          <div className="mt-4">
            <AssetInformation />
          </div>
        )}
        {activeTab === "Loan Details" && (
          <div className="mt-4">
            <LoanDetails />
          </div>
        )}
        {activeTab === "Risk & Status" && (
          <div className="mt-4">
            <RiskStatus />
          </div>
        )}
        {activeTab === "Management & Analytics" && (
          <div className="mt-4">
            <ManagementAnalytics />
          </div>
        )}
      </div>
    </section>
  );
}
