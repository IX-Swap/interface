import React from 'react'
import { t } from '@lingui/macro'
import styled from 'styled-components'

interface Props {
  title: string
  children: JSX.Element
  additionalTitleInfo?: string | JSX.Element
}

export const Block = ({ title, children, additionalTitleInfo }: Props) => {
  return (
    <Container>
      <Title>
        {t`${title}`}
        {additionalTitleInfo && <>{additionalTitleInfo}</>}
      </Title>
      {children}
    </Container>
  )
}

const Container = styled.div`
  background-color: ${({ theme: { bg11 } }) => `${bg11}40`};
  border-radius: 16px;
  padding: 32px 24px;
`

const Title = styled.div`
  font-weight: 600;
  font-size: 16px;
  text-transform: uppercase;
  color: ${({ theme: { white } }) => white};
  margin-bottom: 36px;
  display: flex;
  align-items: center;
`
