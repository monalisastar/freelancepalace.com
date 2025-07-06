// src/app/escrowF/page.tsx
'use client';

import React from 'react';
import EscrowHero from './EscrowHero';
import EscrowHowItWorks from './EscrowHowItWorks';
import EscrowTrustFeatures from './EscrowTrustFeatures';
import EscrowUseCases from './EscrowUseCases';
import EscrowFLRReward from './EscrowFLRReward';
import EscrowStats from './EscrowStats';
import EscrowCTA from './EscrowCTA';

export default function EscrowLandingPage() {
  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-start bg-gradient-to-br from-[#0e0e0e] via-[#141927] to-[#0e0e0e] text-white backdrop-blur-sm">
      <EscrowHero />
      <div className="my-20 w-full">
        <EscrowHowItWorks />
      </div>
      <div className="my-20 w-full">
        <EscrowTrustFeatures />
      </div>
      <div className="my-20 w-full">
        <EscrowUseCases />
      </div>
      <div className="my-20 w-full">
        <EscrowFLRReward />
      </div>
      <div className="my-20 w-full">
        <EscrowStats />
      </div>
      <div className="my-20 w-full">
        <EscrowCTA />
      </div>
    </main>
  );
}

