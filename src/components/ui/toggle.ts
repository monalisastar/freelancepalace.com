// /components/ui/toggle.ts
import { cva } from "class-variance-authority";

export const toggleVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors",
  {
    variants: {
      variant: {
        default: "bg-zinc-800 text-white hover:bg-zinc-700",
        outline: "border border-zinc-600 text-white",
      },
      size: {
        default: "h-10 px-3",
        sm: "h-8 px-2",
        lg: "h-12 px-4",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

