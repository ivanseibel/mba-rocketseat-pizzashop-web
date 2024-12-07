import { Skeleton } from "./ui/skeleton";

export function MetricCardSkeleton() {
  return (
    <>
      <Skeleton className="h-8 w-36" />
      <Skeleton className="h-4 w-52" />
    </>
  );
}
