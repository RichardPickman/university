import AclGuard from "src/core/components/auth/AclGuard"
import AuthGuard from "src/core/components/auth/AuthGuard"
import { SettingsProvider } from "src/core/context/settingsContext"
import ThemeComponent from "src/core/theme/ThemeComponent"

export const metadata = {
  title: 'Next.js',
  description: 'Generated by Next.js',
}

const Providers = ({ children }) => {
  return (
    <AuthGuard>
      <AclGuard>
        <ThemeComponent>
          <SettingsProvider>
            {children}
          </SettingsProvider>
        </ThemeComponent>
      </AclGuard>
    </AuthGuard>
  )
}

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
