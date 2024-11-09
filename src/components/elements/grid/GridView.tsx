import { cn } from "@/lib/utils";

type TGridViewProps = {
  children: React.ReactNode;
  className?: string;
};

export function GridView({ children, className }: TGridViewProps) {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4", className)}>
      {children}
    </div>
  );
}
