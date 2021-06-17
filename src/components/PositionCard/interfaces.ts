import { CurrencyAmount, Token } from '@ixswap1/sdk-core'
import { Pair } from '@ixswap1/v2-sdk'

export interface PositionCardProps {
  pair: Pair
  showUnwrapped?: boolean
  border?: string
  stakedBalance?: CurrencyAmount<Token> // optional balance to indicate that liquidity is deposited in mining pool
}
