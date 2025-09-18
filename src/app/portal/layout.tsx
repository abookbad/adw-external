import type { Metadata } from 'next';
import PortalSecondaryNav from '../components/PortalSecondaryNav';
import { ThemedInnerPageLayout } from '../components/ThemedInnerPageLayout';
import PortalGuard from './PortalGuard';

export const metadata: Metadata = {
  title: 'Client Portal',
  description: 'Your ADW client portal.',
};

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemedInnerPageLayout>
      <PortalSecondaryNav />
      <PortalGuard>
        <div className="container mx-auto px-4 py-6">{children}</div>
      </PortalGuard>
    </ThemedInnerPageLayout>
  );
}


