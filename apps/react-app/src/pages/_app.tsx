import "../styles/global.css";
import "../styles/app.css";
import "@rainbow-me/rainbowkit/styles.css";
import {
  connectorsForWallets,
  getDefaultWallets,
  getWalletConnectConnector,
  RainbowKitProvider,
  wallet,
} from "@rainbow-me/rainbowkit";
import type { AppProps } from "next/app";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import IsMounted from "@/components/IsMounted";
import { AppConfig } from "@/utils/AppConfig";
import { ModalProvider } from "react-modal-hook";
import {
  FORKING_ENABLED,
} from "@/utils/constants";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";


const { chains, provider, webSocketProvider } = configureChains(
  [
    chain.mainnet,
    {
      id: 42220,
      network: "Celo",
      name: "Celo",
      nativeCurrency: {
        name: "CELO",
        symbol: "CELO",
        decimals: 18,
      },
      rpcUrls: {
        default: "https://forno.celo.org",
      },
      testnet: false,
    },
    // {
    //   id: 44787,
    //   network: "Celo Testnet",
    //   name: "Celo Testnet",
    //   nativeCurrency: {
    //     name: "CELO",
    //     symbol: "CELO",
    //     decimals: 18,
    //   },
    //   rpcUrls: {
    //     default: "https://celo-alfajores-rpc.allthatnode.com",
    //   },
    //   testnet: false,
    // },
  ],
  FORKING_ENABLED
    ? [
        jsonRpcProvider({
          priority: 0,
          rpc: () => ({
            // http: "https://forno.celo.org",
            http: "http://localhost:8545",
          }),
        }),
      ]
    : [
        jsonRpcProvider({
          priority: 0,
          rpc: () => ({
            http: "https://forno.celo.org",
          }),
        }),
      ]
);

const { wallets } = getDefaultWallets({
  appName: AppConfig.title,
  chains,
});

const dappInfo = {
  appName: AppConfig.title,
};

const ValoraWallet = {
  id: "valora",
  name: "Valora",
  iconUrl:
    "https://play-lh.googleusercontent.com/P-Vm1411ljmLdfyjVGP5Y8cqR63coYuflJmLqqlH8kw6SRNlOhRuIAezvO4DlsuuRTc",
  iconBackground: "#0c2f78",
  createConnector: () => {
    const connector = getWalletConnectConnector({ chains });

    return {
      connector,
      mobile: {
        getUri: async () => {
          const { uri } = (await connector.getProvider()).connector;
          return uri;
        },
      },
      qrCode: {
        getUri: async () => (await connector.getProvider()).connector.uri,
        instructions: {
          learnMoreUrl: "https://my-wallet/learn-more",
          steps: [
            {
              description:
                "We recommend putting My Wallet on your home screen for faster access to your wallet.",
              step: "install",
              title: "Open the My Wallet app",
            },
            {
              description:
                "After you scan, a connection prompt will appear for you to connect your wallet.",
              step: "scan",
              title: "Tap the scan button",
            },
          ],
        },
      },
    };
  },
};

const connectors = connectorsForWallets([
  {
    groupName: "Celo",
    // @ts-ignore
    wallets: [ValoraWallet],
  },
  ...wallets,
  {
    groupName: "Other",
    wallets: [
      wallet.argent({ chains }),
      wallet.trust({ chains }),
      wallet.ledger({ chains }),
    ],
  },
]);

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider appInfo={dappInfo} chains={chains}>
        <ModalProvider>
          <IsMounted>
            <Component {...pageProps} />
          </IsMounted>
        </ModalProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;
