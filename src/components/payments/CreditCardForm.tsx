// src/components/payments/CreditCardForm.tsx
'use client';
import React from 'react';

interface CreditCardFormProps { onSuccess: () => void; }
export default function CreditCardForm({ onSuccess }: CreditCardFormProps) {
  return (
    <div className="p-4 text-center text-gray-300">
      <h2 className="mb-4 text-xl">Credit Card (Stripe)</h2>
      {/* TODO: integrate @stripe/react-stripe-js here */}
      <button 
        className="px-4 py-2 bg-indigo-600 rounded-lg"
        onClick={onSuccess}
      >
        [Placeholder] Pay with Card
      </button>
    </div>
  );
}

