import React from 'react'
import styled from 'styled-components'
import { Trans } from '@lingui/macro'

import { ButtonGradientBorder, ButtonIXSGradient } from 'components/Button'
import { gradientBorder, MEDIA_WIDTHS, StyledInternalLink } from 'theme'
import { routes } from 'utils/routes'
import { AppLogo } from 'components/AppLogo'

export const NoCollections = () => {
  return (
    <Container>
      <AppLogo />
      <Text>
        <Trans>Oops, you don&apos;t have any collection yet!</Trans>
      </Text>
      <ButtonsContainer>
        <ButtonIXSGradient as={StyledInternalLink} to={routes.nftCollectionCreate}>
          Create a collection
        </ButtonIXSGradient>
        <ButtonGradientBorder as={StyledInternalLink} to={routes.nftCollectionImport}>
          Import a collection
        </ButtonGradientBorder>
      </ButtonsContainer>
    </Container>
  )
}

const Container = styled.div`
  border-radius: 32px;
  position: relative;
  padding: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  > img {
    height: 280px;
    width: auto;
    margin-bottom: 60px;
  }
  ${gradientBorder};
  @media (max-width: ${MEDIA_WIDTHS.upToSmall}px) {
    padding: 16px;
    > img {
      height: 140px;
    }
  }
`

const Text = styled.div`
  font-weight: 600;
  font-size: 24px;
  margin-bottom: 40px;
`

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 24px;
  a {
    font-weight: 600;
    font-size: 18px;
    text-decoration: none;
    min-width: 221px;
    :hover {
      text-decoration: none;
    }
  }
  > a:last-child {
    height: 40px;
    font-size: 16px;
  }
`
