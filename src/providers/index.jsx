"use client";

import { CacheProvider } from "@emotion/react";
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
import { createEmotionCache } from "src/core/utils/create-emotion-cache";

const clientSideEmotionCache = createEmotionCache();

const Guard = ({ children, authGuard, guestGuard }) => {
    if (guestGuard) {
        return <GuestGuard fallback={<Spinner />}>{children}</GuestGuard>;
    }

    if (!guestGuard && !authGuard) {
        return <>{children}</>;
    }

    return <AuthGuard fallback={<Spinner />}>{children}</AuthGuard>;
};

export const Providers = ({ children }) => {
    const emotionCache = clientSideEmotionCache;
    const authGuard = false;
    const guestGuard = true;
    const aclAbilities = defaultACLObj;

    return (
        <CacheProvider value={emotionCache}>
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
        </CacheProvider>
    );
};
