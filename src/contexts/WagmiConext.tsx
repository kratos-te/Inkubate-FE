"use client"
import { FC, ReactNode, useEffect, useState } from "react";
import { Web3Modal } from "@web3modal/react";
import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from "@web3modal/ethereum";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { goerli, mainnet, optimism, polygon } from "wagmi/chains";

// 1. Get projectID at https://cloud.walletconnect.com
if (!process.env.NEXT_PUBLIC_PROJECT_ID) {
  throw new Error("You need to provide NEXT_PUBLIC_PROJECT_ID env variable");
}
const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;

// 2. Configure wagmi client
const chains = [goerli];

const { publicClient } = configureChains(chains, [w3mProvider({ projectId })]);
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ chains, projectId }),
  publicClient,
});

// 3. Configure modal ethereum client
const ethereumClient = new EthereumClient(wagmiConfig, chains);

interface Props {
  children: ReactNode;
}

const WagmiProvider: FC<Props> = ({ children }) => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);
  return (
    <>
      {ready ? <WagmiConfig config={wagmiConfig}>{children}</WagmiConfig> : null}

      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
    </>
  );
};

export default WagmiProvider;
