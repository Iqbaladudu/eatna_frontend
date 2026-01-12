'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TransactionList, TransactionSkeleton } from '@/components/dashboard';
import { useTransactions } from '@/lib/api';

export default function TransactionsPage() {
  const { data, isLoading } = useTransactions(50);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Transaksi</h1>
        <p className="text-muted-foreground">Riwayat semua transaksi Anda</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Riwayat Transaksi</CardTitle>
          <CardDescription>
            Total {data?.count || 0} transaksi
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <TransactionSkeleton />
          ) : (
            <TransactionList transactions={data?.results || []} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
