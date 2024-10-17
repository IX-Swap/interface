import React from 'react'
import { useLocation } from 'react-router-dom'
import { useWeb3React } from 'hooks/useWeb3React'
import { useSwitchChain } from 'wagmi'

import { CHAIN_INFO } from 'constants/chains'
import { Container, Title, Info, NetworksRow, NetworkCard, InfoRows } from './styled'
import { useConnectModal } from '@rainbow-me/rainbowkit'
import ConnectWalletCard from './ConnectWalletCard'

export const NotAvailablePage = () => {
  const { openConnectModal } = useConnectModal()
  const { chainId } = useWeb3React()
  const { pathname } = useLocation()
  const { chains, switchChain } = useSwitchChain()

  const farming = ['/vesting', '/staking'].includes(pathname)

  const changeNetwork = async (targetChain: number) => {
    if (chainId !== targetChain) {
      switchChain({ chainId: targetChain })
    }
  }

  if (openConnectModal) {
    return <ConnectWalletCard />
  }

  const chainsNames = chains.map((chain) => chain.name)

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
          <NetworkCard onClick={() => changeNetwork(chain.id)} key={chain.id}>
            <img src={CHAIN_INFO[chain.id].logoUrl} alt="icon" />
            {chain.name}
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
