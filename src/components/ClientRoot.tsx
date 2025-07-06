'use client';

import { SessionProvider } from 'next-auth/react';
import NavBar from './NavBar';
import { FocusProvider } from '@/context/FocusContext';
import FLRAssistant from '@/app/dashboard/freelancer/components/FLRAssistant';



import { usePathname } from 'next/navigation';

export default function ClientRoot({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideAssistant = pathname === '/';

  return (
    <SessionProvider>
      <FocusProvider>
        <NavBar />
        {children}
        {!hideAssistant && <FLRAssistant />} {/* ✅ Hide on home page */}
      </FocusProvider>
    </SessionProvider>
  );
}

