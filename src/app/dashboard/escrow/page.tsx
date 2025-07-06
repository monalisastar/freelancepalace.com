
'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function EscrowDashboard() {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchDeals = async () => {
    try {
      const res = await fetch('/api/escrow/client-deals');
      const data = await res.json();

      if (data.success) {
        setDeals(data.deals);
      } else {
        console.error('Failed to load deals');
      }
    } catch (err) {
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDeals();
  }, []);

  const handleRelease = async (dealId: string) => {
    try {
      const res = await fetch(`/api/escrow/${dealId}/release`, {
        method: 'POST',
      });
      const data = await res.json();

      if (data.success) {
        toast.success('Payment released ✅');
        fetchDeals(); // refresh list
      } else {
        toast.error(data.error || 'Failed to release');
      }
    } catch {
      toast.error('Error releasing payment');
    }
  };

  const handleCancel = async (dealId: string) => {
    try {
      const res = await fetch(`/api/escrow/${dealId}/cancel`, {
        method: 'POST',
      });
      const data = await res.json();

      if (data.success) {
        toast.success('Deal cancelled ❌');
        fetchDeals(); // refresh list
      } else {
        toast.error(data.error || 'Failed to cancel');
      }
    } catch {
      toast.error('Error cancelling deal');
    }
  };

  return (
    <main className="min-h-screen p-8 bg-gray-900 text-white">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Your Escrow Deals</h1>
        <button
          onClick={() => router.push('/start-escrow')}
          className="px-4 py-2 rounded bg-green-600 hover:bg-green-700 text-sm font-medium"
        >
          + Create New Deal
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : deals.length === 0 ? (
        <p className="text-gray-400">You haven’t started any escrow deals yet.</p>
      ) : (
        <div className="grid gap-6">
          {deals.map((deal: any) => (
            <div
              key={deal.id}
              className="bg-white/5 border border-white/10 rounded-lg p-5 shadow-md transition hover:shadow-lg"
            >
              <div className="flex justify-between mb-2">
                <h2 className="text-lg font-semibold">
                  {deal.amount} {deal.currency}
                </h2>
                <span className={`text-sm px-2 py-1 rounded font-medium ${
                  deal.status === 'released'
                    ? 'bg-green-700'
                    : deal.status === 'disputed'
                    ? 'bg-yellow-600'
                    : deal.status === 'cancelled'
                    ? 'bg-red-600'
                    : 'bg-gray-600'
                }`}>
                  {deal.status.toUpperCase()}
                </span>
              </div>

              <p className="text-gray-300 mb-2">{deal.description}</p>
              <p className="text-sm text-gray-400">
                Counterparty: <strong>{deal.counterpartyLabel || deal.counterpartyEmail || deal.counterpartyPhone}</strong>
              </p>

              <div className="flex gap-3 mt-4">
                <button
                  className="bg-blue-600 hover:bg-blue-700 px-4 py-1 rounded text-sm"
                  onClick={() => router.push(`/dashboard/escrow/deal/${deal.id}/chat`)}
                >
                  Chat
                </button>

                {deal.status === 'pending' && (
                  <>
                    <button
                      className="bg-green-600 hover:bg-green-700 px-4 py-1 rounded text-sm"
                      onClick={() => handleRelease(deal.id)}
                    >
                      Release
                    </button>
                    <button
                      className="bg-red-600 hover:bg-red-700 px-4 py-1 rounded text-sm"
                      onClick={() => handleCancel(deal.id)}
                    >
                      Cancel
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
