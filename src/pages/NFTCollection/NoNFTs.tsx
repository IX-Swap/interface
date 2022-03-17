import React from 'react'
import styled from 'styled-components'
import { Trans } from '@lingui/macro'

import logoImg from 'assets/svg/logo-white.svg'
import { gradientBorder, MEDIA_WIDTHS } from 'theme'

export const NoNFTs = () => {
  return (
    <Container>
      <img src={logoImg} alt="logoImg" />
      <Text>
        <Trans>Oops, you don&apos;t have any NFTs yet!</Trans>
      </Text>
    </Container>
  )
}

const Container = styled.div`
  margin-top: 18px;
  ${gradientBorder};
  position: relative;
  padding: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  > img {
    height: 280px;
    width: auto;
    margin-bottom: 60px;
  }
  @media (max-width: ${MEDIA_WIDTHS.upToSmall}px) {
    padding: 32px;
    > img {
      height: 140px;
    }
  }
`

const Text = styled.div`
  font-weight: 600;
  font-size: 24px;
`
