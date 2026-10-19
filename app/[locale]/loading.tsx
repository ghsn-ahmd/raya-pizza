import { Skeleton } from '@/components/ui/Skeleton';

export default function Loading() {
  return (
    <div className="container-page space-y-6 py-16" aria-busy="true">
      <Skeleton className="h-14 w-2/3 max-w-lg" />
      <Skeleton className="h-6 w-full max-w-xl" />
      <Skeleton className="h-64 w-full rounded-lg" />
    </div>
  );
}
