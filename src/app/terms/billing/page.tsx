import { Metadata } from 'next';
import { ThemedInnerPageLayout } from '../../components/ThemedInnerPageLayout';
import { PageHeroTitle } from '../../components/PageHeroTitle';

export const metadata: Metadata = {
  title: 'Billing Terms & Payment Authorization',
  description: 'Terms that govern stored cards and off‑session charges.',
  alternates: { canonical: '/terms/billing' },
};

export default function BillingTermsPage() {
  return (
    <ThemedInnerPageLayout>
      <PageHeroTitle titleLine1="Billing" titleLine2="Terms" />

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="bg-slate-900/70 border border-slate-700/50 rounded-xl p-8 shadow-xl">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 font-[family-name:var(--font-geist-mono)] tracking-wider uppercase">Payment Authorization</h2>
            <p className="text-slate-300 mb-4">Effective: {new Date().toLocaleDateString()}</p>
            <p className="text-slate-300">
              By adding a payment method, you authorize Agency Dev Works ("ADW") to store the card with Stripe and
              charge it off‑session for amounts you owe under these Terms.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <section className="bg-slate-900/70 border border-slate-700/50 rounded-xl p-6">
              <h3 className="text-xl font-bold text-white mb-3 font-[family-name:var(--font-geist-mono)] tracking-wider uppercase">Stored Card & Charges</h3>
              <ul className="list-disc list-inside text-slate-300 space-y-2">
                <li>We may charge for services, usage, milestones, retainers, taxes/fees, and past‑due balances.</li>
                <li>Amounts may be variable as communicated via proposals, SOWs, quotes, or pricing pages.</li>
                <li>You consent to off‑session charges without further action by you.</li>
              </ul>
            </section>

            <section className="bg-slate-900/70 border border-slate-700/50 rounded-xl p-6">
              <h3 className="text-xl font-bold text-white mb-3 font-[family-name:var(--font-geist-mono)] tracking-wider uppercase">Default Method</h3>
              <p className="text-slate-300">Your most recently saved method may be set as default. Replacing a method continues authorization for the new default.</p>
            </section>

            <section className="bg-slate-900/70 border border-slate-700/50 rounded-xl p-6">
              <h3 className="text-xl font-bold text-white mb-3 font-[family-name:var(--font-geist-mono)] tracking-wider uppercase">Invoices & Receipts</h3>
              <p className="text-slate-300">We may email invoices/receipts and notices. Keep your billing email up to date.</p>
            </section>

            <section className="bg-slate-900/70 border border-slate-700/50 rounded-xl p-6">
              <h3 className="text-xl font-bold text-white mb-3 font-[family-name:var(--font-geist-mono)] tracking-wider uppercase">Disputes & Refunds</h3>
              <ul className="list-disc list-inside text-slate-300 space-y-2">
                <li>Contact us first; we aim to resolve in good faith.</li>
                <li>Refunds, if any, are at ADW’s discretion unless required by law or contract.</li>
                <li>Failed payments may result in retries, suspension, or collections.</li>
              </ul>
            </section>
          </div>

          <div className="bg-slate-900/70 border border-slate-700/50 rounded-xl p-6">
            <h3 className="text-xl font-bold text-white mb-3 font-[family-name:var(--font-geist-mono)] tracking-wider uppercase">Companies & Authorized Users</h3>
            <p className="text-slate-300">If you act for a company, you confirm authority. Companies may have multiple users; the company remains responsible for all charges.</p>
          </div>

          <div className="bg-slate-900/70 border border-slate-700/50 rounded-xl p-6">
            <h3 className="text-xl font-bold text-white mb-3 font-[family-name:var(--font-geist-mono)] tracking-wider uppercase">Processor & Data</h3>
            <p className="text-slate-300">Payments are processed by Stripe. We don’t store full card numbers. Processing follows Stripe and card‑network rules.</p>
          </div>

          <div className="bg-slate-900/70 border border-slate-700/50 rounded-xl p-6">
            <h3 className="text-xl font-bold text-white mb-3 font-[family-name:var(--font-geist-mono)] tracking-wider uppercase">Governing Terms</h3>
            <p className="text-slate-300">These Billing Terms supplement our Terms of Service and Privacy Policy. By saving a method, you accept these Terms.</p>
            <p className="text-xs text-slate-400 mt-6">This content is informational and not legal advice. Consult your counsel for specific needs.</p>
          </div>
        </div>
      </div>
    </ThemedInnerPageLayout>
  );
}


