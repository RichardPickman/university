'use client'

import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuth } from 'src/hooks/useAuth';

const AuthGuard = props => {
  const { children } = props
  const auth = useAuth();
  const router = useRouter();
  const path = usePathname();

  useEffect(() => {
    if (auth.user === null && !window.localStorage.getItem('userData')) {
      const isAuth = [
        path === '/login/',
        path === '/register/',
        path === '/verify-email/',
        path === '/forgot-password/',
      ].some(Boolean);

      if (!isAuth) {
        router.push('/login')
      }
    }
  }, [auth.user, path, router])

  return <>{children}</>
}

export default AuthGuard
