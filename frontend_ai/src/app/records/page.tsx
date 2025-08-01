'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function RecordsPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to patients by default
    router.replace('/records/patients');
  }, [router]);

  return (
    <div className="flex items-center justify-center h-64">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-2 text-sm text-gray-600">Loading...</p>
      </div>
    </div>
  );
}
