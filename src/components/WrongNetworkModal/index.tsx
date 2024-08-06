import React from 'react'
import { useWeb3React } from 'connection/web3reactShim'
import Portal from '@reach/portal'

import { CHAIN_INFO, SupportedChainId } from 'constants/chains'
import { ENV_SUPPORTED_TGE_CHAINS } from 'constants/addresses'
import { Container, Title, Info, NetworksRow, NetworkCard, InfoRows } from './styled'
import useSelectChain from 'hooks/useSelectChain'
import { CenteredFixed } from 'components/LaunchpadMisc/styled'
import { detectWrongNetwork } from 'utils'

export const WrongNetworkModal = () => {
  const selectChain = useSelectChain()
  const { chainId, account } = useWeb3React()
  const isWrongNetwork = chainId && account ? detectWrongNetwork(chainId) : false

  const changeNetwork = async (targetChain: number) => {
    if (chainId !== targetChain) {
      await selectChain(targetChain)
    }
  }

  const chains = ENV_SUPPORTED_TGE_CHAINS || [SupportedChainId.BASE]
  const chainsNames = chains.map((chain) => CHAIN_INFO[chain].chainName)

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
          </CenteredFixed>
        </Portal>
      ) : null}
    </>
  )
}
