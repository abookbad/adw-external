import { Metadata } from 'next';
import { ThemedInnerPageLayout } from '../components/ThemedInnerPageLayout';
import LoginForm from './LoginForm';

export const metadata: Metadata = {
  title: 'Login',
  description: 'Sign in to your account.',
  alternates: { canonical: '/login' },
};

export default function LoginPage() {
  return (
    <ThemedInnerPageLayout>
      <div className="w-full flex items-start justify-center pt-24 sm:pt-28">
        <LoginForm />
      </div>
    </ThemedInnerPageLayout>
  );
}


