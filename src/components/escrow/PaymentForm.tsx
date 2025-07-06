// src/components/escrow/PaymentForm.tsx
'use client';

import React, { useState, useEffect } from 'react';
import {
  BrowserProvider,
  JsonRpcSigner,
  parseEther,
  formatUnits,
} from 'ethers';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function PaymentForm({
  provider,
  signer,
  contractId,
  milestone,
  onSuccess,
}: {
  provider: BrowserProvider;
  signer: JsonRpcSigner;
  contractId: string;
  milestone: { id: string; title: string; amount: number; funded: number };
  onSuccess(): void;
}) {
  const [amount, setAmount] = useState(milestone.amount - milestone.funded);
  const [gasEstimate, setGasEstimate] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string>();

  // Re-estimate gas whenever `amount` changes
  useEffect(() => {
    provider
      .estimateGas({
        to: contractId,
        value: parseEther(amount.toString()),
      })
      .then((g) => setGasEstimate(formatUnits(g, 'gwei') + ' gwei'))
      .catch(() => setGasEstimate(null));
  }, [amount, provider, contractId]);

  const handleFund = async () => {
    setBusy(true);
    setError(undefined);
    try {
      const tx = await signer.sendTransaction({
        to: contractId,
        value: parseEther(amount.toString()),
      });
      await tx.wait();
      onSuccess();
    } catch (e: any) {
      setError(e?.message ?? 'Failed to send');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="space-y-4 glass-card p-6">
      <h3 className="text-xl font-bold text-indigo-200 neon-text">
        Fund “{milestone.title}”
      </h3>

      <Input
        type="number"
        step="0.01"
        min="0"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        className="w-full glass-input"
      />

      {gasEstimate && (
        <p className="text-sm text-gray-400">Gas est: {gasEstimate}</p>
      )}

      {error && <p className="text-sm text-red-400">Error: {error}</p>}

      <Button
        variant="default"
        disabled={busy}
        onClick={handleFund}
        className="w-full neon-button"
      >
        {busy ? '⏳ Processing…' : '🚀 Send Funds'}
      </Button>
    </div>
  );
}


