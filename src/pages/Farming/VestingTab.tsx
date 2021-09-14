import { Trans } from '@lingui/macro'
import { RowCenter } from 'components/Row'
import { useActiveWeb3React } from 'hooks/web3'
import { SUPPORTED_TGE_CHAINS } from 'pages/App'
import React from 'react'
import { Text } from 'rebass'
import styled from 'styled-components/macro'
import { TextGradient, TYPE } from 'theme'
import { LightBackground } from 'theme/Background'
import { FARMING_STRINGS, FARMING_TABS } from './Vesting/enum'
import { Container } from './styleds'
import { Vesting } from './Vesting/Vesting'

export const BlurredOverlay = styled.div`
  position: absolute;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 3;
  display: flex;
  text-align: center;
  vertical-align: center;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  backdrop-filter: blur(10px);
  border-radius: 45px;
  background: ${({ theme }) => theme.bgG16};
  @media (max-width: 1300px) {
    height: 50vh;
  }
`

const HideOnSmallScreen = styled.div`
  @media (max-width: 1300px) {
    display: none;
  }
`

const SmallerFont = styled.div`
  @media (max-width: 1300px) {
    font-size: 28px;
  }
`
const Title = styled(TYPE.title4)`
  padding: 0 15px;
`

export const VestingTab = () => {
  const { chainId } = useActiveWeb3React()
  return (
    <>
      <LightBackground />
      <Container width={['100%']} maxWidth={'1299px'}>
        {chainId === SUPPORTED_TGE_CHAINS.MAIN && (
          <HideOnSmallScreen>
            <Title>
              <SmallerFont>{FARMING_STRINGS[FARMING_TABS.VESTING]}</SmallerFont>
            </Title>
          </HideOnSmallScreen>
        )}
        {chainId !== SUPPORTED_TGE_CHAINS.MAIN && <Title>{FARMING_STRINGS[FARMING_TABS.VESTING]}</Title>}
        <div>
          {chainId === SUPPORTED_TGE_CHAINS.MAIN && (
            <BlurredOverlay>
              <TYPE.titleBig>
                <SmallerFont>
                  <Trans>Vesting Balances will be available from</Trans>
                </SmallerFont>
              </TYPE.titleBig>
              <Text fontSize={'40px'}>
                <SmallerFont>
                  <TextGradient>15th September</TextGradient>
                </SmallerFont>
              </Text>
              <RowCenter style={{ marginTop: '40px' }}>
                <TYPE.titleBig>
                  <SmallerFont>Come back soon!</SmallerFont>
                </TYPE.titleBig>
              </RowCenter>
            </BlurredOverlay>
          )}
          {chainId === SUPPORTED_TGE_CHAINS.MAIN && (
            <HideOnSmallScreen>
              <Vesting />
            </HideOnSmallScreen>
          )}
          {chainId !== SUPPORTED_TGE_CHAINS.MAIN && <Vesting />}
        </div>
      </Container>
    </>
  )
}
