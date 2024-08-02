import React from 'react'
import { Trans } from '@lingui/macro'
import { switchToNetwork } from 'hooks/switchToNetwork'
import { CHAIN_INFO, SupportedChainId } from 'constants/chains'
import { ENV_SUPPORTED_TGE_CHAINS } from 'constants/addresses'
import { useWhitelabelState } from 'state/whitelabel/hooks'
import { Container, Title, Info, NetworksRow, NetworkCard, InfoRows } from './styled'
import { useWeb3React } from 'connection/web3reactShim'

interface Props {
  expectChain: SupportedChainId | null
}

export const NetworkNotAvailable: React.FC<Props> = ({ expectChain }) => {
  const { chainId, provider } = useWeb3React()
  const { config } = useWhitelabelState()

  const changeNetwork = (targetChain: number) => {
    if (chainId !== targetChain && provider && provider?.provider?.isMetaMask) {
      switchToNetwork({ provider, chainId: targetChain })
    }
  }

  const sourceChains = ENV_SUPPORTED_TGE_CHAINS || [SupportedChainId.BASE]
  const chains = sourceChains.filter((chain) => chain === expectChain)
  const chainsNames = chains.map((chain) => CHAIN_INFO[chain].chainName)
  const network = CHAIN_INFO[expectChain || SupportedChainId.BASE].chainName

  if (!provider?.provider?.isMetaMask) {
    return (
      <Container>
        <Title>
          <Trans>{`${config?.name || 'IX Swap'} is not available`}</Trans>
          <br /> <Trans>{`on this Blockchain network`}</Trans>
        </Title>
        <Info>
          <Trans>
            Please switch the network to {network} in your wallet.
          </Trans>
        </Info>
      </Container>
    )
  }

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
