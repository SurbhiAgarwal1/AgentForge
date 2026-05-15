'use client';

import React from 'react';
import { WorkspaceShell } from '@/components/dashboard/workspace-shell';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <WorkspaceShell>{children}</WorkspaceShell>;
}
