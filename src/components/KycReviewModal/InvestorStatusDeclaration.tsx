import React from 'react'
import styled from 'styled-components'

import { kycData } from './kyc-data'

import { Block } from './Block'
import { RowWithCheck } from './RowWithCheck'
import { investorStatusDeclarationKeys } from './constants'

export const InvestorStatusDeclaration = () => {
  return (
    <Block title="Investor Status Declaration">
      <Content>
        {investorStatusDeclarationKeys.map(({ key, label }) => (
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
