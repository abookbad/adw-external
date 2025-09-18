import { Metadata } from 'next';
import { ThemedInnerPageLayout } from '../components/ThemedInnerPageLayout';
import ForgotPasswordForm from './ForgotPasswordForm';

export const metadata: Metadata = {
  title: 'Forgot Password',
  description: 'Reset your password.',
  alternates: { canonical: '/forgot-password' },
};

export default function ForgotPasswordPage() {
  return (
    <ThemedInnerPageLayout>
      <div className="w-full flex items-start justify-center pt-24 sm:pt-28">
        <ForgotPasswordForm />
      </div>
    </ThemedInnerPageLayout>
  );
}


