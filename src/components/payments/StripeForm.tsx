// src/components/payments/StripeForm.tsx
'use client';
import React from 'react';

interface StripeFormProps { onSuccess: () => void; }
export default function StripeForm({ onSuccess }: StripeFormProps) {
  return (
    <div className="p-4 text-center text-gray-300">
      <h2 className="mb-4 text-xl">Stripe (ACH, etc.)</h2>
      {/* TODO: integrate @stripe/stripe-js here */}
      <button 
        className="px-4 py-2 bg-purple-600 rounded-lg"
        onClick={onSuccess}
      >
        [Placeholder] Pay with Stripe
      </button>
    </div>
  );
}

