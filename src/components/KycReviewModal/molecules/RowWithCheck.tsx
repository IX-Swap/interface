import React from 'react'
import { t } from '@lingui/macro'
import styled from 'styled-components'

import checkIcon from 'assets/images/newCheckIcon.svg'
import noneIcon from 'assets/images/none.svg'

interface Props {
  text: string
  isDone: boolean
}

export const RowWithCheck = ({ text, isDone }: Props) => {
  console.log(text, isDone, 'texttexttext')
  return (
    <Container>
      {isDone ? <img src={checkIcon} alt="status-icon" /> : null}
      <Text>{t`${isDone ? text : ''}`}</Text>
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
  font-size: 13px;
  color: ${({ theme: { text1 } }) => text1};
  font-weight: 500;
`
