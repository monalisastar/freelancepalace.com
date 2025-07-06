'use client';

import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';

interface Proposal {
  id: string;
  jobTitle: string;
  status: 'pending' | 'accepted' | 'rejected';
  submittedAt: string;
  amount: number;
}

export default function ProposalsPanel() {
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProposals = async () => {
      try {
        const res = await fetch('/api/freelancer/proposals');
        const data = await res.json();

        if (Array.isArray(data)) {
          setProposals(data);
        } else {
          console.warn('Unexpected proposals data:', data);
          setProposals([]);
        }
      } catch (err) {
        console.error('Failed to load proposals', err);
        setProposals([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProposals();
  }, []);

  return (
    <div className="rounded-xl p-6 bg-white/10 dark:bg-white/5 backdrop-blur-xl shadow-lg text-white transition">
      <h2 className="text-xl font-bold text-white tracking-tight mb-4">📨 Recent Proposals</h2>

      {loading ? (
        <div className="flex items-center gap-2 text-blue-300 animate-pulse">
          <Loader2 className="animate-spin" size={16} />
          Fetching proposals...
        </div>
      ) : proposals.length === 0 ? (
        <p className="text-sm text-gray-300">No proposals submitted yet.</p>
      ) : (
        <ul className="space-y-4 max-h-[400px] overflow-y-auto">
          {proposals.map((proposal) => (
            <li
              key={proposal.id}
              className={`rounded-lg p-4 border backdrop-blur border-white/10 shadow-sm hover:shadow-xl transition cursor-default ${
                proposal.status === 'accepted'
                  ? 'bg-green-600/10 hover:bg-green-600/20'
                  : proposal.status === 'rejected'
                  ? 'bg-red-600/10 hover:bg-red-600/20'
                  : 'bg-yellow-500/10 hover:bg-yellow-500/20'
              }`}
            >
              <div className="flex justify-between items-center">
                <span className="text-base font-semibold">{proposal.jobTitle}</span>
                <span
                  className={`text-xs font-bold px-2 py-1 rounded-full tracking-wide ${
                    proposal.status === 'accepted'
                      ? 'bg-green-800 text-green-200'
                      : proposal.status === 'rejected'
                      ? 'bg-red-800 text-red-200'
                      : 'bg-yellow-800 text-yellow-200'
                  }`}
                >
                  {proposal.status.toUpperCase()}
                </span>
              </div>
              <div className="text-sm text-gray-300 mt-1">
                Submitted: {new Date(proposal.submittedAt).toLocaleDateString()}
              </div>
              <div className="text-sm text-gray-400">Bid: ${proposal.amount}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

