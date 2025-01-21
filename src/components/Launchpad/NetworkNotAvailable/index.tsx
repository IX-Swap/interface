import React from 'react'
import { useAccount, useSwitchChain } from 'wagmi'
import * as all from 'viem/chains'

import { Container, Title, Info } from './styled'
import wrongNetworkImg from 'assets/images/warningRedRec.png'
import { Flex } from 'rebass'
import { ButtonOutlined, PinnedContentButton } from 'components/Button'
import { useLogout } from 'state/auth/hooks'
import { customChains } from 'components/Web3Provider/constants'

function getChain(id: any) {
  const { ...chains } = all
  const allChains = { ...chains, ...customChains }

  for (const chain of Object.values(allChains)) {
    if (chain.id === id) {
      return chain
    }
  }

  return null
}

interface Props {
  expectChainId: any
}

export const NetworkNotAvailable: React.FC<Props> = ({ expectChainId }) => {
  const { chainId } = useAccount()
  const { isPending, chains, switchChain } = useSwitchChain()
  const { disconnectWallet } = useLogout()

  const changeNetwork = (targetChain: any) => {
    if (chainId !== targetChain) {
      switchChain({ chainId: targetChain })
    }
  }

  const expectChain = chains.find((chain) => chain.id === expectChainId)
  const expectChainName = expectChain?.name || 'Unknown'
  const currentChain = getChain(chainId)
  const currentChainName = currentChain ? currentChain.name : 'Unknown'

  return (
    <Container>
      <Title>Wrong Network</Title>
      <Info>
        You are on <strong style={{ color: 'black' }}>{currentChainName}</strong>
      </Info>
      <Info>
        Switch to the <strong style={{ color: 'black' }}>{expectChainName}</strong> to get full functionality.
      </Info>
      <Flex justifyContent="center" my={32}>
        <div style={{ width: 100 }}>
          <img src={wrongNetworkImg} style={{ width: '100%', height: 'auto' }} />
        </div>
      </Flex>

      <Flex flexDirection="column" style={{ gap: 12, minWidth: 300 }}>
        <PinnedContentButton style={{ fontSize: 14 }} onClick={() => changeNetwork(expectChainId)}>
          {isPending ? 'Loading...' : `Switch to ${expectChainName}`}
        </PinnedContentButton>
        <ButtonOutlined style={{ fontSize: 14, color: 'rgba(255,109,109,0.9)' }} onClick={disconnectWallet}>
          Disconnect Wallet
        </ButtonOutlined>
      </Flex>
    </Container>
  )
}
