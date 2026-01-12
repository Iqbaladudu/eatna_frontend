'use client';

import { useState } from 'react';
import { Plus, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { VoucherCard, VoucherCardSkeleton } from '@/components/dashboard';
import { useVouchers, useCreateVoucher, useBalance } from '@/lib/api';
import { toast } from 'sonner';

const presetAmounts = [10000, 25000, 50000, 100000];

export default function VouchersPage() {
  const [amount, setAmount] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const { data: vouchersData, isLoading } = useVouchers(20);
  const { data: balance } = useBalance();
  const createVoucher = useCreateVoucher();

  const formatCurrency = (value: number | string) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(typeof value === 'string' ? parseFloat(value) : value);
  };

  const handleCreate = () => {
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      toast.error('Masukkan nominal yang valid');
      return;
    }

    if (numAmount > parseFloat(balance?.balance || '0')) {
      toast.error('Saldo tidak mencukupi');
      return;
    }

    createVoucher.mutate(
      { amount: numAmount.toString() },
      {
        onSuccess: (data) => {
          toast.success(`Voucher ${data.code} berhasil dibuat!`);
          setAmount('');
          setDialogOpen(false);
        },
        onError: () => {
          toast.error('Gagal membuat voucher');
        },
      }
    );
  };

  const activeVouchers = vouchersData?.results.filter((v) => v.status === 'active') || [];
  const usedVouchers = vouchersData?.results.filter((v) => v.status === 'used') || [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Voucher</h1>
          <p className="text-muted-foreground">Kelola voucher digital Anda</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Beli Voucher
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Beli Voucher Baru</DialogTitle>
              <DialogDescription>
                Saldo tersedia: {formatCurrency(balance?.balance || '0')}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Pilih Nominal</Label>
                <div className="grid grid-cols-2 gap-2">
                  {presetAmounts.map((preset) => (
                    <Button
                      key={preset}
                      variant={amount === preset.toString() ? 'default' : 'outline'}
                      onClick={() => setAmount(preset.toString())}
                      disabled={preset > parseFloat(balance?.balance || '0')}
                    >
                      {formatCurrency(preset)}
                    </Button>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="custom-amount">Atau masukkan nominal</Label>
                <Input
                  id="custom-amount"
                  type="number"
                  placeholder="Contoh: 75000"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogOpen(false)}>
                Batal
              </Button>
              <Button onClick={handleCreate} disabled={createVoucher.isPending || !amount}>
                {createVoucher.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Beli Voucher
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Active Vouchers */}
      <Card>
        <CardHeader>
          <CardTitle>Voucher Aktif ({activeVouchers.length})</CardTitle>
          <CardDescription>Voucher yang siap digunakan</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {[...Array(3)].map((_, i) => (
                <VoucherCardSkeleton key={i} />
              ))}
            </div>
          ) : activeVouchers.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {activeVouchers.map((voucher) => (
                <VoucherCard key={voucher.id} voucher={voucher} />
              ))}
            </div>
          ) : (
            <p className="text-center py-8 text-muted-foreground">
              Belum ada voucher aktif
            </p>
          )}
        </CardContent>
      </Card>

      {/* Used Vouchers */}
      {usedVouchers.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Riwayat Voucher ({usedVouchers.length})</CardTitle>
            <CardDescription>Voucher yang sudah digunakan</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {usedVouchers.map((voucher) => (
                <VoucherCard key={voucher.id} voucher={voucher} />
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
