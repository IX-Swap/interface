import { Trans } from '@lingui/macro'
import { RowBetween } from 'components/Row'
import { SupportedChainId } from 'constants/chains'
import useSwitchChain, { CHAIN_SWITCH_STRINGS } from 'hooks/useSwitchChain'
import { useActiveWeb3React } from 'hooks/web3'
import React from 'react'
import styled from 'styled-components/macro'
import { TextGradient, TYPE } from 'theme'
import { LightBackground } from 'theme/Background'
import { Container } from './styleds'
import { FARMING_STRINGS, FARMING_TABS } from './Vesting/enum'
import { Vesting } from './Vesting/Vesting'

const Title = styled(TYPE.title4)`
  padding: 0 15px;
`

export const VestingTab = () => {
  const { library, chainId } = useActiveWeb3React()
  const switchChain = useSwitchChain()
  return (
    <>
      <LightBackground />
      <Container width={['100%']} maxWidth={'1299px'}>
        <RowBetween>
          <Title>{FARMING_STRINGS[FARMING_TABS.VESTING]}</Title>
          {library?.provider?.isMetaMask && chainId && (
            <TextGradient style={{ cursor: 'pointer' }} onClick={() => switchChain.addChain()}>
              <Trans>Having vesting on {CHAIN_SWITCH_STRINGS[chainId as SupportedChainId]}? Switch</Trans>
            </TextGradient>
          )}
        </RowBetween>

        <Vesting />
      </Container>
    </>
  )
}
