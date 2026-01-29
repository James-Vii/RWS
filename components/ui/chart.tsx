"use client";

import * as React from "react";
import {
  PieChart as RechartsPieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { cn } from "@/lib/utils";

export type ChartConfig = Record<
  string,
  {
    label?: string;
    color?: string;
  }
>;

interface ChartContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  config: ChartConfig;
  children: React.ReactElement;
}

export function ChartContainer({
  config,
  children,
  className,
  ...props
}: ChartContainerProps) {
  return (
    <div
      data-chart-config={JSON.stringify(config)}
      className={cn(
        "relative flex w-full items-center justify-center",
        className,
      )}
      {...props}
    >
      <ResponsiveContainer width="100%" height="100%">
        {children}
      </ResponsiveContainer>
    </div>
  );
}

export function ChartTooltip({ cursor = false, content }: any) {
  return <Tooltip cursor={cursor} content={content} />;
}

export function ChartTooltipContent({ hideLabel }: { hideLabel?: boolean }) {
  return (
    <div className="bg-white border rounded-md shadow-sm px-2 py-1 text-sm">
      {!hideLabel && <p className="font-medium">Visitors</p>}
      <p className="text-gray-500">Browser share</p>
    </div>
  );
}
