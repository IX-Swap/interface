import React from 'react'
import styled from 'styled-components'

import { kycData } from './kyc-data'

import { Block } from './molecules/Block'
import { RowWithCheck } from './molecules/RowWithCheck'
import { sourceOfFundsKeys } from './constants'

export const SourceOfFunds = () => {
  return (
    <Block title="Source of Funds">
      <Content>
        {sourceOfFundsKeys.map(({ key, label }) => (
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
