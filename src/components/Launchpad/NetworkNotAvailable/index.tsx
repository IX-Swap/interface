import React from 'react'
import { useSwitchChain } from 'wagmi'

import { CHAIN_INFO, SupportedChainId } from 'constants/chains'
import { Container, Title, Info, NetworksRow, NetworkCard, InfoRows } from './styled'
import { useWeb3React } from 'hooks/useWeb3React'

interface Props {
  expectChain: SupportedChainId | null
}

export const NetworkNotAvailable: React.FC<Props> = ({ expectChain }) => {
  const { chainId } = useWeb3React()
  const { chains, switchChain } = useSwitchChain()

  const changeNetwork = (targetChain: number) => {
    if (chainId !== targetChain) {
      switchChain({ chainId: targetChain })
    }
  }

  const chainsFiltered = chains.filter((chain) => chain.id === expectChain)
  const chainsNames = chainsFiltered.map((chain) => chain.name)

  return (
    <Container>
      <Title>
        Connect to the Right
        <br />
        Blockchain Network
      </Title>
      <Info>Available Blockchain Networks:</Info>
      <NetworksRow elements={chainsFiltered.length} style={chainsFiltered.length === 1 ? { marginLeft: 70, marginRight: 70 } : {}}>
        {chainsFiltered.map((chain) => (
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
