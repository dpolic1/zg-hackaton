import { cn } from "@/lib/utils";
import { currYear } from "@/utils";

type TFooterProps = {
  className?: string;
};

export function Footer({ className }: TFooterProps) {
  return (
    <footer className={cn(className)}>
      <div>
        <p>{currYear()}</p>
      </div>
    </footer>
  );
}
