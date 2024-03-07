import React from 'react'
import { Trans, t } from '@lingui/macro'
import styled from 'styled-components'
import { MEDIA_WIDTHS } from 'theme'

interface Props {
  title: string
  children: JSX.Element
  additionalTitleInfo?: string | JSX.Element
}

export const Block = ({ title, children, additionalTitleInfo }: Props) => {
  return (
    <Container>
      <Title>
        <Trans>{`${title}`}</Trans>
        {additionalTitleInfo && <>{additionalTitleInfo}</>}
      </Title>
      {children}
    </Container>
  )
}

const Container = styled.div`
  // background-color: ${({ theme: { bg11 } }) => `${bg11}40`};
  border-radius: 16px;
  padding: 32px 24px;

  @media (max-width: ${MEDIA_WIDTHS.upToSmall}px) {
    padding: 10px 8px;
  }
`

const Title = styled.div`
  font-weight: 700;
  font-size: 18px;
  // text-transform: uppercase;
  color: ${({ theme: { text1 } }) => text1};
  margin-bottom: 36px;
  display: flex;
  align-items: center;

  @media (max-width: ${MEDIA_WIDTHS.upToSmall}px) {
    font-size: 16px;
  }
`
