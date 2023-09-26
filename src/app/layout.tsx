"use client";
import LaunchpadModal from "@/components/LaunchpadModal";
import SettingModal from "@/components/SettingModal";
import { ModalProvider } from "@/contexts/ModalContext";
import { SessionProvider } from "@/contexts/SessionContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { inter, poppins, readexPro } from "@/styles/fonts";
import { WagmiConfig, configureChains, createConfig } from "wagmi";
import { goerli } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import type { Metadata } from "next";
import { WalletModal } from "@/components/WalletModal";
import { UserProvider } from "@/contexts/UserContext";

import "@/styles/globals.scss";
import "react-loading-skeleton/dist/skeleton.css";

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [goerli],
  [
    alchemyProvider({ apiKey: "Ji-phLJnoPeCnkvWGyHT_a9Kse2W3NAT" }),
    publicProvider(),
  ]
);

// Set up wagmi config
const config = createConfig({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({
      chains,
    }),
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: "wagmi",
      },
    }),
    new WalletConnectConnector({
      chains,
      options: {
        projectId: "76273e2feb487953f8d9f42ac074abc3",
      },
    }),
  ],
  publicClient,
  webSocketPublicClient,
});

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
        <WagmiConfig config={config}>
          <ThemeProvider>
            <SessionProvider>
              <UserProvider>
                <ModalProvider>
                  {children}
                  <LaunchpadModal />
                  <SettingModal />
                  <WalletModal />
                </ModalProvider>
              </UserProvider>
            </SessionProvider>
          </ThemeProvider>
        </WagmiConfig>
      </body>
    </html>
  );
}
