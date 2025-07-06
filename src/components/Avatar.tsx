// components/Avatar.tsx
'use client';

import * as RadixAvatar from '@radix-ui/react-avatar';
import React from 'react';

interface AvatarProps {
  src?: string;
  alt: string;
  size?: number;      // ideal diameter in pixels
  online?: boolean;   // show green “online” dot
}

export function Avatar({
  src,
  alt,
  size = 40,
  online = false,
}: AvatarProps) {
  const s = size;
  return (
    <div
      className="relative inline-block"
      style={{ width: s, height: s }}
    >
      <RadixAvatar.Root
        className="inline-flex items-center justify-center overflow-hidden rounded-full bg-gray-800"
        style={{ width: s, height: s }}
      >
        {src ? (
          <RadixAvatar.Image
            src={src}
            alt={alt}
            className="object-cover w-full h-full"
          />
        ) : (
          <RadixAvatar.Fallback
            className="flex items-center justify-center w-full h-full text-sm font-medium text-gray-400"
            delayMs={600}
          >
            {alt.charAt(0)}
          </RadixAvatar.Fallback>
        )}
      </RadixAvatar.Root>

      {online && (
        <span
          className="absolute bottom-0 right-0 block rounded-full border-2 border-[#1E1E2E] bg-green-400"
          style={{ width: s * 0.25, height: s * 0.25 }}
        />
      )}
    </div>
  );
}

