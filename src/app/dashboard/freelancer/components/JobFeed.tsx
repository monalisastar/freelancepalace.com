'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Job {
  id: string;
  title: string;
  description: string;
  budget: number;
  deadline: string;
  category?: string;
  client?: {
    name: string;
  };
}

export default function JobFeed() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [totalPages, setTotalPages] = useState(1);

  const router = useRouter();

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const url = `/api/freelancer/jobs?page=${page}&category=${selectedCategory}`;
        const res = await fetch(url);
        const data = await res.json();

        if (Array.isArray(data.jobs)) {
          setJobs(data.jobs);
          setTotalPages(data.pagination.totalPages);
        } else {
          setJobs([]);
        }
      } catch (err) {
        console.error('Failed to fetch jobs', err);
        setJobs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [page, selectedCategory]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('/api/freelancer/jobs/categories');
        const data = await res.json();
        if (Array.isArray(data)) setCategories(data);
      } catch (err) {
        console.error('Failed to load categories', err);
      }
    };

    fetchCategories();
  }, []);

  const handleJobClick = (id: string) => {
    router.push(`/jobs/${id}`);
  };

  return (
    <div className="rounded-xl p-6 bg-white/10 dark:bg-white/5 backdrop-blur-xl shadow-lg text-white transition">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h2 className="text-2xl font-bold text-white tracking-tight">🧠 Curated Jobs</h2>
        <select
          value={selectedCategory}
          onChange={(e) => {
            setPage(1);
            setSelectedCategory(e.target.value);
          }}
          className="text-sm px-3 py-2 rounded bg-white/20 dark:bg-black/30 backdrop-blur border border-white/20 focus:outline-none"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <p className="text-gray-300 text-sm">Loading opportunities...</p>
      ) : jobs.length === 0 ? (
        <p className="text-gray-400 text-sm">No jobs found in this category.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          {jobs.map((job) => (
            <div
              key={job.id}
              onClick={() => handleJobClick(job.id)}
              className="cursor-pointer rounded-xl border border-white/10 bg-gradient-to-br from-blue-900/30 to-indigo-700/20 hover:from-blue-800/40 hover:to-indigo-600/30 transition hover:shadow-2xl p-5 backdrop-blur-md"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold">{job.title}</h3>
                <span className="text-sm bg-white/10 px-2 py-1 rounded text-blue-200">
                  ${job.budget.toFixed(2)}
                </span>
              </div>
              <p className="text-sm text-gray-300 mb-2">
                {job.description.slice(0, 100)}...
              </p>
              <div className="text-xs text-gray-400 mt-auto pt-2 border-t border-white/10">
                ⏰ Deadline: {new Date(job.deadline).toLocaleDateString()} <br />
                🧑‍💼 Client: {job.client?.name || 'Anonymous'}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-between items-center mt-8">
        <button
          disabled={page <= 1}
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          className={`px-4 py-2 text-sm rounded ${
            page <= 1
              ? 'bg-white/10 text-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          ← Previous
        </button>
        <span className="text-sm text-gray-300">Page {page} of {totalPages}</span>
        <button
          disabled={page >= totalPages}
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          className={`px-4 py-2 text-sm rounded ${
            page >= totalPages
              ? 'bg-white/10 text-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          Next →
        </button>
      </div>
    </div>
  );
}

