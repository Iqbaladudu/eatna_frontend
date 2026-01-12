// API Types for Eatna
// Generated from OpenAPI schema

// Auth
export interface CustomerLoginRequest {
  email: string;
  password: string;
}

export interface CustomerRegistrationRequest {
  email?: string;
  password: string;
  password2: string;
  full_name: string;
  phone: string;
  zone_id: number;
}

export interface CustomerProfile {
  id: number;
  email: string;
  full_name: string;
  phone: string;
  balance: string;
  zone_id: number;
  zone_name: string;
  zone_city: string;
  created_at: string;
  updated_at: string;
}

export interface CustomerBalance {
  balance: string;
}

// Token
export interface TokenObtainPair {
  access: string;
  refresh: string;
}

export interface TokenRefresh {
  access: string;
}

// Zone
export interface Zone {
  id: number;
  name: string;
  city: string;
  is_active: boolean;
}

export interface PaginatedZoneList {
  count: number;
  next: string | null;
  previous: string | null;
  results: Zone[];
}

// Merchant
export interface MerchantList {
  id: number;
  name: string;
  phone: string | null;
  zone_name: string;
  is_active: boolean;
}

export interface PaginatedMerchantListList {
  count: number;
  next: string | null;
  previous: string | null;
  results: MerchantList[];
}

// Voucher
export type VoucherStatus = 'active' | 'used';

export interface Voucher {
  id: number;
  code: string;
  amount: string;
  status: VoucherStatus;
  created_at: string;
  used_at: string | null;
  user_name: string;
  user_phone: string;
}

export interface VoucherCreateRequest {
  amount: string;
}

export interface PaginatedVoucherList {
  count: number;
  next: string | null;
  previous: string | null;
  results: Voucher[];
}

// Transaction
export type TransactionType = 'topup' | 'purchase' | 'redemption';
export type TransactionStatus = 'capture' | 'settlement' | 'pending' | 'deny' | 'cancel' | 'expire';

export interface Transaction {
  id: number;
  amount: string;
  type: TransactionType;
  status: TransactionStatus;
  reference: string | null;
  created_at: string;
  merchant_name: string;
  voucher_code: string;
}

export interface PaginatedTransactionList {
  count: number;
  next: string | null;
  previous: string | null;
  results: Transaction[];
}

// Topup
export interface TopupCreateRequest {
  amount: string;
}

export interface TopupResponse {
  transaction_id: number;
  payment_url: string;
  amount: string;
}

// Auth Response (with tokens)
export interface AuthResponse extends CustomerProfile {
  tokens: TokenObtainPair;
}

// Merchant Types
export interface MerchantLoginRequest {
  email: string;
  password: string;
}

export interface MerchantProfile {
  id: number;
  name: string;
  phone: string | null;
  zone_id: number;
  zone_name: string;
  is_active: boolean;
}

export interface MerchantLoginResponse {
  merchant: MerchantProfile;
  tokens: TokenObtainPair;
  message: string;
}

export interface MerchantStats {
  total_today: string;
  count_today: number;
  date: string;
}

export interface MerchantTransaction {
  id: number;
  amount: string;
  voucher_code: string;
  user_name: string;
  created_at: string;
}

export interface VoucherValidationRequest {
  voucher_code: string;
}

export interface VoucherValidationResponse {
  voucher_code: string;
  amount: string;
  status: VoucherStatus;
  user_name: string;
  user_phone: string;
}

export interface RedemptionRequest {
  voucher_code: string;
  amount: string;
}

export interface RedemptionResponse {
  transaction_id: number;
  voucher_code: string;
  redeemed_amount: string;
  merchant_name: string;
  message: string;
}
