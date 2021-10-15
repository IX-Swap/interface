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

const PaddedRow = styled(RowBetween)`
  padding: 0 15px;
  flex-wrap: wrap;
`

export const VestingTab = () => {
  const { library, chainId } = useActiveWeb3React()
  const switchChain = useSwitchChain()
  return (
    <>
      <LightBackground />
      <Container width={['100%']} maxWidth={'1299px'}>
        <PaddedRow>
          <TYPE.title4>{FARMING_STRINGS[FARMING_TABS.VESTING]}</TYPE.title4>
          {library?.provider?.isMetaMask && chainId && (
            <TextGradient style={{ cursor: 'pointer', marginLeft: '5px' }} onClick={() => switchChain.addChain()}>
              <Trans>Vesting on {CHAIN_SWITCH_STRINGS[chainId as SupportedChainId]}? Switch networks</Trans>
            </TextGradient>
          )}
        </PaddedRow>

        <Vesting />
      </Container>
    </>
  )
}
