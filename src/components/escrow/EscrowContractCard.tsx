// src/components/escrow/EscrowContractCard.tsx
'use client';

import React from 'react';

interface Props {
  contract: {
    id: string;
    freelancerName: string;
    totalAmount: number;
    fundedAmount: number;
  };
  isSelected: boolean;
  onSelect(): void;
}

export default function EscrowContractCard({ contract, isSelected, onSelect }: Props) {
  return (
    <button
      onClick={onSelect}
      className={`w-full px-4 py-3 text-left rounded-xl glass-card 
        ${isSelected ? 'border-indigo-400' : 'border-transparent'}`}
    >
      <h2 className="text-lg font-semibold neon-text">{contract.freelancerName}</h2>
      <p className="text-sm text-gray-300">
        Total: {contract.totalAmount.toFixed(2)} ETH
      </p>
      <p className="text-sm text-gray-500">
        Funded {contract.fundedAmount.toFixed(2)} ETH
      </p>
    </button>
  );
}

