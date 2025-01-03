import React, { useState, useCallback, ReactNode } from 'react'
import { Pair } from '@ixswap1/v2-sdk'
import { Currency, CurrencyAmount, Percent, Token } from '@ixswap1/sdk-core'
import styled from 'styled-components/macro'
import { darken } from 'polished'
import { useCurrencyBalance } from '../../state/wallet/hooks'
import CurrencySearchModal from '../SearchModal/CurrencySearchModal'
import { ButtonEmpty } from '../Button'
import { RowFixed, RowEnd } from '../Row'
import { TYPE } from '../../theme'
import { Input as NumericalInput } from '../NumericalInput'
import { ReactComponent as DropDown } from '../../assets/images/dropdown.svg'
import { useActiveWeb3React } from '../../hooks/web3'
import { Trans } from '@lingui/macro'
import useTheme from '../../hooks/useTheme'
import { Lock } from 'react-feather'
import { AutoColumn } from 'components/Column'
import { FiatValue } from './FiatValue'
import { formatCurrencyAmount } from 'utils/formatCurrencyAmount'
import { AssetLogo } from './AssetLogo'
import { formatCurrencySymbol } from 'utils/formatCurrencySymbol'
import { Box } from 'rebass'
import { ReactComponent as NewDropDown } from '../../assets/images/dropdownIcon.svg'

const InputPanel = styled.div<{ hideInput?: boolean }>`
  ${({ theme }) => theme.flexColumnNoWrap}
  position: relative;
  border-radius: 8px;
  background-color: ${({ theme, hideInput }) =>
    hideInput ? 'transparent' : theme.config.background?.main || theme.bg21};
  // z-index: 1;
  width: ${({ hideInput }) => (hideInput ? '100%' : 'initial')};
`

const FixedContainer = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  border-radius: 8px;
  // background-color: ${({ theme }) => theme.config.background?.main || theme.bg1};
  opacity: 0.95;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
`

const NewContainer = styled.div<{ hideInput: boolean }>`
  border-radius: 8px;
  border: solid 1px #e6e6ff;
  background-color: ${({ theme }) => theme.config.background?.main || theme.bg1};
  width: ${({ hideInput }) => (hideInput ? '100%' : 'initial')};
`

const CurrencySelect = styled(ButtonEmpty)<{ selected: boolean; hideInput?: boolean }>`
  align-items: center;
  background-color: ${({ theme }) => theme.config.background?.main || theme.bg1};
  color: ${({ selected, theme }) => (selected ? theme.text1 : theme.config.text?.additional1 || theme.white)};
  border-radius: 16px;
  outline: none;
  cursor: pointer;
  user-select: none;
  border: none;
  height: ${({ hideInput }) => (hideInput ? '2.8rem' : '2.4rem')};
  width: ${({ hideInput }) => (hideInput ? '100%' : 'initial')};
  padding: 0;
  padding-left: 8px;
  justify-content: space-between;
  margin-right: 0;
  font-weight: 600;
  font-size: 22px;
  line-height: 34px;
  &:focus {
    text-decoration: none;
  }
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
  font-size: 14px;
  `};
`

const InputRow = styled.div<{ selected: boolean }>`
  ${({ theme }) => theme.flexRowNoWrap}
  align-items: center;
  padding: 14px 2rem 0 2rem;
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
      padding: 10px 10px 0 1rem;
  `};
`

const LabelRow = styled.div`
  ${({ theme }) => theme.flexRowNoWrap}
  align-items: center;
  color: ${({ theme }) => theme.text1};
  font-size: 0.75rem;
  line-height: 1rem;
  padding: 0 2rem 9px 2.5rem;
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
      padding: 0px 1rem 10px;
      flex-wrap: wrap;
  `};
  span:hover {
    cursor: pointer;
    color: ${({ theme }) => darken(0.2, theme.text2)};
  }
`

const FiatRow = styled(LabelRow)`
  justify-content: space-between;
  gap: 16px;
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    gap: 0px;
  `};
`

const Aligner = styled.span`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`

export const StyledDropDown = styled(DropDown)<{ selected: boolean }>`
  margin: 0 0.25rem 0 0.35rem;
  height: 35%;

  path {
    stroke: ${({ selected, theme }) => (selected ? theme.text1 : theme.white)};
    stroke-width: 1.5px;
  }
`

const StyledTokenName: any = styled.span<{ active?: boolean }>`
  ${({ active }) => (active ? '  margin: 0 0.25rem 0 0.25rem;' : '  margin: 0 0.25rem 0 0.25rem;')}
  font-size:  ${({ active }) => (active ? '14px' : '14px')};
  color: ${({ theme }) => theme.text1};
`
const BalanceRow = styled(RowEnd)``
const BalanceWrap = styled(RowFixed)`
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  height: 17px;
  text-align: center;
`
export const StyledBalanceMax = styled.button<{ disabled?: boolean }>`
  background-color: transparent;
  border-radius: 6px;
  cursor: pointer;
  text-transform: uppercase;
  padding: 14px 20px;
  border: 1px solid #e6e6ff;
  background: white;

  color: #b8b8cc;
  // opacity: ${({ disabled }) => (!disabled ? 1 : 0.4)};
  pointer-events: ${({ disabled }) => (!disabled ? 'initial' : 'none')};
  margin-left: 0.25rem;
  margin-right: 0.25rem;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  text-decoration: none;
  :focus {
    outline: none;
  }

  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    margin-right: 0rem;
     padding: 10px 10px;
  `};
`

const StyledChooseToken = styled.span`
  color: #b8b8cc;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: -0.42px;

  :hover {
    cursor: pointer;
    color: #66f;
  }
`

interface CurrencyInputPanelProps {
  value: string
  onUserInput: (value: string) => void
  onMax?: () => void
  showMaxButton: boolean
  label?: ReactNode
  onCurrencySelect?: (currency: Currency) => void
  currency?: (Currency & { tokenInfo?: { decimals?: number } }) | null
  hideBalance?: boolean
  pair?: Pair | null
  hideInput?: boolean
  otherCurrency?: Currency | null
  fiatValue?: CurrencyAmount<Token> | null
  priceImpact?: Percent
  id: string
  showCommonBases?: boolean
  renderBalance?: (amount: CurrencyAmount<Currency>) => ReactNode
  locked?: boolean
  title?: ReactNode
}

export default function CurrencyInputPanel({
  value,
  onUserInput,
  onMax,
  showMaxButton,
  onCurrencySelect,
  currency,
  otherCurrency,
  id,
  showCommonBases,
  renderBalance,
  fiatValue,
  priceImpact,
  hideBalance = false,
  pair = null, // used for double token logo
  hideInput = false,
  locked = false,
  title,
  ...rest
}: CurrencyInputPanelProps) {
  const [modalOpen, setModalOpen] = useState(false)
  const { account } = useActiveWeb3React()
  const selectedCurrencyBalance = useCurrencyBalance(account ?? undefined, currency ?? undefined)
  const theme = useTheme()

  const decimals = (currency?.tokenInfo?.decimals ?? 18) > 4 ? 4 : currency?.tokenInfo?.decimals ?? 18

  const handleDismissSearch = useCallback(() => {
    setModalOpen(false)
  }, [setModalOpen])

  const onChangeInput = (val: string) => {
    const floatingPart = val.split('.')[1]
    const inputDecimals = currency?.decimals || (currency as any)?.tokenInfo?.decimals || 2
    if (floatingPart && currency && inputDecimals < floatingPart.length) return
    onUserInput(val)
  }

  return (
    <InputPanel id={id} hideInput={hideInput} {...rest}>
      {locked && (
        <FixedContainer>
          <AutoColumn gap="sm" justify="center">
            <Lock />
            <TYPE.label fontSize="12px" textAlign="center" padding="0 12px">
              <Trans>The market price is outside your specified price range. Single-asset deposit only.</Trans>
            </TYPE.label>
          </AutoColumn>
        </FixedContainer>
      )}

      <NewContainer hideInput={hideInput}>
        <InputRow style={hideInput ? { padding: '0', borderRadius: '8px' } : {}} selected={!onCurrencySelect}>
          {!hideInput && (
            <>
              <NumericalInput
                className="token-amount-input"
                data-testid="token-amount-input"
                value={value}
                onUserInput={onChangeInput}
              />
            </>
          )}
          {showMaxButton && selectedCurrencyBalance ? (
            <StyledBalanceMax onClick={onMax}>
              <Trans>Max</Trans>
            </StyledBalanceMax>
          ) : null}
          <CurrencySelect
            selected={!!currency}
            hideInput={hideInput}
            className="open-currency-select-button"
            data-testid="chooseTokenDropdown"
            onClick={() => {
              if (onCurrencySelect) {
                setModalOpen(true)
              }
            }}
          >
            <Aligner>
              <RowFixed
                style={{
                  border: '1px solid #E6E6FF',
                  padding: '5px 12px 5px 12px',
                  background: '#FFFFFF',
                  borderRadius: 6,
                }}
              >
                <AssetLogo pair={pair} currency={currency} />
                {pair ? (
                  <StyledTokenName className="pair-name-container">
                    {pair?.token0.symbol}:{pair?.token1.symbol}
                  </StyledTokenName>
                ) : (
                  <StyledTokenName className="token-symbol-container" active={Boolean(currency && currency.symbol)}>
                    {formatCurrencySymbol({ currency }) || (
                      <Box>
                        <StyledChooseToken>
                          <Trans>Choose Token</Trans>
                        </StyledChooseToken>
                      </Box>
                    )}
                  </StyledTokenName>
                )}
                <NewDropDown />
              </RowFixed>
              {/* {onCurrencySelect && <StyledDropDown selected={!!currency} />} */}
            </Aligner>
          </CurrencySelect>
        </InputRow>
        {!hideInput && !hideBalance && (
          <FiatRow>
            <FiatValue fiatValue={fiatValue} priceImpact={priceImpact} />
            <BalanceRow>
              {account ? (
                <BalanceWrap style={{ marginTop: '10px' }}>
                  <TYPE.body
                    onClick={onMax}
                    color={theme.text11}
                    fontWeight={400}
                    fontSize={14}
                    style={{ display: 'inline', cursor: 'pointer' }}
                  >
                    {!hideBalance && currency && selectedCurrencyBalance ? (
                      renderBalance ? (
                        renderBalance(selectedCurrencyBalance)
                      ) : (
                        <Trans>
                          Balance:
                          <span style={{ color: '#292933', fontWeight: 600, marginLeft: 4 }}>
                            {formatCurrencyAmount(selectedCurrencyBalance, decimals)} {currency.symbol}
                          </span>
                        </Trans>
                      )
                    ) : null}
                  </TYPE.body>
                </BalanceWrap>
              ) : (
                <span />
              )}
            </BalanceRow>
          </FiatRow>
        )}
      </NewContainer>

      {/* <Container hideInput={hideInput}>
          <InputRow style={hideInput ? { padding: '0', borderRadius: '8px' } : {}} selected={!onCurrencySelect}>
            {!hideInput && (
              <>
                <NumericalInput
                  className="token-amount-input"
                  data-testid="token-amount-input"
                  value={value}
                  onUserInput={onChangeInput}
                />
              </>
            )}
            {showMaxButton && selectedCurrencyBalance ? (
              <StyledBalanceMax onClick={onMax}>
                <Trans>Max</Trans>
              </StyledBalanceMax>
            ) : null}
            <CurrencySelect
              style={{ backgroundColor: '#372E5E' }}
              selected={!!currency}
              hideInput={hideInput}
              className="open-currency-select-button"
              data-testid="chooseTokenDropdown"
              onClick={() => {
                if (onCurrencySelect) {
                  setModalOpen(true)
                }
              }}
            >
              <Aligner>
                <RowFixed>
                  <AssetLogo pair={pair} currency={currency} />
                  {pair ? (
                    <StyledTokenName className="pair-name-container">
                      {pair?.token0.symbol}:{pair?.token1.symbol}
                    </StyledTokenName>
                  ) : (
                    <StyledTokenName className="token-symbol-container" active={Boolean(currency && currency.symbol)}>
                      {formatCurrencySymbol({ currency }) || <Trans>Choose token</Trans>}
                    </StyledTokenName>
                  )}
                </RowFixed>
                {onCurrencySelect && <StyledDropDown selected={!!currency} />}
              </Aligner>
            </CurrencySelect>
          </InputRow>
          {!hideInput && !hideBalance && (
            <FiatRow>
              <FiatValue fiatValue={fiatValue} priceImpact={priceImpact} />
              <BalanceRow>
                {account ? (
                  <BalanceWrap>
                    <TYPE.body
                      onClick={onMax}
                      color={theme.text2}
                      fontWeight={400}
                      fontSize={14}
                      style={{ display: 'inline', cursor: 'pointer' }}
                    >
                      {!hideBalance && currency && selectedCurrencyBalance ? (
                        renderBalance ? (
                          renderBalance(selectedCurrencyBalance)
                        ) : (
                          <Trans>
                            Balance: {formatCurrencyAmount(selectedCurrencyBalance, decimals)} {currency.symbol}
                          </Trans>
                        )
                      ) : null}
                    </TYPE.body>
                  </BalanceWrap>
                ) : (
                  <span />
                )}
              </BalanceRow>
            </FiatRow>
          )}
        </Container> */}

      {onCurrencySelect && (
        <CurrencySearchModal
          isOpen={modalOpen}
          title={title}
          onDismiss={handleDismissSearch}
          onCurrencySelect={onCurrencySelect}
          selectedCurrency={currency}
          otherSelectedCurrency={otherCurrency}
          showCommonBases={showCommonBases}
        />
      )}
    </InputPanel>
  )
}
