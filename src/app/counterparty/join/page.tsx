'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Loader2, CheckCircle2, XCircle } from 'lucide-react';

function JoinComponent() {
  const router = useRouter();
  const params = useSearchParams();

  const dealId = params.get('deal');
  const token = params.get('token');

  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');

  useEffect(() => {
    const join = async () => {
      if (!dealId || !token) {
        setStatus('error');
        return;
      }

      try {
        const res = await fetch('/api/escrow/join', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ dealId, token }),
        });

        const data = await res.json();

        if (data.success) {
          setStatus('success');
          setTimeout(() => {
            router.push('/dashboard/counterparty');
          }, 2500);
        } else {
          setStatus('error');
        }
      } catch (err) {
        console.error('Join error:', err);
        setStatus('error');
      }
    };

    join();
  }, [dealId, token]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-white bg-gradient-to-br from-[#0f172a] to-black px-6">
      {status === 'loading' && (
        <div className="text-center space-y-4">
          <Loader2 className="h-12 w-12 animate-spin text-blue-400 mx-auto" />
          <h2 className="text-xl font-semibold">Joining Escrow Deal...</h2>
          <p className="text-white/60">Validating your invite token.</p>
        </div>
      )}

      {status === 'success' && (
        <div className="text-center space-y-4">
          <CheckCircle2 className="h-12 w-12 text-green-400 mx-auto" />
          <h2 className="text-xl font-bold">Joined Successfully!</h2>
          <p className="text-white/60">Redirecting to your dashboard...</p>
        </div>
      )}

      {status === 'error' && (
        <div className="text-center space-y-4">
          <XCircle className="h-12 w-12 text-red-500 mx-auto" />
          <h2 className="text-xl font-bold">Invalid or Expired Link</h2>
          <p className="text-white/60">Please request a new invite from the escrow creator.</p>
        </div>
      )}
    </div>
  );
}

export default function CounterpartyJoinPage() {
  return (
    <Suspense fallback={<div className="text-white text-center mt-10">Loading...</div>}>
      <JoinComponent />
    </Suspense>
  );
}


