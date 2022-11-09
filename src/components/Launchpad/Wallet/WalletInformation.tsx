import React from 'react'
import styled from 'styled-components'

import { useETHBalances } from 'state/wallet/hooks'
import { useNativeCurrency } from 'hooks/useNativeCurrencyName'

import { CHAIN_INFO, NETWORK_LABELS } from 'constants/chains'
import { ENV_SUPPORTED_TGE_CHAINS } from 'constants/addresses'


import { shortenAddress } from 'utils'
import { formatAmount } from 'utils/formatCurrencyAmount'

import { VioletCard } from 'components/Card'
import { ChevronElement } from 'components/ChevronElement'
import { NetworkCard } from 'components/Header/NetworkCard'

import useTheme from 'hooks/useTheme'

import { useActiveWeb3React } from 'hooks/web3'
import { switchToNetwork } from 'hooks/switchToNetwork'

import { ChevronDown } from 'react-feather'


export const WalletInformation = () => {
  const { chainId, library, account } = useActiveWeb3React()

  const theme = useTheme()
  
  const userEthBalance = useETHBalances(account ? [account] : [])?.[account ?? '']
  const nativeCurrency = useNativeCurrency()
  
  const [networkMenuOpen, setNetworkMenyOpen] = React.useState(false)

  const toggleNetworkMenu = React.useCallback(() => setNetworkMenyOpen(state => !state), [])

  const onNetworkSelect = React.useCallback(
    (targetChain: number) => {
      if (chainId !== targetChain && library && library?.provider?.isMetaMask) {
        switchToNetwork({ library, chainId: targetChain })
        toggleNetworkMenu()
      }
    },
    [chainId, library, toggleNetworkMenu]
  )

  return (
    <WalletInfoContainer>
      <WalletBalance>
        {formatAmount(+(userEthBalance?.toSignificant(4) || 0))} {nativeCurrency}
      </WalletBalance>
      <WalletAddress>
        {shortenAddress(account!, 5)}
      </WalletAddress>
      
      <NetworkSelector>
        <NetworkSelectorControls onClick={() => toggleNetworkMenu()}>
          <Logo src={CHAIN_INFO[chainId!].logoUrl} />
          <DropdownControl open={networkMenuOpen}>
            <ChevronDown size="20" color={theme.launchpad.colors.text.title} />
          </DropdownControl>
        </NetworkSelectorControls>

        {networkMenuOpen && (
          <NetworkMenu>
            <NetworkMenuHeader>
              Select a network
            </NetworkMenuHeader>

            {(ENV_SUPPORTED_TGE_CHAINS || [42]).map((networkChainId) => (
              <NetworkOption key={networkChainId} onClick={() => onNetworkSelect(networkChainId)}>
                <Logo src={CHAIN_INFO[networkChainId].logoUrl} />
                <NetworkLabel>{NETWORK_LABELS[networkChainId]}</NetworkLabel>
                {chainId === networkChainId && <FlyoutRowActiveIndicator />}
              </NetworkOption>
            ))}
          </NetworkMenu>
        )}
      </NetworkSelector>
    </WalletInfoContainer>
  )
}

const WalletInfoContainer = styled.div`
  display: flex;

  align-items: center;

  padding: 0.25rem 0.5rem;

  gap: 0.5rem;


  border: 1.3px solid ${props => props.theme.launchpad.colors.border.default};
  border-radius: 8px;
`

const WalletBalance = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 13px;

  line-height: 16px;
  letter-spacing: -0.02em;

  color: ${props => props.theme.launchpad.colors.text.title};
`

const WalletAddress = styled.div`
  border: 1px solid ${props => props.theme.launchpad.colors.border.default};
  border-radius: 4px;

  padding: 0.25rem 0.75rem;

  font-style: normal;
  font-weight: 500;
  font-size: 13px;

  line-height: 150%;
  letter-spacing: -0.02em;

  color: ${props => props.theme.launchpad.colors.text.title};
`

const NetworkSelector = styled.div`
  cursor: pointer;
`

const NetworkSelectorControls = styled(VioletCard)`
  border-radius: 12px;
  padding: 2px 3px;
  background: transparent;
  width: fit-content;
  display: flex;
  button {
    ${({ theme }) => theme.mediaWidth.upToSmall`
     padding: 0 3px 0 1px;
  `};
  }
  ${({ theme }) => theme.mediaWidth.upToSmall`
    margin: 0;
    text-overflow: ellipsis;
    flex-shrink: 1;
    padding: 0;
  `};
`

const NetworkMenu = styled.div`
  display: flex;

  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: stretch;

  background: ${props => props.theme.launchpad.colors.background};
  border: 1px solid ${props => props.theme.launchpad.colors.border.default};
  border-radius: 8px;

  padding: 1rem;

  position: absolute;

  top: 90px;
  right: 10%;

  width: 200px;
`
const NetworkMenuHeader = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 15px;

  text-align: center;

  line-height: 16px;
  letter-spacing: -0.02em;

  color: ${props => props.theme.launchpad.colors.text.title};

  margin-bottom: 1rem;
`

const NetworkOption = styled.div`
  display: flex;

  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;

  gap: 0.5rem;

  font-style: normal;
  font-weight: 500;
  font-size: 13px;

  line-height: 16px;
  letter-spacing: -0.02em;

  padding: 1rem;

  cursor: pointer;

  color: ${props => props.theme.launchpad.colors.text.title};
`

const NetworkLabel = styled.div`
  flex: 1 1 auto;
`

const FlyoutRowActiveIndicator = styled.div`
  background-color: ${({ theme }) => theme.green1};
  border-radius: 50%;
  height: 9px;
  width: 9px;
`

const Logo = styled.img`
  height: 20px;
  width: 20px;
  margin-right: 8px;
`

const DropdownControl = styled.div<{ open?: boolean }>`
  width: 20px;
  height: 20px;

  > svg {
    margin-left: 8px;
    height: 20px;
    min-width: 20px;

    ${props => props.open && 'transform: rotate(180deg);' };

    transition: 0.4s;
  }
`