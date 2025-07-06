'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import { ReactNode } from "react";
import {
  Briefcase,
  Sparkles,
  Wallet,
  LineChart,
  Gift,
  LogOut,
  Rocket,
  Sun,
  Moon,
} from "lucide-react";
import "@/app/globals.css";

function NavItem({
  href,
  icon,
  children,
}: {
  href: string;
  icon: React.ReactElement;
  children: ReactNode;
}) {
  return (
    <Link href={href}>
      <div className="flex items-center gap-2 p-2 rounded-lg hover:bg-white/60 dark:hover:bg-white/10 transition text-sm font-medium">
        {icon}
        <span>{children}</span>
      </div>
    </Link>
  );
}

export default function ClientDashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const prefersDark = saved === "dark" || (!saved && window.matchMedia("(prefers-color-scheme: dark)").matches);
    setDarkMode(prefersDark);
    document.documentElement.classList.toggle("dark", prefersDark);
  }, []);

  const toggleTheme = () => {
    const next = !darkMode;
    setDarkMode(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#e6f0ff] via-white to-[#f4faff] dark:from-gray-900 dark:via-gray-800 dark:to-black text-gray-800 dark:text-white">
      {/* Sidebar */}
      <aside className="w-64 hidden md:flex flex-col gap-6 px-6 py-10 backdrop-blur-md bg-white/50 dark:bg-white/10 border-r border-white/30 shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold tracking-tight">Client Panel</h2>
          <button
            onClick={toggleTheme}
            className="p-1 rounded hover:bg-white/20 transition"
            title="Toggle Theme"
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>

        <nav className="flex flex-col gap-3">
          <NavItem href="/dashboard/client" icon={<Rocket size={18} />}>Start a Project</NavItem>
          <NavItem href="/dashboard/client/projects" icon={<Briefcase size={18} />}>My Projects</NavItem>
          <NavItem href="/dashboard/client/recommended" icon={<Sparkles size={18} />}>Recommended Freelancers</NavItem>
          <NavItem href="/dashboard/client/wallet" icon={<Wallet size={18} />}>Wallet</NavItem>
          <NavItem href="/dashboard/client/stats" icon={<LineChart size={18} />}>Stats</NavItem>
          <NavItem href="/dashboard/client/rewards" icon={<Gift size={18} />}>FLR Rewards</NavItem>
          <NavItem href="/logout" icon={<LogOut size={18} />}>Logout</NavItem>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 px-4 py-6 md:px-8 md:py-10 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}

