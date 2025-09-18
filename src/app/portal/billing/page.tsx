import { Metadata } from 'next';
import BillingClient from './BillingClient';

export const metadata: Metadata = {
  title: 'Billing',
  description: 'Manage invoices and payment methods.',
  alternates: { canonical: '/portal/billing' },
};

export default function BillingPage() {
  return <BillingClient />;
}


