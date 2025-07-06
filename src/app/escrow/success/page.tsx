'use client';

import { Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { CheckCircle2, Wallet, PlusCircle, LogIn } from 'lucide-react';

function EscrowSuccessInner() {
  const params = useSearchParams();
  const router = useRouter();

  const dealId = params.get('dealId');
  const joinLink = params.get('joinLink');
  const generatedPassword = params.get('password');

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-20 bg-gradient-to-br from-[#0f172a] to-black text-white">
      <div className="text-center max-w-md space-y-6">
        <CheckCircle2 size={64} className="mx-auto text-green-500 animate-pulse drop-shadow" />
        <h1 className="text-3xl font-bold">Escrow Deal Created Successfully</h1>
        <p className="text-white/70 text-base">
          Your funds are now locked in escrow. Share this link with your counterparty to join the deal:
        </p>

        <div className="bg-white/10 border border-white/20 rounded p-4 text-left text-sm">
          <p className="text-white mb-1">🔗 Counterparty Join Link:</p>
          <p className="break-all text-green-300">{joinLink}</p>

          {generatedPassword && (
            <>
              <p className="text-white mt-4">🔑 Auto-Generated Password:</p>
              <p className="font-mono text-blue-400">{generatedPassword}</p>
            </>
          )}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6">
          <button
            onClick={() => router.push('/dashboard/escrow')}
            className="bg-green-600 hover:bg-green-700 px-6 py-2 rounded-lg flex items-center gap-2 font-semibold"
          >
            <Wallet size={18} /> View My Escrow Deals
          </button>

          <button
            onClick={() => router.push('/start-escrow')}
            className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg flex items-center gap-2 font-semibold"
          >
            <PlusCircle size={18} /> Start Another Deal
          </button>
        </div>

        <button
          onClick={() => router.push('/dashboard/counterparty')}
          className="text-sm text-white/60 underline mt-4 flex items-center justify-center gap-2 hover:text-white"
        >
          <LogIn size={16} /> Counterparty Login
        </button>
      </div>
    </div>
  );
}

export default function EscrowSuccessPage() {
  return (
    <Suspense fallback={<div className="text-white text-center py-20">Loading escrow success...</div>}>
      <EscrowSuccessInner />
    </Suspense>
  );
}


