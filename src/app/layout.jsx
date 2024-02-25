import { Providers } from "src/providers";

export const metadata = {
    title: "UNIC",
    description: "Baked by Richard Pickman",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
