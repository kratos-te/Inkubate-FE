import type { Metadata } from "next";
import LaunchpadModal from "@/components/LaunchpadModal";
import SettingModal from "@/components/SettingModal";
import { ModalProvider } from "@/contexts/ModalContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { inter, poppins, readexPro } from "@/styles/fonts";
import { WalletModal } from "@/components/WalletModal";
import { UserProvider } from "@/contexts/UserContext";
import "@/styles/globals.scss";
import "react-loading-skeleton/dist/skeleton.css";
import WagmiProvider from "@/contexts/WagmiConext";
import { AuthProvider } from "@/contexts/AuthContext";

export const metadata: Metadata = {
  icons: [
    {
      rel: "apple-touch-icon",
      url: "/apple-touch-icon.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      url: "/favicon-32x32.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "16x16",
      url: "/favicon-16x16.png",
    },
    {
      rel: "icon",
      url: "/favicon.ico",
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${poppins.variable} ${readexPro.variable}`}
    >
      <body className="bg-dark-200">
        <ThemeProvider>
          <WagmiProvider>
            <UserProvider>
              <AuthProvider>
                <ModalProvider>
                  {children}
                  <WalletModal />
                  <LaunchpadModal />
                  <SettingModal />
                </ModalProvider>
              </AuthProvider>
            </UserProvider>
          </WagmiProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
