import React from 'react'
import styled, { useTheme } from 'styled-components'

import { ArrowDown, ChevronDown } from 'react-feather'

import { BigNumber, utils } from 'ethers'

import { Offer } from 'state/launchpad/types'

import { InvestTextField } from './InvestTextField'
import { useTokensList } from 'hooks/useTokensList'
import { useFormatOfferValue } from 'state/launchpad/hooks'

interface Props {
  offer: Offer
}

export const ConvertationField: React.FC<Props> = (props) => {
  const theme = useTheme()
  
  const { tokensOptions } = useTokensList()
  const formatedValue = useFormatOfferValue()

  const [inputValue, setInputValue] = React.useState('')

  const convertedValue = React.useMemo(() => {
    if (inputValue) {
      /*const bnMultiplier = utils.parseUnits('1', DECIMAL).mod(utils.parseUnits(props.offer.tokenPrice, DECIMAL))
      const bnResult = utils.parseUnits(inputValue, DECIMAL)
      const result = bnMultiplier.mul(bnResult)

      return utils.formatEther((result as any).toString(10))*/
      const multiplier = (1 / +props.offer.tokenPrice).toFixed(4)
      let result = `${+(inputValue.replace(/,/g, '')) * +multiplier}`

      if (result.split('.')[1]?.length > 4) {
        result = (+result).toFixed(4)
      }

      return formatedValue(result)
    }

    return inputValue
  }, [inputValue])

  const offerToken = React.useMemo(() => {
    const token = tokensOptions
      .find(x => props.offer.tokenAddress === x.address ||
          props.offer.tokenAddress === x.value)

    if (!token) {
      return
    }

    return {
      name: token.label,
      address: token.address,
      icon: token.icon,
    } as TokenOption
  }, [tokensOptions])

  const offerInvestmentToken = React.useMemo(() => {
    const token = tokensOptions
      .find(x => props.offer.investingTokenAddress === x.address ||
          props.offer.investingTokenAddress === x.value)

    if (!token) {
      return
    }

    return {
      name: token.label,
      address: token.address,
      icon: token.icon,
    } as TokenOption
  }, [tokensOptions])

  return (
    <ConvertationContainer>
      <InvestTextField 
        type='number'
        onChange={setInputValue}
        
        trailing={<CurrencyDropdown disabled value={offerInvestmentToken} />}

        // padding="1rem 1.5rem"
        height="90px"

        fontSize='24px'
        lineHeight='29px'
      />
      
      <InvestTextField 
        type='number'
        disabled
        value={convertedValue}
        onChange={() => null}

        trailing={<CurrencyDropdown disabled value={offerToken} />}
        
        // padding="2rem 1.5rem"
        height="90px"
        
        fontSize='24px'
        lineHeight='29px'
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

  background: ${props => props.theme.launchpad.colors.foreground};
  border: 8px solid ${props => props.theme.launchpad.colors.background};
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

  const options = React.useMemo(() => tokensOptions.map(token => ({ 
    name: token.label, 
    address: token.address, 
    icon: token.icon 
  } as TokenOption)), [tokensOptions])

  const toggleShowTokens = React.useCallback(() => {
    if (props.disabled) {
      return
    }

    setShowTokens(state => !state)
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
          {options.map(token => (
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
  justiy-content: space-between;
  align-items: center;
  
  gap: 0.5rem;

  padding: 0.5rem;

  min-width: 80px;

  background: ${props => props.theme.launchpad.colors.background};
  border: 1px solid ${props => props.theme.launchpad.colors.border.default};
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
  background: ${props => props.theme.launchpad.colors.background};
  border-radius: 8px;
`

const TokenListEntry = styled.div`
  display: flex;

  flex-flow: row nowrap;
  align-items: center;

  gap: 0.5rem;
  padding: 0.25rem 1rem;

  height: 20px;

  font-style: normal;
  font-weight: 700;
  font-size: 13px;

  line-height: 16px;
  letter-spacing: -0.02em;

  color: ${props => props.theme.launchpad.colors.text.title};

  :hover {
    background: ${props => props.theme.launchpad.colors.foreground};
  }
`