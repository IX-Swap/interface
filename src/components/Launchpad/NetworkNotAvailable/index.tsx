import React from 'react'
import { CHAIN_INFO, SupportedChainId } from 'constants/chains'
import { ENV_SUPPORTED_TGE_CHAINS } from 'constants/addresses'
import { Container, Title, Info, NetworksRow, NetworkCard, InfoRows } from './styled'
import { useWeb3React } from 'hooks/useWeb3React'
import useSelectChain from 'hooks/useSelectChain'

interface Props {
  expectChain: SupportedChainId | null
}

export const NetworkNotAvailable: React.FC<Props> = ({ expectChain }) => {
  const { chainId } = useWeb3React()
  const selectChain = useSelectChain()

  const changeNetwork = async (targetChain: number) => {
    if (chainId !== targetChain) {
      await selectChain(targetChain)
    }
  }

  const sourceChains = ENV_SUPPORTED_TGE_CHAINS || [SupportedChainId.BASE]
  const chains = sourceChains.filter((chain) => chain === expectChain)
  const chainsNames = chains.map((chain) => CHAIN_INFO[chain].chainName)

  return (
    <Container>
      <Title>
        Connect to the Right
        <br />
        Blockchain Network
      </Title>
      <Info>Available Blockchain Networks:</Info>
      <NetworksRow elements={chains.length} style={chains.length === 1 ? { marginLeft: 70, marginRight: 70 } : {}}>
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
