'use client';

// ** React Imports
import { useEffect } from 'react';

// ** Next Import
import { useRouter } from 'next/navigation';

// ** Hooks Import
import { useAuth } from 'src/hooks/useAuth';

const AuthGuard = props => {
  const { children } = props
  const auth = useAuth()
  const router = useRouter()

  useEffect(
    () => {
      if (!router.isReady) {
        return;
      }
      if (auth.user === null && !window.localStorage.getItem('userData')) {
        router.push('/login')
      }
    },
    [auth.user, router]
  )

  return <>{children}</>
}

export default AuthGuard
