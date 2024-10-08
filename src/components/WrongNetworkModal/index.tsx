import React from 'react'
import { useWeb3React } from 'hooks/useWeb3React'
import Portal from '@reach/portal'
import { useSwitchChain } from 'wagmi'

import { CHAIN_INFO } from 'constants/chains'
import { Container, Title, Info, NetworksRow, NetworkCard, InfoRows } from './styled'
import { CenteredFixed } from 'components/LaunchpadMisc/styled'
import { detectWrongNetwork } from 'utils'

export const WrongNetworkModal = () => {
  const { chainId, account } = useWeb3React()
  const { chains, switchChain } = useSwitchChain()
  const isWrongNetwork = chainId && account ? detectWrongNetwork(chainId) : false

  const changeNetwork = async (targetChain: number) => {
    if (chainId !== targetChain) {
      switchChain({ chainId: targetChain })
    }
  }

  const chainsNames = chains.map((chain) => chain.name)

  return (
    <>
      {isWrongNetwork ? (
        <Portal>
          <CenteredFixed width="100vw" height="100vh" style={{ background: 'rgba(0, 0, 0, .5)' }}>
            <Container>
              <Title>
                Connect to the Right
                <br />
                Blockchain Network
              </Title>
              <Info>Available Blockchain Network:</Info>

              <NetworksRow elements={chains.length}>
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
          </CenteredFixed>
        </Portal>
      ) : null}
    </>
  )
}
