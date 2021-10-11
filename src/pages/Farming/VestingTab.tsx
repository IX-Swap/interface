import { Trans } from '@lingui/macro'
import { RowBetween } from 'components/Row'
import { SUPPORTED_TGE_CHAINS } from 'constants/addresses'
import useAddPolygonToMetamask from 'hooks/useAddChainToMetamask'
import { useActiveWeb3React } from 'hooks/web3'
import React, { useMemo } from 'react'
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
  const addPolygon = useAddPolygonToMetamask()
  const shouldShowAddButtons = useMemo(
    () => chainId !== undefined && [SUPPORTED_TGE_CHAINS.MAIN, SUPPORTED_TGE_CHAINS.KOVAN].includes(chainId),
    [chainId]
  )
  return (
    <>
      <LightBackground />
      <Container width={['100%']} maxWidth={'1299px'}>
        <RowBetween>
          <Title>{FARMING_STRINGS[FARMING_TABS.VESTING]}</Title>
          {library?.provider?.isMetaMask && shouldShowAddButtons && (
            <TextGradient style={{ cursor: 'pointer' }} onClick={() => !addPolygon.success && addPolygon.addChain()}>
              {!addPolygon.success ? <Trans>Switch to Polygon</Trans> : null}
            </TextGradient>
          )}
        </RowBetween>

        <Vesting />
      </Container>
    </>
  )
}
