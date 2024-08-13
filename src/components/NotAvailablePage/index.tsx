import React from 'react'
import { useLocation } from 'react-router-dom'
import { useWeb3React } from 'hooks/useWeb3React'

import { CHAIN_INFO, SupportedChainId } from 'constants/chains'
import { ENV_SUPPORTED_TGE_CHAINS } from 'constants/addresses'
import { Container, Title, Info, NetworksRow, NetworkCard, InfoRows } from './styled'
import useSelectChain from 'hooks/useSelectChain'
import { useConnectModal } from '@rainbow-me/rainbowkit'
import ConnectWalletCard from './ConnectWalletCard'

export const NotAvailablePage = () => {
  const { openConnectModal } = useConnectModal()
  const selectChain = useSelectChain()
  const { chainId } = useWeb3React()
  const { pathname } = useLocation()

  const farming = ['/vesting', '/staking'].includes(pathname)

  const changeNetwork = async (targetChain: number) => {
    if (chainId !== targetChain) {
      await selectChain(targetChain)
    }
  }

  if (openConnectModal) {
    return <ConnectWalletCard />
  }

  const chains = ENV_SUPPORTED_TGE_CHAINS || [SupportedChainId.BASE]
  const chainsNames = chains.map((chain) => CHAIN_INFO[chain].chainName)

  return (
    <Container>
      <Title>
        Connect to the Right
        <br />
        Blockchain Network
      </Title>
      <Info>Available Blockchain Network:</Info>

      <NetworksRow elements={farming ? chains.length + 1 : chains.length}>
        {chains.map((chain) => (
          <NetworkCard onClick={() => changeNetwork(chain)} key={chain}>
            <img src={CHAIN_INFO[chain].logoUrl} alt="icon" />
            {CHAIN_INFO[chain].chainName}
          </NetworkCard>
        ))}
      </NetworksRow>

      <InfoRows>
        <div>
          Switch to{' '}
          {chainsNames.map((chainName, index) => (
            <span key={index}>
              <b style={{ color: '#292933' }}>{chainName}</b>
              {index < chainsNames.length - 2 ? ', ' : ''}
              {index === chainsNames.length - 2 ? ' or ' : ''}
            </span>
          ))}
        </div>
        <div>to get full functionality</div>
      </InfoRows>
    </Container>
  )
}
