'use client';

// ** React Imports
import { useEffect } from 'react';

// ** Next Import
import { useRouter } from 'next/navigation';

// ** Context Imports
import { AbilityContext } from 'src/layouts/components/acl/Can';

// ** Config Import
import { buildAbilityFor } from 'src/configs/acl';

// ** Component Import
import NotAuthorized from 'src/app/401';
import Spinner from 'src/core/components/spinner';
import BlankLayout from 'src/core/layouts/BlankLayout';

// ** Hooks

// ** Util Import
import getHomeRoute from 'src/layouts/components/acl/getHomeRoute';
import { useUserStore } from 'src/store/userStore';

const AclGuard = props => {
  const { aclAbilities, children, guestGuard = true, authGuard = false } = props

  const auth = useUserStore().getState();
  const router = useRouter()

  let ability

  useEffect(() => {
    if (auth.user && auth.user.role && !guestGuard && router.route === '/') {
      const homeRoute = getHomeRoute(auth.user.role)

      router.push(homeRoute)
    }
  }, [auth.user, guestGuard, router])

  if (auth.user && !ability) {
    ability = buildAbilityFor(auth.user.role, aclAbilities.subject)
    if (router.route === '/') {
      return <Spinner />
    }
  }

  if (guestGuard || router.route === '/404' || router.route === '/500' || !authGuard) {
    if (auth.user && ability) {
      return <AbilityContext.Provider value={ability}>{children}</AbilityContext.Provider>
    } else {
      return children
    }
  }

  if (ability && auth.user && ability.can(aclAbilities.action, aclAbilities.subject)) {
    if (router.route === '/') {
      return <Spinner />
    }

    return <AbilityContext.Provider value={ability}>{children}</AbilityContext.Provider>
  }

  return (
    <BlankLayout>
      <NotAuthorized />
    </BlankLayout>
  )
}

export default AclGuard
