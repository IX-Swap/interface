import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import styled, { useTheme } from 'styled-components'
import { ArrowDown, ChevronDown } from 'react-feather'
import JSBI from 'jsbi'

import { Offer, OfferStatus } from 'state/launchpad/types'
import { InvestTextField } from './InvestTextField'

import { useActiveWeb3React } from 'hooks/web3'
import { Option, useTokensList } from 'hooks/useTokensList'
import { useCurrency } from 'hooks/Tokens'

import { LoadingIndicator } from 'components/LoadingIndicator'
import { useDerivedBalanceInfo } from 'state/launchpad/hooks'
import { text35 } from 'components/LaunchpadMisc/typography'
import CurrencyLogo from 'components/CurrencyLogo'
import { Currency, CurrencyAmount } from '@ixswap1/sdk-core'
import Loader from 'components/Loader'
import { RowBetween } from 'components/Row'
import { formatCurrencyAmount } from 'utils/formatCurrencyAmount'
import { BuyModal } from '../BuyModal'
import { useTokenContract } from 'hooks/useContract'
import { getTokenSymbol } from 'components/LaunchpadOffer/OfferSidebar/OfferDetails'

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
      warning = `Max Amount to invest ${availableToInvest} ${getTokenSymbol(
        offer?.network,
        offer?.investingTokenSymbol
      )}`
    } else if (Number(min) > realValue) {
      warning = `Min. investment size ${min} ${getTokenSymbol(offer?.network, offer?.investingTokenSymbol)}`
    } else if (Number(max) < realValue) {
      warning = `Max. investment size ${max} ${getTokenSymbol(offer?.network, offer?.investingTokenSymbol)}`
    } else if (available < realValue) {
      warning = `Available to invest ${available} ${getTokenSymbol(offer?.network, offer?.investingTokenSymbol)}`
    } else if (isCheckBalance && !isSufficientBalance) {
      warning = `Insufficient ${getTokenSymbol(offer?.network, offer?.investingTokenSymbol)} balance`
    }
    return warning
  }

  return getWarning
}

export const ConvertationField: React.FC<Props> = (props) => {
  const theme = useTheme()
  const {
    tokenPrice,
    tokenAddress,
    tokenSymbol,
    investingTokenAddress,
    investingTokenSymbol,
    investingTokenDecimals,
    network,
  } = props.offer
  const decimalsLimit = Math.min(2, investingTokenDecimals)
  const { tokensOptions, secTokensOptions } = useTokensList()
  const mixedTokens = React.useMemo(() => [...tokensOptions, ...secTokensOptions], [tokensOptions, secTokensOptions])
  const getWarning = useGetWarning(props.offer, true)
  const insufficientWarning = `Insufficient ${getTokenSymbol(network, investingTokenSymbol)} balance`
  const { account } = useActiveWeb3React()
  const inputCurrency = useCurrency(investingTokenAddress)
  const investingTokenContract = useTokenContract(investingTokenAddress)
  const isSufficientBalanceFn = useDerivedBalanceInfo(props.offer.id)

  const [openPreviewModal, setPreviewModal] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [warning, setWarning] = useState('')
  const [isBalanceLoading, setIsBalanceLoading] = useState(false)
  const [balance, setBalance] = useState<CurrencyAmount<Currency> | undefined>(undefined)

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
    if (isBalanceLoading && start.current == 0) {
      start.current = performance.now()
      console.log('start', start)
    }

    if (!isBalanceLoading && end.current == 0) {
      end.current = performance.now()
      console.log('\x1B[31mTime to load balance', (end.current - start.current) / 1000)
      start.current = 0
      end.current = 0
    }
    console.log('Balance updated', balance?.toExact(), balance?.toFixed(), balance?.toSignificant())
  }, [balance, isBalanceLoading])

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
  const offerInvestmentToken: TokenOption | undefined = React.useMemo(
    () => getTokenInfo(investingTokenAddress, investingTokenSymbol, offerInvestmentTokenCurrency, mixedTokens),
    [investingTokenAddress, investingTokenSymbol, offerInvestmentTokenCurrency, mixedTokens]
  )

  const openModal = () => {
    setPreviewModal(true)
  }

  const closeModal = () => {
    setPreviewModal(false)
  }

  const formatTokenOption = (tokenOption: any) => {
    if (!tokenOption) return undefined
    const formattedName = getTokenSymbol(props?.offer?.network, props?.offer?.investingTokenSymbol)
    return { ...tokenOption, name: formattedName }
  }

  const fetchTokenBalance = async () => {
    setIsBalanceLoading(true)
    try {
      if (!account || !investingTokenContract || !inputCurrency) {
        return
      }
      const value = await investingTokenContract.balanceOf(account)

      const amount =
        value && inputCurrency ? CurrencyAmount.fromRawAmount(inputCurrency, JSBI.BigInt(value.toString())) : undefined
      setBalance(amount)

      if (amount !== undefined) {
        setIsBalanceLoading(false)
      }
    } catch (error) {
      console.error('Error fetching token balance', error)
      setIsBalanceLoading(false)
    }
  }

  useEffect(() => {
    fetchTokenBalance()
  }, [account, investingTokenContract?.address, inputCurrency?.chainId])

  return (
    <>
      {openPreviewModal && <BuyModal isOpen onClose={closeModal} />}
      <LoadingIndicator isLoading={isBalanceLoading} />
      <ConvertationContainer>
        <InvestTextField
          type="number"
          onChange={changeValue}
          disabled={isBalanceLoading}
          trailing={<CurrencyDropdown disabled value={formatTokenOption(offerInvestmentToken)} />}
          caption={insufficientWarning === warning ? '' : warning === 'Loading' ? <Loader /> : warning}
          fontSize="20px"
          lineHeight="20px"
          decimalsLimit={decimalsLimit}
        />
        <InvestTextField
          type="number"
          value={convertedValue}
          onChange={() => null}
          trailing={<CurrencyDropdown disabled value={offerToken} />}
          disabled
          fontSize="20px"
          lineHeight="20px"
        />
        <ConvertationArrow>
          <ArrowDown color={theme.launchpad.colors.primary} size="14" />
        </ConvertationArrow>
      </ConvertationContainer>

      <FlexContainer border={true} flexDirection="row" padding="0.55rem 1.5rem">
        <RowBetween>
          <FlexContainer flexDirection="column">
            <WarningContainer style={{ fontSize: '0.7rem' }}>{warning}</WarningContainer>
            <div>
              {offerInvestmentToken && (
                <Trailing fontSize="0.7rem" fontWeight="500" style={{ display: 'flex', alignItems: 'center' }}>
                  <span style={{ marginRight: 5 }}>Balance: </span>
                  {formatCurrencyAmount(balance, balance?.currency?.decimals ?? 18)}
                  <span style={{ margin: '0px 5px' }}>{offerInvestmentToken.name} </span>
                  <span style={{ paddingTop: 2, transform: 'scale(0.8)' }}>{offerInvestmentToken.icon}</span>
                </Trailing>
              )}
            </div>
          </FlexContainer>
          {insufficientWarning === warning ? <InvestButton onClick={openModal}>Buy Now</InvestButton> : null}
        </RowBetween>
      </FlexContainer>
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
  width: 42px;
  height: 42px;
  background-color: rgb(249, 249, 249);
  border-color: rgb(255, 255, 255);
  border-radius: 16px;
  border-style: solid;
  border-width: 4px;
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
