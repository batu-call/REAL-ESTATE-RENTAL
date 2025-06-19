'use client';

import dynamic from "next/dynamic";
import { Suspense } from "react";


const ReservationConfirmationClient = dynamic(() => import("./ReservationConfirmationClient"), {
  ssr: false,
});

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center mt-10">Loading...</div>}>
      <ReservationConfirmationClient />
    </Suspense>
  );
}