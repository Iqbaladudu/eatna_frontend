'use client';

import { ArrowUpRight, ArrowDownLeft, Ticket } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import type { Transaction, TransactionType, TransactionStatus } from '@/lib/types';

interface TransactionListProps {
  transactions: Transaction[];
}

const typeConfig: Record<TransactionType, { label: string; icon: React.ReactNode; color: string }> =
  {
    topup: {
      label: 'Top Up',
      icon: <ArrowDownLeft className="h-4 w-4" />,
      color: 'text-green-600',
    },
    purchase: {
      label: 'Beli Voucher',
      icon: <Ticket className="h-4 w-4" />,
      color: 'text-blue-600',
    },
    redemption: {
      label: 'Penukaran',
      icon: <ArrowUpRight className="h-4 w-4" />,
      color: 'text-orange-600',
    },
  };

const statusConfig: Record<TransactionStatus, { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline' }> = {
  settlement: { label: 'Selesai', variant: 'default' },
  capture: { label: 'Diproses', variant: 'secondary' },
  pending: { label: 'Menunggu', variant: 'outline' },
  deny: { label: 'Ditolak', variant: 'destructive' },
  cancel: { label: 'Dibatalkan', variant: 'destructive' },
  expire: { label: 'Kadaluarsa', variant: 'secondary' },
};

export function TransactionList({ transactions }: TransactionListProps) {
  const formatCurrency = (value: string) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(parseFloat(value));
  };

  const formatDate = (date: string) => {
    return new Intl.DateTimeFormat('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(date));
  };

  if (transactions.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        Belum ada transaksi
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {transactions.map((tx) => {
        const config = typeConfig[tx.type];
        const status = statusConfig[tx.status] || { label: 'Unknown', variant: 'secondary' as const };

        return (
          <div
            key={tx.id}
            className="flex items-center justify-between p-4 rounded-lg border bg-card transition-colors hover:bg-muted/50"
          >
            <div className="flex items-center gap-3">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full bg-muted ${config?.color || 'text-gray-600'}`}
              >
                {config?.icon || <ArrowUpRight className="h-4 w-4" />}
              </div>
              <div>
                <p className="font-medium">{config?.label || 'Transaction'}</p>
                <p className="text-sm text-muted-foreground">{formatDate(tx.created_at)}</p>
              </div>
            </div>
            <div className="text-right">
              <p
                className={`font-semibold ${
                  tx.type === 'topup' ? 'text-green-600' : ''
                }`}
              >
                {tx.type === 'topup' ? '+' : '-'}
                {formatCurrency(tx.amount)}
              </p>
              <Badge variant={status.variant} className="text-xs">
                {status.label}
              </Badge>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function TransactionSkeleton() {
  return (
    <div className="space-y-3">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="flex items-center justify-between p-4 rounded-lg border">
          <div className="flex items-center gap-3">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div>
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-3 w-32 mt-1" />
            </div>
          </div>
          <div className="text-right">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-5 w-16 mt-1" />
          </div>
        </div>
      ))}
    </div>
  );
}
