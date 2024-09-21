import { FormSkeleton } from "@/components/ui/form-skeleton";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div>
      <div className="mb-8">
        <Skeleton className="mb-4 h-4 w-1/4" />
        <Skeleton className="h-4 w-3/4" />
      </div>
      <FormSkeleton numberOfInputs={3} />
    </div>
  );
}
