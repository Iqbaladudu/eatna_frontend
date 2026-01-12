'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  Eye, EyeOff, Loader2, Store, Building2, Shield, 
  TrendingUp, ChartBar, Users, ArrowRight, Sparkles 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useMerchantLogin } from '@/lib/api';
import { toast } from 'sonner';

export function MerchantLoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const login = useMerchantLogin();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    login.mutate(
      { email, password },
      {
        onSuccess: () => {
          toast.success('Login berhasil! Selamat datang, Partner Eatna.');
          router.push('/merchant');
        },
        onError: (error: Error & { response?: { data?: { error?: string } } }) => {
          toast.error(error.response?.data?.error || 'Login gagal. Periksa email dan password Anda.');
        },
      }
    );
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Branding & Benefits */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-orange-500 via-amber-500 to-orange-600 relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-white rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-white rounded-full blur-3xl" />
        </div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
          backgroundSize: '30px 30px'
        }} />

        <div className="relative z-10 flex flex-col justify-between p-12 text-white w-full">
          {/* Logo */}
          <div>
            <Link href="/" className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
                <Store className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold">Eatna Merchant</span>
            </Link>
          </div>

          {/* Main Content */}
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl xl:text-5xl font-bold leading-tight mb-4">
                Kelola Bisnis Anda<br />dengan Mudah
              </h1>
              <p className="text-orange-100 text-lg max-w-md">
                Dashboard lengkap untuk memantau transaksi, validasi voucher, dan melihat laporan penjualan secara real-time.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-4 max-w-lg">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/20">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/20 mb-3">
                  <TrendingUp className="h-5 w-5" />
                </div>
                <h4 className="font-semibold mb-1">Analitik Real-time</h4>
                <p className="text-orange-100 text-sm">Pantau performa bisnis setiap saat</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/20">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/20 mb-3">
                  <Shield className="h-5 w-5" />
                </div>
                <h4 className="font-semibold mb-1">Transaksi Aman</h4>
                <p className="text-orange-100 text-sm">Dilindungi enkripsi terbaik</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/20">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/20 mb-3">
                  <ChartBar className="h-5 w-5" />
                </div>
                <h4 className="font-semibold mb-1">Laporan Lengkap</h4>
                <p className="text-orange-100 text-sm">Export data kapan saja</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/20">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/20 mb-3">
                  <Users className="h-5 w-5" />
                </div>
                <h4 className="font-semibold mb-1">Jangkauan Luas</h4>
                <p className="text-orange-100 text-sm">Akses ribuan pelanggan baru</p>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-8">
            <div>
              <div className="text-3xl font-bold">500+</div>
              <div className="text-orange-100 text-sm">Merchant Aktif</div>
            </div>
            <div className="h-12 w-px bg-white/20" />
            <div>
              <div className="text-3xl font-bold">50K+</div>
              <div className="text-orange-100 text-sm">Transaksi/Bulan</div>
            </div>
            <div className="h-12 w-px bg-white/20" />
            <div>
              <div className="text-3xl font-bold">24h</div>
              <div className="text-orange-100 text-sm">Pencairan Dana</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gradient-to-br from-orange-50/50 via-white to-amber-50/30">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center justify-center gap-3 mb-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 shadow-lg shadow-orange-200">
              <Store className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">Eatna Merchant</span>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-3xl shadow-2xl shadow-orange-100/50 p-8 border border-orange-100/50">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 text-orange-600 text-sm font-medium mb-4">
                <Sparkles className="h-4 w-4" />
                Portal Merchant
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Selamat Datang Kembali</h2>
              <p className="text-gray-500">Masuk untuk mengelola bisnis Anda</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email Bisnis
                </Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                    <Building2 className="h-5 w-5 text-gray-400" />
                  </div>
                  <Input
                    id="email"
                    type="email"
                    placeholder="merchant@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={login.isPending}
                    className="h-12 pl-12 bg-gray-50 border-gray-200 focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all rounded-xl"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-sm font-medium text-gray-700">Password</Label>
                  <Link
                    href="#"
                    className="text-sm text-orange-600 hover:text-orange-700 font-medium hover:underline"
                  >
                    Lupa password?
                  </Link>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                    <Shield className="h-5 w-5 text-gray-400" />
                  </div>
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Masukkan password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={login.isPending}
                    className="h-12 pl-12 pr-12 bg-gray-50 border-gray-200 focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all rounded-xl"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-4 text-gray-400 hover:text-gray-600 hover:bg-transparent transition-colors"
                    onClick={() => setShowPassword(!showPassword)}
                    tabIndex={-1}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </Button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full h-12 text-base font-semibold bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 shadow-lg shadow-orange-200/50 transition-all duration-300 rounded-xl mt-2"
                disabled={login.isPending}
              >
                {login.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Memproses...
                  </>
                ) : (
                  <>
                    Masuk ke Dashboard
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </>
                )}
              </Button>
            </form>

            {/* Divider */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-4 text-gray-400">atau</span>
              </div>
            </div>

            {/* Alternative Actions */}
            <div className="space-y-4">
              <Link href="/login">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full h-12 text-base font-medium border-gray-200 hover:bg-orange-50 hover:border-orange-300 hover:text-orange-600 rounded-xl transition-all"
                >
                  Masuk sebagai Customer
                </Button>
              </Link>
              
              <p className="text-center mt-5 text-sm text-gray-500">
                Belum menjadi merchant?{' '}
                <Link href="#" className="font-semibold text-orange-600 hover:text-orange-700 hover:underline">
                  Daftar Sekarang
                </Link>
              </p>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="mt-8 flex items-center justify-center gap-6 text-gray-400 text-sm">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span>SSL Secured</span>
            </div>
            <div className="w-1 h-1 rounded-full bg-gray-300" />
            <div className="flex items-center gap-2">
              <span>256-bit Encryption</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
