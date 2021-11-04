import { Trans } from '@lingui/macro'
import { RowBetween } from 'components/Row'
import { SupportedChainId } from 'constants/chains'
import useIXSCurrency from 'hooks/useIXSCurrency'
import useSwitchChain, { CHAIN_SWITCH_STRINGS } from 'hooks/useSwitchChain'
import { useActiveWeb3React } from 'hooks/web3'
import React from 'react'
import { isMobile } from 'react-device-detect'
import styled from 'styled-components/macro'
import { TextGradient, TYPE } from 'theme'
import { LightBackground } from 'theme/Background'
import { Container } from './styleds'
import { Vesting } from './Vesting/Vesting'

const PaddedRow = styled(RowBetween)`
  padding: 0 15px;
  flex-wrap: wrap;
`

export const VestingTab = () => {
  const { library, chainId } = useActiveWeb3React()
  const switchChain = useSwitchChain()
  const IXSCurrency = useIXSCurrency()
  return (
    <>
      <LightBackground />
      <Container width={['100%']} maxWidth={'1299px'}>
        <PaddedRow>
          <TYPE.title4>
            <Trans>Vesting {IXSCurrency?.symbol}</Trans>
          </TYPE.title4>
          {library?.provider?.isMetaMask && chainId && !isMobile && (
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
