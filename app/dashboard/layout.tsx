import { Navbar } from '@/components/layout';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-orange-50/30">
      <Navbar />
      <main className="container px-4 py-6">{children}</main>
    </div>
  );
}

