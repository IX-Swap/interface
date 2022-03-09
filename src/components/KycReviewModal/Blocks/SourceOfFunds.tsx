import React from 'react'
import styled from 'styled-components'

import { sourceOfFunds, corporateSourceOfFunds } from 'pages/KYC/mock'
import { CorporateKyc, IndividualKyc } from 'state/admin/actions'

import { Block } from '../molecules/Block'
import { Field } from '../molecules/Field'
import { RowWithCheck } from '../molecules/RowWithCheck'

interface Props {
  data: IndividualKyc | CorporateKyc
  kycKey: string
}

export const SourceOfFunds = ({ data, kycKey }: Props) => {
  const keys = kycKey === 'individual' ? sourceOfFunds : corporateSourceOfFunds
  const kycSourceOfFunds = data?.sourceOfFunds

  const othersSourceOfFunds = kycSourceOfFunds.split('Others, ')[1]

  return (
    <Block title="Source of Funds">
      <Content>
        {keys.map(({ name }) => (
          <RowWithCheck key={name} text={name} isDone={Boolean(kycSourceOfFunds?.includes(name))} />
        ))}
        {othersSourceOfFunds && <Field label="Others Source of Funds" value={othersSourceOfFunds} />}
      </Content>
    </Block>
  )
}

const Content = styled.div`
  display: grid;
  row-gap: 20px;
`
