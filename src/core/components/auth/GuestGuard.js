'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const GuestGuard = props => {
  const { children } = props
  const router = useRouter();

  useEffect(() => {
    if (window.localStorage.getItem('userData')) {
      router.push('/')
    }
  }, [router])

  return <>{children}</>
}

export default GuestGuard
