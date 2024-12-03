import React from 'react'
import { useSwitchChain } from 'wagmi'
import * as all from "viem/chains";

import { CHAIN_INFO, SupportedChainId } from 'constants/chains'
import { Container, Title, Info, NetworksRow, NetworkCard, InfoRows } from './styled'
import { useWeb3React } from 'hooks/useWeb3React'

function getChain(id: number) {
  const { ...chains } = all;
  for (const chain of Object.values(chains)) {
    if (chain.id === id) {
      return chain;
    }
  }

  throw new Error(`Chain with id ${id} not found`);
}

interface Props {
  expectChainId: SupportedChainId | null
}

export const NetworkNotAvailable: React.FC<Props> = ({ expectChainId }) => {
  const { chainId } = useWeb3React()
  const { chains, switchChain } = useSwitchChain()

  const changeNetwork = (targetChain: number) => {
    if (chainId !== targetChain) {
      switchChain({ chainId: targetChain })
    }
  }

  const expectChain = chains.find((chain) => chain.id === expectChainId)
  const currentChain = getChain(chainId);
  const currentChainName = currentChain.name;

  console.log('currentChainName', currentChainName);

  return (
    <Container>
      <Title>You are in wrong network</Title>
      <Info>{`You are on ${currentChainName},`}</Info>
      <Info>{`switch to {required network name} to continue`}</Info>
      {/* <NetworksRow
        elements={chainsFiltered.length}
        style={chainsFiltered.length === 1 ? { marginLeft: 70, marginRight: 70 } : {}}
      >
        {chainsFiltered.map((chain) => (
          <NetworkCard onClick={() => changeNetwork(chain.id)} key={chain.id}>
            <img src={CHAIN_INFO[chain.id].logoUrl} alt="icon" />
            {chain.name}
          </NetworkCard>
        ))}
      </NetworksRow> */}

      {/* <InfoRows>
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
      </InfoRows> */}
    </Container>
  )
}
