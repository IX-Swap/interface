import React from 'react'
import styled from 'styled-components'
import { Trans } from '@lingui/macro'

import allianceBlock from 'assets/images/AllianceBlock.png'
import { ButtonIXSGradient } from 'components/Button'
import { MEDIA_WIDTHS } from 'theme'
import { useActiveWeb3React } from 'hooks/web3'
import { SUPPORTED_TGE_CHAINS } from 'constants/addresses'

export const StakingPlaceholder = () => {
  const { chainId } = useActiveWeb3React()

  if (chainId && [SUPPORTED_TGE_CHAINS.KOVAN, SUPPORTED_TGE_CHAINS.MUMBAI].includes(chainId)) return null

  return (
    <Container>
      <Content>
        <Info>
          <Trans>IXS Legacy Pools are at full capacity</Trans>
          <br />
          <Trans>
            Due to high demand, new pools have been deployed in{' '}
            <a href="https://ixswap.defiterm.io/" target="_blank" rel="noreferrer">
              IXSWAP.DEFITERM.IO
            </a>
          </Trans>
        </Info>
        <Title>
          <Trans>Join a new Staking Program</Trans>
        </Title>
        <Description>
          <Trans>Please join our external Staking and Liquidity mining</Trans>
          <br />
          <Trans>Program powered by AllianceBlock on Polygon</Trans>
        </Description>
        <img src={allianceBlock} alt="AllianceBlock" />
        <a href="https://ixswap.defiterm.io/" target="_blank" rel="noreferrer">
          <StyledButton>Open new Staking and Liquidity mining</StyledButton>
        </a>
        <Tooltip>
          <Trans>
            Your ongoing stakes and rewards are safe and sound, you can see them below in case you staked or unstaked
            previously.
          </Trans>
        </Tooltip>
      </Content>
    </Container>
  )
}

const Container = styled.div`
  position: absolute;
  top: -16px;
  left: -16px;
  width: calc(100% + 32px);
  height: calc(100% + 32px);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(0deg, rgba(26, 9, 41, 0.8), rgba(26, 9, 41, 0.8)),
    radial-gradient(93.65% 93.65% at 79.34% -59.4%, rgba(206, 20, 132, 0.099) 0%, rgba(26, 18, 58, 0) 100%) x
      rgba(44, 37, 74, 0.2);
  backdrop-filter: blur(10px);
  border-radius: 32px;
  z-index: 10;
  line-height: normal;
`

const Content = styled.div`
  background: radial-gradient(39.01% 78.49% at 10.99% 63.28%, rgba(138, 54, 152, 0.18) 18.75%, rgba(0, 0, 0, 0) 100%)
      /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */,
    radial-gradient(93.65% 93.65% at 58.57% 22.42%, rgba(154, 55, 114, 0.33) 0%, rgba(26, 18, 58, 0) 100%)
      /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */,
    #36194d;
  border-radius: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  max-width: 678px;
  padding: 80px;
  border-radius: 30px;
  text-align: center;
  > a {
    text-decoration: none;
  }
  @media (max-width: ${MEDIA_WIDTHS.upToSmall}px) {
    padding: 16px;
  }
`

const Info = styled.div`
  font-weight: 400;
  font-size: 11px;
  line-height: 160%;
  text-align: center;
  color: #ffffff;
  margin-bottom: 12px;
  > a {
    color: #ffffff;
    text-decoration: underline;
  }
`

const Title = styled.div`
  font-weight: 700;
  font-size: 36px;
  background: ${({ theme: { bgG3 } }) => bgG3};
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 4px;
  @media (max-width: ${MEDIA_WIDTHS.upToSmall}px) {
    font-size: 24px;
  }
`

const Description = styled.div`
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  text-align: center;
  margin-bottom: 16px;
  @media (max-width: ${MEDIA_WIDTHS.upToSmall}px) {
    font-size: 14px;
  }
`

const StyledButton = styled(ButtonIXSGradient)`
  margin: 24px 0 26px;
  font-size: 16px;
  min-height: 32px;
  padding: 8px 24px;
`

const Tooltip = styled.div`
  font-weight: 500;
  font-size: 9px;
  line-height: 160%;
  text-align: center;
  color: rgba(237, 206, 255, 0.5);
  max-width: 319px;
`
