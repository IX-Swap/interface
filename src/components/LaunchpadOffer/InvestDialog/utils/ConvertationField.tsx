import React, { useCallback, useMemo, useRef } from 'react'
import styled, { useTheme } from 'styled-components'

import { ArrowDown, ChevronDown } from 'react-feather'

import { Offer, OfferStatus } from 'state/launchpad/types'
import { InvestTextField } from './InvestTextField'

import { useActiveWeb3React } from 'hooks/web3'
import { Option, useTokensList } from 'hooks/useTokensList'
import { useCurrency } from 'hooks/Tokens'

import { useSimpleTokenBalanceWithLoading } from 'state/wallet/hooks'
import { useDerivedBalanceInfo } from 'state/launchpad/hooks'
import { text35 } from 'components/LaunchpadMisc/typography'
import CurrencyLogo from 'components/CurrencyLogo'
import { Currency } from '@ixswap1/sdk-core'
import Loader from 'components/Loader'
import { RowBetween } from 'components/Row'
import { formatCurrencyAmount } from 'utils/formatCurrencyAmount'
import { BuyModal } from '../BuyModal'

interface Props {
  offer: Offer
  setDisabled: (value: boolean) => void
  onChange: (value: string) => void
  availableToInvest?: number
}

const getTokenInfo = (address: string, symbol: string, currency: Currency | null | undefined, options: Option[]) => {
  if (!address) {
    return
  }
  const token = options.find(
    (x) =>
      address.toLowerCase() === x.address?.toLowerCase() || address.toLowerCase() === x.value.toString().toLowerCase()
  )

  if (!token) {
    return {
      name: symbol,
      address,
      icon: <CurrencyLogo currency={currency} />,
    } as TokenOption
  }

  return {
    name: token.label,
    address: token.address ?? token.value,
    icon: token.icon,
  } as TokenOption
}

export const useGetWarning = (offer: Offer, isCheckBalance = false) => {
  const getWarning = (value: string, isSufficientBalance?: boolean, availableToInvest?: number) => {
    const isPresale = offer.status !== OfferStatus.sale
    const realValue = value ? Number(value.replace(/,/g, '')) : 0
    const min = isPresale ? offer.presaleMinInvestment : offer.minInvestment
    const max = isPresale ? offer.presaleMaxInvestment : offer.maxInvestment
    const total = isPresale ? offer.presaleAlocated : offer.hardCap
    const available = +total - offer.totalInvestment

    let warning = ''
    if (value === '') {
      warning = ''
    } else if (typeof availableToInvest === 'number' && realValue > availableToInvest) {
      warning = `Max Amount to invest ${availableToInvest} ${offer.investingTokenSymbol}`
    } else if (Number(min) > realValue) {
      warning = `Min. investment size ${min} ${offer.investingTokenSymbol}`
    } else if (Number(max) < realValue) {
      warning = `Max. investment size ${max} ${offer.investingTokenSymbol}`
    } else if (available < realValue) {
      warning = `Available to invest ${available} ${offer.investingTokenSymbol}`
    } else if (isCheckBalance && !isSufficientBalance) {
      warning = `Insufficient ${offer.investingTokenSymbol} balance`
    }
    return warning
  }

  return getWarning
}

export const ConvertationField: React.FC<Props> = (props) => {
  const theme = useTheme()

  const { tokenPrice, tokenAddress, tokenSymbol, investingTokenAddress, investingTokenSymbol, investingTokenDecimals } =
    props.offer

  const { tokensOptions, secTokensOptions } = useTokensList()
  const mixedTokens = React.useMemo(() => [...tokensOptions, ...secTokensOptions], [tokensOptions, secTokensOptions])

  const getWarning = useGetWarning(props.offer, true)
  const insufficientWarning = `Insufficient ${investingTokenSymbol} balance`

  const [inputValue, setInputValue] = React.useState('')
  const [warning, setWarning] = React.useState('')
  const { account } = useActiveWeb3React()
  const inputCurrency = useCurrency(investingTokenAddress)
  const { amount: balance, loading: balanceIsLoading } = useSimpleTokenBalanceWithLoading(
    account,
    inputCurrency,
    investingTokenAddress
  )
  const [openPreviewModal, setPreviewModal] = React.useState(false)
  const isSufficientBalanceFn = useDerivedBalanceInfo(props.offer.id)

  const changeValue = (value: string) => {
    setInputValue(value)
    const isBalanceSufficient = isSufficientBalanceFn(value, inputCurrency, balance) || false
    const newWarning = getWarning(value, isBalanceSufficient, props.availableToInvest)

    setWarning(newWarning)
    props.setDisabled(Boolean(newWarning) || !value)

    props.onChange(
      value
        .split('')
        .filter((x) => /[0-9.]/.test(x))
        .join('')
    )
  }

  // DEBUGGING CODE - DON'T REMOVE THIS
  const start: any = useRef<number>(0)
  const end: any = useRef<number>(0)
  useMemo(() => {
    if (balanceIsLoading && start.current == 0) {
      start.current = performance.now()
      console.log('start', start)
    }

    if (!balanceIsLoading && end.current == 0) {
      end.current = performance.now()
      console.log('\x1B[31mTime to load balance', (end.current - start.current) / 1000)
      start.current = 0
      end.current = 0
    }
    console.log('Balance updated', balance?.toExact(), balance?.toFixed(), balance?.toSignificant())
  }, [balance, balanceIsLoading])

  const convertedValue = React.useMemo(() => {
    if (inputValue) {
      const realValue = +inputValue.replace(/,/g, '')
      const multiplier = (1 / +tokenPrice).toFixed(6)

      let result = `${realValue * +multiplier}`

      result = (+result).toFixed(4)
      return parseFloat(result).toString()
    }

    return inputValue
  }, [inputValue])

  const offerTokenCurrency = useCurrency(tokenAddress)
  const offerInvestmentTokenCurrency = useCurrency(investingTokenAddress)

  const offerToken = React.useMemo(
    () => getTokenInfo(tokenAddress, tokenSymbol, offerTokenCurrency, mixedTokens),
    [tokenAddress, tokenSymbol, offerTokenCurrency, mixedTokens]
  )
  const offerInvestmentToken = React.useMemo(
    () => getTokenInfo(investingTokenAddress, investingTokenSymbol, offerInvestmentTokenCurrency, mixedTokens),
    [investingTokenAddress, investingTokenSymbol, offerInvestmentTokenCurrency, mixedTokens]
  )

  const openModal = () => {
    setPreviewModal(true)
  }

  const closeModal = () => {
    setPreviewModal(false)
  }

  return (
    <>
      {openPreviewModal && <BuyModal isOpen onClose={closeModal} />}
      <ConvertationContainer>
        <InvestTextField
          type="number"
          onChange={changeValue}
          trailing={<CurrencyDropdown disabled value={offerInvestmentToken} />}
          caption={insufficientWarning === warning ? '' : warning === 'Loading' ? <Loader /> : warning}
          // height="85px"
          fontSize="20px"
          lineHeight="20px"
          decimalsLimit={investingTokenDecimals}
        />
        <InvestTextField
          type="number"
          value={convertedValue}
          onChange={() => null}
          trailing={<CurrencyDropdown disabled value={offerToken} />}
          // height="85px"
          fontSize="20px"
          lineHeight="20px"
        />
        <ConvertationArrow>
          <ArrowDown color={theme.launchpad.colors.primary} size="14" />
        </ConvertationArrow>
      </ConvertationContainer>
      {insufficientWarning === warning && (
        <FlexContainer border={true} flexDirection="row" padding="0.4rem 1.5rem">
          <RowBetween>
            <FlexContainer flexDirection="column" gap={'0.35rem'}>
              <WarningContainer style={{ fontSize: '0.7rem' }}>{warning}</WarningContainer>
              <div>
                {offerInvestmentToken && (
                  <Trailing fontSize="0.7rem" fontWeight="500">
                    {formatCurrencyAmount(balance, balance?.currency?.decimals ?? 18)}
                    <span style={{ margin: '0px 5px' }}>{offerInvestmentToken.name} </span>
                    <span style={{ marginTop: '-2px', transform: 'scale(0.8)' }}>{offerInvestmentToken.icon}</span>
                  </Trailing>
                )}
              </div>
            </FlexContainer>
            <InvestButton onClick={openModal}>Buy Now</InvestButton>
          </RowBetween>
        </FlexContainer>
      )}
    </>
  )
}

const FlexContainer = styled.div<{ border?: boolean; padding?: string; flexDirection?: string; gap?: string }>`
  display: flex;
  flex-flow: ${(props) => props.flexDirection} nowrap;
  justify-content: center;
  align-items: start-end;
  ${(props) => (props.gap ? `gap: ${props.gap}` : '')};
  ${(props) => `padding: ${props.padding ?? ''}`};
  ${({ border }) =>
    border
      ? `border: 1px solid #E6E6FF;
    border-radius: 10px;`
      : ''};
`

const WarningContainer = styled.div`
  color: red;
  font-size: 13px;
`

const Trailing = styled.div<{ fontSize?: string; fontWeight?: string }>`
  grid-area: trailing;
  place-self: center end;
  height: fit-content;
  color: black;
  display: flex;
  font-size: ${(props) => props.fontSize ?? '20px'};
  ${(props) => (props.fontWeight ? `font-weight: ${props.fontWeight}` : '')};
`

const InvestButton = styled.button`
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  background: ${(props) => props.theme.launchpad.colors.primary};
  color: ${(props) => props.theme.launchpad.colors.foreground};
  border: 1px solid ${(props) => props.theme.launchpad.colors.primary};
  border-radius: 6px;
  padding: 0.65rem;
  cursor: pointer;
  width: 25%;
  text-align: center;
  font-weight: 700;
  font-size: 12px;
`

const ConvertationContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: stretch;
  gap: 0.4rem;
  position: relative;
`

const ConvertationArrow = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: grid;
  place-content: center;
  width: 48px;
  height: 48px;
  background: ${(props) => props.theme.launchpad.colors.foreground};
  border: 8px solid ${(props) => props.theme.launchpad.colors.background};
  border-radius: 16px;
`

interface TokenOption {
  name: string
  address: string
  icon: JSX.Element
}

interface DropdownProps {
  value?: TokenOption
  disabled?: boolean
}

const CurrencyDropdown: React.FC<DropdownProps> = (props) => {
  const { tokensOptions } = useTokensList()

  const [selected, setSelected] = React.useState<TokenOption | undefined>(props.value)
  const [showTokens, setShowTokens] = React.useState(false)

  const onSelect = useCallback((token: TokenOption) => {
    setSelected(token)
    setShowTokens(false)
  }, [])

  const options = React.useMemo(
    () =>
      tokensOptions.map(
        (token) =>
          ({
            name: token.label,
            address: token.address,
            icon: token.icon,
          } as TokenOption)
      ),
    [tokensOptions]
  )

  const toggleShowTokens = useCallback(() => {
    if (props.disabled) {
      return
    }

    setShowTokens((state) => !state)
  }, [])

  return (
    <DropdownWrapper>
      <DropdownButton onClick={toggleShowTokens}>
        {selected && (
          <SelectedCurrency>
            {selected.icon} {selected.name}
          </SelectedCurrency>
        )}

        {!props.disabled && <ChevronDown size="10" />}
      </DropdownButton>

      {showTokens && (
        <TokenList>
          {options.map((token) => (
            <TokenListEntry key={`token-${token.name}`} onClick={() => onSelect(token)}>
              {token.icon} {token.name}
            </TokenListEntry>
          ))}
        </TokenList>
      )}
    </DropdownWrapper>
  )
}

const DropdownWrapper = styled.div`
  position: relative;
`

const DropdownButton = styled.button`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  min-width: 80px;
  background: ${(props) => props.theme.launchpad.colors.background};
  border: 1px solid ${(props) => props.theme.launchpad.colors.border.default};
  border-radius: 8px;
`

const SelectedCurrency = styled.div`
  font-weight: bold;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  gap: 0.5rem;
`

const TokenList = styled.div`
  position: absolute;
  z-index: 40;
  display: flex;
  flex-flow: column nowrap;
  align-items: stretch;
  gap: 0.5rem;
  max-height: 200px;
  overflow-y: scroll;
  padding: 1rem;
  background: ${(props) => props.theme.launchpad.colors.background};
  border-radius: 8px;
`

const TokenListEntry = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  gap: 0.5rem;
  padding: 0.25rem 1rem;
  height: 20px;

  ${text35}
  color: ${(props) => props.theme.launchpad.colors.text.title};

  :hover {
    background: ${(props) => props.theme.launchpad.colors.foreground};
  }
`
