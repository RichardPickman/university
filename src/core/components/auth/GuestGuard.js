'use client';

'use client';

// ** React Imports
import { useEffect } from 'react';

// ** Next Import
import { useRouter } from 'next/navigation';

// ** Hooks Import
import { useUserStore } from 'src/store/userStore';

const GuestGuard = props => {
  const { children, fallback } = props
  const auth = useUserStore().getState();
  const router = useRouter()

  useEffect(() => {
    if (!router.isReady) {
      return
    }
    if (window.localStorage.getItem('userData')) {
      router.push('/')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.route])

  if (auth.loading || (!auth.loading && auth.user !== null)) {
    return fallback
  }

  return <>{children}</>
}

export default GuestGuard
