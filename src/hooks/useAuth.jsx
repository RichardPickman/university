'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useUserStore } from 'src/store/userStore';

export const useAuth = () => {
    const auth = useUserStore().getState();
    const router = useRouter();
    const params = useSearchParams();

    const handleLogin = (data, errorCallback) =>
        auth
            .login(data)
            .then(() => {
                const returnUrl = params.get('returnUrl')

                router.push(returnUrl ? returnUrl : '/')
            })
            .catch((err) => errorCallback && errorCallback({ error: err.response.data.error }))

    const handleRegister = (data, errorCallback) =>
        auth
            .register(data)
            .then(() => {
                const url = new URL("http://localhost:3000" + '/verify-email');

                url.searchParams.set('email', encodeURI(data.email));

                router.push(url.href);
            })
            .catch((err) => errorCallback && errorCallback({ error: err.response.data.error }))

    const handleLogout = () => {
        auth.logout();

        router.push('/login')
    }

    const handleForgotMyPassword = (data, errorCallback) => {
        auth
            .forgotMyPassword(data)
            .then(() => {
                const returnUrl = params.get('returnUrl')

                router.push(returnUrl ? returnUrl : '/')
            })
            .catch((err) => errorCallback && errorCallback({ error: err.response.data.error }))
    }

    return {
        ...auth,
        login: handleLogin,
        register: handleRegister,
        logout: handleLogout,
        forgotMyPassword: handleForgotMyPassword,
    };
}
