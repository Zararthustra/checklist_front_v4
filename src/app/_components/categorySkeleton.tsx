"use client";

import { Skeleton } from "~/components/ui/skeleton";

export default function () {
  return (
    <div className="flex w-full flex-wrap justify-center gap-5">
      <div className="w-[500px] max-w-[95%] space-y-1">
        <Skeleton className="h-[77px] rounded-none rounded-tl-lg" />
        <Skeleton className="h-[32px] rounded-none" />
        <Skeleton className="h-[32px] rounded-none" />
        <Skeleton className="h-[32px] rounded-none" />
        <div className="flex space-x-1">
          <Skeleton className="h-10 w-full rounded-none" />
          <Skeleton className="h-10 w-[55px] rounded-none rounded-br-lg" />
        </div>
      </div>

      <div className="w-[500px] max-w-[95%] space-y-1">
        <Skeleton className="h-[77px] rounded-none rounded-tl-lg" />
        <Skeleton className="h-[32px] rounded-none" />
        <Skeleton className="h-[32px] rounded-none" />
        <Skeleton className="h-[32px] rounded-none" />
        <Skeleton className="h-[32px] rounded-none" />
        <Skeleton className="h-[32px] rounded-none" />
        <Skeleton className="h-[32px] rounded-none" />
        <div className="flex space-x-1">
          <Skeleton className="h-10 w-full rounded-none" />
          <Skeleton className="h-10 w-[55px] rounded-none rounded-br-lg" />
        </div>
      </div>

      <div className="w-[500px] max-w-[95%] space-y-1">
        <Skeleton className="h-[77px] rounded-none rounded-tl-lg" />
        <Skeleton className="h-[32px] rounded-none" />
        <Skeleton className="h-[32px] rounded-none" />
        <div className="flex space-x-1">
          <Skeleton className="h-10 w-full rounded-none" />
          <Skeleton className="h-10 w-[55px] rounded-none rounded-br-lg" />
        </div>
      </div>
    </div>
  );
}
