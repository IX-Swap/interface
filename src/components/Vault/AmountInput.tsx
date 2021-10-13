import { Currency, CurrencyAmount } from '@ixswap1/sdk-core'
import { MaxButton } from 'components/CurrencyInputPanel/MaxButton'
import { RowFixed } from 'components/Row'
import React, { ReactNode } from 'react'
import styled from 'styled-components'
import { TYPE } from 'theme'
import { formatCurrencySymbol } from 'utils/formatCurrencySymbol'
import CurrencyLogo from '../CurrencyLogo'
import { Input as NumericalInput } from '../NumericalInput'

const InputPanel = styled.div<{ hideInput?: boolean }>`
  ${({ theme }) => theme.flexColumnNoWrap}
  position: relative;
  border-radius: ${({ hideInput }) => (hideInput ? '16px' : '36px')};
  background-color: ${({ theme, hideInput }) => (hideInput ? 'transparent' : theme.bg2)};
  z-index: 1;
  width: ${({ hideInput }) => (hideInput ? '100%' : 'initial')};
`

const InputRow = styled.div`
  ${({ theme }) => theme.flexRowNoWrap}
  align-items: center;
  padding: 0;
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
      padding: 0;
  `};
`
const Container = styled.div`
  border-radius: 36px;
  background-color: ${({ theme }) => theme.bg7};
  width: 'initial';
  padding: 10px 31px 10px 27px;
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
      boder-radius: 1rem;
  `};
`
const StyledTokenName = styled.span<{ active?: boolean }>`
  ${({ active }) => (active ? '  margin: 0 0.25rem 0 0.25rem;' : '  margin: 0 0.25rem 0 0.25rem;')}
`
const Aligner = styled.span`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`
interface Props {
  currency?: Currency
  value: string
  amount?: CurrencyAmount<Currency>
  showMax?: boolean
  rightItem?: ReactNode
  onUserInput: (typedValue: string) => void
}
export const AmountInput = ({ currency, value, amount, onUserInput, rightItem, showMax = false, ...rest }: Props) => {
  return (
    <InputPanel id={'amount-input'} {...rest}>
      <Container>
        <InputRow style={{}}>
          <Aligner>
            <>
              <NumericalInput
                className="token-amount-input"
                value={value}
                onUserInput={(val) => {
                  onUserInput(val)
                }}
              />
            </>
            {showMax && <MaxButton currency={currency} onInput={onUserInput} amount={amount} />}
            {rightItem || (
              <RowFixed>
                <CurrencyLogo style={{ marginRight: '0.5rem' }} currency={currency} size={'24px'} />
                <StyledTokenName className="token-symbol-container" active={Boolean(currency && currency.symbol)}>
                  <TYPE.main1>{formatCurrencySymbol({ currency })}</TYPE.main1>
                </StyledTokenName>
              </RowFixed>
            )}
          </Aligner>
        </InputRow>
      </Container>
    </InputPanel>
  )
}
