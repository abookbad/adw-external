import { Metadata } from 'next';
import DashboardClient from './DashboardClient';

export const metadata: Metadata = {
  title: 'Portal Dashboard',
  description: 'Overview of your account.',
  alternates: { canonical: '/portal' },
};

export default function PortalDashboardPage() {
  return <DashboardClient />;
}


