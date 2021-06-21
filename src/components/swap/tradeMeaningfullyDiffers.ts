import { Currency, TradeType } from '@ixswap1/sdk-core'
import { Trade as V2Trade } from '@ixswap1/v2-sdk'

/**
 * Returns true if the trade requires a confirmation of details before we can submit it
 * @param args a pair of V2 trades
 */
export function tradeMeaningfullyDiffers(
  ...args: [V2Trade<Currency, Currency, TradeType>, V2Trade<Currency, Currency, TradeType>]
): boolean {
  const [tradeA, tradeB] = args
  return (
    tradeA.tradeType !== tradeB.tradeType ||
    !tradeA.inputAmount.currency.equals(tradeB.inputAmount.currency) ||
    // !tradeA.inputAmount.equalTo(tradeB.inputAmount) ||
    !tradeA.outputAmount.currency.equals(tradeB.outputAmount.currency)
    //|| !tradeA.outputAmount.equalTo(tradeB.outputAmount)
  )
}
