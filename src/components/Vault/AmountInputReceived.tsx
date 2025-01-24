import React, { ReactNode } from 'react'
import styled from 'styled-components'
import { Currency, CurrencyAmount } from '@ixswap1/sdk-core'

import { RowFixed } from 'components/Row'
import { TokenLogo } from 'components/TokenLogo'
import { TYPE } from 'theme'
import CurrencyLogo from '../CurrencyLogo'

type SecCurrency = Currency & {
  originalSymbol?: string | null
}

interface Props {
  balance?: string
  currency?: SecCurrency
  value: string
  amount?: CurrencyAmount<SecCurrency>
  showMax?: boolean
  rightItem?: ReactNode
  onUserInput: (typedValue: string) => void
  token: any
  symbol: string | undefined | null
  originalDecimals?: number
  disabled?: boolean
}

export const AmountInputReceived = ({
  balance,
  currency,
  rightItem,
  showMax = false,
  token,
  symbol,
  value,
  ...rest
}: Props) => {
  const isShowMaxButton = showMax && balance && Number(balance) > 0

  return (
    <InputPanel id={'amount-input'} {...rest}>
      <Container disabled={true}>
        <InputRow style={{}}>
          <Aligner>
            <>
              <StyledNumericalInput
                value={Number(value).toLocaleString('en-US', {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 2,
                })}
                placeholder={'0.0'}
                inputMode="decimal"
                autoComplete="off"
                autoCorrect="off"
                type="text"
                spellCheck="false"
                disabled={true}
              />
            </>
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
                  <TYPE.title7 fontSize="14px">{symbol}</TYPE.title7>
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

const StyledNumericalInput = styled.input<{ error?: boolean; fontSize?: string; align?: string; route?: boolean }>`
  color: ${({ error, route, theme }) => (error ? theme.red1 : route ? theme.text12 : theme.text1)};
  width: 0;
  position: relative;
  outline: none;
  border: none;
  flex: 1 1 auto;
  font-weight: 600;
  background-color: ${({ theme, route }) => (route ? theme.bg1 : theme.bg1)};
  text-align: ${({ align }) => align && align};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 0px;
  -webkit-appearance: textfield;
  border: 1px solid #E6E6FF
  text-align: left;
  font-size: 22px;
  line-height: 40px;
    ${({ theme }) => theme.mediaWidth.upToSmall`
    width: 100%
    font-size: 14px;
  `}
  ::-webkit-search-decoration {
    -webkit-appearance: none;
  }

  [type='number'] {
    -moz-appearance: textfield;
  }

  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }

  ::placeholder {
    color: ${({ error, theme, route }) => (route ? theme.text1 : error ? theme.red1 : theme.text12)}
    opacity: 0.5;
    font-style: normal;
  }
  background-color: ${({ theme }) => theme.bg0};

  &:disabled {
    background-color: ${({ theme }) => theme.bg7};
    color: ${({ theme }) => theme.text3};
    cursor: not-allowed;
  }
`

export const StyledBalanceMax = styled.button<{ disabled?: boolean }>`
  background-color: transparent;
  border-radius: 6px;
  cursor: pointer;
  text-transform: uppercase;
  padding: 10px 12px;
  border: 1px solid #e6e6ff;
  background: white;
  color: ${({ theme }) => theme.text1};
  pointer-events: ${({ disabled }) => (!disabled ? 'pointer' : 'none')};
  margin-right: 12px;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  text-decoration: none;
  :focus {
    outline: none;
  }
  :hover {
    background-color: #f7f7ff;
  }

  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    margin-right: 8px;
    padding: 8px;
  `};
`
