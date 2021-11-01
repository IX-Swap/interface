import { TradeAuthorization } from '@ixswap1/v2-sdk'
import { Currency, Token, TradeType } from '@ixswap1/sdk-core'
import { Trade as V2Trade } from '@ixswap1/v2-sdk'
import { OrderType } from 'state/user/enum'

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
export interface SwapLocalState {
  showConfirm: boolean
  tradeToConfirm: V2Trade<Currency, Currency, TradeType> | undefined
  attemptingTxn: boolean
  swapErrorMessage: string | undefined
  txHash: string | undefined
}
export interface AuthorizationInProgress {
  tokenAddress?: string
  tokenId?: number
  brokerDealerId?: number
  pairAddress?: string
  amount?: string
  orderType?: OrderType
}
export interface SwapHelperState {
  authorizations: {
    [chainId: number]: {
      [address: string]: SwapAuthorization | null
    }
  }
  localSwap: SwapLocalState
  openModal: boolean
  tokenInProgress?: Token | null
  authorizationInProgress?: AuthorizationInProgress | null
  loadingSwap: boolean
}
