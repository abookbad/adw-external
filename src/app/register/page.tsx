import { Metadata } from 'next';
import { ThemedInnerPageLayout } from '../components/ThemedInnerPageLayout';
import RegisterForm from './RegisterForm';

export const metadata: Metadata = {
  title: 'Register',
  description: 'Create your account.',
  alternates: { canonical: '/register' },
};

export default function RegisterPage() {
  return (
    <ThemedInnerPageLayout>
      <div className="w-full flex items-start justify-center pt-24 sm:pt-28">
        <RegisterForm />
      </div>
    </ThemedInnerPageLayout>
  );
}


