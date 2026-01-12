'use client';

import Link from 'next/link';
import { ArrowRight, Ticket, History, Wallet, Plus, CreditCard, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BalanceCard, VoucherCard, VoucherCardSkeleton, TransactionList, TransactionSkeleton } from '@/components/dashboard';
import { useProfile, useVouchers, useTransactions } from '@/lib/api';

export default function DashboardPage() {
  const { data: profile } = useProfile();
  const { data: vouchersData, isLoading: vouchersLoading } = useVouchers(3);
  const { data: transactionsData, isLoading: transactionsLoading } = useTransactions(5);

  const activeVouchers = vouchersData?.results.filter((v) => v.status === 'active') || [];

  return (
    <div className="space-y-8">
      {/* Greeting Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            Halo, {profile?.full_name?.split(' ')[0] || 'User'}! 👋
          </h1>
          <p className="text-gray-500 mt-1">
            Selamat datang kembali di Eatna
          </p>
        </div>
        <div className="flex gap-3">
          <Link href="/dashboard/topup">
            <Button className="gap-2 bg-linear-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 shadow-lg shadow-orange-200/50">
              <Plus className="h-4 w-4" />
              Top Up Saldo
            </Button>
          </Link>
          <Link href="/dashboard/vouchers">
            <Button variant="outline" className="gap-2 border-orange-200 hover:bg-orange-50 hover:border-orange-300">
              <Ticket className="h-4 w-4" />
              Beli Voucher
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <BalanceCard />
        <Card className="group hover:shadow-lg hover:shadow-orange-100/50 transition-all duration-300 border-orange-100">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Voucher Aktif</CardTitle>
            <div className="h-10 w-10 rounded-xl bg-linear-to-br from-orange-100 to-amber-100 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Ticket className="h-5 w-5 text-orange-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">{activeVouchers.length}</div>
            <p className="text-sm text-gray-500 mt-1">voucher tersedia</p>
          </CardContent>
        </Card>
        <Card className="group hover:shadow-lg hover:shadow-orange-100/50 transition-all duration-300 border-orange-100">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Transaksi</CardTitle>
            <div className="h-10 w-10 rounded-xl bg-linear-to-br from-orange-100 to-amber-100 flex items-center justify-center group-hover:scale-110 transition-transform">
              <History className="h-5 w-5 text-orange-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">{transactionsData?.count || 0}</div>
            <p className="text-sm text-gray-500 mt-1">transaksi tercatat</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions Grid */}
      <div className="grid gap-4 md:grid-cols-2">
        <Link href="/dashboard/topup" className="block">
          <Card className="group cursor-pointer hover:shadow-lg hover:shadow-orange-100/50 transition-all duration-300 border-orange-100 overflow-hidden">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="h-14 w-14 rounded-2xl bg-linear-to-br from-orange-500 to-amber-500 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-lg shadow-orange-200">
                <Wallet className="h-7 w-7 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1">Top Up Saldo</h3>
                <p className="text-sm text-gray-500">Isi saldo untuk membeli voucher</p>
              </div>
              <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-orange-500 group-hover:translate-x-1 transition-all" />
            </CardContent>
          </Card>
        </Link>
        <Link href="/dashboard/vouchers" className="block">
          <Card className="group cursor-pointer hover:shadow-lg hover:shadow-orange-100/50 transition-all duration-300 border-orange-100 overflow-hidden">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="h-14 w-14 rounded-2xl bg-linear-to-br from-orange-500 to-amber-500 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-lg shadow-orange-200">
                <CreditCard className="h-7 w-7 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1">Beli Voucher</h3>
                <p className="text-sm text-gray-500">Buat voucher baru dengan saldo Anda</p>
              </div>
              <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-orange-500 group-hover:translate-x-1 transition-all" />
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* Vouchers */}
      <Card className="border-orange-100">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-linear-to-br from-orange-100 to-amber-100 flex items-center justify-center">
              <Sparkles className="h-5 w-5 text-orange-600" />
            </div>
            <CardTitle className="text-xl">Voucher Terbaru</CardTitle>
          </div>
          <Link href="/dashboard/vouchers">
            <Button variant="ghost" size="sm" className="gap-2 text-orange-600 hover:text-orange-700 hover:bg-orange-50">
              Lihat Semua <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          {vouchersLoading ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {[...Array(3)].map((_, i) => (
                <VoucherCardSkeleton key={i} />
              ))}
            </div>
          ) : activeVouchers.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {activeVouchers.slice(0, 3).map((voucher) => (
                <VoucherCard key={voucher.id} voucher={voucher} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-linear-to-br from-orange-50 to-amber-50 rounded-2xl">
              <div className="h-16 w-16 rounded-2xl bg-linear-to-br from-orange-100 to-amber-100 flex items-center justify-center mx-auto mb-4">
                <Ticket className="h-8 w-8 text-orange-400" />
              </div>
              <p className="text-gray-600 mb-3">Belum ada voucher aktif</p>
              <Link href="/dashboard/vouchers">
                <Button className="bg-linear-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600">
                  Beli voucher sekarang
                </Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Recent Transactions */}
      <Card className="border-orange-100">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-linear-to-br from-orange-100 to-amber-100 flex items-center justify-center">
              <History className="h-5 w-5 text-orange-600" />
            </div>
            <CardTitle className="text-xl">Transaksi Terakhir</CardTitle>
          </div>
          <Link href="/dashboard/transactions">
            <Button variant="ghost" size="sm" className="gap-2 text-orange-600 hover:text-orange-700 hover:bg-orange-50">
              Lihat Semua <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          {transactionsLoading ? (
            <TransactionSkeleton />
          ) : (
            <TransactionList transactions={transactionsData?.results.slice(0, 5) || []} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
