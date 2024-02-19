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
import { useAuth } from 'src/hooks/useAuth';

// ** Util Import
import getHomeRoute from 'src/layouts/components/acl/getHomeRoute';

const AclGuard = props => {
  // ** Props
  const { aclAbilities, children, guestGuard = true, authGuard = true } = props

  // ** Hooks
  const auth = useAuth()
  const router = useRouter()

  // ** Vars
  let ability

  useEffect(() => {
    if (auth.user && auth.user.role && !guestGuard && router.route === '/') {
      console.log('first if')
      const homeRoute = getHomeRoute(auth.user.role)
      router.push(homeRoute)
    }
  }, [auth.user, guestGuard, router])

  if (auth.user && !ability) {
    console.log('second if')

    ability = buildAbilityFor(auth.user.role, aclAbilities.subject)
    if (router.route === '/') {
      return <Spinner />
    }
  }

  if (guestGuard || router.route === '/404' || router.route === '/500' || !authGuard) {
    console.log('third if')
    if (auth.user && ability) {
      return <AbilityContext.Provider value={ability}>{children}</AbilityContext.Provider>
    } else {
      return children
    }
  }

  if (ability && auth.user && ability.can(aclAbilities.action, aclAbilities.subject)) {
    console.log('fourth if')
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
