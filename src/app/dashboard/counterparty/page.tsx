'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface EscrowDeal {
  id: string;
  title: string;
  amount: number;
  status: string;
  createdAt: string;
}

export default function CounterpartyDashboard() {
  const [deals, setDeals] = useState<EscrowDeal[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchDeals() {
      try {
        const res = await fetch('/api/counterparty/deals');
        if (res.status === 401) {
          router.push('/login');
          return;
        }
        const data = await res.json();
        setDeals(data.deals);
      } catch (err) {
        console.error('Failed to load deals:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchDeals();
  }, [router]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Your Escrow Deals</h1>
      {loading ? (
        <p>Loading deals...</p>
      ) : deals.length === 0 ? (
        <p className="text-gray-500">No active deals found.</p>
      ) : (
        <ul className="space-y-4">
          {deals.map((deal) => (
            <li
              key={deal.id}
              className="border p-4 rounded-lg hover:shadow transition"
              onClick={() => router.push(`/dashboard/counterparty/deal/${deal.id}/chat`)}
            >
              <h2 className="text-lg font-semibold">{deal.title}</h2>
              <p>Status: {deal.status}</p>
              <p>Amount: ${deal.amount}</p>
              <p className="text-sm text-gray-500">
                Created: {new Date(deal.createdAt).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

