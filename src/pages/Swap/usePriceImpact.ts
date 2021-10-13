import { useUSDCValue } from 'hooks/useUSDCPrice'
import { useMemo } from 'react'
import { useDerivedSwapInfo } from 'state/swap/hooks'
import { ParsedAmounts } from 'state/swap/typings'
import { useExpertModeManager } from 'state/user/hooks'
import { computeFiatValuePriceImpact } from 'utils/computeFiatValuePriceImpact'
import { warningSeverity } from 'utils/prices'
import { Field } from '../../state/swap/actions'

export function usePriceImpact({ parsedAmounts }: { parsedAmounts: ParsedAmounts | undefined }) {
  const { expertMode } = useExpertModeManager()
  const { toggledTrade: trade } = useDerivedSwapInfo()
  const fiatValueInput = useUSDCValue(parsedAmounts?.[Field.INPUT])
  const fiatValueOutput = useUSDCValue(parsedAmounts?.[Field.OUTPUT])
  const priceImpact = computeFiatValuePriceImpact(fiatValueInput, fiatValueOutput)
  // warnings on the greater of fiat value price impact and execution price impact
  const priceImpactSeverity = useMemo(() => {
    const executionPriceImpact = trade?.priceImpact
    return warningSeverity(
      executionPriceImpact && priceImpact
        ? executionPriceImpact.greaterThan(priceImpact)
          ? executionPriceImpact
          : priceImpact
        : executionPriceImpact ?? priceImpact
    )
  }, [priceImpact, trade])

  const priceImpactTooHigh = priceImpactSeverity > 3 && !expertMode

  return { priceImpactSeverity, priceImpactTooHigh, priceImpact }
}
