import { QueryClient } from '@tanstack/react-query'
import {
  getDefaultConfig,
} from '@rainbow-me/rainbowkit';

import { WC_PARAMS } from './walletConnect'
import { CHAINS, transports } from './constants'

export function createWagmiConfig() {
  const config = getDefaultConfig({
    appName: 'My RainbowKit App',
    projectId: WC_PARAMS.projectId,
    chains: CHAINS,
    transports
  });

  return config;
}

export const queryClient = new QueryClient()
