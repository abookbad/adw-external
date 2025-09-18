import { Metadata } from 'next';
import AccountSettingsClient from './AccountSettingsClient';

export const metadata: Metadata = {
  title: 'Account Settings',
  description: 'Manage your profile and preferences.',
  alternates: { canonical: '/portal/account-settings' },
};

export default function AccountSettingsPage() {
  return <AccountSettingsClient />;
}


