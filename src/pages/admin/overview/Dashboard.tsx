import { AdminLayout } from '@/layouts/AdminLayout.tsx';

function Skeleton({ className = '' }: { className?: string }) {
  return <div className={`animate-pulse rounded-lg bg-gray-200 ${className}`} />;
}

export default function DashboardPage() {
  return (
    <AdminLayout>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="rounded-xl border bg-white p-4">
              <Skeleton className="h-3 w-24" />
              <Skeleton className="mt-3 h-6 w-16" />
              <Skeleton className="mt-4 h-1 w-full" />
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
          <div className="rounded-xl border bg-white p-4 lg:col-span-7">
            <Skeleton className="mb-4 h-4 w-40" />
            <Skeleton className="h-72 w-full" />
          </div>

          <div className="rounded-xl border bg-white p-4 lg:col-span-5">
            <Skeleton className="mb-4 h-4 w-40" />
            <div className="grid grid-cols-2 gap-3">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="rounded-lg border p-3">
                  <Skeleton className="h-3 w-20" />
                  <Skeleton className="mt-2 h-5 w-full" />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
          <div className="rounded-xl border bg-white p-4 lg:col-span-8">
            <Skeleton className="mb-4 h-4 w-40" />
            <Skeleton className="h-72 w-full" />
          </div>

          <div className="rounded-xl border bg-white p-4 lg:col-span-4">
            <Skeleton className="mb-4 h-4 w-40" />
            <Skeleton className="h-72 w-full" />
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
