import { Utensils } from 'lucide-react';
import Link from 'next/link';

export default function MerchantLoginLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-linear-to-br from-orange-50 to-amber-100 p-4">
      <Link href="/" className="flex items-center gap-2 font-semibold mb-8">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-linear-to-br from-orange-500 to-amber-600 text-white shadow-lg">
          <Utensils className="h-5 w-5" />
        </div>
        <span className="text-xl text-orange-900">Eatna Merchant</span>
      </Link>
      {children}
    </div>
  );
}
