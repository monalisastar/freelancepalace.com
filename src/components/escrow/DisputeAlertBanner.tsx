// src/components/escrow/DisputeAlertBanner.tsx
'use client';

import React from 'react';
import { Button } from '@/components/ui/button';

export default function DisputeAlertBanner({ contractId }: { contractId: string }) {
  return (
    <div className="flex items-center justify-between p-4 rounded-lg bg-red-900/50 neon-border-red">
      <p className="text-red-300">
        🚨 There’s an open dispute on this contract!
      </p>
      <Button
        variant="destructive"
        onClick={() => window.alert(`Viewing dispute for ${contractId}`)}
      >
        View Dispute
      </Button>
    </div>
  );
}

