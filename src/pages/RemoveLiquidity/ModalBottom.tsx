import { Currency } from '@ixswap1/sdk-core'
import { Trans } from '@lingui/macro'
import { TextRow } from 'components/TextRow/TextRow'
import { TextRowDoubleCurrency } from 'components/TextRow/TextRowDoubleCurrency'
import React, { useMemo } from 'react'
import { formatAmount } from 'utils/formatCurrencyAmount'
import { ButtonIXSWide } from '../../components/Button'
import { AutoColumn } from '../../components/Column'
import { ApprovalState } from '../../hooks/useApproveCallback'
import { SignatureData } from '../../hooks/useERC20Permit'
import { Field } from '../../state/burn/actions'
import { useDerivedBurnInfo } from '../../state/burn/hooks'
import { ModalBottomWrapper } from './styled'

interface Props {
  currencyA?: Currency
  currencyB?: Currency
  approval: ApprovalState
  signatureData: SignatureData | null
  onRemove: () => Promise<void>
}
export const ModalBottom = ({ currencyA, currencyB, approval, signatureData, onRemove }: Props) => {
  const [tokenA, tokenB] = useMemo(() => [currencyA?.wrapped, currencyB?.wrapped], [currencyA, currencyB])
  const { pair, parsedAmounts } = useDerivedBurnInfo(currencyA ?? undefined, currencyB ?? undefined)
  return (
    <ModalBottomWrapper>
      <AutoColumn gap="8px">
        <TextRowDoubleCurrency
          textLeft={
            <Trans>
              IXS {currencyA?.symbol}/{currencyB?.symbol} Burned
            </Trans>
          }
          currencyA={currencyA}
          currencyB={currencyB}
          textRight={<>{formatAmount(+(parsedAmounts[Field.LIQUIDITY]?.toSignificant(6) || 0))}</>}
        />
        {pair && (
          <>
            <TextRow
              textLeft={<Trans>Price</Trans>}
              textRight={
                <>
                  1 {currencyA?.symbol} = {tokenA ? formatAmount(+pair.priceOf(tokenA).toSignificant(6)) : '-'}{' '}
                  {currencyB?.symbol}
                </>
              }
            />
            <TextRow
              textLeft={''}
              textRight={
                <>
                  1 {currencyB?.symbol} = {tokenB ? formatAmount(+pair.priceOf(tokenB).toSignificant(6)) : '-'}{' '}
                  {currencyA?.symbol}
                </>
              }
            />
          </>
        )}
      </AutoColumn>
      <ButtonIXSWide
        style={{ margin: '30px 0 0 0' }}
        disabled={!(approval === ApprovalState.APPROVED || signatureData !== null)}
        onClick={onRemove}
        data-testid="confirm-remove"
      >
        <Trans>Confirm</Trans>
      </ButtonIXSWide>
    </ModalBottomWrapper>
  )
}
