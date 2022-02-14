import React from 'react'
import { t } from '@lingui/macro'
import styled from 'styled-components'

interface Props {
  label: string
  value: string
}

export const Field = ({ label, value }: Props) => {
  return (
    <Container>
      <span>{t`${label}`}</span>
      <span>{value}</span>
    </Container>
  )
}

const Container = styled.div`
  display: grid;
  row-gap: 6px;
  font-size: 16px;
  > :first-child {
    color: ${({ theme: { text2 } }) => text2};
  }
  > :last-child {
    color: ${({ theme: { white } }) => white};
  }
`
