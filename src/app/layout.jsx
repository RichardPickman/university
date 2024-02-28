import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { Providers } from "src/providers";

export const metadata = {
    title: "UNIC",
    description: "Baked by Richard Pickman",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <AppRouterCacheProvider options={{ key: "css" }}>
                    <Providers>{children}</Providers>
                </AppRouterCacheProvider>
            </body>
        </html>
    );
}
