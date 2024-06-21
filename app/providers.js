'use client';

import * as React from 'react';
import {
    RainbowKitProvider,
    getDefaultWallets,
    connectorsForWallets,
} from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';


const vitruveo = {
    id: 1490,
    name: 'Vitruveo',
    network: 'vitruveo',
    iconUrl: '/images/white.png', //https://irp.cdn-website.com/a01407ef/dms3rep/multi/fav-vit-857c1762.png',
    iconBackground: '#fff',
    nativeCurrency: {
        decimals: 18,
        name: 'Vitruveo',
        symbol: 'VTRU',
    },
    rpcUrls: {
        public: { http: ['https://rpc.vitruveo.xyz/'] },
        default: { http: ['https://rpc.vitruveo.xyz/'] },
    },
    blockExplorers: {
        default: { name: 'VitruveoScan', url: 'https://explorer.vitruveo.xyz' },
        etherscan: { name: 'VitruveoScan', url: 'https://explorer.vitruveo.xyz' },
    },
    testnet: false,
};

const vitruveoTestnet = {
    id: 14333,
    name: 'Vitruveo Testnet',
    network: 'vitruveo-testnet',
    iconUrl: 'https://irp.cdn-website.com/a01407ef/dms3rep/multi/fav-vit-857c1762.png',
    iconBackground: '#fff',
    nativeCurrency: {
        decimals: 18,
        name: 'Vitruveo Testnet',
        symbol: 'tVTRU',
    },
    rpcUrls: {
        public: { http: ['https://test-rpc.vitruveo.xyz/'] },
        default: { http: ['https://test-rpc.vitruveo.xyz/'] },
    },
    blockExplorers: {
        default: { name: 'VitruveoScan', url: 'https://test-explorer.vitruveo.xyz' },
        etherscan: { name: 'VitruveoScan', url: 'https://test-explorer.vitruveo.xyz' },
    },
    testnet: false,
};


const { chains, publicClient, webSocketPublicClient } = configureChains(
    [vitruveo],
    [publicProvider()]
);

const projectId = 'de7e37b7d92f79ca42f52625292ee654';

const { wallets } = getDefaultWallets({
    appName: 'NFT Minting',
    projectId,
    chains,
});

const demoAppInfo = {
    appName: 'NFT Minting',
};

const connectors = connectorsForWallets([
    ...wallets,
    // {
    //     groupName: 'Other',
    //     wallets: [
    //         argentWallet({ projectId, chains }),
    //         trustWallet({ projectId, chains }),
    //         ledgerWallet({ projectId, chains }),
    //     ],
    // },
]);

const wagmiConfig = createConfig({
    autoConnect: true,
    connectors,
    publicClient,
    webSocketPublicClient,
});

export function Providers({ children }) {
    const [mounted, setMounted] = React.useState(false);
    React.useEffect(() => setMounted(true), []);
    return (
        <WagmiConfig config={wagmiConfig}>
            <RainbowKitProvider chains={chains} appInfo={demoAppInfo}>
                {mounted && children}
            </RainbowKitProvider>
        </WagmiConfig>
    );
}
