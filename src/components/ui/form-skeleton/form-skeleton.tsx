import { Skeleton } from "@/components/ui/skeleton";

type FormSkeletonProps = {
  numberOfInputs?: number;
};

export function FormSkeleton({ numberOfInputs = 1 }: FormSkeletonProps) {
  return (
    <div className="max-w-md mx-auto">
      {Array.from({ length: numberOfInputs }).map((_, index) => (
        <InputSkeleton key={index} />
      ))}
      <Skeleton className="h-10 w-24 rounded inline-block" />
    </div>
  );
}

const InputSkeleton = () => (
  <div className="mb-7">
    <Skeleton className="w-14 h-3 mb-2" />
    <Skeleton className="h-10" />
  </div>
);
