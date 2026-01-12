'use client';

import { useState } from 'react';
import { Calendar, Receipt } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { useMerchantTransactions } from '@/lib/api';

function formatCurrency(amount: string) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(parseFloat(amount));
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

function formatTime(dateString: string) {
  return new Date(dateString).toLocaleTimeString('id-ID', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

export default function MerchantTransactionsPage() {
  const today = new Date().toISOString().split('T')[0];
  const [selectedDate, setSelectedDate] = useState(today);
  
  const { data: transactions, isLoading } = useMerchantTransactions(selectedDate);

  // Calculate totals
  const totalAmount = transactions?.reduce((sum, tx) => sum + parseFloat(tx.amount), 0) || 0;
  const totalCount = transactions?.length || 0;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Riwayat Transaksi</h1>
          <p className="text-muted-foreground">
            Daftar voucher yang telah diklaim
          </p>
        </div>
        
        {/* Date Filter */}
        <div className="flex items-center gap-2">
          <Label htmlFor="date" className="sr-only">Tanggal</Label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="date"
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="pl-10 w-auto"
            />
          </div>
        </div>
      </div>

      {/* Summary Card */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="bg-gradient-to-br from-orange-500 to-amber-600 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-white/90">Total Transaksi</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{formatCurrency(String(totalAmount))}</div>
            <p className="text-xs text-white/80">{formatDate(selectedDate)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Jumlah Voucher</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalCount}</div>
            <p className="text-xs text-muted-foreground">voucher diklaim</p>
          </CardContent>
        </Card>
      </div>

      {/* Transactions List */}
      <Card>
        <CardHeader>
          <CardTitle>Daftar Transaksi</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-3">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-center justify-between py-3 border-b">
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3 w-48" />
                  </div>
                  <Skeleton className="h-6 w-24" />
                </div>
              ))}
            </div>
          ) : transactions && transactions.length > 0 ? (
            <div className="space-y-1">
              {transactions.map((tx, idx) => (
                <div 
                  key={tx.id} 
                  className="flex items-center justify-between py-4 border-b last:border-0"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-600 font-semibold text-sm">
                      #{idx + 1}
                    </div>
                    <div>
                      <p className="font-medium">{tx.user_name}</p>
                      <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                        <Badge variant="outline" className="font-mono text-xs">
                          {tx.voucher_code}
                        </Badge>
                        <span>{formatTime(tx.created_at)}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-semibold text-green-600 text-lg">
                      +{formatCurrency(tx.amount)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              <Receipt className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p className="font-medium">Belum ada transaksi</p>
              <p className="text-sm">pada {formatDate(selectedDate)}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
