import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
require("dotenv").config();

import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { mainnet, goerli, polygon, optimism, arbitrum } from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';


const { chains, provider } = configureChains(
  [mainnet, goerli, polygon, optimism, arbitrum],
  [//need to fix;
    // alchemyProvider({ apiKey: "bRt5dZAokMQky_h3C6m1hb0hrmQt2Bu2"}),
    alchemyProvider({apiKey: provider.env.ALCHEMY_ID}),
    publicProvider()
  ]
);
const { connectors } = getDefaultWallets({
  appName: 'My RainbowKit App',
  chains
});
const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider
})



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <WagmiConfig client={wagmiClient} >
      <RainbowKitProvider chains={chains}>
          <App />
      </RainbowKitProvider>
    </WagmiConfig>
  </React.StrictMode>,
)
