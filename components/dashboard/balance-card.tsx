'use client';

import { Wallet } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useBalance } from '@/lib/api';

export function BalanceCard() {
  const { data, isLoading } = useBalance();

  const formatCurrency = (value: string) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(parseFloat(value));
  };

  return (
    <Card className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium opacity-90">Saldo Anda</CardTitle>
        <Wallet className="h-5 w-5 opacity-90" />
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Skeleton className="h-9 w-32 bg-primary-foreground/20" />
        ) : (
          <div className="text-3xl font-bold">{formatCurrency(data?.balance || '0')}</div>
        )}
        <p className="text-xs opacity-75 mt-1">Tersedia untuk belanja</p>
      </CardContent>
    </Card>
  );
}
