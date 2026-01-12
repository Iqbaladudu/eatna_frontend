'use client';

import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { Store, LogOut, Menu, QrCode, LayoutDashboard, Receipt } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useMerchantProfile, useMerchantLogout } from '@/lib/api';
import { useState } from 'react';
import { cn } from '@/lib/utils';

export function MerchantNavbar() {
  const { data: profile } = useMerchantProfile();
  const logout = useMerchantLogout();
  const router = useRouter();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout.mutate(undefined, {
      onSuccess: () => router.push('/merchant-login'),
    });
  };

  const initials = profile?.name
    ?.split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2) || 'M';

  const navLinks = [
    { href: '/merchant', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/merchant/claim', label: 'Claim Voucher', icon: QrCode },
    { href: '/merchant/transactions', label: 'Transaksi', icon: Receipt },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-gradient-to-r from-orange-500 to-amber-600 text-white">
      <div className="container flex h-16 items-center justify-between px-4">
        <Link href="/merchant" className="flex items-center gap-2 font-semibold">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/20 backdrop-blur">
            <Store className="h-4 w-4" />
          </div>
          <span className="hidden sm:inline-block">Eatna Merchant</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-white/80 flex items-center gap-1.5",
                pathname === link.href ? "text-white" : "text-white/70"
              )}
            >
              <link.icon className="h-4 w-4" />
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-white hover:bg-white/20"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="h-5 w-5" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-9 w-9 rounded-full hover:bg-white/20">
                <Avatar className="h-9 w-9">
                  <AvatarFallback className="bg-white text-orange-600 font-semibold">
                    {initials}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <div className="flex flex-col space-y-1 p-2">
                <p className="text-sm font-medium">{profile?.name}</p>
                <p className="text-xs text-muted-foreground">{profile?.zone_name}</p>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-destructive">
                <LogOut className="mr-2 h-4 w-4" />
                Keluar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-white/20 bg-orange-600 p-4">
          <nav className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-3 py-2 text-sm font-medium rounded-md flex items-center gap-2",
                  pathname === link.href 
                    ? "bg-white/20 text-white" 
                    : "text-white/80 hover:bg-white/10"
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                <link.icon className="h-4 w-4" />
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
