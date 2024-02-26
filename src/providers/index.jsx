"use client";

import { Suspense } from "react";
import { Toaster } from "react-hot-toast";
import { defaultACLObj } from "src/configs/acl";
import AclGuard from "src/core/components/auth/AclGuard";
import AuthGuard from "src/core/components/auth/AuthGuard";
import GuestGuard from "src/core/components/auth/GuestGuard";
import Spinner from "src/core/components/spinner";
import {
    SettingsConsumer,
    SettingsProvider,
} from "src/core/context/settingsContext";
import ReactHotToast from "src/core/styles/libs/react-hot-toast";
import ThemeComponent from "src/core/theme/ThemeComponent";

const Guard = ({ children, authGuard, guestGuard }) => {
    if (guestGuard) {
        return <GuestGuard fallback={<Spinner />}>{children}</GuestGuard>;
    }

    if (authGuard) {
        return <AuthGuard fallback={<Spinner />}>{children}</AuthGuard>;
    }

    return <>{children}</>;
};

export const Providers = ({ children }) => {
    const authGuard = false;
    const guestGuard = true;
    const aclAbilities = defaultACLObj;

    return (
        <Suspense fallback={<Spinner />}>
            <SettingsProvider>
                <SettingsConsumer>
                    {({ settings }) => {
                        return (
                            <ThemeComponent settings={settings}>
                                <Guard
                                    authGuard={authGuard}
                                    guestGuard={guestGuard}
                                >
                                    <AclGuard
                                        aclAbilities={aclAbilities}
                                        guestGuard={guestGuard}
                                        authGuard={authGuard}
                                    >
                                        {children}
                                    </AclGuard>
                                </Guard>
                                <ReactHotToast>
                                    <Toaster
                                        position={settings.toastPosition}
                                        toastOptions={{
                                            className: "react-hot-toast",
                                        }}
                                    />
                                </ReactHotToast>
                            </ThemeComponent>
                        );
                    }}
                </SettingsConsumer>
            </SettingsProvider>
        </Suspense>
    );
};
