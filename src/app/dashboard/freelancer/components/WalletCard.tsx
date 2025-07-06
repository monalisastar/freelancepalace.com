'use client';

import { useEffect, useState } from 'react';

interface Transaction {
  id: number;
  label: string;
  amount: string;
  date: string;
  description?: string;
}

export default function WalletCard() {
  const [currency, setCurrency] = useState<'USD' | 'FLR' | 'Crypto'>('USD');
  const [balance, setBalance] = useState(1240.75);
  const [monthlyEarnings, setMonthlyEarnings] = useState(620.5);
  const [totalEarnings, setTotalEarnings] = useState(9450.0);
  const [pending, setPending] = useState(300);
  const [nextPayout, setNextPayout] = useState('2025-05-30');
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [expanded, setExpanded] = useState<number | null>(null);
  const [flrRate, setFlrRate] = useState(0.1); // e.g. 1 FLR = 0.1 USD

  useEffect(() => {
    setTransactions([
      {
        id: 1,
        label: 'Logo Design',
        amount: '+$250',
        date: 'May 10',
        description: 'Payment for freelance branding project.',
      },
      {
        id: 2,
        label: 'Landing Page Dev',
        amount: '+$120',
        date: 'May 8',
        description: 'Frontend implementation for startup site.',
      },
      {
        id: 3,
        label: 'Pending Withdrawal',
        amount: '-$300',
        date: 'May 6',
        description: 'Funds requested, pending confirmation.',
      },
    ]);
  }, []);

  return (
    <div className="rounded-xl p-6 bg-gradient-to-br from-blue-800/30 to-gray-900/20 backdrop-blur-lg border border-white/10 text-white shadow-lg transition w-full">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-xl font-bold tracking-tight">💼 Wallet Overview</h2>
        <select
          className="px-2 py-1 rounded bg-white/10 dark:bg-black/20 border border-white/20 text-sm"
          value={currency}
          onChange={(e) => setCurrency(e.target.value as 'USD' | 'FLR' | 'Crypto')}
        >
          <option value="USD">USD</option>
          <option value="FLR">FLR Token</option>
          <option value="Crypto">Crypto</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-sm">
        <div className="bg-white/5 p-4 rounded-xl shadow-inner">
          <p className="text-gray-300">Current Balance</p>
          <p className="text-lg font-semibold">
            {currency === 'FLR'
              ? `${(balance / flrRate).toFixed(2)} FLR`
              : currency === 'Crypto'
              ? 'Ξ0.08'
              : `$${balance.toFixed(2)}`}
          </p>
        </div>
        <div className="bg-white/5 p-4 rounded-xl shadow-inner">
          <p className="text-gray-300">This Month</p>
          <p className="text-lg font-semibold">${monthlyEarnings.toFixed(2)}</p>
        </div>
        <div className="bg-white/5 p-4 rounded-xl shadow-inner">
          <p className="text-gray-300">All-Time</p>
          <p className="text-lg font-semibold">${totalEarnings.toFixed(2)}</p>
        </div>
        <div className="bg-white/5 p-4 rounded-xl shadow-inner">
          <p className="text-gray-300">Pending</p>
          <p className="text-lg text-yellow-400 font-semibold">${pending.toFixed(2)}</p>
        </div>
        <div className="bg-white/5 p-4 rounded-xl shadow-inner">
          <p className="text-gray-300">Next Payout</p>
          <p className="text-sm">{nextPayout}</p>
        </div>
        <div className="bg-white/5 p-4 rounded-xl shadow-inner">
          <p className="text-gray-300">FLR → USD Preview</p>
          <p className="text-sm">${(balance).toFixed(2)} = {(balance / flrRate).toFixed(0)} FLR</p>
        </div>
      </div>

      <div className="mt-10 mb-4">
        <h3 className="text-md font-semibold mb-2 text-white">📊 Earnings Bar</h3>
        <div className="flex items-end gap-2 h-24">
          {[120, 180, 90, 250, 160].map((val, i) => (
            <div
              key={i}
              className="bg-blue-400 dark:bg-blue-600 w-6 rounded transition-all duration-500"
              style={{ height: `${val / 3}px` }}
              title={`$${val}`}
            />
          ))}
        </div>
        <p className="text-xs text-gray-400 mt-2">Last 5 project payouts</p>
      </div>

      <div className="mt-6">
        <h3 className="text-md font-semibold mb-3 text-white">🧾 Recent Transactions</h3>
        <ul className="space-y-3 text-sm">
          {transactions.map((tx) => (
            <li
              key={tx.id}
              className="bg-white/5 rounded-lg border border-white/10 shadow-sm px-4 py-3 cursor-pointer hover:bg-white/10 transition"
              onClick={() => setExpanded((prev) => (prev === tx.id ? null : tx.id))}
            >
              <div className="flex justify-between items-center">
                <span className="font-medium">{tx.label}</span>
                <span className="font-semibold">{tx.amount}</span>
              </div>
              <div className="text-xs text-gray-400">
                {tx.date}
              </div>
              {expanded === tx.id && (
                <div className="text-xs text-gray-300 mt-2 border-t border-white/10 pt-2">
                  {tx.description}
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6 text-sm text-blue-300 font-medium">
        💡 Tip: Batch withdrawals to reduce fees. Estimated savings: $112/month.
      </div>
    </div>
  );
}

