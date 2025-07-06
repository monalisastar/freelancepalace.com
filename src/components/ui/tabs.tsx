// src/components/ui/tabs.tsx
'use client';
import * as RadixTabs from '@radix-ui/react-tabs';
import React from 'react';
import clsx from 'clsx';

export const Tabs = RadixTabs.Root;

export function TabsList({
  children,
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <RadixTabs.List
      className={clsx('flex space-x-2', className)}
    >
      {children}
    </RadixTabs.List>
  );
}

export function TabsTrigger({
  value,
  children,
  className,
}: RadixTabs.TabsTriggerProps & React.HTMLAttributes<HTMLButtonElement>) {
  return (
    <RadixTabs.Trigger
      value={value}
      className={clsx(
        'px-4 py-2 rounded-2xl text-sm font-medium transition',
        'data-[state=active]:bg-indigo-700 data-[state=active]:text-white',
        className
      )}
    >
      {children}
    </RadixTabs.Trigger>
  );
}

export function TabsContent({
  value,
  children,
  className,
}: RadixTabs.TabsContentProps & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <RadixTabs.Content
      value={value}
      className={clsx('mt-4', className)}
    >
      {children}
    </RadixTabs.Content>
  );
}

