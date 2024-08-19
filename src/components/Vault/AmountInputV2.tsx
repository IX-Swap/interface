import React, { ReactNode } from 'react'
import styled from 'styled-components'
import { Currency, CurrencyAmount } from '@ixswap1/sdk-core'

import { MaxButton } from 'components/CurrencyInputPanel/MaxButton'
import { RowFixed } from 'components/Row'
import { TokenLogo } from 'components/TokenLogo'
import { TYPE } from 'theme'
import CurrencyLogo from '../CurrencyLogo'
import { Input as NumericalInput } from '../NumericalInput'

type SecCurrency = Currency & {
  originalSymbol?: string | null
}

interface Props {
  currency?: SecCurrency
  value: string
  amount?: CurrencyAmount<SecCurrency>
  showMax?: boolean
  rightItem?: ReactNode
  onUserInput: (typedValue: string) => void
  token: any
  symbol: string | undefined | null,
  originalDecimals?: number
  disabled?: boolean
}
export const AmountInputV2 = ({
  currency,
  value,
  amount,
  onUserInput,
  rightItem,
  showMax = false,
  token,
  symbol,
  originalDecimals = 0,
  disabled = false,
  ...rest
}: Props) => {
  return (
    <InputPanel id={'amount-input'} {...rest}>
      <Container disabled={disabled}>
        <InputRow style={{}}>
          <Aligner>
            <>
              <StyledNumericalInput
                className="token-amount-input"
                data-testid="token-amount-input"
                value={value}
                disabled={disabled}
                onUserInput={(val) => {
                  const floatingPart = val.split('.')[1]
                  if (floatingPart && currency && originalDecimals < floatingPart.length) return
                  onUserInput(val)
                }}
              />
            </>
            {showMax && <MaxButton currency={currency} onInput={onUserInput} amount={amount} />}
            {rightItem || (
              <RowFixed>
                {token?.logo ? (
                  <TokenLogo logo={token.logo} width="24px" height="24px" />
                ) : (
                  <CurrencyLogo currency={currency} size="72px" />
                )}

                <StyledTokenName
                  className="token-symbol-container"
                  active={Boolean(currency && currency.originalSymbol)}
                >
                  <TYPE.title7 fontSize="14px">
                   {symbol}
                  </TYPE.title7>
                </StyledTokenName>
              </RowFixed>
            )}
          </Aligner>
        </InputRow>
      </Container>
    </InputPanel>
  )
}

const InputPanel = styled.div<{ hideInput?: boolean }>`
  ${({ theme }) => theme.flexColumnNoWrap}
  position: relative;
  border-radius: ${({ hideInput }) => (hideInput ? '16px' : '36px')};
  background-color: ${({ hideInput }) => (hideInput ? 'transparent' : 'transparent')};
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
const Container = styled.div<{ disabled?: boolean }>`
  border-radius: 6px;
  border: 1px solid #e6e6ff;
  background-color: ${({ theme, disabled }) => (disabled ? theme.bg7 : theme.bg0)};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'initial')};
  width: 'initial';
  padding: 10px 16px;
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

const StyledNumericalInput = styled(NumericalInput)`
  background-color: ${({ theme }) => theme.bg0};

  &:disabled {
    background-color: ${({ theme }) => theme.bg7};
    color: ${({ theme }) => theme.text3};
    cursor: not-allowed;
  }
`
