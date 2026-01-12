import { MerchantNavbar } from '@/components/merchant';

export default function MerchantLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-orange-50/30">
      <MerchantNavbar />
      <main className="container px-4 py-6">{children}</main>
    </div>
  );
}
