import React from 'react'
import styled from 'styled-components'

import { kycData } from './kyc-data'

import { Block } from './Block'
import { RowWithCheck } from './RowWithCheck'
import { fatcaKeys } from './constants'

export const Fatca = () => {
  return (
    <Block title="Fatca">
      <Content>
        {fatcaKeys.map(({ key, label }) => (
          <RowWithCheck key={key} text={label} isDone={kycData[key]} />
        ))}
      </Content>
    </Block>
  )
}

const Content = styled.div`
  display: grid;
  row-gap: 20px;
`
