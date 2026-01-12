'use client';

import { useState } from 'react';
import { Loader2, ExternalLink } from 'lucide-react';
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
import { BalanceCard } from '@/components/dashboard';
import { useCreateTopup } from '@/lib/api';
import { toast } from 'sonner';

const presetAmounts = [50000, 100000, 200000, 500000];

export default function TopupPage() {
  const [amount, setAmount] = useState('');
  const createTopup = useCreateTopup();

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const handleTopup = () => {
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount < 10000) {
      toast.error('Minimal top up Rp10.000');
      return;
    }

    createTopup.mutate(
      { amount: numAmount.toString() },
      {
        onSuccess: (data) => {
          toast.success('Redirecting ke halaman pembayaran...');
          window.open(data.payment_url, '_blank');
        },
        onError: () => {
          toast.error('Gagal membuat permintaan top up');
        },
      }
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Top Up Saldo</h1>
        <p className="text-muted-foreground">Isi saldo untuk membeli voucher</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <BalanceCard />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Tambah Saldo</CardTitle>
            <CardDescription>Pilih atau masukkan nominal top up</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-2">
              {presetAmounts.map((preset) => (
                <Button
                  key={preset}
                  variant={amount === preset.toString() ? 'default' : 'outline'}
                  onClick={() => setAmount(preset.toString())}
                  className="h-12"
                >
                  {formatCurrency(preset)}
                </Button>
              ))}
            </div>

            <div className="space-y-2">
              <Label htmlFor="custom-amount">Nominal lainnya (min. Rp10.000)</Label>
              <Input
                id="custom-amount"
                type="number"
                placeholder="Contoh: 75000"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>

            <Button
              onClick={handleTopup}
              disabled={createTopup.isPending || !amount}
              className="w-full gap-2"
              size="lg"
            >
              {createTopup.isPending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <ExternalLink className="h-4 w-4" />
              )}
              Top Up Sekarang
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
