import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // API Proxy Logic for BFF Pattern
  // This intercepts calls to /api/proxy/* and forwards them to the Django backend
  // checking for the HTTP-only cookie and injecting it as a Bearer token
  if (pathname.startsWith('/api/proxy/')) {
    const access_token = request.cookies.get('access_token')?.value;
    
    // Target URL: http://localhost:8000/api/...
    // Remove /api/proxy prefix and prepend backend URL
    const targetPath = pathname.replace('/api/proxy', '/api');
    const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
    const url = new URL(targetPath, backendUrl);
    url.search = request.nextUrl.search;
    
    const requestHeaders = new Headers(request.headers);
    if (access_token) {
      requestHeaders.set('Authorization', `Bearer ${access_token}`);
    }
    
    return NextResponse.rewrite(url, {
      request: {
        headers: requestHeaders,
      },
    });
  }

  // Protect Merchant Routes
  if (pathname.startsWith('/merchant')) {
    // Exclude login page
    if (pathname === '/merchant-login') return NextResponse.next();
    
    const merchantToken = request.cookies.get('access_token');
    if (!merchantToken) {
       const url = request.nextUrl.clone();
       url.pathname = '/merchant-login';
       return NextResponse.redirect(url);
    }
  }
  
  // Protect Customer Routes
  if (pathname.startsWith('/dashboard')) {
    const customerToken = request.cookies.get('access_token');
    if (!customerToken) {
       const url = request.nextUrl.clone();
       url.pathname = '/login';
       return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*', 
    '/merchant/:path*',
    '/api/proxy/:path*'
  ],
};
