// src/components/payments/RemitlyForm.tsx
'use client';
import React from 'react';

interface RemitlyFormProps { onSuccess: () => void; }
export default function RemitlyForm({ onSuccess }: RemitlyFormProps) {
  return (
    <div className="p-4 text-center text-gray-300">
      <h2 className="mb-4 text-xl">Remitly</h2>
      {/* TODO: build your Remitly integration form */}
      <button 
        className="px-4 py-2 bg-green-600 rounded-lg"
        onClick={onSuccess}
      >
        [Placeholder] Send via Remitly
      </button>
    </div>
  );
}

