import { Metadata } from 'next';
import SupportClient from './SupportClient';

export const metadata: Metadata = {
  title: 'Support',
  description: 'Get help from our team.',
  alternates: { canonical: '/portal/support' },
};

export default function SupportPage() {
  return <SupportClient />;
}


