import { useCallback } from 'react'
import { useBurnActionHandlers } from 'state/burn/hooks'
import { Field } from '../../state/burn/actions'

const useCurrencyInput = () => {
  const { onUserInput: _onUserInput } = useBurnActionHandlers()
  const onUserInput = useCallback(
    (field: Field, typedValue: string) => {
      return _onUserInput(field, typedValue)
    },
    [_onUserInput]
  )
  const onLiquidityInput = useCallback(
    (typedValue: string): void => onUserInput(Field.LIQUIDITY, typedValue),
    [onUserInput]
  )
  const onCurrencyAInput = useCallback(
    (typedValue: string): void => onUserInput(Field.CURRENCY_A, typedValue),
    [onUserInput]
  )
  const onCurrencyBInput = useCallback(
    (typedValue: string): void => onUserInput(Field.CURRENCY_B, typedValue),
    [onUserInput]
  )
  return { onUserInput, onLiquidityInput, onCurrencyAInput, onCurrencyBInput }
}

export default useCurrencyInput
