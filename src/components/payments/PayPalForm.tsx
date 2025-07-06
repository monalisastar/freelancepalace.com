// src/components/payments/PayPalForm.tsx
'use client';
import React from 'react';

interface PayPalFormProps { onSuccess: () => void; }
export default function PayPalForm({ onSuccess }: PayPalFormProps) {
  return (
    <div className="p-4 text-center text-gray-300">
      <h2 className="mb-4 text-xl">PayPal Payment</h2>
      {/* TODO: integrate @paypal/react-paypal-js here */}
      <button 
        className="px-4 py-2 bg-blue-600 rounded-lg"
        onClick={onSuccess}
      >
        [Placeholder] Pay with PayPal
      </button>
    </div>
  );
}

