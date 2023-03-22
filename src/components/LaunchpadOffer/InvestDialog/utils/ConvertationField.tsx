import React, { useCallback } from 'react'
import styled, { useTheme } from 'styled-components'

import { ArrowDown, ChevronDown } from 'react-feather'

import { Offer, OfferStatus } from 'state/launchpad/types'
import { InvestTextField } from './InvestTextField'

import { useActiveWeb3React } from 'hooks/web3'
import { Option, useTokensList } from 'hooks/useTokensList'
import { useCurrency } from 'hooks/Tokens'

import { useCurrencyBalance } from 'state/wallet/hooks'
import { useFormatOfferValue, useDerivedBalanceInfo } from 'state/launchpad/hooks'
import { text35 } from 'components/LaunchpadMisc/typography'

interface Props {
  offer: Offer
  setDisabled: (value: boolean) => void
  onChange: (value: string) => void
}

const getTokenInfo = (address: string, options: Option[]) => {
  if (!address) {
    return
  }
  const token = options.find(
    (x) =>
      address.toLowerCase() === x.address?.toLowerCase() || address.toLowerCase() === x.value.toString().toLowerCase()
  )

  if (!token) {
    return
  }

  return {
    name: token.label,
    address: token.address ?? token.value,
    icon: token.icon,
  } as TokenOption
}

export const useGetWarning = (offer: Offer) => {
  const { account } = useActiveWeb3React()
  const inputCurrency = useCurrency(offer.investingTokenAddress)
  const balance = useCurrencyBalance(account ?? undefined, inputCurrency ?? undefined)
  const isSufficientBalance = useDerivedBalanceInfo(offer.id)
  return useCallback(
    (value: string) => {
      const isPresale = offer.status !== OfferStatus.sale
      const realValue = value ? Number(value.replace(/,/g, '')) : 0
      const min = isPresale ? offer.presaleMinInvestment : offer.minInvestment
      const max = isPresale ? offer.presaleMaxInvestment : offer.maxInvestment
      const total = isPresale ? offer.presaleAlocated : offer.hardCap
      const available = +total - offer.totalInvestment

      const isInsufficientBalance = !isSufficientBalance(value, inputCurrency, balance)
      let warning = ''
      if (isInsufficientBalance) {
        warning = `Insufficient balance`
      } else if(value === '') {
        warning = `Please enter amount of your estimated investment`
      } else if (Number(min) > realValue) {
        warning = `Min. investment size ${min} ${offer.investingTokenSymbol}`
      } else if (Number(max) < realValue) {
        warning = `Max. investment size ${max} ${offer.investingTokenSymbol}`
      } else if (available < realValue) {
        warning = `Available to invest ${available} ${offer.investingTokenSymbol}`
      }
      return warning
    },
    [offer]
  )
}

export const ConvertationField: React.FC<Props> = (props) => {
  const theme = useTheme()

  const { tokensOptions, secTokensOptions } = useTokensList()
  const mixedTokens = React.useMemo(() => [...tokensOptions, ...secTokensOptions], [tokensOptions, secTokensOptions])
  const getWarning = useGetWarning(props.offer)
  const formatedValue = useFormatOfferValue()

  const [inputValue, setInputValue] = React.useState('')
  const [warning, setWarning] = React.useState('')

  const changeValue = React.useCallback((value: string) => {
    setInputValue(value)

    const warning = getWarning(value)
    setWarning(getWarning(value))
    props.setDisabled(Boolean(warning))

    props.onChange(
      value
        .split('')
        .filter((x) => /[0-9.]/.test(x))
        .join('')
    )
  }, [])

  const convertedValue = React.useMemo(() => {
    if (inputValue) {
      const realValue = +inputValue.replace(/,/g, '')
      const multiplier = (1 / +props.offer.tokenPrice).toFixed(4)

      let result = `${realValue * +multiplier}`

      if (result.split('.')[1]?.length > 4) {
        result = (+result).toFixed(4)
      }

      return formatedValue(result)
    }

    return inputValue
  }, [inputValue])

  const offerToken = React.useMemo(() => getTokenInfo(props.offer.tokenAddress, mixedTokens), [mixedTokens])
  const offerInvestmentToken = React.useMemo(
    () => getTokenInfo(props.offer.investingTokenAddress, mixedTokens),
    [mixedTokens]
  )

  return (
    <ConvertationContainer>
      <InvestTextField
        type="number"
        onChange={changeValue}
        trailing={<CurrencyDropdown disabled value={offerInvestmentToken} />}
        caption={warning}
        height="90px"
        fontSize="24px"
        lineHeight="29px"
      />

      <InvestTextField
        type="number"
        disabled
        value={convertedValue}
        onChange={() => null}
        trailing={<CurrencyDropdown disabled value={offerToken} />}
        // padding="2rem 1.5rem"
        height="90px"
        fontSize="24px"
        lineHeight="29px"
      />

      <ConvertationArrow>
        <ArrowDown color={theme.launchpad.colors.primary} size="18" />
      </ConvertationArrow>
    </ConvertationContainer>
  )
}

const ConvertationContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: stretch;
  gap: 1rem;
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

  const onSelect = React.useCallback((token: TokenOption) => {
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

  const toggleShowTokens = React.useCallback(() => {
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
