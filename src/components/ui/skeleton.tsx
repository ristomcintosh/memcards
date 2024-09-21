import { cn } from "@/utils/misc";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-pulse rounded bg-zinc-300 dark:bg-zinc-800",
        className,
      )}
      {...props}
    />
  );
}

export { Skeleton };
