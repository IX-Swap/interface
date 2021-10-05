import { TradeAuthorization } from '@ixswap1/v2-sdk'

export interface BrokerDealerSwapDto {
  callbackEndpoint?: string
  encryptedData: string
  endpoint: string
  hash: string
  brokerDealerId: number
}

export interface SwapConfirmArguments {
  brokerDealerId: number
  hash: string
  encryptedData: string
}

export interface SwapAuthorization extends TradeAuthorization {
  expiresAt: number
}

export interface SwapHelperState {
  authorizations: {
    [chainId: number]: {
      [address: string]: SwapAuthorization | null
    }
  }
}
