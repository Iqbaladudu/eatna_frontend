import Link from 'next/link';
import Image from 'next/image';
import { 
  Utensils, ArrowRight, Ticket, Wallet, Shield, Store, Sparkles, Users, Zap,
  CheckCircle, Star, MapPin, Clock, CreditCard, Smartphone, Gift, TrendingUp,
  ChevronRight, MessageCircle, Phone, Mail, Instagram, Twitter, Facebook
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-orange-100">
        <div className="container flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-200">
              <Utensils className="h-5 w-5" />
            </div>
            <span className="bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">Eatna</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#features" className="text-sm text-gray-600 hover:text-orange-600 transition-colors">Fitur</a>
            <a href="#how-it-works" className="text-sm text-gray-600 hover:text-orange-600 transition-colors">Cara Kerja</a>
            <a href="#merchants" className="text-sm text-gray-600 hover:text-orange-600 transition-colors">Merchant</a>
            <a href="#testimonials" className="text-sm text-gray-600 hover:text-orange-600 transition-colors">Testimoni</a>
          </nav>
          <nav className="flex items-center gap-3">
            <Link href="/merchant-login">
              <Button variant="ghost" size="sm" className="text-gray-600 hover:text-orange-600">
                <Store className="h-4 w-4 mr-1" />
                Merchant
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="ghost" size="sm" className="text-gray-600 hover:text-orange-600">Masuk</Button>
            </Link>
            <Link href="/register">
              <Button size="sm" className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 shadow-lg shadow-orange-200">
                Daftar Gratis
              </Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1">
        <section className="relative overflow-hidden">
          {/* Background Gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50" />
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-orange-100/50 to-transparent" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-200/30 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />
          <div className="absolute top-20 right-20 w-72 h-72 bg-amber-200/40 rounded-full blur-3xl" />
          
          <div className="relative container flex flex-col items-center justify-center gap-8 py-20 px-4 text-center md:py-28 lg:py-36">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur border border-orange-200 shadow-sm animate-bounce">
              <Sparkles className="h-4 w-4 text-orange-500" />
              <span className="text-sm font-medium text-gray-700">Platform Voucher Digital #1 Indonesia</span>
            </div>
            
            <div className="space-y-6 max-w-4xl">
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                <span className="text-gray-900">Solusi </span>
                <span className="bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 bg-clip-text text-transparent">Makanan Digital</span>
                <span className="text-gray-900"> untuk</span>
                <br />
                <span className="text-gray-900">Gaya Hidup Modern</span>
              </h1>
              <p className="mx-auto max-w-2xl text-lg md:text-xl text-gray-600 leading-relaxed">
                Beli voucher, isi saldo, dan nikmati kemudahan transaksi di ratusan merchant favorit. 
                Cepat, aman, dan tanpa ribet.
              </p>
            </div>
            
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link href="/register">
                <Button size="lg" className="gap-2 px-8 h-14 text-base bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 shadow-xl shadow-orange-200/50 transform hover:scale-105 transition-all">
                  Mulai Sekarang
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="/login">
                <Button size="lg" variant="outline" className="px-8 h-14 text-base border-orange-200 hover:bg-orange-50 hover:border-orange-300">
                  Sudah Punya Akun
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 mt-12 pt-8 border-t border-orange-100">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">10K+</div>
                <div className="text-sm text-gray-600 mt-1">Pengguna Aktif</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">500+</div>
                <div className="text-sm text-gray-600 mt-1">Merchant Partner</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">50K+</div>
                <div className="text-sm text-gray-600 mt-1">Transaksi Sukses</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">99.9%</div>
                <div className="text-sm text-gray-600 mt-1">Uptime Server</div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 md:py-28 bg-white">
          <div className="container px-4">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 text-orange-600 text-sm font-medium mb-4">
                <Sparkles className="h-4 w-4" />
                Fitur Unggulan
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">Mengapa Memilih Eatna?</h2>
              <p className="text-gray-600 max-w-2xl mx-auto text-lg">Platform terlengkap untuk kebutuhan voucher digital makanan dan minuman Anda</p>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {/* Feature 1 */}
              <div className="group relative flex flex-col p-8 rounded-3xl bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-100 hover:shadow-2xl hover:shadow-orange-100/50 transition-all duration-500 hover:-translate-y-2">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 text-white mb-5 shadow-lg shadow-orange-200 group-hover:scale-110 transition-transform">
                  <Ticket className="h-7 w-7" />
                </div>
                <h3 className="font-bold text-xl mb-3 text-gray-900">Voucher Digital</h3>
                <p className="text-gray-600 leading-relaxed flex-1">
                  Beli voucher dengan nominal sesuai kebutuhan. Kirim ke teman sebagai hadiah atau gunakan sendiri.
                </p>
                <div className="mt-4 flex items-center text-orange-600 font-medium text-sm group-hover:translate-x-2 transition-transform">
                  Pelajari Lebih Lanjut <ChevronRight className="h-4 w-4 ml-1" />
                </div>
              </div>

              {/* Feature 2 */}
              <div className="group relative flex flex-col p-8 rounded-3xl bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-100 hover:shadow-2xl hover:shadow-orange-100/50 transition-all duration-500 hover:-translate-y-2">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 text-white mb-5 shadow-lg shadow-orange-200 group-hover:scale-110 transition-transform">
                  <Wallet className="h-7 w-7" />
                </div>
                <h3 className="font-bold text-xl mb-3 text-gray-900">Top Up Instan</h3>
                <p className="text-gray-600 leading-relaxed flex-1">
                  Isi saldo dengan berbagai metode pembayaran. Cepat, aman, dan tanpa biaya tambahan.
                </p>
                <div className="mt-4 flex items-center text-orange-600 font-medium text-sm group-hover:translate-x-2 transition-transform">
                  Pelajari Lebih Lanjut <ChevronRight className="h-4 w-4 ml-1" />
                </div>
              </div>

              {/* Feature 3 */}
              <div className="group relative flex flex-col p-8 rounded-3xl bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-100 hover:shadow-2xl hover:shadow-orange-100/50 transition-all duration-500 hover:-translate-y-2">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 text-white mb-5 shadow-lg shadow-orange-200 group-hover:scale-110 transition-transform">
                  <Shield className="h-7 w-7" />
                </div>
                <h3 className="font-bold text-xl mb-3 text-gray-900">Aman & Terpercaya</h3>
                <p className="text-gray-600 leading-relaxed flex-1">
                  Transaksi dilindungi dengan enkripsi terbaik. Data Anda aman bersama kami.
                </p>
                <div className="mt-4 flex items-center text-orange-600 font-medium text-sm group-hover:translate-x-2 transition-transform">
                  Pelajari Lebih Lanjut <ChevronRight className="h-4 w-4 ml-1" />
                </div>
              </div>

              {/* Feature 4 */}
              <div className="group relative flex flex-col p-8 rounded-3xl bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-100 hover:shadow-2xl hover:shadow-orange-100/50 transition-all duration-500 hover:-translate-y-2">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 text-white mb-5 shadow-lg shadow-orange-200 group-hover:scale-110 transition-transform">
                  <MapPin className="h-7 w-7" />
                </div>
                <h3 className="font-bold text-xl mb-3 text-gray-900">500+ Merchant</h3>
                <p className="text-gray-600 leading-relaxed flex-1">
                  Temukan berbagai pilihan merchant di seluruh Indonesia. Dari warung hingga restoran premium.
                </p>
                <div className="mt-4 flex items-center text-orange-600 font-medium text-sm group-hover:translate-x-2 transition-transform">
                  Lihat Merchant <ChevronRight className="h-4 w-4 ml-1" />
                </div>
              </div>

              {/* Feature 5 */}
              <div className="group relative flex flex-col p-8 rounded-3xl bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-100 hover:shadow-2xl hover:shadow-orange-100/50 transition-all duration-500 hover:-translate-y-2">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 text-white mb-5 shadow-lg shadow-orange-200 group-hover:scale-110 transition-transform">
                  <Gift className="h-7 w-7" />
                </div>
                <h3 className="font-bold text-xl mb-3 text-gray-900">Hadiah & Promo</h3>
                <p className="text-gray-600 leading-relaxed flex-1">
                  Dapatkan bonus dan promo menarik setiap hari. Semakin sering transaksi, semakin banyak keuntungan.
                </p>
                <div className="mt-4 flex items-center text-orange-600 font-medium text-sm group-hover:translate-x-2 transition-transform">
                  Lihat Promo <ChevronRight className="h-4 w-4 ml-1" />
                </div>
              </div>

              {/* Feature 6 */}
              <div className="group relative flex flex-col p-8 rounded-3xl bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-100 hover:shadow-2xl hover:shadow-orange-100/50 transition-all duration-500 hover:-translate-y-2">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 text-white mb-5 shadow-lg shadow-orange-200 group-hover:scale-110 transition-transform">
                  <Smartphone className="h-7 w-7" />
                </div>
                <h3 className="font-bold text-xl mb-3 text-gray-900">Akses Mudah</h3>
                <p className="text-gray-600 leading-relaxed flex-1">
                  Akses dari mana saja dan kapan saja. Platform kami responsif di semua perangkat.
                </p>
                <div className="mt-4 flex items-center text-orange-600 font-medium text-sm group-hover:translate-x-2 transition-transform">
                  Coba Sekarang <ChevronRight className="h-4 w-4 ml-1" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-20 md:py-28 bg-gradient-to-br from-gray-50 to-orange-50/30">
          <div className="container px-4">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 text-orange-600 text-sm font-medium mb-4">
                <Clock className="h-4 w-4" />
                Mudah & Cepat
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">Cara Kerja Eatna</h2>
              <p className="text-gray-600 max-w-2xl mx-auto text-lg">Hanya 4 langkah sederhana untuk menikmati kemudahan transaksi</p>
            </div>
            
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {/* Step 1 */}
              <div className="relative text-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-amber-500 text-white text-2xl font-bold mx-auto mb-6 shadow-xl shadow-orange-200">
                  1
                </div>
                <h3 className="font-bold text-xl mb-3 text-gray-900">Daftar Akun</h3>
                <p className="text-gray-600">Buat akun gratis dalam hitungan detik dengan email atau nomor telepon</p>
                <div className="hidden lg:block absolute top-10 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-orange-300 to-transparent" />
              </div>

              {/* Step 2 */}
              <div className="relative text-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-amber-500 text-white text-2xl font-bold mx-auto mb-6 shadow-xl shadow-orange-200">
                  2
                </div>
                <h3 className="font-bold text-xl mb-3 text-gray-900">Isi Saldo</h3>
                <p className="text-gray-600">Top up saldo dengan transfer bank, e-wallet, atau kartu kredit</p>
                <div className="hidden lg:block absolute top-10 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-orange-300 to-transparent" />
              </div>

              {/* Step 3 */}
              <div className="relative text-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-amber-500 text-white text-2xl font-bold mx-auto mb-6 shadow-xl shadow-orange-200">
                  3
                </div>
                <h3 className="font-bold text-xl mb-3 text-gray-900">Beli Voucher</h3>
                <p className="text-gray-600">Pilih nominal dan beli voucher sesuai kebutuhan Anda</p>
                <div className="hidden lg:block absolute top-10 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-orange-300 to-transparent" />
              </div>

              {/* Step 4 */}
              <div className="relative text-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-amber-500 text-white text-2xl font-bold mx-auto mb-6 shadow-xl shadow-orange-200">
                  4
                </div>
                <h3 className="font-bold text-xl mb-3 text-gray-900">Gunakan</h3>
                <p className="text-gray-600">Tunjukkan kode voucher di merchant favorit dan nikmati makanannya</p>
              </div>
            </div>
          </div>
        </section>

        {/* For Merchants Section */}
        <section id="merchants" className="py-20 md:py-28 bg-white">
          <div className="container px-4">
            <div className="grid gap-12 lg:grid-cols-2 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 text-orange-600 text-sm font-medium mb-6">
                  <Store className="h-4 w-4" />
                  Untuk Merchant
                </div>
                <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">Kembangkan Bisnis Anda Bersama Eatna</h2>
                <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                  Bergabung sebagai merchant partner dan nikmati berbagai keuntungan. Tingkatkan penjualan, 
                  dapatkan pelanggan baru, dan kelola transaksi dengan mudah.
                </p>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-orange-600">
                      <TrendingUp className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Tingkatkan Penjualan</h4>
                      <p className="text-gray-600 text-sm">Raih lebih banyak pelanggan melalui platform kami</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-orange-600">
                      <CreditCard className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Pembayaran Cepat</h4>
                      <p className="text-gray-600 text-sm">Dana masuk ke rekening Anda dalam 1x24 jam</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-orange-600">
                      <Zap className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Dashboard Lengkap</h4>
                      <p className="text-gray-600 text-sm">Pantau transaksi real-time dengan dashboard intuitif</p>
                    </div>
                  </div>
                </div>

                <Link href="/merchant-login">
                  <Button size="lg" className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 shadow-lg shadow-orange-200">
                    <Store className="h-5 w-5 mr-2" />
                    Daftar sebagai Merchant
                  </Button>
                </Link>
              </div>
              
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-200 to-amber-200 rounded-3xl blur-3xl opacity-30" />
                <div className="relative bg-gradient-to-br from-orange-500 to-amber-500 rounded-3xl p-8 text-white">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="bg-white/10 backdrop-blur rounded-2xl p-6 text-center">
                      <div className="text-4xl font-bold">0%</div>
                      <div className="text-orange-100 text-sm mt-1">Biaya Pendaftaran</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur rounded-2xl p-6 text-center">
                      <div className="text-4xl font-bold">24h</div>
                      <div className="text-orange-100 text-sm mt-1">Pencairan Dana</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur rounded-2xl p-6 text-center">
                      <div className="text-4xl font-bold">500+</div>
                      <div className="text-orange-100 text-sm mt-1">Partner Aktif</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur rounded-2xl p-6 text-center">
                      <div className="text-4xl font-bold">24/7</div>
                      <div className="text-orange-100 text-sm mt-1">Customer Support</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-20 md:py-28 bg-gradient-to-br from-orange-50 to-amber-50">
          <div className="container px-4">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 text-orange-600 text-sm font-medium mb-4">
                <MessageCircle className="h-4 w-4" />
                Testimoni
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">Apa Kata Mereka?</h2>
              <p className="text-gray-600 max-w-2xl mx-auto text-lg">Ribuan pengguna telah merasakan kemudahan bertransaksi dengan Eatna</p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              {/* Testimonial 1 */}
              <div className="bg-white rounded-3xl p-8 shadow-xl shadow-orange-100/50 hover:shadow-2xl transition-shadow">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-orange-400 text-orange-400" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {'"Eatna sangat membantu saya untuk memberikan hadiah ke teman dan keluarga. Prosesnya cepat dan vouchernya bisa digunakan di banyak tempat!"'}
                </p>
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-orange-400 to-amber-400 flex items-center justify-center text-white font-bold">
                    AS
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Ahmad Setiawan</div>
                    <div className="text-sm text-gray-500">Pengguna Aktif</div>
                  </div>
                </div>
              </div>

              {/* Testimonial 2 */}
              <div className="bg-white rounded-3xl p-8 shadow-xl shadow-orange-100/50 hover:shadow-2xl transition-shadow">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-orange-400 text-orange-400" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {'"Sebagai pemilik warung, bergabung dengan Eatna adalah keputusan terbaik. Pelanggan baru terus berdatangan dan sistem pencairannya sangat cepat."'}
                </p>
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-orange-400 to-amber-400 flex items-center justify-center text-white font-bold">
                    BR
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Budi Raharjo</div>
                    <div className="text-sm text-gray-500">Pemilik Warung Sederhana</div>
                  </div>
                </div>
              </div>

              {/* Testimonial 3 */}
              <div className="bg-white rounded-3xl p-8 shadow-xl shadow-orange-100/50 hover:shadow-2xl transition-shadow">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-orange-400 text-orange-400" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {'"Saya suka fitur top up yang instan. Bisa langsung digunakan setelah transfer. Tidak perlu menunggu lama. Sangat praktis!"'}
                </p>
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-orange-400 to-amber-400 flex items-center justify-center text-white font-bold">
                    DN
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Dewi Nurhayati</div>
                    <div className="text-sm text-gray-500">Mahasiswa</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Payment Methods Section */}
        <section className="py-16 bg-white border-y border-gray-100">
          <div className="container px-4">
            <div className="text-center mb-12">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Metode Pembayaran</h3>
              <p className="text-gray-600">Berbagai pilihan pembayaran untuk kemudahan Anda</p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 opacity-60 grayscale hover:opacity-100 hover:grayscale-0 transition-all">
              <div className="text-2xl font-bold text-gray-600">BCA</div>
              <div className="text-2xl font-bold text-gray-600">Mandiri</div>
              <div className="text-2xl font-bold text-gray-600">BNI</div>
              <div className="text-2xl font-bold text-gray-600">BRI</div>
              <div className="text-2xl font-bold text-gray-600">GoPay</div>
              <div className="text-2xl font-bold text-gray-600">OVO</div>
              <div className="text-2xl font-bold text-gray-600">DANA</div>
              <div className="text-2xl font-bold text-gray-600">ShopeePay</div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 md:py-28 bg-gradient-to-br from-orange-500 via-amber-500 to-orange-600 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
          </div>
          <div className="container px-4 text-center relative">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Siap Memulai?</h2>
            <p className="text-orange-100 mb-10 max-w-2xl mx-auto text-lg leading-relaxed">
              Bergabung dengan ribuan pengguna yang sudah menikmati kemudahan transaksi di Eatna. 
              Daftar sekarang dan dapatkan bonus saldo Rp10.000!
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/register">
                <Button size="lg" className="bg-white text-orange-600 hover:bg-orange-50 shadow-2xl px-10 h-14 text-base transform hover:scale-105 transition-all">
                  Daftar Gratis Sekarang
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/merchant-login">
                <Button size="lg" variant="outline" className="border-white/50 bg-white/10 text-white hover:bg-white/10 px-10 h-14 text-base">
                  <Store className="mr-2 h-5 w-5" />
                  Daftar sebagai Merchant
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-16">
        <div className="container px-4">
          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4 mb-12">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-amber-500">
                  <Utensils className="h-5 w-5 text-white" />
                </div>
                <div className="font-bold text-white text-xl">Eatna</div>
              </div>
              <p className="text-sm leading-relaxed mb-6">
                Platform voucher digital terlengkap untuk kebutuhan makanan dan minuman Anda. Solusi praktis untuk gaya hidup modern.
              </p>
              <div className="flex items-center gap-4">
                <a href="#" className="h-10 w-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-orange-500 transition-colors">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href="#" className="h-10 w-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-orange-500 transition-colors">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="#" className="h-10 w-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-orange-500 transition-colors">
                  <Facebook className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold text-white mb-6">Tautan Cepat</h4>
              <nav className="space-y-3 text-sm">
                <a href="#features" className="block hover:text-white transition-colors">Fitur</a>
                <a href="#how-it-works" className="block hover:text-white transition-colors">Cara Kerja</a>
                <a href="#merchants" className="block hover:text-white transition-colors">Untuk Merchant</a>
                <a href="#testimonials" className="block hover:text-white transition-colors">Testimoni</a>
              </nav>
            </div>

            {/* Legal */}
            <div>
              <h4 className="font-semibold text-white mb-6">Legal</h4>
              <nav className="space-y-3 text-sm">
                <a href="#" className="block hover:text-white transition-colors">Syarat & Ketentuan</a>
                <a href="#" className="block hover:text-white transition-colors">Kebijakan Privasi</a>
                <a href="#" className="block hover:text-white transition-colors">FAQ</a>
                <a href="#" className="block hover:text-white transition-colors">Bantuan</a>
              </nav>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-semibold text-white mb-6">Hubungi Kami</h4>
              <div className="space-y-4 text-sm">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-orange-500" />
                  <span>support@eatna.id</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-orange-500" />
                  <span>+62 21 1234 5678</span>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-orange-500 shrink-0" />
                  <span>Jl. Sudirman No. 123, Jakarta Selatan 12190</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-sm">© 2026 Eatna. All rights reserved.</div>
            <div className="text-sm">Made with ❤️ in Indonesia</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
