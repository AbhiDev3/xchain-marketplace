// @ts-nocheck
import type { AppProps } from "next/app";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { Navbar } from "../components/Navbar/Navbar";
import NextNProgress from "nextjs-progressbar";
import { NETWORK } from "../consts/contractAddresses";
import "../styles/globals.css";
import { useEffect , useState  } from "react";
// wagmi
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
import { ScrollAlphaTestnet } from "@thirdweb-dev/chains";
// wagmi configs setup
const { chains, provider } = configureChains(getWagmiChainConfig(), [publicProvider()]);



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
  const [activeChain, setActiveChain] = useState<string>(NETWORK);

  useEffect(() => {
    if (window.ethereum) {
      const ethereum = window.ethereum;
      ethereum.request({ method: 'net_version' })
        .then((networkId: string) => {
          console.log(activeChain,networkId);
          switch (networkId) {
            case '1':
              setActiveChain('mainnet');
              break;
            case '1287':
              setActiveChain('moonbase-alpha');
              break;
            case '4':
              setActiveChain('rinkeby');
              break;
            case '5':
              setActiveChain('goerli');
              break;
            case '534353':
              setActiveChain('ScrollAlphaTestnet');
              break;
            default:
              setActiveChain(NETWORK);
          }
        })
        .catch((error: any) => {
          console.log('Error getting network ID:', error);
          setActiveChain(NETWORK);
        });
    }
  }, []);
  console.log(activeChain);
  return (
    <ThirdwebProvider activeChain={ScrollAlphaTestnet}>
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
