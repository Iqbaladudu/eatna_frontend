'use client';

import { useState } from 'react';
import { Search, CheckCircle2, XCircle, Loader2, User, Phone, Ticket, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useValidateVoucher, useRedeemVoucher } from '@/lib/api';
import type { VoucherValidationResponse } from '@/lib/types';
import { toast } from 'sonner';

function formatCurrency(amount: string) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(parseFloat(amount));
}

type ClaimStep = 'input' | 'validated' | 'success';

export default function ClaimVoucherPage() {
  const [step, setStep] = useState<ClaimStep>('input');
  const [voucherCode, setVoucherCode] = useState('');
  const [redeemAmount, setRedeemAmount] = useState('');
  const [validatedVoucher, setValidatedVoucher] = useState<VoucherValidationResponse | null>(null);
  const [redemptionResult, setRedemptionResult] = useState<{
    transactionId: number;
    amount: string;
    merchantName: string;
  } | null>(null);

  const validateVoucher = useValidateVoucher();
  const redeemVoucher = useRedeemVoucher();

  const handleValidate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!voucherCode.trim()) {
      toast.error('Masukkan kode voucher');
      return;
    }

    validateVoucher.mutate(
      { voucher_code: voucherCode.trim().toUpperCase() },
      {
        onSuccess: (data) => {
          setValidatedVoucher(data);
          setRedeemAmount(data.amount);
          setStep('validated');
          toast.success('Voucher valid!');
        },
        onError: (error: Error & { response?: { data?: { error?: string } } }) => {
          toast.error(error.response?.data?.error || 'Voucher tidak valid');
        },
      }
    );
  };

  const handleRedeem = async () => {
    if (!validatedVoucher || !redeemAmount) return;

    const amount = parseFloat(redeemAmount);
    const maxAmount = parseFloat(validatedVoucher.amount);

    if (amount <= 0) {
      toast.error('Jumlah harus lebih dari 0');
      return;
    }

    if (amount > maxAmount) {
      toast.error(`Jumlah melebihi saldo voucher (${formatCurrency(validatedVoucher.amount)})`);
      return;
    }

    redeemVoucher.mutate(
      { 
        voucher_code: validatedVoucher.voucher_code, 
        amount: redeemAmount 
      },
      {
        onSuccess: (data) => {
          setRedemptionResult({
            transactionId: data.transaction_id,
            amount: data.redeemed_amount,
            merchantName: data.merchant_name,
          });
          setStep('success');
          toast.success('Voucher berhasil diklaim!');
        },
        onError: (error: Error & { response?: { data?: { error?: string } } }) => {
          toast.error(error.response?.data?.error || 'Gagal mengklaim voucher');
        },
      }
    );
  };

  const handleReset = () => {
    setStep('input');
    setVoucherCode('');
    setRedeemAmount('');
    setValidatedVoucher(null);
    setRedemptionResult(null);
  };

  return (
    <div className="max-w-lg mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Claim Voucher</h1>
        <p className="text-muted-foreground">
          Masukkan kode voucher customer untuk mengklaim pembayaran
        </p>
      </div>

      {/* Step 1: Input Voucher Code */}
      {step === 'input' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Ticket className="h-5 w-5" />
              Kode Voucher
            </CardTitle>
            <CardDescription>
              Minta customer untuk menunjukkan kode voucher mereka
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleValidate} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="voucher-code">Kode Voucher</Label>
                <Input
                  id="voucher-code"
                  placeholder="Masukkan kode voucher..."
                  value={voucherCode}
                  onChange={(e) => setVoucherCode(e.target.value.toUpperCase())}
                  className="font-mono text-lg tracking-wider"
                  disabled={validateVoucher.isPending}
                  autoComplete="off"
                  autoFocus
                />
              </div>
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700"
                disabled={validateVoucher.isPending}
              >
                {validateVoucher.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Memvalidasi...
                  </>
                ) : (
                  <>
                    <Search className="mr-2 h-4 w-4" />
                    Validasi Voucher
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Step 2: Validated - Show Details & Confirm */}
      {step === 'validated' && validatedVoucher && (
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-green-600">
                <CheckCircle2 className="h-5 w-5" />
                Voucher Valid
              </CardTitle>
              <Badge variant="secondary" className="bg-green-100 text-green-700">
                {validatedVoucher.status}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Voucher Details */}
            <div className="bg-muted/50 rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Kode Voucher</span>
                <span className="font-mono font-semibold">{validatedVoucher.voucher_code}</span>
              </div>
              <Separator />
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span>{validatedVoucher.user_name}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{validatedVoucher.user_phone}</span>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Saldo Voucher</span>
                <span className="text-2xl font-bold text-green-600">
                  {formatCurrency(validatedVoucher.amount)}
                </span>
              </div>
            </div>

            {/* Redeem Amount Input */}
            <div className="space-y-2">
              <Label htmlFor="redeem-amount">Jumlah yang Diklaim</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">Rp</span>
                <Input
                  id="redeem-amount"
                  type="number"
                  placeholder="50000"
                  value={redeemAmount}
                  onChange={(e) => setRedeemAmount(e.target.value)}
                  className="pl-10 text-lg"
                  max={parseFloat(validatedVoucher.amount)}
                  min={1}
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Maksimal: {formatCurrency(validatedVoucher.amount)}
              </p>
            </div>

            {/* Alert for partial redemption */}
            {redeemAmount && parseFloat(redeemAmount) < parseFloat(validatedVoucher.amount) && (
              <div className="flex items-start gap-2 p-3 bg-amber-50 text-amber-800 rounded-lg text-sm">
                <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <p>
                  Sisa saldo voucher ({formatCurrency(String(parseFloat(validatedVoucher.amount) - parseFloat(redeemAmount)))}) 
                  akan tetap tersedia untuk customer.
                </p>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-3 pt-2">
              <Button 
                variant="outline" 
                onClick={handleReset}
                className="flex-1"
                disabled={redeemVoucher.isPending}
              >
                Batal
              </Button>
              <Button 
                onClick={handleRedeem}
                className="flex-1 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700"
                disabled={redeemVoucher.isPending || !redeemAmount || parseFloat(redeemAmount) <= 0}
              >
                {redeemVoucher.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Memproses...
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="mr-2 h-4 w-4" />
                    Konfirmasi Klaim
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 3: Success */}
      {step === 'success' && redemptionResult && (
        <Card className="border-green-200 bg-green-50">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
                  <CheckCircle2 className="h-10 w-10 text-green-600" />
                </div>
              </div>
              <div>
                <h2 className="text-xl font-bold text-green-800">Voucher Berhasil Diklaim!</h2>
                <p className="text-green-600">Transaksi #{redemptionResult.transactionId}</p>
              </div>
              <div className="py-4">
                <p className="text-sm text-green-700">Jumlah Diklaim</p>
                <p className="text-3xl font-bold text-green-800">
                  {formatCurrency(redemptionResult.amount)}
                </p>
              </div>
              <Separator className="bg-green-200" />
              <p className="text-sm text-green-700">
                Merchant: {redemptionResult.merchantName}
              </p>
              <Button 
                onClick={handleReset}
                className="w-full mt-4 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700"
              >
                Klaim Voucher Lainnya
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
