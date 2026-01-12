'use client';

import { ArrowRight, Wallet, Receipt, TrendingUp, QrCode, Store, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useMerchantProfile, useMerchantStats, useMerchantTransactions } from '@/lib/api';

function formatCurrency(amount: string) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(parseFloat(amount));
}

function formatTime(dateString: string) {
  return new Date(dateString).toLocaleTimeString('id-ID', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

export default function MerchantDashboardPage() {
  const { data: profile } = useMerchantProfile();
  const { data: stats, isLoading: statsLoading } = useMerchantStats();
  const { data: transactions, isLoading: transactionsLoading } = useMerchantTransactions();

  return (
    <div className="space-y-8">
      {/* Greeting Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="h-14 w-14 rounded-2xl bg-linear-to-br from-orange-500 to-amber-500 flex items-center justify-center shadow-lg shadow-orange-200">
            <Store className="h-7 w-7 text-white" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              {profile?.name || 'Merchant'}
            </h1>
            <p className="text-gray-500">{profile?.zone_name}</p>
          </div>
        </div>
        <Link href="/merchant/claim">
          <Button size="lg" className="gap-2 bg-linear-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 shadow-lg shadow-orange-200/50">
            <QrCode className="h-5 w-5" />
            Claim Voucher
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="relative overflow-hidden border-0 bg-linear-to-br from-orange-500 to-amber-500 text-white shadow-xl shadow-orange-200/50">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white/90">Total Hari Ini</CardTitle>
            <Wallet className="h-5 w-5 text-white/80" />
          </CardHeader>
          <CardContent>
            {statsLoading ? (
              <Skeleton className="h-10 w-32 bg-white/20" />
            ) : (
              <>
                <div className="text-3xl md:text-4xl font-bold">
                  {formatCurrency(stats?.total_today || '0')}
                </div>
                <p className="text-sm text-white/70 mt-1">{stats?.date}</p>
              </>
            )}
          </CardContent>
        </Card>

        <Card className="group hover:shadow-lg hover:shadow-orange-100/50 transition-all duration-300 border-orange-100">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Transaksi Hari Ini</CardTitle>
            <div className="h-10 w-10 rounded-xl bg-linear-to-br from-orange-100 to-amber-100 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Receipt className="h-5 w-5 text-orange-600" />
            </div>
          </CardHeader>
          <CardContent>
            {statsLoading ? (
              <Skeleton className="h-10 w-16" />
            ) : (
              <>
                <div className="text-3xl font-bold text-gray-900">{stats?.count_today || 0}</div>
                <p className="text-sm text-gray-500 mt-1">voucher diklaim</p>
              </>
            )}
          </CardContent>
        </Card>

        <Card className="group hover:shadow-lg hover:shadow-orange-100/50 transition-all duration-300 border-orange-100">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Rata-rata Transaksi</CardTitle>
            <div className="h-10 w-10 rounded-xl bg-linear-to-br from-orange-100 to-amber-100 flex items-center justify-center group-hover:scale-110 transition-transform">
              <TrendingUp className="h-5 w-5 text-orange-600" />
            </div>
          </CardHeader>
          <CardContent>
            {statsLoading ? (
              <Skeleton className="h-10 w-24" />
            ) : (
              <>
                <div className="text-3xl font-bold text-gray-900">
                  {stats?.count_today && stats.count_today > 0
                    ? formatCurrency(String(parseFloat(stats.total_today) / stats.count_today))
                    : 'Rp 0'}
                </div>
                <p className="text-sm text-gray-500 mt-1">per voucher</p>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Quick Action */}
      <Link href="/merchant/claim" className="block">
        <Card className="group cursor-pointer border-orange-100 hover:shadow-xl hover:shadow-orange-100/50 transition-all duration-300 overflow-hidden">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="h-16 w-16 rounded-2xl bg-linear-to-br from-orange-500 to-amber-500 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform shadow-lg shadow-orange-200">
              <QrCode className="h-8 w-8 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-lg text-gray-900 mb-1">Claim Voucher Customer</h3>
              <p className="text-gray-500">Masukkan kode voucher untuk memproses pembayaran</p>
            </div>
            <ArrowRight className="h-6 w-6 text-gray-400 group-hover:text-orange-500 group-hover:translate-x-2 transition-all" />
          </CardContent>
        </Card>
      </Link>

      {/* Recent Transactions */}
      <Card className="border-orange-100">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-linear-to-br from-orange-100 to-amber-100 flex items-center justify-center">
              <Sparkles className="h-5 w-5 text-orange-600" />
            </div>
            <CardTitle className="text-xl">Transaksi Terbaru</CardTitle>
          </div>
          <Link href="/merchant/transactions">
            <Button variant="ghost" size="sm" className="gap-2 text-orange-600 hover:text-orange-700 hover:bg-orange-50">
              Lihat Semua <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          {transactionsLoading ? (
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-center justify-between py-3 border-b last:border-0">
                  <div className="flex items-center gap-3">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-3 w-32" />
                    </div>
                  </div>
                  <Skeleton className="h-5 w-20" />
                </div>
              ))}
            </div>
          ) : transactions && transactions.length > 0 ? (
            <div className="space-y-1">
              {transactions.slice(0, 5).map((tx, idx) => (
                <div key={tx.id} className="flex items-center justify-between py-4 border-b last:border-0 hover:bg-orange-50/50 -mx-2 px-2 rounded-lg transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-linear-to-br from-green-100 to-emerald-100 flex items-center justify-center text-green-600 font-semibold text-sm">
                      #{idx + 1}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{tx.user_name}</p>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <span className="font-mono bg-gray-100 px-2 py-0.5 rounded text-xs">{tx.voucher_code}</span>
                        <span>•</span>
                        <span>{formatTime(tx.created_at)}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-green-600 text-lg">
                      +{formatCurrency(tx.amount)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-linear-to-br from-orange-50 to-amber-50 rounded-2xl">
              <div className="h-16 w-16 rounded-2xl bg-linear-to-br from-orange-100 to-amber-100 flex items-center justify-center mx-auto mb-4">
                <Receipt className="h-8 w-8 text-orange-400" />
              </div>
              <p className="text-gray-600 mb-3">Belum ada transaksi hari ini</p>
              <Link href="/merchant/claim">
                <Button className="bg-linear-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600">
                  Claim voucher pertama
                </Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
