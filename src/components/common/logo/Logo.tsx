import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const logoVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-base font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-transparent text-primary-foreground",
      },
      size: {
        default: "h-9",
        sm: "h-8 rounded-md px-3 text-sm",
        lg: "h-10 rounded-md px-8 text-lg",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

type TLogoProps = VariantProps<typeof logoVariants> & {
  className?: string;
  children?: React.ReactNode;
};

export function Logo({ className, variant, size, children }: TLogoProps) {
  return <div className={cn(logoVariants({ variant, size, className }))}>{children}</div>;
}
