import React from 'react'
import styled from 'styled-components'

import { kycData } from './kyc-data'

import { Block } from './Block'
import { RowWithCheck } from './RowWithCheck'
import { cynopsisKeys } from './constants'

export const Cynopsis = () => {
  return (
    <Block
      title="Cynopsis"
      additionalTitleInfo={
        <Percent>
          <span>&nbsp;-&nbsp;</span>
          <span>70%</span>
        </Percent>
      }
    >
      <Content>
        {cynopsisKeys.map(({ key, label }) => (
          <RowWithCheck key={key} text={label} isDone={kycData[key]} />
        ))}
      </Content>
    </Block>
  )
}

const Percent = styled.div`
  display: flex;
  align-items: center;
  > :last-child {
    color: ${({ theme: { green1 } }) => green1};
  }
`

const Content = styled.div`
  display: grid;
  row-gap: 20px;
`
