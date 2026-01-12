'use client';

import { Ticket } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import type { Voucher } from '@/lib/types';

interface VoucherCardProps {
  voucher: Voucher;
}

export function VoucherCard({ voucher }: VoucherCardProps) {
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
    }).format(new Date(date));
  };

  return (
    <Card className="relative overflow-hidden transition-all hover:shadow-md">
      <div className="absolute top-0 right-0 w-24 h-24 -mr-8 -mt-8 bg-primary/5 rounded-full" />
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
            <Ticket className="h-4 w-4 text-primary" />
          </div>
          <div>
            <CardTitle className="text-lg font-bold">{formatCurrency(voucher.amount)}</CardTitle>
            <p className="text-xs text-muted-foreground font-mono">{voucher.code}</p>
          </div>
        </div>
        <Badge variant={voucher.status === 'active' ? 'default' : 'secondary'}>
          {voucher.status === 'active' ? 'Aktif' : 'Digunakan'}
        </Badge>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>Dibuat: {formatDate(voucher.created_at)}</span>
          {voucher.used_at && <span>Digunakan: {formatDate(voucher.used_at)}</span>}
        </div>
      </CardContent>
    </Card>
  );
}

export function VoucherCardSkeleton() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
        <div className="flex items-center gap-2">
          <Skeleton className="h-8 w-8 rounded-full" />
          <div>
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-3 w-16 mt-1" />
          </div>
        </div>
        <Skeleton className="h-5 w-14" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-4 w-32" />
      </CardContent>
    </Card>
  );
}
