'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  Eye, EyeOff, Loader2, Utensils, Mail, Lock, User, Phone, MapPin,
  ArrowRight, Sparkles, CheckCircle, Gift, Ticket, Shield
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useRegister, useZones } from '@/lib/api';
import { toast } from 'sonner';

export function RegisterForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    password2: '',
    full_name: '',
    phone: '',
    zone_id: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const register = useRegister();
  const { data: zonesData } = useZones();
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.password2) {
      toast.error('Password dan konfirmasi password tidak cocok');
      return;
    }

    register.mutate(
      {
        email: formData.email,
        password: formData.password,
        password2: formData.password2,
        full_name: formData.full_name,
        phone: formData.phone,
        zone_id: parseInt(formData.zone_id),
      },
      {
        onSuccess: () => {
          toast.success('Registrasi berhasil! Selamat datang di Eatna.');
          router.push('/dashboard');
        },
        onError: (error: Error & { response?: { data?: Record<string, string[]> } }) => {
          const errorData = error.response?.data;
          if (errorData) {
            const firstError = Object.values(errorData)[0];
            toast.error(Array.isArray(firstError) ? firstError[0] : 'Registrasi gagal');
          } else {
            toast.error('Registrasi gagal. Silakan coba lagi.');
          }
        },
      }
    );
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-[45%] bg-gradient-to-br from-orange-500 via-amber-500 to-orange-600 relative overflow-hidden">
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
                <Utensils className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold">Eatna</span>
            </Link>
          </div>

          {/* Main Content */}
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl xl:text-5xl font-bold leading-tight mb-4">
                Bergabung dengan<br />10.000+ Pengguna
              </h1>
              <p className="text-orange-100 text-lg max-w-md">
                Daftar sekarang dan nikmati kemudahan transaksi makanan digital di ratusan merchant favorit.
              </p>
            </div>

            {/* Benefits */}
            <div className="space-y-4 max-w-md">
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/20">
                  <CheckCircle className="h-5 w-5" />
                </div>
                <span className="text-lg">Gratis tanpa biaya pendaftaran</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/20">
                  <CheckCircle className="h-5 w-5" />
                </div>
                <span className="text-lg">Bonus saldo Rp10.000 untuk user baru</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/20">
                  <CheckCircle className="h-5 w-5" />
                </div>
                <span className="text-lg">Akses ke 500+ merchant partner</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/20">
                  <CheckCircle className="h-5 w-5" />
                </div>
                <span className="text-lg">Promo dan cashback setiap hari</span>
              </div>
            </div>

            {/* Promo Badge */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 max-w-md">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-white/20">
                  <Gift className="h-7 w-7" />
                </div>
                <div>
                  <h4 className="font-bold text-lg">Promo Pendaftaran!</h4>
                  <p className="text-orange-100">Dapatkan bonus saldo Rp10.000 setelah verifikasi akun</p>
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-8">
            <div>
              <div className="text-3xl font-bold">10K+</div>
              <div className="text-orange-100 text-sm">Pengguna Aktif</div>
            </div>
            <div className="h-12 w-px bg-white/20" />
            <div>
              <div className="text-3xl font-bold">500+</div>
              <div className="text-orange-100 text-sm">Merchant</div>
            </div>
            <div className="h-12 w-px bg-white/20" />
            <div>
              <div className="text-3xl font-bold">50K+</div>
              <div className="text-orange-100 text-sm">Transaksi</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Register Form */}
      <div className="w-full lg:w-[55%] flex items-center justify-center p-6 lg:p-12 bg-gradient-to-br from-orange-50/50 via-white to-amber-50/30">
        <div className="w-full max-w-xl">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center justify-center gap-3 mb-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 shadow-lg shadow-orange-200">
              <Utensils className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">Eatna</span>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-3xl shadow-2xl shadow-orange-100/50 p-6 lg:p-8 border border-orange-100/50">
            {/* Header */}
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 text-orange-600 text-sm font-medium mb-4">
                <Sparkles className="h-4 w-4" />
                Daftar Gratis
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Buat Akun Baru</h2>
              <p className="text-gray-500">Mulai pengalaman kuliner digital Anda</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name & Phone Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="full_name" className="text-sm font-medium text-gray-700">
                    Nama Lengkap
                  </Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <Input
                      id="full_name"
                      name="full_name"
                      placeholder="John Doe"
                      value={formData.full_name}
                      onChange={handleChange}
                      required
                      disabled={register.isPending}
                      className="h-12 pl-12 bg-gray-50 border-gray-200 focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all rounded-xl"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                    Nomor Telepon
                  </Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                      <Phone className="h-5 w-5 text-gray-400" />
                    </div>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="08123456789"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      disabled={register.isPending}
                      className="h-12 pl-12 bg-gray-50 border-gray-200 focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all rounded-xl"
                    />
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email
                </Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="nama@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled={register.isPending}
                    className="h-12 pl-12 bg-gray-50 border-gray-200 focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all rounded-xl"
                  />
                </div>
              </div>

              {/* Zone */}
              <div className="space-y-2">
                <Label htmlFor="zone_id" className="text-sm font-medium text-gray-700">
                  Zona Lokasi
                </Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none z-10">
                    <MapPin className="h-5 w-5 text-gray-400" />
                  </div>
                  <Select
                    value={formData.zone_id}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, zone_id: value }))}
                    disabled={register.isPending}
                  >
                    <SelectTrigger className="h-12 pl-12 bg-gray-50 border-gray-200 focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all rounded-xl">
                      <SelectValue placeholder="Pilih zona lokasi Anda" />
                    </SelectTrigger>
                    <SelectContent>
                      {zonesData?.results.map((zone) => (
                        <SelectItem key={zone.id} value={zone.id.toString()}>
                          {zone.name} - {zone.city}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Password Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                    Password
                  </Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Min. 8 karakter"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      disabled={register.isPending}
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
                <div className="space-y-2">
                  <Label htmlFor="password2" className="text-sm font-medium text-gray-700">
                    Konfirmasi Password
                  </Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <Input
                      id="password2"
                      name="password2"
                      type="password"
                      placeholder="Ulangi password"
                      value={formData.password2}
                      onChange={handleChange}
                      required
                      disabled={register.isPending}
                      className="h-12 pl-12 bg-gray-50 border-gray-200 focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all rounded-xl"
                    />
                  </div>
                </div>
              </div>

              {/* Terms */}
              <p className="text-xs text-gray-500 text-center">
                Dengan mendaftar, Anda menyetujui{' '}
                <Link href="#" className="text-orange-600 hover:underline">Syarat & Ketentuan</Link>
                {' '}dan{' '}
                <Link href="#" className="text-orange-600 hover:underline">Kebijakan Privasi</Link>
                {' '}kami.
              </p>

              <Button
                type="submit"
                className="w-full h-12 text-base font-semibold bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 shadow-lg shadow-orange-200/50 transition-all duration-300 rounded-xl"
                disabled={register.isPending}
              >
                {register.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Memproses...
                  </>
                ) : (
                  <>
                    Daftar Sekarang
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </>
                )}
              </Button>
            </form>

            {/* Login Link */}
            <p className="text-center mt-6 text-sm text-gray-500">
              Sudah punya akun?{' '}
              <Link href="/login" className="font-semibold text-orange-600 hover:text-orange-700 hover:underline">
                Masuk di sini
              </Link>
            </p>
          </div>

          {/* Trust Badges */}
          <div className="mt-6 flex items-center justify-center gap-6 text-gray-400 text-sm">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span>Data Terenkripsi</span>
            </div>
            <div className="w-1 h-1 rounded-full bg-gray-300" />
            <div className="flex items-center gap-2">
              <span>Privasi Terjaga</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
