'use client';

import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';

export default function WelcomeCard() {
  const [user, setUser] = useState<any>(null);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) {
      const parsed = JSON.parse(stored);
      setUser(parsed);

      fetch(`/api/freelancer/summary?id=${parsed.id}`)
        .then(res => res.json())
        .then(data => {
          setStats(data);
          setLoading(false);
        })
        .catch(err => {
          console.error('Dashboard stats error:', err);
          setLoading(false);
        });
    }
  }, []);

  if (!user) return null;

  return (
    <div className="rounded-xl p-6 bg-gradient-to-br from-indigo-800/30 to-black/20 border border-white/10 shadow-xl backdrop-blur-md mb-6 text-white transition">
      <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-1">
        👋 Welcome back, {user.name || 'Freelancer'}
      </h1>
      <p className="text-sm text-gray-300 mb-4">
        Status: {user.status === 'active' ? '🟢 Active' : '🟠 Pending Approval'}
      </p>

      {loading ? (
        <div className="flex items-center gap-2 text-blue-300 animate-pulse">
          <Loader2 className="animate-spin" size={16} />
          Fetching your dashboard stats...
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-2 text-sm">
          <div className="bg-white/5 p-4 rounded-xl border border-white/10 shadow-sm">
            <p className="text-lg font-semibold text-white">{stats.jobsApplied || 0}</p>
            <p className="text-gray-400 mt-1">Jobs Applied</p>
          </div>
          <div className="bg-white/5 p-4 rounded-xl border border-white/10 shadow-sm">
            <p className="text-lg font-semibold text-white">{stats.jobsWon || 0}</p>
            <p className="text-gray-400 mt-1">Jobs Won</p>
          </div>
          <div className="bg-white/5 p-4 rounded-xl border border-white/10 shadow-sm">
            <p className="text-lg font-semibold text-green-400">
              ${stats.earnings?.toFixed(2) || 0}
            </p>
            <p className="text-gray-400 mt-1">Total Earnings</p>
          </div>
        </div>
      )}

      <div className="mt-6">
        {user.status === 'active' ? (
          <a
            href="/dashboard/freelancer/jobs"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md shadow-lg transition"
          >
            🚀 Browse Jobs
          </a>
        ) : (
          <button
            disabled
            className="bg-yellow-800 text-yellow-300 px-6 py-2 rounded-md cursor-not-allowed"
          >
            ⏳ Awaiting Review
          </button>
        )}
      </div>
    </div>
  );
}

