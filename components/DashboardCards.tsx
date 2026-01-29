"use client";
import React, { useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { PieChart, Pie, ResponsiveContainer } from "recharts";
import { ChartContainer } from "@/components/ui/chart";

const DashboardCards = () => {
  const [collateralData] = useState([
    {
      label: "Tokenized Real Estate",
      value: 60,
      color: "#165BED",
      change: "+3.4%",
    },
    {
      label: "Crypto Collateral",
      value: 25,
      color: "#3B82F6",
      change: "+3.4%",
    },
    {
      label: "Fiat-backed Notes/Bonds",
      value: 10,
      color: "#93C5FD",
      change: "+3.4%",
    },
    { label: "Other RWAs", value: 5, color: "#BFDBFE", change: "+3.4%" },
  ]);

  const [capitalData] = useState([
    { name: "Earned interest (YTD)", value: 41, fill: "#1A56DB" },
    { name: "Staking / Yield", value: 18, fill: "#3B82F6" },
    { name: "Idle Capital", value: 29, fill: "#60A5FA" },
    { name: "Fees & Ops", value: 12, fill: "#BFDBFE" },
  ]);

  const [fundData] = useState([
    { name: "Deployed in Loans", value: 46.4, fill: "#165BED" },
    { name: "Stablecoins", value: 32.1, fill: "#31A4FF" },
    { name: "Fiat Balances", value: 21.4, fill: "#8BCEFF" },
  ]);

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="flex flex-col p-2 border rounded-xl">
          <CardHeader
            title="Collateral Composition"
            amount="$10,473.10"
            percentage="11.8%"
            percentageColor="red"
            showSelect
          />

          <div className="flex h-2 w-full rounded-full overflow-hidden mb-5 mt-5 bg-white">
            {collateralData.map((w, i) => (
              <div
                key={i}
                className="h-2 rounded-full"
                style={{
                  width: `${w.value}%`,
                  backgroundColor: w.color,
                  marginRight: i !== collateralData.length - 1 ? "2px" : "0",
                }}
              ></div>
            ))}
          </div>

          <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-0">
            {collateralData.map((item) => (
              <div
                key={item.label}
                className="p-3 border rounded-lg flex flex-col items-start justify-between"
              >
                <div className="flex items-center gap-2 mb-1">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span className="text-sm text-[#8E8E93] font-normal font-sf-pro">
                    {item.label}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-xl font-semibold font-sf-pro text-[#242424]">
                    {item.value.toFixed(1)}%
                  </span>
                  <span className="text-green-500 text-sm font-medium">
                    {item.change}
                  </span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="flex flex-col p-2 border rounded-xl">
          <CardHeader
            title="Capital Performance"
            amount="$20,500.10"
            percentage="5.9%"
            percentageColor="green"
            showSelect
          />
          <CardContent className="space-y-3">
            {capitalData.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between text-sm font-medium text-[#8E8E93]"
              >
                <div className="flex-1">
                  <p className="mb-1 text-[#8E8E93] font-normal font-sf-pro">
                    {item.name}
                  </p>
                  <div
                    className="h-7 rounded-sm transition-all duration-500"
                    style={{
                      width: `${item.value}%`,
                      backgroundColor: item.fill,
                    }}
                  ></div>
                </div>
                <span className="ml-3 w-10 text-right text-[#3A3A3C] font-sf-pro">
                  {item.value}%
                </span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="flex flex-col p-2 border space-y-6 rounded-xl">
          <CardHeader
            title="Total Fund Distribution"
            amount="$20,500.10"
            percentage="5.9%"
            percentageColor="green"
            showSelect
          />

          <CardContent className="flex flex-col sm:flex-col md:flex-row items-center justify-center gap-4 p-2">
            <div className="flex justify-center items-center w-full md:w-1/2">
              <div className="relative w-[250px] sm:w-[300px] md:w-[350px] h-[200px]">
                <PieChart width={350} height={200}>
                  <Pie
                    data={fundData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius="60%"
                    outerRadius="90%"
                    startAngle={170}
                    endAngle={-190}
                    paddingAngle={1}
                    cornerRadius={3.43}
                    stroke="none"
                    isAnimationActive={false}
                  />
                </PieChart>
              </div>
            </div>

            <div className="flex flex-col justify-center space-y-4 p-2 text-sm w-full md:w-1/2 max-w-[500px]">
              {fundData.map((item) => (
                <div key={item.name} className="flex items-start gap-2">
                  <span
                    className="w-3 h-3 rounded-full mt-1"
                    style={{ backgroundColor: item.fill }}
                  />
                  <div className="flex flex-col">
                    <span className="text-[#8E8E93] font-sf-pro">
                      {item.name}
                    </span>
                    <span className="font-normal text-[#3A3A3C] font-sf-pro">
                      {item.value}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardCards;
