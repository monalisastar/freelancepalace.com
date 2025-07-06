// src/components/ui/toggle-group.tsx
import * as React from 'react';
import { ToggleGroup as PrimitiveToggleGroup, ToggleGroupItem as PrimitiveToggleGroupItem } from '@radix-ui/react-toggle-group';
import { cn } from '@/lib/utils';

const ToggleGroup = ({ className, ...props }: React.ComponentProps<typeof PrimitiveToggleGroup>) => (
  <PrimitiveToggleGroup className={cn('inline-flex rounded-md border p-1', className)} {...props} />
);

const ToggleGroupItem = ({ className, ...props }: React.ComponentProps<typeof PrimitiveToggleGroupItem>) => (
  <PrimitiveToggleGroupItem
    className={cn('inline-flex items-center justify-center rounded px-3 py-1.5 text-sm font-medium hover:bg-gray-100', className)}
    {...props}
  />
);

export { ToggleGroup, ToggleGroupItem };

