import React from 'react'
import { t } from '@lingui/macro'
import styled from 'styled-components'

import checkIcon from 'assets/images/check-2.svg'
import noneIcon from 'assets/images/none.svg'

interface Props {
  text: string
  isDone: boolean
}

export const RowWithCheck = ({ text, isDone }: Props) => {
  return (
    <Container>
      <img src={isDone ? checkIcon : noneIcon} alt="status-icon" />
      <Text>{t`${text}`}</Text>
    </Container>
  )
}

const Container = styled.div`
  display: grid;
  grid-template-columns: 12px 1fr;
  column-gap: 12px;
  align-items: center;
`

const Text = styled.div`
  font-size: 14px;
  color: ${({ theme: { text2 } }) => text2};
`
