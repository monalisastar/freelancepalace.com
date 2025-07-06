'use client';

import { useEffect, useState } from 'react';
import { SessionProvider } from 'next-auth/react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Menu } from 'lucide-react';

export default function FreelancerLayout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <FreelancerProtectedLayout>{children}</FreelancerProtectedLayout>
    </SessionProvider>
  );
}

function FreelancerProtectedLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [darkMode, setDarkMode] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.replace('/login');
    }
  }, [status, router]);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  if (status === 'loading') {
    return (
      <div className="flex justify-center items-center h-screen text-gray-500 dark:text-gray-300">
        ⏳ Loading dashboard...
      </div>
    );
  }

  if (status === 'unauthenticated') return null;

  const user = session?.user;

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white">
      {/* Sidebar */}
      <aside
        className={`w-full md:w-64 p-6 backdrop-blur-md bg-white/10 dark:bg-black/20 border-b md:border-b-0 md:border-r border-white/10 shadow-xl transition-all duration-300 ${
          sidebarOpen ? 'block' : 'hidden'
        } md:block`}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-blue-300 tracking-wide">Freelancer Palace</h2>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="text-xs px-2 py-1 rounded border border-white/20 hover:bg-white/10"
          >
            {darkMode ? '☀ Light' : '🌙 Dark'}
          </button>
        </div>
        <nav className="space-y-3 text-sm">
          <a href="/dashboard/freelancer" className="block hover:underline">🏠 Home</a>
          <a href="/dashboard/freelancer/proposals" className="block hover:underline">📝 Proposals</a>
          <a href="/dashboard/freelancer/wallet" className="block hover:underline">💰 Wallet</a>
          <a href="/dashboard/freelancer/notifications" className="block hover:underline">🔔 Notifications</a>
          <button
            onClick={() => signOut({ callbackUrl: '/login' })}
            className="mt-6 text-xs bg-red-600 hover:bg-red-700 px-4 py-2 rounded shadow"
          >
            🚪 Logout
          </button>
        </nav>
      </aside>

      {/* Topbar for mobile */}
      <div className="flex md:hidden items-center justify-between p-4 sticky top-0 z-50 bg-black/40 backdrop-blur border-b border-white/10">
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-white">
          <Menu size={20} />
        </button>
        <h2 className="text-base font-semibold text-white tracking-tight">Dashboard</h2>
      </div>

      {/* Main Content */}
      <main className="flex-1 px-4 sm:px-6 md:px-10 py-6 md:py-10">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-semibold">
            👋 Welcome {user?.name || 'Freelancer'}
          </h1>
          <p className="text-sm text-gray-300">🔓 Access Granted · Let’s work.</p>
        </div>

        <div className="rounded-xl p-4 bg-white/5 dark:bg-white/10 backdrop-blur-lg shadow-lg transition">
          {children}
        </div>
      </main>
    </div>
  );
}


