import type { AppProps } from "next/app";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { Navbar } from "../components/Navbar/Navbar";
import NextNProgress from "nextjs-progressbar";
import { NETWORK } from "../consts/contractAddresses";
import "../styles/globals.css";
import { useState } from "react";
// wagmi
import { IntmaxWalletAccount, IntmaxWalletSigner } from "webmax";
import { WagmiConfig, configureChains, createClient as createWagmiClient } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import { RainbowKitProvider, connectorsForWallets, lightTheme } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';
import {
  coinbaseWallet,
  injectedWallet,
  ledgerWallet,
  metaMaskWallet,
  omniWallet,
  rainbowWallet,
  trustWallet,
} from '@rainbow-me/rainbowkit/wallets';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { ToastContainer, Zoom, toast } from 'react-hot-toast';
// import 'react-toastify/dist/ReactToastify.css';
import { getWagmiChainConfig } from '../components/features/chains/metadata';
import { Color } from '../styles/Color';
// wagmi configs setup
const { chains, provider } = configureChains(getWagmiChainConfig(), [publicProvider()]);
const [signer, setSigner] = useState();
const [chainIdMain, setChainIdMain] = useState();
const [signer_address, set_signer_address] = useState("");

const connectorConfig = {
  appName: 'X-chain Gaming NFT',
  chains,
};

const connectors = connectorsForWallets([
  {
    groupName: 'Recommended',
    wallets: [
      metaMaskWallet(connectorConfig),
      injectedWallet(connectorConfig),
      ledgerWallet(connectorConfig),
    ],
  },
  {
    groupName: 'More',
    wallets: [
      coinbaseWallet(connectorConfig),
      omniWallet(connectorConfig),
      rainbowWallet(connectorConfig),
      trustWallet(connectorConfig),
    ],
  },
]);
const connectToIntmax = async (): Promise<void> => {
  try {
    const signerIntmax = new IntmaxWalletSigner();
    const accountIntmax = await signerIntmax.connectToAccount();
    setSigner(signerIntmax);
    set_signer_address(accountIntmax.address);
    setChainIdMain(accountIntmax.chainId);
  } catch (error: any) {
    console.log(error.message);
  }
};

const wagmiClient = createWagmiClient({
  autoConnect: false, // TODO
  provider,
  connectors,
});

const reactQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});




function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider activeChain={NETWORK}>
      {/* Progress bar when navigating between pages */}
      <NextNProgress
        color="var(--color-tertiary)"
        startPosition={0.3}
        stopDelayMs={200}
        height={3}
        showOnShallow={true}
      />
        <WagmiConfig client={wagmiClient}>
          <RainbowKitProvider
            chains={chains}
            theme={lightTheme({
              accentColor: Color.primaryBlue,
              borderRadius: 'small',
              fontStack: 'system',
            })}
          >
          <QueryClientProvider client={reactQueryClient}>

          {/* Render the navigation menu above each component */}
          <Navbar />
          {/* Render the actual component (page) */}
          <Component {...pageProps} />
          </QueryClientProvider>
          {/* <ToastContainer transition={Zoom} position={toast.POSITION.BOTTOM_RIGHT} limit={2} /> */}
          </RainbowKitProvider>
        </WagmiConfig>
    </ThirdwebProvider>
  );
}

export default MyApp;
