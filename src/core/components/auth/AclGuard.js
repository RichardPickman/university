'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import NotAuthorized from 'src/app/401';
import { buildAbilityFor } from 'src/configs/acl';
import Spinner from 'src/core/components/spinner';
import BlankLayout from 'src/core/layouts/BlankLayout';
import { AbilityContext } from 'src/layouts/components/acl/Can';

// ** Hooks

// ** Util Import
import { useStore } from 'src/hooks/useStore';
import getHomeRoute from 'src/layouts/components/acl/getHomeRoute';
import { userStore } from 'src/store/userStore';

const AclGuard = props => {
  const { aclAbilities, children, guestGuard = true, authGuard = false } = props

  const user = useStore(userStore, (state) => state.user);
  const router = useRouter()

  let ability

  useEffect(() => {
    if (user && user.role && !guestGuard && router.route === '/') {
      const homeRoute = getHomeRoute(user.role)

      router.push(homeRoute)
    }
  }, [user, guestGuard, router])

  if (user && !ability) {
    ability = buildAbilityFor(user.role, aclAbilities.subject)
    if (router.route === '/') {
      return <Spinner />
    }
  }

  if (guestGuard || router.route === '/404' || router.route === '/500' || !authGuard) {
    if (user && ability) {
      return <AbilityContext.Provider value={ability}>{children}</AbilityContext.Provider>
    } else {
      return children
    }
  }

  if (ability && user && ability.can(aclAbilities.action, aclAbilities.subject)) {
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
