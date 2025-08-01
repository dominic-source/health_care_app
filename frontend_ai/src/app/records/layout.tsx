import React from 'react';

interface RecordsLayoutProps {
  children: React.ReactNode;
}

export default function RecordsLayout({ children }: RecordsLayoutProps) {
  return <div className="p-4 lg:p-6">{children}</div>;
}
