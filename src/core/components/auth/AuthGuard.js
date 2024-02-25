'use client'

import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useUserStore } from 'src/store/userStore';

const AuthGuard = props => {
  const { children } = props
  const user = useUserStore().getState().user;
  const router = useRouter();
  const path = usePathname();

  useEffect(() => {
    const isAuth = [
      path === '/login/',
      path === '/register/',
      path === '/verify-email/',
      path === '/forgot-password/',
    ]

    if (user) {
      isAuth.some(Boolean);

      if (isAuth) {
        router.push('/dashboard')
      }
    }

    if (user === null && !window.localStorage.getItem('userData')) {
      isAuth.some(Boolean);

      if (!isAuth) {
        router.push('/login')
      }
    }
  }, [user, path, router])

  return <>{children}</>
}

export default AuthGuard
