// components/CanonicalUrl.tsx
'use client';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function CanonicalUrl() {
  const pathname = usePathname();

  useEffect(() => {
    const link = document.querySelector("link[rel='canonical']");
    const url = `https://freelancerspalace.com${pathname}`;

    if (link) {
      link.setAttribute('href', url);
    } else {
      const newLink = document.createElement('link');
      newLink.setAttribute('rel', 'canonical');
      newLink.setAttribute('href', url);
      document.head.appendChild(newLink);
    }
  }, [pathname]);

  return null;
}

