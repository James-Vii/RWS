"use client";

import React, { SVGProps, useState } from "react";
import {
  ArrowsPointingOutIcon,
  ArrowsPointingInIcon,
  Squares2X2Icon,
} from "@heroicons/react/24/solid";
import {
  Activity,
  Chart2,
  Moneys,
  Receipt1,
  ShieldSearch,
  ShieldTick,
  Shop,
  IconProps,
} from "iconsax-reactjs";
import { Search } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type AnyIcon = React.FC<IconProps> | React.FC<SVGProps<SVGSVGElement>>;

interface MenuItem {
  name: string;
  icon: AnyIcon;
  href: string;
  color?: string;
  variant?: IconProps["variant"];
}

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (value: boolean) => void;
}

export function Sidebar({ collapsed, setCollapsed }: SidebarProps) {
  const pathname = usePathname();
  const [searchTerm, setSearchTerm] = useState("");

  const menu: MenuItem[] = [
    { name: "Dashboard", icon: Squares2X2Icon, href: "/dashboard" },
    {
      name: "Transactions",
      icon: Receipt1,
      href: "/transactions",
      color: "#8E8E93",
      variant: "Bold",
    },
    {
      name: "Securitization & Transfer",
      icon: ShieldTick,
      href: "/securitization",
      color: "#8E8E93",
      variant: "Bold",
    },
    {
      name: "Tokenization Hub",
      icon: Moneys,
      href: "/tokenization",
      color: "#8E8E93",
      variant: "Bold",
    },
    {
      name: "Marketplace",
      icon: Shop,
      href: "/marketplace",
      color: "#8E8E93",
      variant: "Bold",
    },
    {
      name: "Liquid Pools",
      icon: Activity,
      href: "/pools",
      color: "#8E8E93",
      variant: "Bold",
    },
    {
      name: "Risk & Compliance",
      icon: ShieldSearch,
      href: "/risk",
      color: "#8E8E93",
      variant: "Bold",
    },
    {
      name: "Reports & Analytics",
      icon: Chart2,
      href: "/reports",
      color: "#8E8E93",
      variant: "Bold",
    },
  ];

  const filteredMenu = menu.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <aside
      className={`fixed left-0 top-0 h-full flex flex-col border-r bg-[#F9FAFB] transition-all duration-300 z-50 ${
        collapsed ? "w-[80px]" : "w-[260px]"
      }`}
    >
      <div className="border-b h-[62px] flex items-center justify-between px-5 font-bold text-xl bg-[#F9FAFB] font-helvetica-bold">
        {!collapsed && <span>RWS</span>}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1 hover:bg-gray-100 rounded-md transition-transform duration-300"
        >
          <div
            className={`transition-transform duration-300 cursor-pointer ${
              collapsed ? "rotate-180" : ""
            }`}
          >
            {collapsed ? (
              <ArrowsPointingOutIcon className="w-5 h-5 text-gray-500" />
            ) : (
              <ArrowsPointingInIcon className="w-5 h-5 text-gray-500" />
            )}
          </div>
        </button>
      </div>

      {!collapsed && (
        <div className="pt-4 px-4">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      )}

      <nav className="flex-1 overflow-y-auto mt-4">
        {filteredMenu.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          // const activeColor = "#165BED";
          // const inactiveColor = "#8E8E93";

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`group flex items-center rounded-md mx-3 mb-1 transition-colors font-inter ${
                isActive
                  ? "bg-white border border-gray-200 text-blue-600 p-[6px_8px]"
                  : "text-[#8E8E93] font-normal hover:text-blue-600 hover:bg-white"
              } ${collapsed ? "justify-center py-3" : "px-4 py-2.5"}`}
            >
              {"variant" in item ? (
                <Icon
                  size="24"
                  // color={isActive ? activeColor : inactiveColor}
                  variant={item.variant}
                />
              ) : (
                <Icon
                  className={`w-6 h-6 flex-shrink-0 transition-colors duration-200 ${
                    isActive
                      ? "text-[#165BED]"
                      : "text-[#8E8E93] group-hover:text-[#165BED]"
                  }`}
                />
              )}
              {!collapsed && (
                <span className="ml-3 text-[15px]">{item.name}</span>
              )}
            </Link>
          );
        })}
      </nav>

      <button
        className={`group border-t text-gray-600 text-sm transition-colors hover:text-blue-600 flex items-center gap-2 w-full cursor-pointer ${
          collapsed ? "justify-center py-3" : "py-3 pl-6 text-left"
        }`}
      >
        <div
          className="w-5 h-5 bg-[url('/logout.svg')] group-hover:bg-[url('/logout-hover.svg')] bg-center bg-no-repeat bg-contain transition-all"
          aria-label="Logout icon"
        ></div>
        {!collapsed && <span>Logout</span>}
      </button>
    </aside>
  );
}
